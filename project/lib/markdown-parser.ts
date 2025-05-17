import { marked } from "marked"
import DOMPurify from "dompurify"

// Configure marked options
marked.setOptions({
  breaks: true,
  gfm: true,
})

// Custom renderer to handle code blocks with basic styling
const renderer = new marked.Renderer()
renderer.code = (code, language) => {
  return `
    <pre class="relative bg-zinc-100 dark:bg-zinc-900 p-4 rounded-md overflow-x-auto">
      <code class="language-${language || "plaintext"}">${code}</code>
    </pre>
  `
}

marked.use({ renderer })

export function parseMarkdown(content: string): string {
  // Parse markdown to HTML
  const html = marked.parse(content)

  // Sanitize HTML to prevent XSS attacks
  const sanitizedHtml = typeof window !== "undefined" ? DOMPurify.sanitize(html) : html // Server-side fallback

  return sanitizedHtml
}
