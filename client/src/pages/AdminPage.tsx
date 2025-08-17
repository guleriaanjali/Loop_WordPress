import { useState, useEffect } from 'react'
import toast from 'react-hot-toast'
import { api } from '../utils/api'

interface ApplicantProfile {
  id: string
  firstName?: string
  lastName?: string
  headline?: string
  skills: string[]
  status: string
  submittedAt: string
  resumeUrl?: string
  videoCvUrl?: string
  expectedRate?: number
  user: {
    id: string
    email: string
    createdAt: string
  }
}

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedUser, setSelectedUser] = useState<string | null>(null)
  const [vettingFilter, setVettingFilter] = useState('pending')
  const [applicants, setApplicants] = useState<ApplicantProfile[]>([])
  const [loadingApplicants, setLoadingApplicants] = useState(false)
  const [reviewingApplicant, setReviewingApplicant] = useState<string | null>(null)

  const users = [
    {
      id: '1',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'TALENT',
      status: 'active',
      joinDate: '2024-01-15',
      revenue: 12450,
      projects: 8,
      rating: 4.9,
      location: 'San Francisco, CA'
    },
    {
      id: '2',
      name: 'Alice Smith',
      email: 'alice@company.com',
      role: 'CLIENT',
      status: 'active',
      joinDate: '2024-02-20',
      revenue: 45230,
      projects: 12,
      rating: 4.7,
      location: 'New York, NY'
    },
    {
      id: '3',
      name: 'Mike Brown',
      email: 'mike@freelance.com',
      role: 'TALENT',
      status: 'pending',
      joinDate: '2024-12-01',
      revenue: 0,
      projects: 0,
      rating: 0,
      location: 'Austin, TX'
    }
  ]

  const vettingQueue = [
    {
      id: '1',
      name: 'Sarah Wilson',
      email: 'sarah@dev.com',
      skills: ['React', 'Node.js', 'TypeScript'],
      experience: '5 years',
      portfolio: 'https://sarahwilson.dev',
      status: 'pending',
      appliedDate: '2024-12-01',
      resumeScore: 85,
      skillTestScore: 92,
      interviewScore: null
    },
    {
      id: '2',
      name: 'David Chen',
      email: 'david@engineer.com',
      skills: ['Python', 'Django', 'AWS'],
      experience: '7 years',
      portfolio: 'https://davidchen.io',
      status: 'interview_scheduled',
      appliedDate: '2024-11-28',
      resumeScore: 90,
      skillTestScore: 88,
      interviewScore: null
    }
  ]

  const systemMetrics = {
    uptime: '99.9%',
    responseTime: '89ms',
    errorRate: '0.1%',
    activeUsers: 1247,
    concurrentSessions: 89,
    databaseConnections: 45,
    memoryUsage: '68%',
    cpuUsage: '42%'
  }

  const financialData = {
    totalRevenue: 2847230,
    monthlyRevenue: 284500,
    platformFee: 42675,
    payouts: 241825,
    pendingPayments: 15420,
    averageProjectValue: 3890,
    topEarningTalent: 'John Doe',
    topSpendingClient: 'TechCorp Inc.'
  }

  const recentAlerts = [
    { type: 'warning', message: 'High CPU usage detected on server-02', time: '5 min ago', severity: 'medium' },
    { type: 'success', message: 'Daily backup completed successfully', time: '2 hours ago', severity: 'low' },
    { type: 'error', message: 'Payment processing failed for invoice #12345', time: '4 hours ago', severity: 'high' },
    { type: 'info', message: 'New talent application received', time: '6 hours ago', severity: 'low' }
  ]

  const handleVetTalent = (talentId: string, action: 'approve' | 'reject') => {
    console.log(`${action} talent ${talentId}`)
    // Implementation would update the vetting status
  }

  const handleUserAction = (userId: string, action: 'suspend' | 'activate' | 'delete') => {
    console.log(`${action} user ${userId}`)
    // Implementation would update user status
  }

  const fetchApplicants = async () => {
    setLoadingApplicants(true)
    try {
      const response = await api.get('/applicants/admin/all')
      setApplicants(response.data.applications)
    } catch (error) {
      console.error('Error fetching applicants:', error)
      toast.error('Failed to fetch applicants')
    } finally {
      setLoadingApplicants(false)
    }
  }

  const reviewApplicant = async (applicantId: string, status: 'APPROVED' | 'REJECTED' | 'REQUIRES_CHANGES', notes?: string) => {
    setReviewingApplicant(applicantId)
    try {
      await api.put(`/applicants/admin/${applicantId}/review`, {
        status,
        adminNotes: notes
      })
      toast.success(`Application ${status.toLowerCase()} successfully`)
      await fetchApplicants()
    } catch (error) {
      console.error('Error reviewing applicant:', error)
      toast.error('Failed to review application')
    } finally {
      setReviewingApplicant(null)
    }
  }

  useEffect(() => {
    if (activeTab === 'applicants') {
      fetchApplicants()
    }
  }, [activeTab])

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Admin Console</h1>
        <p className="mt-2 text-gray-600">Platform management and monitoring dashboard</p>
      </div>

      {/* System Health Overview */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Platform Command Center</h2>
            <p className="text-gray-300">Real-time system monitoring and control</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold text-green-400">{systemMetrics.uptime}</div>
            <div className="text-gray-300">System Uptime</div>
            <div className="text-sm text-green-400">All systems operational</div>
          </div>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
          <p className="text-2xl font-bold text-gray-900">2,847</p>
          <p className="text-xs text-blue-600">+127 this week</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Monthly Revenue</h3>
          <p className="text-2xl font-bold text-gray-900">${financialData.monthlyRevenue.toLocaleString()}</p>
          <p className="text-xs text-green-600">+18% MoM</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-900">156</p>
          <p className="text-xs text-purple-600">+23 this week</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Pending Reviews</h3>
          <p className="text-2xl font-bold text-gray-900">{vettingQueue.length}</p>
          <p className="text-xs text-orange-600">Requires attention</p>
        </div>
      </div>

      {/* Alerts Section */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">System Alerts</h3>
        <div className="space-y-3">
          {recentAlerts.map((alert, index) => (
            <div key={index} className={`p-3 rounded-lg border-l-4 ${
              alert.type === 'error' ? 'bg-red-50 border-red-400' :
              alert.type === 'warning' ? 'bg-yellow-50 border-yellow-400' :
              alert.type === 'success' ? 'bg-green-50 border-green-400' :
              'bg-blue-50 border-blue-400'
            }`}>
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className={`w-2 h-2 rounded-full mr-3 ${
                    alert.severity === 'high' ? 'bg-red-500' :
                    alert.severity === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}></span>
                  <span className={`text-sm font-medium ${
                    alert.type === 'error' ? 'text-red-800' :
                    alert.type === 'warning' ? 'text-yellow-800' :
                    alert.type === 'success' ? 'text-green-800' :
                    'text-blue-800'
                  }`}>
                    {alert.message}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{alert.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'users', 'applicants', 'vetting', 'analytics', 'system', 'settings'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-orange-500 text-orange-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </nav>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Platform Health</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>API Response Time</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{systemMetrics.responseTime}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Excellent</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Error Rate</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{systemMetrics.errorRate}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Low</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Active Sessions</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{systemMetrics.concurrentSessions}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Normal</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Memory Usage</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">{systemMetrics.memoryUsage}</span>
                      <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs">Moderate</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Financial Overview</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Total Revenue:</span>
                    <span className="font-semibold">${financialData.totalRevenue.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Platform Fees:</span>
                    <span className="font-semibold text-green-600">${financialData.platformFee.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Pending Payouts:</span>
                    <span className="font-semibold text-orange-600">${financialData.pendingPayments.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Avg Project Value:</span>
                    <span className="font-semibold">${financialData.averageProjectValue.toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-gray-900">User Management</h4>
                <div className="flex space-x-2">
                  <select className="text-sm border rounded px-3 py-1">
                    <option>All Roles</option>
                    <option>Clients</option>
                    <option>Talent</option>
                    <option>Admins</option>
                  </select>
                  <button className="bg-orange-600 text-white px-4 py-1 rounded text-sm hover:bg-orange-700">
                    Export Data
                  </button>
                </div>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Projects</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {users.map(user => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">
                              {user.name.split(' ').map(n => n[0]).join('')}
                            </div>
                            <div className="ml-3">
                              <div className="text-sm font-medium text-gray-900">{user.name}</div>
                              <div className="text-sm text-gray-500">{user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.role === 'CLIENT' ? 'bg-blue-100 text-blue-800' :
                            user.role === 'TALENT' ? 'bg-green-100 text-green-800' :
                            'bg-purple-100 text-purple-800'
                          }`}>
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            user.status === 'active' ? 'bg-green-100 text-green-800' :
                            user.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            'bg-red-100 text-red-800'
                          }`}>
                            {user.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          ${user.revenue.toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                          {user.projects}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button 
                            onClick={() => setSelectedUser(user.id)}
                            className="text-orange-600 hover:text-orange-900 mr-3"
                          >
                            View
                          </button>
                          <button 
                            onClick={() => handleUserAction(user.id, user.status === 'active' ? 'suspend' : 'activate')}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                          >
                            {user.status === 'active' ? 'Suspend' : 'Activate'}
                          </button>
                          <button 
                            onClick={() => handleUserAction(user.id, 'delete')}
                            className="text-red-600 hover:text-red-900"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Applicants Tab */}
          {activeTab === 'applicants' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h4 className="font-semibold text-gray-900">Applicant Management</h4>
                <div className="flex space-x-2">
                  <select className="text-sm border rounded px-3 py-1">
                    <option value="">All Statuses</option>
                    <option value="SUBMITTED">Submitted</option>
                    <option value="UNDER_REVIEW">Under Review</option>
                    <option value="APPROVED">Approved</option>
                    <option value="REJECTED">Rejected</option>
                    <option value="REQUIRES_CHANGES">Requires Changes</option>
                  </select>
                  <button className="bg-orange-600 text-white px-4 py-1 rounded text-sm hover:bg-orange-700">
                    Export Applications
                  </button>
                </div>
              </div>

              {loadingApplicants ? (
                <div className="text-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-orange-500 mx-auto"></div>
                  <p className="text-gray-600 mt-2">Loading applicants...</p>
                </div>
              ) : applicants.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-4xl mb-2">📝</div>
                  <p className="text-gray-600">No applications found</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <div key={applicant.id} className="bg-white border border-gray-200 rounded-lg p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center space-x-4 mb-3">
                            <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                              {applicant.firstName?.[0] || applicant.user.email[0].toUpperCase()}
                            </div>
                            <div>
                              <h5 className="font-semibold text-gray-900">
                                {applicant.firstName && applicant.lastName 
                                  ? `${applicant.firstName} ${applicant.lastName}`
                                  : applicant.user.email
                                }
                              </h5>
                              <p className="text-sm text-gray-600">{applicant.user.email}</p>
                              <p className="text-sm text-gray-500">
                                Applied: {new Date(applicant.submittedAt).toLocaleDateString()}
                              </p>
                            </div>
                          </div>

                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">Professional Headline</h6>
                              <p className="text-sm text-gray-600">
                                {applicant.headline || 'Not provided'}
                              </p>
                            </div>
                            <div>
                              <h6 className="font-medium text-gray-900 mb-2">Expected Rate</h6>
                              <p className="text-sm text-gray-600">
                                {applicant.expectedRate ? `$${applicant.expectedRate}/hour` : 'Not provided'}
                              </p>
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6 className="font-medium text-gray-900 mb-2">Skills</h6>
                            <div className="flex flex-wrap gap-2">
                              {applicant.skills.map((skill) => (
                                <span
                                  key={skill}
                                  className="px-2 py-1 bg-purple-100 text-purple-800 rounded text-sm"
                                >
                                  {skill}
                                </span>
                              ))}
                            </div>
                          </div>

                          <div className="mb-4">
                            <h6 className="font-medium text-gray-900 mb-2">Uploaded Documents</h6>
                            <div className="flex space-x-4 text-sm">
                              <div className="flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                  applicant.resumeUrl ? 'bg-green-500' : 'bg-red-500'
                                }`}></span>
                                Resume: {applicant.resumeUrl ? 'Uploaded' : 'Not uploaded'}
                              </div>
                              <div className="flex items-center">
                                <span className={`w-2 h-2 rounded-full mr-2 ${
                                  applicant.videoCvUrl ? 'bg-green-500' : 'bg-red-500'
                                }`}></span>
                                Video CV: {applicant.videoCvUrl ? 'Uploaded' : 'Not uploaded'}
                              </div>
                            </div>
                          </div>
                        </div>

                        <div className="flex flex-col items-end space-y-2">
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                            applicant.status === 'SUBMITTED' ? 'bg-blue-100 text-blue-800' :
                            applicant.status === 'UNDER_REVIEW' ? 'bg-yellow-100 text-yellow-800' :
                            applicant.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                            applicant.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                            applicant.status === 'REQUIRES_CHANGES' ? 'bg-orange-100 text-orange-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {applicant.status.replace('_', ' ')}
                          </span>

                          {applicant.status === 'SUBMITTED' || applicant.status === 'UNDER_REVIEW' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => reviewApplicant(applicant.id, 'APPROVED')}
                                disabled={reviewingApplicant === applicant.id}
                                className="bg-green-600 text-white px-3 py-1 rounded text-sm hover:bg-green-700 disabled:opacity-50"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => {
                                  const notes = prompt('Reason for rejection (optional):')
                                  reviewApplicant(applicant.id, 'REJECTED', notes || undefined)
                                }}
                                disabled={reviewingApplicant === applicant.id}
                                className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700 disabled:opacity-50"
                              >
                                Reject
                              </button>
                              <button
                                onClick={() => {
                                  const notes = prompt('What changes are required?')
                                  if (notes) {
                                    reviewApplicant(applicant.id, 'REQUIRES_CHANGES', notes)
                                  }
                                }}
                                disabled={reviewingApplicant === applicant.id}
                                className="bg-orange-600 text-white px-3 py-1 rounded text-sm hover:bg-orange-700 disabled:opacity-50"
                              >
                                Request Changes
                              </button>
                            </div>
                          ) : (
                            <div className="text-sm text-gray-500">
                              Review completed
                            </div>
                          )}
                        </div>
                      </div>

                      {/* File Downloads */}
                      {(applicant.resumeUrl || applicant.videoCvUrl) && (
                        <div className="mt-4 pt-4 border-t border-gray-200">
                          <h6 className="font-medium text-gray-900 mb-2">Download Files</h6>
                          <div className="flex space-x-4">
                            {applicant.resumeUrl && (
                              <a
                                href={`/uploads/resumes/${applicant.resumeUrl}`}
                                download
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                📄 Resume
                              </a>
                            )}
                            {applicant.videoCvUrl && (
                              <a
                                href={`/uploads/videos/${applicant.videoCvUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-600 hover:text-blue-800 text-sm underline"
                              >
                                🎥 Video CV
                              </a>
                            )}
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Vetting Tab */}
          {activeTab === 'vetting' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h4 className="font-semibold text-gray-900">Talent Vetting Queue</h4>
                <select 
                  value={vettingFilter}
                  onChange={(e) => setVettingFilter(e.target.value)}
                  className="text-sm border rounded px-3 py-1"
                >
                  <option value="pending">Pending Review</option>
                  <option value="interview">Interview Scheduled</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
              </div>

              <div className="space-y-4">
                {vettingQueue.map(candidate => (
                  <div key={candidate.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h5 className="font-semibold text-gray-900">{candidate.name}</h5>
                        <p className="text-sm text-gray-600">{candidate.email}</p>
                        <p className="text-sm text-gray-500">{candidate.experience} experience</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-sm ${
                        candidate.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                        candidate.status === 'interview_scheduled' ? 'bg-blue-100 text-blue-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {candidate.status.replace('_', ' ')}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Skills</h6>
                        <div className="flex flex-wrap gap-1">
                          {candidate.skills.map(skill => (
                            <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Assessment Scores</h6>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span>Resume:</span>
                            <span className="font-medium">{candidate.resumeScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Skills Test:</span>
                            <span className="font-medium">{candidate.skillTestScore}%</span>
                          </div>
                          <div className="flex justify-between">
                            <span>Interview:</span>
                            <span className="font-medium">{candidate.interviewScore || 'Pending'}</span>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h6 className="font-medium text-gray-900 mb-2">Portfolio</h6>
                        <a 
                          href={candidate.portfolio} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View Portfolio →
                        </a>
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button 
                        onClick={() => handleVetTalent(candidate.id, 'approve')}
                        className="bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700"
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleVetTalent(candidate.id, 'reject')}
                        className="bg-red-600 text-white px-4 py-2 rounded text-sm hover:bg-red-700"
                      >
                        Reject
                      </button>
                      <button className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700">
                        Schedule Interview
                      </button>
                      <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm hover:bg-gray-700">
                        Add Notes
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">Revenue Analytics</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl text-green-600 mb-2">📈</div>
                      <div className="text-lg font-semibold text-green-800">Revenue Growth</div>
                      <div className="text-sm text-green-600">+24% vs last quarter</div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">User Acquisition</h4>
                  <div className="h-48 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-4xl text-blue-600 mb-2">👥</div>
                      <div className="text-lg font-semibold text-blue-800">Steady Growth</div>
                      <div className="text-sm text-blue-600">+15% new users this month</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Platform Metrics</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">94.2%</div>
                    <div className="text-sm text-gray-600">Client Satisfaction</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">87%</div>
                    <div className="text-sm text-gray-600">Project Success Rate</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">2.3 days</div>
                    <div className="text-sm text-gray-600">Avg. Talent Matching Time</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* System Tab */}
          {activeTab === 'system' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">Server Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>CPU Usage</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: systemMetrics.cpuUsage }}></div>
                        </div>
                        <span className="text-sm">{systemMetrics.cpuUsage}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Memory Usage</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-yellow-500 h-2 rounded-full" style={{ width: systemMetrics.memoryUsage }}></div>
                        </div>
                        <span className="text-sm">{systemMetrics.memoryUsage}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Database Connections</span>
                      <span className="text-sm">{systemMetrics.databaseConnections}/100</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-4">System Actions</h4>
                  <div className="space-y-3">
                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                      Restart Services
                    </button>
                    <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
                      Run Backup
                    </button>
                    <button className="w-full bg-yellow-600 text-white py-2 rounded hover:bg-yellow-700">
                      Clear Cache
                    </button>
                    <button className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700">
                      Emergency Shutdown
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Platform Settings</h4>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <h5 className="font-medium">New User Registration</h5>
                      <p className="text-sm text-gray-600">Allow new users to register</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <h5 className="font-medium">Maintenance Mode</h5>
                      <p className="text-sm text-gray-600">Put platform in maintenance mode</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>

                  <div className="flex justify-between items-center p-4 bg-gray-50 rounded">
                    <div>
                      <h5 className="font-medium">Email Notifications</h5>
                      <p className="text-sm text-gray-600">Send system notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input type="checkbox" className="sr-only peer" defaultChecked />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 