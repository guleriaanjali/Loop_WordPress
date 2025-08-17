import React, { createContext, useContext, useEffect, useState } from 'react'
import { api } from '../utils/api'
import toast from 'react-hot-toast'

interface User {
  id: string
  email: string
  role: 'CLIENT' | 'TALENT' | 'ADMIN' | 'APPLICANT'
  talentProfile?: {
    id: string
    headline?: string
    skills: string[]
    hourlyRate?: number
    status: string
  }
  applicantProfile?: {
    id: string
    firstName?: string
    lastName?: string
    headline?: string
    skills: string[]
    status: string
    resumeUrl?: string
    videoCvUrl?: string
  }
}

interface AuthContextType {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, role?: string) => Promise<void>
  logout: () => void
  refreshUser: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      refreshUser()
    } else {
      setLoading(false)
    }
  }, [])

  const refreshUser = async () => {
    try {
      const response = await api.get('/auth/me')
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem('token')
      delete api.defaults.headers.common['Authorization']
      setUser(null)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string) => {
    try {
      const response = await api.post('/auth/login', { email, password })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      toast.success('Welcome back!')
    } catch (error: any) {
      const message = error.response?.data?.error || 'Login failed'
      toast.error(message)
      throw error
    }
  }

  const signup = async (email: string, password: string, role = 'CLIENT') => {
    try {
      const response = await api.post('/auth/signup', { email, password, role })
      const { token, user } = response.data
      
      localStorage.setItem('token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setUser(user)
      
      toast.success('Account created successfully!')
    } catch (error: any) {
      const message = error.response?.data?.error || 'Signup failed'
      toast.error(message)
      throw error
    }
  }

  const logout = () => {
    localStorage.removeItem('token')
    delete api.defaults.headers.common['Authorization']
    setUser(null)
    toast.success('Logged out successfully')
  }

  const value = {
    user,
    loading,
    login,
    signup,
    logout,
    refreshUser
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
} 