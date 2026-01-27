import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { PAISES, ESTADOS_MEXICO, GIROS_ECONOMICOS, TIPOS_VIALIDAD } from "@/data/mockCatalogos"
import { Building2, MapPin, Phone, Mail, FileText } from "lucide-react"
import { Controller, type Control, type FieldErrors } from "react-hook-form"


interface FideicomitentePMProps {
  index: number
  control: Control<any>
  errors: FieldErrors<any>
  fieldName?: string // "fideicomitentes" o "fideicomisarios"
}

const FideicomitentePM = ({ index, control, fieldName = 'fideicomitentes' }: FideicomitentePMProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Denominación */}
      <Controller
        name={`${fieldName}.${index}.datos.denominacion`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Denominación o Razón Social"
            type="text"
            placeholder="Nombre de la empresa"
            icon={Building2}
            error={error?.message}
            required
          />
        )}
      />

      {/* Nacionalidad */}
      <Controller
        name={`${fieldName}.${index}.datos.nacionalidad`}
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

      {/* RFC */}
      <Controller
        name={`${fieldName}.${index}.datos.rfc`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="RFC/Equivalente"
            type="text"
            placeholder="ABC123456XYZ"
            icon={FileText}
            error={error?.message}
            required
            maxLength={13}
            onChange={e => {
              const value = e.target.value.toUpperCase()
              field.onChange(value)
            }}
          />
        )}
      />

      {/* País que emitió ID fiscal */}
      <Controller
        name={`${fieldName}.${index}.datos.paisRfc`}
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
            label="País que emitió el ID Fiscal"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* FIEL */}
      <Controller
        name={`${fieldName}.${index}.datos.fiel`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Firma Electrónica Avanzada (FIEL)"
            type="text"
            placeholder="Opcional"
            icon={FileText}
            error={error?.message}
          />
        )}
      />

      {/* Actividad/Giro */}
      <Controller
        name={`${fieldName}.${index}.datos.actividadGiro`}
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
            label="Actividad/Giro/Objeto Social"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Teléfono */}
      <Controller
        name={`${fieldName}.${index}.datos.telefono`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Teléfono"
            type="tel"
            placeholder="10 dígitos"
            icon={Phone}
            error={error?.message}
            required
          />
        )}
      />

      {/* Email */}
      <Controller
        name={`${fieldName}.${index}.datos.correo`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Correo Electrónico"
            type="email"
            placeholder="empresa@ejemplo.com"
            icon={Mail}
            error={error?.message}
            required
          />
        )}
      />

      {/* Fecha de Constitución */}
      <Controller
        name={`${fieldName}.${index}.datos.fechaConstitucion`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            type="date"
            label="Fecha de Constitución"
            error={error?.message}
            required
          />
        )}
      />

      {/* Domicilio Header */}
      <div className="md:col-span-2 mt-4">
        <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-secondary-600" />
          Domicilio
        </h4>
      </div>

      {/* Tipo de Vialidad */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.tipoVialidad`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={TIPOS_VIALIDAD}
            onSelect={selected => {
              if (selected && typeof selected === 'object' && 'id' in selected) {
                onChange(selected.id)
              }
            }}
            placeholder="Tipo de vialidad"
            label="Tipo de Vialidad"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
          />
        )}
      />

      {/* Nombre Vialidad */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.nombreVialidad`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Nombre de la Vialidad"
            type="text"
            placeholder="Nombre de la calle"
            error={error?.message}
          />
        )}
      />

      {/* No. Exterior */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.noExterior`}
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

      {/* No. Interior */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.noInterior`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="No. Interior"
            type="text"
            placeholder="Número (opcional)"
            error={error?.message}
          />
        )}
      />

      {/* Colonia */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.colonia`}
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

      {/* Delegación/Municipio */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.delegacionMunicipio`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Delegación/Municipio"
            type="text"
            placeholder="Delegación o municipio"
            error={error?.message}
          />
        )}
      />

      {/* Ciudad */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.ciudad`}
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

      {/* Estado */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.estadoEntidad`}
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
            label="Estado/Entidad Federativa"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Código Postal */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.codigoPostal`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Código Postal"
            type="text"
            placeholder="5 dígitos"
            error={error?.message}
            maxLength={5}
          />
        )}
      />

      {/* País */}
      <Controller
        name={`${fieldName}.${index}.datos.domicilio.pais`}
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

export default FideicomitentePM