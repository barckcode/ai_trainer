import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
    const res = NextResponse.next()

    try {
        const supabase = createMiddlewareClient({ req, res })
        const { data: { session } } = await supabase.auth.getSession()
        const pathname = req.nextUrl.pathname

        // Si el usuario no está autenticado y no está en /auth
        if (!session && pathname !== '/auth') {
        return NextResponse.redirect(new URL('/auth', req.url))
        }

        // Si el usuario está autenticado y está en /auth
        if (session && pathname === '/auth') {
        return NextResponse.redirect(new URL('/', req.url))
        }

        return res
    } catch (error) {
        console.error('Error in middleware:', error)
        return res
    }
}

export const config = {
    matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)']
}
