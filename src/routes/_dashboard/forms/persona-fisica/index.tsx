import Stepper from '@/components/iu/wizard/Stepper'
import WizardNavigation from '@/components/iu/wizard/WizardNavigation'
import { useWizard } from '@/hooks/useWizard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_dashboard/forms/persona-fisica/')({
  component: RouteComponent,
})

function RouteComponent() {
  const wizardSteps = [
    { id: 1, label: 'Datos Generales' },
    { id: 2, label: 'Datos Fiscales' },
    { id: 3, label: 'Otros Datos' },
    { id: 4, label: 'Domicilio' },
    { id: 5, label: 'Actividad Económica' },
    { id: 6, label: 'Vínculos' },
    { id: 7, label: 'Beneficiarios' }
  ]

  const {
    currentStep,
    steps,
    goToNextStep,
    goToPreviousStep,
    isFirstStep,
    isLastStep
  } = useWizard(wizardSteps)

  const handleSave = () => {
    console.log('Guardando formulario completo...')
    // Aquí irá la lógica de guardado
  }

  // Renderizar el contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 1: Datos Generales</div>
      case 2:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 2: Datos Fiscales</div>
      case 3:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 3: Otros Datos</div>
      case 4:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 4: Domicilio</div>
      case 5:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 5: Actividad Económica</div>
      case 6:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 6: Vínculos</div>
      case 7:
        return <div className="bg-white rounded-2xl p-8 shadow-sm">Paso 7: Beneficiarios</div>
      default:
        return null
    }
  }

  return (
    <div className="max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Registro de Persona Física
        </h1>
        <p className="text-gray-600">
          Completa todos los pasos para registrar al cliente
        </p>
      </div>

      {/* Stepper */}
      <Stepper steps={steps} currentStep={currentStep} />

      {/* Contenido del paso actual */}
      {/* <div className="min-h-[400px] min-h-96"> */}
      <div className="min-h-96">
        {renderStepContent()}
      </div>

      {/* Navegación */}
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={goToPreviousStep}
        onNext={goToNextStep}
        onSave={handleSave}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  )
}
