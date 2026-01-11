
export interface AuthSchema {
  checkpoint: string
  cipher: string
}

export interface ActivateAccountSchema {
  checkpoint: string
  cipher_temporary: string
  cipher_new: string
}
