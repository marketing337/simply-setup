import { useEffect } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useLocation } from "@/hooks/useLocation";
import { CityConfig } from "./cityConfig";

interface CityVirtualOfficeBaseProps {
  city?: CityConfig;
}

export default function CityVirtualOfficeBase({ city }: CityVirtualOfficeBaseProps) {
  const { currentLocation } = useLocation();
  
  const pageTitle = city 
    ? `Virtual Office for Company Registration in ${city.name} — thegstco`
    : "Start Your Company — thegstco";
  
  const pageDescription = city
    ? city.description
    : "Fast company registration with expert support. Choose your structure, add GST/VPOB, and stay compliant from day one.";
    
  const heroTitle = city
    ? `Virtual Office for Company Registration in ${city.name}`
    : "Start your company in minutes. Grow without compliance drag.";
  useEffect(() => {
    const form = document.getElementById("form") as HTMLFormElement;
    if (!form) return;

    const websiteInput = form.querySelector(
      '[name="Website"]',
    ) as HTMLInputElement;
    let actualWebsiteInput = websiteInput;
    if (!actualWebsiteInput) {
      actualWebsiteInput = document.createElement("input");
      actualWebsiteInput.type = "hidden";
      actualWebsiteInput.name = "Website";
      form.appendChild(actualWebsiteInput);
    }

    function getURL() {
      try {
        const u = new URL(window.location.href);
        const p = u.searchParams.get("website");
        return p || u.toString();
      } catch (e) {
        return window.location.href;
      }
    }

    function setWebsite() {
      actualWebsiteInput.value = getURL();
    }

    setWebsite();
    window.addEventListener("hashchange", setWebsite);
    window.addEventListener("popstate", setWebsite);

    function fieldBlockByName(name: string) {
      const el = form.querySelector(`[name="${name}"]`);
      if (!el) return null;
      let p = el.parentElement;
      while (p && !p.classList.contains("zf-tempFrmWrapper"))
        p = p.parentElement;
      return p || el.closest(".zf-tempFrmWrapper") || el;
    }

    const shell = document.createElement("div");
    shell.className = "stepper-card";
    const progress = document.createElement("div");
    progress.className = "stepper-progress";
    for (let i = 0; i < 5; i++) {
      const d = document.createElement("div");
      d.className = "dot";
      progress.appendChild(d);
    }

    const stepsWrap = document.createElement("div");
    const stepsMap = [
      {
        label: "Contact details",
        fields: ["SingleLine", "Email", "PhoneNumber_countrycode"],
      },
      { label: "Company details", fields: ["SingleLine1", "Dropdown"] },
      { label: "Address availability", fields: ["Dropdown1"] },
      { label: "State selection", fields: ["Dropdown2"] },
      { label: "Business activity & submit", fields: ["Dropdown3"] },
    ];

    const stepEls: HTMLElement[] = [];
    stepsMap.forEach((s, idx) => {
      const step = document.createElement("section");
      step.className = "step";
      const h = document.createElement("div");
      h.className = "stepper-title";
      h.textContent = idx + 1 + ". " + s.label;
      step.appendChild(h);
      const sh = document.createElement("div");
      sh.className = "stepper-sub";
      sh.textContent =
        [
          "Your name, email and phone to reach you.",
          "Proposed company name and preferred structure.",
          "Tell us if you already have a registration address.",
          "Pick your state for compliance and filings.",
          "Choose your business activity and submit.",
        ][idx] || "";
      step.appendChild(sh);
      s.fields.forEach((n) => {
        const block = fieldBlockByName(n);
        if (block) step.appendChild(block);
      });
      stepEls.push(step);
      stepsWrap.appendChild(step);
    });

    const footer = form.querySelector("li.zf-fmFooter") as HTMLElement;
    if (footer) {
      footer.style.display = "";
      stepEls[stepEls.length - 1].appendChild(footer);
    }

    const anchor =
      form.querySelector(".zf-subContWrap") || form.firstElementChild;
    if (anchor && anchor.parentNode) {
      anchor.parentNode.insertBefore(shell, anchor);
      shell.appendChild(progress);
      shell.appendChild(stepsWrap);
    }

    const nav = document.createElement("div");
    nav.className = "stepper-nav";
    const back = document.createElement("button");
    back.type = "button";
    back.className = "stepper-btn ghost";
    back.textContent = "Back";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "stepper-btn primary";
    next.textContent = "Next";
    nav.appendChild(back);
    nav.appendChild(next);
    shell.appendChild(nav);

    let current = 0;

    function show(i: number) {
      current = Math.max(0, Math.min(stepEls.length - 1, i));
      stepEls.forEach((se, idx) => {
        se.classList.toggle("active", idx === current);
      });
      back.style.visibility = current === 0 ? "hidden" : "visible";
      next.textContent =
        current === stepEls.length - 1 ? "Review & Submit" : "Next";
      const dots = progress.querySelectorAll(".dot");
      dots.forEach((d, idx) => {
        (d as HTMLElement).style.setProperty(
          "--fill",
          idx <= current ? "100%" : "0%",
        );
      });
    }

    function digitsOnly(s: string) {
      return (s || "").replace(/[^0-9]/g, "");
    }

    function stepValid() {
      const names = [].concat(stepsMap[current].fields as any);
      for (let j = 0; j < names.length; j++) {
        const fld = form.querySelector(`[name="${names[j]}"]`) as
          | HTMLInputElement
          | HTMLSelectElement;
        if (!fld) continue;
        const val = (fld.value || "").trim();
        if (names[j] === "Email") {
          if (val && (val.indexOf("@") === -1 || val.indexOf(".") === -1)) {
            fld.focus();
            return false;
          }
        } else if (names[j] === "PhoneNumber_countrycode") {
          if (val && digitsOnly(val).length < 10) {
            fld.focus();
            return false;
          }
        } else {
          if (!val || val === "-Select-") {
            fld.focus();
            return false;
          }
        }
      }
      return true;
    }

    back.addEventListener("click", () => {
      show(current - 1);
    });

    next.addEventListener("click", () => {
      if (current < stepEls.length - 1) {
        if (stepValid()) show(current + 1);
      } else {
        const submitBtn = (form.querySelector(".zf-submitColor") ||
          form.querySelector('[type="submit"]')) as HTMLButtonElement;
        if (submitBtn) {
          submitBtn.click();
        } else {
          if ("requestSubmit" in form) {
            (form as any).requestSubmit();
          } else {
            (form as any).submit();
          }
        }
      }
    });

    function setPH(n: string, ph: string) {
      const el = form.querySelector(`[name="${n}"]`) as HTMLInputElement;
      if (el) {
        el.placeholder = ph;
        el.setAttribute("aria-label", ph);
      }
    }

    function setSelPH(n: string, text: string) {
      const sel = form.querySelector(`[name="${n}"]`) as HTMLSelectElement;
      if (sel && sel.options && sel.options.length) {
        const first = sel.options[0];
        first.textContent = text;
        first.value = "-Select-";
        sel.value = "-Select-";
        sel.setAttribute("aria-label", text);
      }
    }

    setPH("SingleLine", "Your full name");
    setPH("Email", "name@company.com");
    setPH("PhoneNumber_countrycode", "10-digit mobile");
    setPH("SingleLine1", "Proposed company name");
    setSelPH("Dropdown", "Select company structure");
    setSelPH("Dropdown1", "Do you have a registration address?");
    setSelPH("Dropdown2", "Select state");
    setSelPH("Dropdown3", "Select business activity");

    show(0);

    const iframe = document.getElementById("rpz-iframe") as HTMLIFrameElement;
    if (iframe && iframe.src) {
      try {
        const u = new URL(iframe.getAttribute("src")!, window.location.href);
        u.searchParams.set("website", window.location.href);
        iframe.setAttribute("src", u.toString());
      } catch (e) {
        /* ignore */
      }
    }

    document.querySelectorAll(".rpz-faqQ").forEach((q) => {
      q.addEventListener("click", () => {
        const a = q.nextElementSibling as HTMLElement;
        const open = a.style.display === "block";
        a.style.display = open ? "none" : "block";
        const span = q.querySelector("span");
        if (span) span.textContent = open ? "+" : "–";
      });
    });

    return () => {
      window.removeEventListener("hashchange", setWebsite);
      window.removeEventListener("popstate", setWebsite);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={pageDescription} />
      </Helmet>

      <Navbar />

      <style>{`
        .gst-button-container {
          display: none !important;
        }

        .gst-whatsapp-float {
          display: none !important;
        }

        :root {
          --rpz-brand: #2563eb;
          --rpz-ink: #0f172a;
          --rpz-sub: #475569;
          --rpz-bg: #ffffff;
          --rpz-hero: #f8fafc;
          --rpz-line: #e5e7eb;
          --rpz-chip: #eef2ff;
          --rpz-ok: #16a34a;
          --rpz-shadow: 0 12px 32px rgba(2, 6, 23, .08);
        }

        html,
        body {
          height: 100%;
        }

        html {
          scroll-behavior: smooth;
        }

        body {
          margin: 0;
          background: var(--rpz-bg);
          color: var(--rpz-ink);
          font-family: ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, "Helvetica Neue", Arial;
        }

        img {
          max-width: 100%;
          display: block;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .rpz-wrap {
          max-width: 1140px;
          margin: 0 auto;
          padding: 0 16px;
        }

        .rpz-grid {
          gap: 24px;
        }

        .rpz-hero {
          background: var(--rpz-hero);
          border-bottom: 1px solid var(--rpz-line);
        }

        .rpz-heroIn {
          display: grid;
          grid-template-columns: 1.35fr 1fr;
          gap: 28px;
          align-items: center;
          padding-block: 56px;
        }

        .rpz-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--rpz-chip);
          color: var(--rpz-brand);
          font-weight: 800;
          border: 1px solid #dbeafe;
          border-radius: 999px;
          font-size: 12px;
          padding: 6px 10px;
        }

        .rpz-h1 {
          font-size: 44px;
          line-height: 1.08;
          letter-spacing: -.02em;
          margin: 12px 0 10px;
        }

        .rpz-lead {
          color: var(--rpz-sub);
          font-size: 16px;
          margin: 0 0 18px;
        }

        .rpz-ctaRow {
          display: flex;
          gap: 12px;
          flex-wrap: wrap;
          align-items: center;
        }

        .rpz-btn {
          appearance: none;
          border: 1px solid var(--rpz-line);
          background: #fff;
          color: var(--rpz-ink);
          font-weight: 700;
          padding: 12px 16px;
          border-radius: 12px;
          cursor: pointer;
          transition: transform .05s ease, box-shadow .2s ease;
        }

        .rpz-btn:active {
          transform: translateY(1px);
        }

        .rpz-btn--primary {
          background: var(--rpz-brand);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 10px 28px rgba(37, 99, 235, .25);
        }

        .rpz-heroCard {
          background: #fff;
          border: 1px solid var(--rpz-line);
          border-radius: 16px;
          box-shadow: var(--rpz-shadow);
          padding: 16px;
        }

        .rpz-bullets {
          list-style: none;
          margin: 10px 0 0;
          padding: 0;
          display: grid;
          gap: 8px;
          margin-bottom: 12px;
        }

        .rpz-tick {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: #ecfdf5;
          border: 1px solid #d1fae5;
          display: grid;
          place-items: center;
          font-weight: 800;
          color: #047857;
          flex: 0 0 18px;
        }

        .rpz-strip {
          border-bottom: 1px solid var(--rpz-line);
          background: #fff;
        }

        .rpz-stripIn {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
          padding-block: 16px;
        }

        .rpz-kpi {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .rpz-kpi b {
          font-size: 18px;
        }

        .rpz-kpi span {
          color: var(--rpz-sub);
          font-size: 13px;
        }

        .rpz-section {
          padding: 40px 0;
        }

        .rpz-title {
          font-size: 28px;
          margin: 0 0 6px;
        }

        .rpz-sub {
          color: var(--rpz-sub);
        }

        .rpz-steps {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .rpz-card {
          background: #fff;
          border: 1px solid var(--rpz-line);
          border-radius: 16px;
          box-shadow: var(--rpz-shadow);
          padding: 16px;
        }

        .rpz-step {
          display: flex;
          gap: 12px;
        }

        .rpz-stepNum {
          min-width: 32px;
          height: 32px;
          border-radius: 999px;
          background: var(--rpz-brand);
          color: #fff;
          font-weight: 800;
          display: grid;
          place-items: center;
          box-shadow: 0 0 0 6px rgba(37, 99, 235, .12);
        }

        .rpz-bullets li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
        }

        .rpz-plans {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .rpz-price {
          font-size: 34px;
          font-weight: 800;
          margin: 6px 0;
        }

        .rpz-priceNote {
          color: var(--rpz-sub);
          font-size: 13px;
          margin-top: 2px;
        }

        .rpz-card .rpz-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          margin-top: 16px;
        }

        .rpz-tag {
          display: inline-block;
          padding: 2px 10px;
          border-radius: 999px;
          font-weight: 800;
          font-size: 11px;
          background: #eff6ff;
          color: var(--rpz-brand);
          border: 1px solid #dbeafe;
        }

        .rpz-test {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .rpz-quote {
          background: #fff;
          border: 1px solid var(--rpz-line);
          border-radius: 16px;
          box-shadow: var(--rpz-shadow);
          padding: 16px;
          font-size: 15px;
        }

        .rpz-quote small {
          display: block;
          color: var(--rpz-sub);
          margin-top: 6px;
        }

        .rpz-faq {
          max-width: 880px;
          margin: 0 auto;
        }

        .rpz-faqItem {
          border: 1px solid var(--rpz-line);
          border-radius: 12px;
          padding: 12px;
          background: #fff;
        }

        .rpz-faqQ {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          font-weight: 700;
        }

        .rpz-faqA {
          color: var(--rpz-sub);
          font-size: 14px;
          display: none;
          padding-top: 6px;
        }

        .rpz-sticky {
          position: fixed;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 60;
          background: #fff;
          border-top: 1px solid var(--rpz-line);
          padding: 10px 16px;
          display: none;
        }

        .rpz-stickyIn {
          max-width: 1140px;
          margin: 0 auto;
          display: flex;
          gap: 12px;
          justify-content: space-between;
          align-items: center;
        }

        #rpz-modal {
          position: fixed;
          inset: 0;
          background: rgba(2, 6, 23, .58);
          display: none;
          align-items: center;
          justify-content: center;
          padding: 20px;
          z-index: 70;
        }

        #rpz-modal.rpz-open {
          display: flex;
        }

        .rpz-modalCard {
          width: 100%;
          max-width: 960px;
          background: #fff;
          border-radius: 16px;
          box-shadow: var(--rpz-shadow);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }

        .rpz-modalHead {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 10px 12px;
          border-bottom: 1px solid var(--rpz-line);
        }

        .rpz-modalBody {
          height: 78vh;
        }

        .rpz-iframe {
          width: 100%;
          height: 100%;
          border: 0;
        }

        .rpz-x {
          appearance: none;
          border: 1px solid var(--rpz-line);
          background: #fff;
          border-radius: 999px;
          padding: 6px 10px;
          cursor: pointer;
        }

        #rpz-form .zf-templateWidth {
          max-width: 880px;
          margin: 16px auto;
          padding: 0 16px;
        }

        #rpz-form .stepper-card {
          background: #fff;
          border-radius: 16px;
          padding: 20px;
        }

        #rpz-form .stepper-progress {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 8px;
          margin: 8px 0 4px;
        }

        #rpz-form .stepper-progress .dot {
          position: relative;
          height: 6px;
          background: #e5e7eb;
          border-radius: 999px;
          overflow: hidden;
        }

        #rpz-form .stepper-progress .dot::after {
          content: "";
          position: absolute;
          inset: 0;
          width: var(--fill, 0%);
          background: var(--rpz-brand);
          transition: width .35s ease;
        }

        #rpz-form .stepper-title {
          display: flex;
          align-items: center;
          gap: 10px;
          font-weight: 700;
          font-size: 18px;
          margin: 6px 2px 2px;
        }

        #rpz-form .stepper-sub {
          color: var(--rpz-sub);
          font-size: 13px;
          margin-bottom: 10px;
        }

        #rpz-form .step {
          display: none;
        }

        #rpz-form .step.active {
          display: block;
        }

        #rpz-form .step .zf-tempFrmWrapper {
          margin-bottom: 14px;
        }

        #rpz-form .stepper-nav {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          margin-top: 8px;
          flex-wrap: wrap;
          padding-bottom: 8px;
        }

        #rpz-form .stepper-btn {
          appearance: none;
          border: 0;
          border-radius: 999px;
          padding: 10px 16px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 6px 16px rgba(0, 0, 0, .06);
        }

        #rpz-form .stepper-btn.primary {
          background: var(--rpz-brand);
          color: #fff;
        }

        #rpz-form .stepper-btn.ghost {
          background: #fff;
          color: var(--rpz-ink);
          border: 1px solid #e5e7eb;
        }

        #rpz-form li.zf-fmFooter {
          display: none;
        }

        #rpz-form .zf-textBox,
        #rpz-form .zf-form-sBox,
        #rpz-form input[type="text"],
        #rpz-form input[type="email"],
        #rpz-form select {
          border-radius: 10px !important;
          border: 1px solid #e5e7eb !important;
          padding: 10px 12px !important;
          outline: none !important;
          transition: box-shadow .15s ease, border-color .15s ease;
          width: 100%;
          background: #fff;
        }

        #rpz-form .zf-tempFrmWrapper:has(input:focus, select:focus) {
          box-shadow: 0 0 0 4px #c7d2fe;
          border-radius: 12px;
        }

        #rpz-form .zf-errorMessage {
          color: #b91c1c !important;
          font-size: 12px !important;
          margin-top: 6px !important;
        }

        #rpz-form .zf-labelName,
        #rpz-form .zf-phNumber label {
          display: none !important;
        }

        #rpz-form *,
        #rpz-form *::before,
        #rpz-form *::after {
          box-sizing: border-box;
        }

        #rpz-form .zf-subContWrap ul,
        #rpz-form .zf-tempHeadBdr {
          padding-left: 0;
          margin-left: 0;
          list-style: none;
        }

        #rpz-form input[type="text"],
        #rpz-form input[type="email"],
        #rpz-form select {
          max-width: 100%;
          display: block;
        }

        #rpz-form ::placeholder {
          color: var(--rpz-sub);
          opacity: 1;
        }

        @media (max-width: 980px) {
          .rpz-wrap {
            padding: 0 20px;
          }

          .rpz-heroIn {
            grid-template-columns: 1fr;
            padding-block: 40px;
          }

          .rpz-steps {
            grid-template-columns: 1fr;
          }

          .rpz-plans {
            grid-template-columns: 1fr;
          }

          .rpz-test {
            grid-template-columns: 1fr;
          }

          .rpz-h1 {
            font-size: 34px;
          }

          .rpz-section {
            padding: 32px 0;
          }

          .rpz-sticky {
            display: block;
          }

          .rpz-faq {
            padding: 0;
          }

          .rpz-faqItem {
            margin-bottom: 12px;
          }

          .rpz-grid {
            gap: 16px;
          }
        }
      `}</style>

      <section className="rpz-hero">
        <div className="rpz-wrap rpz-heroIn">
          <div>
            <span className="rpz-chip">
              Company Registration • GST • Virtual Office
            </span>
            <h1 className="rpz-h1">
              {heroTitle.split('. ')[0]}.
              {heroTitle.includes('. ') && (
                <>
                  {' '}<br />
                  {heroTitle.split('. ').slice(1).join('. ')}
                </>
              )}
            </h1>
            <p className="rpz-lead">
              Pick your structure (Proprietorship, LLP, OPC, Pvt Ltd), get a
              registration address if needed, and we'll file end‑to‑end. You
              focus on customers; we handle paperwork.
            </p>
            <div className="rpz-ctaRow">
              <a
                href="#get-started"
                className="rpz-btn rpz-btn--primary"
                id="rpz-cta-hero"
                data-testid="button-get-started-hero"
              >
                Get started
              </a>
              <a
                className="rpz-btn"
                href="#rpz-pricing"
                data-testid="link-see-pricing"
              >
                See pricing
              </a>
            </div>
          </div>
          <div>
            <div className="rpz-heroCard">
              <strong>What you get</strong>
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> Structure selection
                  guidance
                </li>
                <li>
                  <span className="rpz-tick">✓</span> DIN/PAN/TAN assistance (as
                  applicable)
                </li>
                <li>
                  <span className="rpz-tick">✓</span> GST registration + VPOB
                  options
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Bank‑ready docs &amp;
                  compliance pack
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section className="rpz-strip">
        <div className="rpz-wrap rpz-stripIn">
          <div className="rpz-kpi">
            <b>2–5 days</b>
            <span>typical kick‑off</span>
          </div>
          <div className="rpz-kpi">
            <b>Pan‑India</b>
            <span>virtual addresses</span>
          </div>
          <div className="rpz-kpi">
            <b>7‑day</b>
            <span>support</span>
          </div>
        </div>
      </section>

      <section
        id="get-started"
        className="rpz-section"
        style={{ background: "#f8fafc" }}
      >
        <div className="rpz-wrap">
          <div
            id="rpz-form"
            className="rpz-card"
            style={{ padding: 0, overflow: "visible" }}
          >
            <div className="zf-templateWidth">
              <form
                acceptCharset="UTF-8"
                action="https://forms.zohopublic.in/accounts50/form/Startyourcompanyinminutes/formperma/68g_YDXz4itBdwhcBgZnUqlB1HlFPMNuwgbeX-Q0Wx0/htmlRecords/submit"
                encType="multipart/form-data"
                id="form"
                method="POST"
                name="form"
                onSubmit={(e) => {
                  (document.charset as any) = "UTF-8";
                  const result = (window as any).zf_ValidateAndSubmit
                    ? (window as any).zf_ValidateAndSubmit()
                    : true;
                  if (!result) e.preventDefault();
                }}
              >
                <input name="zf_referrer_name" type="hidden" value="" />
                <input name="zf_redirect_url" type="hidden" value="" />
                <input name="zc_gad" type="hidden" value="" />

                <div className="zf-templateWrapper">
                  <ul className="zf-tempHeadBdr">
                    <li className="zf-tempHeadContBdr">
                      <p className="zf-frmDesc"></p>
                      <div className="zf-clearBoth"></div>
                    </li>
                  </ul>
                  <div className="zf-subContWrap zf-topAlign">
                    <ul>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <span>
                            <input
                              {...({ checktype: "c1", fieldtype: "1" } as any)}
                              maxLength={255}
                              name="SingleLine"
                              placeholder=""
                              type="text"
                              defaultValue=""
                              data-testid="input-full-name"
                            />
                          </span>
                          <p
                            className="zf-errorMessage"
                            id="SingleLine_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <span>
                            <input
                              {...({ checktype: "c5", fieldtype: "9" } as any)}
                              maxLength={255}
                              name="Email"
                              placeholder=""
                              type="text"
                              defaultValue=""
                              data-testid="input-email"
                            />
                          </span>
                          <p
                            className="zf-errorMessage"
                            id="Email_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv zf-phonefld">
                          <div className="zf-phwrapper zf-phNumber">
                            <span>
                              <input
                                {...({
                                  checktype: "c7",
                                  compname: "PhoneNumber",
                                  fieldtype: "11",
                                  iscountrycodeenabled: "false",
                                  phoneformat: "1",
                                  phoneformattype: "1",
                                  valtype: "number",
                                } as any)}
                                id="international_PhoneNumber_countrycode"
                                maxLength={20}
                                name="PhoneNumber_countrycode"
                                placeholder=""
                                type="text"
                                defaultValue=""
                                data-testid="input-phone"
                              />
                              <label>Number</label>
                            </span>
                            <div className="zf-clearBoth"></div>
                          </div>
                          <p
                            className="zf-errorMessage"
                            id="PhoneNumber_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <span>
                            <input
                              {...({ checktype: "c1", fieldtype: "1" } as any)}
                              maxLength={255}
                              name="SingleLine1"
                              placeholder=""
                              type="text"
                              defaultValue=""
                              data-testid="input-company-name"
                            />
                          </span>
                          <p
                            className="zf-errorMessage"
                            id="SingleLine1_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <select
                            {...({ checktype: "c1" } as any)}
                            className="zf-form-sBox"
                            name="Dropdown"
                            data-testid="select-company-structure"
                          >
                            <option selected value="-Select-">
                              -Select-
                            </option>
                            <option value="Proprietorship">
                              Proprietorship
                            </option>
                            <option value="Partnership">Partnership</option>
                            <option value="LLP">LLP</option>
                            <option value="OPC">OPC</option>
                            <option value="PVT LTD">PVT LTD</option>
                          </select>
                          <p
                            className="zf-errorMessage"
                            id="Dropdown_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <select
                            {...({ checktype: "c1" } as any)}
                            className="zf-form-sBox"
                            name="Dropdown1"
                            data-testid="select-address-availability"
                          >
                            <option selected value="-Select-">
                              -Select-
                            </option>
                            <option value="Yes (i have a business address)">
                              Yes (i have a business address)
                            </option>
                            <option value="No (i need a Virtual Office)">
                              No (i need a Virtual Office)
                            </option>
                          </select>
                          <p
                            className="zf-errorMessage"
                            id="Dropdown1_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <select
                            {...({ checktype: "c1" } as any)}
                            className="zf-form-sBox"
                            name="Dropdown2"
                            data-testid="select-state"
                          >
                            <option selected value="-Select-">
                              -Select-
                            </option>
                            <option value="Andhra Pradesh">
                              Andhra Pradesh
                            </option>
                            <option value="Arunachal Pradesh">
                              Arunachal Pradesh
                            </option>
                            <option value="Assam">Assam</option>
                            <option value="Bihar">Bihar</option>
                            <option value="Chhattisgarh">Chhattisgarh</option>
                            <option value="Goa">Goa</option>
                            <option value="Gujarat">Gujarat</option>
                            <option value="Haryana">Haryana</option>
                            <option value="Himachal Pradesh">
                              Himachal Pradesh
                            </option>
                            <option value="Jharkhand">Jharkhand</option>
                            <option value="Karnataka">Karnataka</option>
                            <option value="Kerala">Kerala</option>
                            <option value="Madhya Pradesh">
                              Madhya Pradesh
                            </option>
                            <option value="Maharashtra">Maharashtra</option>
                            <option value="Manipur">Manipur</option>
                            <option value="Meghalaya">Meghalaya</option>
                            <option value="Mizoram">Mizoram</option>
                            <option value="Nagaland">Nagaland</option>
                            <option value="Odisha">Odisha</option>
                            <option value="Punjab">Punjab</option>
                            <option value="Rajasthan">Rajasthan</option>
                            <option value="Sikkim">Sikkim</option>
                            <option value="Tamil Nadu">Tamil Nadu</option>
                            <option value="Telangana">Telangana</option>
                            <option value="Tripura">Tripura</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Uttarakhand">Uttarakhand</option>
                            <option value="West Bengal">West Bengal</option>
                            <option value="Andaman & Nicobar Islands">
                              Andaman &amp; Nicobar Islands
                            </option>
                            <option value="Chandigarh">Chandigarh</option>
                            <option value="Dadra & Nagar Haveli and Daman & Diu">
                              Dadra &amp; Nagar Haveli and Daman &amp; Diu
                            </option>
                            <option value="Delhi (National Capital Territory of Delhi)">
                              Delhi (National Capital Territory of Delhi)
                            </option>
                            <option value="Jammu & Kashmir">
                              Jammu &amp; Kashmir
                            </option>
                            <option value="Ladakh">Ladakh</option>
                            <option value="Lakshadweep">Lakshadweep</option>
                            <option value="Puducherry">Puducherry</option>
                          </select>
                          <p
                            className="zf-errorMessage"
                            id="Dropdown2_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                      <div className="zf-tempFrmWrapper zf-large">
                        <div className="zf-tempContDiv">
                          <select
                            {...({ checktype: "c1" } as any)}
                            className="zf-form-sBox"
                            name="Dropdown3"
                            data-testid="select-business-activity"
                          >
                            <option selected value="-Select-">
                              -Select-
                            </option>
                            <option value="Ecommerce / D2C">
                              Ecommerce / D2C
                            </option>
                            <option value="IT / ITES / Tech">
                              IT / ITES / Tech
                            </option>
                            <option value="Financial Services / Fintech">
                              Financial Services / Fintech
                            </option>
                            <option value="Energy / Infra">
                              Energy / Infra
                            </option>
                            <option value="Real Estate / Construction">
                              Real Estate / Construction
                            </option>
                            <option value="Consultancy">Consultancy</option>
                            <option value="Others">Others</option>
                          </select>
                          <p
                            className="zf-errorMessage"
                            id="Dropdown3_error"
                            style={{ display: "none" }}
                          >
                            Invalid value
                          </p>
                        </div>
                        <div className="zf-clearBoth"></div>
                      </div>
                    </ul>
                  </div>
                  <ul>
                    <li className="zf-fmFooter">
                      <button
                        className="zf-submitColor"
                        data-testid="button-submit-form"
                      >
                        Submit
                      </button>
                    </li>
                  </ul>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="rpz-section" id="rpz-how">
        <div className="rpz-wrap">
          <h2 className="rpz-title">How it works</h2>
          <p className="rpz-sub">
            Register your company using a virtual office in India — end‑to‑end
            in clear, compliant steps.
          </p>
          <div className="rpz-steps">
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">1</div>
                <div>
                  <h3>Choose a provider</h3>
                  <p className="rpz-sub">
                    Pick a reliable virtual office (address, rent agreement,
                    utility bill, NOC, and compliance support).
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">2</div>
                <div>
                  <h3>Select business type</h3>
                  <p className="rpz-sub">
                    Pvt Ltd, LLP, OPC, Partnership, Sole Proprietorship, or
                    Section 8 (Non‑Profit).
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">3</div>
                <div>
                  <h3>Pick location</h3>
                  <p className="rpz-sub">
                    Choose city/state for your registered office based on
                    compliance or market needs.
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">4</div>
                <div>
                  <h3>Submit KYC</h3>
                  <p className="rpz-sub">
                    Directors/owners: PAN, Aadhaar/Passport, address proof,
                    passport photos.
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">5</div>
                <div>
                  <h3>Get DSC &amp; DIN</h3>
                  <p className="rpz-sub">
                    Digital Signature Certificates and Director Identification
                    Numbers (where required).
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">6</div>
                <div>
                  <h3>Receive VO documents</h3>
                  <p className="rpz-sub">
                    From provider: NOC, Rent/Lease Agreement, recent Utility
                    Bill (≤ 2 months).
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">7</div>
                <div>
                  <h3>Apply on MCA</h3>
                  <p className="rpz-sub">
                    File SPICe+ with MOA/AOA and registered office proofs;
                    attach VO docs and KYC.
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">8</div>
                <div>
                  <h3>Get incorporated</h3>
                  <p className="rpz-sub">
                    ROC issues Certificate of Incorporation, PAN, TAN, and CIN
                    on approval.
                  </p>
                </div>
              </div>
            </div>
            <div className="rpz-card">
              <div className="rpz-step">
                <div className="rpz-stepNum">9</div>
                <div>
                  <h3>Post‑registration</h3>
                  <p className="rpz-sub">
                    Annual filings, accounts, GST on VO address, banking &amp;
                    statutory communications.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <p className="rpz-sub" style={{ marginTop: "10px" }}>
            Virtual offices are legal for registration and ideal for startups,
            e‑commerce, freelancers, and SMEs expanding into new jurisdictions.
          </p>
        </div>
      </section>

      <section
        className="rpz-section"
        id="rpz-checklist"
        style={{ background: "#f6f7fb" }}
      >
        <div className="rpz-wrap">
          <h2 className="rpz-title">Typical document checklist</h2>
          <div
            className="rpz-grid"
            style={{ gridTemplateColumns: "repeat(2, 1fr)" }}
          >
            <div className="rpz-card">
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> NOC from virtual office
                  provider
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Rent/Lease Agreement
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Utility bill (not older
                  than 2 months)
                </li>
                <li>
                  <span className="rpz-tick">✓</span> KYC/ID of
                  directors/partners
                </li>
              </ul>
            </div>
            <div className="rpz-card">
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> DSC and DIN (as
                  applicable)
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Passport‑size photos
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Business name choices
                  &amp; contact details
                </li>
                <li>
                  <span className="rpz-tick">✓</span> MOA/AOA for company types
                  that require it
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section
        className="rpz-section"
        id="rpz-pricing"
        style={{ background: "#f6f7fb" }}
      >
        <div className="rpz-wrap">
          <h2 className="rpz-title">Transparent pricing</h2>
          <p className="rpz-sub">Government fees are passed through at cost.</p>
          <div className="rpz-plans">
            <div className="rpz-card">
              <span className="rpz-tag">Solo</span>
              <h3>Proprietorship</h3>
              <div className="rpz-price">₹2,499</div>
              <div className="rpz-priceNote">
                + Govt Fees · + Virtual Office (if needed)
              </div>
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> GST registration
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Bank‑ready docs
                </li>
                <li>
                  <span className="rpz-tick">✓</span> Basic compliance roadmap
                </li>
              </ul>
              <a
                href="#get-started"
                className="rpz-btn rpz-btn--primary rpz-plan"
                data-plan="proprietorship"
                data-testid="button-start-proprietorship"
              >
                Start here
              </a>
            </div>
            <div className="rpz-card">
              <span className="rpz-tag">Popular</span>
              <h3>LLP</h3>
              <div className="rpz-price">₹2,499</div>
              <div className="rpz-priceNote">
                + Govt Fees · + Virtual Office (if needed)
              </div>
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> Partners onboarding
                </li>
                <li>
                  <span className="rpz-tick">✓</span> DIN/PAN/TAN (as
                  applicable)
                </li>
                <li>
                  <span className="rpz-tick">✓</span> GST + compliance pack
                </li>
              </ul>
              <a
                href="#get-started"
                className="rpz-btn rpz-btn--primary rpz-plan"
                data-plan="llp"
                data-testid="button-start-llp"
              >
                Start here
              </a>
            </div>
            <div className="rpz-card">
              <span className="rpz-tag">Scale</span>
              <h3>Pvt Ltd / OPC</h3>
              <div className="rpz-price">₹2,499</div>
              <div className="rpz-priceNote">
                + Govt Fees · + Virtual Office (if needed)
              </div>
              <ul className="rpz-bullets">
                <li>
                  <span className="rpz-tick">✓</span> Directors onboarding
                </li>
                <li>
                  <span className="rpz-tick">✓</span> MoA/AoA drafting
                </li>
                <li>
                  <span className="rpz-tick">✓</span> GST + compliance pack
                </li>
              </ul>
              <a
                href="#get-started"
                className="rpz-btn rpz-btn--primary rpz-plan"
                data-plan="pvt"
                data-testid="button-start-pvt"
              >
                Start here
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="rpz-section">
        <div className="rpz-wrap rpz-test">
          <div className="rpz-quote">
            "thegstco got our Pvt Ltd up and running quickly. The VPOB add‑on
            saved us weeks."<small>— D2C brand, Mumbai</small>
          </div>
          <div className="rpz-quote">
            "Zero paperwork stress. They handled GST, DIN, and all filings.
            Recommended."<small>— SaaS founder, Pune</small>
          </div>
        </div>
      </section>

      <section className="rpz-section">
        <div className="rpz-wrap rpz-faq">
          <h2 className="rpz-title">FAQ</h2>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-1">
              How fast can I get started? <span>+</span>
            </div>
            <div className="rpz-faqA">
              Right away. Click "Get started" — our 5‑step intake takes a couple
              of minutes.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-2">
              Do you provide virtual office addresses? <span>+</span>
            </div>
            <div className="rpz-faqA">
              Yes. Choose "No (I need a Virtual Office)" in the form and select
              your state.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-3">
              Is GST registration included? <span>+</span>
            </div>
            <div className="rpz-faqA">
              Yes — for relevant plans. We also help with VPOB for multi‑state
              sellers.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-4">
              Can I use a virtual office for MCA company registration?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              Yes, virtual offices are 100% legal for MCA registrations. We
              provide all required documents — NOC, rent agreement, and utility
              bills — so your registered office is compliant from day one.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-5">
              What documents do I need for company registration? <span>+</span>
            </div>
            <div className="rpz-faqA">
              You'll need PAN, Aadhaar (or passport for NRIs), address proof,
              passport photos, and proposed company name. If you're registering
              a Pvt Ltd or LLP, you'll also need DIN and DSC for
              directors/partners.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-6">
              How long does company registration take? <span>+</span>
            </div>
            <div className="rpz-faqA">
              Typically 7-14 working days from submission to certificate of
              incorporation, depending on the entity type and MCA processing
              times. We keep you updated at every step.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-7">
              What's the difference between OPC, LLP, and Pvt Ltd?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              OPC is for single founders with limited liability; LLP offers
              flexibility for 2+ partners with lower compliance; Pvt Ltd is
              ideal for raising funding and scaling, requires minimum 2
              directors and shareholders.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-8">
              Are virtual offices accepted by banks for opening accounts?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              Yes, most banks accept virtual offices for current account
              opening. We provide bank‑ready documentation including NOC and
              utility bills to facilitate smooth account opening.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-9">
              What are the government fees for company registration?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              Government fees vary: ₹500 for Proprietorship GST, ₹4,500-7,000
              for LLP, ₹7,000-10,000 for OPC/Pvt Ltd (depends on authorized
              capital). These are separate from our service fees and paid
              directly to MCA/ROC.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-10">
              Do I need a physical office for compliance? <span>+</span>
            </div>
            <div className="rpz-faqA">
              No. Virtual offices are legally valid for all statutory filings,
              GST, ROC annual returns, and tax compliance. You'll receive mail
              forwarding and can use the address for all official
              correspondence.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-11">
              Can I register my company in any state with a virtual office?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              Yes, we offer virtual offices across all major cities and states
              in India. Choose based on your business needs, tax benefits, or
              target market location.
            </div>
          </div>
          <div className="rpz-faqItem">
            <div className="rpz-faqQ" data-testid="faq-question-12">
              What post-registration compliance support do you provide?{" "}
              <span>+</span>
            </div>
            <div className="rpz-faqA">
              We provide a complete compliance calendar covering annual ROC
              filings, GST returns, income tax filing, director KYC, and
              statutory audits. You'll know exactly what's due and when.
            </div>
          </div>
        </div>
      </section>

      <div className="rpz-sticky" id="rpz-stick">
        <div className="rpz-stickyIn">
          <div>
            <strong>Start now</strong>
            <div className="rpz-sub">2–5 days typical kick‑off</div>
          </div>
          <a
            href="#get-started"
            className="rpz-btn rpz-btn--primary"
            id="rpz-cta-sticky"
            data-testid="button-open-form-sticky"
          >
            Open form
          </a>
        </div>
      </div>

      <div id="rpz-modal">
        <div className="rpz-modalCard">
          <div className="rpz-modalHead">
            <strong>Start your company</strong>
            <button
              className="rpz-x"
              id="rpz-x"
              data-testid="button-close-modal"
            >
              Close
            </button>
          </div>
          <div className="rpz-modalBody">
            <iframe
              className="rpz-iframe"
              id="rpz-iframe"
              src="https://forms.zohopublic.in/accounts50/form/Startyourcompanyinminutes/formperma/68g_YDXz4itBdwhcBgZnUqlB1HlFPMNuwgbeX-Q0Wx0/htmlRecords/submit?utm_source=lp-rize"
              title="Start your company form"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      <Footer location={currentLocation} />
    </div>
  );
}
