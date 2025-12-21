import { FileText, Layers, Settings, type LucideIcon } from "lucide-react"
import Tooltip from "../tooltip/Tooltip"
import useNavigation from "@/hooks/useNavigation"
import { useLocation } from "@tanstack/react-router"


interface NavItemsProps {
  icon: LucideIcon,
  label: string
  isActive?: boolean
  onClick?: () => void
}

const NavItem = ({ icon: Icon, label, isActive = false, onClick }: NavItemsProps) => {
  return (
    <Tooltip 
      content={label}
      position="right"
    >
      <button
        onClick={onClick}
        className={`
          w-full flex items-center justify-center p-3 rounded-xl transition-all duration-200
          ${isActive
            ? 'bg-primary-50 text-primary-600 shadow-sm'
            : 'text-gray-600 hover:bg-gray-100'
          }
        `}
      >
        {Icon && (
          <Icon />
        )}
      </button>
    </Tooltip>
  )
}

const Sidebar = () => {

  // Hook
  const { goView } = useNavigation()
  const location = useLocation()


  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/')
  }

  return (
    <aside 
      className="fixed left-8 bg-white rounded-3xl shadow-lg z-30"
      style={{
        top: '120px',
        bottom: '40px',
        width: '80px'
      }}
    >
      <div className="h-full flex flex-col py-6">

        <nav className="flex-1 px-4">
          <div className="space-y-2">
            <NavItem
              icon={Layers}
              label="Panel de control"
              isActive={isActive('/home')}
              onClick={() => goView('/home')}
            />
            
            <NavItem
              icon={FileText}
              label="Formularios"
              isActive={isActive('/forms')}
              onClick={() => goView('/forms')}
            />
          </div>
        </nav>

        <div className="px-4 mt-auto">
          <NavItem
            icon={Settings}
            label="Configuración"
            isActive={isActive('/settings')}
            onClick={() => goView('/settings')}
          />
        </div>
      </div>
    </aside>
  )
}

export default Sidebar