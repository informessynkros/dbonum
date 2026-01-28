// src/components/regimen-simplificado/steps/OtrosDatos.tsx

import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { 
  otrosDatosSchema, 
  type OtrosDatosData,
  TipoInversionistaEnum,
  EstatusCuentaEnum,
  TipoServicioEnum,
  GradoRiesgoEnum
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Briefcase, Calendar, Settings, Users, AlertCircle } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"

interface OtrosDatosProps {
  onNext: (data: OtrosDatosData) => void
  initialData?: Partial<OtrosDatosData>
}

export interface OtrosDatosHandle {
  submit: () => Promise<boolean>
}

const OtrosDatos = forwardRef<OtrosDatosHandle, OtrosDatosProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<OtrosDatosData>({
      resolver: zodResolver(otrosDatosSchema),
      defaultValues: {
        grupoFamilia: '',
        tipoInversionista: 'R. Simplificado Nacional',
        banquero: '',
        fechaInicioOperaciones: '',
        estatusCuenta: 'Activa',
        fechaTerminacion: '',
        exentoISR: false,
        exentoIVA: false,
        tipoServicio: 'Asesoría',
        gradoRiesgo: 'Bajo',
        ...initialData
      }
    })

    // Observar estatus de cuenta para mostrar/ocultar fecha terminación
    const estatusCuenta = watch('estatusCuenta')

    // Función general
    const onSubmit = (data: OtrosDatosData) => {
      console.log('Otros datos: ', data)
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

    // Opciones de catálogos
    const tiposInversionista = TipoInversionistaEnum.options.map(tipo => ({
      id: tipo,
      nombre: tipo
    }))

    const estatusCuentaOptions = EstatusCuentaEnum.options.map(estatus => ({
      id: estatus,
      nombre: estatus
    }))

    const tiposServicio = TipoServicioEnum.options.map(tipo => ({
      id: tipo,
      nombre: tipo
    }))

    const gradosRiesgo = GradoRiesgoEnum.options.map(grado => ({
      id: grado,
      nombre: grado
    }))
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Otros Datos</h2>
            <p className="text-sm text-gray-600">Información adicional del régimen simplificado</p>
          </div>

          {/* Sección: Clasificación */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Settings className="w-5 h-5 text-primary-600" />
              Clasificación y Asignación
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
                    icon={Users}
                    error={error?.message}
                  />
                )}
              />

              {/* Tipo de Inversionista */}
              <Controller
                name="tipoInversionista"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={tiposInversionista}
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
            </div>
          </div>

          {/* Sección: Estatus de Cuenta */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary-600" />
              Estatus de la Cuenta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Estatus de Cuenta */}
              <Controller
                name="estatusCuenta"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={estatusCuentaOptions}
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

              {/* Fecha de Terminación - Solo si estatus es "Cancelada" */}
              {estatusCuenta === 'Cancelada' && (
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
            </div>

            {/* Casillas de Exención */}
            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3">
                <Controller
                  name="exentoISR"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 font-medium">Exento de ISR</span>
                    </label>
                  )}
                />
              </div>

              <div className="flex items-center gap-3">
                <Controller
                  name="exentoIVA"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={e => onChange(e.target.checked)}
                        className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700 font-medium">Exento de IVA</span>
                    </label>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Sección: Servicio y Riesgo */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary-600" />
              Tipo de Servicio y Riesgo
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tipo de Servicio */}
              <Controller
                name="tipoServicio"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={tiposServicio}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo"
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
                name="gradoRiesgo"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <div>
                    <SelectMultiple
                      options={gradosRiesgo}
                      onSelect={selected => {
                        if (selected && typeof selected === 'object' && 'id' in selected) {
                          onChange(selected.id)
                        }
                      }}
                      placeholder="Selecciona grado"
                      label="Grado de Riesgo"
                      labelKey="nombre"
                      valueKey="id"
                      multiple={false}
                      error={error?.message}
                      required
                    />
                    <p className="mt-1 text-xs text-gray-500">
                      Se establece automáticamente como "Bajo"
                    </p>
                  </div>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
)

OtrosDatos.displayName = 'OtrosDatos'

export default OtrosDatos