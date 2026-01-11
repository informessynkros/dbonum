import { Check } from 'lucide-react'
import { forwardRef } from 'react'


interface CheckboxProps {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  disabled?: boolean
  error?: string
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({
  label,
  checked,
  onChange,
  disabled = false,
  error
}, ref) => {
  
  return (
    <div className="flex flex-col gap-2">
      <label className="flex items-center gap-3 cursor-pointer group">
        <div className="relative">
          <input
            type="checkbox"
            ref={ref}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            disabled={disabled}
            className="sr-only"
          />
          
          <div
            className={`
              w-5 h-5 rounded border-2 transition-all duration-200
              flex items-center justify-center
              ${checked
                ? error
                  ? 'bg-red-500 border-red-500'
                  : 'bg-primary-600 border-primary-600'
                : error
                  ? 'border-red-400 bg-white'
                  : 'border-gray-300 bg-white group-hover:border-gray-400'
              }
              ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            `}
          >
            {checked && (
              <Check className="w-3.5 h-3.5 text-white" />
            )}
          </div>
        </div>

        <span className={`
          text-sm font-medium transition-colors
          ${disabled ? 'text-gray-400' : 'text-gray-700 group-hover:text-gray-900'}
        `}>
          {label}
        </span>
      </label>

      {error && (
        <span className="text-xs text-red-600 ml-8">
          {error}
        </span>
      )}
    </div>
  )
})

Checkbox.displayName = 'Checkbox'

export default Checkbox