import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { GIROS_ECONOMICOS, PAISES, ESTADOS_MEXICO } from "@/data/mockCatalogos"
import { 
  datosGeneralesSchema, 
  type DatosGeneralesData,
  TipoVialidadEnum 
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Building2, FileText, Mail, Phone, MapPin, Home } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"


interface DatosGeneralesProps {
  onNext: (data: DatosGeneralesData) => void
  initialData?: Partial<DatosGeneralesData>
}

export interface DatosGeneralesHandle {
  submit: () => Promise<boolean>
}

const DatosGenerales = forwardRef<DatosGeneralesHandle, DatosGeneralesProps>(
  ({ onNext, initialData }, ref) => {
     const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DatosGeneralesData>({
      resolver: zodResolver(datosGeneralesSchema),
      defaultValues: initialData || {
        denominacionRazonSocial: '',
        actividadObjetoSocial: '',
        rfcEquivalente: '',
        paisEmiteIdFiscal: '',
        nacionalidad: '',
        telefono: '',
        correoElectronico: '',
        domicilio: {
          estadoEntidad: '',
          pais: '',
        },
      }
    })

    // Función general
    const onSubmit = (data: DatosGeneralesData) => {
      console.log('Datos generales Régimen Simplificado: ', data)
      onNext(data)
    }

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

    // Opciones de Tipo de Vialidad
    const tiposVialidad = TipoVialidadEnum.options.map(tipo => ({
      id: tipo,
      nombre: tipo
    }))
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Datos Generales</h2>
            <p className="text-sm text-gray-600">Información del Régimen Simplificado</p>
          </div>

          {/* Sección: Información básica */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Información General
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
                    placeholder="Número de contrato (opcional)"
                    icon={FileText}
                    error={error?.message}
                  />
                )}
              />

              {/* Denominación o Razón Social */}
              <Controller
                name="denominacionRazonSocial"
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

              {/* Actividad/Objeto Social */}
              <Controller
                name="actividadObjetoSocial"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={GIROS_ECONOMICOS}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona actividad"
                    label="Actividad/Objeto Social"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* RFC/Equivalente */}
              <Controller
                name="rfcEquivalente"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="RFC/Equivalente"
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
                name="paisEmiteIdFiscal"
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
                name="correoElectronico"
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
            </div>
          </div>

          {/* Sección: Domicilio */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <Home className="w-5 h-5 text-primary-600" />
              Domicilio
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Tipo de Vialidad */}
              <Controller
                name="domicilio.tipoVialidad"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={tiposVialidad}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo"
                    label="Tipo de Vialidad"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />

              {/* Nombre de Vialidad */}
              <Controller
                name="domicilio.nombreVialidad"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Nombre de Vialidad"
                    type="text"
                    placeholder="Nombre de la calle"
                    icon={MapPin}
                    error={error?.message}
                  />
                )}
              />

              {/* No. Exterior */}
              <Controller
                name="domicilio.noExterior"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="No. Exterior"
                    type="text"
                    placeholder="123"
                    error={error?.message}
                  />
                )}
              />

              {/* No. Interior */}
              <Controller
                name="domicilio.noInterior"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="No. Interior"
                    type="text"
                    placeholder="Depto 4B (opcional)"
                    error={error?.message}
                  />
                )}
              />

              {/* Colonia */}
              <Controller
                name="domicilio.colonia"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Colonia"
                    type="text"
                    placeholder="Nombre de la colonia"
                    icon={MapPin}
                    error={error?.message}
                  />
                )}
              />

              {/* Delegación/Municipio */}
              <Controller
                name="domicilio.delegacionMunicipio"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Delegación/Municipio/Alcaldía"
                    type="text"
                    placeholder="Nombre del municipio"
                    error={error?.message}
                  />
                )}
              />

              {/* Ciudad */}
              <Controller
                name="domicilio.ciudad"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Ciudad"
                    type="text"
                    placeholder="Nombre de la ciudad"
                    icon={MapPin}
                    error={error?.message}
                  />
                )}
              />

              {/* Estado/Entidad Federativa */}
              <Controller
                name="domicilio.estadoEntidad"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={ESTADOS_MEXICO}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona estado"
                    label="Estado/Entidad Federativa"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Código Postal */}
              <Controller
                name="domicilio.codigoPostal"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Código Postal"
                    type="text"
                    placeholder="12345"
                    maxLength={5}
                    error={error?.message}
                  />
                )}
              />

              {/* País */}
              <Controller
                name="domicilio.pais"
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
                    label="País"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
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