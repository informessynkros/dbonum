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