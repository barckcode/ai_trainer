'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Sidebar } from '@/components/Sidebar'
import { UserModal } from '@/components/UserModal'
import { AuthGuard } from '@/components/AuthGuard'

interface DashboardLayoutProps {
    children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
    const router = useRouter()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [userModalOpen, setUserModalOpen] = useState(false)

    const handleLogout = async () => {
        try {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/auth')
        } catch (error) {
        console.error('Error signing out:', error)
        }
    }

    return (
        <AuthGuard>
        <div className="flex h-screen bg-[#000814]">
            <Sidebar
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
            userModalOpen={userModalOpen}
            setUserModalOpen={setUserModalOpen}
            />

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
                {children}
            </main>
            </div>

            <UserModal
            isOpen={userModalOpen}
            setIsOpen={setUserModalOpen}
            onLogout={handleLogout}
            />
        </div>
        </AuthGuard>
    )
}
