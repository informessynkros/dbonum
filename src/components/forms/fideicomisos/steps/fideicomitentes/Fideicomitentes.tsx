import { fideicomitentesSchema, type FideicomitentesFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Users, Plus, Trash2, User, Building2 } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import FideicomitentePF from "./FideicomitentePF"
import FideicomitentePM from "./FideicomitentePM"

// Default values
export const defaultValues: FideicomitentesFormData = {
  fideicomitentes: []
}

interface FideicomitentesProps {
  onNext: (data: FideicomitentesFormData) => void
  initialData?: Partial<FideicomitentesFormData>
}

export interface FideicomitentesHandle {
  submit: () => Promise<boolean>
}

const Fideicomitentes = forwardRef<FideicomitentesHandle, FideicomitentesProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<FideicomitentesFormData>({
      resolver: zodResolver(fideicomitentesSchema),
      defaultValues: initialData || defaultValues
    })

    // Field array para fideicomitentes
    const { fields, append, remove } = useFieldArray({
      control,
      name: "fideicomitentes"
    })

    // Función para agregar fideicomitente
    const agregarFideicomitente = (tipo: 'pf' | 'pm') => {
      if (tipo === 'pf') {
        append({
          tipo: 'pf',
          datos: {
            nombre: '',
            apellidoPaterno: '',
            apellidoMaterno: '',
            genero: 'masculino',
            fechaNacimiento: '',
            paisNacimiento: '',
            entidadNacimiento: '',
            nacionalidad: '',
            ocupacion: '',
            correo: '',
            telefono: '',
            curp: '',
            paisCurp: '',
            rfc: '',
            paisRfc: '',
            domicilio: {
              tipoVialidad: '',
              nombreVialidad: '',
              noExterior: '',
              noInterior: '',
              colonia: '',
              delegacionMunicipio: '',
              ciudad: '',
              estadoEntidad: '',
              codigoPostal: '',
              pais: ''
            }
          }
        })
      } else {
        append({
          tipo: 'pm',
          datos: {
            denominacion: '',
            nacionalidad: '',
            rfc: '',
            paisRfc: '',
            fiel: '',
            actividadGiro: '',
            telefono: '',
            correo: '',
            fechaConstitucion: '',
            domicilio: {
              tipoVialidad: '',
              nombreVialidad: '',
              noExterior: '',
              noInterior: '',
              colonia: '',
              delegacionMunicipio: '',
              ciudad: '',
              estadoEntidad: '',
              codigoPostal: '',
              pais: ''
            }
          }
        })
      }
    }

    // Función general
    const onSubmit = (data: FideicomitentesFormData) => {
      console.log('Fideicomitentes: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Datos del Fideicomitente</h2>
            <p className="text-sm text-gray-600">Agrega uno o más fideicomitentes</p>
          </div>

          {/* Botones para agregar */}
          <div className="flex gap-4">
            <button
              type="button"
              onClick={() => agregarFideicomitente('pf')}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Persona Física
            </button>
            <button
              type="button"
              onClick={() => agregarFideicomitente('pm')}
              className="flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Agregar Persona Moral
            </button>
          </div>

          {/* Error si no hay fideicomitentes */}
          {errors.fideicomitentes?.message && (
            <p className="text-sm text-red-600">{errors.fideicomitentes.message}</p>
          )}

          {/* Lista de fideicomitentes */}
          <div className="space-y-6">
            {fields.map((field, index) => {
              const tipoFideicomitente = watch(`fideicomitentes.${index}.tipo`)
              
              return (
                <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                      {tipoFideicomitente === 'pf' ? (
                        <>
                          <User className="w-5 h-5 text-primary-600" />
                          Fideicomitente {index + 1} - Persona Física
                        </>
                      ) : (
                        <>
                          <Building2 className="w-5 h-5 text-secondary-600" />
                          Fideicomitente {index + 1} - Persona Moral
                        </>
                      )}
                    </h3>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-red-600 hover:text-red-800 transition-colors"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Renderizar componente según tipo */}
                  {tipoFideicomitente === 'pf' ? (
                    <FideicomitentePF index={index} control={control} errors={errors} />
                  ) : (
                    <FideicomitentePM index={index} control={control} errors={errors} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Mensaje si no hay fideicomitentes */}
          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No hay fideicomitentes agregados. Agrega al menos uno para continuar.</p>
            </div>
          )}
        </div>
      </form>
    )
  }
)

Fideicomitentes.displayName = 'Fideicomitentes'

export default Fideicomitentes