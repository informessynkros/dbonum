import { z } from 'zod'


// Domicilio Schema (reutilizable)
const domicilioSchema = z.object({
  tipoVialidad: z.string().optional(),
  nombreVialidad: z.string().optional(),
  noExterior: z.string().optional(),
  noInterior: z.string().optional(),
  colonia: z.string().optional(),
  delegacionMunicipio: z.string().optional(),
  ciudad: z.string().optional(),
  estadoEntidad: z.string().min(1, 'Requerido'),
  codigoPostal: z.string().optional(),
  pais: z.string().min(1, 'Requerido'),
})

// Persona Física Schema (para Fideicomitente/Fideicomisario)
const personaFisicaSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  apellidoPaterno: z.string().min(1, 'Apellido paterno requerido'),
  apellidoMaterno: z.string().optional(),
  genero: z.enum(['masculino', 'femenino', 'otro']),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  paisNacimiento: z.string().min(1, 'País de nacimiento requerido'),
  entidadNacimiento: z.string().min(1, 'Entidad de nacimiento requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  ocupacion: z.string().min(1, 'Ocupación requerida'),
  correo: z.string().email('Email inválido'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  curp: z.string().min(1, 'CURP requerido'),
  paisCurp: z.string().optional(),
  rfc: z.string().min(1, 'RFC requerido'),
  paisRfc: z.string().optional(),
  domicilio: domicilioSchema,
})

// Persona Moral Schema (para Fideicomitente/Fideicomisario)
const personaMoralSchema = z.object({
  denominacion: z.string().min(1, 'Denominación requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  rfc: z.string().min(1, 'RFC requerido'),
  paisRfc: z.string().min(1, 'País que emitió RFC requerido'),
  fiel: z.string().optional(),
  actividadGiro: z.string().min(1, 'Actividad requerida'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  correo: z.string().email('Email inválido'),
  fechaConstitucion: z.string().min(1, 'Fecha de constitución requerida'),
  domicilio: domicilioSchema,
})

// Fideicomitente (puede ser PF o PM)
const fideicomitentSchema = z.discriminatedUnion('tipo', [
  z.object({
    tipo: z.literal('pf'),
    datos: personaFisicaSchema,
  }),
  z.object({
    tipo: z.literal('pm'),
    datos: personaMoralSchema,
  }),
])

// Delegado Fiduciario Schema
const delegadoFiduciarioSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  apellidoPaterno: z.string().min(1, 'Apellido paterno requerido'),
  apellidoMaterno: z.string().optional(),
  genero: z.enum(['masculino', 'femenino', 'otro']),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  paisNacimiento: z.string().min(1, 'País de nacimiento requerido'),
  entidadNacimiento: z.string().min(1, 'Entidad de nacimiento requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  ocupacion: z.string().min(1, 'Ocupación requerida'),
  correo: z.string().email('Email inválido'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  curp: z.string().min(1, 'CURP requerido'),
  paisCurp: z.string().optional(),
  rfc: z.string().min(1, 'RFC requerido'),
  paisRfc: z.string().optional(),
  tipoFirma: z.enum(['individual', 'mancomunada']),
  noEscritura: z.string().optional(),
  fechaEscritura: z.string().optional(),
  noNotaria: z.string().optional(),
  lugarNotaria: z.string().optional(),
  nombreNotario: z.string().optional(),
  folioMercantil: z.string().optional(),
  fechaInscripcionRPC: z.string().optional(),
  domicilio: domicilioSchema,
})

// Miembro Comité Técnico Schema
const miembroComiteSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  apellidoPaterno: z.string().min(1, 'Apellido paterno requerido'),
  apellidoMaterno: z.string().optional(),
  genero: z.enum(['masculino', 'femenino', 'otro']),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  paisNacimiento: z.string().min(1, 'País de nacimiento requerido'),
  entidadNacimiento: z.string().min(1, 'Entidad de nacimiento requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  ocupacion: z.string().min(1, 'Ocupación requerida'),
  correo: z.string().email('Email inválido'),
  telefono: z.string().min(1, 'Teléfono requerido'),
  curp: z.string().min(1, 'CURP requerido'),
  paisCurp: z.string().optional(),
  rfc: z.string().min(1, 'RFC requerido'),
  paisRfc: z.string().optional(),
  domicilio: domicilioSchema,
})

// Propietario Real Schema
const propietarioRealSchema = z.object({
  nombre: z.string().min(1, 'Nombre requerido'),
  apellidoPaterno: z.string().min(1, 'Apellido paterno requerido'),
  apellidoMaterno: z.string().optional(),
  genero: z.enum(['masculino', 'femenino', 'otro']),
  fechaNacimiento: z.string().min(1, 'Fecha de nacimiento requerida'),
  curp: z.string().min(1, 'CURP requerido'),
  paisNacimiento: z.string().min(1, 'País de nacimiento requerido'),
  entidadNacimiento: z.string().min(1, 'Entidad de nacimiento requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  calidadMigratoria: z.string().optional(),
  paisResidencia: z.string().min(1, 'País de residencia requerido'),
  regimenFiscal: z.string().optional(),
  rfc: z.string().min(1, 'RFC requerido'),
  fiel: z.string().optional(),
  ocupacion: z.string().min(1, 'Ocupación requerida'),
  telefonos: z.array(z.object({
    tipo: z.string(),
    numero: z.string(),
  })).min(1, 'Al menos un teléfono requerido'),
  correo: z.string().email('Email inválido'),
  domicilio: domicilioSchema,
})

// PEP Schema
const pepSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo requerido'),
  participacion: z.string().min(1, 'Participación requerida'),
  institucion: z.string().min(1, 'Institución requerida'),
  nivel: z.enum(['federal', 'estatal', 'local', 'internacional']),
  pais: z.string().min(1, 'País requerido'),
  cargo: z.string().min(1, 'Cargo requerido'),
  razonesExtranjero: z.string().optional(),
  pepNacional: z.boolean(),
  pepExtranjero: z.boolean(),
})

// PEP Relacionado Schema
const pepRelacionadoSchema = z.object({
  nombreCompleto: z.string().min(1, 'Nombre completo requerido'),
  participacion: z.string().min(1, 'Participación requerida'),
  relacion: z.enum([
    'conyuge',
    'concubino',
    'padre',
    'madre',
    'hijo',
    'hija',
    'hermano',
    'hermana',
    'abuelo',
    'abuela',
    'nieto',
    'nieta',
    'cunado',
    'cunada',
    'suegro',
    'suegra',
    'abuelosPoliticos',
    'yerno',
    'nuera',
  ]),
  institucion: z.string().min(1, 'Institución requerida'),
  nivel: z.enum(['federal', 'estatal', 'local', 'internacional']),
  pais: z.string().min(1, 'País requerido'),
  cargo: z.string().min(1, 'Cargo requerido'),
  razonesExtranjero: z.string().optional(),
  pepNacional: z.boolean(),
  pepExtranjero: z.boolean(),
})

// Cuenta Chequera Schema
const cuentaChequeraSchema = z.object({
  noCuenta: z.string().min(1, 'Número de cuenta requerido'),
  banco: z.string().min(1, 'Banco requerido'),
  saldoPromedio: z.string().min(1, 'Saldo promedio requerido'),
})

// ============================================
// SCHEMAS POR PASO
// ============================================

// Paso 1: Datos Generales
export const datosGeneralesSchema = z.object({
  contrato: z.string().optional(),
  denominacion: z.string().min(1, 'Denominación requerida'),
  nacionalidad: z.string().min(1, 'Nacionalidad requerida'),
  rfcFiduciaria: z.string().min(1, 'RFC Fiduciaria requerido'),
  fiel: z.string().optional(),
  exentoISR: z.boolean().optional(),
  exentoIVA: z.boolean().optional(),
  finalidad: z.string().min(1, 'Finalidad requerida'),
  actividadesVulnerables: z.boolean(),
  cualActividadVulnerable: z.string().optional(),
  lugarConstitucion: z.string().min(1, 'Lugar de constitución requerido'),
  fechaConstitucion: z.string().min(1, 'Fecha de constitución requerida'),
  denominacionInstitucion: z.string().min(1, 'Denominación de institución requerida'),
  patrimonioFideicomitido: z.string().min(1, 'Patrimonio fideicomitido requerido'),
  aportacionesFideicomitentes: z.string().min(1, 'Aportaciones requeridas'),
})

export type DatosGeneralesFormData = z.infer<typeof datosGeneralesSchema>

// Paso 2: Otros Datos
export const otrosDatosSchema = z.object({
  grupoFamilia: z.string().optional(),
  tipoInversionista: z.enum(['nacional', 'extranjero']),
  banquero: z.string().min(1, 'Banquero requerido'),
  fechaInicioOperaciones: z.string().min(1, 'Fecha de inicio requerida'),
  estatusCuenta: z.enum(['activa', 'inactiva', 'cancelada']),
  fechaTerminacion: z.string().optional(),
  exentoISR: z.boolean().optional(),
  exentoIVA: z.boolean().optional(),
  tipoServicio: z.enum(['asesoria', 'gestion', 'mixto', 'institucional']),
  gradoRiesgo: z.enum(['alto', 'medio', 'bajo']).optional(),
})

export type OtrosDatosFormData = z.infer<typeof otrosDatosSchema>

// Paso 3: Fideicomitentes
export const fideicomitentesSchema = z.object({
  fideicomitentes: z.array(fideicomitentSchema).min(1, 'Al menos un fideicomitente requerido'),
})

export type FideicomitentesFormData = z.infer<typeof fideicomitentesSchema>

// Paso 4: Fideicomisarios
export const fideicomisariosSchema = z.object({
  fideicomisarios: z.array(fideicomitentSchema).min(1, 'Al menos un fideicomisario requerido'),
})

export type FideicomisariosFormData = z.infer<typeof fideicomisariosSchema>

// Paso 5: Delegados Fiduciarios
export const delegadosFiduciariosSchema = z.object({
  delegadosFiduciarios: z.array(delegadoFiduciarioSchema).optional(),
})

export type DelegadosFiduciariosFormData = z.infer<typeof delegadosFiduciariosSchema>

// Paso 6: Comité Técnico
export const comiteTecnicoSchema = z.object({
  miembrosComite: z.array(miembroComiteSchema).optional(),
})

export type ComiteTecnicoFormData = z.infer<typeof comiteTecnicoSchema>

// Paso 7: Procedencia del Recurso
export const procedenciaRecursoSchema = z.object({
  procedenciaRecurso: z.object({
    aguinaldoUtilidades: z.boolean().optional(),
    ahorros: z.boolean().optional(),
    inversiones: z.boolean().optional(),
    patrimonio: z.boolean().optional(),
    donaciones: z.boolean().optional(),
    herenciaLegado: z.boolean().optional(),
    rifasSorteosPremios: z.boolean().optional(),
    sueldoFijo: z.boolean().optional(),
    comisiones: z.boolean().optional(),
    honorarios: z.boolean().optional(),
    derivadoActividadEconomica: z.boolean().optional(),
    ventaRentaInmuebles: z.boolean().optional(),
    ventaRentaBienesMuebles: z.boolean().optional(),
    gananciasNegocio: z.boolean().optional(),
    becaManutension: z.boolean().optional(),
    pensionesFondosAhorro: z.boolean().optional(),
    prestamos: z.boolean().optional(),
    bonosIncentivos: z.boolean().optional(),
    liquidacionFiniquito: z.boolean().optional(),
    otro: z.boolean().optional(),
    otroDescripcion: z.string().optional(),
  }),
  detalleRecurso: z.string().min(1, 'Detalle del recurso requerido'),
})

export type ProcedenciaRecursoFormData = z.infer<typeof procedenciaRecursoSchema>

// Paso 8: Propietario Real
export const propietarioRealSchemaF = z.object({
  existeOtroPropietario: z.boolean(),
  propietariosReales: z.array(propietarioRealSchema).optional(),
})

export type PropietarioRealFormData = z.infer<typeof propietarioRealSchemaF>

// Paso 9: Uso y Movimientos
export const usoMovimientosSchema = z.object({
  usoCuenta: z.enum(['gastosEmpresariales', 'gastosPersonales', 'inversion', 'otro']),
  montoDepositoInicial: z.string().min(1, 'Monto de depósito inicial requerido'),
  numeroDesviacionEstandar: z.string().optional(),
  numeroDepositosMensuales: z.enum(['hasta5', 'hasta10', 'hasta15']),
  numeroRetirosMensuales: z.enum(['hasta5', 'hasta10', 'hasta15']),
  validadoPor: z.enum(['monto', 'porcentaje']),
  // Campos condicionales según validadoPor
  montoPromedioDepositos: z.string().optional(),
  montoPromedioRetiros: z.string().optional(),
  porcentajePromedioDepositos: z.string().optional(),
  porcentajePromedioRetiros: z.string().optional(),
  liqVsSaldo: z.boolean().optional(),
  manejaCustodia: z.boolean().optional(),
  cortoEfectivo: z.boolean().optional(),
})

export type UsoMovimientosFormData = z.infer<typeof usoMovimientosSchema>

// Paso 10: Chequera
export const chequeraSchema = z.object({
  cuentas: z.array(cuentaChequeraSchema).optional(),
})

export type ChequeraFormData = z.infer<typeof chequeraSchema>

// Paso 11: PEP
export const pepSchemaF = z.object({
  tienePEPDirecto: z.boolean(),
  pepsDirectos: z.array(pepSchema).optional(),
  tienePEPRelacionado: z.boolean(),
  pepsRelacionados: z.array(pepRelacionadoSchema).optional(),
})

export type PEPFormDataF = z.infer<typeof pepSchemaF>

// Schema completo
export const fideicomisosSchema = z.object({
  datosGenerales: datosGeneralesSchema,
  otrosDatos: otrosDatosSchema,
  fideicomitentes: fideicomitentesSchema,
  fideicomisarios: fideicomisariosSchema,
  delegadosFiduciarios: delegadosFiduciariosSchema,
  comiteTecnico: comiteTecnicoSchema,
  procedenciaRecurso: procedenciaRecursoSchema,
  propietarioReal: propietarioRealSchema,
  usoMovimientosF: usoMovimientosSchema,
  chequera: chequeraSchema,
  pep: pepSchemaF,
})

export type FideicomisosFormData = z.infer<typeof fideicomisosSchema>