// Paso 7: Beneficiarios - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  beneficiariosSchema, 
  beneficiariosDefaultValues, 
  beneficiarioEmptyItem,
  type BeneficiariosFormData,
  type BeneficiarioData
} from '@/schemas/personaFisicaSchema'
import { Users, User, Calendar, Percent, Phone, Mail, Heart } from 'lucide-react'
import DynamicList from '@/components/forms/shared/DynamicList'
import { TIPOS_PARENTESCO } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface BeneficiariosProps {
  onNext: (data: BeneficiariosFormData) => void
  initialData?: Partial<BeneficiariosFormData>
}

export interface BeneficiariosHandle {
  submit: () => Promise<boolean>
}

const Beneficiarios = forwardRef<BeneficiariosHandle, BeneficiariosProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<BeneficiariosFormData>({
      resolver: zodResolver(beneficiariosSchema),
      defaultValues: initialData || beneficiariosDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    // Observar beneficiarios para calcular suma de porcentajes
    const beneficiarios = watch('beneficiarios')
    const totalPorcentaje = beneficiarios?.reduce((sum, b) => sum + (b.porcentaje || 0), 0) || 0

    const onSubmit = (data: BeneficiariosFormData) => {
      console.log('Beneficiarios:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('¿Es válido?:', isValid)
        console.log('Errores después de trigger:', errors)
        
        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))

    // Renderizar cada beneficiario en el DynamicList
    const renderBeneficiario = (
      beneficiario: BeneficiarioData, 
      index: number, 
      updateBeneficiario: (index: number, item: BeneficiarioData) => void
    ) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={beneficiario.nombre}
                  onChange={e => updateBeneficiario(index, { ...beneficiario, nombre: e.target.value })}
                  placeholder="Nombre(s)"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apellido Paterno <span className="text-red-500">*</span>
              </label>
              <input
                value={beneficiario.apellido_paterno}
                onChange={e => updateBeneficiario(index, { ...beneficiario, apellido_paterno: e.target.value })}
                placeholder="Apellido paterno"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apellido Materno <span className="text-red-500">*</span>
              </label>
              <input
                value={beneficiario.apellido_materno}
                onChange={e => updateBeneficiario(index, { ...beneficiario, apellido_materno: e.target.value })}
                placeholder="Apellido materno"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={beneficiario.fecha_nacimiento}
                  onChange={e => updateBeneficiario(index, { ...beneficiario, fecha_nacimiento: e.target.value })}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Parentesco <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Heart className="w-5 h-5 text-gray-400" />
                </div>
                <select
                  value={beneficiario.parentesco}
                  onChange={e => updateBeneficiario(index, { ...beneficiario, parentesco: e.target.value })}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700 appearance-none"
                >
                  <option value="">Selecciona parentesco</option>
                  {TIPOS_PARENTESCO.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Porcentaje (%) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Percent className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={beneficiario.porcentaje || ''}
                  onChange={e => updateBeneficiario(index, { 
                    ...beneficiario, 
                    porcentaje: Number(e.target.value) || 0 
                  })}
                  placeholder="0-100"
                  min={0}
                  max={100}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Teléfono <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  value={beneficiario.telefono}
                  onChange={e => updateBeneficiario(index, { ...beneficiario, telefono: e.target.value })}
                  placeholder="10 dígitos"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Correo Electrónico <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Mail className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={beneficiario.email}
                  onChange={e => updateBeneficiario(index, { ...beneficiario, email: e.target.value })}
                  placeholder="correo@ejemplo.com"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Beneficiarios</h2>
            <p className="text-sm text-gray-600">
              Personas que recibirán los beneficios en caso de fallecimiento
            </p>
          </div>

          <div className={`
            p-4 rounded-lg border-2 transition-all duration-200
            ${totalPorcentaje === 100 
              ? 'bg-green-50 border-green-300' 
              : totalPorcentaje > 100
                ? 'bg-red-50 border-red-300'
                : 'bg-yellow-50 border-yellow-300'
            }
          `}>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                  ${totalPorcentaje === 100 
                    ? 'bg-green-600 text-white' 
                    : totalPorcentaje > 100
                      ? 'bg-red-600 text-white'
                      : 'bg-yellow-600 text-white'
                  }
                `}>
                  {totalPorcentaje}%
                </div>
                <div>
                  <p className="font-semibold text-sm text-gray-800">
                    Porcentaje total asignado
                  </p>
                  <p className="text-xs text-gray-600">
                    {totalPorcentaje === 100 
                      ? '✓ La suma es correcta (100%)' 
                      : totalPorcentaje > 100
                        ? '✗ La suma excede el 100%'
                        : `Falta ${100 - totalPorcentaje}% por asignar`
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Lista de Beneficiarios
            </h3>

            <Controller
              name="beneficiarios"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={beneficiarioEmptyItem}
                  addButtonText="Agregar beneficiario"
                  minItems={1}
                  maxItems={10}
                  error={error?.message}
                  renderItem={renderBeneficiario}
                />
              )}
            />
          </div>

          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              * Campos obligatorios
            </p>
          </div>
        </div>
      </form>
    )
  }
)

Beneficiarios.displayName = 'Beneficiarios'

export default Beneficiarios