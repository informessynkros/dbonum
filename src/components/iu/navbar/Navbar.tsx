import { Bell, Search, User } from "lucide-react"


const Navbar = () => {
  return (
    <nav className="h-20 px-8">
      <div className="h-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 flex items-center justify-center">
            <img src="/logo_dbonum_v2.png" alt="Logo DBonum" />
          </div>
          
          <div>
            <h1 className="text-lg font-semibold text-dark">
              Bienvenido, Iván
            </h1>
            <p className="text-sm text-gray-500">
              Explore information and activity about your property
            </p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          {/* Search Icon */}
          <button className="p-2 hover:bg-primary-50 rounded-full transition-colors cursor-pointer">
            <Search className="w-5 h-5 text-primary-600" />
          </button>

          <button className="p-2 hover:bg-primary-50 rounded-full transition-colors relative cursor-pointer">
            <Bell className="w-5 h-5 text-primary-600" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-primary-light rounded-full" />
          </button>

          <button className="w-10 h-10 rounded-full bg-primary-600 flex items-center justify-center hover:bg-primary-700 transition-colors shadow-sm cursor-pointer">
            <User className="w-5 h-5 text-white" />
          </button>
        </div>
      </div>
    </nav>
  )
}

export default Navbar