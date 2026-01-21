import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  domicilioFiscalPMSchema, 
  domicilioFiscalPMDefaultValues, 
  type DomicilioFiscalPMFormData 
} from '@/schemas/personaMoralSchema'
import AddressForm from '@/components/forms/shared/AddressForm'
import { forwardRef, useImperativeHandle } from 'react'


interface DomicilioFiscalProps {
  onNext: (data: DomicilioFiscalPMFormData) => void
  initialData?: Partial<DomicilioFiscalPMFormData>
}

export interface DomicilioFiscalHandle {
  submit: () => Promise<boolean>
}

const DomicilioFiscal = forwardRef<DomicilioFiscalHandle, DomicilioFiscalProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DomicilioFiscalPMFormData>({
      resolver: zodResolver(domicilioFiscalPMSchema),
      defaultValues: initialData || domicilioFiscalPMDefaultValues
    })

    const onSubmit = (data: DomicilioFiscalPMFormData) => {
      console.log('Domicilio Fiscal PM:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('Es válido?:', isValid)
        console.log('Errores después de trigger:', errors)
        
        if (isValid) {
          handleSubmit(onSubmit)()
          return true
        } else {
          return false
        }
      }
    }))

    return (
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white rounded-2xl p-8 shadow-sm">
        <div className="space-y-6">
          {/* Header */}
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Domicilio Fiscal</h2>
            <p className="text-sm text-gray-600">
              Dirección fiscal de la empresa
            </p>
          </div>

          {/* AddressForm - Reutilizamos el componente */}
          <AddressForm
            control={control}
            errors={errors}
            fieldPrefix="domicilio_fiscal"
            title="Dirección Fiscal Completa"
            showHeader={true}
            required={true}
          />

          {/* Nota de campos obligatorios */}
          <div className="border-t border-gray-200 pt-4">
            <p className="text-sm text-gray-500">
              * Campos obligatorios
            </p>
          </div>
        </div>
      </form>
    )
  }
)

DomicilioFiscal.displayName = 'DomicilioFiscal'

export default DomicilioFiscal