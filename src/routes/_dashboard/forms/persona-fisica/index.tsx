import { createFileRoute } from '@tanstack/react-router'
import { useWizard } from '@/hooks/useWizard'
import { useRef, useState } from 'react'
import DatosGenerales, { type DatosGeneralesHandle } from '@/components/forms/persona-fisica/steps/DatosGenerales'
import type { DatosGeneralesFormData } from '@/schemas/personaFisicaSchema'
import Stepper from '@/components/iu/wizard/Stepper'
import WizardNavigation from '@/components/iu/wizard/WizardNavigation'


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

  // Ref para el formulario del paso actual
  const datosGeneralesRef = useRef<DatosGeneralesHandle>(null)

  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState<{
    datosGenerales?: DatosGeneralesFormData
    // Aquí agregaremos los demás pasos después
  }>({})

  // Handler para cuando se completa Datos Generales
  const handleDatosGeneralesSubmit = (data: DatosGeneralesFormData) => {
    console.log('Datos Generales guardados:', data)
    setFormData(prev => ({ ...prev, datosGenerales: data }))
    goToNextStep()
  }

  // Handler final para guardar todo
  const handleSave = () => {
    console.log('💾 Guardando formulario completo:', formData)
    alert('Formulario guardado (esto iría al backend)')
  }

  // Handler para el botón "Siguiente"
  const handleNext = async () => {
    // Si estamos en paso 1, hacer submit del formulario
    if (currentStep === 1 && datosGeneralesRef.current) {
      const isValid = await datosGeneralesRef.current.submit()
      
      if (!isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en el formulario')
        // Opcional: mostrar un toast o mensaje
        return // No avanzar
      }
      // Si es válido, onNext() se encarga de llamar goToNextStep()
    } else {
      // En otros pasos, solo avanzar
      goToNextStep()
    }
  }

  // Renderizar el contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DatosGenerales 
            onNext={handleDatosGeneralesSubmit}
            initialData={formData.datosGenerales}
          />
        )
      case 2:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 2: Datos Fiscales</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
      case 3:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 3: Otros Datos</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
      case 4:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 4: Domicilio Residencial</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
      case 5:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 5: Actividad Económica</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
      case 6:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 6: Vínculos Patrimoniales</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
      case 7:
        return (
          <div className="bg-white rounded-2xl p-8 shadow-sm">
            <h3 className="text-xl font-bold text-dark mb-4">Paso 7: Beneficiarios</h3>
            <p className="text-gray-600">Contenido pendiente de implementar...</p>
          </div>
        )
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
      <div className="min-h-96">
        {renderStepContent()}
      </div>

      {/* Navegación */}
      <WizardNavigation
        currentStep={currentStep}
        totalSteps={steps.length}
        onPrevious={goToPreviousStep}
        onNext={handleNext}
        onSave={handleSave}
        isFirstStep={isFirstStep}
        isLastStep={isLastStep}
      />
    </div>
  )
}