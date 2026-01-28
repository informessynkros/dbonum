import MessageToasty from "@/components/iu/messages/MessageToasty"
import { 
  chequeraSchema, 
  type ChequeraItemData
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { CreditCard, Plus, Trash2, Building2, Key, User, Briefcase } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"


interface ChequeraProps {
  onNext: (data: { chequeras: ChequeraItemData[] }) => void
  initialData?: { chequeras: ChequeraItemData[] }
}

export interface ChequeraHandle {
  submit: () => Promise<boolean>
}

const Chequera = forwardRef<ChequeraHandle, ChequeraProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<{ chequeras: ChequeraItemData[] }>({
      resolver: zodResolver(chequeraSchema),
      defaultValues: initialData || {
        chequeras: []
      }
    })

    // Field Array para manejar lista dinámica
    const { fields, append, remove } = useFieldArray({
      control,
      name: "chequeras"
    })

    // Función general
    const onSubmit = (data: { chequeras: ChequeraItemData[] }) => {
      console.log('Chequeras: ', data)
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

    // Agregar nueva chequera
    const handleAddChequera = () => {
      append({
        cuenta: '',
        clave: '',
        institucion: '',
        titular: '',
        broker: ''
      })
    }
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Chequera</h2>
            <p className="text-sm text-gray-600">Agrega las cuentas bancarias asociadas (opcional)</p>
          </div>

          {/* Botón para agregar chequera */}
          <div className="flex justify-end">
            <button
              type="button"
              onClick={handleAddChequera}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus className="w-5 h-5" />
              Agregar Cuenta
            </button>
          </div>

          {/* Lista de chequeras */}
          {fields.length === 0 ? (
            <div className="text-center py-12 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
              <CreditCard className="w-12 h-12 text-gray-400 mx-auto mb-3" />
              <p className="text-gray-500 mb-2">No hay cuentas agregadas</p>
              <p className="text-sm text-gray-400 mb-4">Este paso es opcional</p>
              <button
                type="button"
                onClick={handleAddChequera}
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                Agregar la primera cuenta
              </button>
            </div>
          ) : (
            <div className="space-y-4">
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
                    title="Eliminar cuenta"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>

                  <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                    <CreditCard className="w-5 h-5 text-primary-600" />
                    Cuenta #{index + 1}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {/* Cuenta */}
                    <Controller
                      name={`chequeras.${index}.cuenta`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <MessageToasty
                          {...field}
                          label="Cuenta"
                          type="text"
                          placeholder="Número de cuenta"
                          icon={CreditCard}
                          error={error?.message}
                          required
                        />
                      )}
                    />

                    {/* Clave */}
                    <Controller
                      name={`chequeras.${index}.clave`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <MessageToasty
                          {...field}
                          label="Clave"
                          type="text"
                          placeholder="Clave de la cuenta"
                          icon={Key}
                          error={error?.message}
                          required
                        />
                      )}
                    />

                    {/* Institución */}
                    <Controller
                      name={`chequeras.${index}.institucion`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <MessageToasty
                          {...field}
                          label="Institución"
                          type="text"
                          placeholder="Nombre del banco"
                          icon={Building2}
                          error={error?.message}
                          required
                        />
                      )}
                    />

                    {/* Titular */}
                    <Controller
                      name={`chequeras.${index}.titular`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <MessageToasty
                          {...field}
                          label="Titular"
                          type="text"
                          placeholder="Nombre del titular"
                          icon={User}
                          error={error?.message}
                          required
                        />
                      )}
                    />

                    {/* Broker */}
                    <Controller
                      name={`chequeras.${index}.broker`}
                      control={control}
                      render={({ field, fieldState: { error } }) => (
                        <MessageToasty
                          {...field}
                          label="Broker"
                          type="text"
                          placeholder="Nombre del broker (opcional)"
                          icon={Briefcase}
                          error={error?.message}
                        />
                      )}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Información adicional */}
          {fields.length > 0 && (
            <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-sm text-blue-800">
                <strong>Total de cuentas:</strong> {fields.length}
              </p>
            </div>
          )}
        </div>
      </form>
    )
  }
)

Chequera.displayName = 'Chequera'

export default Chequera