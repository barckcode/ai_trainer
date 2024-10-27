'use client'

import { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { UserCircleIcon, CogIcon, ArrowRightStartOnRectangleIcon } from '@heroicons/react/24/outline'

interface UserModalProps {
    isOpen: boolean
    setIsOpen: (open: boolean) => void
    onLogout: () => void
}

export function UserModal({ isOpen, setIsOpen, onLogout }: UserModalProps) {
    return (
        <Transition.Root show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={setIsOpen}>
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
                        User Profile
                        </Dialog.Title>
                        <div className="mt-2">
                        <p className="text-sm text-gray-400">
                            Account Settings
                        </p>
                        </div>
                    </div>
                    </div>
                    <div className="mt-5 sm:mt-6 space-y-2">
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-[#6c62ff] px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-[#5a51e0] focus:outline-none focus:ring-2 focus:ring-[#6c62ff] focus:ring-offset-2 sm:text-sm"
                        onClick={() => setIsOpen(false)}
                    >
                        <CogIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                        Profile Settings
                    </button>
                    <button
                        type="button"
                        className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-600 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:text-sm"
                        onClick={() => {
                        onLogout()
                        setIsOpen(false)
                        }}
                    >
                        <ArrowRightStartOnRectangleIcon className="mr-2 h-5 w-5" aria-hidden="true" />
                        Sign Out
                    </button>
                    </div>
                </Dialog.Panel>
                </Transition.Child>
            </div>
            </div>
        </Dialog>
        </Transition.Root>
    )
}