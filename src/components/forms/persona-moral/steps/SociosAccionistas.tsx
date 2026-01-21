// Paso 5: Socios/Accionistas - Persona Moral
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  sociosAccionistasPMSchema, 
  sociosAccionistasPMDefaultValues,
  accionistaPersonaFisicaEmptyItem,
  accionistaPersonaMoralEmptyItem,
  conformacionCapitalEmptyItem,
  administradorEmptyItem,
  type SociosAccionistasPMFormData,
  type AccionistaPersonaFisicaData,
  type AccionistaPersonaMoralData,
  type ConformacionCapitalData,
  type AdministradorData
} from '@/schemas/personaMoralSchema'
import { User, Building2, Calendar, Phone, FileText, DollarSign, Briefcase } from 'lucide-react'
import DynamicList from '@/components/forms/shared/DynamicList'
import { GENEROS, SECTORES_EMPRESARIALES, GIROS_ECONOMICOS } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface SociosAccionistasProps {
  onNext: (data: SociosAccionistasPMFormData) => void
  initialData?: Partial<SociosAccionistasPMFormData>
}

export interface SociosAccionistasHandle {
  submit: () => Promise<boolean>
}

const SociosAccionistas = forwardRef<SociosAccionistasHandle, SociosAccionistasProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<SociosAccionistasPMFormData>({
      resolver: zodResolver(sociosAccionistasPMSchema),
      defaultValues: initialData || sociosAccionistasPMDefaultValues
    })

    const onSubmit = (data: SociosAccionistasPMFormData) => {
      console.log('Socios/Accionistas PM:', data)
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

    // Renderizar Accionista Persona Física
    const renderAccionistaPF = (
      accionista: AccionistaPersonaFisicaData, 
      index: number, 
      updateAccionista: (index: number, item: AccionistaPersonaFisicaData) => void
    ) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre(s) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={accionista.nombre}
                  onChange={e => updateAccionista(index, { ...accionista, nombre: e.target.value })}
                  placeholder="Nombre(s)"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apellido Paterno <span className="text-red-500">*</span>
              </label>
              <input
                value={accionista.apellido_paterno}
                onChange={e => updateAccionista(index, { ...accionista, apellido_paterno: e.target.value })}
                placeholder="Apellido paterno"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Apellido Materno <span className="text-red-500">*</span>
              </label>
              <input
                value={accionista.apellido_materno}
                onChange={e => updateAccionista(index, { ...accionista, apellido_materno: e.target.value })}
                placeholder="Apellido materno"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Género
              </label>
              <select
                value={accionista.genero || ''}
                onChange={e => updateAccionista(index, { ...accionista, genero: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona género</option>
                {GENEROS.map((genero) => (
                  <option key={genero.value} value={genero.value}>
                    {genero.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Fecha de Nacimiento <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={accionista.fecha_nacimiento}
                  onChange={e => updateAccionista(index, { ...accionista, fecha_nacimiento: e.target.value })}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nacionalidad
              </label>
              <input
                value={accionista.nacionalidad || ''}
                onChange={e => updateAccionista(index, { ...accionista, nacionalidad: e.target.value })}
                placeholder="País"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
          </div>
        </div>
      )
    }

    // Renderizar Accionista Persona Moral
    const renderAccionistaPM = (
      accionista: AccionistaPersonaMoralData, 
      index: number, 
      updateAccionista: (index: number, item: AccionistaPersonaMoralData) => void
    ) => {
      // Calcular porcentaje total de capital
      const totalPorcentaje = (accionista.conformacion_capital || []).reduce(
        (sum, item) => sum + (item.porcentaje_capital_social || 0), 0
      )

      // Renderizar conformación capital para este accionista PM
      const renderConformacionCapital = (
        persona: ConformacionCapitalData,
        subIndex: number,
        updatePersona: (subIndex: number, item: ConformacionCapitalData) => void
      ) => {
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Nombre <span className="text-red-500">*</span>
                </label>
                <input
                  value={persona.nombre}
                  onChange={e => updatePersona(subIndex, { ...persona, nombre: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Monto Capital <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={persona.monto_capital_social || ''}
                  onChange={e => updatePersona(subIndex, { ...persona, monto_capital_social: Number(e.target.value) || 0 })}
                  placeholder="Monto"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Porcentaje (%) <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  value={persona.porcentaje_capital_social || ''}
                  onChange={e => updatePersona(subIndex, { ...persona, porcentaje_capital_social: Number(e.target.value) || 0 })}
                  placeholder="0-100"
                  min={0}
                  max={100}
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        )
      }

      // Renderizar administración para este accionista PM
      const renderAdministrador = (
        admin: AdministradorData,
        subIndex: number,
        updateAdmin: (subIndex: number, item: AdministradorData) => void
      ) => {
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Nombre Completo <span className="text-red-500">*</span>
                </label>
                <input
                  value={admin.nombre_completo}
                  onChange={e => updateAdmin(subIndex, { ...admin, nombre_completo: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-gray-600 mb-1 block">
                  Cargo <span className="text-red-500">*</span>
                </label>
                <input
                  value={admin.cargo}
                  onChange={e => updateAdmin(subIndex, { ...admin, cargo: e.target.value })}
                  placeholder="Cargo"
                  className="w-full px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        )
      }

      return (
        <div className="space-y-6">
          {/* Datos básicos PM */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Denominación o Razón Social <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Building2 className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={accionista.denominacion_razon_social}
                  onChange={e => updateAccionista(index, { ...accionista, denominacion_razon_social: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                RFC <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <FileText className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={accionista.rfc}
                  onChange={e => updateAccionista(index, { ...accionista, rfc: e.target.value.toUpperCase() })}
                  placeholder="RFC (12-13 caracteres)"
                  maxLength={13}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nacionalidad <span className="text-red-500">*</span>
              </label>
              <input
                value={accionista.nacionalidad}
                onChange={e => updateAccionista(index, { ...accionista, nacionalidad: e.target.value })}
                placeholder="País"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Teléfono
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Phone className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={accionista.telefono || ''}
                  onChange={e => updateAccionista(index, { ...accionista, telefono: e.target.value })}
                  placeholder="Teléfono"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Sector
              </label>
              <select
                value={accionista.sector || ''}
                onChange={e => updateAccionista(index, { ...accionista, sector: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona sector</option>
                {SECTORES_EMPRESARIALES.map((sector) => (
                  <option key={sector.id} value={sector.id}>
                    {sector.nombre}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Actividad/Giro <span className="text-red-500">*</span>
              </label>
              <select
                value={accionista.actividad_giro}
                onChange={e => updateAccionista(index, { ...accionista, actividad_giro: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona giro</option>
                {GIROS_ECONOMICOS.map((giro) => (
                  <option key={giro.id} value={giro.id}>
                    {giro.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sub-sección: Conformación Capital */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Conformación del Capital Social
            </h4>

            {/* Indicador de porcentaje */}
            {accionista.conformacion_capital && accionista.conformacion_capital.length > 0 && (
              <div className={`
                p-2 rounded mb-3 text-xs
                ${totalPorcentaje === 100 
                  ? 'bg-green-100 text-green-800' 
                  : totalPorcentaje > 100
                    ? 'bg-red-100 text-red-800'
                    : 'bg-yellow-100 text-yellow-800'
                }
              `}>
                Total: {totalPorcentaje}% 
                {totalPorcentaje === 100 ? ' ✓' : totalPorcentaje > 100 ? ' (excede 100%)' : ` (falta ${100 - totalPorcentaje}%)`}
              </div>
            )}

            <DynamicList
              items={accionista.conformacion_capital || []}
              onChange={(items) => updateAccionista(index, { ...accionista, conformacion_capital: items })}
              emptyItem={conformacionCapitalEmptyItem}
              addButtonText="Agregar persona"
              minItems={0}
              maxItems={20}
              renderItem={renderConformacionCapital}
            />
          </div>

          {/* Sub-sección: Administración */}
          <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
            <h4 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Conformación de la Administración
            </h4>

            <DynamicList
              items={accionista.conformacion_administracion || []}
              onChange={(items) => updateAccionista(index, { ...accionista, conformacion_administracion: items })}
              emptyItem={administradorEmptyItem}
              addButtonText="Agregar administrador"
              minItems={0}
              maxItems={20}
              renderItem={renderAdministrador}
            />
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Socios/Accionistas</h2>
            <p className="text-sm text-gray-600">
              Información de los socios o accionistas de la empresa
            </p>
          </div>

          {/* Sección: Accionistas Persona Física */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <User className="w-5 h-5 text-primary-600" />
              Accionistas Persona Física
            </h3>

            <Controller
              name="accionistas_pf"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={accionistaPersonaFisicaEmptyItem}
                  addButtonText="Agregar accionista PF"
                  minItems={0}
                  maxItems={50}
                  error={error?.message}
                  renderItem={renderAccionistaPF}
                />
              )}
            />
          </div>

          {/* Sección: Accionistas Persona Moral */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Accionistas Persona Moral
            </h3>

            <Controller
              name="accionistas_pm"
              control={control}
              render={({ field }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={accionistaPersonaMoralEmptyItem}
                  addButtonText="Agregar accionista PM"
                  minItems={0}
                  maxItems={50}
                  renderItem={renderAccionistaPM}
                />
              )}
            />
          </div>

          {/* Nota importante */}
          <div className="border-t border-gray-200 pt-4">
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-800">
                💡 <strong>Nota:</strong> Debes agregar al menos un accionista (Persona Física o Persona Moral).
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

        {/* Debug de errores */}
        {Object.keys(errors).length > 0 && (
          <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg">
            <h4 className="font-bold text-red-800 mb-2">Errores detectados:</h4>
            <pre className="text-xs text-red-600">
              {JSON.stringify(errors, null, 2)}
            </pre>
          </div>
        )}
      </form>
    )
  }
)

SociosAccionistas.displayName = 'SociosAccionistas'

export default SociosAccionistas