import { zodResolver } from "@hookform/resolvers/zod"
import { UserCog, Plus, Trash2 } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm, useFieldArray } from "react-hook-form"
import PropietarioRealForm from "./PropietarioRealForm"
import { propietarioRealSchemaF, type PropietarioRealFormData } from "@/schemas/fideicomisosSchema"


export const propietarioRealDefaultValues: PropietarioRealFormData = {
  existeOtroPropietario: false,
  propietariosReales: []
}

interface PropietarioRealProps {
  onNext: (data: PropietarioRealFormData) => void
  initialData?: Partial<PropietarioRealFormData>
}

export interface PropietarioRealHandle {
  submit: () => Promise<boolean>
}

const PropietarioReal = forwardRef<PropietarioRealHandle, PropietarioRealProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<PropietarioRealFormData>({
      resolver: zodResolver(propietarioRealSchemaF),
      defaultValues: initialData || propietarioRealDefaultValues
    })

    const { fields, append, remove } = useFieldArray({
      control,
      name: "propietariosReales"
    })

    const existeOtroPropietario = watch('existeOtroPropietario')

    const agregarPropietario = () => {
      append({
        nombre: '',
        apellidoPaterno: '',
        apellidoMaterno: '',
        genero: 'masculino',
        fechaNacimiento: '',
        curp: '',
        paisNacimiento: '',
        entidadNacimiento: '',
        nacionalidad: '',
        calidadMigratoria: '',
        paisResidencia: '',
        regimenFiscal: '',
        rfc: '',
        fiel: '',
        ocupacion: '',
        telefonos: [{ tipo: '', numero: '' }],
        correo: '',
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

    const onSubmit = (data: PropietarioRealFormData) => {
      console.log('Propietario Real: ', data)
      onNext(data)
    }

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        }
        return false
      }
    }))
    
    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Propietario Real</h2>
            <p className="text-sm text-gray-600">Información sobre otros propietarios reales</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Existe otro propietario real aparte del fideicomitente(s)? <span className="text-red-500">*</span>
            </label>
            <Controller
              name="existeOtroPropietario"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="space-y-2">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === true}
                        onChange={() => onChange(true)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Sí</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === false}
                        onChange={() => onChange(false)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {error && <p className="text-sm text-red-600">{error.message}</p>}
                </div>
              )}
            />
          </div>

          {existeOtroPropietario && (
            <>
              <button
                type="button"
                onClick={agregarPropietario}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar Propietario Real
              </button>

              <div className="space-y-6">
                {fields.map((field, index) => (
                  <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                        <UserCog className="w-5 h-5 text-primary-600" />
                        Propietario Real {index + 1}
                      </h3>
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                    <PropietarioRealForm index={index} control={control} errors={errors} />
                  </div>
                ))}
              </div>

              {fields.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <UserCog className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                  <p>No hay propietarios reales agregados. Agrega al menos uno.</p>
                </div>
              )}
            </>
          )}
        </div>
      </form>
    )
  }
)

PropietarioReal.displayName = 'PropietarioReal'

export default PropietarioReal