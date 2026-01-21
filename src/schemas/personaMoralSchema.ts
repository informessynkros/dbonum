// schema de validación para Persona Moral
import { z } from 'zod'
import { addressSchema } from './personaFisicaSchema'


// Schema para Datos Generales (Paso 1)
export const datosGeneralesPMSchema = z.object({
  // Datos básicos de la empresa
  denominacion_razon_social: z.string()
    .min(1, 'La denominación o razón social es requerida')
    .max(200, 'La denominación no puede exceder 200 caracteres'),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida'),
  
  rfc: z.string()
    .min(1, 'El RFC es requerido')
    .regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/, 'RFC inválido (formato: ABC123456XYZ)')
    .refine((val) => val.length === 12 || val.length === 13, {
      message: 'El RFC debe tener 12 o 13 caracteres'
    }),
  
  pais_emitio_id_fiscal: z.string()
    .min(1, 'El país que emitió el ID fiscal es requerido'),
  
  fiel: z.string()
    .optional(),
  
  actividad_giro: z.string()
    .min(1, 'La actividad/giro es requerida'),
  
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[0-9]+$/, 'Solo se permiten números'),
  
  email: z.string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido'),
  
  fecha_constitucion: z.string()
    .min(1, 'La fecha de constitución es requerida')
    .refine((date) => {
      const constDate = new Date(date)
      const today = new Date()
      return constDate <= today
    }, {
      message: 'La fecha de constitución no puede ser futura'
    }),
  
  // Datos notariales
  numero_acta_constitutiva: z.string()
    .optional(),
  
  numero_notaria: z.string()
    .optional(),
  
  lugar_notaria: z.string()
    .optional(),
  
  nombre_notario: z.string()
    .optional(),
  
  folio_mercantil: z.string()
    .optional(),
  
  fecha_inscripcion_rpc: z.string()
    .optional()
})

// Type inference
export type DatosGeneralesPMFormData = z.infer<typeof datosGeneralesPMSchema>

// Valores por defecto
export const datosGeneralesPMDefaultValues: DatosGeneralesPMFormData = {
  denominacion_razon_social: '',
  nacionalidad: '',
  rfc: '',
  pais_emitio_id_fiscal: '',
  fiel: '',
  actividad_giro: '',
  telefono: '',
  email: '',
  fecha_constitucion: '',
  numero_acta_constitutiva: '',
  numero_notaria: '',
  lugar_notaria: '',
  nombre_notario: '',
  folio_mercantil: '',
  fecha_inscripcion_rpc: ''
}


// Schema para Domicilio Fiscal (Paso 2)
export const domicilioFiscalPMSchema = z.object({
  domicilio_fiscal: addressSchema
})

// Type inference
export type DomicilioFiscalPMFormData = z.infer<typeof domicilioFiscalPMSchema>

// Valores por defecto
export const domicilioFiscalPMDefaultValues: DomicilioFiscalPMFormData = {
  domicilio_fiscal: {
    tipo_vialidad: '',
    nombre_vialidad: '',
    numero_exterior: '',
    numero_interior: '',
    colonia: '',
    alcaldia_municipio: '',
    ciudad: '',
    estado: '',
    codigo_postal: '',
    pais: ''
  }
}


// Schema para Otros Datos (Paso 3)
export const otrosDatosPMSchema = z.object({
  grupo_familia: z.string()
    .optional(),
  
  tipo_inversionista: z.string()
    .min(1, 'El tipo de inversionista es requerido'),
  
  banquero: z.string()
    .min(1, 'El banquero es requerido')
    .max(100, 'El nombre del banquero no puede exceder 100 caracteres'),
  
  fecha_inicio_operaciones: z.string()
    .min(1, 'La fecha de inicio de operaciones es requerida'),
  
  estatus_cuenta: z.string()
    .min(1, 'El estatus de la cuenta es requerido'),
  
  fecha_terminacion: z.string()
    .optional(),
  
  exento_isr: z.boolean(),
  
  exento_iva: z.boolean(),
  
  tipo_servicio: z.string()
    .min(1, 'El tipo de servicio es requerido'),
  
  grado_riesgo: z.string()
    .optional()
})
  .refine(data => {
    // Si el estatus es CANCELADA, la fecha de terminación es obligatoria
    if (data.estatus_cuenta === 'CANCELADA' && !data.fecha_terminacion) {
      return false
    }
    return true
  }, {
    message: 'La fecha de terminación es requerida cuando el estatus es "Cancelada"',
    path: ['fecha_terminacion']
  })

// Type inference
export type OtrosDatosPMFormData = z.infer<typeof otrosDatosPMSchema>

// Valores por defecto
export const otrosDatosPMDefaultValues: OtrosDatosPMFormData = {
  grupo_familia: '',
  tipo_inversionista: '',
  banquero: '',
  fecha_inicio_operaciones: '',
  estatus_cuenta: '',
  fecha_terminacion: '',
  exento_isr: false,
  exento_iva: false,
  tipo_servicio: '',
  grado_riesgo: ''
}


// Schema para un directivo de estructura corporativa (Paso 4)
export const directivoSchema = z.object({
  nombre_completo: z.string()
    .min(1, 'El nombre completo es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  cargo: z.string()
    .min(1, 'El cargo es requerido')
    .max(100, 'El cargo no puede exceder 100 caracteres'),
  
  fecha_nacimiento: z.string()
    .optional(),
  
  nacionalidad: z.string()
    .optional()
})

// Schema para una empresa del grupo
export const empresaGrupoSchema = z.object({
  denominacion_razon_social: z.string()
    .min(1, 'La denominación es requerida')
    .max(200, 'La denominación no puede exceder 200 caracteres'),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida'),
  
  objeto_social: z.string()
    .min(1, 'El objeto social es requerido')
    .max(500, 'El objeto social no puede exceder 500 caracteres'),
  
  capital_social: z.number()
    .min(0, 'El capital social debe ser mayor o igual a 0'),
  
  domicilio: z.string()
    .min(1, 'El domicilio es requerido')
    .max(300, 'El domicilio no puede exceder 300 caracteres')
})

// Schema para conformación del capital social
export const conformacionCapitalSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  numero_titulos: z.number()
    .optional(),
  
  serie_titulos: z.string()
    .optional(),
  
  monto_capital_social: z.number()
    .min(0, 'El monto debe ser mayor o igual a 0'),
  
  porcentaje_capital_social: z.number()
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor a 100')
})

// Schema para Estructura Corporativa (Paso 4) - Persona Moral
export const estructuraCorporativaPMSchema = z.object({
  // Estructura Corporativa Interna
  directivos: z.array(directivoSchema)
    .min(1, 'Agrega al menos un directivo'),
  
  // Empresas del Grupo
  empresas_grupo: z.array(empresaGrupoSchema)
    .optional(),
  
  // Capital Social
  monto_capital_social: z.number()
    .min(0, 'El monto del capital social debe ser mayor o igual a 0'),
  
  tipo_titulos: z.string()
    .min(1, 'El tipo de títulos es requerido'),
  
  conformacion_capital: z.array(conformacionCapitalSchema)
    .min(1, 'Agrega al menos una persona en la conformación del capital')
})
  .refine(data => {
    // Validar que la suma de porcentajes sea 100%
    const total = data.conformacion_capital.reduce((sum, item) => sum + item.porcentaje_capital_social, 0)
    return total === 100
  }, {
    message: 'La suma de los porcentajes debe ser exactamente 100%',
    path: ['conformacion_capital']
  })

// Type inference
export type DirectivoData = z.infer<typeof directivoSchema>
export type EmpresaGrupoData = z.infer<typeof empresaGrupoSchema>
export type ConformacionCapitalData = z.infer<typeof conformacionCapitalSchema>
export type EstructuraCorporativaPMFormData = z.infer<typeof estructuraCorporativaPMSchema>

// Valores por defecto
export const estructuraCorporativaPMDefaultValues: EstructuraCorporativaPMFormData = {
  directivos: [
    {
      nombre_completo: '',
      cargo: '',
      fecha_nacimiento: '',
      nacionalidad: ''
    }
  ],
  empresas_grupo: [],
  monto_capital_social: 0,
  tipo_titulos: '',
  conformacion_capital: [
    {
      nombre: '',
      numero_titulos: undefined,
      serie_titulos: '',
      monto_capital_social: 0,
      porcentaje_capital_social: 100
    }
  ]
}

// Items vacíos para DynamicList
export const directivoEmptyItem: DirectivoData = {
  nombre_completo: '',
  cargo: '',
  fecha_nacimiento: '',
  nacionalidad: ''
}

export const empresaGrupoEmptyItem: EmpresaGrupoData = {
  denominacion_razon_social: '',
  nacionalidad: '',
  objeto_social: '',
  capital_social: 0,
  domicilio: ''
}

export const conformacionCapitalEmptyItem: ConformacionCapitalData = {
  nombre: '',
  numero_titulos: undefined,
  serie_titulos: '',
  monto_capital_social: 0,
  porcentaje_capital_social: 0
}


// Schema para Accionista Persona Física (Paso 5)
export const accionistaPersonaFisicaSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  apellido_paterno: z.string()
    .min(1, 'El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder 100 caracteres'),
  
  apellido_materno: z.string()
    .min(1, 'El apellido materno es requerido')
    .max(100, 'El apellido materno no puede exceder 100 caracteres'),
  
  genero: z.string()
    .optional(),
  
  fecha_nacimiento: z.string()
    .min(1, 'La fecha de nacimiento es requerida'),
  
  nacionalidad: z.string()
    .optional()
})

// Schema para Administrador (usado en PM accionista)
export const administradorSchema = z.object({
  nombre_completo: z.string()
    .min(1, 'El nombre completo es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  cargo: z.string()
    .min(1, 'El cargo es requerido')
    .max(100, 'El cargo no puede exceder 100 caracteres'),
  
  fecha_nacimiento: z.string()
    .optional(),
  
  nacionalidad: z.string()
    .optional()
})

// Schema para Accionista Persona Moral
export const accionistaPersonaMoralSchema = z.object({
  denominacion_razon_social: z.string()
    .min(1, 'La denominación es requerida')
    .max(200, 'La denominación no puede exceder 200 caracteres'),
  
  rfc: z.string()
    .min(1, 'El RFC es requerido')
    .regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/, 'RFC inválido')
    .refine((val) => val.length === 12 || val.length === 13, {
      message: 'El RFC debe tener 12 o 13 caracteres'
    }),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida'),
  
  telefono: z.string()
    .optional(),
  
  sector: z.string()
    .optional(),
  
  actividad_giro: z.string()
    .min(1, 'La actividad/giro es requerida'),
  
  conformacion_capital: z.array(conformacionCapitalSchema)
    .optional(),
  
  conformacion_administracion: z.array(administradorSchema)
    .optional()
})

// Schema para Socios/Accionistas (Paso 5) - Persona Moral
export const sociosAccionistasPMSchema = z.object({
  accionistas_pf: z.array(accionistaPersonaFisicaSchema)
    .optional(),
  
  accionistas_pm: z.array(accionistaPersonaMoralSchema)
    .optional()
})
  .refine((data) => {
    // Al menos debe haber un accionista (PF o PM)
    const totalAccionistas = (data.accionistas_pf?.length || 0) + (data.accionistas_pm?.length || 0)
    return totalAccionistas > 0
  }, {
    message: 'Debes agregar al menos un accionista (Persona Física o Persona Moral)',
    path: ['accionistas_pf']
  })

// Type inference
export type AccionistaPersonaFisicaData = z.infer<typeof accionistaPersonaFisicaSchema>
export type AccionistaPersonaMoralData = z.infer<typeof accionistaPersonaMoralSchema>
export type AdministradorData = z.infer<typeof administradorSchema>
export type SociosAccionistasPMFormData = z.infer<typeof sociosAccionistasPMSchema>

// Valores por defecto
export const sociosAccionistasPMDefaultValues: SociosAccionistasPMFormData = {
  accionistas_pf: [],
  accionistas_pm: []
}

// Items vacíos para DynamicList
export const accionistaPersonaFisicaEmptyItem: AccionistaPersonaFisicaData = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  genero: '',
  fecha_nacimiento: '',
  nacionalidad: ''
}

export const accionistaPersonaMoralEmptyItem: AccionistaPersonaMoralData = {
  denominacion_razon_social: '',
  rfc: '',
  nacionalidad: '',
  telefono: '',
  sector: '',
  actividad_giro: '',
  conformacion_capital: [],
  conformacion_administracion: []
}

export const administradorEmptyItem: AdministradorData = {
  nombre_completo: '',
  cargo: '',
  fecha_nacimiento: '',
  nacionalidad: ''
}


// Schema para un Representante/Apoderado
export const representanteSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  apellido_paterno: z.string()
    .min(1, 'El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder 100 caracteres'),
  
  apellido_materno: z.string()
    .min(1, 'El apellido materno es requerido')
    .max(100, 'El apellido materno no puede exceder 100 caracteres'),
  
  genero: z.string()
    .optional(),
  
  fecha_nacimiento: z.string()
    .optional(),
  
  curp: z.string()
    .optional(),
  
  pais_emitio_id: z.string()
    .optional(),
  
  pais_nacimiento: z.string()
    .optional(),
  
  entidad_federativa_nacimiento: z.string()
    .optional(),
  
  nacionalidad: z.string()
    .optional(),
  
  calidad_migratoria: z.string()
    .optional(),
  
  pais_residencia: z.string()
    .optional(),
  
  rfc: z.string()
    .optional(),
  
  pais_emitio_id_fiscal: z.string()
    .optional(),
  
  fiel: z.string()
    .optional(),
  
  tipo_firma: z.string()
    .optional(),
  
  numero_escritura: z.string()
    .optional(),
  
  fecha_escritura: z.string()
    .optional(),
  
  numero_notaria: z.string()
    .optional(),
  
  lugar_notaria: z.string()
    .optional(),
  
  nombre_notario: z.string()
    .optional(),
  
  folio_mercantil: z.string()
    .optional(),
  
  fecha_inscripcion_rpc: z.string()
    .optional()
})


// Schema para integrante de Consejo de Administración (Paso 6)
export const integranteConsejoSchema = z.object({
  nombre_completo: z.string()
    .min(1, 'El nombre completo es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  genero: z.string()
    .optional(),
  
  fecha_nacimiento: z.string()
    .min(1, 'La fecha de nacimiento es requerida'),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida'),
  
  cargo: z.string()
    .min(1, 'El cargo es requerido')
    .max(100, 'El cargo no puede exceder 100 caracteres')
})

// Schema para Administrador Único
export const administradorUnicoSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  apellido_paterno: z.string()
    .min(1, 'El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder 100 caracteres'),
  
  apellido_materno: z.string()
    .min(1, 'El apellido materno es requerido')
    .max(100, 'El apellido materno no puede exceder 100 caracteres'),
  
  genero: z.string()
    .optional(),
  
  fecha_nacimiento: z.string()
    .min(1, 'La fecha de nacimiento es requerida'),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida')
})

// Schema para Representantes y Administración (Paso 6)
export const representantesAdminPMSchema = z.object({
  // Representantes/Apoderados
  representantes: z.array(representanteSchema)
    .min(1, 'Agrega al menos un representante o apoderado'),
  
  // Administración
  forma_administracion: z.string()
    .min(1, 'La forma de administración es requerida'),
  
  // Consejo de Administración
  nombre_organo_colegiado: z.string()
    .optional(),
  
  integrantes_consejo: z.array(integranteConsejoSchema)
    .optional(),
  
  // Administrador Único
  administrador_unico: administradorUnicoSchema
    .optional()
})
  .refine((data) => {
    // Si forma = CONSEJO, debe tener integrantes
    if (data.forma_administracion === 'CONSEJO' && (!data.integrantes_consejo || data.integrantes_consejo.length === 0)) {
      return false
    }
    return true
  }, {
    message: 'Debes agregar al menos un integrante del consejo',
    path: ['integrantes_consejo']
  })
  .refine((data) => {
    // Si forma = ADMINISTRADOR_UNICO, debe tener administrador
    if (data.forma_administracion === 'ADMINISTRADOR_UNICO' && !data.administrador_unico) {
      return false
    }
    return true
  }, {
    message: 'Debes completar los datos del administrador único',
    path: ['administrador_unico']
  })

// Type inference
export type RepresentanteData = z.infer<typeof representanteSchema>
export type IntegranteConsejoData = z.infer<typeof integranteConsejoSchema>
export type AdministradorUnicoData = z.infer<typeof administradorUnicoSchema>
export type RepresentantesAdminPMFormData = z.infer<typeof representantesAdminPMSchema>

// Valores por defecto
export const representantesAdminPMDefaultValues: RepresentantesAdminPMFormData = {
  representantes: [
    {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      genero: '',
      fecha_nacimiento: '',
      curp: '',
      pais_emitio_id: '',
      pais_nacimiento: '',
      entidad_federativa_nacimiento: '',
      nacionalidad: '',
      calidad_migratoria: '',
      pais_residencia: '',
      rfc: '',
      pais_emitio_id_fiscal: '',
      fiel: '',
      tipo_firma: '',
      numero_escritura: '',
      fecha_escritura: '',
      numero_notaria: '',
      lugar_notaria: '',
      nombre_notario: '',
      folio_mercantil: '',
      fecha_inscripcion_rpc: ''
    }
  ],
  forma_administracion: '',
  nombre_organo_colegiado: '',
  integrantes_consejo: [],
  administrador_unico: undefined
}

// Items vacíos
export const representanteEmptyItem: RepresentanteData = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  genero: '',
  fecha_nacimiento: '',
  curp: '',
  pais_emitio_id: '',
  pais_nacimiento: '',
  entidad_federativa_nacimiento: '',
  nacionalidad: '',
  calidad_migratoria: '',
  pais_residencia: '',
  rfc: '',
  pais_emitio_id_fiscal: '',
  fiel: '',
  tipo_firma: '',
  numero_escritura: '',
  fecha_escritura: '',
  numero_notaria: '',
  lugar_notaria: '',
  nombre_notario: '',
  folio_mercantil: '',
  fecha_inscripcion_rpc: ''
}

export const integranteConsejoEmptyItem: IntegranteConsejoData = {
  nombre_completo: '',
  genero: '',
  fecha_nacimiento: '',
  nacionalidad: '',
  cargo: ''
}
