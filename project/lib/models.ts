export interface AIModel {
  id: string
  name: string
  provider: "openai" | "xai" | "gemini" | "deepseek" | "anthropic"
  modelId: string
  description: string
  emoji: string
  apiKeyRequired?: boolean
}

export const models: AIModel[] = [
  // OpenAI Models
  {
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    provider: "openai",
    modelId: "gpt-4o-mini",
    description: "Smaller, faster version of GPT-4o with strong reasoning capabilities",
    emoji: "🧠",
  },
  {
    id: "gpt-4o",
    name: "GPT-4o",
    provider: "openai",
    modelId: "gpt-4o",
    description: "OpenAI's most advanced model with strong reasoning and multimodal capabilities",
    emoji: "🔮",
  },
  {
    id: "gpt-4-turbo",
    name: "GPT-4 Turbo",
    provider: "openai",
    modelId: "gpt-4-turbo",
    description: "Powerful model with a good balance of intelligence and speed",
    emoji: "⚡",
  },

  // xAI (Grok) Models
  {
    id: "grok-1",
    name: "Grok-1",
    provider: "xai",
    modelId: "grok-1",
    description: "xAI's conversational model with real-time knowledge",
    emoji: "🤖",
  },

  // Google Models
  {
    id: "gemini-pro",
    name: "Gemini Pro",
    provider: "gemini",
    modelId: "gemini-pro",
    description: "Google's advanced multimodal model",
    emoji: "💎",
  },
  {
    id: "gemini-ultra",
    name: "Gemini Ultra",
    provider: "gemini",
    modelId: "gemini-ultra",
    description: "Google's most capable model for highly complex tasks",
    emoji: "🌟",
  },

  // DeepSeek Models
  {
    id: "deepseek-coder",
    name: "DeepSeek Coder",
    provider: "deepseek",
    modelId: "deepseek-coder",
    description: "Specialized for code generation and understanding",
    emoji: "👨‍💻",
    apiKeyRequired: true,
  },
  {
    id: "deepseek-chat",
    name: "DeepSeek Chat",
    provider: "deepseek",
    modelId: "deepseek-chat",
    description: "General purpose conversational AI",
    emoji: "💬",
    apiKeyRequired: true,
  },

  // Anthropic (Claude) Models
  {
    id: "claude-3-opus",
    name: "Claude 3 Opus",
    provider: "anthropic",
    modelId: "claude-3-opus",
    description: "Anthropic's most powerful model for complex tasks",
    emoji: "🎭",
    apiKeyRequired: true,
  },
  {
    id: "claude-3-sonnet",
    name: "Claude 3 Sonnet",
    provider: "anthropic",
    modelId: "claude-3-sonnet",
    description: "Balanced performance for most tasks",
    emoji: "📜",
    apiKeyRequired: true,
  },
  {
    id: "claude-3-haiku",
    name: "Claude 3 Haiku",
    provider: "anthropic",
    modelId: "claude-3-haiku",
    description: "Fast and efficient for simpler tasks",
    emoji: "🍃",
    apiKeyRequired: true,
  },
]

export const getModelById = (id: string): AIModel => {
  return models.find((m) => m.id === id) || models[0]
}
