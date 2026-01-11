import gsap from "gsap"
import { Plus, Trash2 } from "lucide-react"
import { useState, type ReactNode } from "react"


interface DynamicListProps<T> {
  items: T[]
  onChange: (items: T[]) => void
  renderItem: (item: T, index: number, updateItem: (index: number, item: T) => void) => ReactNode
  emptyItem: T
  title?: string
  addButtonText?: string
  minItems?: number
  maxItems?: number
  error?: string
}

function DynamicList<T> ({
  items,
  onChange,
  renderItem,
  emptyItem,
  title,
  addButtonText = 'Agregar item',
  minItems = 1,
  maxItems = 10,
  error
}: DynamicListProps<T>) {

  const [localItems, setLocalItems] = useState(
    items.length > 0 ? items : [emptyItem]
  )

  // Sincronizar con items externos
  const updateParent = (newItems: T[]) => {
    setLocalItems(newItems)
    onChange(newItems)
  }

  const addItem = () => {
    if (localItems.length >= maxItems) {
      alert(`Máximo ${maxItems} items permitidos`)
      return
    }

    const newItems = [...localItems, emptyItem]
    updateParent(newItems)

    // Animación de entrada
    setTimeout(() => {
      const newElement = document.querySelector(`[data-dynamic-item-index="${localItems.length}"]`)
      if (newElement) {
        gsap.fromTo(newElement,
          { opacity: 0, y: -10, scale: 0.95 },
          { opacity: 1, y: 0, scale: 1, duration: 0.3, ease: 'back.out(1.5)' }
        )
      }
    }, 0)
  }

  const removeItem = (index: number) => {
    if (localItems.length <= minItems) {
      alert(`Mínimo ${minItems} item(s) requerido(s)`)
      return
    }

    const element = document.querySelector(`[data-dynamic-item-index="${index}"]`)
    
    if (element) {
      gsap.to(element, {
        opacity: 0,
        x: -20,
        scale: 0.9,
        duration: 0.2,
        ease: 'power2.in',
        onComplete: () => {
          const newItems = localItems.filter((_, i) => i !== index)
          updateParent(newItems)
        }
      })
    } else {
      const newItems = localItems.filter((_, i) => i !== index)
      updateParent(newItems)
    }
  }

  const updateItem = (index: number, item: T) => {
    const newItems = [...localItems]
    newItems[index] = item
    updateParent(newItems)
  }

  return (
    <div className="space-y-4">
      {/* Header con título opcional */}
      {title && (
        <h3 className="text-lg font-semibold text-dark">{title}</h3>
      )}

      {/* Error general */}
      {error && (
        <div className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </div>
      )}

      {/* Lista de items */}
      <div className="space-y-4">
        {localItems.map((item, index) => (
          <div
            key={index}
            data-dynamic-item-index={index}
            className="relative bg-gray-50 border border-gray-200 rounded-xl p-4"
          >
            {/* Botón eliminar (solo si hay más de minItems) */}
            {localItems.length > minItems && (
              <button
                type="button"
                onClick={() => removeItem(index)}
                className="
                  absolute top-4 right-4 z-10
                  flex items-center justify-center w-8 h-8
                  bg-red-50 hover:bg-red-100 text-red-600
                  rounded-lg transition-all duration-200
                  hover:scale-110 active:scale-95
                "
                onMouseEnter={e => {
                  gsap.to(e.currentTarget, {
                    rotate: 90,
                    duration: 0.2,
                    ease: 'power2.out'
                  })
                }}
                onMouseLeave={e => {
                  gsap.to(e.currentTarget, {
                    rotate: 0,
                    duration: 0.2,
                    ease: 'power2.out'
                  })
                }}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}

            {/* Número del item */}
            <div className="text-xs font-semibold text-gray-500 mb-3">
              Item #{index + 1}
            </div>

            {/* Contenido del item (renderizado por el padre) */}
            <div className="pr-10">
              {renderItem(item, index, updateItem)}
            </div>
          </div>
        ))}
      </div>

      {/* Botón agregar */}
      {localItems.length < maxItems && (
        <button
          type="button"
          onClick={addItem}
          className="
            w-full flex items-center justify-center gap-2 px-4 py-3
            bg-primary-50 hover:bg-primary-100 text-primary-700
            rounded-lg transition-all duration-200 font-medium text-sm
            border-2 border-dashed border-primary-300 hover:border-primary-400
            hover:scale-[1.02] active:scale-95
          "
          onMouseEnter={e => {
            gsap.to(e.currentTarget.querySelector('svg'), {
              rotate: 180,
              duration: 0.3,
              ease: 'back.out(1.5)'
            })
          }}
          onMouseLeave={e => {
            gsap.to(e.currentTarget.querySelector('svg'), {
              rotate: 0,
              duration: 0.3,
              ease: 'back.out(1.5)'
            })
          }}
        >
          <Plus className="w-5 h-5" />
          {addButtonText}
        </button>
      )}

      {/* Contador de items */}
      <div className="text-xs text-gray-500 text-center">
        {localItems.length} de {maxItems} items
        {minItems > 0 && ` (mínimo ${minItems})`}
      </div>
    </div>
  )
}

export default DynamicList