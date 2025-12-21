import { useState } from 'react'


interface Step {
  id: number
  label: string
  completed: boolean
}

export const useWizard = (initialSteps: Omit<Step, 'completed'>[]) => {
  const [currentStep, setCurrentStep] = useState(1)
  const [steps, setSteps] = useState<Step[]>(
    initialSteps.map(step => ({ ...step, completed: false }))
  )

  const goToNextStep = () => {
    if (currentStep < steps.length) {
      setSteps(prev =>
        prev.map(step =>
          step.id === currentStep ? { ...step, completed: true } : step
        )
      )
      setCurrentStep(prev => prev + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1)
    }
  }

  const goToStep = (stepId: number) => {
    if (stepId >= 1 && stepId <= steps.length) {
      setCurrentStep(stepId)
    }
  }

  const isFirstStep = currentStep === 1
  const isLastStep = currentStep === steps.length

  return {
    currentStep,
    steps,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    isFirstStep,
    isLastStep
  }
}