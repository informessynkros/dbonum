// Paso 1: Datos Generales - Persona Física
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { datosGeneralesSchema, datosGeneralesDefaultValues, type DatosGeneralesFormData } from '@/schemas/personaFisicaSchema'
import { User, Mail, Briefcase, Calendar, Globe, CreditCard } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import {
  ACTIVIDADES_ECONOMICAS,
  CALIDADES_MIGRATORIAS,
  ESTADOS_CIVILES,
  ESTADOS_MEXICO,
  GENEROS,
  PAISES
} from '@/data/mockCatalogos'
import CustomPhoneInput from '@/components/iu/input/CustomPhoneInput'
import { forwardRef, useImperativeHandle } from 'react'


interface DatosGeneralesProps {
  onNext: (data: DatosGeneralesFormData) => void
  initialData?: Partial<DatosGeneralesFormData>
}

export interface DatosGeneralesHandle {
  submit: () => Promise<boolean>
}

const DatosGenerales = forwardRef<DatosGeneralesHandle, DatosGeneralesProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DatosGeneralesFormData>({
      resolver: zodResolver(datosGeneralesSchema),
      defaultValues: initialData || datosGeneralesDefaultValues
    })

    const onSubmit = (data: DatosGeneralesFormData) => {
      console.log('Datos Generales:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        // Primero validar manualmente todos los campos
        const isValid = await trigger()
        
        if (isValid) {
          // Si es válido, hacer submit
          handleSubmit(onSubmit)()
          return true
        } else {
          // Si no es válido, los errores ya se mostraron
          console.log('Formulario inválido:', errors)
          return false
        }
      }
    }))

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Datos Generales</h2>
            <p className="text-sm text-gray-600">
              Completa la información personal del cliente
            </p>
          </div>

          {/* Sección: Datos Personales */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Datos Personales
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nombre */}
              <Controller
                name="nombre"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Nombre(s)"
                    type="text"
                    placeholder="Nombre del cliente"
                    icon={User}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Apellido Paterno */}
              <Controller
                name="apellido_paterno"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Apellido Paterno"
                    type="text"
                    placeholder="Apellido paterno"
                    icon={User}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Apellido Materno */}
              <Controller
                name="apellido_materno"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Apellido Materno"
                    type="text"
                    placeholder="Apellido materno"
                    icon={User}
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Género */}
              <Controller
                name="genero"
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                  <MessageToasty
                    type="radio"
                    label="Género"
                    options={GENEROS}
                    value={value}
                    onChange={onChange}
                    error={error?.message}
                    required
                    name="genero"
                  />
                )}
              />

              {/* Estado Civil */}
              <Controller
                name="estado_civil"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={ESTADOS_CIVILES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona estado civil"
                    label="Estado Civil"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              {/* Profesión */}
              <Controller
                name="profesion"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Profesión"
                    type="text"
                    placeholder="Ej: Ingeniero, Abogado, etc."
                    icon={Briefcase}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Email */}
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Correo Electrónico"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    icon={Mail}
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Teléfonos */}
            <div className="mt-4">
              <Controller
                name="telefonos"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <CustomPhoneInput
                    {...field}
                    label="Teléfonos de contacto"
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>
          </div>

          {/* Sección: Datos de Nacimiento */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-primary-600" />
              Datos de Nacimiento
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Fecha de Nacimiento */}
              <Controller
                name="fecha_nacimiento"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    type="date"
                    label="Fecha de Nacimiento"
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* País de Nacimiento */}
              <Controller
                name="pais_nacimiento"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona país"
                    label="País de Nacimiento"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Entidad Federativa */}
              <Controller
                name="entidad_federativa_nacimiento"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={ESTADOS_MEXICO}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona estado"
                    label="Entidad Federativa de Nacimiento"
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

          {/* Sección: Nacionalidad y Residencia */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-primary-600" />
              Nacionalidad y Residencia
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Nacionalidad */}
              <Controller
                name="nacionalidad"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona nacionalidad"
                    label="Nacionalidad"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />

              {/* Calidad Migratoria */}
              <Controller
                name="calidad_migratoria"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={CALIDADES_MIGRATORIAS}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona calidad migratoria"
                    label="Calidad Migratoria"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />

              {/* País de Residencia */}
              <Controller
                name="pais_residencia"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona país"
                    label="País de Residencia"
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

          {/* Sección: Identificación y Actividad */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <CreditCard className="w-5 h-5 text-primary-600" />
              Identificación y Actividad Económica
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* CURP */}
              <Controller
                name="curp"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="CURP"
                    type="text"
                    placeholder="CURP (18 caracteres)"
                    icon={CreditCard}
                    error={error?.message}
                    required
                    maxLength={18}
                  />
                )}
              />

              {/* País que emitió ID */}
              <Controller
                name="pais_emitio_id"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={PAISES}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona país"
                    label="País que emitió el ID"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                  />
                )}
              />

              {/* Actividad Económica */}
              <Controller
                name="actividad_economica"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={ACTIVIDADES_ECONOMICAS}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona actividad"
                    label="Actividad Económica"
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

DatosGenerales.displayName = 'DatosGenerales'

export default DatosGenerales
