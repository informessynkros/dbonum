import { createFileRoute } from '@tanstack/react-router'
import { useWizard } from '@/hooks/useWizard'
import { useRef, useState } from 'react'
import DatosGenerales, { type DatosGeneralesHandle } from '@/components/forms/persona-fisica/steps/DatosGenerales'
import type { ActividadEconomicaFormData, BeneficiariosFormData, DatosFiscalesFormData, DatosGeneralesFormData, DomicilioResidencialFormData, OtrosDatosFormData, VinculosPatrimonialesFormData } from '@/schemas/personaFisicaSchema'
import Stepper from '@/components/iu/wizard/Stepper'
import WizardNavigation from '@/components/iu/wizard/WizardNavigation'
import DatosFiscales, { type DatosFiscalesHandle } from '@/components/forms/persona-fisica/steps/DatosFiscales'
import OtrosDatos from '@/components/forms/persona-fisica/steps/OtrosDatos'
import DomicilioResidencial from '@/components/forms/persona-fisica/steps/DomicilioResidencial'
import type { ActividadEconomicaHandle } from '@/components/forms/persona-fisica/steps/ActividadEconomica'
import ActividadEconomica from '@/components/forms/persona-fisica/steps/ActividadEconomica'
import type { VinculosPatrimonialesHandle } from '@/components/forms/persona-fisica/steps/VinculosPatrimoniales'
import VinculosPatrimoniales from '@/components/forms/persona-fisica/steps/VinculosPatrimoniales'
import type { BeneficiariosHandle } from '@/components/forms/persona-fisica/steps/Beneficiarios'
import Beneficiarios from '@/components/forms/persona-fisica/steps/Beneficiarios'


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
  const datosFiscalesRef = useRef<DatosFiscalesHandle>(null)
  const otrosDatosRef = useRef<DatosFiscalesHandle>(null)
  const domicilioResidencialRef = useRef<DatosFiscalesHandle>(null)
  const actividadEconomicaRef = useRef<ActividadEconomicaHandle>(null)
  const vinculosPatrimonialesRef = useRef<VinculosPatrimonialesHandle>(null)
  const beneficiariosRef = useRef<BeneficiariosHandle>(null)

  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState<{
    datosGenerales?: DatosGeneralesFormData
    datosFiscales?: DatosFiscalesFormData
    otrosDatos?: OtrosDatosFormData
    domicilioResidencial?: DomicilioResidencialFormData
    actividadEconomica?: ActividadEconomicaFormData
    vinculosPatrimoniales?: VinculosPatrimonialesFormData
    beneficiarios?: BeneficiariosFormData
  }>({})

  // Handler para cuando se completa Datos Generales
  const handleDatosGeneralesSubmit = (data: DatosGeneralesFormData) => {
    console.log('Datos Generales guardados:', data)
    setFormData(prev => ({ ...prev, datosGenerales: data }))
    goToNextStep()
  }

  // Handler para cuando se completa Datos Fiscales
  const handleDatosFiscalesSubmit = (data: DatosFiscalesFormData) => {
    console.log('Datos Fiscales guardados:', data)
    setFormData(prev => ({ ...prev, datosFiscales: data }))
    goToNextStep()
  }

  const handleOtrosDatosSubmit = (data: OtrosDatosFormData) => {
    console.log('Otros Datos guardados:', data)
    setFormData(prev => ({ ...prev, otrosDatos: data }))
    goToNextStep()
  }

  const handleDomicilioResidencialSubmit = (data: DomicilioResidencialFormData) => {
    console.log('Domicilio Residencial guardado:', data)
    setFormData(prev => ({ ...prev, domicilioResidencial: data }))
    goToNextStep()
  }

  const handleActividadEconomicaSubmit = (data: ActividadEconomicaFormData) => {
    console.log('Actividad Económica guardada:', data)
    setFormData(prev => ({ ...prev, actividadEconomica: data }))
    goToNextStep()
  }

  const handleVinculosPatrimonialesSubmit = (data: VinculosPatrimonialesFormData) => {
    console.log('Vínculos Patrimoniales guardados:', data)
    setFormData(prev => ({ ...prev, vinculosPatrimoniales: data }))
    goToNextStep()
  }

  const handleBeneficiariosSubmit = (data: BeneficiariosFormData) => {
    console.log('Beneficiarios guardados:', data)
    setFormData(prev => ({ ...prev, beneficiarios: data }))
    goToNextStep()
  }

  // Handler final para guardar todo
  const handleSave = () => {
    console.log('💾 ===== FORMULARIO COMPLETO =====')
    console.log('Paso 1 - Datos Generales:', formData.datosGenerales)
    console.log('Paso 2 - Datos Fiscales:', formData.datosFiscales)
    console.log('Paso 3 - Otros Datos:', formData.otrosDatos)
    console.log('Paso 4 - Domicilio:', formData.domicilioResidencial)
    console.log('Paso 5 - Actividad Económica:', formData.actividadEconomica)
    console.log('Paso 6 - Vínculos:', formData.vinculosPatrimoniales)
    console.log('Paso 7 - Beneficiarios:', formData.beneficiarios)
    console.log('================================')
    
    alert('Formulario completo guardado. Revisa la consola para ver todos los datos.')
  }

  // Handler para el botón "Siguiente"
  const handleNext = async () => {
    if (currentStep === 1 && datosGeneralesRef.current) {
      const isValid = await datosGeneralesRef.current.submit()
      if (!isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Datos Generales')
        return
      }
    } else if (currentStep === 2 && datosFiscalesRef.current) {
      const isValid = await datosFiscalesRef.current.submit()
      if (!isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Datos Fiscales')
        return
      }
    } else if (currentStep === 3 && otrosDatosRef.current) {
      const isValid = await otrosDatosRef.current.submit()
      if (!isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Otros Datos')
        return
      }
    } else if (currentStep === 4 && domicilioResidencialRef.current) {
      const isValid = await domicilioResidencialRef.current.submit()
      if (isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Domicilio Residencial')
        return
      }
    } else if (currentStep === 5 && actividadEconomicaRef.current) {
      const isValid = await actividadEconomicaRef.current.submit()
      if (isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Actividad Económica')
        return
      }
    } else if (currentStep === 6 && vinculosPatrimonialesRef.current) {
      const isValid = await vinculosPatrimonialesRef.current.submit()
      if (isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Vinculos')
        return
      }
    } else if (currentStep === 7 && beneficiariosRef.current) {
      const isValid = await beneficiariosRef.current.submit()
      if (isValid) {
        console.log('⚠️ No se puede avanzar - Hay errores en Beneficiarios')
        return
      }
    } else {
      goToNextStep()
    }
  }

  // Renderizar el contenido del paso actual
  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DatosGenerales
            ref={datosGeneralesRef}
            onNext={handleDatosGeneralesSubmit}
            initialData={formData.datosGenerales}
          />
        )
      case 2:
        return (
          <DatosFiscales
            ref={datosFiscalesRef}
            onNext={handleDatosFiscalesSubmit}
            initialData={formData.datosFiscales}
          />
        )
      case 3:
        return (
          <OtrosDatos 
            ref={otrosDatosRef}
            onNext={handleOtrosDatosSubmit}
            initialData={formData.otrosDatos}
          />
        )
      case 4:
        return (
          <DomicilioResidencial
            ref={domicilioResidencialRef}
            onNext={handleDomicilioResidencialSubmit}
            initialData={formData.domicilioResidencial}
          />
        )
      case 5:
        return (
          <ActividadEconomica
            ref={actividadEconomicaRef}
            onNext={handleActividadEconomicaSubmit}
            initialData={formData.actividadEconomica}
            actividadPrincipal={formData.datosGenerales?.actividad_economica}
          />
        )
      case 6:
        return (
          <VinculosPatrimoniales
            ref={vinculosPatrimonialesRef}
            onNext={handleVinculosPatrimonialesSubmit}
            initialData={formData.vinculosPatrimoniales}
          />
        )
      case 7:
        return (
          <Beneficiarios
            ref={beneficiariosRef}
            onNext={handleBeneficiariosSubmit}
            initialData={formData.beneficiarios}
          />
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