// Paso 6: Vínculos Patrimoniales - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  vinculosPatrimonialesSchema, 
  vinculosPatrimonialesDefaultValues, 
  vinculoEmptyItem,
  type VinculosPatrimonialesFormData,
  type VinculoData
} from '@/schemas/personaFisicaSchema'
import { Link2, Building2, Percent, CreditCard } from 'lucide-react'
import Checkbox from '@/components/iu/input/Checkbox'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import DynamicList from '@/components/forms/shared/DynamicList'
import { GIROS_ECONOMICOS, TIPOS_VINCULOS } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'

interface VinculosPatrimonialesProps {
  onNext: (data: VinculosPatrimonialesFormData) => void
  initialData?: Partial<VinculosPatrimonialesFormData>
}

export interface VinculosPatrimonialesHandle {
  submit: () => Promise<boolean>
}

const VinculosPatrimoniales = forwardRef<VinculosPatrimonialesHandle, VinculosPatrimonialesProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<VinculosPatrimonialesFormData>({
      resolver: zodResolver(vinculosPatrimonialesSchema),
      defaultValues: initialData || vinculosPatrimonialesDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    // Observar si tiene vínculos
    const tieneVinculos = watch('tiene_vinculos')

    const onSubmit = (data: VinculosPatrimonialesFormData) => {
      console.log('Vínculos Patrimoniales:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('🔍 ¿Es válido?:', isValid)
        console.log('🔍 Errores después de trigger:', errors)
        
        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))

    // Renderizar cada vínculo en el DynamicList
    const renderVinculo = (vinculo: VinculoData, index: number, updateVinculo: (index: number, item: VinculoData) => void) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre de la Empresa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={vinculo.nombre_empresa}
                  onChange={e => updateVinculo(index, { ...vinculo, nombre_empresa: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                RFC de la Empresa <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <CreditCard className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={vinculo.rfc_empresa}
                  onChange={e => updateVinculo(index, { ...vinculo, rfc_empresa: e.target.value.toUpperCase() })}
                  placeholder="RFC (12-13 caracteres)"
                  maxLength={13}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Giro/Actividad <span className="text-red-500">*</span>
              </label>
              <select
                value={vinculo.giro_actividad}
                onChange={e => updateVinculo(index, { ...vinculo, giro_actividad: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona giro</option>
                {GIROS_ECONOMICOS.map((giro) => (
                  <option key={giro.id} value={giro.id}>
                    {giro.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Tipo de Vínculo <span className="text-red-500">*</span>
              </label>
              <select
                value={vinculo.tipo_vinculo}
                onChange={e => updateVinculo(index, { ...vinculo, tipo_vinculo: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona tipo</option>
                {TIPOS_VINCULOS.map((tipo) => (
                  <option key={tipo.id} value={tipo.id}>
                    {tipo.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Participación (%)
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Percent className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={vinculo.participacion_porcentaje || ''}
                  onChange={e => updateVinculo(index, { 
                    ...vinculo, 
                    participacion_porcentaje: e.target.value ? Number(e.target.value) : undefined 
                  })}
                  placeholder="0-100"
                  min={0}
                  max={100}
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
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Vínculos Patrimoniales</h2>
            <p className="text-sm text-gray-600">
              Información sobre participación en otras empresas
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Link2 className="w-5 h-5 text-primary-600" />
              Vínculos con Empresas
            </h3>

            <Controller
              name="tiene_vinculos"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <Checkbox
                  label="¿Tiene vínculos patrimoniales con otras empresas?"
                  checked={value}
                  onChange={onChange}
                  error={error?.message}
                />
              )}
            />

            <div className="mt-2 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 Incluye empresas donde sea accionista, socio, propietario, administrador o tenga cualquier tipo de participación.
              </p>
            </div>
          </div>

          <ConditionalSection show={tieneVinculos} animationType="slide">
            <div className="border-t border-gray-200 pt-6">
              <Controller
                name="vinculos"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <DynamicList
                    items={field.value || []}
                    onChange={field.onChange}
                    emptyItem={vinculoEmptyItem}
                    title="Empresas Vinculadas"
                    addButtonText="Agregar empresa"
                    minItems={1}
                    maxItems={10}
                    error={error?.message}
                    renderItem={renderVinculo}
                  />
                )}
              />
            </div>
          </ConditionalSection>

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

VinculosPatrimoniales.displayName = 'VinculosPatrimoniales'

export default VinculosPatrimoniales