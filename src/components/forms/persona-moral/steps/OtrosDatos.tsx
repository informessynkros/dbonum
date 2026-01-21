import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  otrosDatosPMSchema, 
  otrosDatosPMDefaultValues, 
  type OtrosDatosPMFormData 
} from '@/schemas/personaMoralSchema'
import { Briefcase, Calendar, User, Shield, Globe } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import Checkbox from '@/components/iu/input/Checkbox'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import {
  TIPOS_INVERSIONISTA_PM,
  ESTATUS_CUENTA,
  TIPOS_SERVICIO,
  GRADOS_RIESGO
} from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface OtrosDatosProps {
  onNext: (data: OtrosDatosPMFormData) => void
  initialData?: Partial<OtrosDatosPMFormData>
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
    } = useForm<OtrosDatosPMFormData>({
      resolver: zodResolver(otrosDatosPMSchema),
      defaultValues: initialData || otrosDatosPMDefaultValues
    })

    // Observar el estatus de la cuenta para mostrar/ocultar fecha de terminación
    const estatusCuenta = watch('estatus_cuenta')

    const onSubmit = (data: OtrosDatosPMFormData) => {
      console.log('Otros Datos PM:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('Es válido?:', isValid)
        console.log('Errores después de trigger:', errors)
        
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
              Información adicional de la empresa
            </p>
          </div>

          {/* Sección: Clasificación */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Clasificación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Grupo/Familia */}
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

              {/* Tipo de Inversionista */}
              <Controller
                name="tipo_inversionista"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={TIPOS_INVERSIONISTA_PM}
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

              {/* Banquero */}
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

              {/* Fecha de Inicio de Operaciones */}
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

          {/* Sección: Estado de Cuenta */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Estado de Cuenta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estatus de Cuenta */}
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

          {/* Sección: Exenciones Fiscales */}
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

          {/* Sección: Servicio y Riesgo */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary-600" />
              Servicio y Riesgo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de Servicio */}
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

              {/* Grado de Riesgo */}
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

            {/* Nota sobre grado de riesgo */}
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-sky-800">
                <strong>Nota:</strong> El grado de riesgo puede ser calculado automáticamente 
                según los datos proporcionados, pero también puede ser asignado manualmente.
              </p>
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

OtrosDatos.displayName = 'OtrosDatos'

export default OtrosDatos