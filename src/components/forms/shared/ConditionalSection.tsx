import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'


interface ConditionalSectionProps {
  show: boolean
  children: React.ReactNode
  animationType?: 'fade' | 'slide' | 'scale'
  className?: string
}

const ConditionalSection = ({
  show,
  children,
  animationType = 'slide',
  className = ''
}: ConditionalSectionProps) => {
  
  const sectionRef = useRef<HTMLDivElement>(null)
  const previousShow = useRef<boolean>(show)

  useEffect(() => {
    if (!sectionRef.current) return

    // Si cambia de oculto a visible
    if (show && !previousShow.current) {
      const element = sectionRef.current

      // Configurar animación según tipo
      switch (animationType) {
        case 'fade':
          gsap.fromTo(element,
            { opacity: 0 },
            { opacity: 1, duration: 0.3, ease: 'power2.out' }
          )
          break

        case 'slide':
          gsap.fromTo(element,
            { 
              opacity: 0, 
              y: -20,
              height: 0,
              overflow: 'hidden'
            },
            { 
              opacity: 1, 
              y: 0,
              height: 'auto',
              duration: 0.4, 
              ease: 'power2.out',
              onComplete: () => {
                // Remover overflow hidden después de la animación
                if (element) {
                  element.style.overflow = 'visible'
                }
              }
            }
          )
          break

        case 'scale':
          gsap.fromTo(element,
            { 
              opacity: 0, 
              scale: 0.95,
              transformOrigin: 'top center'
            },
            { 
              opacity: 1, 
              scale: 1,
              duration: 0.3, 
              ease: 'back.out(1.5)'
            }
          )
          break
      }
    }

    // Si cambia de visible a oculto
    if (!show && previousShow.current) {
      const element = sectionRef.current

      switch (animationType) {
        case 'fade':
          gsap.to(element,
            { opacity: 0, duration: 0.2, ease: 'power2.in' }
          )
          break

        case 'slide':
          gsap.to(element,
            { 
              opacity: 0, 
              y: -20,
              height: 0,
              overflow: 'hidden',
              duration: 0.3, 
              ease: 'power2.in'
            }
          )
          break

        case 'scale':
          gsap.to(element,
            { 
              opacity: 0, 
              scale: 0.95,
              duration: 0.2, 
              ease: 'power2.in'
            }
          )
          break
      }
    }

    previousShow.current = show
  }, [show, animationType])

  if (!show) return null

  return (
    <div 
      ref={sectionRef} 
      className={className}
      style={{ 
        opacity: 0 // Iniciar invisible para la animación
      }}
    >
      {children}
    </div>
  )
}

export default ConditionalSection