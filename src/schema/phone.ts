/**
 * Отправка кода подтверждения на телефон
 */
export type MakeCallType = {
  request: {
    phone: string,
    userIP?: string,
  }
  response: {
    status: string,
    code: string,
    call_id: string,
    balance: string,
    cost: string
  }
}