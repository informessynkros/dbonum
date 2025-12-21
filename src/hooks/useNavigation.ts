// Hook de navegación
import { useNavigate } from '@tanstack/react-router'


const useNavigation = () => {

  const navigate = useNavigate()

  // Regresar a la vista anterior
  const goBack = () => {
    window.history.back()
  }

  const goView = (to: string) => {
    navigate({ to })
  }

  return { goBack, goView }
}

export default useNavigation
