'use client'

import { useState, Fragment } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { AuthGuard } from '@/components/AuthGuard'
import { Dialog, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon, UserCircleIcon, CogIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

export default function Home() {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const handleLogout = async () => {
        try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/auth')
        } catch (error) {
        console.error('Error al cerrar sesión:', error)
        }
    }

    const navigation = [
        { name: 'Ejercicios', href: '#', icon: Bars3Icon },
        { name: 'Entrenamientos', href: '#', icon: Bars3Icon },
        { name: 'AI Trainer', href: '#', icon: Bars3Icon },
    ]

    return (
        <AuthGuard>
        <div className="flex h-screen bg-[#000814]">
            {/* Sidebar for mobile */}
            <Transition.Root show={sidebarOpen} as={Fragment}>
            <Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
                <Transition.Child
                as={Fragment}
                enter="transition-opacity ease-linear duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="transition-opacity ease-linear duration-300"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-600 bg-opacity-75" />
                </Transition.Child>

                <div className="fixed inset-0 z-40 flex">
                <Transition.Child
                    as={Fragment}
                    enter="transition ease-in-out duration-300 transform"
                    enterFrom="-translate-x-full"
                    enterTo="translate-x-0"
                    leave="transition ease-in-out duration-300 transform"
                    leaveFrom="translate-x-0"
                    leaveTo="-translate-x-full"
                >
                    <Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-[#000814]">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-in-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in-out duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="absolute top-0 right-0 -mr-12 pt-2">
                        <button
                            type="button"
                            className="ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={() => setSidebarOpen(false)}
                        >
                            <span className="sr-only">Close sidebar</span>
                            <XMarkIcon className="h-6 w-6 text-white" aria-hidden="true" />
                        </button>
                        </div>
                    </Transition.Child>
                    <div className="h-0 flex-1 overflow-y-auto pt-5 pb-4">
                        <div className="flex flex-shrink-0 items-center px-4">
                        <h1 className="text-xl font-bold text-[#e5f0ff]">AI Trainer</h1>
                        </div>
                        <nav className="mt-5 space-y-1 px-2">
                        {navigation.map((item) => (
                            <a
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-[#e5f0ff] hover:bg-[#6c62ff] hover:text-white"
                            >
                            <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-[#e5f0ff]" aria-hidden="true" />
                            {item.name}
                            </a>
                        ))}
                        </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-[#e5f0ff] p-4">
                        <a href="#" className="group block flex-shrink-0" onClick={() => setUserModalOpen(true)}>
                        <div className="flex items-center">
                            <div>
                            <UserCircleIcon className="inline-block h-10 w-10 rounded-full text-[#e5f0ff]" />
                            </div>
                            <div className="ml-3">
                            <p className="text-base font-medium text-[#e5f0ff]">Usuario</p>
                            <p className="text-sm font-medium text-[#6c62ff] group-hover:text-[#e5f0ff]">Ver perfil</p>
                            </div>
                        </div>
                        </a>
                    </div>
                    </Dialog.Panel>
                </Transition.Child>
                <div className="w-14 flex-shrink-0" aria-hidden="true">
                    {/* Force sidebar to shrink to fit close icon */}
                </div>
                </div>
            </Dialog>
            </Transition.Root>

            {/* Static sidebar for desktop */}
            <div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
            <div className="flex min-h-0 flex-1 flex-col bg-[#000814]">
                <div className="flex h-16 flex-shrink-0 items-center bg-[#000814] px-4">
                <h1 className="text-xl font-bold text-[#e5f0ff]">AI Trainer</h1>
                </div>
                <div className="flex flex-1 flex-col overflow-y-auto">
                <nav className="flex-1 space-y-1 px-2 py-4">
                    {navigation.map((item) => (
                    <a
                        key={item.name}
                        href={item.href}
                        className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#e5f0ff] hover:bg-[#6c62ff] hover:text-white"
                    >
                        <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-[#e5f0ff]" aria-hidden="true" />
                        {item.name}
                    </a>
                    ))}
                </nav>
                </div>
                <div className="flex flex-shrink-0 border-t border-[#e5f0ff] p-4">
                <a href="#" className="group block w-full flex-shrink-0" onClick={() => setUserModalOpen(true)}>
                    <div className="flex items-center">
                    <div>
                        <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-[#e5f0ff]" />
                    </div>
                    <div className="ml-3">
                        <p className="text-sm font-medium text-[#e5f0ff]">Usuario</p>
                        <p className="text-xs font-medium text-[#6c62ff] group-hover:text-[#e5f0ff]">Ver perfil</p>
                    </div>
                    </div>
                </a>
                </div>
            </div>
            </div>

            {/* Main content */}
            <div className="flex flex-1 flex-col md:pl-64">
            <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-[#000814] shadow">
                <button
                type="button"
                className="border-r border-gray-700 px-4 text-[#e5f0ff] focus:outline-none focus:ring-2 focus:ring-inset focus:ring-[#6c62ff] md:hidden"
                onClick={() => setSidebarOpen(true)}
                >
                <span className="sr-only">Open sidebar</span>
                <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                </button>
                <div className="flex flex-1 justify-between px-4">
                <div className="flex flex-1">
                    <h1 className="text-2xl font-semibold text-[#e5f0ff] self-center">Dashboard</h1>
                </div>
                </div>
            </div>

            <main className="flex-1">
                <div className="py-6">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
                    <div className="py-4">
                    <div className="h-96 rounded-lg border-4 border-dashed border-gray-700 flex items-center justify-center">
                        <h1 className="text-4xl font-bold text-[#e5f0ff]">Bienvenido a AI Trainer</h1>
                    </div>
                    </div>
                </div>
                </div>
            </main>
            </div>

            {/* User modal */}
            <Transition.Root show={userModalOpen} as={Fragment}>
            <Dialog as="div" className="relative z-50" onClose={setUserModalOpen}>
                <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
                >
                <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 z-10 overflow-y-auto">
                <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                    <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    enterTo="opacity-100 translate-y-0 sm:scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                    leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                    <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-[#000814] px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                        <div>
                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#6c62ff]">
                            <UserCircleIcon className="h-6 w-6 text-[#e5f0ff]" aria-hidden="true" />
                        </div>
                        <div className="mt-3 text-center sm:mt-5">
                            <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-[#e5f0ff]">
                            Perfil de Usuario
                            </Dialog.Title>
                            <div className="mt-2">
                            <p className="text-sm text-gray-400">
                                Gestiona la configuración y preferencias de tu cuenta aquí.
                            </p>
                            </div>
                        </div>
                        </div>
                        <div className="mt-5 sm:mt-6 space-y-2">
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#6c62ff] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#5a51e0] focus:outline-none focus:ring-2 focus:ring-[#6c62ff] focus:ring-offset-2 sm:text-sm"
                            onClick={() => setUserModalOpen(false)}
                        >
                            <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            Configuración del Perfil
                        </button>
                        <button
                            type="button"
                            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                            onClick={() => {
                            handleLogout()
                            setUserModalOpen(false)
                            }}
                        >
                            <ArrowRightStartOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                            Cerrar Sesión
                        </button>
                        </div>
                    </Dialog.Panel>
                    </Transition.Child>
                </div>
                </div>
            </Dialog>
            </Transition.Root>
        </div>
        </AuthGuard>
    )
}