import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { GIROS_ECONOMICOS, PAISES } from "@/data/mockCatalogos"
import { datosGeneralesPMDefaultValues, datosGeneralesPMSchema, type DatosGeneralesPMFormData } from "@/schemas/personaMoralSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, FileText, Mail, Phone } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"


interface DatosGeneralesProps {
  onNext: (data: DatosGeneralesPMFormData) => void
  initialData?: Partial<DatosGeneralesPMFormData>
}

export interface DatosGeneralesHandle {
  submit: () => Promise<boolean>
}

const DatosGenerales = forwardRef<DatosGeneralesHandle, DatosGeneralesProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DatosGeneralesPMFormData>({
      resolver: zodResolver(datosGeneralesPMSchema),
      defaultValues: initialData || datosGeneralesPMDefaultValues
    })

    // Función general
    const onSubmit = (data: DatosGeneralesPMFormData) => {
      console.log('Datos generales PM: ', data)
      onNext(data)
    }

    // Exponemos el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()

        console.log('Es válido?: ', isValid)
        console.log('Errores después del trigger: : ', errors)

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
            <h2 className="text-2xl font-bold text-dark mb-2">Datos Generales de la Empresa</h2>
            <p className="text-sm text-gray-600">Información de la persona moral</p>
          </div>

          {/* Sección: Información básica */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Información de la Empresa
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Denominación o Razón Social */}
              <Controller
                name="denominacion_razon_social"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Denominación o Razón Social"
                    type="text"
                    placeholder="Nombre de la empresa"
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

              {/* RFC */}
              <Controller
                name="rfc"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="RFC"
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

              {/* País que emitió ID fiscal */}
              <Controller
                name="pais_emitio_id_fiscal"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
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
                    required
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
                    icon={FileText}
                    error={error?.message}
                  />
                )}
              />

              {/* Actividad/Giro */}
              <Controller
                name="actividad_giro"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={GIROS_ECONOMICOS}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona giro"
                    label="Actividad/Giro/Objeto Social"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Teléfono */}
              <Controller
                name="telefono"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Teléfono"
                    type="tel"
                    placeholder="10 dígitos"
                    icon={Phone}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Correo Electrónico"
                    type="email"
                    placeholder="empresa@ejemplo.com"
                    icon={Mail}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Fecha de Constitución */}
              <Controller
                name="fecha_constitucion"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    type="date"
                    label="Fecha de Constitución"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
)

DatosGenerales.displayName = 'DatosGenerales'

export default DatosGenerales