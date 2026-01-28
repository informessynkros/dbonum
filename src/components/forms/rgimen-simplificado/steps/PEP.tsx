// src/components/regimen-simplificado/steps/PEP.tsx

import MessageToasty from "@/components/iu/messages/MessageToasty"
import SelectMultiple from "@/components/iu/select/SelectMultiple"
import { PAISES } from "@/data/mockCatalogos"
import { 
  pepSchema, 
  type PEPDirectoData,
  type PEPRelacionadoData,
  NivelCargoEnum,
  RelacionPEPEnum
} from "@/schemas/regimenSimplificadoSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { Shield, Plus, Trash2, User, Building2, AlertCircle, Briefcase } from "lucide-react"
import { forwardRef, useImperativeHandle } from "react"
import { Controller, useFieldArray, useForm } from "react-hook-form"

interface PEPProps {
  onNext: (data: {
    tieneCargoPublico: boolean
    pepsDirectos: PEPDirectoData[]
    tieneRelacionConPEP: boolean
    pepsRelacionados: PEPRelacionadoData[]
  }) => void
  initialData?: {
    tieneCargoPublico: boolean
    pepsDirectos: PEPDirectoData[]
    tieneRelacionConPEP: boolean
    pepsRelacionados: PEPRelacionadoData[]
  }
}

export interface PEPHandle {
  submit: () => Promise<boolean>
}

const PEP = forwardRef<PEPHandle, PEPProps>(
  ({ onNext, initialData }, ref) => {

    // Hook
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger,
      watch
    } = useForm<{
      tieneCargoPublico: boolean
      pepsDirectos: PEPDirectoData[]
      tieneRelacionConPEP: boolean
      pepsRelacionados: PEPRelacionadoData[]
    }>({
      resolver: zodResolver(pepSchema),
      defaultValues: initialData || {
        tieneCargoPublico: false,
        pepsDirectos: [],
        tieneRelacionConPEP: false,
        pepsRelacionados: []
      }
    })

    // Observar banderas
    const tieneCargoPublico = watch('tieneCargoPublico')
    const tieneRelacionConPEP = watch('tieneRelacionConPEP')

    // Field Arrays
    const { fields: fieldsPepsDirectos, append: appendPepDirecto, remove: removePepDirecto } = useFieldArray({
      control,
      name: "pepsDirectos"
    })

    const { fields: fieldsPepsRelacionados, append: appendPepRelacionado, remove: removePepRelacionado } = useFieldArray({
      control,
      name: "pepsRelacionados"
    })

    // Función general
    const onSubmit = (data: {
      tieneCargoPublico: boolean
      pepsDirectos: PEPDirectoData[]
      tieneRelacionConPEP: boolean
      pepsRelacionados: PEPRelacionadoData[]
    }) => {
      console.log('PEP: ', data)
      onNext(data)
    }

    // Exponemos el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()

        console.log('Es válido?: ', isValid)
        console.log('Errores después del trigger: ', errors)

        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))

    // Agregar PEP Directo
    const handleAddPepDirecto = () => {
      appendPepDirecto({
        nombreCompleto: '',
        cargoEmpresa: '',
        nombreInstitucionPublica: '',
        nivel: 'Federal',
        paisCargoPublico: '',
        cargoPublico: '',
        razonesOperacionesMexico: '',
        calidadPEPNacional: false,
        calidadPEPExtranjera: false
      })
    }

    // Agregar PEP Relacionado
    const handleAddPepRelacionado = () => {
      appendPepRelacionado({
        nombreCompleto: '',
        cargoEmpresa: '',
        relacion: 'Cónyuge',
        nombreInstitucionPublica: '',
        nivel: 'Federal',
        paisCargoPublico: '',
        cargoPublico: '',
        razonesOperacionesMexico: '',
        calidadPEP: false,
        calidadPEPExtranjera: false
      })
    }

    // Opciones de catálogos
    const nivelesCargoOptions = NivelCargoEnum.options.map(nivel => ({
      id: nivel,
      nombre: nivel
    }))

    const relacionesOptions = RelacionPEPEnum.options.map(relacion => ({
      id: relacion,
      nombre: relacion
    }))
    
    return (
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white rounded-2xl p-8 shadow-sm"
      >
        <div className="space-y-8">
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">PEP - Personas Políticamente Expuestas</h2>
            <p className="text-sm text-gray-600">Información sobre personas con cargos públicos</p>
          </div>

          {/* ============================================ */}
          {/* SECCIÓN 1: PEP DIRECTO */}
          {/* ============================================ */}
          <div className="space-y-6">
            <div className="flex items-start gap-3 p-4 bg-amber-50 border border-amber-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-amber-900 mb-2">
                  Cargos Públicos Directos
                </h3>
                <p className="text-sm text-amber-800 mb-4">
                  ¿Algún socio, accionista, consejero, director general o directivo desempeña/ó (hace 1 año) algún cargo público nacional o internacional?
                </p>
                
                {/* Toggle Sí/No */}
                <div className="flex items-center gap-4">
                  <Controller
                    name="tieneCargoPublico"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={value === true}
                            onChange={() => onChange(true)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={value === false}
                            onChange={() => onChange(false)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Mostrar lista de PEPs Directos si la respuesta es Sí */}
            {tieneCargoPublico && (
              <div className="space-y-4">
                {/* Botón agregar */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddPepDirecto}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Persona con Cargo Público
                  </button>
                </div>

                {/* Error si no hay PEPs directos */}
                {errors.pepsDirectos?.root && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.pepsDirectos.root.message}</p>
                  </div>
                )}

                {/* Lista de PEPs Directos */}
                {fieldsPepsDirectos.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Shield className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-3">No hay personas agregadas</p>
                    <button
                      type="button"
                      onClick={handleAddPepDirecto}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Agregar la primera persona
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {fieldsPepsDirectos.map((field, index) => (
                      <div
                        key={field.id}
                        className="border-2 border-amber-200 rounded-xl p-6 bg-amber-50 relative"
                      >
                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={() => removePepDirecto(index)}
                          className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar persona"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <h4 className="text-lg font-semibold text-amber-900 mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-amber-700" />
                          Persona con Cargo Público #{index + 1}
                        </h4>

                        {/* Información Personal */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Información Personal</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre Completo */}
                            <Controller
                              name={`pepsDirectos.${index}.nombreCompleto`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Nombre Completo"
                                  type="text"
                                  placeholder="Nombre completo"
                                  icon={User}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Cargo en la Empresa */}
                            <Controller
                              name={`pepsDirectos.${index}.cargoEmpresa`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Cargo en la Empresa"
                                  type="text"
                                  placeholder="Ej: Director General"
                                  icon={Briefcase}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />
                          </div>
                        </div>

                        {/* Información del Cargo Público */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Información del Cargo Público
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre de Institución Pública */}
                            <Controller
                              name={`pepsDirectos.${index}.nombreInstitucionPublica`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Nombre de la Institución Pública"
                                  type="text"
                                  placeholder="Ej: Secretaría de Hacienda"
                                  icon={Building2}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Nivel */}
                            <Controller
                              name={`pepsDirectos.${index}.nivel`}
                              control={control}
                              render={({ field: { onChange }, fieldState: { error } }) => (
                                <SelectMultiple
                                  options={nivelesCargoOptions}
                                  onSelect={selected => {
                                    if (selected && typeof selected === 'object' && 'id' in selected) {
                                      onChange(selected.id)
                                    }
                                  }}
                                  placeholder="Selecciona nivel"
                                  label="Nivel"
                                  labelKey="nombre"
                                  valueKey="id"
                                  multiple={false}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* País donde desempeña cargo */}
                            <Controller
                              name={`pepsDirectos.${index}.paisCargoPublico`}
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
                                  label="País donde desempeña/ó el cargo público"
                                  labelKey="nombre"
                                  valueKey="id"
                                  multiple={false}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Cargo Público */}
                            <Controller
                              name={`pepsDirectos.${index}.cargoPublico`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Cargo Público"
                                  type="text"
                                  placeholder="Ej: Subsecretario"
                                  icon={Shield}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />
                          </div>
                        </div>

                        {/* Razones Operaciones en México (solo extranjero) */}
                        <div className="mb-6">
                          <Controller
                            name={`pepsDirectos.${index}.razonesOperacionesMexico`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  En caso de ser un cargo en el extranjero, ¿Cuáles son las razones por las que decidió celebrar operaciones en México?
                                </label>
                                <textarea
                                  {...field}
                                  rows={4}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                  placeholder="Describe las razones (opcional)..."
                                />
                                {error && (
                                  <p className="mt-1 text-sm text-red-600">{error.message}</p>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        {/* Calidades PEP */}
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Calidad de PEP</h5>
                          <div className="space-y-3">
                            <Controller
                              name={`pepsDirectos.${index}.calidadPEPNacional`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => onChange(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                  />
                                  <span className="text-sm text-gray-700 font-medium">
                                    ¿Calidad de Persona Políticamente Expuesta Nacional?
                                  </span>
                                </label>
                              )}
                            />

                            <Controller
                              name={`pepsDirectos.${index}.calidadPEPExtranjera`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => onChange(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                  />
                                  <span className="text-sm text-gray-700 font-medium">
                                    ¿Calidad de Persona Políticamente Expuesta Extranjera?
                                  </span>
                                </label>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* ============================================ */}
          {/* SECCIÓN 2: PEP RELACIONADO */}
          {/* ============================================ */}
          <div className="space-y-6 pt-6 border-t-2 border-gray-200">
            <div className="flex items-start gap-3 p-4 bg-sky-50 border border-sky-200 rounded-lg">
              <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-sky-900 mb-2">
                  Relaciones con PEP
                </h3>
                <p className="text-sm text-sky-800 mb-4">
                  ¿Algún socio, accionista, consejero, director general o directivo está relacionado con una persona que desempeña/ó (hace 1 año) algún cargo público nacional o internacional?
                </p>
                
                {/* Toggle Sí/No */}
                <div className="flex items-center gap-4">
                  <Controller
                    name="tieneRelacionConPEP"
                    control={control}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={value === true}
                            onChange={() => onChange(true)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium text-gray-700">Sí</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            checked={value === false}
                            onChange={() => onChange(false)}
                            className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                          />
                          <span className="text-sm font-medium text-gray-700">No</span>
                        </label>
                      </>
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Mostrar lista de PEPs Relacionados si la respuesta es Sí */}
            {tieneRelacionConPEP && (
              <div className="space-y-4">
                {/* Botón agregar */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={handleAddPepRelacionado}
                    className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    <Plus className="w-5 h-5" />
                    Agregar Persona Relacionada con PEP
                  </button>
                </div>

                {/* Error si no hay PEPs relacionados */}
                {errors.pepsRelacionados?.root && (
                  <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                    <p className="text-sm text-red-600">{errors.pepsRelacionados.root.message}</p>
                  </div>
                )}

                {/* Lista de PEPs Relacionados */}
                {fieldsPepsRelacionados.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
                    <Shield className="w-10 h-10 text-gray-400 mx-auto mb-2" />
                    <p className="text-gray-500 mb-3">No hay personas relacionadas agregadas</p>
                    <button
                      type="button"
                      onClick={handleAddPepRelacionado}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      Agregar la primera persona relacionada
                    </button>
                  </div>
                ) : (
                  <div className="space-y-6">
                    {fieldsPepsRelacionados.map((field, index) => (
                      <div
                        key={field.id}
                        className="border-2 border-sky-200 rounded-xl p-6 bg-sky-50 relative"
                      >
                        {/* Botón eliminar */}
                        <button
                          type="button"
                          onClick={() => removePepRelacionado(index)}
                          className="absolute top-4 right-4 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Eliminar persona"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>

                        <h4 className="text-lg font-semibold text-sky-900 mb-4 flex items-center gap-2">
                          <User className="w-5 h-5 text-sky-700" />
                          Persona Relacionada con PEP #{index + 1}
                        </h4>

                        {/* Información Personal */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Información Personal</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre Completo */}
                            <Controller
                              name={`pepsRelacionados.${index}.nombreCompleto`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Nombre Completo"
                                  type="text"
                                  placeholder="Nombre completo"
                                  icon={User}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Cargo en la Empresa */}
                            <Controller
                              name={`pepsRelacionados.${index}.cargoEmpresa`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Cargo en la Empresa"
                                  type="text"
                                  placeholder="Ej: Accionista"
                                  icon={Briefcase}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Relación */}
                            <Controller
                              name={`pepsRelacionados.${index}.relacion`}
                              control={control}
                              render={({ field: { onChange }, fieldState: { error } }) => (
                                <SelectMultiple
                                  options={relacionesOptions}
                                  onSelect={selected => {
                                    if (selected && typeof selected === 'object' && 'id' in selected) {
                                      onChange(selected.id)
                                    }
                                  }}
                                  placeholder="Selecciona relación"
                                  label="Relación"
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

                        {/* Información del Cargo Público */}
                        <div className="mb-6">
                          <h5 className="text-sm font-semibold text-gray-700 mb-3 flex items-center gap-2">
                            <Building2 className="w-4 h-4" />
                            Información del Cargo Público del Familiar
                          </h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {/* Nombre de Institución Pública */}
                            <Controller
                              name={`pepsRelacionados.${index}.nombreInstitucionPublica`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Nombre de la Institución Pública"
                                  type="text"
                                  placeholder="Ej: Congreso de la Unión"
                                  icon={Building2}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Nivel */}
                            <Controller
                              name={`pepsRelacionados.${index}.nivel`}
                              control={control}
                              render={({ field: { onChange }, fieldState: { error } }) => (
                                <SelectMultiple
                                  options={nivelesCargoOptions}
                                  onSelect={selected => {
                                    if (selected && typeof selected === 'object' && 'id' in selected) {
                                      onChange(selected.id)
                                    }
                                  }}
                                  placeholder="Selecciona nivel"
                                  label="Nivel"
                                  labelKey="nombre"
                                  valueKey="id"
                                  multiple={false}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* País donde desempeña cargo */}
                            <Controller
                              name={`pepsRelacionados.${index}.paisCargoPublico`}
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
                                  label="País donde desempeña/ó el cargo público"
                                  labelKey="nombre"
                                  valueKey="id"
                                  multiple={false}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />

                            {/* Cargo Público */}
                            <Controller
                              name={`pepsRelacionados.${index}.cargoPublico`}
                              control={control}
                              render={({ field, fieldState: { error } }) => (
                                <MessageToasty
                                  {...field}
                                  label="Cargo Público"
                                  type="text"
                                  placeholder="Ej: Diputado Federal"
                                  icon={Shield}
                                  error={error?.message}
                                  required
                                />
                              )}
                            />
                          </div>
                        </div>

                        {/* Razones Operaciones en México (solo extranjero) */}
                        <div className="mb-6">
                          <Controller
                            name={`pepsRelacionados.${index}.razonesOperacionesMexico`}
                            control={control}
                            render={({ field, fieldState: { error } }) => (
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  En caso de ser un cargo en el extranjero, ¿Cuáles son las razones por las que decidió celebrar operaciones en México?
                                </label>
                                <textarea
                                  {...field}
                                  rows={4}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                                  placeholder="Describe las razones (opcional)..."
                                />
                                {error && (
                                  <p className="mt-1 text-sm text-red-600">{error.message}</p>
                                )}
                              </div>
                            )}
                          />
                        </div>

                        {/* Calidades PEP */}
                        <div>
                          <h5 className="text-sm font-semibold text-gray-700 mb-3">Calidad de PEP</h5>
                          <div className="space-y-3">
                            <Controller
                              name={`pepsRelacionados.${index}.calidadPEP`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => onChange(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                  />
                                  <span className="text-sm text-gray-700 font-medium">
                                    ¿Calidad de Persona Políticamente Expuesta?
                                  </span>
                                </label>
                              )}
                            />

                            <Controller
                              name={`pepsRelacionados.${index}.calidadPEPExtranjera`}
                              control={control}
                              render={({ field: { onChange, value } }) => (
                                <label className="flex items-center gap-2 cursor-pointer">
                                  <input
                                    type="checkbox"
                                    checked={value}
                                    onChange={e => onChange(e.target.checked)}
                                    className="w-5 h-5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                                  />
                                  <span className="text-sm text-gray-700 font-medium">
                                    ¿Calidad de Persona Políticamente Expuesta Extranjera?
                                  </span>
                                </label>
                              )}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>
    )
  }
)

PEP.displayName = 'PEP'

export default PEP