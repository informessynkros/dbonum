import { Check } from 'lucide-react'


interface Step {
  id: number
  label: string
  completed: boolean
}

interface StepperProps {
  steps: Step[]
  currentStep: number
}

const Stepper = ({ steps, currentStep }: StepperProps) => {
  return (
    <div className="w-full bg-white rounded-2xl p-6 shadow-sm mb-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center flex-1">
            {/* Step Circle */}
            <div className="flex flex-col items-center">
              <div
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm transition-all duration-300
                  ${step.completed 
                    ? 'bg-green-500 text-white' 
                    : currentStep === step.id 
                      ? 'bg-primary-600 text-white' 
                      : 'bg-gray-200 text-gray-500'
                  }
                `}
              >
                {step.completed ? (
                  <Check className="w-5 h-5" />
                ) : (
                  step.id
                )}
              </div>
              
              {/* Step Label */}
              <span
                className={`
                  mt-2 text-xs font-medium text-center max-w-24
                  ${currentStep === step.id 
                    ? 'text-primary-600' 
                    : 'text-gray-500'
                  }
                `}
              >
                {step.label}
              </span>
            </div>

            {/* Connector Line */}
            {index < steps.length - 1 && (
              <div
                className={`
                  flex-1 h-1 mx-2 transition-all duration-300
                  ${step.completed 
                    ? 'bg-green-500' 
                    : 'bg-gray-200'
                  }
                `}
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

export default Stepper