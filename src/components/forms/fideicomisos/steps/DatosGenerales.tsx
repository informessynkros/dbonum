import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { ACTIVIDADES_VULNERABLES, PAISES } from "@/data/mockCatalogos"
import { datosGeneralesSchema, type DatosGeneralesFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, FileText, Shield, MapPin, Calendar } from "lucide-react"
import { forwardRef, useImperativeHandle, useState } from "react"
import { Controller, useForm } from "react-hook-form"


export const defaultValues: DatosGeneralesFormData = {
  contrato: '',
  denominacion: '',
  nacionalidad: '',
  rfcFiduciaria: '',
  fiel: '',
  exentoISR: false,
  exentoIVA: false,
  finalidad: '',
  actividadesVulnerables: false,
  cualActividadVulnerable: '',
  lugarConstitucion: '',
  fechaConstitucion: '',
  denominacionInstitucion: '',
  patrimonioFideicomitido: '',
  aportacionesFideicomitentes: ''
}

interface DatosGeneralesProps {
  onNext: (data: DatosGeneralesFormData) => void
  initialData?: Partial<DatosGeneralesFormData>
}

export interface DatosGeneralesHandle {
  submit: () => Promise<boolean>
}

const DatosGenerales = forwardRef<DatosGeneralesHandle, DatosGeneralesProps>(
  ({ onNext, initialData }, ref) => {

    const [realizaActividadesVulnerables, setRealizaActividadesVulnerables] = useState(false)

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<DatosGeneralesFormData>({
      resolver: zodResolver(datosGeneralesSchema),
      defaultValues: initialData || defaultValues
    })

    // Watch para actividades vulnerables
    const actividadesVulnerables = watch('actividadesVulnerables')

    // Función general
    const onSubmit = (data: DatosGeneralesFormData) => {
      console.log('Datos Generales Fideicomiso: ', data)
      console.log('Realiza actividades vulnerables: ', realizaActividadesVulnerables)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Datos Generales del Fideicomiso</h2>
            <p className="text-sm text-gray-600">Información básica del fideicomiso</p>
          </div>

          {/* Sección: Información del Fideicomiso */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Información del Fideicomiso
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Contrato */}
              <Controller
                name="contrato"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Contrato"
                    type="text"
                    placeholder="Número de contrato"
                    icon={FileText}
                    error={error?.message}
                  />
                )}
              />

              {/* Denominación y Número */}
              <Controller
                name="denominacion"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Denominación y Número del Fideicomiso"
                    type="text"
                    placeholder="Nombre del fideicomiso"
                    icon={Building2}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Nacionalidad */}
              <Controller
                name="nacionalidad"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona nacionalidad"
                    label="Nacionalidad"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* RFC Fiduciaria */}
              <Controller
                name="rfcFiduciaria"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="RFC Fiduciaria"
                    type="text"
                    placeholder="ABC123456XYZ"
                    icon={FileText}
                    error={error?.message}
                    required
                    maxLength={13}
                    onChange={e => {
                      const value = e.target.value.toUpperCase()
                      field.onChange(value)
                    }}
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
                    label="Firma Electrónica Avanzada (FIEL)"
                    type="text"
                    placeholder="Opcional"
                    icon={Shield}
                    error={error?.message}
                  />
                )}
              />

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

              {/* Finalidad */}
              <div className="md:col-span-2">
                <Controller
                  name="finalidad"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Finalidad <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe la finalidad del fideicomiso"
                      />
                      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Actividades Vulnerables */}
              <div className="md:col-span-2">
                <Controller
                  name="actividadesVulnerables"
                  control={control}
                  render={({ field: { value, onChange } }) => (
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value || false}
                        onChange={e => {
                          onChange(e.target.checked)
                          setRealizaActividadesVulnerables(e.target.checked)
                        }}
                        className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                      />
                      <span className="text-sm font-medium text-gray-700">
                        ¿Realiza Actividades Vulnerables? <span className="text-red-500">*</span>
                      </span>
                    </label>
                  )}
                />
              </div>

              {/* ¿Cuál Actividad Vulnerable? (Condicional) */}
              {actividadesVulnerables && (
                <div className="md:col-span-2">
                  <Controller
                    name="cualActividadVulnerable"
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={ACTIVIDADES_VULNERABLES}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona actividad vulnerable"
                        label="¿Cuál actividad vulnerable realiza?"
                        labelKey="nombre"
                        valueKey="id"
                        multiple={false}
                        error={error?.message}
                        required
                      />
                    )}
                  />
                </div>
              )}

              {/* Lugar de Constitución */}
              <Controller
                name="lugarConstitucion"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Lugar de Constitución"
                    type="text"
                    placeholder="Ciudad, Estado"
                    icon={MapPin}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Fecha de Constitución */}
              <Controller
                name="fechaConstitucion"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    type="date"
                    label="Fecha de Constitución"
                    icon={Calendar}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Denominación Institución Fiduciaria */}
              <div className="md:col-span-2">
                <Controller
                  name="denominacionInstitucion"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Denominación o Razón Social de la Institución Fiduciaria"
                      type="text"
                      placeholder="Nombre de la institución"
                      icon={Building2}
                      error={error?.message}
                      required
                    />
                  )}
                />
              </div>

              {/* Patrimonio Fideicomitido */}
              <div className="md:col-span-2">
                <Controller
                  name="patrimonioFideicomitido"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Patrimonio Fideicomitido <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe el patrimonio fideicomitido"
                      />
                      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>

              {/* Aportaciones Fideicomitentes */}
              <div className="md:col-span-2">
                <Controller
                  name="aportacionesFideicomitentes"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Aportaciones de los Fideicomitentes <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        {...field}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe las aportaciones de los fideicomitentes"
                      />
                      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
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

DatosGenerales.displayName = 'DatosGenerales'

export default DatosGenerales