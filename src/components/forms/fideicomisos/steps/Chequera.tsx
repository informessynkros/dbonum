import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { BANCOS } from "@/data/mockCatalogos"
import { chequeraSchema, type ChequeraFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Wallet, Plus, Trash2, Hash, DollarSign } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm, useFieldArray } from "react-hook-form"

// Default values
export const chequeraDefaultValues: ChequeraFormData = {
  cuentas: []
}

interface ChequeraProps {
  onNext: (data: ChequeraFormData) => void
  initialData?: Partial<ChequeraFormData>
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
    } = useForm<ChequeraFormData>({
      resolver: zodResolver(chequeraSchema),
      defaultValues: initialData || chequeraDefaultValues
    })

    // Field array para cuentas
    const { fields, append, remove } = useFieldArray({
      control,
      name: "cuentas"
    })

    // Función para agregar cuenta
    const agregarCuenta = () => {
      append({
        noCuenta: '',
        banco: '',
        saldoPromedio: ''
      })
    }

    // Función general
    const onSubmit = (data: ChequeraFormData) => {
      console.log('Chequera: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Chequera</h2>
            <p className="text-sm text-gray-600">Agrega cuentas de chequera (opcional)</p>
          </div>

          {/* Botón para agregar */}
          <button
            type="button"
            onClick={agregarCuenta}
            className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            <Plus className="w-4 h-4" />
            Agregar Cuenta de Chequera
          </button>

          {/* Lista de cuentas */}
          <div className="space-y-6">
            {fields.map((field, index) => (
              <div key={field.id} className="border border-gray-200 rounded-xl p-6 bg-gray-50">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-700 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-primary-600" />
                    Cuenta de Chequera {index + 1}
                  </h3>
                  <button
                    type="button"
                    onClick={() => remove(index)}
                    className="text-red-600 hover:text-red-800 transition-colors"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* No. de Cuenta */}
                  <Controller
                    name={`cuentas.${index}.noCuenta`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <MessageToasty
                        {...field}
                        label="No. de Cuenta"
                        type="text"
                        placeholder="10 dígitos"
                        icon={Hash}
                        error={error?.message}
                        required
                        maxLength={10}
                      />
                    )}
                  />

                  {/* Banco */}
                  <Controller
                    name={`cuentas.${index}.banco`}
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={BANCOS}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona banco"
                        label="Banco"
                        labelKey="nombre"
                        valueKey="id"
                        multiple={false}
                        error={error?.message}
                        required
                      />
                    )}
                  />

                  {/* Saldo Promedio */}
                  <Controller
                    name={`cuentas.${index}.saldoPromedio`}
                    control={control}
                    render={({ field, fieldState: { error } }) => (
                      <MessageToasty
                        {...field}
                        label="Saldo Promedio"
                        type="number"
                        placeholder="0.00"
                        icon={DollarSign}
                        error={error?.message}
                        required
                      />
                    )}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Mensaje si no hay cuentas */}
          {fields.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <Wallet className="w-12 h-12 mx-auto mb-2 text-gray-400" />
              <p>No hay cuentas de chequera agregadas. Puedes continuar sin agregar cuentas.</p>
            </div>
          )}
        </div>
      </form>
    )
  }
)

Chequera.displayName = 'Chequera'

export default Chequera