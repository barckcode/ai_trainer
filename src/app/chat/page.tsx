'use client'

import { DashboardLayout } from '../dashboard-layout'
import { RocketLaunchIcon } from '@heroicons/react/24/outline'

export default function Chat() {
    return (
        <DashboardLayout>
        <div className="py-6">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 md:px-8">
            <div className="py-4">
                <div className="h-96 rounded-lg flex flex-col items-center justify-center gap-8">
                <RocketLaunchIcon className="h-16 w-16 text-[#6c62ff] animate-pulse" />
                <h1 className="text-3xl md:text-4xl font-bold text-[#e5f0ff] text-center">
                    Coming Soon
                </h1>
                <p className="text-lg md:text-xl text-gray-400 text-center max-w-2xl">
                    Soon you will be able to have your own virtual personal trainer powered by artificial intelligence
                </p>
                </div>
            </div>
            </div>
        </div>
        </DashboardLayout>
    )
}
