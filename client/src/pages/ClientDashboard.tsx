import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function ClientDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const clientStats = {
    totalInvestment: 47230,
    activeProjects: 8,
    talentPool: 24,
    roi: 284,
    aiMatchScore: 94.2,
    avgProjectSuccess: 96,
    costSavings: 142500,
    timeToHire: 1.8
  }

  const activeProjects = [
    {
      id: '1',
      name: 'E-commerce Platform Redesign',
      manager: 'Sarah Wilson',
      team: 4,
      progress: 67,
      budget: 45000,
      spent: 28500,
      dueDate: '2024-12-15',
      status: 'on-track',
      priority: 'high'
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      manager: 'John Doe',
      team: 6,
      progress: 23,
      budget: 75000,
      spent: 18500,
      dueDate: '2025-03-15',
      status: 'at-risk',
      priority: 'urgent'
    },
    {
      id: '3',
      name: 'AI Analytics Dashboard',
      manager: 'Alex Petrov',
      team: 3,
      progress: 89,
      budget: 32000,
      spent: 29800,
      dueDate: '2024-11-30',
      status: 'ahead',
      priority: 'medium'
    }
  ]

  const talentPool = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      role: 'Senior Full Stack Developer',
      rate: 45,
      rating: 4.9,
      availability: 'Available',
      skills: ['React', 'Node.js', 'AWS'],
      location: 'Bangalore, India',
      projects: 3
    },
    {
      id: '2',
      name: 'Maria Santos',
      role: 'Frontend Specialist',
      rate: 38,
      rating: 4.8,
      availability: 'Busy',
      skills: ['React', 'Vue.js', 'TypeScript'],
      location: 'São Paulo, Brazil',
      projects: 2
    },
    {
      id: '3',
      name: 'Alex Petrov',
      role: 'DevOps Engineer',
      rate: 42,
      rating: 4.9,
      availability: 'Available',
      skills: ['AWS', 'Docker', 'Kubernetes'],
      location: 'Kiev, Ukraine',
      projects: 1
    }
  ]

  const recentActivity = [
    { type: 'project', message: 'E-commerce Platform milestone completed', time: '2 hours ago', status: 'success' },
    { type: 'talent', message: 'New talent Priya Sharma joined your pool', time: '1 day ago', status: 'info' },
    { type: 'payment', message: 'Invoice #12345 paid - $2,500', time: '2 days ago', status: 'success' },
    { type: 'alert', message: 'Mobile Banking App behind schedule', time: '3 days ago', status: 'warning' }
  ]

  const aiInsights = [
    {
      type: 'optimization',
      title: 'Team Optimization Opportunity',
      message: 'Consider adding a DevOps specialist to the Mobile Banking project to improve deployment efficiency.',
      impact: 'Could reduce timeline by 2-3 weeks',
      action: 'View Recommendations'
    },
    {
      type: 'cost',
      title: 'Cost Savings Identified',
      message: 'Switching to offshore talent for UI development could save $15,000 on the E-commerce project.',
      impact: '33% cost reduction',
      action: 'Explore Options'
    },
    {
      type: 'risk',
      title: 'Project Risk Alert',
      message: 'Mobile Banking App is at risk due to scope creep. Consider timeline adjustment.',
      impact: 'High priority attention needed',
      action: 'Review Project'
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'on-track': return 'bg-green-100 text-green-800'
      case 'at-risk': return 'bg-red-100 text-red-800'
      case 'ahead': return 'bg-blue-100 text-blue-800'
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Client Dashboard</h1>
        <p className="mt-2 text-gray-600">Manage your projects, team, and track performance</p>
      </div>

      {/* Header Stats */}
      <div className="bg-gradient-to-r from-orange-500 to-red-600 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, TechCorp!</h2>
            <p className="text-orange-100">Your projects are performing excellently</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${clientStats.totalInvestment.toLocaleString()}</div>
            <div className="text-orange-200">Total Investment</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{clientStats.activeProjects}</p>
          <p className="text-xs text-blue-600">{clientStats.avgProjectSuccess}% success rate</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Talent Pool</h3>
          <p className="text-2xl font-bold text-gray-900">{clientStats.talentPool}</p>
          <p className="text-xs text-green-600">Top-tier professionals</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">ROI</h3>
          <p className="text-2xl font-bold text-gray-900">{clientStats.roi}%</p>
          <p className="text-xs text-purple-600">vs traditional hiring</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">AI Match Score</h3>
          <p className="text-2xl font-bold text-gray-900">{clientStats.aiMatchScore}%</p>
          <p className="text-xs text-orange-600">Talent compatibility</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
          <h3 className="text-sm font-medium text-gray-500">Cost Savings</h3>
          <p className="text-2xl font-bold text-gray-900">${(clientStats.costSavings / 1000).toFixed(0)}K</p>
          <p className="text-xs text-red-600">vs US market rates</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'projects', 'talent', 'analytics', 'insights', 'billing'].map((tab) => (
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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Active Projects</h3>
                <div className="space-y-4">
                  {activeProjects.slice(0, 3).map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center">
                          <h4 className="font-medium text-gray-900">{project.name}</h4>
                          <div className={`w-3 h-3 rounded-full ml-2 ${getPriorityColor(project.priority)}`}></div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Manager: {project.manager} • Team: {project.team}</p>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Progress: {project.progress}%</span>
                        <span>Budget: ${project.spent.toLocaleString()}/${project.budget.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-orange-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/projects" 
                  className="mt-4 inline-block text-orange-600 hover:text-orange-800 text-sm font-medium"
                >
                  View all projects →
                </Link>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
                <div className="space-y-3">
                  {recentActivity.map((activity, index) => (
                    <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
                      <div className={`w-3 h-3 rounded-full mr-3 ${
                        activity.status === 'success' ? 'bg-green-500' :
                        activity.status === 'warning' ? 'bg-yellow-500' :
                        activity.status === 'info' ? 'bg-blue-500' : 'bg-gray-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-6">
                  <h4 className="font-medium text-gray-900 mb-3">Quick Actions</h4>
                  <div className="grid grid-cols-2 gap-3">
                    <Link 
                      to="/projects/create"
                      className="p-3 border border-orange-200 rounded-lg text-center hover:bg-orange-50 transition-colors"
                    >
                      <div className="text-orange-600 text-lg mb-1">🚀</div>
                      <div className="text-sm font-medium text-gray-900">New Project</div>
                    </Link>
                    <Link 
                      to="/talent"
                      className="p-3 border border-blue-200 rounded-lg text-center hover:bg-blue-50 transition-colors"
                    >
                      <div className="text-blue-600 text-lg mb-1">👥</div>
                      <div className="text-sm font-medium text-gray-900">Find Talent</div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Portfolio</h3>
                <Link 
                  to="/projects/create"
                  className="bg-orange-600 text-white px-4 py-2 rounded-lg hover:bg-orange-700"
                >
                  + New Project
                </Link>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900 text-lg">{project.name}</h4>
                        <div className={`w-3 h-3 rounded-full ml-3 ${getPriorityColor(project.priority)}`}></div>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(project.status)}`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Manager:</span>
                          <div className="font-medium">{project.manager}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Team Size:</span>
                          <div className="font-medium">{project.team} members</div>
                        </div>
                      </div>

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

                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Budget:</span>
                          <div className="font-medium">${project.budget.toLocaleString()}</div>
                        </div>
                        <div>
                          <span className="text-gray-600">Spent:</span>
                          <div className="font-medium">${project.spent.toLocaleString()}</div>
                        </div>
                      </div>

                      <div className="text-sm text-gray-600">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <Link 
                      to={`/projects/${project.id}`}
                      className="mt-4 w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700 text-center block"
                    >
                      Manage Project
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Talent Tab */}
          {activeTab === 'talent' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Your Talent Pool</h3>
                <div className="flex space-x-2">
                  <select className="text-sm border rounded px-3 py-1">
                    <option>All Skills</option>
                    <option>Frontend</option>
                    <option>Backend</option>
                    <option>DevOps</option>
                  </select>
                  <Link 
                    to="/talent/search"
                    className="bg-orange-600 text-white px-4 py-1 rounded text-sm hover:bg-orange-700"
                  >
                    Find New Talent
                  </Link>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {talentPool.map(talent => (
                  <div key={talent.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                          {talent.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className="ml-3">
                          <h4 className="font-semibold text-gray-900">{talent.name}</h4>
                          <p className="text-sm text-gray-600">{talent.role}</p>
                          <p className="text-xs text-gray-500">{talent.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-gray-900">${talent.rate}/hr</div>
                        <div className="flex items-center text-sm">
                          <span className="text-yellow-500">★</span>
                          <span className="ml-1 text-gray-600">{talent.rating}</span>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex flex-wrap gap-1">
                        {talent.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${
                          talent.availability === 'Available' ? 'text-green-600' : 'text-yellow-600'
                        }`}>
                          {talent.availability}
                        </span>
                      </div>

                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Active Projects:</span>
                        <span className="font-medium">{talent.projects}</span>
                      </div>
                    </div>

                    <div className="mt-4 flex space-x-2">
                      <button className="flex-1 bg-orange-600 text-white py-2 rounded text-sm hover:bg-orange-700">
                        Assign to Project
                      </button>
                      <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                        Message
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-6">Performance Analytics</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-4">Cost Efficiency</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-green-700">Total Savings:</span>
                        <span className="font-bold text-green-900">${clientStats.costSavings.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">ROI:</span>
                        <span className="font-bold text-green-900">{clientStats.roi}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Avg. Time to Hire:</span>
                        <span className="font-bold text-green-900">{clientStats.timeToHire} days</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-4">Project Success</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-blue-700">Success Rate:</span>
                        <span className="font-bold text-blue-900">{clientStats.avgProjectSuccess}%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">On-time Delivery:</span>
                        <span className="font-bold text-blue-900">94%</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-blue-700">Quality Score:</span>
                        <span className="font-bold text-blue-900">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Investment Overview</h4>
                <div className="h-64 bg-gradient-to-t from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-gray-600 mb-2">📊</div>
                    <div className="text-lg font-semibold text-gray-800">Strong ROI Performance</div>
                    <div className="text-sm text-gray-600">Your investments are generating {clientStats.roi}% ROI</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === 'insights' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">AI-Powered Insights</h3>
              
              <div className="space-y-6">
                {aiInsights.map((insight, index) => (
                  <div key={index} className={`p-6 rounded-lg border-l-4 ${
                    insight.type === 'optimization' ? 'bg-blue-50 border-blue-400' :
                    insight.type === 'cost' ? 'bg-green-50 border-green-400' :
                    'bg-yellow-50 border-yellow-400'
                  }`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <h4 className={`font-semibold mb-2 ${
                          insight.type === 'optimization' ? 'text-blue-900' :
                          insight.type === 'cost' ? 'text-green-900' :
                          'text-yellow-900'
                        }`}>
                          {insight.title}
                        </h4>
                        <p className={`text-sm mb-2 ${
                          insight.type === 'optimization' ? 'text-blue-800' :
                          insight.type === 'cost' ? 'text-green-800' :
                          'text-yellow-800'
                        }`}>
                          {insight.message}
                        </p>
                        <p className={`text-xs font-medium ${
                          insight.type === 'optimization' ? 'text-blue-700' :
                          insight.type === 'cost' ? 'text-green-700' :
                          'text-yellow-700'
                        }`}>
                          Impact: {insight.impact}
                        </p>
                      </div>
                      <button className={`px-4 py-2 rounded text-sm font-medium ${
                        insight.type === 'optimization' ? 'bg-blue-600 text-white hover:bg-blue-700' :
                        insight.type === 'cost' ? 'bg-green-600 text-white hover:bg-green-700' :
                        'bg-yellow-600 text-white hover:bg-yellow-700'
                      }`}>
                        {insight.action}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Billing Tab */}
          {activeTab === 'billing' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Billing & Invoices</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">This Month</h4>
                  <div className="text-2xl font-bold text-gray-900">$12,450</div>
                  <div className="text-sm text-gray-600">Across 3 projects</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Pending</h4>
                  <div className="text-2xl font-bold text-orange-600">$3,200</div>
                  <div className="text-sm text-gray-600">2 invoices due</div>
                </div>
                <div className="bg-white border border-gray-200 rounded-lg p-6">
                  <h4 className="font-medium text-gray-900 mb-2">Total Spent</h4>
                  <div className="text-2xl font-bold text-gray-900">${clientStats.totalInvestment.toLocaleString()}</div>
                  <div className="text-sm text-gray-600">This quarter</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Recent Invoices</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">Invoice #12345</div>
                      <div className="text-sm text-gray-600">E-commerce Platform - Nov 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$2,500</div>
                      <div className="text-sm text-green-600">Paid</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
                    <div>
                      <div className="font-medium">Invoice #12344</div>
                      <div className="text-sm text-gray-600">Mobile Banking App - Nov 2024</div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold">$1,800</div>
                      <div className="text-sm text-orange-600">Pending</div>
                    </div>
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