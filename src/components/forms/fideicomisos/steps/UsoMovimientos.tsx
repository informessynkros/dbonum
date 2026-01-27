import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { usoMovimientosSchema, type UsoMovimientosFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { ArrowLeftRight, DollarSign, Percent } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"

// Catálogos
const USOS_CUENTA = [
  { id: 'gastosEmpresariales', nombre: 'Gastos Empresariales' },
  { id: 'gastosPersonales', nombre: 'Gastos Personales' },
  { id: 'inversion', nombre: 'Inversión' },
  { id: 'otro', nombre: 'Otro' },
]

const NUMERO_MOVIMIENTOS = [
  { id: 'hasta5', nombre: 'Hasta 5' },
  { id: 'hasta10', nombre: 'Hasta 10' },
  { id: 'hasta15', nombre: 'Hasta 15' },
]

// Default values
export const usoMovimientosDefaultValues: UsoMovimientosFormData = {
  usoCuenta: 'gastosEmpresariales',
  montoDepositoInicial: '',
  numeroDesviacionEstandar: '',
  numeroDepositosMensuales: 'hasta5',
  numeroRetirosMensuales: 'hasta5',
  validadoPor: 'monto',
  montoPromedioDepositos: '',
  montoPromedioRetiros: '',
  porcentajePromedioDepositos: '',
  porcentajePromedioRetiros: '',
  liqVsSaldo: false,
  manejaCustodia: false,
  cortoEfectivo: false
}

interface UsoMovimientosProps {
  onNext: (data: UsoMovimientosFormData) => void
  initialData?: Partial<UsoMovimientosFormData>
}

export interface UsoMovimientosHandle {
  submit: () => Promise<boolean>
}

const UsoMovimientos = forwardRef<UsoMovimientosHandle, UsoMovimientosProps>(
  ({ onNext, initialData }, ref) => {

    const {
      control,
      handleSubmit,
      // formState: { errors },
      trigger,
      watch
    } = useForm<UsoMovimientosFormData>({
      resolver: zodResolver(usoMovimientosSchema),
      defaultValues: initialData || usoMovimientosDefaultValues
    })

    const validadoPor = watch('validadoPor')

    const onSubmit = (data: UsoMovimientosFormData) => {
      console.log('Uso y Movimientos: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Uso y Movimientos de la Cuenta</h2>
            <p className="text-sm text-gray-600">Indica el uso y movimientos esperados</p>
          </div>

          {/* Uso de Cuenta */}
          <Controller
            name="usoCuenta"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectMultiple
                options={USOS_CUENTA}
                onSelect={selected => {
                  if (selected && typeof selected === 'object' && 'id' in selected) {
                    onChange(selected.id)
                  }
                }}
                placeholder="Selecciona uso"
                label="Uso de la Cuenta"
                labelKey="nombre"
                valueKey="id"
                multiple={false}
                error={error?.message}
                required
              />
            )}
          />

          {/* Monto Depósito Inicial */}
          <Controller
            name="montoDepositoInicial"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MessageToasty
                {...field}
                label="Monto de Depósito Inicial"
                type="number"
                placeholder="0.00"
                icon={DollarSign}
                error={error?.message}
                required
              />
            )}
          />

          {/* Número Desviación Estándar */}
          <Controller
            name="numeroDesviacionEstandar"
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MessageToasty
                {...field}
                label="Número de Desviación Estándar"
                type="text"
                placeholder="Opcional"
                error={error?.message}
              />
            )}
          />

          {/* Número Depósitos Mensuales */}
          <Controller
            name="numeroDepositosMensuales"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectMultiple
                options={NUMERO_MOVIMIENTOS}
                onSelect={selected => {
                  if (selected && typeof selected === 'object' && 'id' in selected) {
                    onChange(selected.id)
                  }
                }}
                placeholder="Selecciona cantidad"
                label="Número de Depósitos Mensuales"
                labelKey="nombre"
                valueKey="id"
                multiple={false}
                error={error?.message}
                required
              />
            )}
          />

          {/* Número Retiros Mensuales */}
          <Controller
            name="numeroRetirosMensuales"
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectMultiple
                options={NUMERO_MOVIMIENTOS}
                onSelect={selected => {
                  if (selected && typeof selected === 'object' && 'id' in selected) {
                    onChange(selected.id)
                  }
                }}
                placeholder="Selecciona cantidad"
                label="Número de Retiros Mensuales"
                labelKey="nombre"
                valueKey="id"
                multiple={false}
                error={error?.message}
                required
              />
            )}
          />

          {/* Validado Por: Monto vs Porcentaje */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Validado Por <span className="text-red-500">*</span>
            </label>
            <Controller
              name="validadoPor"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="space-y-2">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === 'monto'}
                        onChange={() => onChange('monto')}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <DollarSign className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Monto</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === 'porcentaje'}
                        onChange={() => onChange('porcentaje')}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <Percent className="w-4 h-4 text-gray-600" />
                      <span className="text-sm text-gray-700">Porcentaje</span>
                    </label>
                  </div>
                  {error && <p className="text-sm text-red-600">{error.message}</p>}
                </div>
              )}
            />
          </div>

          {/* Campos condicionales según validadoPor */}
          {validadoPor === 'monto' ? (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-primary-600" />
                Promedios en Monto
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Monto Promedio Depósitos */}
                <Controller
                  name="montoPromedioDepositos"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Monto Promedio Depósitos"
                      type="number"
                      placeholder="0.00"
                      icon={DollarSign}
                      error={error?.message}
                    />
                  )}
                />

                {/* Monto Promedio Retiros */}
                <Controller
                  name="montoPromedioRetiros"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Monto Promedio Retiros"
                      type="number"
                      placeholder="0.00"
                      icon={DollarSign}
                      error={error?.message}
                    />
                  )}
                />
              </div>
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
                <ArrowLeftRight className="w-5 h-5 text-primary-600" />
                Promedios en Porcentaje
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Porcentaje Promedio Depósitos */}
                <Controller
                  name="porcentajePromedioDepositos"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="% Promedio Depósitos"
                      type="number"
                      placeholder="0 - 100"
                      icon={Percent}
                      error={error?.message}
                    />
                  )}
                />

                {/* Porcentaje Promedio Retiros */}
                <Controller
                  name="porcentajePromedioRetiros"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="% Promedio Retiros"
                      type="number"
                      placeholder="0 - 100"
                      icon={Percent}
                      error={error?.message}
                    />
                  )}
                />
              </div>
            </div>
          )}

          {/* Checkboxes */}
          <div className="space-y-3">
            {/* Liq vs Saldo */}
            <Controller
              name="liqVsSaldo"
              control={control}
              render={({ field: { value, onChange } }) => (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value || false}
                    onChange={e => onChange(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Liq vs Saldo</span>
                </label>
              )}
            />

            {/* Maneja Custodia */}
            <Controller
              name="manejaCustodia"
              control={control}
              render={({ field: { value, onChange } }) => (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value || false}
                    onChange={e => onChange(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Maneja Custodia</span>
                </label>
              )}
            />

            {/* Corto en Efectivo */}
            <Controller
              name="cortoEfectivo"
              control={control}
              render={({ field: { value, onChange } }) => (
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={value || false}
                    onChange={e => onChange(e.target.checked)}
                    className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700">Corto en Efectivo</span>
                </label>
              )}
            />
          </div>
        </div>
      </form>
    )
  }
)

UsoMovimientos.displayName = 'UsoMovimientos'

export default UsoMovimientos