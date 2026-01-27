import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import {
  PAISES,
  ESTADOS_MEXICO,
  GENEROS,
  ACTIVIDADES_ECONOMICAS,
  CALIDADES_MIGRATORIAS,
  REGIMENES_FISCALES,
  TIPOS_TELEFONO,
  TIPOS_VIALIDAD,
} from "@/data/mockCatalogos"
import {
  User,
  MapPin,
  Phone,
  Mail,
  FileText,
  Calendar,
  Plus,
  Trash2,
} from "lucide-react"
import { useFieldArray } from "react-hook-form"
import { type Control, type FieldErrors, Controller } from "react-hook-form"
import type { PropietarioRealFormData } from "@/schemas/fideicomisosSchema"


interface PropietarioRealFormProps {
  index: number
  control: Control<PropietarioRealFormData>
  errors: FieldErrors<PropietarioRealFormData>
}

const PropietarioRealForm = ({ index, control }: PropietarioRealFormProps) => {
  const {
    fields: telefonosFields,
    append: appendTelefono,
    remove: removeTelefono,
  } = useFieldArray({
    control,
    name: `propietariosReales.${index}.telefonos`,
  })

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Controller
        name={`propietariosReales.${index}.nombre`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Nombre(s)"
            type="text"
            placeholder="Nombre"
            icon={User}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.apellidoPaterno`}
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
      <Controller
        name={`propietariosReales.${index}.apellidoMaterno`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Apellido Materno"
            type="text"
            placeholder="Opcional"
            icon={User}
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.genero`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={GENEROS}
            onSelect={s => onChange((s as any)?.value)}
            placeholder="Género"
            label="Género"
            labelKey="label"
            valueKey="value"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.fechaNacimiento`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            type="date"
            label="Fecha de Nacimiento"
            icon={Calendar}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.curp`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="CURP"
            type="text"
            placeholder="18 caracteres"
            icon={FileText}
            error={error?.message}
            required
            maxLength={18}
            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.paisNacimiento`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={PAISES}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="País"
            label="País de Nacimiento"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.entidadNacimiento`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={ESTADOS_MEXICO}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Entidad"
            label="Entidad de Nacimiento"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.nacionalidad`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={PAISES}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Nacionalidad"
            label="Nacionalidad"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.calidadMigratoria`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={CALIDADES_MIGRATORIAS}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Calidad"
            label="Calidad Migratoria"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.paisResidencia`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={PAISES}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="País"
            label="País de Residencia"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.regimenFiscal`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={REGIMENES_FISCALES}
            onSelect={s => onChange((s as any)?.id)}
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
        name={`propietariosReales.${index}.rfc`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="RFC"
            type="text"
            placeholder="13 caracteres"
            icon={FileText}
            error={error?.message}
            required
            maxLength={13}
            onChange={(e) => field.onChange(e.target.value.toUpperCase())}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.fiel`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="FIEL"
            type="text"
            placeholder="Opcional"
            icon={FileText}
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.ocupacion`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={ACTIVIDADES_ECONOMICAS}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Ocupación"
            label="Ocupación"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      <div className="md:col-span-2 mt-4">
        <div className="flex justify-between mb-3">
          <h4 className="text-md font-semibold flex items-center gap-2">
            <Phone className="w-4 h-4 text-primary-600" />
            Teléfonos *
          </h4>
          <button
            type="button"
            onClick={() => appendTelefono({ tipo: "", numero: "" })}
            className="text-sm text-primary-600"
          >
            <Plus className="w-3 h-3 inline" /> Agregar
          </button>
        </div>
      </div>

      {telefonosFields.map((tel, telIdx) => (
        <div key={tel.id} className="md:col-span-2 grid grid-cols-3 gap-2">
          <Controller
            name={`propietariosReales.${index}.telefonos.${telIdx}.tipo`}
            control={control}
            render={({ field: { onChange }, fieldState: { error } }) => (
              <SelectMultiple
                options={TIPOS_TELEFONO}
                onSelect={s => onChange((s as any)?.id)}
                placeholder="Tipo"
                label="Tipo"
                labelKey="nombre"
                valueKey="id"
                multiple={false}
                error={error?.message}
              />
            )}
          />
          <Controller
            name={`propietariosReales.${index}.telefonos.${telIdx}.numero`}
            control={control}
            render={({ field, fieldState: { error } }) => (
              <MessageToasty
                {...field}
                label="Número"
                type="tel"
                placeholder="10 dígitos"
                icon={Phone}
                error={error?.message}
              />
            )}
          />
          <div className="flex items-end">
            {telefonosFields.length > 1 && (
              <button
                type="button"
                onClick={() => removeTelefono(telIdx)}
                className="text-red-600 px-2 py-2"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>
      ))}

      <div className="md:col-span-2">
        <Controller
          name={`propietariosReales.${index}.correo`}
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

      <div className="md:col-span-2 mt-4">
        <h4 className="text-md font-semibold flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary-600" />
          Domicilio
        </h4>
      </div>

      <Controller
        name={`propietariosReales.${index}.domicilio.tipoVialidad`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={TIPOS_VIALIDAD}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Tipo"
            label="Tipo de Vialidad"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.nombreVialidad`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Nombre Vialidad"
            type="text"
            placeholder="Nombre"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.noExterior`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="No. Exterior"
            type="text"
            placeholder="Número"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.noInterior`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="No. Interior"
            type="text"
            placeholder="Opcional"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.colonia`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Colonia"
            type="text"
            placeholder="Colonia"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.delegacionMunicipio`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Delegación/Municipio"
            type="text"
            placeholder="Delegación"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.ciudad`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Ciudad"
            type="text"
            placeholder="Ciudad"
            error={error?.message}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.estadoEntidad`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={ESTADOS_MEXICO}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="Estado"
            label="Estado"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.codigoPostal`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="C.P."
            type="text"
            placeholder="5 dígitos"
            error={error?.message}
            maxLength={5}
          />
        )}
      />
      <Controller
        name={`propietariosReales.${index}.domicilio.pais`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={PAISES}
            onSelect={s => onChange((s as any)?.id)}
            placeholder="País"
            label="País"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />
    </div>
  )
}

export default PropietarioRealForm
