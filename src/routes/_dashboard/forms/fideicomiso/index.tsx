import type { ChequeraHandle } from '@/components/forms/fideicomisos/steps/Chequera'
import Chequera from '@/components/forms/fideicomisos/steps/Chequera'
import type { ComiteTecnicoHandle } from '@/components/forms/fideicomisos/steps/comiteTecnico/ComiteTecnico'
import ComiteTecnico from '@/components/forms/fideicomisos/steps/comiteTecnico/ComiteTecnico'
import type { DatosGeneralesHandle } from '@/components/forms/fideicomisos/steps/DatosGenerales'
import DatosGenerales from '@/components/forms/fideicomisos/steps/DatosGenerales'
import type { DelegadosFiduciariosHandle } from '@/components/forms/fideicomisos/steps/delegadosFiduciarios/DelegadosFiduciarios'
import DelegadosFiduciarios from '@/components/forms/fideicomisos/steps/delegadosFiduciarios/DelegadosFiduciarios'
import type { FideicomisariosHandle } from '@/components/forms/fideicomisos/steps/Fideicomisarios'
import Fideicomisarios from '@/components/forms/fideicomisos/steps/Fideicomisarios'
import type { FideicomitentesHandle } from '@/components/forms/fideicomisos/steps/fideicomitentes/Fideicomitentes'
import Fideicomitentes from '@/components/forms/fideicomisos/steps/fideicomitentes/Fideicomitentes'
import OtrosDatos from '@/components/forms/fideicomisos/steps/OtrosDatos'
import type { PEPHandle } from '@/components/forms/fideicomisos/steps/PEP'
import PEP from '@/components/forms/fideicomisos/steps/PEP'
import type { ProcedenciaRecursoHandle } from '@/components/forms/fideicomisos/steps/ProcedenciaRecurso'
import ProcedenciaRecurso from '@/components/forms/fideicomisos/steps/ProcedenciaRecurso'
import type { PropietarioRealHandle } from '@/components/forms/fideicomisos/steps/propietarioReal/PropietarioReal'
import PropietarioReal from '@/components/forms/fideicomisos/steps/propietarioReal/PropietarioReal'
import UsoMovimientos, { type UsoMovimientosHandle } from '@/components/forms/fideicomisos/steps/UsoMovimientos'
import type { DatosFiscalesHandle } from '@/components/forms/persona-fisica/steps/DatosFiscales'
import Stepper from '@/components/iu/wizard/Stepper'
import WizardNavigation from '@/components/iu/wizard/WizardNavigation'
import { useWizard } from '@/hooks/useWizard'
import type { ChequeraFormData, ComiteTecnicoFormData, DatosGeneralesFormData, DelegadosFiduciariosFormData, FideicomisariosFormData, FideicomitentesFormData, OtrosDatosFormData, PEPFormDataF, ProcedenciaRecursoFormData, PropietarioRealFormData, UsoMovimientosFormData } from '@/schemas/fideicomisosSchema'
import { createFileRoute } from '@tanstack/react-router'
import { useRef, useState } from 'react'

export const Route = createFileRoute('/_dashboard/forms/fideicomiso/')({
  component: RouteComponent,
})

function RouteComponent() {
  const wizardSteps = [
    { id: 1, label: 'Datos Generales' },
    { id: 2, label: 'Otros Datos' },
    { id: 3, label: 'Datos Fideicomitente' },
    { id: 4, label: 'Datos Fideicomisario' },
    { id: 5, label: 'Datos Delegado Fiduciario' },
    { id: 6, label: 'Datos Comité Técnico' },
    { id: 7, label: 'Procedencia Recurso' },
    { id: 8, label: 'Propietario Real' },
    { id: 9, label: 'Uso y Movimientos de Cuenta' },
    { id: 10, label: 'Chequera' },
    { id: 11, label: 'PEP' }
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
  const otrosDatosRef = useRef<DatosFiscalesHandle>(null)
  const fideicomitentesRef = useRef<FideicomitentesHandle>(null)
  const fideicomisariosRef = useRef<FideicomisariosHandle>(null)
  const delegadoFiduciarioRef = useRef<DelegadosFiduciariosHandle>(null)
  const comiteTecnicoRef = useRef<ComiteTecnicoHandle>(null)
  const procedenciaRecursoRef = useRef<ProcedenciaRecursoHandle>(null)
  const propietarioRealRef = useRef<PropietarioRealHandle>(null)
  const usoMovimientosCuentaRef = useRef<UsoMovimientosHandle>(null)
  const chequeraRef = useRef<ChequeraHandle>(null)
  const pepRef = useRef<PEPHandle>(null)

  // Estado para guardar todos los datos del formulario
  const [formData, setFormData] = useState<{
    datosGenerales?: DatosGeneralesFormData
    otrosDatos?: OtrosDatosFormData
    fideicomitentes?: FideicomitentesFormData
    fideicomisarios?: FideicomisariosFormData
    delegadosFiduciarios?: DelegadosFiduciariosFormData
    comiteTecnico?: ComiteTecnicoFormData
    procedenciaRecurso?: ProcedenciaRecursoFormData
    propietarioReal?: PropietarioRealFormData
    usoMovimientosCuenta?: UsoMovimientosFormData
    chequera?: ChequeraFormData
    pep?: PEPFormDataF
  }>({})

  const handleDatosGeneralesSubmit = (data: DatosGeneralesFormData) => {
    console.log('Datos Generales guardados:', data)
    setFormData(prev => ({ ...prev, datosGenerales: data }))
    goToNextStep()
  }

  const handleOtrosDatosSubmit = (data: OtrosDatosFormData) => {
    console.log('Otros Datos guardados:', data)
    setFormData(prev => ({ ...prev, otrosDatos: data }))
    goToNextStep()
  }

  const handleFideicomitentesSubmit = (data: FideicomitentesFormData) => {
    console.log('Datos del Fideicomitente guardados:', data)
    setFormData(prev => ({ ...prev, fideicomitentes: data }))
    goToNextStep()
  }

  const handleFideicomisariosSubmit = (data: FideicomisariosFormData) => {
    console.log('Datos del Fideicomisario guardados:', data)
    setFormData(prev => ({ ...prev, fideicomisarios: data }))
    goToNextStep()
  }

  const handleDelegadosFiduciariosSubmit = (data: DelegadosFiduciariosFormData) => {
    console.log('Datos del Delegado Fiduciario guardados:', data)
    setFormData(prev => ({ ...prev, delegadosFiduciarios: data }))
    goToNextStep()
  }

  const handleComiteTecnicoSubmit = (data: ComiteTecnicoFormData) => {
    console.log('Datos del Comité Técnico guardados:', data)
    setFormData(prev => ({ ...prev, comiteTecnico: data }))
    goToNextStep()
  }

  const handleProcedenciaRecursoSubmit = (data: ProcedenciaRecursoFormData) => {
    console.log('Procedencia del Recurso guardados:', data)
    setFormData(prev => ({ ...prev, procedenciaRecurso: data }))
    goToNextStep()
  }

  const handlePropietarioRealSubmit = (data: PropietarioRealFormData) => {
    console.log('Propietario Real guardados:', data)
    setFormData(prev => ({ ...prev, propietarioReal: data }))
    goToNextStep()
  }

  const handleUsoMovimientosSubmit = (data: UsoMovimientosFormData) => {
    console.log('Uso y Movimientos de la Cuenta guardados:', data)
    setFormData(prev => ({ ...prev, usoMovimientosCuenta: data }))
    goToNextStep()
  }

  const handleChequeraSubmit = (data: ChequeraFormData) => {
    console.log('Chequera guardados:', data)
    setFormData(prev => ({ ...prev, chequera: data }))
    goToNextStep()
  }

  const handlePEPSubmit = (data: PEPFormDataF) => {
    console.log('PEP guardados:', data)
    setFormData(prev => ({ ...prev, pep: data }))
    goToNextStep()
  }

  const handleSave = () => {
    console.log('💾 ===== FORMULARIO COMPLETO =====')
    console.log('Paso 1 - Datos Generales:', formData.datosGenerales)
    console.log('Paso 2 - Otros Datos:', formData.otrosDatos)
    console.log('Paso 3 - Datos del Fideicomitente:', formData.fideicomitentes)
    console.log('Paso 4 - Datos del Fideicomisario:', formData.fideicomisarios)
    console.log('Paso 5 - Datos del Delegado Fiduciario:', formData.delegadosFiduciarios)
    console.log('Paso 6 - Datos del Comité Técnico:', formData.comiteTecnico)
    console.log('Paso 7 - Procedencia del Recurso:', formData.procedenciaRecurso)
    console.log('Paso 8 - Propietario Real:', formData.propietarioReal)
    console.log('Paso 9 - Uso y Movimientos de la Cuenta:', formData.usoMovimientosCuenta)
    console.log('Paso 10 - Chequera:', formData.chequera)
    console.log('Paso 11 - PEP:', formData.pep)
    console.log('================================')
    
    alert('Formulario completo guardado. Revisa la consola para ver todos los datos.')
  }

  // Handler para el botón "Siguiente"
  const handleNext = async () => {
    if (currentStep === 1 && datosGeneralesRef.current) {
      const isValid = await datosGeneralesRef.current.submit()
      if (!isValid) {
        console.log('No se puede avanzar - Hay errores en Datos Generales')
        return
      }
    } else if (currentStep === 2 && otrosDatosRef.current) {
      const isValid = await otrosDatosRef.current.submit()
      if (!isValid) {
        console.log('No se puede avanzar - Hay errores en Otros Datos')
        return
      }
    } else if (currentStep === 3 && fideicomitentesRef.current) {
      const isValid = await fideicomitentesRef.current.submit()
      if (!isValid) {
        console.log('No se puede avanzar - Hay errores en Datos del Fideicomitentes')
        return
      }
    } else if (currentStep === 4 && fideicomisariosRef.current) {
      const isValid = await fideicomisariosRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Datos del Fideicomitentes')
        return
      }
    } else if (currentStep === 5 && delegadoFiduciarioRef.current) {
      const isValid = await delegadoFiduciarioRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Datos del Delegado Fiduciario')
        return
      }
    } else if (currentStep === 6 && comiteTecnicoRef.current) {
      const isValid = await comiteTecnicoRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Datos del Cómite Técnico')
        return
      }
    } else if (currentStep === 7 && procedenciaRecursoRef.current) {
      const isValid = await procedenciaRecursoRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Procedencia del Recurso')
        return
      }
    } else if (currentStep === 8 && propietarioRealRef.current) {
      const isValid = await propietarioRealRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Propietario Real')
        return
      }
    } else if (currentStep === 9 && usoMovimientosCuentaRef.current) {
      const isValid = await usoMovimientosCuentaRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Usos y Movimientos de la Cuenta')
        return
      }
    } else if (currentStep === 10 && chequeraRef.current) {
      const isValid = await chequeraRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en Chequera')
        return
      }
    } else if (currentStep === 11 && pepRef.current) {
      const isValid = await pepRef.current.submit()
      if (isValid) {
        console.log('No se puede avanzar - Hay errores en PEP')
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
          <OtrosDatos
            ref={otrosDatosRef}
            onNext={handleOtrosDatosSubmit}
            initialData={formData.otrosDatos}
          />
        )
      case 3:
        return (
          <Fideicomitentes
            ref={fideicomitentesRef}
            onNext={handleFideicomitentesSubmit}
            initialData={formData.fideicomitentes}
          />
        )
      case 4:
        return (
          <Fideicomisarios
            ref={fideicomisariosRef}
            onNext={handleFideicomisariosSubmit}
            initialData={formData.fideicomisarios}
          />
        )
      case 5:
        return (
          <DelegadosFiduciarios
            ref={delegadoFiduciarioRef}
            onNext={handleDelegadosFiduciariosSubmit}
            initialData={formData.delegadosFiduciarios}
          />
        )
      case 6:
        return (
          <ComiteTecnico
            ref={comiteTecnicoRef}
            onNext={handleComiteTecnicoSubmit}
            initialData={formData.comiteTecnico}
          />
        )
      case 7:
        return (
          <ProcedenciaRecurso
            ref={procedenciaRecursoRef}
            onNext={handleProcedenciaRecursoSubmit}
            initialData={formData.procedenciaRecurso}
          />
        )
      case 8:
        return (
          <PropietarioReal
            ref={propietarioRealRef}
            onNext={handlePropietarioRealSubmit}
            initialData={formData.propietarioReal}
          />
        )
      case 9:
        return (
          <UsoMovimientos
            ref={usoMovimientosCuentaRef}
            onNext={handleUsoMovimientosSubmit}
            initialData={formData.usoMovimientosCuenta}
          />
        )
      case 10:
        return (
          <Chequera
            ref={chequeraRef}
            onNext={handleChequeraSubmit}
            initialData={formData.chequera}
          />
        )
      case 11:
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
    <div className="w-full mx-auto">
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
