import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type TPaymentStatus = 'active' | 'inactive'
export interface Payment {
  status: TPaymentStatus
}
const initialState: Payment = {
  status: 'inactive',
}
const paymentReducer = createSlice({
  name: 'payment',
  initialState,
  reducers: {
    updateStatus(state, action: PayloadAction<Payment>) {
      return {
        ...state,
        ...action.payload,
      }
    },
  },
})
export const { updateStatus } = paymentReducer.actions
export const PaymentReducer = paymentReducer.reducer
