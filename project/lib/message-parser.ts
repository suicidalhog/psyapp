// Regular expressions for detecting code blocks
const CODE_BLOCK_REGEX = /```([a-zA-Z0-9_-]*)\n([\s\S]*?)```/g
const INLINE_CODE_REGEX = /`([^`]+)`/g

export interface CodeBlock {
  language: string
  code: string
}

export interface MessageSegment {
  type: "text" | "code" | "inlineCode"
  content: string
  language?: string
}

export function parseMessage(content: string): MessageSegment[] {
  const segments: MessageSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // Reset regex state
  CODE_BLOCK_REGEX.lastIndex = 0

  // Find all code blocks
  while ((match = CODE_BLOCK_REGEX.exec(content)) !== null) {
    const [fullMatch, language, code] = match
    const startIndex = match.index

    // Add text before code block
    if (startIndex > lastIndex) {
      const textSegment = content.substring(lastIndex, startIndex)
      segments.push(...parseInlineCode(textSegment))
    }

    // Add code block
    segments.push({
      type: "code",
      content: code.trim(),
      language: language || "plaintext",
    })

    lastIndex = startIndex + fullMatch.length
  }

  // Add remaining text
  if (lastIndex < content.length) {
    const textSegment = content.substring(lastIndex)
    segments.push(...parseInlineCode(textSegment))
  }

  return segments
}

// Helper function to parse inline code within text segments
function parseInlineCode(text: string): MessageSegment[] {
  const segments: MessageSegment[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null

  // Reset regex state
  INLINE_CODE_REGEX.lastIndex = 0

  // Find all inline code
  while ((match = INLINE_CODE_REGEX.exec(text)) !== null) {
    const [fullMatch, code] = match
    const startIndex = match.index

    // Add text before inline code
    if (startIndex > lastIndex) {
      segments.push({
        type: "text",
        content: text.substring(lastIndex, startIndex),
      })
    }

    // Add inline code
    segments.push({
      type: "inlineCode",
      content: code,
    })

    lastIndex = startIndex + fullMatch.length
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({
      type: "text",
      content: text.substring(lastIndex),
    })
  }

  return segments
}
