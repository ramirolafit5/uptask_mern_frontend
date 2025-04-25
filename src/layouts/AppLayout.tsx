import { Link, Outlet, useNavigate } from "react-router-dom"
import Logo from "@/components/Logo"
import NavMenu from "@/components/NavMenu"
import { ToastContainer } from 'react-toastify'
import { useAuth } from "@/hooks/useAuth"

export default function AppLayout() {

    const { data, isError, isLoading } = useAuth()
    console.log(data)

    const navigate = useNavigate()

    if (isLoading) return 'Cargando maquinen..'
    if (isError) {
        navigate('/auth/login')
        return
    }

    return (
        <>
            <header className="bg-gray-800 py-5">
                <div className="max-w-screen-2xl mx-auto flex flex-col lg:flex-row justify-between items-center">
                    <div className="w-64">
                        <Link to={'/'}>
                            <Logo />
                        </Link>
                    </div>
                    <NavMenu />

                </div>
            </header>

            <section className="max-w-screen-2xl mx-auto mt-10 p-5">
                <Outlet />
            </section>

            <footer className="py-5">
                <p className="text-center">
                    Todos los derechos reservados {new Date().getFullYear()}
                </p>
            </footer>

            <ToastContainer
                /* esto es para que cuando tengamos el mouse arriba de la notificacion no se frene */
                pauseOnFocusLoss={false}
                pauseOnHover={false}
            />

        </>
    )
}
