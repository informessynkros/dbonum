import TypeCard from '@/components/forms/TypeCard'
import { createFileRoute } from '@tanstack/react-router'
import { Building2, FileText, Info, Landmark, User } from 'lucide-react'

export const Route = createFileRoute('/_dashboard/forms/')({
  component: RouteComponent,
})

function RouteComponent() {
  const formTypes = [
    {
      title: 'Persona Física',
      description: 'Registro completo de clientes personas físicas con datos personales, fiscales y actividad económica.',
      icon: User,
      available: true,
      route: '/forms/persona-fisica'
    },
    {
      title: 'Persona Moral',
      description: 'Registro de empresas, sociedades y asociaciones civiles con estructura corporativa completa.',
      icon: Building2,
      available: true,
      route: '/forms/persona-moral'
    },
    {
      title: 'Fideicomiso',
      description: 'Registro de fideicomisos con datos del fideicomitente, fideicomisario y estructura fiduciaria.',
      icon: Landmark,
      available: false,
      route: '/forms/fideicomiso'
    },
    {
      title: 'Régimen Simplificado',
      description: 'Formulario simplificado para registros de menor complejidad y riesgo controlado.',
      icon: FileText,
      available: false,
      route: '/forms/regimen-simplificado'
    }
  ]

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Formularios de Registro
        </h1>
        <p className="text-gray-600">
          Selecciona el tipo de formulario que deseas completar
        </p>
      </div>

      {/* Grid de Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {formTypes.map((type, index) => (
          <TypeCard
            key={index}
            title={type.title}
            description={type.description}
            icon={type.icon}
            available={type.available}
            route={type.route}
          />
        ))}
      </div>

      {/* Info adicional */}
      <div className="mt-12 bg-primary-50 rounded-xl p-6 border border-primary-100">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary-600 rounded-lg flex items-center justify-center shrink-0">
            {/* <span className="text-white text-xl">ℹ️</span> */}
            <Info className='text-white h-7 w-7' />
          </div>
          <div>
            <h4 className="font-semibold text-dark mb-2">
              Información importante
            </h4>
            <p className="text-sm text-gray-600">
              Todos los campos marcados con asterisco (*) son obligatorios. 
              Asegúrate de tener a la mano tu documentación fiscal y de identificación 
              antes de comenzar el proceso.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
