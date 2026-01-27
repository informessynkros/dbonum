import MessageToasty from "@/components/iu/messages/MessageToasty";
import SelectMultiple from "@/components/iu/select/SelectMultiple";
import { NIVELES, PAISES, RELACIONES } from "@/data/mockCatalogos";
import { pepSchemaF, type PEPFormDataF } from "@/schemas/fideicomisosSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle, Plus, Trash2, User, Users } from "lucide-react";
import { forwardRef, useImperativeHandle } from "react";
import { Controller, useForm, useFieldArray } from "react-hook-form";


export const defaultValues: PEPFormDataF = {
  tienePEPDirecto: false,
  pepsDirectos: [],
  tienePEPRelacionado: false,
  pepsRelacionados: [],
};

interface PEPProps {
  onNext: (data: PEPFormDataF) => void;
  initialData?: Partial<PEPFormDataF>;
}

export interface PEPHandle {
  submit: () => Promise<boolean>;
}

const PEP = forwardRef<PEPHandle, PEPProps>(({ onNext, initialData }, ref) => {
  const {
    control,
    handleSubmit,
    // formState: { errors },
    trigger,
    watch,
  } = useForm<PEPFormDataF>({
    resolver: zodResolver(pepSchemaF),
    defaultValues: initialData || defaultValues,
  });

  const {
    fields: pepDirectosFields,
    append: appendPepDirecto,
    remove: removePepDirecto,
  } = useFieldArray({
    control,
    name: "pepsDirectos",
  });

  const {
    fields: pepRelacionadosFields,
    append: appendPepRelacionado,
    remove: removePepRelacionado,
  } = useFieldArray({
    control,
    name: "pepsRelacionados",
  });

  const tienePEPDirecto = watch("tienePEPDirecto");
  const tienePEPRelacionado = watch("tienePEPRelacionado");

  const agregarPepDirecto = () => {
    appendPepDirecto({
      nombreCompleto: "",
      participacion: "",
      institucion: "",
      nivel: "federal",
      pais: "",
      cargo: "",
      razonesExtranjero: "",
      pepNacional: false,
      pepExtranjero: false,
    });
  };

  const agregarPepRelacionado = () => {
    appendPepRelacionado({
      nombreCompleto: "",
      participacion: "",
      relacion: "conyuge",
      institucion: "",
      nivel: "federal",
      pais: "",
      cargo: "",
      razonesExtranjero: "",
      pepNacional: false,
      pepExtranjero: false,
    });
  };

  const onSubmit = (data: PEPFormDataF) => {
    console.log("PEP: ", data);
    onNext(data);
  };

  useImperativeHandle(ref, () => ({
    submit: async () => {
      const isValid = await trigger();
      if (isValid) {
        handleSubmit(onSubmit)();
        return true;
      }
      return false;
    },
  }));

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white rounded-2xl p-8 shadow-sm"
    >
      <div className="space-y-8">
        <div className="border-b border-gray-200 pb-4">
          <h2 className="text-2xl font-bold text-dark mb-2">
            Personas Políticamente Expuestas (PEP)
          </h2>
          <p className="text-sm text-gray-600">
            Información sobre PEP directos y relacionados
          </p>
        </div>

        {/* SECCIÓN A: PEP DIRECTOS */}
        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Algún fideicomitente, fideicomisario, delegado fiduciario o
              miembro del Comité Técnico desempeña/ó (hace 1 año) algún cargo
              público nacional o internacional?{" "}
              <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tienePEPDirecto"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="space-y-2">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === true}
                        onChange={() => onChange(true)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">Sí</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === false}
                        onChange={() => onChange(false)}
                        className="w-4 h-4 text-primary-600 border-gray-300 focus:ring-primary-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {tienePEPDirecto && (
            <>
              <button
                type="button"
                onClick={agregarPepDirecto}
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar PEP Directo
              </button>

              <div className="space-y-4">
                {pepDirectosFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                        <User className="w-5 h-5 text-primary-600" />
                        PEP Directo {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removePepDirecto(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name={`pepsDirectos.${index}.nombreCompleto`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre Completo"
                            type="text"
                            placeholder="Nombre completo"
                            icon={User}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsDirectos.${index}.participacion`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Participación en el Fideicomiso"
                            type="text"
                            placeholder="Ej: Fideicomitente"
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsDirectos.${index}.institucion`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre de la Institución Pública"
                            type="text"
                            placeholder="Nombre de la institución"
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsDirectos.${index}.nivel`}
                        control={control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <SelectMultiple
                            options={NIVELES}
                            onSelect={s => onChange((s as any)?.id)}
                            placeholder="Nivel"
                            label="Nivel"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsDirectos.${index}.pais`}
                        control={control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <SelectMultiple
                            options={PAISES}
                            onSelect={s => onChange((s as any)?.id)}
                            placeholder="País"
                            label="País donde desempeña/ó el cargo"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsDirectos.${index}.cargo`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Cargo Público"
                            type="text"
                            placeholder="Cargo"
                            error={error?.message}
                            required
                          />
                        )}
                      />

                      <div className="md:col-span-2">
                        <Controller
                          name={`pepsDirectos.${index}.razonesExtranjero`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                En caso de ser un cargo en el extranjero,
                                ¿Cuáles son las razones por las que decidió
                                celebrar operaciones en México?
                              </label>
                              <textarea
                                {...field}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                                placeholder="Razones (opcional)"
                              />
                              {error && (
                                <p className="text-sm text-red-600">
                                  {error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Calidad de PEP Nacional?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={`pepsDirectos.${index}.pepNacional`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === true}
                                  onChange={() => onChange(true)}
                                  className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === false}
                                  onChange={() => onChange(false)}
                                  className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm">No</span>
                              </label>
                            </div>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Calidad de PEP Extranjera?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={`pepsDirectos.${index}.pepExtranjero`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === true}
                                  onChange={() => onChange(true)}
                                  className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === false}
                                  onChange={() => onChange(false)}
                                  className="w-4 h-4 text-primary-600"
                                />
                                <span className="text-sm">No</span>
                              </label>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pepDirectosFields.length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                  <User className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">
                    No hay PEP directos agregados. Agrega al menos uno.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        {/* SECCIÓN B: PEP RELACIONADOS */}
        <div className="space-y-6 border-t border-gray-200 pt-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              ¿Algún fideicomitente, fideicomisario, delegado fiduciario o
              miembro del comité técnico está relacionado con una persona que
              desempeña/ó (hace 1 año) algún cargo público nacional o
              internacional? <span className="text-red-500">*</span>
            </label>
            <Controller
              name="tienePEPRelacionado"
              control={control}
              render={({
                field: { value, onChange },
                fieldState: { error },
              }) => (
                <div className="space-y-2">
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === true}
                        onChange={() => onChange(true)}
                        className="w-4 h-4 text-secondary-600 border-gray-300 focus:ring-secondary-500"
                      />
                      <span className="text-sm text-gray-700">Sí</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        checked={value === false}
                        onChange={() => onChange(false)}
                        className="w-4 h-4 text-secondary-600 border-gray-300 focus:ring-secondary-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                  {error && (
                    <p className="text-sm text-red-600">{error.message}</p>
                  )}
                </div>
              )}
            />
          </div>

          {tienePEPRelacionado && (
            <>
              <button
                type="button"
                onClick={agregarPepRelacionado}
                className="flex items-center gap-2 px-4 py-2 bg-secondary-600 text-white rounded-lg hover:bg-secondary-700 transition-colors"
              >
                <Plus className="w-4 h-4" />
                Agregar PEP Relacionado
              </button>

              <div className="space-y-4">
                {pepRelacionadosFields.map((field, index) => (
                  <div
                    key={field.id}
                    className="border border-gray-200 rounded-xl p-6 bg-gray-50"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-md font-semibold text-gray-700 flex items-center gap-2">
                        <Users className="w-5 h-5 text-secondary-600" />
                        PEP Relacionado {index + 1}
                      </h4>
                      <button
                        type="button"
                        onClick={() => removePepRelacionado(index)}
                        className="text-red-600 hover:text-red-800 transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Controller
                        name={`pepsRelacionados.${index}.nombreCompleto`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre Completo"
                            type="text"
                            placeholder="Nombre completo"
                            icon={User}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.participacion`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Participación en el Fideicomiso"
                            type="text"
                            placeholder="Ej: Fideicomitente"
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.relacion`}
                        control={control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <SelectMultiple
                            options={RELACIONES}
                            onSelect={s => onChange((s as any)?.id)}
                            placeholder="Relación"
                            label="Relación"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.institucion`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Nombre de la Institución Pública"
                            type="text"
                            placeholder="Nombre de la institución"
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.nivel`}
                        control={control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <SelectMultiple
                            options={NIVELES}
                            onSelect={s => onChange((s as any)?.id)}
                            placeholder="Nivel"
                            label="Nivel"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.pais`}
                        control={control}
                        render={({
                          field: { onChange },
                          fieldState: { error },
                        }) => (
                          <SelectMultiple
                            options={PAISES}
                            onSelect={s => onChange((s as any)?.id)}
                            placeholder="País"
                            label="País donde desempeña/ó el cargo"
                            labelKey="nombre"
                            valueKey="id"
                            multiple={false}
                            error={error?.message}
                            required
                          />
                        )}
                      />
                      <Controller
                        name={`pepsRelacionados.${index}.cargo`}
                        control={control}
                        render={({ field, fieldState: { error } }) => (
                          <MessageToasty
                            {...field}
                            label="Cargo Público"
                            type="text"
                            placeholder="Cargo"
                            error={error?.message}
                            required
                          />
                        )}
                      />

                      <div className="md:col-span-2">
                        <Controller
                          name={`pepsRelacionados.${index}.razonesExtranjero`}
                          control={control}
                          render={({ field, fieldState: { error } }) => (
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-1">
                                En caso de ser un cargo en el extranjero,
                                ¿Cuáles son las razones por las que decidió
                                celebrar operaciones en México?
                              </label>
                              <textarea
                                {...field}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-secondary-500"
                                placeholder="Razones (opcional)"
                              />
                              {error && (
                                <p className="text-sm text-red-600">
                                  {error.message}
                                </p>
                              )}
                            </div>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Calidad de PEP Nacional?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={`pepsRelacionados.${index}.pepNacional`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === true}
                                  onChange={() => onChange(true)}
                                  className="w-4 h-4 text-secondary-600"
                                />
                                <span className="text-sm">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === false}
                                  onChange={() => onChange(false)}
                                  className="w-4 h-4 text-secondary-600"
                                />
                                <span className="text-sm">No</span>
                              </label>
                            </div>
                          )}
                        />
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          ¿Calidad de PEP Extranjera?{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Controller
                          name={`pepsRelacionados.${index}.pepExtranjero`}
                          control={control}
                          render={({ field: { value, onChange } }) => (
                            <div className="flex gap-4">
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === true}
                                  onChange={() => onChange(true)}
                                  className="w-4 h-4 text-secondary-600"
                                />
                                <span className="text-sm">Sí</span>
                              </label>
                              <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                  type="radio"
                                  checked={value === false}
                                  onChange={() => onChange(false)}
                                  className="w-4 h-4 text-secondary-600"
                                />
                                <span className="text-sm">No</span>
                              </label>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {pepRelacionadosFields.length === 0 && (
                <div className="text-center py-6 text-gray-500 bg-gray-50 rounded-lg">
                  <Users className="w-10 h-10 mx-auto mb-2 text-gray-400" />
                  <p className="text-sm">
                    No hay PEP relacionados agregados. Agrega al menos uno.
                  </p>
                </div>
              )}
            </>
          )}
        </div>

        <div className="bg-sky-50 border border-sky-200 rounded-lg p-4">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-sky-600 shrink-0 mt-0.5" />
            <div className="text-sm text-sky-800">
              <p className="font-semibold mb-1">Información sobre PEP</p>
              <p>
                Las Personas Políticamente Expuestas (PEP) son aquellas que
                desempeñan o han desempeñado funciones públicas destacadas.
                Incluye tanto a PEP directos como a sus familiares y
                colaboradores cercanos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
});

PEP.displayName = "PEP";

export default PEP;
