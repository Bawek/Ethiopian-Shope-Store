'use client'

import { useLogoutMutation } from "@/lib/features/auth/accountApi"
import { logOut } from "@/lib/features/auth/accountSlice"
import { useDispatch } from "react-redux"
import { toast } from "react-toastify"
import { useCallback } from "react"
import { useRouter } from "next/navigation"

export const useLogout = () => {
    const dispatch = useDispatch()
    const [logout] = useLogoutMutation()
    const router = useRouter()
    const handleLogout = useCallback(async () => {
        const toastId = toast.loading("Logging out...")
        try {
            await logout().unwrap()

            dispatch(logOut())
            toast.update(toastId, {
                render: "Successfully logged out!",
                type: "success",
                isLoading: false,
                autoClose: 3000
            })
            router.push('/customers/auth/login')
        } catch (error) {
            const errorMessage = getErrorMessage(error)

            console.error("Logout failed:", error)
            toast.update(toastId, {
                render: errorMessage,
                type: "error",
                isLoading: false,
                autoClose: 5000
            })
        }
    }, [dispatch, logout])

    return handleLogout
}

// Error handling utility
function getErrorMessage(error) {
    if (typeof error === 'object' && error !== null) {
        // Handle RTK Query error format
        if ('status' in error) {
            // Network errors
            if (error.status === 'FETCH_ERROR') {
                return "Network error. Please check your internet connection."
            }
            // Server errors
            if (error.originalStatus) {
                switch (error.originalStatus) {
                    case 401:
                        return "Session expired. Please log in again."
                    case 500:
                        return "Server error. Please try again later."
                    default:
                        return error.data?.message || "An unexpected error occurred."
                }
            }
        }

        // Handle standard Error objects
        if ('message' in error) {
            return error.message
        }
    }

    return "Logout failed. Please try again."
}