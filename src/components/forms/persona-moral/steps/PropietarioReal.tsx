import {
  propietarioRealPMDefaultValues,
  propietarioRealPMSchema,
  type PropietarioRealPMFormData
} from "@/schemas/personaMoralSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useForm } from "react-hook-form"
import AddressForm from "../../shared/AddressForm"
import MessageToasty from "@/components/iu/messages/MessageToasty"
import { FileText, Mail, User } from "lucide-react"
import CustomPhoneInput from "@/components/iu/input/CustomPhoneInput"
import RadioButtonGroup from "@/components/iu/input/radioButton/RadioButtonGroup"
import {
  ACTIVIDADES_ECONOMICAS,
  CALIDADES_MIGRATORIAS,
  ESTADOS_MEXICO,
  GENEROS,
  PAISES,
  REGIMENES_FISCALES
} from "@/data/mockCatalogos"
import SelectMultiple from "@/components/iu/select/SelectMultiple"


interface PropietarioRealProps {
  onNext: (data: PropietarioRealPMFormData) => void
  initialData?: Partial<PropietarioRealPMFormData>
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
      trigger
    } = useForm<PropietarioRealPMFormData>({
      resolver: zodResolver(propietarioRealPMSchema),
      defaultValues: initialData || propietarioRealPMDefaultValues
    })

    const onSubmit = (data: PropietarioRealPMFormData) => {
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
            <p className="text-sm text-gray-600">Datos completos del propietario real de la empresa</p>
          </div>

          {/* Datos Personales */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Controller
              name="nombre"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MessageToasty 
                  {...field} 
                  label="Nombres"
                  type="text"
                  icon={User}
                  error={error?.message}
                  required
                />
              )} 
            />
            <Controller
              name="apellido_paterno"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MessageToasty
                  {...field}
                  label="Apellido Paterno"
                  type="text"
                  error={error?.message} required 
                />
              )} 
            />
            <Controller
              name="apellido_materno"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MessageToasty
                  {...field}
                  label="Apellido Materno"
                  type="text"
                  error={error?.message} required 
                />
              )} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="genero"
              control={control}
              render={({ field: { onChange, value }, fieldState: { error } }) => (
                <RadioButtonGroup
                  label="Género"
                  options={GENEROS}
                  value={value}
                  onChange={onChange}
                  error={error?.message}
                  required name="genero" 
                />
              )} 
            />
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
          </div>

          {/* Identificación */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="curp"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MessageToasty
                  {...field}
                  label="CURP"
                  type="text"
                  icon={FileText}
                  maxLength={18}
                  error={error?.message}
                  required
                  onChange={e => field.onChange(e.target.value.toUpperCase())} 
                />
              )} />
            <Controller
              name="pais_emitio_id"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={PAISES}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="País"
                  label="País que emitió ID"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                />
              )} />
            <Controller
              name="pais_nacimiento"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={PAISES}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="País"
                  label="País de Nacimiento"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )} />
            <Controller
              name="entidad_federativa_nacimiento"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={ESTADOS_MEXICO}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Estado"
                  label="Entidad Federativa"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )} />
            <Controller
              name="nacionalidad"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={PAISES}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Nacionalidad"
                  label="Nacionalidad"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )} />
            <Controller
              name="calidad_migratoria"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={CALIDADES_MIGRATORIAS}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Selecciona"
                  label="Calidad Migratoria"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                />
              )} 
            />
          </div>

          {/* Datos Fiscales */}
          <div className="border-t pt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller
              name="rfc"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <MessageToasty 
                  {...field}
                  label="RFC"
                  type="text"
                  icon={FileText}
                  maxLength={13}
                  error={error?.message}
                  required
                  onChange={e => field.onChange(e.target.value.toUpperCase())} 
                />
              )} 
            />
            <Controller
              name="regimen_fiscal"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple 
                  options={REGIMENES_FISCALES}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Régimen"
                  label="Régimen Fiscal"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message} 
                />
              )} 
            />
            <Controller
              name="ocupacion_profesion"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple 
                  options={ACTIVIDADES_ECONOMICAS}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Ocupación"
                  label="Ocupación/Profesión"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required 
                />
              )}
            />
          </div>

          {/* Contacto */}
          <div className="border-t pt-6">
            <Controller name="telefonos" control={control} render={({ field, fieldState: { error } }) => (
              <CustomPhoneInput value={field.value} onChange={field.onChange} error={error?.message} />
            )} />
            <div className="mt-4">
              <Controller
                name="email"
                control={control}
                render={({ field, fieldState: { error } }) => (
                  <MessageToasty
                    {...field}
                    label="Correo Electrónico"
                    type="email"
                    icon={Mail}
                    error={error?.message} required 
                  />
                )} 
              />
            </div>
          </div>

          {/* Domicilio */}
          <div className="border-t pt-6">
            <AddressForm
              control={control}
              errors={errors}
              fieldPrefix="domicilio"
              title="Domicilio del Propietario Real"
              showHeader={true}
              required={true}
            />
          </div>
        </div>
      </form>
    )
  }
)

PropietarioReal.displayName = 'PropietarioReal'
export default PropietarioReal
