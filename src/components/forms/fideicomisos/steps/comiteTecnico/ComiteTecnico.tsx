import { comiteTecnicoSchema, type ComiteTecnicoFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Users, Plus, Trash2 } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import MiembroComiteForm from "./MiembroComiteForm"


export const defaultValues: ComiteTecnicoFormData = {
  miembrosComite: []
}

interface ComiteTecnicoProps {
  onNext: (data: ComiteTecnicoFormData) => void
  initialData?: Partial<ComiteTecnicoFormData>
}

export interface ComiteTecnicoHandle {
  submit: () => Promise<boolean>
}

const ComiteTecnico = forwardRef<ComiteTecnicoHandle, ComiteTecnicoProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<ComiteTecnicoFormData>({
      resolver: zodResolver(comiteTecnicoSchema),
      defaultValues: initialData || defaultValues
    })

    // Field array para miembros del comité
    const { fields, append, remove } = useFieldArray({
      control,
      name: "miembrosComite"
    })

    // Función para agregar miembro
    const agregarMiembro = () => {
      append({
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
      })
    }

    // Función general
    const onSubmit = (data: ComiteTecnicoFormData) => {
      console.log('Comité Técnico: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Comité Técnico</h2>
            <p className="text-sm text-gray-600">Agrega miembros del comité técnico (opcional)</p>
          </div>

          {/* Botón para agregar */}
          <button
            type="button"
            onClick={agregarMiembro}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Miembro del Comité
          </button>

          {/* Lista de miembros */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <Users className="w-5 h-5 text-primary-600" />
                    Miembro {index + 1} del Comité Técnico
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Renderizar formulario del miembro */}
                <MiembroComiteForm index={index} control={control} errors={errors} />
              </div>
            ))}
          </div>

          {/* Mensaje si no hay miembros */}
          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Users className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No hay miembros del comité técnico agregados. Puedes continuar sin agregar miembros.</p>
            </div>
          )}
        </div>
      </form>
    )
  }
)

ComiteTecnico.displayName = 'ComiteTecnico'

export default ComiteTecnico