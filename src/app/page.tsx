'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Home() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkSession = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
            router.push('/auth')
            } else {
            setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Error checking session:', error)
            router.push('/auth')
        } finally {
            setIsLoading(false)
        }
        }

        checkSession()
    }, [router])

    const handleLogout = async () => {
        try {
        setIsLoading(true)
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        router.push('/auth')
        } catch (error) {
        console.error('Error al cerrar sesión:', error)
        }
    }

    if (isLoading) {
        return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-accent"></div>
        </div>
        )
    }

    if (!isAuthenticated) {
        return null
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-8">
        <h1 className="text-4xl font-bold">Bienvenido a AI Trainer</h1>

        <button
            onClick={handleLogout}
            className="px-6 py-2 text-white bg-accent rounded-md hover:bg-opacity-90 transition-colors"
        >
            Cerrar Sesión
        </button>
        </div>
    )
}
