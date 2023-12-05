import { DefaultResponse } from '@services/index'
import ApiUtil from '@utils/AxiosInstance'

const endpoints = {
  getPrices: '/subscribe/get-prices',
  getPaymentIntent: '/subscribe',
  unsubscribePremium: '/subscribe/unsubscribe',
}
export interface Plan {
  id: string
  product: string
  unitAmount: number
  currency: string
  interval: string
}
export interface Invoice {
  paymentIntentId: string
  total: number
  currency: string
  status: string
  periodStart: string
  periodEnd: string
}
export interface GetPricesRes extends DefaultResponse {
  data: Plan[]
}
export interface GetPaymentIntentRes extends DefaultResponse {
  data: Invoice
}
export interface CardInformation {
  number: string
  exp_month: number
  exp_year: number
  cvc: string
}
export interface SubscribePremiumReq {
  priceId: string
  card: CardInformation
}
export const PaymentService = {
  getPrices() {
    return ApiUtil.get<GetPricesRes>(endpoints.getPrices)
  },
  getPaymentIntent() {
    return ApiUtil.get<GetPaymentIntentRes>(endpoints.getPaymentIntent)
  },
  unsubscribePremium() {
    return ApiUtil.post<DefaultResponse>(endpoints.unsubscribePremium, {})
  },
  subcribePremium(payload: SubscribePremiumReq) {
    return ApiUtil.post<DefaultResponse>(endpoints.getPaymentIntent, payload)
  },
}
