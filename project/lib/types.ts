import type { CoreMessage } from "ai"

export interface Conversation {
  id: string
  title: string
  messages: CoreMessage[]
  createdAt: string
  updatedAt: string
  personalityId: string
  modelId: string
  userId?: string // Add userId to track conversation ownership
}

export interface ConversationMetadata {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  preview: string
}
