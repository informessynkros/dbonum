import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { PAISES, ESTADOS_MEXICO, GENEROS, ACTIVIDADES_ECONOMICAS, TIPOS_FIRMA, TIPOS_VIALIDAD } from "@/data/mockCatalogos"
import { User, MapPin, Phone, Mail, FileText, Calendar } from "lucide-react"
import { Controller, type Control, type FieldErrors } from "react-hook-form"
import type { DelegadosFiduciariosFormData } from "@/schemas/fideicomisosSchema"


interface DelegadoFiduciarioFormProps {
  index: number
  control: Control<DelegadosFiduciariosFormData>
  errors: FieldErrors<DelegadosFiduciariosFormData>
}

const DelegadoFiduciarioForm = ({ index, control }: DelegadoFiduciarioFormProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Nombre */}
      <Controller
        name={`delegadosFiduciarios.${index}.nombre`}
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

      {/* Apellido Paterno */}
      <Controller
        name={`delegadosFiduciarios.${index}.apellidoPaterno`}
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
        name={`delegadosFiduciarios.${index}.apellidoMaterno`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Apellido Materno"
            type="text"
            placeholder="Apellido materno (opcional)"
            icon={User}
            error={error?.message}
          />
        )}
      />

      {/* Género */}
      <Controller
        name={`delegadosFiduciarios.${index}.genero`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={GENEROS}
            onSelect={selected => {
              if (selected && typeof selected === 'object' && 'value' in selected) {
                onChange(selected.value)
              }
            }}
            placeholder="Selecciona género"
            label="Género"
            labelKey="label"
            valueKey="value"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Fecha de Nacimiento */}
      <Controller
        name={`delegadosFiduciarios.${index}.fechaNacimiento`}
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

      {/* País de Nacimiento */}
      <Controller
        name={`delegadosFiduciarios.${index}.paisNacimiento`}
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

      {/* Entidad Federativa de Nacimiento */}
      <Controller
        name={`delegadosFiduciarios.${index}.entidadNacimiento`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={ESTADOS_MEXICO}
            onSelect={selected => {
              if (selected && typeof selected === 'object' && 'id' in selected) {
                onChange(selected.id)
              }
            }}
            placeholder="Selecciona entidad"
            label="Entidad Federativa de Nacimiento"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Nacionalidad */}
      <Controller
        name={`delegadosFiduciarios.${index}.nacionalidad`}
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

      {/* Ocupación */}
      <Controller
        name={`delegadosFiduciarios.${index}.ocupacion`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={ACTIVIDADES_ECONOMICAS}
            onSelect={selected => {
              if (selected && typeof selected === 'object' && 'id' in selected) {
                onChange(selected.id)
              }
            }}
            placeholder="Selecciona ocupación"
            label="Ocupación/Profesión"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Email */}
      <Controller
        name={`delegadosFiduciarios.${index}.correo`}
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

      {/* Teléfono */}
      <Controller
        name={`delegadosFiduciarios.${index}.telefono`}
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

      {/* CURP */}
      <Controller
        name={`delegadosFiduciarios.${index}.curp`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="CURP/Equivalente"
            type="text"
            placeholder="18 caracteres"
            icon={FileText}
            error={error?.message}
            required
            maxLength={18}
            onChange={e => {
              const value = e.target.value.toUpperCase()
              field.onChange(value)
            }}
          />
        )}
      />

      {/* RFC */}
      <Controller
        name={`delegadosFiduciarios.${index}.rfc`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="RFC/Equivalente"
            type="text"
            placeholder="13 caracteres"
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

      {/* Tipo de Firma */}
      <Controller
        name={`delegadosFiduciarios.${index}.tipoFirma`}
        control={control}
        render={({ field: { onChange }, fieldState: { error } }) => (
          <SelectMultiple
            options={TIPOS_FIRMA}
            onSelect={selected => {
              if (selected && typeof selected === 'object' && 'id' in selected) {
                onChange(selected.id)
              }
            }}
            placeholder="Selecciona tipo"
            label="Tipo de Firma"
            labelKey="nombre"
            valueKey="id"
            multiple={false}
            error={error?.message}
            required
          />
        )}
      />

      {/* Datos de Escritura Header */}
      <div className="md:col-span-2 mt-4">
        <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <FileText className="w-4 h-4 text-primary-600" />
          Datos de Escritura
        </h4>
      </div>

      {/* No. Escritura */}
      <Controller
        name={`delegadosFiduciarios.${index}.noEscritura`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="No. de Escritura"
            type="text"
            placeholder="Número (opcional)"
            error={error?.message}
          />
        )}
      />

      {/* Fecha Escritura */}
      <Controller
        name={`delegadosFiduciarios.${index}.fechaEscritura`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            type="date"
            label="Fecha de Escritura"
            error={error?.message}
          />
        )}
      />

      {/* No. Notaría */}
      <Controller
        name={`delegadosFiduciarios.${index}.noNotaria`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="No. Notaría"
            type="text"
            placeholder="Número (opcional)"
            error={error?.message}
          />
        )}
      />

      {/* Lugar de la Notaría */}
      <Controller
        name={`delegadosFiduciarios.${index}.lugarNotaria`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Lugar de la Notaría"
            type="text"
            placeholder="Ciudad, Estado"
            error={error?.message}
          />
        )}
      />

      {/* Nombre del Notario */}
      <Controller
        name={`delegadosFiduciarios.${index}.nombreNotario`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Nombre del Notario"
            type="text"
            placeholder="Nombre completo (opcional)"
            error={error?.message}
          />
        )}
      />

      {/* Folio Mercantil */}
      <Controller
        name={`delegadosFiduciarios.${index}.folioMercantil`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            label="Folio Mercantil"
            type="text"
            placeholder="Folio (opcional)"
            error={error?.message}
          />
        )}
      />

      {/* Fecha Inscripción RPC */}
      <Controller
        name={`delegadosFiduciarios.${index}.fechaInscripcionRPC`}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <MessageToasty
            {...field}
            type="date"
            label="Fecha de Inscripción RPC"
            error={error?.message}
          />
        )}
      />

      {/* Domicilio Header */}
      <div className="md:col-span-2 mt-4">
        <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2 mb-3">
          <MapPin className="w-4 h-4 text-primary-600" />
          Domicilio
        </h4>
      </div>

      {/* Tipo de Vialidad */}
      <Controller
        name={`delegadosFiduciarios.${index}.domicilio.tipoVialidad`}
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
        name={`delegadosFiduciarios.${index}.domicilio.nombreVialidad`}
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
        name={`delegadosFiduciarios.${index}.domicilio.noExterior`}
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
        name={`delegadosFiduciarios.${index}.domicilio.noInterior`}
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
        name={`delegadosFiduciarios.${index}.domicilio.colonia`}
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
        name={`delegadosFiduciarios.${index}.domicilio.delegacionMunicipio`}
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
        name={`delegadosFiduciarios.${index}.domicilio.ciudad`}
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
        name={`delegadosFiduciarios.${index}.domicilio.estadoEntidad`}
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
        name={`delegadosFiduciarios.${index}.domicilio.codigoPostal`}
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
        name={`delegadosFiduciarios.${index}.domicilio.pais`}
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

export default DelegadoFiduciarioForm