import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { ESTADOS_MEXICO, PAISES } from "@/data/mockCatalogos"
import { MapPin } from "lucide-react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"


const TIPOS_VIALIDAD = [
  { id: 'ANDADOR', nombre: 'Andador' },
  { id: 'AUTOPISTA', nombre: 'Autopista' },
  { id: 'AVENIDA', nombre: 'Avenida' },
  { id: 'BOULEVARD', nombre: 'Boulevard' },
  { id: 'CALLE', nombre: 'Calle' },
  { id: 'CALLEJON', nombre: 'Callejón' },
  { id: 'CALZADA', nombre: 'Calzada' },
  { id: 'CAMINO', nombre: 'Camino' },
  { id: 'CARRETERA', nombre: 'Carretera' },
  { id: 'CERRADA', nombre: 'Cerrada' },
  { id: 'PASAJE', nombre: 'Pasaje' },
  { id: 'PRIVADA', nombre: 'Privada' },
]

interface AddressFormProps<T extends FieldValues> {
  control: Control<T>
  errors: any
  fieldPrefix: string // Ej. "domicilio" o "domicilio_fiscal"
  title?: string
  showHeader?: boolean
  required?: boolean
}

function AddressForm<T extends FieldValues> ({
  control,
  errors,
  fieldPrefix,
  title = "Domicilio",
  showHeader = true,
  required = true
}: AddressFormProps<T>) {

  // Helper para construir nombre del campo
  const getFieldName = (field: string): Path<T> => {
    return `${fieldPrefix}.${field}` as Path<T>
  }

  // Helper para obtener el error del campo
  const getFieldError = (field: string) => {
    const path = fieldPrefix.split('.')
    let errorObj = errors

    for (const key of path) {
      if (errorObj && errorObj[key]) {
        errorObj = errorObj[key]
      } else {
        return undefined
      }
    }

    return errorObj?.[field]?.message
  }

  return (
    <div>
      {/* Header opcional */}
      {showHeader && (
        <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-primary-600" />
          {title}
        </h3>
      )}

      <div className="space-y-4">
        {/* Fila 1: Tipo de Vialidad + Nombre de Vialidad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Tipo de Vialidad */}
          <Controller
            name={getFieldName('tipo_vialidad')}
            control={control}
            render={({ field: { onChange } }) => (
              <SelectMultiple
                options={TIPOS_VIALIDAD}
                onSelect={selected => {
                  if (selected && typeof selected === 'object' && 'id' in selected) {
                    onChange(selected.id)
                  }
                }}
                placeholder="Selecciona tipo"
                label="Tipo de Vialidad"
                labelKey="nombre"
                valueKey="id"
                multiple={false}
                error={getFieldError('tipo_vialidad')}
                required={required}
              />
            )}
          />

          {/* Nombre de Vialidad */}
          <Controller
            name={getFieldName('nombre_vialidad')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="Nombre de la Vialidad"
                type="text"
                placeholder="Ej: Insurgentes"
                icon={MapPin}
                error={getFieldError('nombre_vialidad')}
                required={required}
              />
            )}
          />
        </div>

        {/* Fila 2: Números Exterior e Interior */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* No. Exterior */}
          <Controller
            name={getFieldName('numero_exterior')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="No. Exterior"
                type="text"
                placeholder="123"
                error={getFieldError('numero_exterior')}
              />
            )}
          />

          {/* No. Interior */}
          <Controller
            name={getFieldName('numero_interior')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="No. Interior"
                type="text"
                placeholder="Apt 4B (opcional)"
                error={getFieldError('numero_interior')}
              />
            )}
          />
        </div>

        {/* Fila 3: Colonia + Alcaldía/Municipio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Colonia */}
          <Controller
            name={getFieldName('colonia')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="Colonia"
                type="text"
                placeholder="Nombre de la colonia"
                error={getFieldError('colonia')}
                required={required}
              />
            )}
          />

          {/* Alcaldía/Municipio */}
          <Controller
            name={getFieldName('alcaldia_municipio')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="Alcaldía/Municipio"
                type="text"
                placeholder="Delegación o municipio"
                error={getFieldError('alcaldia_municipio')}
                required={required}
              />
            )}
          />
        </div>

        {/* Fila 4: Ciudad + Estado */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Ciudad */}
          <Controller
            name={getFieldName('ciudad')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="Ciudad"
                type="text"
                placeholder="Ciudad"
                error={getFieldError('ciudad')}
                required={required}
              />
            )}
          />

          {/* Estado/Entidad Federativa */}
          <Controller
            name={getFieldName('estado')}
            control={control}
            render={({ field: { onChange } }) => (
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
                error={getFieldError('estado')}
                required={required}
              />
            )}
          />
        </div>

        {/* Fila 5: C.P. + País */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Código Postal */}
          <Controller
            name={getFieldName('codigo_postal')}
            control={control}
            render={({ field }) => (
              <MessageToasty
                {...field}
                label="Código Postal"
                type="text"
                placeholder="01000"
                maxLength={5}
                error={getFieldError('codigo_postal')}
                required={required}
              />
            )}
          />

          {/* País */}
          <Controller
            name={getFieldName('pais')}
            control={control}
            render={({ field: { onChange } }) => (
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
                error={getFieldError('pais')}
                required={required}
              />
            )}
          />
        </div>
      </div>
    </div>
  )
}

export default AddressForm