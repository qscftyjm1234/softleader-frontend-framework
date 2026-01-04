/**
 * User Schema 定義
 *
 * 使用 Zod 定義 User 相關的 API Schema
 * 確保 Mock 資料與真實 API 型別一致
 */

import { z } from 'zod'

/**
 * 使用者 Schema
 */
export const UserSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string().email(),
  role: z.enum(['admin', 'user', 'guest']),
  avatar: z.string().url().optional(),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime()
})

/**
 * 使用者列表響應 Schema
 */
export const UserListResponseSchema = z.object({
  data: z.array(UserSchema),
  total: z.number(),
  page: z.number(),
  limit: z.number()
})

/**
 * 使用者詳情響應 Schema
 */
export const UserDetailResponseSchema = UserSchema

/**
 * 建立使用者請求 Schema
 */
export const CreateUserRequestSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(8),
  role: z.enum(['admin', 'user', 'guest']).optional()
})

/**
 * 更新使用者請求 Schema
 */
export const UpdateUserRequestSchema = CreateUserRequestSchema.partial()

// 匯出型別
export type User = z.infer<typeof UserSchema>
export type UserListResponse = z.infer<typeof UserListResponseSchema>
export type UserDetailResponse = z.infer<typeof UserDetailResponseSchema>
export type CreateUserRequest = z.infer<typeof CreateUserRequestSchema>
export type UpdateUserRequest = z.infer<typeof UpdateUserRequestSchema>
