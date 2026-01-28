import { z } from 'zod'

// ============================================
// CATÁLOGOS Y ENUMS
// ============================================

export const TipoVialidadEnum = z.enum([
  'Andador',
  'Autopista',
  'Avenida',
  'Boulevard',
  'Calle',
  'Callejón',
  'Calzada',
  'Camino',
  'Carretera',
  'Cerrada',
  'Pasaje',
  'Privada',
])

export const GeneroEnum = z.enum(['Masculino', 'Femenino', 'Otro'])

export const TipoFirmaEnum = z.enum(['Individual', 'Mancomunada'])

export const TipoInversionistaEnum = z.enum([
  'R. Simplificado Nacional',
  'R. Simplificado Extranjero',
])

export const EstatusCuentaEnum = z.enum(['Activa', 'Inactiva', 'Cancelada'])

export const TipoServicioEnum = z.enum([
  'Asesoría',
  'Gestión',
  'Mixto',
  'Institucional',
])

export const GradoRiesgoEnum = z.enum(['Bajo', 'Medio', 'Alto'])

export const UsoCuentaEnum = z.enum([
  'Gastos empresariales',
  'Gastos personales',
  'Inversión',
  'Otro',
])

export const NumeroMovimientosEnum = z.enum([
  'Hasta 5 movimientos',
  'Hasta 10 movimientos',
  'Hasta 15 movimientos',
])

export const ValidacionPorEnum = z.enum(['Porcentaje', 'Monto'])

// Montos - Definir cuáles usar según documento
export const MontoPromedioEnum = z.enum([
  'Hasta 100,000',
  'Hasta 500,000',
  'Hasta 1,000,000',
  'Hasta 5,000,000',
])

export const PorcentajePromedioEnum = z.enum([
  'Hasta el 10%',
  'Hasta el 20%',
  'Hasta el 30%',
])

export const NivelCargoEnum = z.enum([
  'Federal',
  'Estatal',
  'Local',
  'Internacional',
])

export const RelacionPEPEnum = z.enum([
  'Cónyuge',
  'Concubina/Concubinario',
  'Madre/Padre',
  'Hijo(a)',
  'Hermano(a)',
  'Abuela(o)',
  'Nieto(a)',
  'Cuñado(a)',
  'Suegro(a)',
  'Abuelos Políticos',
  'Yerno',
  'Nuera',
])

// ============================================
// STEP 1: DATOS GENERALES
// ============================================

export const domicilioSchema = z.object({
  tipoVialidad: TipoVialidadEnum.optional(),
  nombreVialidad: z.string().min(1, 'Nombre de vialidad requerido').optional(),
  noExterior: z.string().optional(),
  noInterior: z.string().optional(),
  colonia: z.string().min(1, 'Colonia requerida').optional(),
  delegacionMunicipio: z.string().min(1, 'Delegación/Municipio requerido').optional(),
  ciudad: z.string().min(1, 'Ciudad requerida').optional(),
  estadoEntidad: z.string().min(1, 'Estado/Entidad Federativa requerido'),
  codigoPostal: z.string()
    .regex(/^\d{5}$/, 'Código postal debe tener 5 dígitos')
    .optional(),
  pais: z.string().min(1, 'País requerido'),
})

export const datosGeneralesSchema = z.object({
  contrato: z.string().optional(),
  denominacionRazonSocial: z.string().min(1, 'Denominación o razón social requerida'),
  actividadObjetoSocial: z.string().min(1, 'Actividad/Objeto social requerido'),
  rfcEquivalente: z.string()
    .min(12, 'RFC debe tener al menos 12 caracteres')
    .max(13, 'RFC debe tener máximo 13 caracteres'),
  paisEmiteIdFiscal: z.string().min(1, 'País que emitió ID fiscal requerido'),
  fiel: z.string().optional(),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  telefono: z.string()
    .min(10, 'Teléfono debe tener al menos 10 dígitos')
    .regex(/^\d+$/, 'Solo números permitidos'),
  correoElectronico: z.string()
    .email('Correo electrónico inválido'),
  domicilio: domicilioSchema,
})

// ============================================
// STEP 2: APODERADO O REPRESENTANTE LEGAL
// ============================================

export const apoderadoSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo requerido'),
  genero: GeneroEnum.optional(),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  tipoFirma: TipoFirmaEnum.optional(),
  noEscritura: z.string().optional(),
  fechaEscritura: z.string().optional(),
  noNotaria: z.string().optional(),
  lugarNotaria: z.string().optional(),
  nombreNotario: z.string().optional(),
  folioMercantil: z.string().optional(),
  fechaInscripcionRPC: z.string().optional(),
})

export const apoderadosSchema = z.object({
  apoderados: z.array(apoderadoSchema).min(1, 'Debe agregar al menos un apoderado'),
})

// ============================================
// STEP 3: OTROS DATOS
// ============================================

export const otrosDatosSchema = z.object({
  grupoFamilia: z.string().optional(),
  tipoInversionista: TipoInversionistaEnum,
  banquero: z.string().min(1, 'Banquero requerido'),
  fechaInicioOperaciones: z.string().min(1, 'Fecha de inicio de operaciones requerida'),
  estatusCuenta: EstatusCuentaEnum,
  fechaTerminacion: z.string().optional(),
  exentoISR: z.boolean(),
  exentoIVA: z.boolean(),
  tipoServicio: TipoServicioEnum,
  gradoRiesgo: GradoRiesgoEnum,
}).refine(
  data => {
    // Si estatus es "Cancelada", fecha terminación es requerida
    if (data.estatusCuenta === 'Cancelada') {
      return !!data.fechaTerminacion && data.fechaTerminacion.length > 0
    }
    return true
  },
  {
    message: 'Fecha de terminación requerida cuando el estatus es Cancelada',
    path: ['fechaTerminacion'],
  }
)

// ============================================
// STEP 4: USO Y MOVIMIENTOS DE LA CUENTA
// ============================================

export const movimientosPorMontoSchema = z.object({
  montoPromedioDepositos: MontoPromedioEnum,
  montoPromedioRetiros: MontoPromedioEnum,
})

export const movimientosPorPorcentajeSchema = z.object({
  porcentajePromedioDepositos: PorcentajePromedioEnum,
  porcentajePromedioRetiros: PorcentajePromedioEnum,
})

export const usoMovimientosSchema = z.object({
  usoCuenta: UsoCuentaEnum,
  montoDepositoInicial: z.number()
    .positive('Monto debe ser positivo')
    .min(1, 'Monto de depósito inicial requerido'),
  numeroDesviacionEstandar: z.number().optional(),
  numeroDepositosMensuales: NumeroMovimientosEnum,
  numeroRetirosMensuales: NumeroMovimientosEnum,
  validadoPor: ValidacionPorEnum,
  // Campos condicionales según validadoPor
  movimientosMonto: movimientosPorMontoSchema.optional(),
  movimientosPorcentaje: movimientosPorPorcentajeSchema.optional(),
  liqVsSaldo: z.boolean(),
  manejaCustodia: z.boolean(),
  cortoEfectivo: z.boolean(),
}).refine(
  data => {
    // Si validadoPor es "Monto", movimientosMonto es requerido
    if (data.validadoPor === 'Monto') {
      return !!data.movimientosMonto
    }
    return true
  },
  {
    message: 'Datos de monto requeridos cuando validación es por Monto',
    path: ['movimientosMonto'],
  }
).refine(
  data => {
    // Si validadoPor es "Porcentaje", movimientosPorcentaje es requerido
    if (data.validadoPor === 'Porcentaje') {
      return !!data.movimientosPorcentaje
    }
    return true
  },
  {
    message: 'Datos de porcentaje requeridos cuando validación es por Porcentaje',
    path: ['movimientosPorcentaje'],
  }
)

// ============================================
// STEP 5: CHEQUERA
// ============================================

export const chequeraItemSchema = z.object({
  cuenta: z.string().min(1, 'Cuenta requerida'),
  clave: z.string().min(1, 'Clave requerida'),
  institucion: z.string().min(1, 'Institución requerida'),
  titular: z.string().min(1, 'Titular requerido'),
  broker: z.string().optional(),
})

export const chequeraSchema = z.object({
  chequeras: z.array(chequeraItemSchema),
})

// ============================================
// STEP 6: PEP (PERSONAS POLÍTICAMENTE EXPUESTAS)
// ============================================

// PEP Directo
export const pepDirectoSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo requerido'),
  cargoEmpresa: z.string().min(1, 'Cargo en la empresa requerido'),
  nombreInstitucionPublica: z.string().min(1, 'Nombre de institución pública requerido'),
  nivel: NivelCargoEnum,
  paisCargoPublico: z.string().min(1, 'País donde desempeña cargo requerido'),
  cargoPublico: z.string().min(1, 'Cargo público requerido'),
  razonesOperacionesMexico: z.string().optional(),
  calidadPEPNacional: z.boolean(),
  calidadPEPExtranjera: z.boolean(),
})

// PEP Relacionado
export const pepRelacionadoSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo requerido'),
  cargoEmpresa: z.string().min(1, 'Cargo en la empresa requerido'),
  relacion: RelacionPEPEnum,
  nombreInstitucionPublica: z.string().min(1, 'Nombre de institución pública requerido'),
  nivel: NivelCargoEnum,
  paisCargoPublico: z.string().min(1, 'País donde desempeña cargo requerido'),
  cargoPublico: z.string().min(1, 'Cargo público requerido'),
  razonesOperacionesMexico: z.string().optional(),
  calidadPEP: z.boolean(),
  calidadPEPExtranjera: z.boolean(),
})

export const pepSchema = z.object({
  tieneCargoPublico: z.boolean(),
  pepsDirectos: z.array(pepDirectoSchema),
  tieneRelacionConPEP: z.boolean(),
  pepsRelacionados: z.array(pepRelacionadoSchema),
}).refine(
  data => {
    // Si tieneCargoPublico es true, debe haber al menos un PEP directo
    if (data.tieneCargoPublico) {
      return data.pepsDirectos.length > 0
    }
    return true
  },
  {
    message: 'Debe agregar al menos una persona con cargo público',
    path: ['pepsDirectos'],
  }
).refine(
  data => {
    // Si tieneRelacionConPEP es true, debe haber al menos un PEP relacionado
    if (data.tieneRelacionConPEP) {
      return data.pepsRelacionados.length > 0
    }
    return true
  },
  {
    message: 'Debe agregar al menos una persona relacionada con PEP',
    path: ['pepsRelacionados'],
  }
)

// ============================================
// SCHEMA COMPLETO - RÉGIMEN SIMPLIFICADO
// ============================================

export const regimenSimplificadoSchema = z.object({
  // Step 1
  datosGenerales: datosGeneralesSchema,
  // Step 2
  apoderados: apoderadosSchema,
  // Step 3
  otrosDatos: otrosDatosSchema,
  // Step 4
  usoMovimientos: usoMovimientosSchema,
  // Step 5
  chequera: chequeraSchema,
  // Step 6
  pep: pepSchema,
})

// ============================================
// TIPOS TYPESCRIPT INFERIDOS
// ============================================

export type RegimenSimplificadoFormData = z.infer<typeof regimenSimplificadoSchema>
export type DatosGeneralesData = z.infer<typeof datosGeneralesSchema>
export type DomicilioData = z.infer<typeof domicilioSchema>
export type ApoderadoData = z.infer<typeof apoderadoSchema>
export type OtrosDatosData = z.infer<typeof otrosDatosSchema>
export type UsoMovimientosData = z.infer<typeof usoMovimientosSchema>
export type MovimientosPorMontoData = z.infer<typeof movimientosPorMontoSchema>
export type MovimientosPorPorcentajeData = z.infer<typeof movimientosPorPorcentajeSchema>
export type ChequeraItemData = z.infer<typeof chequeraItemSchema>
export type PEPDirectoData = z.infer<typeof pepDirectoSchema>
export type PEPRelacionadoData = z.infer<typeof pepRelacionadoSchema>
export type PEPData = z.infer<typeof pepSchema>

// ============================================
// VALORES POR DEFECTO
// ============================================

export const regimenSimplificadoDefaultValues: Partial<RegimenSimplificadoFormData> = {
  datosGenerales: {
    denominacionRazonSocial: '',
    actividadObjetoSocial: '',
    rfcEquivalente: '',
    paisEmiteIdFiscal: '',
    nacionalidad: '',
    telefono: '',
    correoElectronico: '',
    domicilio: {
      estadoEntidad: '',
      pais: '',
    },
  },
  apoderados: {
    apoderados: [],
  },
  otrosDatos: {
    tipoInversionista: 'R. Simplificado Nacional',
    banquero: '',
    fechaInicioOperaciones: '',
    estatusCuenta: 'Activa',
    exentoISR: false,
    exentoIVA: false,
    tipoServicio: 'Asesoría',
    gradoRiesgo: 'Bajo',
  },
  usoMovimientos: {
    usoCuenta: 'Gastos empresariales',
    montoDepositoInicial: 0,
    numeroDepositosMensuales: 'Hasta 5 movimientos',
    numeroRetirosMensuales: 'Hasta 5 movimientos',
    validadoPor: 'Monto',
    liqVsSaldo: false,
    manejaCustodia: false,
    cortoEfectivo: false,
  },
  chequera: {
    chequeras: [],
  },
  pep: {
    tieneCargoPublico: false,
    pepsDirectos: [],
    tieneRelacionConPEP: false,
    pepsRelacionados: [],
  },
}