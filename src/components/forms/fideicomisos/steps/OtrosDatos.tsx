import MessageToasty from "@/components/iu/messages/MessageToasty"
import { otrosDatosSchema, type OtrosDatosFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Settings, User, Calendar } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"

// Default values para Paso 2
export const defaultValues: OtrosDatosFormData = {
  grupoFamilia: '',
  tipoInversionista: 'nacional',
  banquero: '',
  fechaInicioOperaciones: '',
  estatusCuenta: 'activa',
  fechaTerminacion: '',
  exentoISR: false,
  exentoIVA: false,
  tipoServicio: 'asesoria',
  gradoRiesgo: 'bajo'
}

interface OtrosDatosProps {
  onNext: (data: OtrosDatosFormData) => void
  initialData?: Partial<OtrosDatosFormData>
}

export interface OtrosDatosHandle {
  submit: () => Promise<boolean>
}

const OtrosDatos = forwardRef<OtrosDatosHandle, OtrosDatosProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<OtrosDatosFormData>({
      resolver: zodResolver(otrosDatosSchema),
      defaultValues: initialData || defaultValues
    })

    // Watch para campos condicionales
    const estatusCuenta = watch('estatusCuenta')

    // Función general
    const onSubmit = (data: OtrosDatosFormData) => {
      console.log('Otros Datos Fideicomiso: ', data)
      onNext(data)
    }

    // Exponemos el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()

        console.log('Es válido?: ', isValid)
        console.log('Errores después del trigger: ', errors)

        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Otros Datos</h2>
            <p className="text-sm text-gray-600">Información adicional del fideicomiso</p>
          </div>

          {/* Sección: Información Adicional */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary-600" />
              Información Adicional
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Grupo/Familia */}
              <Controller
                name="grupoFamilia"
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
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Inversionista <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="tipoInversionista"
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="nacional"
                            checked={value === 'nacional'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Fideicomiso Nacional</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="extranjero"
                            checked={value === 'extranjero'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Fideicomiso Extranjero</span>
                        </label>
                      </div>
                      {error && <p className="text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>

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
                    icon={User}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Fecha de Inicio de Operaciones */}
              <Controller
                name="fechaInicioOperaciones"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    type="date"
                    label="Fecha de Inicio de Operaciones"
                    icon={Calendar}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Estatus de Cuenta */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Estatus de la Cuenta <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="estatusCuenta"
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="activa"
                            checked={value === 'activa'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Activa</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="inactiva"
                            checked={value === 'inactiva'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Inactiva</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="cancelada"
                            checked={value === 'cancelada'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Cancelada</span>
                        </label>
                      </div>
                      {error && <p className="text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Fecha de Terminación (Condicional si cancelada) */}
              {estatusCuenta === 'cancelada' && (
                <Controller
                  name="fechaTerminacion"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      type="date"
                      label="Fecha de Terminación"
                      icon={Calendar}
                      error={error?.message}
                      required
                    />
                  )}
                />
              )}

              {/* Checkboxes Exento ISR/IVA */}
              <div className="flex items-center gap-6 md:col-span-2">
                <Controller
                  name="exentoISR"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value || false}
                        onChange={e => onChange(e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Exento ISR</span>
                    </label>
                  )}
                />
                <Controller
                  name="exentoIVA"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value || false}
                        onChange={e => onChange(e.target.checked)}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Exento IVA</span>
                    </label>
                  )}
                />
              </div>

              {/* Tipo de Servicio */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Tipo de Servicio <span className="text-red-500">*</span>
                </label>
                <Controller
                  name="tipoServicio"
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className="space-y-2">
                      <div className="grid grid-cols-2 gap-3">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="asesoria"
                            checked={value === 'asesoria'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Asesoría</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="gestion"
                            checked={value === 'gestion'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Gestión</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="mixto"
                            checked={value === 'mixto'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Mixto</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="institucional"
                            checked={value === 'institucional'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Institucional</span>
                        </label>
                      </div>
                      {error && <p className="text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Grado de Riesgo */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Grado de Riesgo
                </label>
                <Controller
                  name="gradoRiesgo"
                  control={control}
                  render={({ field: { value, onChange }, fieldState: { error } }) => (
                    <div className="space-y-2">
                      <div className="flex gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="bajo"
                            checked={value === 'bajo'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Bajo</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="medio"
                            checked={value === 'medio'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Medio</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            value="alto"
                            checked={value === 'alto'}
                            onChange={e => onChange(e.target.value)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm text-gray-700">Alto</span>
                        </label>
                      </div>
                      {error && <p className="text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>
        </div>
      </form>
    )
  }
)

OtrosDatos.displayName = 'OtrosDatos'

export default OtrosDatos