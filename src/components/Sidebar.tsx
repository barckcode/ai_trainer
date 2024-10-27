'use client'

import { Fragment } from 'react'
import Link from 'next/link'
import { Dialog, Transition } from '@headlessui/react'
import { HomeIcon, FireIcon, DocumentTextIcon, ChatBubbleLeftRightIcon, XMarkIcon, UserCircleIcon } from '@heroicons/react/24/outline'

interface SidebarProps {
    sidebarOpen: boolean
    setSidebarOpen: (open: boolean) => void
    userModalOpen: boolean
    setUserModalOpen: (open: boolean) => void
}

const navigation = [
    { name: 'Home', href: '/', icon: HomeIcon },
    { name: 'Exercises', href: '#', icon: FireIcon },
    { name: 'Workouts', href: '#', icon: DocumentTextIcon },
    { name: 'AI Trainer', href: '/chat', icon: ChatBubbleLeftRightIcon },
]

export function Sidebar({ sidebarOpen, setSidebarOpen, userModalOpen, setUserModalOpen }: SidebarProps) {
    return (
        <>
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
                        <Link
                            key={item.name}
                            href={item.href}
                            className="group flex items-center px-2 py-2 text-base font-medium rounded-md text-[#e5f0ff] hover:bg-[#6c62ff] hover:text-white"
                        >
                            <item.icon className="mr-4 h-6 w-6 flex-shrink-0 text-[#e5f0ff]" aria-hidden="true" />
                            {item.name}
                        </Link>
                        ))}
                    </nav>
                    </div>
                    <div className="flex flex-shrink-0 border-t border-[#e5f0ff] p-4">
                    <button
                        className="group block flex-shrink-0 w-full"
                        onClick={() => setUserModalOpen(true)}
                    >
                        <div className="flex items-center">
                        <div>
                            <UserCircleIcon className="inline-block h-10 w-10 rounded-full text-[#e5f0ff]" />
                        </div>
                        <div className="ml-3">
                            <p className="text-base font-medium text-[#e5f0ff]">User</p>
                            <p className="text-sm font-medium text-[#6c62ff] group-hover:text-[#e5f0ff]">View profile</p>
                        </div>
                        </div>
                    </button>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
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
                    <Link
                    key={item.name}
                    href={item.href}
                    className="group flex items-center px-2 py-2 text-sm font-medium rounded-md text-[#e5f0ff] hover:bg-[#6c62ff] hover:text-white"
                    >
                    <item.icon className="mr-3 h-6 w-6 flex-shrink-0 text-[#e5f0ff]" aria-hidden="true" />
                    {item.name}
                    </Link>
                ))}
                </nav>
            </div>
            <div className="flex flex-shrink-0 border-t border-[#e5f0ff] p-4">
                <button
                className="group block w-full flex-shrink-0"
                onClick={() => setUserModalOpen(true)}
                >
                <div className="flex items-center">
                    <div>
                    <UserCircleIcon className="inline-block h-9 w-9 rounded-full text-[#e5f0ff]" />
                    </div>
                    <div className="ml-3">
                    <p className="text-sm font-medium text-[#e5f0ff]">User</p>
                    <p className="text-xs font-medium text-[#6c62ff] group-hover:text-[#e5f0ff]">View profile</p>
                    </div>
                </div>
                </button>
            </div>
            </div>
        </div>
        </>
    )
}
