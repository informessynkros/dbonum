// DatePicker component con GSAP
import { Calendar, type LucideIcon } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'


interface DatePickerProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  icon?: LucideIcon
  error?: string
  required?: boolean
  minDate?: string // Formato: YYYY-MM-DD
  maxDate?: string // Formato: YYYY-MM-DD
}

const DatePicker = forwardRef<HTMLInputElement, DatePickerProps>(({
  label,
  icon: Icon,
  error,
  required = false,
  minDate,
  maxDate,
  ...props
}, ref) => {
  
  // w-full px-4 py-2 ${Icon ? "pl-10" : "pl-4"}
  const inputClasses = `
    w-full px-4 py-2 ${Icon && (<Calendar className='"pl-10"' />)}
    border rounded-lg focus:outline-none focus:ring-2 duration-200 focus:shadow-md
    ${error
      ? "border-red-500 focus:ring-red-500 text-red-600"
      : "border-gray-200 focus:ring-slate-700 text-slate-600"
    }
  `

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      
      <div className="relative">
        {Icon && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon className={`w-5 h-5 ${error ? 'text-red-400' : 'text-gray-400'}`} />
          </div>
        )}
        
        <input
          type="date"
          className={inputClasses}
          ref={ref}
          min={minDate}
          max={maxDate}
          {...props}
        />
      </div>
    </div>
  )
})

DatePicker.displayName = 'DatePicker'

export default DatePicker