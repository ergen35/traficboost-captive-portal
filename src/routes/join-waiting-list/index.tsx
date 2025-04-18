import { createFileRoute } from '@tanstack/react-router'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect, useState } from 'react'
import { MotionLink } from '@/components'
import { getCountries } from '@/lib'


export const Route = createFileRoute('/join-waiting-list/')({
    component: JoinWaitingList,
    head: () => ({
        meta: [
            {
                name: 'description',
                content: 'TraficBoost360',
            },
            {
                title: "TraficBoost360 - Liste d'attente",
                description: "Rejoindre la liste d'attente de TraficBoost360",
            }
        ],
    })
})

// Validation schema with zod
const schema = z.object({
    fullName: z.string().min(3, 'Le nom et prénom doivent contenir au moins 3 caractères'),
    country: z.string().min(1, 'Le pays est requis'),
    whatsappNumber: z
        .string()
        .regex(/^\+?[1-9]\d{1,14}$/, 'Veuillez entrer un numéro de téléphone valide'),
})


type FormData = z.infer<typeof schema>

function JoinWaitingList() {
    const [hasJoined, setHasJoined] = useState(false);

    const countriesOptions = getCountries().map((country) => {
        return {
            value: country.code.toString(),
            label: `${country.emojiFlag}  ${country.name} (${country.callingCodes.map((c) => `+${c}`).join(', ')})`,
        }
    })

    useEffect(() => {
        const storedData = localStorage.getItem('traficboost_360')
        if (storedData) {
            const parsedData = JSON.parse(storedData)
            const joinDate = new Date(parsedData.joinDate)
            const currentDate = new Date()
            const diffInDays = (currentDate.getTime() - joinDate.getTime()) / (1000 * 60 * 60 * 24)

            // Check if the join date is within the last 3 days
            if (diffInDays <= 3) {
                setHasJoined(true)
            }
        }
    }, [])

    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<FormData>({
        resolver: zodResolver(schema),
        defaultValues: {
            country: "CM"
        }
    })

    const onSubmit = (data: FormData) => {
        console.log('Form Data:', data)

        // Save join date to localStorage
        localStorage.setItem('traficboost_360', JSON.stringify({ joinDate: new Date() }))

        toast.success('Vous avez rejoint la liste d\'attente avec succès !', {
            position: 'top-center',
            autoClose: 3000,
        })

        setHasJoined(true)
    }

    if (hasJoined) {
        return (
            <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#31c092] via-[#0067b0] to-[#011e7a]">
                {/* Glass effect */}
                <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>

                <div className="relative z-10 p-6 max-w-md w-full bg-white/20 rounded-lg shadow-lg">
                    <h1 className="text-2xl font-bold text-center text-white mb-6">
                        Vous avez déjà rejoint la liste d'attente !
                    </h1>
                    <p className="text-center text-white mb-6">
                        Merci pour votre intérêt. Nous vous tiendrons informé des prochaines étapes.
                    </p>
                    {/* Back Button */}
                    <div className="text-center">
                        <MotionLink
                            to="/"
                            viewTransition={{ types: ['slide-right'] }}
                            className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition">
                            Retour
                        </MotionLink>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-[#31c092] via-[#0067b0] to-[#011e7a]">
            {/* Glass effect */}
            <div className="absolute inset-0 bg-white/10 backdrop-blur-lg"></div>

            <div className="relative z-10 p-6 max-w-md w-full">
                {/* Title */}
                <h1 className="text-3xl font-extrabold text-center text-white mb-8">
                    TraficBoost360
                </h1>

                {/* Form Card */}
                <div className="bg-white/20 rounded-lg shadow-lg p-6">
                    <h2 className="text-2xl font-bold text-center text-white mb-6">
                        Rejoindre la liste d'attente
                    </h2>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label htmlFor="fullName" className="block text-sm font-medium text-white">
                                Nom et Prénom
                            </label>
                            <input
                                id="fullName"
                                type="text"
                                {...register('fullName')}
                                disabled={isSubmitting}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {errors.fullName && (
                                <p className="mt-1 text-sm text-red-500">{errors.fullName.message}</p>
                            )}
                        </div>

                        {/* Country */}
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-white">
                                Pays
                            </label>

                            <select
                                id="country"
                                {...register('country')}
                                disabled={isSubmitting}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {countriesOptions.map((country) => <option key={country.value} value={country.value}>{country.label}</option>)}
                                <option value="">Sélectionnez votre pays</option>
                            </select>
                            {errors.country && (
                                <p className="mt-1 text-sm text-red-500">{errors.country.message}</p>
                            )}
                        </div>

                        {/* WhatsApp Number */}
                        <div>
                            <label htmlFor="whatsappNumber" className="block text-sm font-medium text-white">
                                Numéro de téléphone (WhatsApp)
                            </label>
                            <input
                                id="whatsappNumber"
                                type="text"
                                {...register('whatsappNumber')}
                                disabled={isSubmitting}
                                className="mt-1 block w-full px-4 py-2 rounded-md bg-white/80 text-gray-800 focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
                            />
                            {errors.whatsappNumber && (
                                <p className="mt-1 text-sm text-red-500">{errors.whatsappNumber.message}</p>
                            )}
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-md shadow-md hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Joindre la liste d'attente
                        </button>
                    </form>
                </div>
            </div>

            {/* Toast Container */}
            <ToastContainer />
        </div>
    )
}
