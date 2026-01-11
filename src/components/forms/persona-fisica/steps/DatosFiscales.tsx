// Paso 2: Datos Fiscales - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { datosFiscalesSchema, datosFiscalesDefaultValues, type DatosFiscalesFormData } from '@/schemas/personaFisicaSchema'
import { FileText, CreditCard, Globe } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import Checkbox from '@/components/iu/input/Checkbox'
import { REGIMENES_FISCALES, PAISES } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface DatosFiscalesProps {
  onNext: (data: DatosFiscalesFormData) => void
  initialData?: Partial<DatosFiscalesFormData>
}

export interface DatosFiscalesHandle {
  submit: () => Promise<boolean>
}

const DatosFiscales = forwardRef<DatosFiscalesHandle, DatosFiscalesProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DatosFiscalesFormData>({
      resolver: zodResolver(datosFiscalesSchema),
      defaultValues: initialData || datosFiscalesDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    const onSubmit = (data: DatosFiscalesFormData) => {
      console.log('Datos Fiscales:', data)
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

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Datos Fiscales</h2>
            <p className="text-sm text-gray-600">
              Información fiscal del cliente
            </p>
          </div>

          {/* Sección: Información Fiscal */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Información Fiscal
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Régimen Fiscal */}
              <Controller
                name="regimen_fiscal"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={REGIMENES_FISCALES}
                    onSelect={(selected) => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona régimen fiscal"
                    label="Régimen Fiscal"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* RFC */}
              <Controller
                name="rfc"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="RFC"
                    type="text"
                    placeholder="XAXX010101000"
                    icon={CreditCard}
                    error={error?.message}
                    required
                    maxLength={13}
                    onChange={(e) => {
                      // Convertir a mayúsculas automáticamente
                      const value = e.target.value.toUpperCase()
                      field.onChange(value)
                    }}
                  />
                )}
              />

              {/* País que emitió ID fiscal */}
              <Controller
                name="pais_emitio_id_fiscal"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={(selected) => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona país"
                    label="País que emitió el ID Fiscal"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />

              {/* FIEL */}
              <Controller
                name="fiel"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="FIEL (Firma Electrónica Avanzada)"
                    type="text"
                    placeholder="Opcional"
                    icon={FileText}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Sección: Exenciones */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-600" />
              Exenciones Fiscales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Exento ISR */}
              <Controller
                name="exento_isr"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Checkbox
                    label="Exento de ISR"
                    checked={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />

              {/* Exento IVA */}
              <Controller
                name="exento_iva"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Checkbox
                    label="Exento de IVA"
                    checked={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>
          </div>

          {/* Nota de campos obligatorios */}
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

DatosFiscales.displayName = 'DatosFiscales'

export default DatosFiscales