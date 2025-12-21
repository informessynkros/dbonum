import type { LucideIcon } from 'lucide-react'


interface CardProps {
  title: string
  count: number
  icon: LucideIcon
  iconClass?: string
  className?: string
}

const Card = ({ title, count, icon: Icon, iconClass = "", className = "" }: CardProps) => {
  return (
    <div className={`bg-white rounded-2xl p-6 shadow-sm max-w-xs ${className}`}>
      <div className='flex justify-between items-center'>
        <div className='flex flex-col gap-y-2'>
          <h3 className='text-sm font-medium text-gray-600'>{title}</h3>
          <p className='text-4xl font-bold text-dark'>{count}</p>
        </div>

        <div className={`bg-primary-600 rounded-2xl p-4 flex items-center justify-center ${iconClass}`}>
          {Icon && (
            <Icon className='w-8 h-8 text-white' />
          )}
        </div>
      </div>
    </div>
  )
}

export default Card