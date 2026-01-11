import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import type { LucideIcon } from "lucide-react"
import useMediaQueries from "@/hooks/useMediaQueries"
import Spinner from "../spinner/Spinner"


interface ButtonIconLoadingProps {
  icon: LucideIcon
  className?: string
  isLoading?: boolean
  bgColor?: 'primary' | 'secundary'
  type?: "submit" | "reset" | "button"
  onClick?: () => void
  large?: 'w-full' | 'w-auto'
  disabled?: boolean
}

const ButtonIconLoading = ({
  icon: Icon,
  className = "",
  isLoading = false,
  bgColor = 'primary',
  type = "button",
  onClick,
  large = 'w-full',
  disabled
}: ButtonIconLoadingProps) => {
  // Hooks
  const { isDesktop, isMobile } = useMediaQueries()

  // Referencias para GSAP
  const iconRef = useRef<HTMLDivElement>(null)
  const spinnerRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLSpanElement>(null)
  const loadingTextRef = useRef<HTMLSpanElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Animación con GSAP mejorada
  useEffect(() => {
    const icon = iconRef.current
    const spinner = spinnerRef.current
    const textElement = textRef.current
    const loadingTextElement = loadingTextRef.current
    const button = buttonRef.current

    if (!icon || !spinner || !button) return

    // Crear timeline principal
    const tl = gsap.timeline()

    if (isLoading) {
      // Estado inicial del spinner (invisible y escalado pequeño)
      gsap.set(spinner, {
        opacity: 0,
        scale: 0.3,
        rotation: 0
      })

      // Animación de entrada del loading
      tl.to(icon, {
        scale: 0.3,
        opacity: 0,
        rotation: 90,
        duration: 0.25,
        ease: "power2.in"
      })

      // Animar texto si no es mobile
      if (!isMobile && textElement && loadingTextElement) {
        tl.to(textElement, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in"
        }, "-=0.15")
      }

      // Entrada del spinner con efecto de escala y rotación
      tl.to(spinner, {
        scale: 1,
        opacity: 1,
        duration: 0.3,
        ease: "back.out(1.2)"
      }, "-=0.1")

      // Animar texto de loading
      if (!isMobile && loadingTextElement) {
        gsap.set(loadingTextElement, { opacity: 0, y: 10 })
        tl.to(loadingTextElement, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        }, "-=0.2")
      }

      // Efecto de "pulsación" sutil en el botón
      tl.to(button, {
        scale: 0.98,
        duration: 0.1,
        ease: "power2.out"
      })
        .to(button, {
          scale: 1,
          duration: 0.15,
          ease: "power2.out"
        })

    } else {
      // Animación de salida del loading
      tl.to(spinner, {
        scale: 0.3,
        opacity: 0,
        rotation: 180,
        duration: 0.25,
        ease: "power2.in"
      })

      // Ocultar texto de loading
      if (!isMobile && loadingTextElement) {
        tl.to(loadingTextElement, {
          opacity: 0,
          y: -10,
          duration: 0.2,
          ease: "power2.in"
        }, "-=0.15")
      }

      // Estado inicial del ícono antes de aparecer
      gsap.set(icon, {
        scale: 0.3,
        opacity: 0,
        rotation: -90
      })

      // Entrada del ícono
      tl.to(icon, {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.3,
        ease: "back.out(1.2)"
      }, "-=0.1")

      // Mostrar texto normal
      if (!isMobile && textElement) {
        gsap.set(textElement, { opacity: 0, y: 10 })
        tl.to(textElement, {
          opacity: 1,
          y: 0,
          duration: 0.25,
          ease: "power2.out"
        }, "-=0.2")
      }
    }

    return () => {
      tl.kill()
    }
  }, [isLoading, isMobile])

  // Configuración de colores mejorada
  const getButtonStyles = () => {
    const baseStyles = {
      primary: {
        bg: 'bg-[#4E7FBF]',
        hover: 'hover:bg-[#44556F]',
        disabled: 'disabled:bg-gray-400'
      },
      secundary: {
        bg: 'bg-gray-700',
        hover: 'hover:bg-gray-800',
        disabled: 'disabled:bg-gray-400'
      }
    }
    return baseStyles[bgColor]
  }

  const styles = getButtonStyles()

  const buttonClasses = isMobile
    ? `w-12 h-12 rounded-full flex items-center justify-center cursor-pointer ${styles.bg} ${styles.hover} ${styles.disabled} transition-all duration-300 transform disabled:cursor-not-allowed disabled:transform-none ${className}`
    : `${large} px-1 py-2 rounded-lg flex justify-center cursor-pointer ${styles.bg} ${styles.hover} ${styles.disabled} transition-all duration-300 transform disabled:cursor-not-allowed disabled:transform-none ${className}`

  return (
    <div className="flex justify-center">
      <button
        ref={buttonRef}
        onClick={onClick}
        type={type}
        disabled={isLoading || disabled}
        className={buttonClasses}
      >
        {/* Contenedor para el ícono y spinner */}
        <div className="relative">
          {/* Elemento para mantener el espacio consistente */}
          <div className={`${isDesktop ? 'w-6 h-6' : 'w-5 h-5'}`} />

          {/* Ícono principal */}
          <div
            ref={iconRef}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Icon className={`${isDesktop ? 'w-6 h-6' : 'w-5 h-5'} text-white`} />
          </div>

          {/* Spinner de loading */}
          <div
            ref={spinnerRef}
            className="absolute inset-0 flex items-center justify-center opacity-0"
          >
            <Spinner
              size={isDesktop ? 24 : 20}
              color="border-white"
              speed={0.8}
            />
          </div>
        </div>
      </button>
    </div>
  )
}

export default ButtonIconLoading