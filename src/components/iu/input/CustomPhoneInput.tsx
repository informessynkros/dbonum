import gsap from "gsap"
import { Phone, Plus, X } from "lucide-react"
import { useEffect, useState } from "react"


interface PhoneData {
  tipo: string
  numero: string
}

interface CustomPhoneInputProps {
  label?: string
  value?: PhoneData[]
  onChange: (phones: PhoneData[]) => void
  error?: string
  required?: boolean
  disabled?: boolean
}

const PHONE_TYPES = [
  { value: 'Móvil', label: 'Móvil' },
  { value: 'Casa', label: 'Casa' },
  { value: 'Oficina', label: 'Oficina' },
  { value: 'Otro', label: 'Otro' }
]

const CustomPhoneInput = ({
  label = 'Teléfonos',
  value = [],
  onChange,
  error,
  required = false,
  disabled = false
}: CustomPhoneInputProps) => {

  const [phones, setPhones] = useState<PhoneData[]>(
    value.length > 0 ? value : [{ tipo: 'Móvil', numero: '' }]
  )

  // Sincronizar con value externo
  useEffect(() => {
    if (value && value.length > 0) {
      setPhones(value)
    }
  }, [value])

  // Notificar cambios al padre
  // useEffect(() => {
  //   onChange(phones)
  // }, [phones])

  const addPhone = () => {
    const newPhone: PhoneData = { tipo: 'Móvil', numero: '' }
    const newPhones = [...phones, newPhone]
    setPhones(newPhones)
    onChange(newPhones)

    // Animación de entrada
    setTimeout(() => {
      const newElement = document.querySelector(`[data-phone-index="${phones.length}"]`)
      if (newElement) {
        gsap.fromTo(newElement,
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
        )
      }
    }, 0)
  }

  const removePhone = (index: number) => {
    if (phones.length > 1) return // Mínimo un número

    const element = document.querySelector(`[data-phone-index="${index}"]`)

    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: -20,
        scale: 0.9,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          const newPhones = phones.filter((_, i) => i !== index)
          setPhones(newPhones)
        }
      })
    } else {
      const newPhones = phones.filter((_, i) => i !== index)
      setPhones(newPhones)
    }
  }

  const updatePhone = (index: number, field: keyof PhoneData, value: string) => {
    const newPhones = [...phones]
    newPhones[index] = { ...newPhones[index], [field]: value }
    setPhones(newPhones)
    onChange(newPhones)
  }

  const hasError = !!error

  return (
    <div className="flex flex-col gap-2">
      {/* Label */}
      <label className="text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Lista de teléfonos */}
      <div className="flex flex-col gap-3">
        {phones.map((phone, index) => (
          <div
            key={index}
            data-phone-index={index}
            className={`
              flex gap-2 items-start p-3 rounded-lg border-2 transition-all duration-200
              ${hasError ? 'border-red-300 bg-red-50/30' : 'border-gray-200 bg-gray-50/50'}
            `}
          >
            {/* Icono */}
            <div className="flex items-center justify-center w-10 h-10 bg-white rounded-lg border border-gray-200 shrink-0">
              <Phone className={`w-5 h-5 ${hasError ? 'text-red-400' : 'text-primary-600'}`} />
            </div>

            {/* Campos */}
            <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-2">
              {/* Select Tipo */}
              <select
                value={phone.tipo}
                onChange={e => updatePhone(index, 'tipo', e.target.value)}
                disabled={disabled}
                className={`
                  px-3 py-2 border rounded-lg text-sm
                  focus:outline-none focus:ring-2 transition-all duration-200
                  ${hasError
                    ? 'border-red-300 focus:ring-red-500 text-red-600'
                    : 'border-gray-200 focus:ring-slate-700 text-slate-600'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {PHONE_TYPES.map(type => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>

              {/* Input Número */}
              <input
                type="tel"
                value={phone.numero}
                onChange={e => updatePhone(index, 'numero', e.target.value)}
                placeholder="Número de teléfono"
                disabled={disabled}
                className={`
                  px-3 py-2 border rounded-lg text-sm
                  focus:outline-none focus:ring-2 transition-all duration-200
                  ${hasError
                    ? 'border-red-300 focus:ring-red-500 text-red-600'
                    : 'border-gray-200 focus:ring-slate-700 text-slate-600'
                  }
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              />
            </div>

            {/* Botón eliminar */}
            {phones.length > 1 && (
              <button
                type="button"
                onClick={() => removePhone(index)}
                disabled={disabled}
                className="
                  flex items-center justify-center w-10 h-10
                  bg-red-50 hover:bg-red-100 text-red-600
                  rounded-lg transition-all duration-200
                  disabled:opacity-50 disabled:cursor-not-allowed
                  hover:scale-105 active:scale-95 cursor-pointer
                "
                onMouseEnter={e => {
                  if (!disabled) {
                    gsap.to(e.currentTarget, {
                      rotate: 90,
                      duration: 0.2,
                      ease: 'power2.out'
                    })
                  }
                }}
                onMouseLeave={e => {
                  if (!disabled) {
                    gsap.to(e.currentTarget, {
                      rotate: 0,
                      duration: 0.2,
                      ease: 'power2.out'
                    })
                  }
                }}
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Botón agregar */}
      <button
        type="button"
        onClick={addPhone}
        disabled={disabled}
        className="
          flex items-center justify-center gap-2 px-4 py-2.5
          bg-primary-50 hover:bg-primary-100 text-primary-700
          rounded-lg transition-all duration-200 font-medium text-sm
          border-2 border-dashed border-primary-300 hover:border-primary-400
          disabled:opacity-50 disabled:cursor-not-allowed
          hover:scale-[1.02] active:scale-95 cursor-pointer
        "
        onMouseEnter={e => {
          if (!disabled) {
            gsap.to(e.currentTarget.querySelector('svg'), {
              rotate: 180,
              duration: 0.3,
              ease: 'back.out(1.5)'
            })
          }
        }}
        onMouseLeave={e => {
          if (!disabled) {
            gsap.to(e.currentTarget.querySelector('svg'), {
              rotate: 0,
              duration: 0.3,
              ease: 'back.out(1.5)'
            })
          }
        }}
      >
        <Plus className="w-5 h-5" />
        Agregar teléfono
      </button>
    </div>
  )
}

export default CustomPhoneInput