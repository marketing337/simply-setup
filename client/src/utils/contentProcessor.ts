export function processWysiwygContent(content: string): string {
  let processedContent = content;

  // Handle WYSIWYG editor artifacts - remove unwanted pre tags with ql-syntax class
  const preRegex = /<pre[^>]*class="ql-syntax"[^>]*>([\s\S]*?)<\/pre>/g;
  processedContent = processedContent.replace(
    preRegex,
    (match, innerContent) => {
      // Decode HTML entities and return clean content
      let decoded = innerContent
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"')
        .replace(/&nbsp;/g, ' ')
        .replace(/&amp;/g, '&');
      
      // If this looks like a full HTML document, extract just the body content
      const bodyMatch = decoded.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
      if (bodyMatch) {
        return bodyMatch[1];
      }
      
      return decoded;
    }
  );

  // Remove other ReactQuill artifacts
  processedContent = processedContent.replace(/class="ql-[^"]*"/g, '');
  processedContent = processedContent.replace(/spellcheck="false"/g, '');

  // Remove any remaining HTML document structure that might have been missed
  processedContent = processedContent.replace(/<!DOCTYPE[^>]*>/gi, '');
  processedContent = processedContent.replace(/<\/?html[^>]*>/gi, '');
  processedContent = processedContent.replace(/<head[\s\S]*?<\/head>/gi, '');
  processedContent = processedContent.replace(/<\/?body[^>]*>/gi, '');

  // Add IDs to headings for anchor links
  processedContent = processedContent.replace(
    /<h([1-6])([^>]*)>(.*?)<\/h[1-6]>/gi,
    (match, level, attributes, text) => {
      const cleanText = text.replace(/<[^>]*>/g, '');
      const id = cleanText.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
      return `<h${level}${attributes} id="${id}" class="scroll-mt-20">${text}</h${level}>`;
    }
  );

  // Enhance paragraphs with better spacing
  processedContent = processedContent.replace(
    /<p([^>]*)>/gi,
    '<p$1 class="mb-4 leading-relaxed">'
  );

  // Enhance lists with better styling
  processedContent = processedContent.replace(
    /<ul([^>]*)>/gi,
    '<ul$1 class="mb-6 space-y-2 list-disc list-inside">'
  );

  processedContent = processedContent.replace(
    /<ol([^>]*)>/gi,
    '<ol$1 class="mb-6 space-y-2 list-decimal list-inside">'
  );

  // Enhance list items
  processedContent = processedContent.replace(
    /<li([^>]*)>/gi,
    '<li$1 class="leading-relaxed">'
  );

  // Enhance headings with better styling
  processedContent = processedContent.replace(
    /<h1([^>]*)>/gi,
    '<h1$1 class="text-3xl md:text-4xl font-bold mb-6 mt-8 text-gray-900 leading-tight">'
  );

  processedContent = processedContent.replace(
    /<h2([^>]*)>/gi,
    '<h2$1 class="text-2xl md:text-3xl font-bold mb-4 mt-8 text-gray-900 leading-tight">'
  );

  processedContent = processedContent.replace(
    /<h3([^>]*)>/gi,
    '<h3$1 class="text-xl md:text-2xl font-semibold mb-3 mt-6 text-gray-900 leading-tight">'
  );

  processedContent = processedContent.replace(
    /<h4([^>]*)>/gi,
    '<h4$1 class="text-lg md:text-xl font-semibold mb-3 mt-6 text-gray-900 leading-tight">'
  );

  processedContent = processedContent.replace(
    /<h5([^>]*)>/gi,
    '<h5$1 class="text-base md:text-lg font-semibold mb-2 mt-4 text-gray-900 leading-tight">'
  );

  processedContent = processedContent.replace(
    /<h6([^>]*)>/gi,
    '<h6$1 class="text-sm md:text-base font-semibold mb-2 mt-4 text-gray-900 leading-tight">'
  );

  // Enhance blockquotes
  processedContent = processedContent.replace(
    /<blockquote([^>]*)>/gi,
    '<blockquote$1 class="border-l-4 border-blue-500 pl-4 my-6 italic text-gray-700 bg-blue-50 py-4 rounded-r">'
  );

  // Enhance tables
  processedContent = processedContent.replace(
    /<table([^>]*)>/gi,
    '<table$1 class="w-full border-collapse border border-gray-300 my-6 text-sm">'
  );

  processedContent = processedContent.replace(
    /<th([^>]*)>/gi,
    '<th$1 class="border border-gray-300 bg-gray-50 px-4 py-2 font-semibold text-left">'
  );

  processedContent = processedContent.replace(
    /<td([^>]*)>/gi,
    '<td$1 class="border border-gray-300 px-4 py-2">'
  );

  // Enhance links
  processedContent = processedContent.replace(
    /<a([^>]*)>/gi,
    '<a$1 class="text-blue-600 hover:text-blue-800 underline">'
  );

  // Enhance images
  processedContent = processedContent.replace(
    /<img([^>]*)>/gi,
    '<img$1 class="max-w-full h-auto rounded-lg shadow-sm my-4">'
  );

  // Enhance strong/bold text
  processedContent = processedContent.replace(
    /<strong([^>]*)>/gi,
    '<strong$1 class="font-bold text-gray-900">'
  );

  // Enhance em/italic text
  processedContent = processedContent.replace(
    /<em([^>]*)>/gi,
    '<em$1 class="italic text-gray-700">'
  );

  return processedContent;
}