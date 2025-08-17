import { useState } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function SignupPage() {
  const [searchParams] = useSearchParams()
  const initialRole = searchParams.get('role') || 'CLIENT'
  
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    role: initialRole.toUpperCase(),
    firstName: '',
    lastName: '',
    company: '',
    agreeToTerms: false
  })
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { signup } = useAuth()
  const navigate = useNavigate()

  const roles = [
    {
      id: 'CLIENT',
      title: 'I want to hire talent',
      description: 'Post projects, find skilled professionals, and build your dream team',
      icon: '🏢',
      color: 'bg-blue-500',
      benefits: ['Access global talent pool', 'AI-powered matching', 'Project management tools', '60% cost savings']
    },
    {
      id: 'APPLICANT',
      title: 'I want to apply to become talent',
      description: 'Submit your application, showcase your skills, and join our talent network',
      icon: '📝',
      color: 'bg-purple-500',
      benefits: ['Professional vetting process', 'Video CV recording', 'Skills assessment', 'Global opportunities']
    },
    {
      id: 'TALENT',
      title: 'I already am approved talent',
      description: 'Access your talent dashboard and continue working on projects',
      icon: '👨‍💻',
      color: 'bg-green-500',
      benefits: ['Flexible remote work', 'Competitive rates', 'Skill development', 'Project management']
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    // Validation
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters')
      setIsLoading(false)
      return
    }

    if (!formData.agreeToTerms) {
      setError('Please agree to the terms and conditions')
      setIsLoading(false)
      return
    }

    try {
      await signup(formData.email, formData.password, formData.role)
      navigate('/dashboard')
    } catch (err: any) {
      setError(err.response?.data?.error || 'Signup failed')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }))
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Join Loop Services
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Start your journey in the global talent marketplace
          </p>
        </div>

        <div className="bg-white shadow-xl rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            {/* Role Selection */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Choose Your Path</h3>
              
              <div className="space-y-4">
                {roles.map((role) => (
                  <div
                    key={role.id}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      formData.role === role.id
                        ? 'border-orange-500 bg-orange-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => setFormData(prev => ({ ...prev, role: role.id }))}
                  >
                    <div className="flex items-start">
                      <div className={`w-12 h-12 ${role.color} rounded-full flex items-center justify-center text-white text-xl mr-4 flex-shrink-0`}>
                        {role.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900 mb-1">{role.title}</h4>
                        <p className="text-sm text-gray-600 mb-3">{role.description}</p>
                        <ul className="text-xs text-gray-500 space-y-1">
                          {role.benefits.map((benefit, index) => (
                            <li key={index} className="flex items-center">
                              <span className="text-green-500 mr-2">✓</span>
                              {benefit}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        formData.role === role.id
                          ? 'border-orange-500 bg-orange-500'
                          : 'border-gray-300'
                      }`}>
                        {formData.role === role.id && (
                          <div className="w-2 h-2 bg-white rounded-full"></div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold text-blue-900 mb-2">🚀 Why Choose Loop Services?</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• AI-powered talent matching</li>
                  <li>• Enterprise-grade security</li>
                  <li>• Global talent network</li>
                  <li>• Real-time collaboration tools</li>
                </ul>
              </div>
            </div>

            {/* Signup Form */}
            <div className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Create Your Account</h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                    {error}
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
                      First Name
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Enter your first name"
                    />
                  </div>

                  <div>
                    <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
                      Last Name
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                {formData.role === 'CLIENT' && (
                  <div>
                    <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-2">
                      Company Name
                    </label>
                    <input
                      id="company"
                      name="company"
                      type="text"
                      value={formData.company}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Enter your company name"
                    />
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Create a password"
                    />
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
                      Confirm Password
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      autoComplete="new-password"
                      required
                      value={formData.confirmPassword}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                      placeholder="Confirm your password"
                    />
                  </div>
                </div>

                <div className="flex items-start">
                  <input
                    id="agreeToTerms"
                    name="agreeToTerms"
                    type="checkbox"
                    checked={formData.agreeToTerms}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded mt-1"
                  />
                  <label htmlFor="agreeToTerms" className="ml-3 block text-sm text-gray-900">
                    I agree to the{' '}
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                      Terms of Service
                    </a>{' '}
                    and{' '}
                    <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <div>
                  <button
                    type="submit"
                    disabled={isLoading}
                    className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all transform hover:scale-105"
                  >
                    {isLoading ? (
                      <div className="flex items-center">
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                        Creating account...
                      </div>
                    ) : (
                      'Create Account'
                    )}
                  </button>
                </div>

                <div className="text-center">
                  <span className="text-gray-600">Already have an account? </span>
                  <Link to="/login" className="font-medium text-orange-600 hover:text-orange-500">
                    Sign in here
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Security & Trust */}
        <div className="bg-white shadow-xl rounded-2xl p-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Trusted by Companies Worldwide</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Bank-Grade Security</h4>
              <p className="text-gray-600 text-sm">SOC 2, GDPR, and HIPAA compliant with end-to-end encryption for all communications.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Lightning Fast</h4>
              <p className="text-gray-600 text-sm">Get matched with perfect talent in under 48 hours with our AI-powered matching system.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🌍</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Global Network</h4>
              <p className="text-gray-600 text-sm">Access top 3% talent from 50+ countries with verified skills and proven track records.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 Loop Services. All rights reserved.</p>
        </div>
      </div>
    </div>
  )
} 