'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

interface AuthGuardProps {
    children: React.ReactNode
}

export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true)
    const [isAuthenticated, setIsAuthenticated] = useState(false)

    useEffect(() => {
        const checkAuth = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession()
            if (!session) {
            router.replace('/auth')
            } else {
            setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Error checking auth:', error)
            router.replace('/auth')
        } finally {
            setIsLoading(false)
        }
        }

        checkAuth()
    }, [router])

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

    return <>{children}</>
}
