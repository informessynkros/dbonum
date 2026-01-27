import { delegadosFiduciariosSchema, type DelegadosFiduciariosFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { UserCheck, Plus, Trash2 } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import DelegadoFiduciarioForm from "./DelegadoFiduciarioForm"


export const defaultValues: DelegadosFiduciariosFormData = {
  delegadosFiduciarios: []
}

interface DelegadosFiduciariosProps {
  onNext: (data: DelegadosFiduciariosFormData) => void
  initialData?: Partial<DelegadosFiduciariosFormData>
}

export interface DelegadosFiduciariosHandle {
  submit: () => Promise<boolean>
}

const DelegadosFiduciarios = forwardRef<DelegadosFiduciariosHandle, DelegadosFiduciariosProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DelegadosFiduciariosFormData>({
      resolver: zodResolver(delegadosFiduciariosSchema),
      defaultValues: initialData || defaultValues
    })

    // Field array para delegados
    const { fields, append, remove } = useFieldArray({
      control,
      name: "delegadosFiduciarios"
    })

    // Función para agregar delegado
    const agregarDelegado = () => {
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
        tipoFirma: 'individual',
        noEscritura: '',
        fechaEscritura: '',
        noNotaria: '',
        lugarNotaria: '',
        nombreNotario: '',
        folioMercantil: '',
        fechaInscripcionRPC: '',
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
    const onSubmit = (data: DelegadosFiduciariosFormData) => {
      console.log('Delegados Fiduciarios: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Delegados Fiduciarios</h2>
            <p className="text-sm text-gray-600">Agrega delegados fiduciarios (opcional)</p>
          </div>

          {/* Botón para agregar */}
          <button
            type="button"
            onClick={agregarDelegado}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Delegado Fiduciario
          </button>

          {/* Lista de delegados */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-primary-600" />
                    Delegado Fiduciario {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                {/* Renderizar formulario del delegado */}
                <DelegadoFiduciarioForm index={index} control={control} errors={errors} />
              </div>
            ))}
          </div>

          {/* Mensaje si no hay delegados */}
          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <UserCheck className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No hay delegados fiduciarios agregados. Puedes continuar sin agregar delegados.</p>
            </div>
          )}
        </div>
      </form>
    )
  }
)

DelegadosFiduciarios.displayName = 'DelegadosFiduciarios'

export default DelegadosFiduciarios