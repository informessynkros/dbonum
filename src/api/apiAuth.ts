// Endpoints de autenticación

import { handleApiError } from "@/helpers/errorHandler"
import type { ActivateAccountSchema, AuthSchema } from "@/schemas/authSchema"
import api from "@/utils/axios"


// - Inicio de sesión
export const login = async (authData: AuthSchema) => {
  try{
    const { data } = await api.post('/auth/login', authData)
    return data
  } catch (error) {
    handleApiError(error)
  }
}

// - Cierre de sesión
export const logout = async (checkpoint: string) => {
  try{
    const { data } = await api.post('/auth/logout', { checkpoint })
    return data
  } catch (error) {
    handleApiError(error)
  }
}

// - Activación de cuenta
export const activateAccount = async (accountData: ActivateAccountSchema) => {
  try {
    const { data } = await api.post('/auth/activate-account', accountData)
    return data
  } catch (error) {
    handleApiError(error)
  }
}
