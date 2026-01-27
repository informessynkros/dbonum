import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  estructuraCorporativaPMSchema, 
  estructuraCorporativaPMDefaultValues,
  directivoEmptyItem,
  empresaGrupoEmptyItem,
  conformacionCapitalEmptyItem,
  type EstructuraCorporativaPMFormData,
  type DirectivoData,
  type EmpresaGrupoData,
  type ConformacionCapitalData
} from '@/schemas/personaMoralSchema'
import { Users, Building2, DollarSign, User, Calendar, MapPin, Percent } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import DynamicList from '@/components/forms/shared/DynamicList'
import { TIPOS_TITULOS } from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface EstructuraCorporativaProps {
  onNext: (data: EstructuraCorporativaPMFormData) => void
  initialData?: Partial<EstructuraCorporativaPMFormData>
}

export interface EstructuraCorporativaHandle {
  submit: () => Promise<boolean>
}

const EstructuraCorporativa = forwardRef<EstructuraCorporativaHandle, EstructuraCorporativaProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<EstructuraCorporativaPMFormData>({
      resolver: zodResolver(estructuraCorporativaPMSchema),
      defaultValues: initialData || estructuraCorporativaPMDefaultValues
    })

    // Observar conformación del capital para calcular suma de porcentajes
    const conformacionCapital = watch('conformacion_capital')
    const totalPorcentaje = conformacionCapital?.reduce((sum, item) => sum + (item.porcentaje_capital_social || 0), 0) || 0

    const onSubmit = (data: EstructuraCorporativaPMFormData) => {
      console.log('Estructura Corporativa PM:', data)
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

    // Renderizar cada directivo
    const renderDirectivo = (directivo: DirectivoData, index: number, updateDirectivo: (index: number, item: DirectivoData) => void) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={directivo.nombre_completo}
                  onChange={e => updateDirectivo(index, { ...directivo, nombre_completo: e.target.value })}
                  placeholder="Nombre completo del directivo"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cargo <span className="text-red-500">*</span>
              </label>
              <input
                value={directivo.cargo}
                onChange={e => updateDirectivo(index, { ...directivo, cargo: e.target.value })}
                placeholder="Ej: Director General"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Fecha de Nacimiento
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Calendar className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="date"
                  value={directivo.fecha_nacimiento || ''}
                  onChange={e => updateDirectivo(index, { ...directivo, fecha_nacimiento: e.target.value })}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nacionalidad
              </label>
              <input
                value={directivo.nacionalidad || ''}
                onChange={e => updateDirectivo(index, { ...directivo, nacionalidad: e.target.value })}
                placeholder="Nacionalidad"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>
          </div>
        </div>
      )
    }

    // Renderizar cada empresa del grupo
    const renderEmpresaGrupo = (empresa: EmpresaGrupoData, index: number, updateEmpresa: (index: number, item: EmpresaGrupoData) => void) => {
      return (
        <div className="space-y-4">
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
                  value={empresa.denominacion_razon_social}
                  onChange={e => updateEmpresa(index, { ...empresa, denominacion_razon_social: e.target.value })}
                  placeholder="Nombre de la empresa"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nacionalidad <span className="text-red-500">*</span>
              </label>
              <input
                value={empresa.nacionalidad}
                onChange={e => updateEmpresa(index, { ...empresa, nacionalidad: e.target.value })}
                placeholder="País"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Objeto Social <span className="text-red-500">*</span>
              </label>
              <textarea
                value={empresa.objeto_social}
                onChange={e => updateEmpresa(index, { ...empresa, objeto_social: e.target.value })}
                placeholder="Descripción del objeto social"
                rows={3}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Capital Social <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={empresa.capital_social || ''}
                  onChange={e => updateEmpresa(index, { ...empresa, capital_social: Number(e.target.value) || 0 })}
                  placeholder="Monto"
                  min={0}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Domicilio <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MapPin className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={empresa.domicilio}
                  onChange={e => updateEmpresa(index, { ...empresa, domicilio: e.target.value })}
                  placeholder="Dirección completa"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Renderizar cada persona de la conformación del capital
    const renderConformacionCapital = (persona: ConformacionCapitalData, index: number, updatePersona: (index: number, item: ConformacionCapitalData) => void) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <User className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  value={persona.nombre}
                  onChange={e => updatePersona(index, { ...persona, nombre: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Número de Títulos
              </label>
              <input
                type="number"
                value={persona.numero_titulos || ''}
                onChange={e => updatePersona(index, { ...persona, numero_titulos: Number(e.target.value) || undefined })}
                placeholder="Cantidad"
                min={0}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Serie de Títulos
              </label>
              <input
                value={persona.serie_titulos || ''}
                onChange={e => updatePersona(index, { ...persona, serie_titulos: e.target.value })}
                placeholder="Ej: A, B"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Monto del Capital Social <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <DollarSign className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={persona.monto_capital_social || ''}
                  onChange={e => updatePersona(index, { ...persona, monto_capital_social: Number(e.target.value) || 0 })}
                  placeholder="Monto"
                  min={0}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Porcentaje (%) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Percent className="w-5 h-5 text-gray-400" />
                </div>
                <input
                  type="number"
                  value={persona.porcentaje_capital_social || ''}
                  onChange={e => updatePersona(index, { ...persona, porcentaje_capital_social: Number(e.target.value) || 0 })}
                  placeholder="0-100"
                  min={0}
                  max={100}
                  className="w-full pl-10 px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Estructura Corporativa</h2>
            <p className="text-sm text-gray-600">
              Información sobre la estructura de la empresa (Aplica para riesgo Alto o Medio)
            </p>
          </div>

          {/* Sección 1: Directivos */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Estructura Corporativa Interna
            </h3>

            <Controller
              name="directivos"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={directivoEmptyItem}
                  title="Dirección General y Directivos"
                  addButtonText="Agregar directivo"
                  minItems={1}
                  maxItems={20}
                  error={error?.message}
                  renderItem={renderDirectivo}
                />
              )}
            />
          </div>

          {/* Sección 2: Empresas del Grupo */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-primary-600" />
              Empresas del Grupo Empresarial
            </h3>

            <Controller
              name="empresas_grupo"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={empresaGrupoEmptyItem}
                  addButtonText="Agregar empresa"
                  minItems={0}
                  maxItems={50}
                  error={error?.message}
                  renderItem={renderEmpresaGrupo}
                />
              )}
            />
          </div>

          {/* Sección 3: Capital Social */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-primary-600" />
              Estructura del Capital Social
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {/* Monto del Capital Social */}
              <Controller
                name="monto_capital_social"
                control={control}
                render={({ field: { onChange, value } }) => (
                  <MessageToasty
                    value={value?.toString() || ''}
                    onChange={e => onChange(Number(e.target.value) || 0)}
                    label="Monto del Capital Social"
                    type="number"
                    placeholder="Monto total"
                    icon={DollarSign}
                    min={0}
                    required
                  />
                )}
              />

              {/* Tipo de Títulos */}
              <Controller
                name="tipo_titulos"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={TIPOS_TITULOS}
                    onSelect={selected => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona tipo"
                    label="Tipo de Títulos Representativos"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Indicador de porcentaje total */}
            <div className={`
              p-4 rounded-lg border-2 transition-all duration-200 mb-4
              ${totalPorcentaje === 100 
                ? 'bg-green-50 border-green-300' 
                : totalPorcentaje > 100
                  ? 'bg-red-50 border-red-300'
                  : 'bg-yellow-50 border-yellow-300'
              }
            `}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg
                    ${totalPorcentaje === 100 
                      ? 'bg-green-600 text-white' 
                      : totalPorcentaje > 100
                        ? 'bg-red-600 text-white'
                        : 'bg-yellow-600 text-white'
                    }
                  `}>
                    {totalPorcentaje}%
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-gray-800">
                      Porcentaje total del capital social
                    </p>
                    <p className="text-xs text-gray-600">
                      {totalPorcentaje === 100 
                        ? '✓ La suma es correcta (100%)' 
                        : totalPorcentaje > 100
                          ? '✗ La suma excede el 100%'
                          : `Falta ${100 - totalPorcentaje}% por asignar`
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Conformación del Capital Social */}
            <Controller
              name="conformacion_capital"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={conformacionCapitalEmptyItem}
                  title="Conformación del Capital Social"
                  addButtonText="Agregar persona/entidad"
                  minItems={1}
                  maxItems={50}
                  error={error?.message}
                  renderItem={renderConformacionCapital}
                />
              )}
            />
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

EstructuraCorporativa.displayName = 'EstructuraCorporativa'

export default EstructuraCorporativa