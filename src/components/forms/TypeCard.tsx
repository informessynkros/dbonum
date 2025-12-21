// /components/forms/TypeCard.tsx

import { type LucideIcon } from 'lucide-react'
import { useNavigate } from '@tanstack/react-router'

interface TypeCardProps {
  title: string
  description: string
  icon: LucideIcon
  available: boolean
  route?: string
}

const TypeCard = ({ title, description, icon: Icon, available, route }: TypeCardProps) => {
  const navigate = useNavigate()

  const handleClick = () => {
    if (available && route) {
      navigate({ to: route })
    }
  }

  return (
    <div
      onClick={handleClick}
      className={`
        relative bg-white rounded-2xl p-8 shadow-sm border-2 transition-all duration-300
        ${available 
          ? 'border-transparent hover:border-primary-500 hover:shadow-lg cursor-pointer hover:-translate-y-1' 
          : 'border-gray-200 opacity-60 cursor-not-allowed'
        }
      `}
    >
      <div className="absolute top-4 right-4">
        {available ? (
          <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-semibold rounded-full">
            Disponible
          </span>
        ) : (
          <span className="px-3 py-1 bg-gray-100 text-gray-500 text-xs font-semibold rounded-full">
            Próximamente
          </span>
        )}
      </div>

      <div className="flex flex-col items-center text-center gap-4">
        <div className={`
          w-20 h-20 rounded-2xl flex items-center justify-center
          ${available ? 'bg-primary-50' : 'bg-gray-100'}
        `}>
          <Icon className={`w-10 h-10 ${available ? 'text-primary-600' : 'text-gray-400'}`} />
        </div>

        <h3 className="text-xl font-bold text-dark">
          {title}
        </h3>

        <p className="text-sm text-gray-500 leading-relaxed">
          {description}
        </p>

        {available && (
          <button className="mt-2 text-primary-600 font-medium text-sm hover:text-primary-700 transition-colors">
            Comenzar →
          </button>
        )}
      </div>
    </div>
  )
}

export default TypeCard