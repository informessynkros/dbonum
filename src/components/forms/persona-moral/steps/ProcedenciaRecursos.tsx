import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  procedenciaRecursosPMSchema, 
  procedenciaRecursosPMDefaultValues, 
  type ProcedenciaRecursosPMFormData 
} from '@/schemas/personaMoralSchema'
import { DollarSign, FileText } from 'lucide-react'
import Checkbox from '@/components/iu/input/Checkbox'
import { PROCEDENCIA_RECURSOS } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface ProcedenciaRecursosProps {
  onNext: (data: ProcedenciaRecursosPMFormData) => void
  initialData?: Partial<ProcedenciaRecursosPMFormData>
}

export interface ProcedenciaRecursosHandle {
  submit: () => Promise<boolean>
}

const ProcedenciaRecursos = forwardRef<ProcedenciaRecursosHandle, ProcedenciaRecursosProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<ProcedenciaRecursosPMFormData>({
      resolver: zodResolver(procedenciaRecursosPMSchema),
      defaultValues: initialData || procedenciaRecursosPMDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    const procedenciaSeleccionada = watch('procedencia_recursos')

    const onSubmit = (data: ProcedenciaRecursosPMFormData) => {
      console.log('Procedencia de Recursos PM:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('Es válido?:', isValid)
        console.log('Errores después de trigger:', errors)
        
        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Procedencia de Recursos</h2>
            <p className="text-sm text-gray-600">
              Origen de los recursos de la empresa
            </p>
          </div>

          {/* Sección: Procedencia de Recursos */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Origen de los Recursos
            </h3>

            <p className="text-sm text-gray-600 mb-4">
              Selecciona todas las opciones que apliquen:
            </p>

            <Controller
              name="procedencia_recursos"
              control={control}
              render={({ field: { value, onChange }, fieldState: { error } }) => (
                <div className="space-y-3">
                  {PROCEDENCIA_RECURSOS.map((recurso) => {
                    const isChecked = value?.includes(recurso.id) || false

                    return (
                      <div key={recurso.id}>
                        <Checkbox
                          label={recurso.nombre}
                          checked={isChecked}
                          onChange={(checked) => {
                            if (checked) {
                              onChange([...(value || []), recurso.id])
                            } else {
                              onChange((value || []).filter(id => id !== recurso.id))
                            }
                          }}
                        />
                      </div>
                    )
                  })}

                  {error && (
                    <div className="text-sm text-red-600 mt-2">
                      {error.message}
                    </div>
                  )}
                </div>
              )}
            />

            {/* Resumen de selección */}
            {procedenciaSeleccionada && procedenciaSeleccionada.length > 0 && (
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-xs text-blue-800">
                  <strong>Seleccionados ({procedenciaSeleccionada.length}):</strong>{' '}
                  {procedenciaSeleccionada.map(id => 
                    PROCEDENCIA_RECURSOS.find(r => r.id === id)?.nombre
                  ).join(', ')}
                </p>
              </div>
            )}
          </div>

          {/* Sección: Detalle del Recurso */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-primary-600" />
              Detalle del Recurso
            </h3>

            <Controller
              name="detalle_recurso"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Describe con detalle la procedencia de los recursos <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    {...field}
                    rows={6}
                    placeholder="Proporciona información detallada sobre el origen de los recursos de la empresa..."
                    className={`
                      w-full px-4 py-3 border rounded-lg 
                      focus:outline-none focus:ring-2 focus:ring-slate-700
                      ${error ? 'border-red-400' : 'border-gray-200'}
                    `}
                  />
                  
                  {/* Contador de caracteres */}
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {field.value?.length || 0} / 1000 caracteres
                    </span>
                    {error && (
                      <span className="text-xs text-red-600">
                        {error.message}
                      </span>
                    )}
                  </div>
                </div>
              )}
            />
          </div>

          {/* Mensaje de completado */}
          <div className="border-t border-gray-200 pt-6">
            <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-800">
                <strong>¡Último paso!</strong> Una vez que completes esta sección, 
                habrás terminado el formulario de Persona Moral.
              </p>
            </div>
          </div>

          {/* Nota de campos obligatorios */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              * Campos obligatorios
            </p>
          </div>
        </div>
      </form>
    )
  }
)

ProcedenciaRecursos.displayName = 'ProcedenciaRecursos'

export default ProcedenciaRecursos