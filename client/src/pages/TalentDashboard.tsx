import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function TalentDashboard() {
  const [activeTab, setActiveTab] = useState('overview')

  const talentStats = {
    totalEarnings: 8450,
    thisMonth: 2850,
    hoursLogged: 38.5,
    activeProjects: 3,
    completedProjects: 23,
    skillRating: 4.9,
    responseTime: '< 2 hours',
    clientSatisfaction: 98,
    marketValue: 95
  }

  const activeProjects = [
    {
      id: '1',
      name: 'E-commerce Platform',
      client: 'TechCorp Inc.',
      progress: 67,
      dueDate: '2024-12-15',
      budget: 12500,
      hoursLogged: 45,
      status: 'active'
    },
    {
      id: '2',
      name: 'Mobile Banking App',
      client: 'FinanceFirst Bank',
      progress: 23,
      dueDate: '2025-01-30',
      budget: 18000,
      hoursLogged: 12,
      status: 'active'
    },
    {
      id: '3',
      name: 'Analytics Dashboard',
      client: 'DataDriven Corp',
      progress: 89,
      dueDate: '2024-11-30',
      budget: 8500,
      hoursLogged: 32,
      status: 'review'
    }
  ]

  const availableOpportunities = [
    {
      id: '1',
      title: 'React Native Developer',
      client: 'StartupXYZ',
      budget: '$15,000 - $25,000',
      duration: '8-12 weeks',
      skills: ['React Native', 'TypeScript', 'Firebase'],
      matchScore: 95,
      posted: '2 hours ago',
      applicants: 12
    },
    {
      id: '2',
      title: 'Full Stack Engineer',
      client: 'Enterprise Corp',
      budget: '$20,000 - $35,000',
      duration: '12-16 weeks',
      skills: ['React', 'Node.js', 'PostgreSQL', 'AWS'],
      matchScore: 92,
      posted: '1 day ago',
      applicants: 8
    },
    {
      id: '3',
      title: 'DevOps Specialist',
      client: 'CloudTech Solutions',
      budget: '$12,000 - $18,000',
      duration: '6-8 weeks',
      skills: ['AWS', 'Docker', 'Kubernetes', 'CI/CD'],
      matchScore: 88,
      posted: '3 days ago',
      applicants: 15
    }
  ]

  const skillDevelopment = [
    {
      skill: 'Next.js',
      currentLevel: 0,
      marketDemand: 'High',
      potentialIncrease: '+$15/hr',
      timeToLearn: '4-6 weeks',
      recommended: true
    },
    {
      skill: 'GraphQL',
      currentLevel: 0,
      marketDemand: 'Medium',
      potentialIncrease: '+$12/hr',
      timeToLearn: '3-4 weeks',
      recommended: true
    },
    {
      skill: 'Machine Learning',
      currentLevel: 0,
      marketDemand: 'Very High',
      potentialIncrease: '+$25/hr',
      timeToLearn: '12-16 weeks',
      recommended: false
    }
  ]

  const recentActivity = [
    { type: 'payment', message: 'Payment received: $2,500', time: '2 hours ago', amount: 2500 },
    { type: 'project', message: 'Project milestone completed', time: '1 day ago', amount: null },
    { type: 'skill', message: 'React certification verified', time: '3 days ago', amount: null },
    { type: 'application', message: 'Applied to Mobile App project', time: '5 days ago', amount: null }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Talent Dashboard</h1>
        <p className="mt-2 text-gray-600">Track your progress, manage projects, and grow your career</p>
      </div>

      {/* Header Stats */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, John!</h2>
            <p className="text-blue-100">You're performing excellently this month</p>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${talentStats.thisMonth.toLocaleString()}</div>
            <div className="text-blue-200">This Month's Earnings</div>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Skill Rating</h3>
          <p className="text-2xl font-bold text-gray-900">{talentStats.skillRating}/5</p>
          <p className="text-xs text-green-600">Top 5% performer</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
          <p className="text-2xl font-bold text-gray-900">{talentStats.activeProjects}</p>
          <p className="text-xs text-blue-600">{talentStats.hoursLogged}h this week</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Market Value</h3>
          <p className="text-2xl font-bold text-gray-900">${talentStats.marketValue}/hr</p>
          <p className="text-xs text-purple-600">+12% vs last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Client Satisfaction</h3>
          <p className="text-2xl font-bold text-gray-900">{talentStats.clientSatisfaction}%</p>
          <p className="text-xs text-orange-600">Excellent rating</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'projects', 'opportunities', 'skills', 'earnings', 'profile'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-4 px-1 border-b-2 font-medium text-sm capitalize ${
                  activeTab === tab
                    ? 'border-blue-500 text-blue-600'
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
                  {activeProjects.map(project => (
                    <div key={project.id} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-medium text-gray-900">{project.name}</h4>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {project.status}
                        </span>
                      </div>
                      <p className="text-sm text-gray-600 mb-2">Client: {project.client}</p>
                      <div className="flex justify-between text-sm text-gray-500 mb-2">
                        <span>Progress: {project.progress}%</span>
                        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link 
                  to="/projects" 
                  className="mt-4 inline-block text-blue-600 hover:text-blue-800 text-sm font-medium"
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
                        activity.type === 'payment' ? 'bg-green-500' :
                        activity.type === 'project' ? 'bg-blue-500' :
                        activity.type === 'skill' ? 'bg-purple-500' : 'bg-orange-500'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                        <p className="text-xs text-gray-500">{activity.time}</p>
                      </div>
                      {activity.amount && (
                        <span className="text-sm font-semibold text-green-600">+${activity.amount}</span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Projects Tab */}
          {activeTab === 'projects' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">My Projects</h3>
                <Link 
                  to="/projects" 
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  View All Projects
                </Link>
              </div>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {activeProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{project.name}</h4>
                        <p className="text-gray-600">Client: {project.client}</p>
                      </div>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        project.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {project.status}
                      </span>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Progress</span>
                        <span className="font-medium">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-gray-600">Budget:</span>
                          <span className="font-medium ml-1">${project.budget.toLocaleString()}</span>
                        </div>
                        <div>
                          <span className="text-gray-600">Hours:</span>
                          <span className="font-medium ml-1">{project.hoursLogged}h</span>
                        </div>
                      </div>
                      
                      <div className="text-sm text-gray-600">
                        Due: {new Date(project.dueDate).toLocaleDateString()}
                      </div>
                    </div>

                    <Link 
                      to={`/projects/${project.id}`}
                      className="mt-4 w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 text-center block"
                    >
                      Manage Project
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Opportunities Tab */}
          {activeTab === 'opportunities' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Available Opportunities</h3>
                <div className="flex space-x-2">
                  <select className="text-sm border rounded px-3 py-1">
                    <option>All Skills</option>
                    <option>React</option>
                    <option>Node.js</option>
                    <option>Python</option>
                  </select>
                  <select className="text-sm border rounded px-3 py-1">
                    <option>All Budgets</option>
                    <option>$5K - $15K</option>
                    <option>$15K - $30K</option>
                    <option>$30K+</option>
                  </select>
                </div>
              </div>

              <div className="space-y-6">
                {availableOpportunities.map(opportunity => (
                  <div key={opportunity.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h4 className="font-semibold text-gray-900 text-lg">{opportunity.title}</h4>
                        <p className="text-gray-600">Client: {opportunity.client}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold text-green-600">{opportunity.matchScore}% Match</div>
                        <div className="text-sm text-gray-500">{opportunity.posted}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                      <div>
                        <span className="text-sm text-gray-600">Budget:</span>
                        <div className="font-medium">{opportunity.budget}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Duration:</span>
                        <div className="font-medium">{opportunity.duration}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Applicants:</span>
                        <div className="font-medium">{opportunity.applicants} applied</div>
                      </div>
                    </div>

                    <div className="mb-4">
                      <span className="text-sm text-gray-600">Required Skills:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {opportunity.skills.map(skill => (
                          <span key={skill} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-3">
                      <button className="flex-1 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
                        Apply Now
                      </button>
                      <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        Save
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Skill Development</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Recommended Skills</h4>
                  <div className="space-y-4">
                    {skillDevelopment.map((skill, index) => (
                      <div key={index} className={`p-4 border rounded-lg ${
                        skill.recommended ? 'border-green-200 bg-green-50' : 'border-gray-200'
                      }`}>
                        <div className="flex justify-between items-start mb-2">
                          <h5 className="font-medium text-gray-900">{skill.skill}</h5>
                          {skill.recommended && (
                            <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">
                              Recommended
                            </span>
                          )}
                        </div>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-gray-600">Market Demand:</span>
                            <div className="font-medium">{skill.marketDemand}</div>
                          </div>
                          <div>
                            <span className="text-gray-600">Potential Increase:</span>
                            <div className="font-medium text-green-600">{skill.potentialIncrease}</div>
                          </div>
                        </div>
                        <div className="mt-2 text-sm text-gray-600">
                          Time to learn: {skill.timeToLearn}
                        </div>
                        <button className="mt-3 w-full bg-blue-600 text-white py-2 rounded text-sm hover:bg-blue-700">
                          Start Learning
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-gray-900 mb-4">Current Skills</h4>
                  <Link 
                    to="/profile"
                    className="block p-6 border-2 border-dashed border-gray-300 rounded-lg text-center hover:border-gray-400"
                  >
                    <div className="text-gray-600 mb-2">📊</div>
                    <div className="font-medium text-gray-900">View Full Skill Profile</div>
                    <div className="text-sm text-gray-600">Manage your skills, certifications, and assessments</div>
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Earnings Overview</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-2">This Month</h4>
                  <div className="text-2xl font-bold text-green-900">${talentStats.thisMonth.toLocaleString()}</div>
                  <div className="text-sm text-green-700">+23% vs last month</div>
                </div>
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-2">Total Earnings</h4>
                  <div className="text-2xl font-bold text-blue-900">${talentStats.totalEarnings.toLocaleString()}</div>
                  <div className="text-sm text-blue-700">Across {talentStats.completedProjects} projects</div>
                </div>
                <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-purple-900 mb-2">Hourly Rate</h4>
                  <div className="text-2xl font-bold text-purple-900">${talentStats.marketValue}/hr</div>
                  <div className="text-sm text-purple-700">Market competitive</div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Earnings Trend</h4>
                <div className="h-64 bg-gradient-to-t from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-gray-600 mb-2">📈</div>
                    <div className="text-lg font-semibold text-gray-800">Steady Growth</div>
                    <div className="text-sm text-gray-600">Your earnings have grown 45% this quarter</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Profile Management</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Link 
                  to="/profile"
                  className="p-6 border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                >
                  <div className="text-2xl mb-3">👤</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Complete Profile</h4>
                  <p className="text-gray-600 text-sm">Manage your professional profile, skills, and portfolio</p>
                </Link>

                <div className="p-6 border border-gray-200 rounded-lg">
                  <div className="text-2xl mb-3">🎯</div>
                  <h4 className="font-semibold text-gray-900 mb-2">Performance Metrics</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Response Time:</span>
                      <span className="font-medium">{talentStats.responseTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Client Satisfaction:</span>
                      <span className="font-medium">{talentStats.clientSatisfaction}%</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Projects Completed:</span>
                      <span className="font-medium">{talentStats.completedProjects}</span>
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