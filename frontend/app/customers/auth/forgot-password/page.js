'use client'

import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useRequirePasswordChangeMutation } from '@/lib/features/auth/accountApi'

const PasswordReset = () => {
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')
  const [requirePasswordChange, { isLoading }] = useRequirePasswordChangeMutation()

  const validateEmail = (email) => {
    if (!email) return 'Email is required'
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return 'Please enter a valid email address'
    return ''
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const validationError = validateEmail(email)
    if (validationError) {
      setError(validationError)
      toast.error(validationError)
      return
    }

    setError('')
    try {
      const response = await requirePasswordChange(email).unwrap()
      if (response.status === 'success') {
        toast.success('Password reset link sent to your email!')
      }
    } catch (err) {
      console.error('Password reset error:', error)
      const errorMsg = error.data?.message || 'Failed to send reset link'
      setError(errorMsg)
      toast.error(errorMsg)
    }
  }

  return (
    <>
      <div className="w-full min-h-screen flex justify-center items-center bg-gray-100">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-6 p-8 rounded-lg shadow-lg bg-white max-w-md w-full"
          noValidate
        >
          <h2 className="text-2xl font-bold text-center text-gray-800">
            Password Reset
          </h2>
          <p className="text-gray-600 text-center text-sm leading-relaxed">
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {error && (
            <p className="text-red-500 text-center font-medium">{error}</p>
          )}

          <div className="flex flex-col gap-4">
            <input
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              onChange={(e) => setEmail(e.target.value.trim())}
              value={email}
              placeholder="Enter Your Email"
              type="email"
              name="email"
              autoComplete="email"
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 text-white rounded-lg transition duration-200 ${isLoading ? 'bg-gray-400 cursor-not-allowed' : 'bg-orange-500 hover:bg-orange-600'
                }`}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default PasswordReset