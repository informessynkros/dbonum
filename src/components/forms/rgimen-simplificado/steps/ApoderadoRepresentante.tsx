import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { 
  apoderadosSchema, 
  type ApoderadoData,
  GeneroEnum,
  TipoFirmaEnum
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { User, FileText, Plus, Trash2, Building2 } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"

interface ApoderadoRepresentanteProps {
  onNext: (data: { apoderados: ApoderadoData[] }) => void
  initialData?: { apoderados: ApoderadoData[] }
}

export interface ApoderadoRepresentanteHandle {
  submit: () => Promise<boolean>
}

const ApoderadoRepresentante = forwardRef<ApoderadoRepresentanteHandle, ApoderadoRepresentanteProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<{ apoderados: ApoderadoData[] }>({
      resolver: zodResolver(apoderadosSchema),
      defaultValues: initialData || {
        apoderados: []
      }
    })

    // Field Array para manejar lista dinámica
    const { fields, append, remove } = useFieldArray({
      control,
      name: "apoderados"
    })

    // Función general
    const onSubmit = (data: { apoderados: ApoderadoData[] }) => {
      console.log('Apoderados/Representantes: ', data)
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

    // Agregar nuevo apoderado
    const handleAddApoderado = () => {
      append({
        nombreCompleto: '',
        genero: undefined,
        fechaNacimiento: '',
        tipoFirma: undefined,
        noEscritura: '',
        fechaEscritura: '',
        noNotaria: '',
        lugarNotaria: '',
        nombreNotario: '',
        folioMercantil: '',
        fechaInscripcionRPC: ''
      })
    }

    // Opciones de catálogos
    const generosOptions = GeneroEnum.options.map(genero => ({
      id: genero,
      nombre: genero
    }))

    const tiposFirmaOptions = TipoFirmaEnum.options.map(tipo => ({
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
            <h2 className="text-2xl font-bold text-dark mb-2">Apoderado o Representante Legal</h2>
            <p className="text-sm text-gray-600">Agrega uno o más apoderados/representantes legales</p>
          </div>

          {/* Botón para agregar apoderado */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddApoderado}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Agregar Apoderado
            </button>
          </div>

          {/* Error si no hay apoderados */}
          {errors.apoderados?.root && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600">{errors.apoderados.root.message}</p>
            </div>
          )}

          {/* Lista de apoderados */}
          {fields.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <User className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-4">No hay apoderados agregados</p>
              <button
                type="button"
                onClick={handleAddApoderado}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Agregar el primer apoderado
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {fields.map((field, index) => (
                <div
                  key={field.id}
                  className="border border-gray-200 rounded-xl p-6 bg-gray-50 relative"
                >
                  {/* Botón eliminar */}
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                    title="Eliminar apoderado"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-primary-600" />
                    Apoderado/Representante #{index + 1}
                  </h3>

                  {/* Información Personal */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3">Información Personal</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Nombre Completo */}
                      <Controller
                        name={`apoderados.${index}.nombreCompleto`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre Completo"
                            type="text"
                            placeholder="Nombre completo del apoderado"
                            icon={User}
                            error={error?.message}
                            required
                          />
                        )}
                      />

                      {/* Género */}
                      <Controller
                        name={`apoderados.${index}.genero`}
                        control={control}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                          <SelectMultiple
                            options={generosOptions}
                            onSelect={selected => {
                              if (selected && typeof selected === 'object' && 'id' in selected) {
                                onChange(selected.id)
                              }
                            }}
                            placeholder="Selecciona género"
                            label="Género"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Fecha de Nacimiento */}
                      <Controller
                        name={`apoderados.${index}.fechaNacimiento`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            type="date"
                            label="Fecha de Nacimiento"
                            error={error?.message}
                            required
                          />
                        )}
                      />

                      {/* Tipo de Firma */}
                      <Controller
                        name={`apoderados.${index}.tipoFirma`}
                        control={control}
                        render={({ field: { onChange }, fieldState: { error } }) => (
                          <SelectMultiple
                            options={tiposFirmaOptions}
                            onSelect={selected => {
                              if (selected && typeof selected === 'object' && 'id' in selected) {
                                onChange(selected.id)
                              }
                            }}
                            placeholder="Selecciona tipo de firma"
                            label="Tipo de Firma"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                  </div>

                  {/* Datos de Escritura */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-600 mb-3 flex items-center gap-2">
                      <FileText className="w-4 h-4" />
                      Datos de Escritura
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {/* No. de Escritura */}
                      <Controller
                        name={`apoderados.${index}.noEscritura`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="No. de Escritura"
                            type="text"
                            placeholder="Opcional"
                            icon={FileText}
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Fecha de Escritura */}
                      <Controller
                        name={`apoderados.${index}.fechaEscritura`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            type="date"
                            label="Fecha de Escritura"
                            error={error?.message}
                          />
                        )}
                      />

                      {/* No. Notaría */}
                      <Controller
                        name={`apoderados.${index}.noNotaria`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="No. Notaría"
                            type="text"
                            placeholder="Opcional"
                            icon={Building2}
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Lugar de la Notaría */}
                      <Controller
                        name={`apoderados.${index}.lugarNotaria`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Lugar de la Notaría"
                            type="text"
                            placeholder="Opcional"
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Nombre del Notario */}
                      <Controller
                        name={`apoderados.${index}.nombreNotario`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre del Notario"
                            type="text"
                            placeholder="Opcional"
                            icon={User}
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Folio Mercantil */}
                      <Controller
                        name={`apoderados.${index}.folioMercantil`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Folio Mercantil"
                            type="text"
                            placeholder="Opcional"
                            icon={FileText}
                            error={error?.message}
                          />
                        )}
                      />

                      {/* Fecha de Inscripción RPC */}
                      <Controller
                        name={`apoderados.${index}.fechaInscripcionRPC`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            type="date"
                            label="Fecha de Inscripción RPC"
                            error={error?.message}
                          />
                        )}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </form>
    )
  }
)

ApoderadoRepresentante.displayName = 'ApoderadoRepresentante'

export default ApoderadoRepresentante