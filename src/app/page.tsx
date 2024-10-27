'use client'

import { DashboardLayout } from './dashboard-layout'

export default function Home() {
    return (
        <DashboardLayout>
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
                <div className="h-96 rounded-lg border-4 border-dashed border-gray-700 flex items-center justify-center">
                <h1 className="text-4xl font-bold text-[#e5f0ff]">Welcome to AI Trainer</h1>
                </div>
            </div>
            </div>
        </div>
        </DashboardLayout>
    )
}
