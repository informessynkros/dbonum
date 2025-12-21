import gsap from 'gsap'
import { useState, type ReactNode, useEffect, useRef } from 'react'


type TooltipPosition = 'top' | 'right' | 'bottom' | 'left'

interface TooltipProps {
  content: string
  children?: ReactNode
  position: TooltipPosition
  delay?: number
}

const Tooltip = ({ 
  content, 
  children, 
  position = 'right',
  delay = 200 
}: TooltipProps) => {
  const [showTooltip, setShowTooltip] = useState(false)
  const [timeoutId, setTimeoutId] = useState<NodeJS.Timeout | null>(null)
  const tooltipRef = useRef<HTMLDivElement>(null)

  const handleMouseEnter = () => {
    const id = setTimeout(() => {
      setShowTooltip(true)
    }, delay)
    setTimeoutId(id)
  }

  const handleMouseLeave = () => {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    setShowTooltip(false)
  }

  // Animación con GSAP
  useEffect(() => {
    if (showTooltip && tooltipRef.current) {
      // Configuración inicial según posición
      const initialState = {
        top: { y: 10, x: '-50%' },
        right: { x: -10, y: '-50%' },
        bottom: { y: -10, x: '-50%' },
        left: { x: 10, y: '-50%' },
      }

      const finalState = {
        top: { y: 0, x: '-50%' },
        right: { x: 0, y: '-50%' },
        bottom: { y: 0, x: '-50%' },
        left: { x: 0, y: '-50%' },
      }

      gsap.fromTo(
        tooltipRef.current,
        {
          opacity: 0,
          scale: 0.9,
          ...initialState[position],
        },
        {
          opacity: 1,
          scale: 1,
          ...finalState[position],
          duration: 0.3,
          ease: 'back.out(1.5)',
        }
      )
    }
  }, [showTooltip, position])

  const positionClasses = {
    top: 'bottom-full left-1/2 mb-2',
    right: 'left-full top-1/2 ml-2',
    bottom: 'top-full left-1/2 mt-2',
    left: 'right-full top-1/2 mr-2',
  }

  const arrowClasses = {
    top: 'top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-dark',
    right: 'right-full top-1/2 -translate-y-1/2 border-4 border-transparent border-r-dark',
    bottom: 'bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-dark',
    left: 'left-full top-1/2 -translate-y-1/2 border-4 border-transparent border-l-dark',
  }

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
      
      {/* Tooltip */}
      {showTooltip && (
        <div 
          ref={tooltipRef}
          className={`
            absolute px-3 py-1.5 bg-dark text-white text-sm font-medium 
            rounded-lg shadow-lg whitespace-nowrap z-50 pointer-events-none
            ${positionClasses[position]}
          `}
          style={{ opacity: 0 }}
        >
          {content}
          {/* Arrow */}
          <div className={`absolute ${arrowClasses[position]}`} />
        </div>
      )}
    </div>
  )
}

export default Tooltip