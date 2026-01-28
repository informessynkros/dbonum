import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { 
  usoMovimientosSchema, 
  type UsoMovimientosData,
  UsoCuentaEnum,
  NumeroMovimientosEnum,
  ValidacionPorEnum,
  MontoPromedioEnum,
  PorcentajePromedioEnum
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { TrendingUp, DollarSign, Percent, CheckCircle } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"


interface UsoMovimientosProps {
  onNext: (data: UsoMovimientosData) => void
  initialData?: Partial<UsoMovimientosData>
}

export interface UsoMovimientosHandle {
  submit: () => Promise<boolean>
}

const UsoMovimientos = forwardRef<UsoMovimientosHandle, UsoMovimientosProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<UsoMovimientosData>({
      resolver: zodResolver(usoMovimientosSchema),
      defaultValues: initialData || {
        usoCuenta: 'Gastos empresariales',
        montoDepositoInicial: 0,
        numeroDepositosMensuales: 'Hasta 5 movimientos',
        numeroRetirosMensuales: 'Hasta 5 movimientos',
        validadoPor: 'Monto',
        liqVsSaldo: false,
        manejaCustodia: false,
        cortoEfectivo: false,
      }
    })

    // Observar validadoPor para mostrar campos condicionales
    const validadoPor = watch('validadoPor')

    // Función general
    const onSubmit = (data: UsoMovimientosData) => {
      console.log('Uso y movimientos: ', data)
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

    // Opciones de catálogos
    const usoCuentaOptions = UsoCuentaEnum.options.map(uso => ({
      id: uso,
      nombre: uso
    }))

    const numeroMovimientosOptions = NumeroMovimientosEnum.options.map(num => ({
      id: num,
      nombre: num
    }))

    const validacionPorOptions = ValidacionPorEnum.options.map(tipo => ({
      id: tipo,
      nombre: tipo
    }))

    const montosPromedio = MontoPromedioEnum.options.map(monto => ({
      id: monto,
      nombre: monto
    }))

    const porcentajesPromedio = PorcentajePromedioEnum.options.map(porcentaje => ({
      id: porcentaje,
      nombre: porcentaje
    }))
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-6">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Uso y Movimientos de la Cuenta</h2>
            <p className="text-sm text-gray-600">Información sobre el uso y actividad esperada</p>
          </div>

          {/* Sección: Uso de la Cuenta */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Uso de la Cuenta
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Uso que se le pretende dar */}
              <Controller
                name="usoCuenta"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={usoCuentaOptions}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona uso"
                    label="Uso que se le pretende dar a la cuenta"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Monto del depósito inicial */}
              <Controller
                name="montoDepositoInicial"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <MessageToasty
                    value={value?.toString() || ''}
                    onChange={e => {
                      const numValue = parseFloat(e.target.value)
                      onChange(isNaN(numValue) ? 0 : numValue)
                    }}
                    label="Monto del Depósito Inicial"
                    type="number"
                    placeholder="0.00"
                    icon={DollarSign}
                    error={error?.message}
                    required
                    min="0"
                    step="0.01"
                  />
                )}
              />

              {/* Número de desviación estándar */}
              <Controller
                name="numeroDesviacionEstandar"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <MessageToasty
                    value={value?.toString() || ''}
                    onChange={e => {
                      const numValue = parseFloat(e.target.value)
                      onChange(isNaN(numValue) ? undefined : numValue)
                    }}
                    label="Número de Desviación Estándar"
                    type="number"
                    placeholder="Opcional"
                    error={error?.message}
                    step="0.01"
                  />
                )}
              />
            </div>
          </div>

          {/* Sección: Movimientos Mensuales */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Movimientos Mensuales Esperados
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Número aproximado de depósitos */}
              <Controller
                name="numeroDepositosMensuales"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={numeroMovimientosOptions}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona cantidad"
                    label="Número Aproximado de Depósitos Mensuales"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Número aproximado de retiros */}
              <Controller
                name="numeroRetirosMensuales"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={numeroMovimientosOptions}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona cantidad"
                    label="Número Aproximado de Retiros Mensuales"
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

          {/* Sección: Validación por Monto o Porcentaje */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Validación de Movimientos
            </h3>

            {/* ¿Validado por? */}
            <div className="mb-4">
              <Controller
                name="validadoPor"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={validacionPorOptions}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo de validación"
                    label="¿Validado por?"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>

            {/* CAMPOS CONDICIONALES: MONTO */}
            {validadoPor === 'Monto' && (
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <h4 className="text-sm font-semibold text-blue-900 mb-3 flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Montos Promedio Mensuales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Monto promedio depósitos */}
                  <Controller
                    name="movimientosMonto.montoPromedioDepositos"
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={montosPromedio}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona monto"
                        label="Monto Promedio Mensual de Depósitos"
                        labelKey="nombre"
                        valueKey="id"
                        multiple={false}
                        error={error?.message}
                        required
                      />
                    )}
                  />

                  {/* Monto promedio retiros */}
                  <Controller
                    name="movimientosMonto.montoPromedioRetiros"
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={montosPromedio}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona monto"
                        label="Monto Promedio Mensual de Retiros"
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
            )}

            {/* CAMPOS CONDICIONALES: PORCENTAJE */}
            {validadoPor === 'Porcentaje' && (
              <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                <h4 className="text-sm font-semibold text-green-900 mb-3 flex items-center gap-2">
                  <Percent className="w-4 h-4" />
                  Porcentajes Promedio Mensuales
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Porcentaje promedio depósitos */}
                  <Controller
                    name="movimientosPorcentaje.porcentajePromedioDepositos"
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={porcentajesPromedio}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona porcentaje"
                        label="Porcentaje Promedio Mensual de Depósitos"
                        labelKey="nombre"
                        valueKey="id"
                        multiple={false}
                        error={error?.message}
                        required
                      />
                    )}
                  />

                  {/* Porcentaje promedio retiros */}
                  <Controller
                    name="movimientosPorcentaje.porcentajePromedioRetiros"
                    control={control}
                    render={({ field: { onChange }, fieldState: { error } }) => (
                      <SelectMultiple
                        options={porcentajesPromedio}
                        onSelect={selected => {
                          if (selected && typeof selected === 'object' && 'id' in selected) {
                            onChange(selected.id)
                          }
                        }}
                        placeholder="Selecciona porcentaje"
                        label="Porcentaje Promedio Mensual de Retiros"
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
            )}
          </div>

          {/* Sección: Opciones Adicionales */}
          <div>
            <h3 className="text-lg font-semibold text-gray-600 mb-4 flex items-center gap-2">
              <CheckCircle className="w-5 h-5 text-primary-600" />
              Opciones Adicionales
            </h3>

            <div className="space-y-3">
              {/* Liq vs Saldo */}
              <Controller
                name="liqVsSaldo"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={e => onChange(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">Liq. vs Saldo</span>
                  </label>
                )}
              />

              {/* Maneja custodia */}
              <Controller
                name="manejaCustodia"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={e => onChange(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">¿Maneja custodia?</span>
                  </label>
                )}
              />

              {/* Corto efectivo */}
              <Controller
                name="cortoEfectivo"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={e => onChange(e.target.checked)}
                      className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700 font-medium">¿Corto efectivo?</span>
                  </label>
                )}
              />
            </div>
          </div>
        </div>
      </form>
    )
  }
)

UsoMovimientos.displayName = 'UsoMovimientos'

export default UsoMovimientos