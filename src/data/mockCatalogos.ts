// Mock data para catálogos COR

export const PAISES = [
  { id: 'MX', nombre: 'México' },
  { id: 'US', nombre: 'Estados Unidos' },
  { id: 'CA', nombre: 'Canadá' },
  { id: 'ES', nombre: 'España' },
  { id: 'CO', nombre: 'Colombia' },
  { id: 'AR', nombre: 'Argentina' },
  { id: 'BR', nombre: 'Brasil' },
  { id: 'CL', nombre: 'Chile' },
]

export const ESTADOS_MEXICO = [
  { id: 'AGS', nombre: 'Aguascalientes' },
  { id: 'BC', nombre: 'Baja California' },
  { id: 'BCS', nombre: 'Baja California Sur' },
  { id: 'CAMP', nombre: 'Campeche' },
  { id: 'CHIS', nombre: 'Chiapas' },
  { id: 'CHIH', nombre: 'Chihuahua' },
  { id: 'CDMX', nombre: 'Ciudad de México' },
  { id: 'COAH', nombre: 'Coahuila' },
  { id: 'COL', nombre: 'Colima' },
  { id: 'DGO', nombre: 'Durango' },
  { id: 'GTO', nombre: 'Guanajuato' },
  { id: 'GRO', nombre: 'Guerrero' },
  { id: 'HGO', nombre: 'Hidalgo' },
  { id: 'JAL', nombre: 'Jalisco' },
  { id: 'MEX', nombre: 'Estado de México' },
  { id: 'MICH', nombre: 'Michoacán' },
  { id: 'MOR', nombre: 'Morelos' },
  { id: 'NAY', nombre: 'Nayarit' },
  { id: 'NL', nombre: 'Nuevo León' },
  { id: 'OAX', nombre: 'Oaxaca' },
  { id: 'PUE', nombre: 'Puebla' },
  { id: 'QRO', nombre: 'Querétaro' },
  { id: 'QROO', nombre: 'Quintana Roo' },
  { id: 'SLP', nombre: 'San Luis Potosí' },
  { id: 'SIN', nombre: 'Sinaloa' },
  { id: 'SON', nombre: 'Sonora' },
  { id: 'TAB', nombre: 'Tabasco' },
  { id: 'TAMPS', nombre: 'Tamaulipas' },
  { id: 'TLAX', nombre: 'Tlaxcala' },
  { id: 'VER', nombre: 'Veracruz' },
  { id: 'YUC', nombre: 'Yucatán' },
  { id: 'ZAC', nombre: 'Zacatecas' },
]

export const GENEROS = [
  { value: 'M', label: 'Masculino' },
  { value: 'F', label: 'Femenino' },
  { value: 'O', label: 'Otro' },
]

export const ESTADOS_CIVILES = [
  { id: 'SOLTERO', nombre: 'Soltero' },
  { id: 'CASADO', nombre: 'Casado' },
  { id: 'CONCUBINATO', nombre: 'Concubinato' },
]

export const CALIDADES_MIGRATORIAS = [
  { id: 'NO_APLICA', nombre: 'No aplica' },
  { id: 'RESIDENTE_TEMPORAL', nombre: 'Residente temporal' },
  { id: 'RESIDENTE_PERMANENTE', nombre: 'Residente permanente' },
  { id: 'NATURALIZADO', nombre: 'Naturalizado' },
  { id: 'VISITANTE', nombre: 'Visitante' },
]

export const ACTIVIDADES_ECONOMICAS = [
  { id: 'EMPLEADO', nombre: 'Empleado' },
  { id: 'SIN_ACTIVIDAD', nombre: 'Sin Actividad Económica' },
  { id: 'PF_ACTIVIDADES_PROF', nombre: 'Persona Física con Actividades Profesionales' },
]

// Regímenes Fiscales del SAT (algunos ejemplos)
export const REGIMENES_FISCALES = [
  { id: '601', nombre: '601 - General de Ley Personas Morales' },
  { id: '603', nombre: '603 - Personas Morales con Fines no Lucrativos' },
  { id: '605', nombre: '605 - Sueldos y Salarios e Ingresos Asimilados a Salarios' },
  { id: '606', nombre: '606 - Arrendamiento' },
  { id: '607', nombre: '607 - Régimen de Enajenación o Adquisición de Bienes' },
  { id: '608', nombre: '608 - Demás ingresos' },
  { id: '610', nombre: '610 - Residentes en el Extranjero sin Establecimiento Permanente en México' },
  { id: '611', nombre: '611 - Ingresos por Dividendos (socios y accionistas)' },
  { id: '612', nombre: '612 - Personas Físicas con Actividades Empresariales y Profesionales' },
  { id: '614', nombre: '614 - Ingresos por intereses' },
  { id: '615', nombre: '615 - Régimen de los ingresos por obtención de premios' },
  { id: '616', nombre: '616 - Sin obligaciones fiscales' },
  { id: '620', nombre: '620 - Sociedades Cooperativas de Producción que optan por diferir sus ingresos' },
  { id: '621', nombre: '621 - Incorporación Fiscal' },
  { id: '622', nombre: '622 - Actividades Agrícolas, Ganaderas, Silvícolas y Pesqueras' },
  { id: '623', nombre: '623 - Opcional para Grupos de Sociedades' },
  { id: '624', nombre: '624 - Coordinados' },
  { id: '625', nombre: '625 - Régimen de las Actividades Empresariales con ingresos a través de Plataformas Tecnológicas' },
  { id: '626', nombre: '626 - Régimen Simplificado de Confianza' },
]


// Otros pasos (Paso 4)
// Tipos de inversionistas
export const TIPOS_INVERSIONISTA = [
  { id: 'PF_NACIONAL', nombre: 'Persona Física Nacional' },
  { id: 'PF_EXTRANJERA', nombre: 'Persona Física Extranjera' }
]

// Estatus de Cuenta
export const ESTATUS_CUENTA = [
  { id: 'ACTIVA', nombre: 'Activa' },
  { id: 'INACTIVA', nombre: 'Inactiva' },
  { id: 'CANCELADA', nombre: 'Cancelada' }
]

// Tipos de Servicio
export const TIPOS_SERVICIO = [
  { id: 'ASESORIA', nombre: 'Asesoria' },
  { id: 'GESTION', nombre: 'Gestión' },
  { id: 'MIXTO', nombre: 'Mixto' },
  { id: 'INSTITUCIONAL', nombre: 'Institucional' }
]

// Grados de Riesgo
export const GRADOS_RIESGO = [
  { id: 'BAJO', nombre: 'Bajo' },
  { id: 'MEDIO', nombre: 'Medio' },
  { id: 'ALTO', nombre: 'Alto' }
]


// Actividad Económica
// Giros/Sectores Económicos
export const GIROS_ECONOMICOS = [
  { id: 'AGRICULTURA', nombre: 'Agricultura, ganadería, silvicultura y pesca' },
  { id: 'MINERIA', nombre: 'Minería' },
  { id: 'CONSTRUCCION', nombre: 'Construcción' },
  { id: 'MANUFACTURA', nombre: 'Industrias manufactureras' },
  { id: 'COMERCIO', nombre: 'Comercio al por mayor y menor' },
  { id: 'TRANSPORTE', nombre: 'Transportes, correos y almacenamiento' },
  { id: 'ALOJAMIENTO', nombre: 'Servicios de alojamiento y alimentos' },
  { id: 'INFORMACION', nombre: 'Información en medios masivos' },
  { id: 'FINANCIERO', nombre: 'Servicios financieros y de seguros' },
  { id: 'INMOBILIARIO', nombre: 'Servicios inmobiliarios y de alquiler' },
  { id: 'PROFESIONAL', nombre: 'Servicios profesionales, científicos y técnicos' },
  { id: 'CORPORATIVO', nombre: 'Corporativos' },
  { id: 'APOYO', nombre: 'Servicios de apoyo a los negocios' },
  { id: 'EDUCACION', nombre: 'Servicios educativos' },
  { id: 'SALUD', nombre: 'Servicios de salud y asistencia social' },
  { id: 'ENTRETENIMIENTO', nombre: 'Servicios de esparcimiento, culturales y deportivos' },
  { id: 'OTROS', nombre: 'Otros servicios excepto actividades gubernamentales' },
]

// Fuentes de Ingreso (para Sin Actividad)
export const FUENTES_INGRESO = [
  { id: 'HERENCIA', nombre: 'Herencia' },
  { id: 'AHORRO', nombre: 'Ahorro' },
  { id: 'PENSION', nombre: 'Pensión' },
  { id: 'APOYO_FAMILIAR', nombre: 'Apoyo familiar' },
  { id: 'INVERSION', nombre: 'Inversiones' },
  { id: 'OTRO', nombre: 'Otro' },
]

// Tipos de Ingresos Adicionales
export const TIPOS_INGRESOS_ADICIONALES = [
  { id: 'ARRENDAMIENTO', nombre: 'Arrendamiento' },
  { id: 'INVERSIONES', nombre: 'Inversiones' },
  { id: 'DIVIDENDOS', nombre: 'Dividendos' },
  { id: 'INTERESES', nombre: 'Intereses' },
  { id: 'REGALIAS', nombre: 'Regalías' },
  { id: 'HONORARIOS', nombre: 'Honorarios esporádicos' },
  { id: 'OTRO', nombre: 'Otro' },
]


// Vinculos
// Tipos de Vínculos Patrimoniales
export const TIPOS_VINCULOS = [
  { id: 'ACCIONISTA', nombre: 'Accionista' },
  { id: 'SOCIO', nombre: 'Socio' },
  { id: 'PROPIETARIO', nombre: 'Propietario' },
  { id: 'ADMINISTRADOR', nombre: 'Administrador' },
  { id: 'DIRECTOR', nombre: 'Director' },
  { id: 'CONSEJERO', nombre: 'Consejero' },
  { id: 'APODERADO', nombre: 'Apoderado Legal' },
  { id: 'OTRO', nombre: 'Otro' },
]


// Beneficiarios
// Tipos de Parentesco
export const TIPOS_PARENTESCO = [
  { id: 'CONYUGE', nombre: 'Cónyuge' },
  { id: 'HIJO', nombre: 'Hijo/a' },
  { id: 'PADRE', nombre: 'Padre' },
  { id: 'MADRE', nombre: 'Madre' },
  { id: 'HERMANO', nombre: 'Hermano/a' },
  { id: 'NIETO', nombre: 'Nieto/a' },
  { id: 'ABUELO', nombre: 'Abuelo/a' },
  { id: 'TIO', nombre: 'Tío/a' },
  { id: 'SOBRINO', nombre: 'Sobrino/a' },
  { id: 'PRIMO', nombre: 'Primo/a' },
  { id: 'OTRO', nombre: 'Otro' },
]


// --- Personas morales

// Tipos de inversionistas para persona moral
export const TIPOS_INVERSIONISTA_PM = [
  { id: 'PM_NACIONAL', nombre: 'Persona Moral Nacional' },
  { id: 'PM_EXTRANJERA', nombre: 'Persona Moral Extranjea' }
]

// Tipos de Títulos para Capital Social
export const TIPOS_TITULOS = [
  { id: 'ACCIONES', nombre: 'Acciones' },
  { id: 'PARTES_SOCIALES', nombre: 'Partes Sociales' },
]

// Sectores Empresariales
export const SECTORES_EMPRESARIALES = [
  { id: 'SERVICIOS', nombre: 'Servicios' },
  { id: 'COMERCIO', nombre: 'Comercio' },
  { id: 'INDUSTRIA', nombre: 'Industria' },
  { id: 'AGROPECUARIO', nombre: 'Agropecuario' },
  { id: 'GOBIERNO', nombre: 'Gobierno' },
]

// Formas de Administración
export const FORMAS_ADMINISTRACION = [
  { id: 'CONSEJO', nombre: 'Consejo de Administración/Equivalente' },
  { id: 'ADMINISTRADOR_UNICO', nombre: 'Administrador Único' },
]

// Tipos de Firma
export const TIPOS_FIRMA = [
  { id: 'INDIVIDUAL', nombre: 'Individual' },
  { id: 'MANCOMUNADA', nombre: 'Mancomunada' },
]

// --- Uso y movimientos de la cuenta
export const USOS_CUENTA = [
  { id: 'GASTOS_EMPRESARIALES', nombre: 'Gastos empresariales' },
  { id: 'GASTOS_PERSONALES', nombre: 'Gastos personales' },
  { id: 'INVERSION', nombre: 'Inversión' },
  { id: 'OTRO', nombre: 'Otro' }
]

export const NUMERO_MOVIMIENTOS = [
  { id: 'HASTA_5', nombre: 'Hasta 5 movimientos' },
  { id: 'HASTA_10', nombre: 'Hasta 10 movimientos' },
  { id: 'HASTA_15', nombre: 'Hasta 15 movimientos' }
]

export const VALIDACION_TIPO = [
  { id: 'MONTO', nombre: 'Monto' },
  { id: 'PORCENTAJE', nombre: 'Porcentaje' }
]

export const RANGOS_MONTO = [
  { id: 'HASTA_250K', nombre: '$1.00 - $250,000.00 M.N.' },
  { id: 'HASTA_2M', nombre: '$250,001.00 - $2,000,000.00 M.N.' },
  { id: 'HASTA_5M', nombre: '$2,000,001.00 - $5,000,000.00 M.N.' },
  { id: 'MAS_5M', nombre: 'Más de $5,000,000.00 M.N.' }
]

export const RANGOS_PORCENTAJE = [
  { id: 'HASTA_10', nombre: 'Hasta el 10%' },
  { id: 'HASTA_20', nombre: 'Hasta el 20%' },
  { id: 'HASTA_30', nombre: 'Hasta el 30%' }
]

export const NIVELES_PEP = [
  { id: 'FEDERAL', nombre: 'Federal' },
  { id: 'ESTATAL', nombre: 'Estatal' },
  { id: 'LOCAL', nombre: 'Local' },
  { id: 'INTERNACIONAL', nombre: 'Internacional' }
]


// --- Procedencia de Recursos
export const PROCEDENCIA_RECURSOS = [
  { id: 'INVERSIONES', nombre: 'Inversiones' },
  { id: 'PATRIMONIO', nombre: 'Patrimonio' },
  { id: 'DONACIONES', nombre: 'Donaciones' },
  { id: 'RIFAS_SORTEOS', nombre: 'Rifas, sorteos o premios' },
  { id: 'OBJETO_SOCIAL', nombre: 'Realización del objeto social' },
  { id: 'PRESUPUESTO_PUBLICO', nombre: 'Presupuesto público' },
  { id: 'VENTA_ACTIVOS', nombre: 'Venta o renta de activos/bienes' },
  { id: 'PRESTAMOS', nombre: 'Préstamos' },
  { id: 'OTRO', nombre: 'Otro' }
]