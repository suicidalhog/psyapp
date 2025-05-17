import type { PutBlobResult } from "@vercel/blob"
import { getToken } from "next-auth/jwt"
import type { NextRequest } from "next/server"

// Helper function to check if a user is authenticated
export async function isAuthenticated(request: NextRequest) {
  const token = await getToken({ req: request })
  return !!token
}

// Helper function to get the user ID from the request
export async function getUserId(request: NextRequest): Promise<string> {
  const token = await getToken({ req: request })
  return (token?.id as string) || "anonymous"
}

// Helper function to generate a unique filename
export function generateUniqueFilename(originalFilename: string): string {
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 10)
  const extension = originalFilename.split(".").pop()
  return `${timestamp}-${randomString}.${extension}`
}

// Helper function to get the MIME type based on file extension
export function getMimeType(filename: string): string {
  const extension = filename.split(".").pop()?.toLowerCase()

  const mimeTypes: Record<string, string> = {
    pdf: "application/pdf",
    doc: "application/msword",
    docx: "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    txt: "text/plain",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    csv: "text/csv",
    xls: "application/vnd.ms-excel",
    xlsx: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  }

  return mimeTypes[extension || ""] || "application/octet-stream"
}

// Helper function to check if a file is an image
export function isImage(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase()
  return ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension || "")
}

// Helper function to check if a file is a document
export function isDocument(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase()
  return ["pdf", "doc", "docx", "txt", "rtf", "md"].includes(extension || "")
}

// Helper function to check if a file is a spreadsheet
export function isSpreadsheet(filename: string): boolean {
  const extension = filename.split(".").pop()?.toLowerCase()
  return ["csv", "xls", "xlsx"].includes(extension || "")
}

// Helper to get file metadata from a Blob result
export function getFileMetadata(blob: PutBlobResult) {
  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: blob.contentType,
    contentDisposition: blob.contentDisposition,
    size: blob.size,
    uploadedAt: new Date().toISOString(),
  }
}

// Maximum file size (10MB)
export const MAX_FILE_SIZE = 10 * 1024 * 1024
