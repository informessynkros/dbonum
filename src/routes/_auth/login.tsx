import ButtonLoading from '@/components/iu/button/ButtonLoading'
import MessageToasty from '@/components/iu/messages/MessageToasty'
import useAuth from '@/hooks/useAuth'
import { createFileRoute } from '@tanstack/react-router'
import { LockIcon, LogIn } from 'lucide-react'
import { Controller, useForm } from "react-hook-form"


export const Route = createFileRoute('/_auth/login')({
  component: RouteComponent,
})

// Interface
interface AuthData {
  checkpoint: string
  cipher: string
}

function RouteComponent() {

  const {
    auth,
    isPendingAuth
  } = useAuth()

  const { control, handleSubmit, formState: { errors } } = useForm<AuthData>()

  const handleDataAuth = (formData: AuthData) => {
    auth(formData)
  }

  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="w-full max-w-2xl bg-white rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex">
            <div className="flex-1 flex flex-col justify-center px-8 sm:px-12 lg:px-16 py-12">
              <div className="mx-auto w-full">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-bold text-gray-600">
                    Bienvenido a DBONUM
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">
                    Inicia sesión para poder acceder al sistema
                  </p>
                </div>

                <div className="bg-white py-8 px-6 shadow-lg rounded-xl border border-gray-200">
                  <form onSubmit={handleSubmit(handleDataAuth)} className="space-y-6">
                    <Controller
                      name="checkpoint"
                      control={control}
                      rules={{ required: 'Coloca un correo electrónico' }}
                      render={({ field }) => (
                        <MessageToasty
                          label="Correo electrónico"
                          type="email"
                          placeholder="example@gmail.com"
                          icon={LogIn}
                          disabled={false}
                          error={errors.checkpoint?.message}
                          {...field}
                        />
                      )}
                    />

                    <Controller
                      name="cipher"
                      control={control}
                      rules={{
                        required: "La contraseña no puede ir vacía",
                        pattern: {
                          value: /^(?!.*(?:123|abc|def))(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{8,}$/,
                          message: "La contraseña debe tener al menos 8 caracteres, incluir una mayúscula, una minúscula, un número, un carácter especial y no contener secuencias como 123, abc o def",
                        },
                      }}
                      render={({ field }) => (
                        <MessageToasty
                          label="Contraseña"
                          type="password"
                          placeholder="********"
                          icon={LockIcon}
                          disabled={false}
                          error={errors.cipher?.message}
                          {...field}
                        />
                      )}
                    />

                    <div className="flex justify-end">
                      <a
                        href="/auth/forgot-password"
                        className="text-sm text-gray-600 hover:text-[#548DBF] underline underline-offset-4 duration-200"
                      >
                        ¿Olvidaste tu contraseña?
                      </a>
                    </div>

                    <ButtonLoading
                      text="Iniciar Sesión"
                      icon={LogIn}
                      loadingText="Iniciando sesión..."
                      type="submit"
                      isLoading={isPendingAuth}
                    />
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
