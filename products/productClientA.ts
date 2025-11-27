// products/productClientA.ts
import { productDefault } from './productDefault'
import { clientAFlow } from '../router/flows/clientAClientFlow'
import { clientAAuthService } from '../services/clientAAuthService'

export const productClientA = {
  ...productDefault,
  flow: clientAFlow,               // 客戶化流程
  theme: 'dark',                   // 客戶化主題
  serviceOverrides: {
    auth: clientAAuthService       // 客製化 API
  }
}