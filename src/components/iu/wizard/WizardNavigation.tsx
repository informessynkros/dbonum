import { ChevronLeft, ChevronRight, Save } from 'lucide-react'


interface WizardNavigationProps {
  currentStep: number
  totalSteps: number
  onPrevious: () => void
  onNext: () => void
  onSave: () => void
  isFirstStep: boolean
  isLastStep: boolean
}

const WizardNavigation = ({
  currentStep,
  totalSteps,
  onPrevious,
  onNext,
  onSave,
  isFirstStep,
  isLastStep
}: WizardNavigationProps) => {
  return (
    <div className="flex justify-between items-center bg-white rounded-2xl p-6 shadow-sm mt-6">
      <button
        onClick={onPrevious}
        disabled={isFirstStep}
        className={`
          flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all
          ${isFirstStep
            ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }
        `}
      >
        <ChevronLeft className="w-5 h-5" />
        Anterior
      </button>

      <div className="text-sm text-gray-500">
        Paso <span className="font-semibold text-primary-600">{currentStep}</span> de {totalSteps}
      </div>

      {isLastStep ? (
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-all"
        >
          <Save className="w-5 h-5" />
          Guardar
        </button>
      ) : (
        <button
          onClick={onNext}
          className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-all"
        >
          Siguiente
          <ChevronRight className="w-5 h-5" />
        </button>
      )}
    </div>
  )
}

export default WizardNavigation