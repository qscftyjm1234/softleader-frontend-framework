// products/productClientA.ts
// @ts-ignore
import { productDefault } from './productDefault'
// @ts-ignore
import { clientAFlow } from '../router/flows/clientAClientFlow'
// @ts-ignore
import { clientAAuthService } from '../services/clientAAuthService'

export const productClientA = {
  ...productDefault,
  flow: clientAFlow, // 客戶化流程
  theme: 'dark', // 客戶化主題
  serviceOverrides: {
    auth: clientAAuthService // 客製化 API
  }
}
