'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabase'

export default function Auth() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [isLogin, setIsLogin] = useState(true)
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault()
        setError('')
        setLoading(true)

        try {
            if (isLogin) {
                const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
                })

                if (error) throw error
                if (data.session) {
                router.push('/')
                }
            } else {
                const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
                })

                if (error) throw error
                if (data.user && !data.session) {
                    setError('Por favor, verifica tu email para completar el registro')
                } else if (data.session) {
                    router.push('/')
                }
            }
        } catch (error: any) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-primary-light">
        <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
            <h2 className="text-2xl font-bold mb-6 text-center text-primary-dark">
            {isLogin ? 'Iniciar Sesión' : 'Registrarse'}
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">
                Email
                </label>
                <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
                required
                disabled={loading}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-primary-dark mb-1">
                Contraseña
                </label>
                <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-2 border rounded-md focus:ring-accent focus:border-accent"
                required
                disabled={loading}
                />
            </div>

            {error && (
                <p className="text-red-500 text-sm">{error}</p>
            )}

            <button
                type="submit"
                className="w-full bg-accent text-white py-2 px-4 rounded-md hover:bg-opacity-90 transition-colors disabled:opacity-50"
                disabled={loading}
            >
                {loading ? 'Procesando...' : (isLogin ? 'Iniciar Sesión' : 'Registrarse')}
            </button>
            </form>

            <button
            onClick={() => setIsLogin(!isLogin)}
            className="mt-4 text-sm text-accent hover:text-opacity-80 w-full text-center"
            disabled={loading}
            >
            {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </button>
        </div>
        </div>
    )
}
