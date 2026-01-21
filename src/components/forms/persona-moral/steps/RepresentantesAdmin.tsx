// Paso 6: Representantes/Apoderados y Administración - Persona Moral
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  representantesAdminPMSchema, 
  representantesAdminPMDefaultValues,
  representanteEmptyItem,
  integranteConsejoEmptyItem,
  type RepresentantesAdminPMFormData,
  type RepresentanteData,
  type IntegranteConsejoData
} from '@/schemas/personaMoralSchema'
import { UserCheck, Users, User, Building2, Globe } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import DynamicList from '@/components/forms/shared/DynamicList'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import {
  GENEROS,
  CALIDADES_MIGRATORIAS,
  TIPOS_FIRMA,
  FORMAS_ADMINISTRACION
} from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface RepresentantesAdminProps {
  onNext: (data: RepresentantesAdminPMFormData) => void
  initialData?: Partial<RepresentantesAdminPMFormData>
}

export interface RepresentantesAdminHandle {
  submit: () => Promise<boolean>
}

const RepresentantesAdmin = forwardRef<RepresentantesAdminHandle, RepresentantesAdminProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      formState: { errors },
      trigger
    } = useForm<RepresentantesAdminPMFormData>({
      resolver: zodResolver(representantesAdminPMSchema),
      defaultValues: initialData || representantesAdminPMDefaultValues
    })

    // Observar forma de administración
    const formaAdministracion = watch('forma_administracion')

    const onSubmit = (data: RepresentantesAdminPMFormData) => {
      console.log('Representantes y Administración PM:', data)
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

    // Renderizar cada representante
    const renderRepresentante = (
      representante: RepresentanteData, 
      index: number, 
      updateRepresentante: (index: number, item: RepresentanteData) => void
    ) => {
      return (
        <div className="space-y-6">
          {/* Datos Personales */}
          <div>
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Datos Personales</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre(s) <span className="text-red-500">*</span>
                </label>
                <input
                  value={representante.nombre}
                  onChange={e => updateRepresentante(index, { ...representante, nombre: e.target.value })}
                  placeholder="Nombre(s)"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Apellido Paterno <span className="text-red-500">*</span>
                </label>
                <input
                  value={representante.apellido_paterno}
                  onChange={e => updateRepresentante(index, { ...representante, apellido_paterno: e.target.value })}
                  placeholder="Apellido paterno"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Apellido Materno <span className="text-red-500">*</span>
                </label>
                <input
                  value={representante.apellido_materno}
                  onChange={e => updateRepresentante(index, { ...representante, apellido_materno: e.target.value })}
                  placeholder="Apellido materno"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Género
                </label>
                <select
                  value={representante.genero || ''}
                  onChange={e => updateRepresentante(index, { ...representante, genero: e.target.value })}
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
                  Fecha de Nacimiento
                </label>
                <input
                  type="date"
                  value={representante.fecha_nacimiento || ''}
                  onChange={e => updateRepresentante(index, { ...representante, fecha_nacimiento: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  CURP/Equivalente
                </label>
                <input
                  value={representante.curp || ''}
                  onChange={e => updateRepresentante(index, { ...representante, curp: e.target.value.toUpperCase() })}
                  placeholder="CURP"
                  maxLength={18}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País que emitió el ID
                </label>
                <input
                  value={representante.pais_emitio_id || ''}
                  onChange={e => updateRepresentante(index, { ...representante, pais_emitio_id: e.target.value })}
                  placeholder="País"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País de Nacimiento
                </label>
                <input
                  value={representante.pais_nacimiento || ''}
                  onChange={e => updateRepresentante(index, { ...representante, pais_nacimiento: e.target.value })}
                  placeholder="País"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Entidad Federativa de Nacimiento
                </label>
                <input
                  value={representante.entidad_federativa_nacimiento || ''}
                  onChange={e => updateRepresentante(index, { ...representante, entidad_federativa_nacimiento: e.target.value })}
                  placeholder="Estado"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nacionalidad
                </label>
                <input
                  value={representante.nacionalidad || ''}
                  onChange={e => updateRepresentante(index, { ...representante, nacionalidad: e.target.value })}
                  placeholder="Nacionalidad"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Calidad Migratoria
                </label>
                <select
                  value={representante.calidad_migratoria || ''}
                  onChange={e => updateRepresentante(index, { ...representante, calidad_migratoria: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Selecciona</option>
                  {CALIDADES_MIGRATORIAS.map((cal) => (
                    <option key={cal.id} value={cal.id}>
                      {cal.nombre}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País de Residencia
                </label>
                <input
                  value={representante.pais_residencia || ''}
                  onChange={e => updateRepresentante(index, { ...representante, pais_residencia: e.target.value })}
                  placeholder="País"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>

          {/* Datos Fiscales */}
          <div className="border-t border-gray-200 pt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Datos Fiscales</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  RFC/Equivalente
                </label>
                <input
                  value={representante.rfc || ''}
                  onChange={e => updateRepresentante(index, { ...representante, rfc: e.target.value.toUpperCase() })}
                  placeholder="RFC"
                  maxLength={13}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  País que emitió ID Fiscal
                </label>
                <input
                  value={representante.pais_emitio_id_fiscal || ''}
                  onChange={e => updateRepresentante(index, { ...representante, pais_emitio_id_fiscal: e.target.value })}
                  placeholder="País"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  FIEL
                </label>
                <input
                  value={representante.fiel || ''}
                  onChange={e => updateRepresentante(index, { ...representante, fiel: e.target.value })}
                  placeholder="FIEL"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Tipo de Firma
                </label>
                <select
                  value={representante.tipo_firma || ''}
                  onChange={e => updateRepresentante(index, { ...representante, tipo_firma: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                >
                  <option value="">Selecciona</option>
                  {TIPOS_FIRMA.map((tipo) => (
                    <option key={tipo.id} value={tipo.id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Datos Notariales */}
          <div className="border-t border-gray-200 pt-4">
            <h5 className="text-sm font-semibold text-gray-700 mb-3">Datos Notariales</h5>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  No. de Escritura
                </label>
                <input
                  value={representante.numero_escritura || ''}
                  onChange={e => updateRepresentante(index, { ...representante, numero_escritura: e.target.value })}
                  placeholder="Número"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Fecha de Escritura
                </label>
                <input
                  type="date"
                  value={representante.fecha_escritura || ''}
                  onChange={e => updateRepresentante(index, { ...representante, fecha_escritura: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  No. Notaría
                </label>
                <input
                  value={representante.numero_notaria || ''}
                  onChange={e => updateRepresentante(index, { ...representante, numero_notaria: e.target.value })}
                  placeholder="Número"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Lugar de la Notaría
                </label>
                <input
                  value={representante.lugar_notaria || ''}
                  onChange={e => updateRepresentante(index, { ...representante, lugar_notaria: e.target.value })}
                  placeholder="Ciudad/Estado"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Nombre del Notario
                </label>
                <input
                  value={representante.nombre_notario || ''}
                  onChange={e => updateRepresentante(index, { ...representante, nombre_notario: e.target.value })}
                  placeholder="Nombre completo"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Folio Mercantil
                </label>
                <input
                  value={representante.folio_mercantil || ''}
                  onChange={e => updateRepresentante(index, { ...representante, folio_mercantil: e.target.value })}
                  placeholder="Folio"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-gray-700 mb-1 block">
                  Fecha Inscripción RPC
                </label>
                <input
                  type="date"
                  value={representante.fecha_inscripcion_rpc || ''}
                  onChange={e => updateRepresentante(index, { ...representante, fecha_inscripcion_rpc: e.target.value })}
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
                />
              </div>
            </div>
          </div>
        </div>
      )
    }

    // Renderizar integrante de consejo
    const renderIntegranteConsejo = (
      integrante: IntegranteConsejoData,
      index: number,
      updateIntegrante: (index: number, item: IntegranteConsejoData) => void
    ) => {
      return (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nombre Completo <span className="text-red-500">*</span>
              </label>
              <input
                value={integrante.nombre_completo}
                onChange={e => updateIntegrante(index, { ...integrante, nombre_completo: e.target.value })}
                placeholder="Nombre completo"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Género
              </label>
              <select
                value={integrante.genero || ''}
                onChange={e => updateIntegrante(index, { ...integrante, genero: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              >
                <option value="">Selecciona</option>
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
              <input
                type="date"
                value={integrante.fecha_nacimiento}
                onChange={e => updateIntegrante(index, { ...integrante, fecha_nacimiento: e.target.value })}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Nacionalidad <span className="text-red-500">*</span>
              </label>
              <input
                value={integrante.nacionalidad}
                onChange={e => updateIntegrante(index, { ...integrante, nacionalidad: e.target.value })}
                placeholder="Nacionalidad"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Cargo <span className="text-red-500">*</span>
              </label>
              <input
                value={integrante.cargo}
                onChange={e => updateIntegrante(index, { ...integrante, cargo: e.target.value })}
                placeholder="Ej: Presidente, Secretario"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-700"
              />
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
            <h2 className="text-2xl font-bold text-dark mb-2">Representantes y Administración</h2>
            <p className="text-sm text-gray-600">
              Apoderados legales y estructura de administración de la empresa
            </p>
          </div>

          {/* Sección: Representantes/Apoderados */}
          <div>
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-primary-600" />
              Apoderados/Representantes Legales
            </h3>

            <Controller
              name="representantes"
              control={control}
              render={({ field, fieldState: { error } }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={representanteEmptyItem}
                  addButtonText="Agregar representante"
                  minItems={1}
                  maxItems={10}
                  error={error?.message}
                  renderItem={renderRepresentante}
                />
              )}
            />
          </div>

          {/* Sección: Administración */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-lg font-semibold text-dark mb-4 flex items-center gap-2">
              <Users className="w-5 h-5 text-primary-600" />
              Administración
            </h3>

            {/* Forma de Administración */}
            <div className="mb-6">
              <Controller
                name="forma_administracion"
                control={control}
                render={({ field: { onChange }, fieldState: { error } }) => (
                  <SelectMultiple
                    options={FORMAS_ADMINISTRACION}
                    onSelect={(selected) => {
                      if (selected && typeof selected === 'object' && 'id' in selected) {
                        onChange(selected.id)
                      }
                    }}
                    placeholder="Selecciona forma de administración"
                    label="Forma de Administración"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    error={error?.message}
                    required
                  />
                )}
              />
            </div>

            {/* Consejo de Administración */}
            <ConditionalSection show={formaAdministracion === 'CONSEJO'} animationType="slide">
              <div className="space-y-4">
                {/* Nombre del órgano */}
                <Controller
                  name="nombre_organo_colegiado"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Nombre del Órgano Colegiado"
                      type="text"
                      placeholder="Ej: Consejo de Administración"
                      icon={Building2}
                      error={error?.message}
                    />
                  )}
                />

                {/* Integrantes */}
                <Controller
                  name="integrantes_consejo"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <DynamicList
                      items={field.value || []}
                      onChange={field.onChange}
                      emptyItem={integranteConsejoEmptyItem}
                      title="Integrantes del Consejo"
                      addButtonText="Agregar integrante"
                      minItems={1}
                      maxItems={30}
                      error={error?.message}
                      renderItem={renderIntegranteConsejo}
                    />
                  )}
                />
              </div>
            </ConditionalSection>

            {/* Administrador Único */}
            <ConditionalSection show={formaAdministracion === 'ADMINISTRADOR_UNICO'} animationType="slide">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Controller
                  name="administrador_unico.nombre"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Nombre(s)"
                      type="text"
                      placeholder="Nombre(s)"
                      icon={User}
                      error={error?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="administrador_unico.apellido_paterno"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Apellido Paterno"
                      type="text"
                      placeholder="Apellido paterno"
                      error={error?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="administrador_unico.apellido_materno"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Apellido Materno"
                      type="text"
                      placeholder="Apellido materno"
                      error={error?.message}
                      required
                    />
                  )}
                />

                <Controller
                  name="administrador_unico.genero"
                  control={control}
                  render={({ field: { onChange }, fieldState: { error } }) => (
                    <SelectMultiple
                      options={GENEROS}
                      onSelect={(selected) => {
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
                    />
                  )}
                />

                <Controller
                  name="administrador_unico.fecha_nacimiento"
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

                <Controller
                  name="administrador_unico.nacionalidad"
                  control={control}
                  render={({ field, fieldState: { error } }) => (
                    <MessageToasty
                      {...field}
                      label="Nacionalidad"
                      type="text"
                      placeholder="Nacionalidad"
                      icon={Globe}
                      error={error?.message}
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

RepresentantesAdmin.displayName = 'RepresentantesAdmin'

export default RepresentantesAdmin