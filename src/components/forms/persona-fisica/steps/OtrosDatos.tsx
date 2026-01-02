// Paso 3: Otros Datos - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { Briefcase, Calendar, User, Shield } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import { forwardRef, useImperativeHandle } from 'react'
import { otrosDatosSchema, type OtrosDatosFormData, otrosDatosDefaultValues } from '@/schemas/personaFisicaSchema'
import { ESTATUS_CUENTA, GRADOS_RIESGO, TIPOS_INVERSIONISTA, TIPOS_SERVICIO } from '@/data/mockCatalogos'



interface OtrosDatosProps {
  onNext: (data: OtrosDatosFormData) => void
  initialData?: Partial<OtrosDatosFormData>
}

export interface OtrosDatosHandle {
  submit: () => Promise<boolean>
}

const OtrosDatos = forwardRef<OtrosDatosHandle, OtrosDatosProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<OtrosDatosFormData>({
      resolver: zodResolver(otrosDatosSchema),
      defaultValues: initialData || otrosDatosDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    // Observar el estatus de la cuenta para mostrar/ocultar fecha de terminación
    const estatusCuenta = watch('estatus_cuenta')

    const onSubmit = (data: OtrosDatosFormData) => {
      console.log('Otros Datos:', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Otros Datos</h2>
            <p className="text-sm text-gray-600">
              Información adicional del cliente
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Clasificación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="grupo_familia"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Grupo/Familia"
                    type="text"
                    placeholder="Opcional"
                    icon={User}
                    error={error?.message}
                  />
                )}
              />

              <Controller
                name="tipo_inversionista"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={TIPOS_INVERSIONISTA}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo"
                    label="Tipo de Inversionista"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              <Controller
                name="banquero"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Banquero"
                    type="text"
                    placeholder="Nombre del banquero"
                    icon={Briefcase}
                    error={error?.message}
                    required
                  />
                )}
              />

              <Controller
                name="fecha_inicio_operaciones"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    type="date"
                    label="Fecha de Inicio de Operaciones"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Estado de Cuenta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="estatus_cuenta"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={ESTATUS_CUENTA}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona estatus"
                    label="Estatus de la Cuenta"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Fecha de Terminación - Solo si estatus = CANCELADA */}
              <ConditionalSection 
                show={estatusCuenta === 'CANCELADA'} 
                animationType="slide"
              >
                <Controller
                  name="fecha_terminacion"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      type="date"
                      label="Fecha de Terminación"
                      error={error?.message}
                      required
                    />
                  )}
                />
              </ConditionalSection>
            </div>
          </div>

          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              Servicio y Riesgo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller
                name="tipo_servicio"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={TIPOS_SERVICIO}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo de servicio"
                    label="Tipo de Servicio"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              <Controller
                name="grado_riesgo"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={GRADOS_RIESGO}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona grado de riesgo"
                    label="Grado de Riesgo"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 <strong>Nota:</strong> El grado de riesgo puede ser calculado automáticamente 
                según los datos proporcionados, pero también puede ser asignado manualmente.
              </p>
            </div>
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

OtrosDatos.displayName = 'OtrosDatos'

export default OtrosDatos