import type { ApoderadoRepresentanteHandle } from "@/components/forms/rgimen-simplificado/steps/ApoderadoRepresentante"
import ApoderadoRepresentante from "@/components/forms/rgimen-simplificado/steps/ApoderadoRepresentante"
import type { ChequeraHandle } from "@/components/forms/rgimen-simplificado/steps/Chequera"
import Chequera from "@/components/forms/rgimen-simplificado/steps/Chequera"
import type { DatosGeneralesHandle } from "@/components/forms/rgimen-simplificado/steps/DatosGenerales"
import DatosGenerales from "@/components/forms/rgimen-simplificado/steps/DatosGenerales"
import type { OtrosDatosHandle } from "@/components/forms/rgimen-simplificado/steps/OtrosDatos"
import OtrosDatos from "@/components/forms/rgimen-simplificado/steps/OtrosDatos"
import type { PEPHandle } from "@/components/forms/rgimen-simplificado/steps/PEP"
import PEP from "@/components/forms/rgimen-simplificado/steps/PEP"
import type { UsoMovimientosHandle } from "@/components/forms/rgimen-simplificado/steps/UsoMovimientos"
import UsoMovimientos from "@/components/forms/rgimen-simplificado/steps/UsoMovimientos"
import Stepper from "@/components/iu/wizard/Stepper"
import WizardNavigation from "@/components/iu/wizard/WizardNavigation"
import { useWizard } from "@/hooks/useWizard"
import type { ApoderadoData, ChequeraItemData, DatosGeneralesData, OtrosDatosData, PEPData, UsoMovimientosData } from "@/schemas/regimenSimplificadoSchema"
import { createFileRoute } from "@tanstack/react-router"
import { useRef, useState } from "react"


export const Route = createFileRoute('/_dashboard/forms/persona-moral/')({
  component: RouteComponent,
})

function RouteComponent() {
  const wizardSteps = [
    { id: 1, label: 'Datos Generales' },
    { id: 2, label: 'Apoderado o Representante Legal' },
    { id: 3, label: 'Otros Datos' },
    { id: 4, label: 'Uso y Movimientos' },
    { id: 5, label: 'Chequera' },
    { id: 6, label: 'PEP' },
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
  const apoderadoRepresentanteRef = useRef<ApoderadoRepresentanteHandle>(null)
  const otrosDatosRef = useRef<OtrosDatosHandle>(null)
  const usoMovimientosRef = useRef<UsoMovimientosHandle>(null)
  const chequeraRef = useRef<ChequeraHandle>(null)
  const pepRef = useRef<PEPHandle>(null)

    // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState<{
    datosGenerales?: DatosGeneralesData
    apoderadoRepresentante?: { apoderados: ApoderadoData[] }
    otrosDatos?: OtrosDatosData
    usoMovimientos?: UsoMovimientosData
    chequera?: { chequeras: ChequeraItemData[] }
    pep?: PEPData
  }>({})

  const handleDatosGeneralesSubmit = (data: DatosGeneralesData) => {
    console.log('Datos Generales RSL guardados: ', data)
    setFormData(prev => ({ ...prev, datosGenerales: data }))
    goToNextStep()
  }

  const handleApoderadoRepresentanteSubmit = (data: { apoderados: ApoderadoData[] }) => {
    console.log('Apoderado o Representante Legal RSL guardados:', data)
    setFormData(prev => ({ ...prev, apoderadoRepresentante: data }))
    goToNextStep()
  }

  const handleOtrosDatosSubmit = (data: OtrosDatosData) => {
    console.log('Otros Datos RSL guardados:', data)
    setFormData(prev => ({ ...prev, otrosDatos: data }))
    goToNextStep()
  }

  const handleUsoMovimientosSubmit = (data: UsoMovimientosData) => {
    console.log('uso y Movimientos de la Cuenta RSL guardada:', data)
    setFormData(prev => ({ ...prev, usoMovimientos: data }))
    goToNextStep()
  }

  const handleChequeraSubmit = (data: { chequeras: ChequeraItemData[] }) => {
    console.log('Chequera RSL guardados:', data)
    setFormData(prev => ({ ...prev, chequera: data }))
    goToNextStep()
  }

  const handlePEPSubmit = (data: PEPData) => {
    console.log('PEP RSL guardados:', data)
    setFormData(prev => ({ ...prev, pep: data }))
    goToNextStep()
  }

  // Handler
  const handleSave = () => {
    console.log('Guardando formulario completo PM: ', formData)
  }

  // Handle para el botón "Siguiente"
  const handleNext = async () => {
    if (currentStep === 1 && datosGeneralesRef.current) {
      const isValid = await datosGeneralesRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 2 && apoderadoRepresentanteRef.current) {
      const isValid = await apoderadoRepresentanteRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 3 && otrosDatosRef.current) {
      const isValid = await otrosDatosRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 4 && usoMovimientosRef.current) {
      const isValid = await usoMovimientosRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 5 && chequeraRef.current) {
      const isValid = await chequeraRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 6 && pepRef.current) {
      const isValid = await pepRef.current.submit()
      if (!isValid) return
    } else {
      goToNextStep()
    }
  }

  // Renderizamos el contenido del paso actua
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
          <ApoderadoRepresentante 
            ref={apoderadoRepresentanteRef}
            onNext={handleApoderadoRepresentanteSubmit}
            initialData={formData.apoderadoRepresentante}
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
          <UsoMovimientos
            ref={usoMovimientosRef}
            onNext={handleUsoMovimientosSubmit}
            initialData={formData.usoMovimientos}
          />
        )
      case 5:
        return (
          <Chequera
            ref={chequeraRef}
            onNext={handleChequeraSubmit}
            initialData={formData.chequera}
          />
        )
      case 6:
        return (
          <PEP
            ref={pepRef}
            onNext={handlePEPSubmit}
            initialData={formData.pep}
          />
        )
      default:
        return null
    }
  }

  return (
    // <div className="max-w-7xl mx-auto">
    <div className="w-auto mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-dark mb-2">
          Registro de Persona Moral
        </h1>
        <p className="text-gray-600">
          Completa todos los pasos para registrar la empresa
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