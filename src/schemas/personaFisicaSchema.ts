import { z } from 'zod'


// Schema para teléfonos
export const phoneSchema = z.object({
  tipo: z.string().min(1, 'Selecciona un tipo de teléfono'),
  numero: z.string()
    .min(10, 'El número debe tener al menos 10 dígitos')
    .regex(/^[0-9]+$/, 'Solo se permiten números')
})

// Schema para Datos Generales (Paso 1)
export const datosGeneralesSchema = z.object({
  // Datos personales
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .max(100, 'El nombre no puede exceder 100 caracteres')
    .refine(val => val.trim().length >= 2, {
      message: 'El nombre debe tener al menos 2 caracteres (sin contar espacios)'
    }),
  
  apellido_paterno: z.string()
    .min(1, 'El apellido paterno es requerido')
    .max(100, 'El apellido paterno no puede exceder 100 caracteres')
    .refine(val => val.trim().length >= 2, {
      message: 'El apellido paterno debe tener al menos 2 caracteres (sin contar espacios)'
    }),
  
  apellido_materno: z.string()
    .min(1, 'El apellido materno es requerido')
    .max(100, 'El apellido materno no puede exceder 100 caracteres')
    .refine(val => val.trim().length >= 2, {
      message: 'El apellido materno debe tener al menos 2 caracteres (sin contar espacios)'
    }),
  
  genero: z.string()
    .min(1, 'El género es requerido')
    .refine(val => ['M', 'F', 'O'].includes(val), {
      message: 'Selecciona un género válido'
    }),
  
  estado_civil: z.string()
    .min(1, 'El estado civil es requerido'),
  
  profesion: z.string()
    .min(1, 'La profesión es requerida')
    .max(100, 'La profesión no puede exceder 100 caracteres')
    .refine(val => val.trim().length >= 2, {
      message: 'La profesión debe tener al menos 2 caracteres'
    }),
  
  telefonos: z.array(phoneSchema)
    .min(1, 'Agrega al menos un teléfono')
    .refine((phones) => phones.every(phone => phone.numero.trim().length >= 10), {
      message: 'Todos los teléfonos deben tener al menos 10 dígitos'
    }),
  
  email: z.string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido')
    .max(100, 'El correo no puede exceder 100 caracteres'),
  
  fecha_nacimiento: z.string()
    .min(1, 'La fecha de nacimiento es requerida')
    .refine((date) => {
      const birthDate = new Date(date)
      const today = new Date()
      const age = today.getFullYear() - birthDate.getFullYear()
      return age >= 18 && age <= 120
    }, {
      message: 'Debes ser mayor de 18 años'
    }),
  
  pais_nacimiento: z.string()
    .min(1, 'El país de nacimiento es requerido'),
  
  entidad_federativa_nacimiento: z.string()
    .min(1, 'La entidad federativa de nacimiento es requerida'),
  
  nacionalidad: z.string()
    .min(1, 'La nacionalidad es requerida'),
  
  calidad_migratoria: z.string()
    .optional(),
  
  pais_residencia: z.string()
    .min(1, 'El país de residencia es requerido'),
  
  curp: z.string()
    .min(1, 'El CURP es requerido')
    .length(18, 'El CURP debe tener exactamente 18 caracteres')
    .regex(/^[A-Z]{4}[0-9]{6}[HM][A-Z]{5}[0-9A-Z][0-9]$/, 'CURP inválido'),
  
  pais_emitio_id: z.string()
    .optional(),
  
  actividad_economica: z.string()
    .min(1, 'La actividad económica es requerida')
})

// Type inference
export type DatosGeneralesFormData = z.infer<typeof datosGeneralesSchema>

// Valores por defecto
export const datosGeneralesDefaultValues: Partial<DatosGeneralesFormData> = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  genero: undefined,
  estado_civil: '',
  profesion: '',
  telefonos: [{ tipo: 'Móvil', numero: '' }],
  email: '',
  fecha_nacimiento: '',
  pais_nacimiento: '',
  entidad_federativa_nacimiento: '',
  nacionalidad: '',
  calidad_migratoria: '',
  pais_residencia: '',
  curp: '',
  pais_emitio_id: '',
  actividad_economica: ''
}


// Schema reutilizable para domicilios
export const addressSchema = z.object({
  tipo_vialidad: z.string()
    .min(1, 'El tipo de vialidad es requerido'),
  
  nombre_vialidad: z.string()
    .min(1, 'El nombre de la vialidad es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  numero_exterior: z.string()
    .optional(),
  
  numero_interior: z.string()
    .optional(),
  
  colonia: z.string()
    .min(1, 'La colonia es requerida')
    .max(100, 'La colonia no puede exceder 100 caracteres'),
  
  alcaldia_municipio: z.string()
    .min(1, 'La alcaldía/municipio es requerido')
    .max(100, 'No puede exceder 100 caracteres'),
  
  ciudad: z.string()
    .min(1, 'La ciudad es requerida')
    .max(100, 'La ciudad no puede exceder 100 caracteres'),
  
  estado: z.string()
    .min(1, 'El estado es requerido'),
  
  codigo_postal: z.string()
    .min(1, 'El código postal es requerido')
    .regex(/^[0-9]{5}$/, 'El código postal debe tener 5 dígitos'),
  
  pais: z.string()
    .min(1, 'El país es requerido')
})

// Type inference
export type AddressData = z.infer<typeof addressSchema>


// Schema para Datos Fiscales (Paso 2)
export const datosFiscalesSchema = z.object({
  regimen_fiscal: z.string()
    .min(1, 'El régimen fiscal es requerido'),
  
  rfc: z.string()
    .min(1, 'El RFC es requerido')
    .regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/, 'RFC inválido (formato: XAXX010101000)')
    .refine((val) => val.length === 12 || val.length === 13, {
      message: 'El RFC debe tener 12 o 13 caracteres'
    }),
  
  pais_emitio_id_fiscal: z.string()
    .optional(),
  
  fiel: z.string()
    .optional(),
  
  exento_isr: z.boolean(),
  
  exento_iva: z.boolean()
})

// Type inference
export type DatosFiscalesFormData = z.infer<typeof datosFiscalesSchema>

// Valores por defecto
export const datosFiscalesDefaultValues: Partial<DatosFiscalesFormData> = {
  regimen_fiscal: '',
  rfc: '',
  pais_emitio_id_fiscal: '',
  fiel: '',
  exento_isr: false,
  exento_iva: false
}


// Schema para Otros Datos (Paso 3)

export const otrosDatosSchema = z.object({
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
  
  tipo_servicio: z.string()
    .min(1, 'El tipo de servicio es requerido'),
  
  grado_riesgo: z.string()
    .optional() // Puede ser auto-calculado
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
export type OtrosDatosFormData = z.infer<typeof otrosDatosSchema>

// Valores por defecto
export const otrosDatosDefaultValues: OtrosDatosFormData = {
  grupo_familia: '',
  tipo_inversionista: '',
  banquero: '',
  fecha_inicio_operaciones: '',
  estatus_cuenta: '',
  fecha_terminacion: '',
  tipo_servicio: '',
  grado_riesgo: ''
}


// Schema para Domicilio Residencial (Paso 4)
// Reutilizamos el addressSchema
export const domicilioResidencialSchema = z.object({
  domicilio_residencial: addressSchema
})

// Type inference
export type DomicilioResidencialFormData = z.infer<typeof domicilioResidencialSchema>

// Valores por defecto
export const domicilioResidencialDefaultValues: DomicilioResidencialFormData = {
  domicilio_residencial: {
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


// Schema para Actividad Económica (Paso 5)
export const actividadEconomicaSchema = z.object({
  // Actividad principal (ya capturada en paso 1, pero necesitamos validar el detalle)
  actividad_economica_detalle: z.string()
    .min(1, 'Debes completar los detalles de tu actividad económica'),
  
  // Campos para EMPLEADO
  empresa_nombre: z.string().optional(),
  empresa_giro: z.string().optional(),
  puesto: z.string().optional(),
  antiguedad_anos: z.number().optional(),
  ingreso_mensual_empleado: z.number().optional(),
  
  // Campos para SIN_ACTIVIDAD
  fuente_ingresos: z.string().optional(),
  
  // Campos para PF_ACTIVIDADES_PROF
  nombre_comercial: z.string().optional(),
  actividad_giro: z.string().optional(),
  anos_actividad: z.number().optional(),
  ingreso_mensual_promedio: z.number().optional(),
  
  // Ingresos adicionales (para todos)
  tiene_ingresos_adicionales: z.boolean(),
  tipo_ingreso_adicional: z.string().optional(),
  monto_ingreso_adicional: z.number().optional(),
})
  // Validaciones condicionales
  .refine(data => {
    // Si tiene ingresos adicionales, debe especificar el tipo
    if (data.tiene_ingresos_adicionales && !data.tipo_ingreso_adicional) {
      return false
    }
    return true
  }, {
    message: 'Debes especificar el tipo de ingreso adicional',
    path: ['tipo_ingreso_adicional']
  })
  .refine(data => {
    // Si tiene ingresos adicionales, debe especificar el monto
    if (data.tiene_ingresos_adicionales && !data.monto_ingreso_adicional) {
      return false
    }
    return true
  }, {
    message: 'Debes especificar el monto del ingreso adicional',
    path: ['monto_ingreso_adicional']
  })

// Type inference
export type ActividadEconomicaFormData = z.infer<typeof actividadEconomicaSchema>

// Valores por defecto
export const actividadEconomicaDefaultValues: ActividadEconomicaFormData = {
  actividad_economica_detalle: '',
  empresa_nombre: '',
  empresa_giro: '',
  puesto: '',
  antiguedad_anos: undefined,
  ingreso_mensual_empleado: undefined,
  fuente_ingresos: '',
  nombre_comercial: '',
  actividad_giro: '',
  anos_actividad: undefined,
  ingreso_mensual_promedio: undefined,
  tiene_ingresos_adicionales: false,
  tipo_ingreso_adicional: '',
  monto_ingreso_adicional: undefined,
}


// Schema para un vínculo patrimonial individual
export const vinculoSchema = z.object({
  nombre_empresa: z.string()
    .min(1, 'El nombre de la empresa es requerido')
    .max(200, 'El nombre no puede exceder 200 caracteres'),
  
  rfc_empresa: z.string()
    .min(1, 'El RFC es requerido')
    .regex(/^[A-ZÑ&]{3,4}[0-9]{6}[A-Z0-9]{3}$/, 'RFC inválido')
    .refine((val) => val.length === 12 || val.length === 13, {
      message: 'El RFC debe tener 12 o 13 caracteres'
    }),
  
  giro_actividad: z.string()
    .min(1, 'El giro/actividad es requerido'),
  
  participacion_porcentaje: z.number()
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor a 100')
    .optional(),
  
  tipo_vinculo: z.string()
    .min(1, 'El tipo de vínculo es requerido')
})

// Schema para Vínculos Patrimoniales (Paso 6)
export const vinculosPatrimonialesSchema = z.object({
  tiene_vinculos: z.boolean(),
  
  vinculos: z.array(vinculoSchema)
    .optional()
})
  .refine(data => {
    // Si tiene vínculos, debe agregar al menos uno
    if (data.tiene_vinculos && (!data.vinculos || data.vinculos.length === 0)) {
      return false
    }
    return true
  }, {
    message: 'Debes agregar al menos un vínculo patrimonial',
    path: ['vinculos']
  })

// Type inference
export type VinculoData = z.infer<typeof vinculoSchema>
export type VinculosPatrimonialesFormData = z.infer<typeof vinculosPatrimonialesSchema>

// Valores por defecto
export const vinculosPatrimonialesDefaultValues: VinculosPatrimonialesFormData = {
  tiene_vinculos: false,
  vinculos: []
}

// Vínculo vacío para DynamicList
export const vinculoEmptyItem: VinculoData = {
  nombre_empresa: '',
  rfc_empresa: '',
  giro_actividad: '',
  participacion_porcentaje: undefined,
  tipo_vinculo: ''
}


// Beneficiario
// Schema para un beneficiario individual
export const beneficiarioSchema = z.object({
  nombre: z.string()
    .min(1, 'El nombre es requerido')
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre no puede exceder 100 caracteres'),
  
  apellido_paterno: z.string()
    .min(1, 'El apellido paterno es requerido')
    .min(2, 'El apellido paterno debe tener al menos 2 caracteres')
    .max(100, 'El apellido paterno no puede exceder 100 caracteres'),
  
  apellido_materno: z.string()
    .min(1, 'El apellido materno es requerido')
    .min(2, 'El apellido materno debe tener al menos 2 caracteres')
    .max(100, 'El apellido materno no puede exceder 100 caracteres'),
  
  fecha_nacimiento: z.string()
    .min(1, 'La fecha de nacimiento es requerida'),
  
  parentesco: z.string()
    .min(1, 'El parentesco es requerido'),
  
  porcentaje: z.number()
    .min(0, 'El porcentaje no puede ser negativo')
    .max(100, 'El porcentaje no puede ser mayor a 100'),
  
  telefono: z.string()
    .min(10, 'El teléfono debe tener al menos 10 dígitos')
    .regex(/^[0-9]+$/, 'Solo se permiten números'),
  
  email: z.string()
    .min(1, 'El correo electrónico es requerido')
    .email('Correo electrónico inválido')
})

// Schema para Beneficiarios (Paso 7)
export const beneficiariosSchema = z.object({
  beneficiarios: z.array(beneficiarioSchema)
    .min(1, 'Debes agregar al menos un beneficiario')
})
  .refine(data => {
    // Validar que la suma de porcentajes sea 100%
    const total = data.beneficiarios.reduce((sum, b) => sum + b.porcentaje, 0)
    return total === 100
  }, {
    message: 'La suma de los porcentajes debe ser exactamente 100%',
    path: ['beneficiarios']
  })

// Type inference
export type BeneficiarioData = z.infer<typeof beneficiarioSchema>
export type BeneficiariosFormData = z.infer<typeof beneficiariosSchema>

// Valores por defecto
export const beneficiariosDefaultValues: BeneficiariosFormData = {
  beneficiarios: [
    {
      nombre: '',
      apellido_paterno: '',
      apellido_materno: '',
      fecha_nacimiento: '',
      parentesco: '',
      porcentaje: 100,
      telefono: '',
      email: ''
    }
  ]
}

// Beneficiario vacío para DynamicList
export const beneficiarioEmptyItem: BeneficiarioData = {
  nombre: '',
  apellido_paterno: '',
  apellido_materno: '',
  fecha_nacimiento: '',
  parentesco: '',
  porcentaje: 0,
  telefono: '',
  email: ''
}