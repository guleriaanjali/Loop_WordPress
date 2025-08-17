import { useState } from 'react'
import { Link } from 'react-router-dom'

interface Project {
  id: string
  name: string
  description: string
  status: 'planning' | 'active' | 'review' | 'completed' | 'paused'
  progress: number
  budget: number
  spent: number
  startDate: string
  dueDate: string
  teamSize: number
  priority: 'low' | 'medium' | 'high' | 'urgent'
  skills: string[]
  client: string
  manager: string
}

export default function ProjectsPage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [sortBy, setSortBy] = useState('dueDate')

  const projects: Project[] = [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      description: 'Complete overhaul of the existing e-commerce platform with modern UI/UX and enhanced performance',
      status: 'active',
      progress: 67,
      budget: 45000,
      spent: 28500,
      startDate: '2024-11-01',
      dueDate: '2024-12-15',
      teamSize: 4,
      priority: 'high',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      client: 'TechCorp Inc.',
      manager: 'Sarah Wilson'
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      description: 'Secure mobile banking application with biometric authentication and real-time transactions',
      status: 'planning',
      progress: 15,
      budget: 75000,
      spent: 8500,
      startDate: '2024-12-01',
      dueDate: '2025-03-15',
      teamSize: 6,
      priority: 'urgent',
      skills: ['React Native', 'Node.js', 'MongoDB', 'Security'],
      client: 'FinanceFirst Bank',
      manager: 'John Doe'
    },
    {
      id: '3',
      name: 'AI Analytics Dashboard',
      description: 'Machine learning powered analytics dashboard for business intelligence and predictive insights',
      status: 'review',
      progress: 85,
      budget: 32000,
      spent: 29800,
      startDate: '2024-09-15',
      dueDate: '2024-11-30',
      teamSize: 3,
      priority: 'medium',
      skills: ['Python', 'Machine Learning', 'React', 'PostgreSQL'],
      client: 'DataDriven Corp',
      manager: 'Alex Petrov'
    },
    {
      id: '4',
      name: 'Healthcare Management System',
      description: 'HIPAA-compliant patient management system with appointment scheduling and medical records',
      status: 'completed',
      progress: 100,
      budget: 58000,
      spent: 55200,
      startDate: '2024-06-01',
      dueDate: '2024-10-15',
      teamSize: 5,
      priority: 'high',
      skills: ['Vue.js', 'Django', 'PostgreSQL', 'Security'],
      client: 'MedCare Solutions',
      manager: 'Maria Santos'
    },
    {
      id: '5',
      name: 'IoT Device Management',
      description: 'Cloud-based platform for managing and monitoring IoT devices with real-time data visualization',
      status: 'paused',
      progress: 42,
      budget: 38000,
      spent: 16800,
      startDate: '2024-08-01',
      dueDate: '2024-12-01',
      teamSize: 3,
      priority: 'low',
      skills: ['Node.js', 'AWS', 'Docker', 'MongoDB'],
      client: 'SmartTech Industries',
      manager: 'Priya Sharma'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning': return 'bg-blue-100 text-blue-800'
      case 'active': return 'bg-green-100 text-green-800'
      case 'review': return 'bg-yellow-100 text-yellow-800'
      case 'completed': return 'bg-gray-100 text-gray-800'
      case 'paused': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500'
      case 'high': return 'bg-orange-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const filteredProjects = projects.filter(project => 
    filterStatus === 'all' || project.status === filterStatus
  )

  const sortedProjects = [...filteredProjects].sort((a, b) => {
    switch (sortBy) {
      case 'dueDate':
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime()
      case 'budget':
        return b.budget - a.budget
      case 'progress':
        return b.progress - a.progress
      case 'priority':
        const priorityOrder = { urgent: 4, high: 3, medium: 2, low: 1 }
        return priorityOrder[b.priority as keyof typeof priorityOrder] - priorityOrder[a.priority as keyof typeof priorityOrder]
      default:
        return 0
    }
  })

  const projectStats = {
    total: projects.length,
    active: projects.filter(p => p.status === 'active').length,
    completed: projects.filter(p => p.status === 'completed').length,
    totalBudget: projects.reduce((sum, p) => sum + p.budget, 0),
    totalSpent: projects.reduce((sum, p) => sum + p.spent, 0),
    avgProgress: Math.round(projects.reduce((sum, p) => sum + p.progress, 0) / projects.length)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Project Management</h1>
        <p className="mt-2 text-gray-600">Manage your projects, track progress, and collaborate with your team</p>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{projectStats.total}</p>
          <p className="text-xs text-blue-600">{projectStats.active} active</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Completed</h3>
          <p className="text-2xl font-bold text-gray-900">{projectStats.completed}</p>
          <p className="text-xs text-green-600">{Math.round((projectStats.completed / projectStats.total) * 100)}% success rate</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Total Investment</h3>
          <p className="text-2xl font-bold text-gray-900">${projectStats.totalBudget.toLocaleString()}</p>
          <p className="text-xs text-purple-600">${projectStats.totalSpent.toLocaleString()} spent</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Avg Progress</h3>
          <p className="text-2xl font-bold text-gray-900">{projectStats.avgProgress}%</p>
          <p className="text-xs text-orange-600">Across all projects</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'active', 'planning', 'completed', 'analytics'].map((tab) => (
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
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">All Projects</h3>
                <div className="flex space-x-4">
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="text-sm border rounded px-3 py-1"
                  >
                    <option value="all">All Status</option>
                    <option value="planning">Planning</option>
                    <option value="active">Active</option>
                    <option value="review">Review</option>
                    <option value="completed">Completed</option>
                    <option value="paused">Paused</option>
                  </select>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm border rounded px-3 py-1"
                  >
                    <option value="dueDate">Sort by Due Date</option>
                    <option value="budget">Sort by Budget</option>
                    <option value="progress">Sort by Progress</option>
                    <option value="priority">Sort by Priority</option>
                  </select>
                  <button 
                    onClick={() => setShowCreateModal(true)}
                    className="bg-orange-600 text-white px-4 py-1 rounded text-sm hover:bg-orange-700"
                  >
                    + New Project
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {sortedProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <h4 className="font-semibold text-gray-900 text-lg">{project.name}</h4>
                          <div className={`w-3 h-3 rounded-full ml-3 ${getPriorityColor(project.priority)}`}></div>
                        </div>
                        <p className="text-gray-600 text-sm mb-3">{project.description}</p>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span>Client: {project.client}</span>
                          <span>Team: {project.teamSize}</span>
                          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="mb-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center mb-4">
                      <div className="text-sm">
                        <span className="text-gray-600">Budget: </span>
                        <span className="font-medium">${project.budget.toLocaleString()}</span>
                        <span className="text-gray-500"> (${project.spent.toLocaleString()} spent)</span>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {project.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">Manager: {project.manager}</span>
                      <Link 
                        to={`/projects/${project.id}`}
                        className="bg-orange-600 text-white px-4 py-2 rounded text-sm hover:bg-orange-700"
                      >
                        View Details
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Active Projects Tab */}
          {activeTab === 'active' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Active Projects</h3>
              <div className="space-y-4">
                {projects.filter(p => p.status === 'active').map(project => (
                  <div key={project.id} className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span>Progress: {project.progress}%</span>
                          <span>Team: {project.teamSize} members</span>
                          <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${project.budget.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">${project.spent.toLocaleString()} spent</div>
                        <Link 
                          to={`/projects/${project.id}`}
                          className="mt-2 inline-block bg-green-600 text-white px-4 py-1 rounded text-sm hover:bg-green-700"
                        >
                          Manage
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Planning Projects Tab */}
          {activeTab === 'planning' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Projects in Planning</h3>
              <div className="space-y-4">
                {projects.filter(p => p.status === 'planning').map(project => (
                  <div key={project.id} className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span>Start: {new Date(project.startDate).toLocaleDateString()}</span>
                          <span>Team Size: {project.teamSize}</span>
                          <span className={`px-2 py-1 rounded text-xs text-white ${getPriorityColor(project.priority)}`}>
                            {project.priority} priority
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${project.budget.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Budget allocated</div>
                        <button className="mt-2 bg-blue-600 text-white px-4 py-1 rounded text-sm hover:bg-blue-700">
                          Start Project
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Completed Projects Tab */}
          {activeTab === 'completed' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Completed Projects</h3>
              <div className="space-y-4">
                {projects.filter(p => p.status === 'completed').map(project => (
                  <div key={project.id} className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-gray-900">{project.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                        <div className="flex items-center mt-2 space-x-4 text-sm text-gray-500">
                          <span>Completed: {new Date(project.dueDate).toLocaleDateString()}</span>
                          <span>Team: {project.teamSize} members</span>
                          <span className="text-green-600">✓ 100% Complete</span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${project.spent.toLocaleString()}</div>
                        <div className="text-sm text-gray-500">Final cost</div>
                        <div className="text-xs text-green-600 mt-1">
                          Saved ${(project.budget - project.spent).toLocaleString()}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Project Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Project Status Distribution</h4>
                  <div className="space-y-3">
                    {['planning', 'active', 'review', 'completed', 'paused'].map(status => {
                      const count = projects.filter(p => p.status === status).length
                      const percentage = Math.round((count / projects.length) * 100)
                      return (
                        <div key={status} className="flex justify-between items-center">
                          <span className="text-blue-700 capitalize">{status}:</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-blue-200 rounded-full h-2 mr-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${percentage}%` }}
                              ></div>
                            </div>
                            <span className="font-bold text-blue-900 text-sm">{count} ({percentage}%)</span>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">Budget Performance</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Allocated:</span>
                      <span className="font-bold text-green-900">${projectStats.totalBudget.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Spent:</span>
                      <span className="font-bold text-green-900">${projectStats.totalSpent.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Remaining:</span>
                      <span className="font-bold text-green-900">${(projectStats.totalBudget - projectStats.totalSpent).toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Utilization:</span>
                      <span className="font-bold text-green-900">{Math.round((projectStats.totalSpent / projectStats.totalBudget) * 100)}%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Performance Trends</h4>
                <div className="h-64 bg-gradient-to-t from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-gray-600 mb-2">📈</div>
                    <div className="text-lg font-semibold text-gray-800">Strong Performance</div>
                    <div className="text-sm text-gray-600">
                      {projectStats.avgProgress}% average completion • {Math.round((projectStats.completed / projectStats.total) * 100)}% success rate
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Create Project Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
                <button 
                  onClick={() => setShowCreateModal(false)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="text-center py-8">
                <div className="text-4xl text-orange-600 mb-4">🚀</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Project Creation Wizard</h3>
                <p className="text-gray-600 mb-6">
                  Use our advanced 4-step wizard to create your project with AI-powered talent matching
                </p>
                <Link 
                  to="/projects/create"
                  className="bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-orange-700"
                  onClick={() => setShowCreateModal(false)}
                >
                  Start Project Creation
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 