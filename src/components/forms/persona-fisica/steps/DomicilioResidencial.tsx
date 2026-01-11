// Paso 4: Domicilio Residencial - Persona Física
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { 
  domicilioResidencialSchema, 
  domicilioResidencialDefaultValues, 
  type DomicilioResidencialFormData 
} from '@/schemas/personaFisicaSchema'
import AddressForm from '@/components/forms/shared/AddressForm'
import { forwardRef, useImperativeHandle } from 'react'


interface DomicilioResidencialProps {
  onNext: (data: DomicilioResidencialFormData) => void
  initialData?: Partial<DomicilioResidencialFormData>
}

export interface DomicilioResidencialHandle {
  submit: () => Promise<boolean>
}

const DomicilioResidencial = forwardRef<DomicilioResidencialHandle, DomicilioResidencialProps>(
  ({ onNext, initialData }, ref) => {
    const {
      control,
      handleSubmit,
      formState: { errors },
      trigger
    } = useForm<DomicilioResidencialFormData>({
      resolver: zodResolver(domicilioResidencialSchema),
      defaultValues: initialData || domicilioResidencialDefaultValues,
      mode: 'onSubmit',
      reValidateMode: 'onChange'
    })

    const onSubmit = (data: DomicilioResidencialFormData) => {
      console.log('Domicilio Residencial:', data)
      onNext(data)
    }

    // Exponer el submit al padre (wizard)
    useImperativeHandle(ref, () => ({
      submit: async () => {
        const isValid = await trigger()
        
        console.log('¿Es válido?:', isValid)
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
          <div className="border-b border-gray-200 pb-4">
            <h2 className="text-2xl font-bold text-dark mb-2">Domicilio Residencial</h2>
            <p className="text-sm text-gray-600">
              Dirección de residencia del cliente
            </p>
          </div>

          <AddressForm
            control={control}
            errors={errors}
            fieldPrefix="domicilio_residencial"
            title="Dirección Completa"
            showHeader={true}
            required={true}
          />

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

DomicilioResidencial.displayName = 'DomicilioResidencial'

export default DomicilioResidencial