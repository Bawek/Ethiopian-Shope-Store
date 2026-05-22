'use client'
import React, { useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useChangePasswordMutation } from '@/lib/features/auth/accountApi'
const ResetPassword = () => {
    const [hide, setHide] = useState(true)
    const router = useRouter()
    const searchParams = useSearchParams()
    const token = searchParams.get('token')
    const [changePassword, { isLoading }] = useChangePasswordMutation()

    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    })

    const [errors, setErrors] = useState({
        password: '',
        confirmPassword: ''
    })

    const validatePassword = (password) => {
        if (!password) return 'Password is required'
        if (password.length < 8) return 'Password must be at least 8 characters'
        return ''
    }

    const validateConfirmPassword = (confirmPassword) => {
        if (confirmPassword !== formData.password) return 'Passwords do not match'
        return ''
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setFormData(prev => ({
            ...prev,
            [name]: value
        }))

        // Validate on change
        if (name === 'password') {
            setErrors(prev => ({
                ...prev,
                password: validatePassword(value),
                confirmPassword: value !== formData.confirmPassword ? 'Passwords do not match' : ''
            }))
        } else if (name === 'confirmPassword') {
            setErrors(prev => ({
                ...prev,
                confirmPassword: validateConfirmPassword(value)
            }))
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        // Final validation
        const passwordError = validatePassword(formData.password)
        const confirmError = validateConfirmPassword(formData.confirmPassword)

        setErrors({
            password: passwordError,
            confirmPassword: confirmError
        })

        if (passwordError || confirmError || !token) {
            if (!token) toast.error('Invalid reset token')
            return
        }
        try {
            const response = await changePassword({
                password: formData.password,
                token
            }).unwrap()

            if (response?.status !== 'success') {
                throw new Error(response?.message || 'Password reset failed')
            }

            toast.success(response.message || 'Password reset successfully!')
            router.push('/customers/auth/login')
        } catch (error) {
            console.error('Password reset error:', error)
            toast.error(
                error.data?.message ||
                error.message ||
                'Failed to reset password. Please try again.'
            )
        }
    }

    const isValid = !errors.password && !errors.confirmPassword && formData.password && formData.confirmPassword

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 dark:from-gray-900 dark:to-gray-800 p-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-xl shadow-2xl border border-orange-200 dark:border-gray-700 p-8">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-orange-600 dark:text-orange-500 mb-2">
                        Reset Password
                    </h1>
                    <p className="text-gray-600 dark:text-gray-300">
                        Enter your new password below
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                New Password
                            </label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    name="password"
                                    type={hide ? 'password' : 'text'}
                                    className="w-full pr-10"
                                    placeholder="Enter your new password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                <button
                                    type="button"
                                    className="absolute right-3 top-1/3 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                    onClick={() => setHide(!hide)}
                                >
                                    {hide ? <FaEye size={18} /> : <FaEyeSlash size={18} />}
                                </button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password}</p>
                            )}
                        </div>

                        <div className="space-y-2">
                            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Confirm Password
                            </label>
                            <Input
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                className="w-full"
                                placeholder="Confirm your new password"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                            />
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-semibold bg-orange-600 hover:bg-orange-700"
                        disabled={isLoading || !isValid}
                    >
                        {isLoading ? (
                            <span className="flex items-center justify-center gap-2">
                                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                                Resetting...
                            </span>
                        ) : (
                            'Reset Password'
                        )}
                    </Button>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    Remember your password?{' '}
                    <button
                        onClick={() => router.push('/auth/login')}
                        className="font-medium text-orange-600 hover:text-orange-700 dark:text-orange-500 hover:underline"
                    >
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ResetPassword