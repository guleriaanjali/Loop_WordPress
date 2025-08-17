import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const { login } = useAuth()
  const navigate = useNavigate()

  const demoAccounts = [
    {
      role: 'Admin',
      email: 'admin@loopservices.com',
      password: 'admin123',
      description: 'Full platform access, user management, analytics',
      color: 'bg-purple-500',
      icon: '👑'
    },
    {
      role: 'Client',
      email: 'client1@example.com',
      password: 'client123',
      description: 'Post projects, hire talent, manage teams',
      color: 'bg-blue-500',
      icon: '🏢'
    },
    {
      role: 'Talent',
      email: 'talent1@example.com',
      password: 'talent123',
      description: 'Browse projects, track earnings, build portfolio',
      color: 'bg-green-500',
      icon: '👨‍💻'
    },
    {
      role: 'Applicant',
      email: 'applicant1@example.com',
      password: 'applicant123',
      description: 'Submit application, upload resume & video CV, track status',
      color: 'bg-orange-500',
      icon: '📝'
    }
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
      navigate('/dashboard')
    } catch (err) {
      setError('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleDemoLogin = async (demoEmail: string, demoPassword: string) => {
    setEmail(demoEmail)
    setPassword(demoPassword)
    setIsLoading(true)
    setError('')

    try {
      await login(demoEmail, demoPassword)
      navigate('/dashboard')
    } catch (err) {
      setError('Demo login failed')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl w-full space-y-8">
        <div className="text-center">
          <div className="flex justify-center mb-6">
            <div className="h-16 w-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-2xl">L</span>
            </div>
          </div>
          <h2 className="text-4xl font-extrabold text-gray-900">
            Welcome to Loop Services
          </h2>
          <p className="mt-2 text-lg text-gray-600">
            Sign in to your account or try our demo
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Sign In</h3>
              <p className="text-gray-600">Enter your credentials to access your account</p>
            </div>

            <form className="space-y-6" onSubmit={handleSubmit}>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your email"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="font-medium text-orange-600 hover:text-orange-500">
                    Forgot your password?
                  </a>
                </div>
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
                      Signing in...
                    </div>
                  ) : (
                    'Sign in'
                  )}
                </button>
              </div>

              <div className="text-center">
                <span className="text-gray-600">Don't have an account? </span>
                <Link to="/signup" className="font-medium text-orange-600 hover:text-orange-500">
                  Sign up here
                </Link>
              </div>
            </form>
          </div>

          {/* Demo Accounts */}
          <div className="bg-white shadow-xl rounded-2xl p-8">
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-gray-900">Try Our Demo</h3>
              <p className="text-gray-600">Experience Loop Services with pre-configured accounts</p>
            </div>

            <div className="space-y-4">
              {demoAccounts.map((account, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center">
                      <div className={`w-12 h-12 ${account.color} rounded-full flex items-center justify-center text-white text-xl mr-4`}>
                        {account.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-gray-900">{account.role} Account</h4>
                        <p className="text-sm text-gray-600 mb-2">{account.description}</p>
                        <div className="text-xs text-gray-500">
                          <div>Email: {account.email}</div>
                          <div>Password: {account.password}</div>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDemoLogin(account.email, account.password)}
                      disabled={isLoading}
                      className={`px-4 py-2 ${account.color} text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 text-sm font-medium`}
                    >
                      {isLoading ? 'Loading...' : 'Try Demo'}
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg border border-blue-200">
              <h4 className="font-semibold text-blue-900 mb-2">🚀 Demo Features</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Full platform functionality</li>
                <li>• Pre-loaded sample data</li>
                <li>• Interactive project management</li>
                <li>• Real-time collaboration tools</li>
                <li>• Advanced analytics dashboard</li>
              </ul>
            </div>

            <div className="mt-6 p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border border-green-200">
              <h4 className="font-semibold text-green-900 mb-2">💡 What You Can Explore</h4>
              <div className="grid grid-cols-1 gap-2 text-sm text-green-800">
                <div><strong>Admin:</strong> User management, platform analytics, application reviews</div>
                <div><strong>Client:</strong> Project creation, talent hiring, team management</div>
                <div><strong>Talent:</strong> Profile building, project applications, earnings tracking</div>
                <div><strong>Applicant:</strong> Application form, resume/video upload, status tracking</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Preview */}
        <div className="bg-white shadow-xl rounded-2xl p-8 mt-8">
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">Platform Highlights</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">AI-Powered Matching</h4>
              <p className="text-gray-600 text-sm">Advanced algorithms match clients with the perfect talent based on skills, experience, and project requirements.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">60% Cost Savings</h4>
              <p className="text-gray-600 text-sm">Access world-class talent from global tech hubs at significantly lower rates than traditional hiring.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Enterprise Security</h4>
              <p className="text-gray-600 text-sm">Bank-grade security, compliance with SOC 2, GDPR, and HIPAA standards for enterprise peace of mind.</p>
            </div>
          </div>
        </div>

        <div className="text-center text-gray-500 text-sm">
          <p>© 2024 Loop Services. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" className="hover:text-gray-700">Privacy Policy</a> • 
            <a href="#" className="hover:text-gray-700 ml-1">Terms of Service</a> • 
            <a href="#" className="hover:text-gray-700 ml-1">Support</a>
          </p>
        </div>
      </div>
    </div>
  )
} 