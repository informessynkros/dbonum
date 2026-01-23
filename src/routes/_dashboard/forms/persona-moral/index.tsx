import type { DatosGeneralesHandle } from '@/components/forms/persona-fisica/steps/DatosGenerales'
import DatosGenerales from '@/components/forms/persona-moral/steps/DatosGenerales'
import type { DomicilioFiscalHandle } from '@/components/forms/persona-moral/steps/DomicilioFiscal'
import DomicilioFiscal from '@/components/forms/persona-moral/steps/DomicilioFiscal'
import type { EstructuraCorporativaHandle } from '@/components/forms/persona-moral/steps/EstructuraCorporativa'
import EstructuraCorporativa from '@/components/forms/persona-moral/steps/EstructuraCorporativa'
import type { OtrosDatosHandle } from '@/components/forms/persona-moral/steps/OtrosDatos'
import OtrosDatos from '@/components/forms/persona-moral/steps/OtrosDatos'
import type { ProcedenciaRecursosHandle } from '@/components/forms/persona-moral/steps/ProcedenciaRecursos'
import ProcedenciaRecursos from '@/components/forms/persona-moral/steps/ProcedenciaRecursos'
import type { PropietarioRealHandle } from '@/components/forms/persona-moral/steps/PropietarioReal'
import PropietarioReal from '@/components/forms/persona-moral/steps/PropietarioReal'
import type { RepresentantesAdminHandle } from '@/components/forms/persona-moral/steps/RepresentantesAdmin'
import RepresentantesAdmin from '@/components/forms/persona-moral/steps/RepresentantesAdmin'
import type { SociosAccionistasHandle } from '@/components/forms/persona-moral/steps/SociosAccionistas'
import SociosAccionistas from '@/components/forms/persona-moral/steps/SociosAccionistas'
import UsoMovimientos, { type UsoMovimientosHandle } from '@/components/forms/persona-moral/steps/UsoMovimientos'
import Stepper from '@/components/iu/wizard/Stepper'
import WizardNavigation from '@/components/iu/wizard/WizardNavigation'
import { useWizard } from '@/hooks/useWizard'
import type { DatosGeneralesPMFormData, DomicilioFiscalPMFormData, EstructuraCorporativaPMFormData, OtrosDatosPMFormData, ProcedenciaRecursosPMFormData, PropietarioRealPMFormData, RepresentantesAdminPMFormData, SociosAccionistasPMFormData, UsoMovimientosPMFormData } from '@/schemas/personaMoralSchema'
import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/_dashboard/forms/persona-moral/')({
  component: RouteComponent,
})

function RouteComponent() {
  const wizardSteps = [
    { id: 1, label: 'Datos Generales' },
    { id: 2, label: 'Domicilio Fiscal' },
    { id: 3, label: 'Otros Datos' },
    { id: 4, label: 'Estructura Corporativa' },
    { id: 5, label: 'Socios/Accionistas' },
    { id: 6, label: 'Representantes' },
    { id: 7, label: 'Propietario Real' },
    { id: 8, label: 'Uso y Movimientos' },
    { id: 9, label: 'Procedencia Recursos' }
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
  const domicilioFiscalRef = useRef<DomicilioFiscalHandle>(null)
  const otrosDatosRef = useRef<OtrosDatosHandle>(null)
  const estructuraCorporativaRef = useRef<EstructuraCorporativaHandle>(null)
  const sociosAccionistasRef = useRef<SociosAccionistasHandle>(null)
  const representantesAdminRef = useRef<RepresentantesAdminHandle>(null)
  const propietarioRealRef = useRef<PropietarioRealHandle>(null)
  const usoMovimientosRef = useRef<UsoMovimientosHandle>(null)
  const procedenciaRecursosRef = useRef<ProcedenciaRecursosHandle>(null)

  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState<{
    datosGenerales?: DatosGeneralesPMFormData,
    domicilioFiscal?: DomicilioFiscalPMFormData,
    otrosDatos?: OtrosDatosPMFormData,
    estructuraCorporativa?: EstructuraCorporativaPMFormData,
    sociosAccionistas?: SociosAccionistasPMFormData,
    representantesAdmin?: RepresentantesAdminPMFormData,
    propietarioReal?: PropietarioRealPMFormData,
    usoMovimientos?: UsoMovimientosPMFormData,
    procedenciaRecursos?: ProcedenciaRecursosPMFormData
  }>({})

  const handleDatosGeneralesSubmit = (data: DatosGeneralesPMFormData) => {
    console.log('Datos Generales PM guardados: ', data)
    setFormData(prev => ({ ...prev, datosGenerales: data }))
    goToNextStep()
  }

  const handleDomicilioFiscalSubmit = (data: DomicilioFiscalPMFormData) => {
    console.log('Domicilio Fiscal PM guardado:', data)
    setFormData(prev => ({ ...prev, domicilioFiscal: data }))
    goToNextStep()
  }

  const handleOtrosDatosSubmit = (data: OtrosDatosPMFormData) => {
    console.log('Otros Datos PM guardados:', data)
    setFormData(prev => ({ ...prev, otrosDatos: data }))
    goToNextStep()
  }

  const handleEstructuraCorporativaSubmit = (data: EstructuraCorporativaPMFormData) => {
    console.log('Estructura Corporativa PM guardada:', data)
    setFormData(prev => ({ ...prev, estructuraCorporativa: data }))
    goToNextStep()
  }

  const handleSociosAccionistasSubmit = (data: SociosAccionistasPMFormData) => {
    console.log('Socios/Accionistas PM guardados:', data)
    setFormData(prev => ({ ...prev, sociosAccionistas: data }))
    goToNextStep()
  }

  const handleRepresentantesAdminSubmit = (data: RepresentantesAdminPMFormData) => {
    console.log('Representantes y Administración guardados:', data)
    setFormData(prev => ({ ...prev, representantesAdmin: data }))
    goToNextStep()
  }

  const handlePropietarioRealSubmit = (data: PropietarioRealPMFormData) => {
    console.log('Propietario Real:', data)
    setFormData(prev => ({ ...prev, propietarioReal: data }))
    goToNextStep()
  }

  const handleUsoMovimientosSubmit = (data: UsoMovimientosPMFormData) => {
    console.log('Uso y Movimientos de la cuenta:', data)
    setFormData(prev => ({ ...prev, usoMovimientos: data }))
    goToNextStep()
  }

  const handleProcedenciaRecursosSubmit = (data: ProcedenciaRecursosPMFormData) => {
    console.log('Procedencia de Recursos:', data)
    setFormData(prev => ({ ...prev, procedenciaRecursos: data }))
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
    } else if (currentStep === 2 && domicilioFiscalRef.current) {
      const isValid = await domicilioFiscalRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 3 && otrosDatosRef.current) {
      const isValid = await otrosDatosRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 4 && estructuraCorporativaRef.current) {
      const isValid = await estructuraCorporativaRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 5 && sociosAccionistasRef.current) {
      const isValid = await sociosAccionistasRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 6 && representantesAdminRef.current) {
      const isValid = await representantesAdminRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 7 && propietarioRealRef.current) {
      const isValid = await propietarioRealRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 8 && usoMovimientosRef.current) {
      const isValid = await usoMovimientosRef.current.submit()
      if (!isValid) return
    } else if (currentStep === 9 && procedenciaRecursosRef.current) {
      const isValid = await procedenciaRecursosRef.current.submit()
      if (!isValid) return
    } else {
      goToNextStep()
    }
  }

  // Renderizamos el contenido del paso actua;
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
          <DomicilioFiscal 
            ref={domicilioFiscalRef}
            onNext={handleDomicilioFiscalSubmit}
            initialData={formData.domicilioFiscal}
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
          <EstructuraCorporativa
            ref={estructuraCorporativaRef}
            onNext={handleEstructuraCorporativaSubmit}
            initialData={formData.estructuraCorporativa}
          />
        )
      case 5:
        return (
          <SociosAccionistas
            ref={sociosAccionistasRef}
            onNext={handleSociosAccionistasSubmit}
            initialData={formData.sociosAccionistas}
          />
        )
      case 6:
        return (
          <RepresentantesAdmin
            ref={representantesAdminRef}
            onNext={handleRepresentantesAdminSubmit}
            initialData={formData.representantesAdmin}
          />
        )
      case 7:
        return (
          <PropietarioReal
            ref={representantesAdminRef}
            onNext={handlePropietarioRealSubmit}
            initialData={formData.propietarioReal}
          />
        )
      case 8:
        return (
          <UsoMovimientos
            ref={representantesAdminRef}
            onNext={handleUsoMovimientosSubmit}
            initialData={formData.usoMovimientos}
          />
        )
      case 9:
        return (
          <ProcedenciaRecursos
            ref={representantesAdminRef}
            onNext={handleProcedenciaRecursosSubmit}
            initialData={formData.procedenciaRecursos}
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
