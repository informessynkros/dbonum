// Paso 5: Actividad Económica - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  actividadEconomicaSchema, 
  actividadEconomicaDefaultValues, 
  type ActividadEconomicaFormData 
} from '@/schemas/personaFisicaSchema'
import { Briefcase, DollarSign, TrendingUp } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import Checkbox from '@/components/iu/input/Checkbox'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import {
  ACTIVIDADES_ECONOMICAS,
  GIROS_ECONOMICOS,
  FUENTES_INGRESO,
  TIPOS_INGRESOS_ADICIONALES
} from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle, useState } from 'react'


interface ActividadEconomicaProps {
  onNext: (data: ActividadEconomicaFormData) => void
  initialData?: Partial<ActividadEconomicaFormData>
  actividadPrincipal?: string
}

export interface ActividadEconomicaHandle {
  submit: () => Promise<boolean>
}

const ActividadEconomica = forwardRef<ActividadEconomicaHandle, ActividadEconomicaProps>(
  ({ onNext, initialData, actividadPrincipal = 'EMPLEADO' }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger,
      setValue
    } = useForm<ActividadEconomicaFormData>({
      resolver: zodResolver(actividadEconomicaSchema),
      defaultValues: initialData || actividadEconomicaDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    // Estado para la actividad económica
    const [actividadSeleccionada, setActividadSeleccionada] = useState(actividadPrincipal)

    console.log(setActividadSeleccionada)

    // Observar ingresos adicionales
    const tieneIngresosAdicionales = watch('tiene_ingresos_adicionales')

    const onSubmit = (data: ActividadEconomicaFormData) => {
      console.log('Actividad Económica:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        // Marcar que se completó el detalle
        setValue('actividad_economica_detalle', 'completado')
        
        const isValid = await trigger()
        
        console.log('🔍 ¿Es válido?:', isValid)
        console.log('🔍 Errores después de trigger:', errors)
        
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
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Actividad Económica</h2>
            <p className="text-sm text-gray-600">
              Información detallada sobre ingresos y actividad laboral
            </p>
          </div>

          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Actividad seleccionada en Paso 1:</strong>{' '}
              {ACTIVIDADES_ECONOMICAS.find(a => a.id === actividadSeleccionada)?.nombre || actividadSeleccionada}
            </p>
          </div>

          <ConditionalSection show={actividadSeleccionada === 'EMPLEADO'} animationType="slide">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                Información Laboral
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Controller
                  name="empresa_nombre"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Nombre de la Empresa"
                      type="text"
                      placeholder="Empresa donde trabaja"
                      icon={Briefcase}
                      error={error?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="empresa_giro"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectMultiple
                      options={GIROS_ECONOMICOS}
                      onSelect={selected => {
                        if (selected && typeof selected === 'object' && 'id' in selected) {
                          onChange(selected.id)
                        }
                      }}
                      placeholder="Selecciona giro"
                      label="Giro/Sector"
                      labelKey="nombre"
                      valueKey="id"
                      multiple={false}
                      error={error?.message}
                      required
                    />
                  )}
                />

                {/* Puesto */}
                <Controller
                  name="puesto"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Puesto"
                      type="text"
                      placeholder="Ej: Gerente de Ventas"
                      icon={Briefcase}
                      error={error?.message}
                      required
                    />
                  )}
                />

                {/* Antigüedad */}
                <Controller
                  name="antiguedad_anos"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MessageToasty
                      value={value?.toString() || ''}
                      onChange={(e) => onChange(Number(e.target.value) || undefined)}
                      label="Antigüedad (años)"
                      type="number"
                      placeholder="Ej: 5"
                      icon={TrendingUp}
                      min={0}
                      required
                    />
                  )}
                />

                {/* Ingreso Mensual */}
                <Controller
                  name="ingreso_mensual_empleado"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MessageToasty
                      value={value?.toString() || ''}
                      onChange={(e) => onChange(Number(e.target.value) || undefined)}
                      label="Ingreso Mensual (MXN)"
                      type="number"
                      placeholder="Ej: 25000"
                      icon={DollarSign}
                      min={0}
                      required
                    />
                  )}
                />
              </div>
            </div>
          </ConditionalSection>

          {/* SECCIÓN CONDICIONAL: SIN ACTIVIDAD */}
          <ConditionalSection show={actividadSeleccionada === 'SIN_ACTIVIDAD'} animationType="slide">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-primary-600" />
                Fuente de Ingresos
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fuente de Ingresos */}
                <Controller
                  name="fuente_ingresos"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectMultiple
                      options={FUENTES_INGRESO}
                      onSelect={selected => {
                        if (selected && typeof selected === 'object' && 'id' in selected) {
                          onChange(selected.id)
                        }
                      }}
                      placeholder="Selecciona fuente"
                      label="Fuente de Ingresos"
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
          </ConditionalSection>

          {/* SECCIÓN CONDICIONAL: PF CON ACTIVIDADES PROFESIONALES */}
          <ConditionalSection show={actividadSeleccionada === 'PF_ACTIVIDADES_PROF'} animationType="slide">
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary-600" />
                Actividad Profesional
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Nombre Comercial */}
                <Controller
                  name="nombre_comercial"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Nombre Comercial/Actividad"
                      type="text"
                      placeholder="Nombre del negocio o actividad"
                      icon={Briefcase}
                      error={error?.message}
                      required
                    />
                  )}
                />

                {/* Giro */}
                <Controller
                  name="actividad_giro"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectMultiple
                      options={GIROS_ECONOMICOS}
                      onSelect={selected => {
                        if (selected && typeof selected === 'object' && 'id' in selected) {
                          onChange(selected.id)
                        }
                      }}
                      placeholder="Selecciona giro"
                      label="Giro/Sector"
                      labelKey="nombre"
                      valueKey="id"
                      multiple={false}
                      error={error?.message}
                      required
                    />
                  )}
                />

                {/* Años en la Actividad */}
                <Controller
                  name="anos_actividad"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MessageToasty
                      value={value?.toString() || ''}
                      onChange={(e) => onChange(Number(e.target.value) || undefined)}
                      label="Años en la Actividad"
                      type="number"
                      placeholder="Ej: 8"
                      icon={TrendingUp}
                      min={0}
                      required
                    />
                  )}
                />

                {/* Ingreso Mensual Promedio */}
                <Controller
                  name="ingreso_mensual_promedio"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MessageToasty
                      value={value?.toString() || ''}
                      onChange={(e) => onChange(Number(e.target.value) || undefined)}
                      label="Ingreso Mensual Promedio (MXN)"
                      type="number"
                      placeholder="Ej: 40000"
                      icon={DollarSign}
                      min={0}
                      required
                    />
                  )}
                />
              </div>
            </div>
          </ConditionalSection>

          {/* SECCIÓN: INGRESOS ADICIONALES (Para todos) */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-primary-600" />
              Ingresos Adicionales
            </h3>

            {/* Checkbox: ¿Tiene ingresos adicionales? */}
            <div className="mb-4">
              <Controller
                name="tiene_ingresos_adicionales"
                control={control}
                render={({ field: { value, onChange }, fieldState: { error } }) => (
                  <Checkbox
                    label="¿Tiene ingresos adicionales?"
                    checked={value}
                    onChange={onChange}
                    error={error?.message}
                  />
                )}
              />
            </div>

            {/* Campos condicionales si tiene ingresos adicionales */}
            <ConditionalSection show={tieneIngresosAdicionales} animationType="slide">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                {/* Tipo de Ingreso Adicional */}
                <Controller
                  name="tipo_ingreso_adicional"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectMultiple
                      options={TIPOS_INGRESOS_ADICIONALES}
                      onSelect={selected => {
                        if (selected && typeof selected === 'object' && 'id' in selected) {
                          onChange(selected.id)
                        }
                      }}
                      placeholder="Selecciona tipo"
                      label="Tipo de Ingreso Adicional"
                      labelKey="nombre"
                      valueKey="id"
                      multiple={false}
                      error={error?.message}
                      required
                    />
                  )}
                />

                {/* Monto Mensual Aproximado */}
                <Controller
                  name="monto_ingreso_adicional"
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <MessageToasty
                      value={value?.toString() || ''}
                      onChange={(e) => onChange(Number(e.target.value) || undefined)}
                      label="Monto Mensual Aproximado (MXN)"
                      type="number"
                      placeholder="Ej: 10000"
                      icon={DollarSign}
                      min={0}
                      required
                    />
                  )}
                />
              </div>
            </ConditionalSection>
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

ActividadEconomica.displayName = 'ActividadEconomica'

export default ActividadEconomica