import { procedenciaRecursoSchema, type ProcedenciaRecursoFormData } from "@/schemas/fideicomisosSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { DollarSign } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"

// Default values
export const defaultValues: ProcedenciaRecursoFormData = {
  procedenciaRecurso: {
    aguinaldoUtilidades: false,
    ahorros: false,
    inversiones: false,
    patrimonio: false,
    donaciones: false,
    herenciaLegado: false,
    rifasSorteosPremios: false,
    sueldoFijo: false,
    comisiones: false,
    honorarios: false,
    derivadoActividadEconomica: false,
    ventaRentaInmuebles: false,
    ventaRentaBienesMuebles: false,
    gananciasNegocio: false,
    becaManutension: false,
    pensionesFondosAhorro: false,
    prestamos: false,
    bonosIncentivos: false,
    liquidacionFiniquito: false,
    otro: false,
    otroDescripcion: ''
  },
  detalleRecurso: ''
}

interface ProcedenciaRecursoProps {
  onNext: (data: ProcedenciaRecursoFormData) => void
  initialData?: Partial<ProcedenciaRecursoFormData>
}

export interface ProcedenciaRecursoHandle {
  submit: () => Promise<boolean>
}

const ProcedenciaRecurso = forwardRef<ProcedenciaRecursoHandle, ProcedenciaRecursoProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<ProcedenciaRecursoFormData>({
      resolver: zodResolver(procedenciaRecursoSchema),
      defaultValues: initialData || defaultValues
    })

    // Watch para "Otro"
    const otroSeleccionado = watch('procedenciaRecurso.otro')

    // Función general
    const onSubmit = (data: ProcedenciaRecursoFormData) => {
      console.log('Procedencia del Recurso: ', data)
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
            <h2 className="text-2xl font-bold text-dark mb-2">Procedencia del Recurso</h2>
            <p className="text-sm text-gray-600">Selecciona una o más opciones sobre el origen de los recursos</p>
          </div>

          {/* Sección: Procedencia */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Procedencia del Recurso <span className="text-red-500">*</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {/* Aguinaldo o utilidades */}
              <Controller
                name="procedenciaRecurso.aguinaldoUtilidades"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Aguinaldo o utilidades</span>
                  </label>
                )}
              />

              {/* Ahorros */}
              <Controller
                name="procedenciaRecurso.ahorros"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Ahorros</span>
                  </label>
                )}
              />

              {/* Inversiones */}
              <Controller
                name="procedenciaRecurso.inversiones"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Inversiones</span>
                  </label>
                )}
              />

              {/* Patrimonio */}
              <Controller
                name="procedenciaRecurso.patrimonio"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Patrimonio</span>
                  </label>
                )}
              />

              {/* Donaciones */}
              <Controller
                name="procedenciaRecurso.donaciones"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Donaciones</span>
                  </label>
                )}
              />

              {/* Herencia o legado */}
              <Controller
                name="procedenciaRecurso.herenciaLegado"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Herencia o legado</span>
                  </label>
                )}
              />

              {/* Rifas, sorteos o premios */}
              <Controller
                name="procedenciaRecurso.rifasSorteosPremios"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Rifas, sorteos o premios</span>
                  </label>
                )}
              />

              {/* Sueldo fijo */}
              <Controller
                name="procedenciaRecurso.sueldoFijo"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Sueldo fijo</span>
                  </label>
                )}
              />

              {/* Comisiones */}
              <Controller
                name="procedenciaRecurso.comisiones"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Comisiones</span>
                  </label>
                )}
              />

              {/* Honorarios */}
              <Controller
                name="procedenciaRecurso.honorarios"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Honorarios</span>
                  </label>
                )}
              />

              {/* Derivado de la actividad económica */}
              <Controller
                name="procedenciaRecurso.derivadoActividadEconomica"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Derivado de la actividad económica</span>
                  </label>
                )}
              />

              {/* Venta o renta de inmuebles */}
              <Controller
                name="procedenciaRecurso.ventaRentaInmuebles"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Venta o renta de inmuebles</span>
                  </label>
                )}
              />

              {/* Venta o renta de bienes muebles */}
              <Controller
                name="procedenciaRecurso.ventaRentaBienesMuebles"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Venta o renta de bienes muebles</span>
                  </label>
                )}
              />

              {/* Ganancias del negocio */}
              <Controller
                name="procedenciaRecurso.gananciasNegocio"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Ganancias del negocio</span>
                  </label>
                )}
              />

              {/* Beca o manutención */}
              <Controller
                name="procedenciaRecurso.becaManutension"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Beca o manutención</span>
                  </label>
                )}
              />

              {/* Pensiones o Fondos de Ahorro */}
              <Controller
                name="procedenciaRecurso.pensionesFondosAhorro"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Pensiones o Fondos de Ahorro</span>
                  </label>
                )}
              />

              {/* Préstamos */}
              <Controller
                name="procedenciaRecurso.prestamos"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Préstamos</span>
                  </label>
                )}
              />

              {/* Bonos o incentivos */}
              <Controller
                name="procedenciaRecurso.bonosIncentivos"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Bonos o incentivos</span>
                  </label>
                )}
              />

              {/* Liquidación o Finiquito */}
              <Controller
                name="procedenciaRecurso.liquidacionFiniquito"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Liquidación o Finiquito</span>
                  </label>
                )}
              />

              {/* Otro */}
              <Controller
                name="procedenciaRecurso.otro"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value || false}
                      onChange={e => onChange(e.target.checked)}
                      className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <span className="text-sm text-gray-700">Otro</span>
                  </label>
                )}
              />
            </div>

            {/* Campo de texto si selecciona "Otro" */}
            {otroSeleccionado && (
              <div className="mt-4">
                <Controller
                  name="procedenciaRecurso.otroDescripcion"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Especifica otro origen
                      </label>
                      <input
                        {...field}
                        type="text"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                        placeholder="Describe otro origen del recurso"
                      />
                      {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                    </div>
                  )}
                />
              </div>
            )}
          </div>

          {/* Detalle del Recurso */}
          <div>
            <Controller
              name="detalleRecurso"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Detalle del Recurso <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...field}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="Proporciona detalles adicionales sobre la procedencia de los recursos"
                  />
                  {error && <p className="mt-1 text-sm text-red-600">{error.message}</p>}
                </div>
              )}
            />
          </div>
        </div>
      </form>
    )
  }
)

ProcedenciaRecurso.displayName = 'ProcedenciaRecurso'

export default ProcedenciaRecurso