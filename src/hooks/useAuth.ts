import { activateAccount, login, logout } from "@/api/apiAuth"
import { useMutation } from "@tanstack/react-query"
import useNavigation from "./useNavigation"
import { useAuthStore } from "@/store/stores/authStore"
import MessageToast from "@/components/iu/messages/MessageToast"


const useAuth = () => {

  const { goView } = useNavigation()
  const { setAuth, clearAuth } = useAuthStore()

  // Inicio de sesión
  const loginMutation = useMutation({
    mutationFn: login,
    onSuccess: data => {
      // Guardamos la sesión en el localStorage
      setAuth(data.user, data.tokens)
      
      MessageToast({
        icon: 'success',
        title: 'Exitoso',
        message: data.message
      })

      // Ir a Dashboard
      goView('/home')
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({
        icon: 'error',
        title: 'Error',
        message: messageFormat.error
      })
    }
  })
  
  // Cierre de sesión
  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: data => {
      // Limpiamos la sesión del usuario
      clearAuth()

      MessageToast({
        icon: 'success',
        title: 'Exitoso',
        message: data.message
      })

      // Llevamos al login
      goView('/login')
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({
        icon: 'error',
        title: 'Error',
        message: messageFormat.error
      })
    }
  })

  // Activación de cuenta
  const activateAccountMutation = useMutation({
    mutationFn: activateAccount,
    onSuccess: data => {
      goView('/login')

      MessageToast({
        icon: 'success',
        title: 'Exitoso',
        message: data.message
      })
    },
    onError: error => {
      const messageFormat = JSON.parse(error.message)
      MessageToast({
        icon: 'error',
        title: 'Error',
        message: messageFormat.error
      })
    }
  })

  return {
    auth: loginMutation.mutate,
    isPendingAuth: loginMutation.isPending,
    isErrorAuth: loginMutation.isError,
    errorAuth: loginMutation.error,
    
    closeSession: logoutMutation.mutate,
    isPendingCloseSession: logoutMutation.isPending,

    activateAccount: activateAccountMutation.mutate,
    isPendingActivateAccoount: activateAccountMutation.isPending,
    isErrorActivateAccoount: activateAccountMutation.isError,
    errorActivateAccoount: activateAccountMutation.error,
  }
}

export default useAuth
