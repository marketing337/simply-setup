import fs from "fs";
import path from "path";
import glob from "glob";
import fetch from "node-fetch";
import { parseStringPromise } from "xml2js";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/* ---------------------------------------------------
   1.  Build a MASTER SITE-MAP
      – Merge live sitemap.xml  +  local workspace files
--------------------------------------------------- */
async function getRemoteSiteMap() {
  try {
    const res = await fetch("https://simplysetup.com/sitemap.xml", { timeout: 6000 });
    const xml = await res.text();
    const { urlset } = await parseStringPromise(xml);
    return urlset.url.map(u => ({
      url: new URL(u.loc[0]).pathname.replace(/\/$/, "") || "/",
      title: (u["news:title"]?.[0] || "").trim()    // may be empty
    }));
  } catch {
    return [];                                      // fail-safe
  }
}

function getLocalSiteMap() {
  const files = glob.sync("{pages,blog}/**/*.{md,mdx,html}", { ignore: "**/_*.{md,mdx,html}" });
  return files.map(f => {
    const raw = fs.readFileSync(f, "utf8");
    const title =
      (raw.match(/<h1[^>]*>(.*?)<\/h1>/) || [,""])[1] ||
      (raw.match(/title:\s*["'](.+?)["']/) || [,""])[1];
    const url = f
      .replace(/^pages/, "")
      .replace(/index\.(mdx?|html)$/, "")
      .replace(/\.(mdx?|html)$/, "")
      .replace(/\/$/, "");
    return { url: url || "/", title, path: f };
  });
}

async function buildSiteMap() {
  const live = await getRemoteSiteMap();
  const local = getLocalSiteMap();
  const map = new Map();

  [...live, ...local].forEach(p => {
    if (!map.has(p.url)) map.set(p.url, p);         // prefer first (live) entry
  });
  return [...map.values()];
}

/* ---------------------------------------------------
   2.  Suggest best links for a given page via GPT-4o
--------------------------------------------------- */
async function suggestLinks(pageSlug, siteMap) {
  const pool = siteMap
    .filter(p => p.url && !pageSlug.endsWith(p.url))      // exclude self
    .slice(0, 300)                                        // keep prompt small
    .map(p => `{"anchor": "${p.title || p.url}", "url": "${p.url}"}`);

  const prompt = `
Pick up to 5 JSON objects from the list below that would be MOST helpful to
readers of page: ${pageSlug}. Focus on Virtual Office and GST topics and, when
possible, the same city or area. Return ONLY a JSON array.

CANDIDATES:
[${pool.join(",")}]
`;

  const res = await openai.chat.completions.create({
    model: "gpt-4o-mini",
    messages: [{ role: "user", content: prompt }],
  });

  try { 
    return JSON.parse(res.choices[0].message.content).slice(0, 5); 
  } catch { 
    return []; 
  }
}

/* ---------------------------------------------------
   3.  Inject block into each /virtual-office/ page
--------------------------------------------------- */
async function processPages() {
  const siteMap = await buildSiteMap();
  const targets = glob.sync("pages/virtual-office/**/*.{md,mdx,html}");
  
  for (const file of targets) {
    let html = fs.readFileSync(file, "utf8");
    if (html.includes("<!-- AI-INTERNAL-LINKS -->")) {
      console.log("⏭️  Skipping", file, "(already has internal links)");
      continue;
    }

    const slug = file.replace(/^pages/, "").replace(/index\.(mdx?|html)$/, "");
    const links = await suggestLinks(slug, siteMap);
    if (!links.length) {
      console.log("❌ No links found for", file);
      continue;
    }

    const listItems = links
      .map(l => `<li><a href="${l.url}" target="_self">${l.anchor}</a></li>`).join("\n");

    const block = `
<!-- AI-INTERNAL-LINKS -->
<aside id="related-links">
  <h2>Related resources</h2>
  <ul>
    ${listItems}
  </ul>
</aside>
<!-- /AI-INTERNAL-LINKS -->
`.trim();

    html = html.replace(/<\/body>/i, `${block}\n</body>`);
    fs.writeFileSync(file, html, "utf8");
    console.log("➕  Added links to", file);
  }
}

await processPages();