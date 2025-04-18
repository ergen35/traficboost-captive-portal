import { MotionLink } from '@/components'
import { createFileRoute } from '@tanstack/react-router'
import { motion } from 'motion/react'
import { useState, useEffect } from 'react'
import Countdown from 'react-countdown'

export const Route = createFileRoute('/')({
    component: ComingSoon,
    head: () => ({
        meta: [
            {
                name: 'description',
                content: 'TraficBoost360',
            },
            {
                title: 'TraficBoost360 - Bienvenue',
                description: 'TraficBoost360 - Bienvenue',
            }
        ],
    })
})

function ComingSoon() {
    const [participants, setParticipants] = useState(0)

    // Simulate fetching the number of participants
    useEffect(() => {
        // Replace this with an actual API call
        const fetchParticipants = async () => {
            const totalParticipants = 1234 // Example number
            setParticipants(totalParticipants)
        }
        fetchParticipants()
    }, [])

    // Countdown renderer
    const renderer = ({ days, hours, minutes, seconds }: any) => {
        return (
            <div className="text-white text-2xl font-mono italic font-semibold">
                {days}J {hours}h {minutes}min. {seconds}s
            </div>
        )
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#31c092] via-[#0067b0] to-[#011e7a] [view-transition-name:main-content]">
            {/* Glass effect */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>

            <div className="relative z-10 flex flex-col items-center text-center p-6 max-w-lg mx-auto">
                {/* Welcome Message */}
                <motion.h1
                    animate={{ opacity: [0, 1], y: [-50, 0] }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="text-2xl md:text-2xl font-bold text-white mb-8">
                    Bienvenue sur TraficBoost-360
                </motion.h1>

                <div className='flex flex-col items-center justify-center gap-4'>
                    <span className='text-lg text-white font-bold'>Lancement le 17/05/2025</span>
                    <span className='text-lg text-white font-bold'> </span>
                    {/* Countdown */}
                    <Countdown
                        date={new Date("2025-05-17")} // Example: 3 days from now
                        renderer={renderer}
                    />
                </div>

                {/* Add spacing */}
                <div className="my-8"></div>

                {/* Call to Action Button */}
                <MotionLink
                    to='/join-waiting-list'
                    animate={{ scale: [0.8, 1] }}
                    transition={{ duration: 0.5, delay: 0.5, ease: "easeOut" }}
                    viewTransition={{ types: ['slide-right'] }}
                    className="px-8 py-4 bg-white text-purple-600 font-semibold text-lg rounded-lg shadow-lg hover:bg-purple-100 transition"
                >
                    Réserver ma Place
                </MotionLink>

                {/* Participants Count */}
                <p className="mt-4 text-white text-sm">
                    Déjà <span className="font-bold">{participants}</span> participants !
                </p>

                {/* Marketing Text */}
                <p className="mt-12 text-white text-lg font-light">
                    L'affiliation repensée pour vous
                </p>
            </div>
        </div>
    )
}