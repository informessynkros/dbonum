import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  usoMovimientosPMSchema,
  usoMovimientosPMDefaultValues,
  chequeraEmptyItem,
  pepEmptyItem,
  type UsoMovimientosPMFormData,
  type ChequeraData,
  type PEPData
} from '@/schemas/personaMoralSchema'
import { DollarSign, CreditCard, Shield } from 'lucide-react'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import SelectMultiple from '@/components/iu/select/SelectMultiple'
import Checkbox from '@/components/iu/input/Checkbox'
import ConditionalSection from '@/components/forms/shared/ConditionalSection'
import DynamicList from '@/components/forms/shared/DynamicList'
import {
  USOS_CUENTA,
  NUMERO_MOVIMIENTOS,
  VALIDACION_TIPO,
  RANGOS_MONTO,
  RANGOS_PORCENTAJE
} from '@/data/mockCatalogos'
import { forwardRef, useImperativeHandle } from 'react'


interface UsoMovimientosProps {
  onNext: (data: UsoMovimientosPMFormData) => void
  initialData?: Partial<UsoMovimientosPMFormData>
}

export interface UsoMovimientosHandle {
  submit: () => Promise<boolean>
}

const UsoMovimientos = forwardRef<UsoMovimientosHandle, UsoMovimientosProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      watch,
      trigger
    } = useForm<UsoMovimientosPMFormData>({
      resolver: zodResolver(usoMovimientosPMSchema),
      defaultValues: initialData || usoMovimientosPMDefaultValues,
    })

    const validadoPor = watch('validado_por')
    const tienePepCargo = watch('tiene_pep_cargo_actual')
    const tienePepRelacionado = watch('tiene_pep_relacionado')

    const onSubmit = (data: UsoMovimientosPMFormData) => {
      console.log('Uso y Movimientos:', data)
      onNext(data)
    }

    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        if (isValid) { handleSubmit(onSubmit)(); return true }
        return false
      }
    }))

    const renderChequera = (item: ChequeraData, idx: number, update: (i: number, d: ChequeraData) => void) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={item.cuenta}
          onChange={e => update(idx, {...item, cuenta: e.target.value})}
          placeholder="Cuenta *"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          value={item.institucion}
          onChange={e => update(idx, {...item, institucion: e.target.value})}
          placeholder="Institución *"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          value={item.titular}
          onChange={e => update(idx, {...item, titular: e.target.value})}
          placeholder="Titular *"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    )

    const renderPEP = (item: PEPData, idx: number, update: (i: number, d: PEPData) => void) => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          value={item.nombre_completo}
          onChange={e => update(idx, {...item, nombre_completo: e.target.value})}
          placeholder="Nombre completo *"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          value={item.cargo_empresa}
          onChange={e => update(idx, {...item, cargo_empresa: e.target.value})}
          placeholder="Cargo en empresa *"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          value={item.nombre_institucion_publica}
          onChange={e => update(idx, {...item, nombre_institucion_publica: e.target.value})}
          placeholder="Institución pública *"
          className="w-full px-4 py-2 border rounded-lg"
        />
        <input
          value={item.cargo_publico}
          onChange={e => update(idx, {...item, cargo_publico: e.target.value})}
          placeholder="Cargo público *"
          className="w-full px-4 py-2 border rounded-lg"
        />
      </div>
    )

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          <div className="border-b pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Uso y Movimientos de Cuenta</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Controller 
              name="uso_cuenta"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={USOS_CUENTA}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Uso"
                  label="Uso de Cuenta" 
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )}
            />
            <Controller 
              name="monto_deposito_inicial"
              control={control}
              render={({ field: { onChange, value } }) => (
                <MessageToasty value={value?.toString()} onChange={(e) => onChange(Number(e.target.value))} label="Monto Depósito Inicial" type="number" icon={DollarSign} required />
              )}
            />
            <Controller 
              name="numero_depositos_mensuales"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={NUMERO_MOVIMIENTOS}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Selecciona"
                  label="Depósitos Mensuales"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )}
            />
            <Controller 
              name="numero_retiros_mensuales"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={NUMERO_MOVIMIENTOS}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Selecciona"
                  label="Retiros Mensuales"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )}
            />
            <Controller 
              name="validado_por"
              control={control}
              render={({ field: { onChange }, fieldState: { error } }) => (
                <SelectMultiple
                  options={VALIDACION_TIPO}
                  onSelect={s => s && 'id' in s && onChange(s.id)}
                  placeholder="Tipo"
                  label="Validado por"
                  labelKey="nombre"
                  valueKey="id"
                  multiple={false}
                  error={error?.message}
                  required
                />
              )}
            />
          </div>

          <ConditionalSection show={validadoPor === 'MONTO'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller 
                name="monto_promedio_depositos"
                control={control}
                render={({ field: { onChange } }) => (
                  <SelectMultiple
                    options={RANGOS_MONTO}
                    onSelect={s => s && 'id' in s && onChange(s.id)}
                    placeholder="Rango"
                    label="Monto Promedio Depósitos" 
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    />
                )}
              />
              <Controller 
                name= "monto_promedio_retiros"
                control={control}
                render={({ field: { onChange } }) => (
                  <SelectMultiple
                    options={RANGOS_MONTO}
                    onSelect={s => s && 'id' in s && onChange(s.id)}
                    placeholder="Rango"
                    label="Monto Promedio Retiros" 
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    />
                )}
              />
            </div>
            </ConditionalSection>

          <ConditionalSection show={validadoPor === 'PORCENTAJE'}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Controller 
                name="porcentaje_promedio_depositos"
                control={control}
                render={({ field: { onChange } }) => (
                  <SelectMultiple
                    options={RANGOS_PORCENTAJE}
                    onSelect={s => s && 'id' in s && onChange(s.id)}
                    placeholder="Rango"
                    label="% Promedio Depósitos"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    />
                )}
              />
              <Controller 
                name="porcentaje_promedio_retiros"
                control={control}
                render={({ field: { onChange } }) => (
                  <SelectMultiple
                    options={RANGOS_PORCENTAJE}
                    onSelect={s => s && 'id' in s && onChange(s.id)}
                    placeholder="Rango"
                    label="% Promedio Retiros"
                    labelKey="nombre"
                    valueKey="id"
                    multiple={false}
                    />
                )}
              />
            </div>
          </ConditionalSection>

          <div className="border-t pt-4">
            <h3 className="font-semibold mb-3">Opciones Adicionales</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Controller 
                name="liq_vs_saldo"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    label="Liq. vs Saldo"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller 
                name="maneja_custodia"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    label="¿Maneja custodia?"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
              <Controller 
                name="corto_efectivo"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    label="¿Corto efectivo?"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><CreditCard className="w-5 h-5" />Chequeras</h3>
            <Controller 
              name="chequeras"
              control={control}
              render={({ field }) => (
                <DynamicList
                  items={field.value || []}
                  onChange={field.onChange}
                  emptyItem={chequeraEmptyItem}
                  addButtonText="Agregar chequera"
                  minItems={0}
                  maxItems={10}
                  renderItem={renderChequera}
                />
              )}
            />
          </div>

          <div className="border-t pt-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2"><Shield className="w-5 h-5" />PEP (Persona Políticamente Expuesta)</h3>
            <Controller 
              name="tiene_pep_cargo_actual"
              control={control}
              render={({ field: { value, onChange } }) => (
                <Checkbox
                  label="¿Algún socio/accionista/directivo desempeña cargo público?"
                  checked={value}
                  onChange={onChange}
                />
              )}
            />
            <ConditionalSection show={tienePepCargo}>
              <div className="mt-4">
                <Controller 
                  name="peps_cargo"
                  control={control}
                  render={({ field }) => (
                    <DynamicList
                      items={field.value || []}
                      onChange={field.onChange}
                      emptyItem={pepEmptyItem}
                      addButtonText="Agregar PEP"
                      minItems={0}
                      maxItems={10}
                      renderItem={renderPEP}
                    />
                  )}
                />
              </div>
            </ConditionalSection>

            <div className="mt-4">
              <Controller 
                name="tiene_pep_relacionado"
                control={control}
                render={({ field: { value, onChange } }) => (
                  <Checkbox
                    label="¿Alguno está relacionado con PEP?"
                    checked={value}
                    onChange={onChange}
                  />
                )}
              />
            </div>
            <ConditionalSection show={tienePepRelacionado}>
              <div className="mt-4">
                <Controller 
                  name="peps_relacionados"
                  control={control}
                  render={({ field }) => (
                    <DynamicList
                      items={field.value || []}
                      onChange={field.onChange}
                      emptyItem={pepEmptyItem}
                      addButtonText="Agregar PEP elacionado"
                      minItems={0}
                      maxItems={10}
                      renderItem={renderPEP}
                    />
                  )}
                />
              </div>
            </ConditionalSection>
          </div>
        </div>
      </form>
    )
  }
)

UsoMovimientos.displayName = 'UsoMovimientos'
export default UsoMovimientos