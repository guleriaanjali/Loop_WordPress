import { useState } from 'react'

export default function TalentProfilePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [editMode, setEditMode] = useState(false)
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    title: 'Senior Full Stack Developer',
    hourlyRate: 85,
    availability: 'Available',
    bio: 'Passionate full-stack developer with 8+ years of experience building scalable web applications. Specialized in React, Node.js, and cloud technologies.',
    location: 'San Francisco, CA',
    timezone: 'PST (UTC-8)'
  })

  const skills = [
    { name: 'React', level: 95, verified: true },
    { name: 'Node.js', level: 90, verified: true },
    { name: 'TypeScript', level: 88, verified: true },
    { name: 'PostgreSQL', level: 85, verified: false },
    { name: 'AWS', level: 82, verified: true },
    { name: 'Docker', level: 78, verified: false }
  ]

  const portfolioProjects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      description: 'Full-stack e-commerce solution with React and Node.js',
      image: '🛒',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'Stripe'],
      liveUrl: 'https://demo-ecommerce.com',
      githubUrl: 'https://github.com/johndoe/ecommerce',
      completedDate: '2024-10-15'
    },
    {
      id: 2,
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      image: '📋',
      technologies: ['Vue.js', 'Socket.io', 'MongoDB'],
      liveUrl: 'https://taskmanager-demo.com',
      githubUrl: 'https://github.com/johndoe/taskmanager',
      completedDate: '2024-09-20'
    },
    {
      id: 3,
      title: 'Analytics Dashboard',
      description: 'Real-time analytics dashboard for business intelligence',
      image: '📊',
      technologies: ['React', 'D3.js', 'Python', 'FastAPI'],
      liveUrl: 'https://analytics-demo.com',
      githubUrl: 'https://github.com/johndoe/analytics',
      completedDate: '2024-08-10'
    }
  ]

  const certifications = [
    { name: 'AWS Certified Solutions Architect', issuer: 'Amazon Web Services', date: '2024-06-15', verified: true },
    { name: 'React Advanced Certification', issuer: 'Meta', date: '2024-03-20', verified: true },
    { name: 'Node.js Professional', issuer: 'OpenJS Foundation', date: '2023-11-10', verified: false }
  ]

  const workHistory = [
    {
      company: 'Tech Solutions Inc.',
      position: 'Senior Full Stack Developer',
      duration: '2022 - Present',
      description: 'Led development of multiple web applications using React, Node.js, and cloud technologies.',
      achievements: ['Increased app performance by 40%', 'Led team of 5 developers', 'Implemented CI/CD pipeline']
    },
    {
      company: 'StartupXYZ',
      position: 'Frontend Developer',
      duration: '2020 - 2022',
      description: 'Built responsive web applications and improved user experience across multiple products.',
      achievements: ['Reduced load time by 60%', 'Implemented design system', 'Mentored junior developers']
    }
  ]

  const earnings = {
    thisMonth: 8450,
    lastMonth: 7230,
    thisYear: 89650,
    totalEarnings: 234500,
    hoursThisMonth: 142,
    projectsCompleted: 23
  }

  const recentActivity = [
    { type: 'project_completed', message: 'Completed E-commerce Platform project', time: '2 hours ago', amount: 2500 },
    { type: 'skill_verified', message: 'AWS certification verified', time: '1 day ago', amount: null },
    { type: 'payment_received', message: 'Payment received for Task Manager project', time: '3 days ago', amount: 1800 },
    { type: 'project_started', message: 'Started Analytics Dashboard project', time: '1 week ago', amount: null }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">My Profile</h1>
        <p className="mt-2 text-gray-600">Manage your professional profile and track your success</p>
      </div>

      {/* Profile Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-6">
            <div className="w-24 h-24 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-3xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-3xl font-bold">{profileData.name}</h2>
              <p className="text-blue-100 text-lg">{profileData.title}</p>
              <div className="flex items-center mt-2 space-x-4">
                <span className="px-3 py-1 bg-green-500 bg-opacity-80 rounded-full text-sm">
                  {profileData.availability}
                </span>
                <span className="text-blue-100 text-sm">{profileData.location}</span>
                <span className="text-blue-100 text-sm">{profileData.timezone}</span>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-4xl font-bold">${profileData.hourlyRate}/hr</div>
            <div className="text-blue-100">Current Rate</div>
            <button 
              onClick={() => setEditMode(!editMode)}
              className="mt-2 bg-white bg-opacity-20 text-white px-4 py-2 rounded-lg hover:bg-opacity-30 transition-all"
            >
              {editMode ? 'Save Changes' : 'Edit Profile'}
            </button>
          </div>
        </div>
      </div>

      {/* Earnings Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">This Month</h3>
          <p className="text-2xl font-bold text-gray-900">${earnings.thisMonth.toLocaleString()}</p>
          <p className="text-xs text-green-600">+17% vs last month</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Hours Logged</h3>
          <p className="text-2xl font-bold text-gray-900">{earnings.hoursThisMonth}h</p>
          <p className="text-xs text-blue-600">96% efficiency rate</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">This Year</h3>
          <p className="text-2xl font-bold text-gray-900">${earnings.thisYear.toLocaleString()}</p>
          <p className="text-xs text-purple-600">On track for $120K</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Projects Done</h3>
          <p className="text-2xl font-bold text-gray-900">{earnings.projectsCompleted}</p>
          <p className="text-xs text-orange-600">4.9/5 avg rating</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'skills', 'portfolio', 'experience', 'earnings'].map((tab) => (
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
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Professional Summary</h3>
                {editMode ? (
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                ) : (
                  <p className="text-gray-600">{profileData.bio}</p>
                )}
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Recent Activity</h4>
                  <div className="space-y-3">
                    {recentActivity.map((activity, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center">
                          <div className={`w-3 h-3 rounded-full mr-3 ${
                            activity.type === 'project_completed' ? 'bg-green-500' :
                            activity.type === 'skill_verified' ? 'bg-blue-500' :
                            activity.type === 'payment_received' ? 'bg-purple-500' : 'bg-orange-500'
                          }`}></div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.message}</p>
                            <p className="text-xs text-gray-500">{activity.time}</p>
                          </div>
                        </div>
                        {activity.amount && (
                          <span className="text-sm font-semibold text-green-600">+${activity.amount}</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-3">Performance Metrics</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Client Satisfaction</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-green-500 h-2 rounded-full" style={{ width: '98%' }}></div>
                        </div>
                        <span className="text-sm font-medium">4.9/5</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">On-time Delivery</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-blue-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                        </div>
                        <span className="text-sm font-medium">94%</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-600">Communication</span>
                      <div className="flex items-center">
                        <div className="w-24 bg-gray-200 rounded-full h-2 mr-2">
                          <div className="bg-purple-500 h-2 rounded-full" style={{ width: '96%' }}></div>
                        </div>
                        <span className="text-sm font-medium">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Skills Tab */}
          {activeTab === 'skills' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Technical Skills</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Take Skill Assessment
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {skills.map((skill, index) => (
                  <div key={index} className="p-4 border border-gray-200 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium text-gray-900">{skill.name}</span>
                      <div className="flex items-center">
                        {skill.verified && (
                          <span className="text-green-500 text-sm mr-2">✓ Verified</span>
                        )}
                        <span className="text-sm text-gray-600">{skill.level}%</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${skill.verified ? 'bg-green-500' : 'bg-blue-500'}`}
                        style={{ width: `${skill.level}%` }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-800 mb-2">Skill Recommendations</h4>
                <p className="text-sm text-yellow-700 mb-3">
                  Based on market demand, consider adding these skills to increase your earning potential:
                </p>
                <div className="flex flex-wrap gap-2">
                  {['Next.js', 'GraphQL', 'Kubernetes', 'Machine Learning'].map(skill => (
                    <span key={skill} className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm">
                      {skill} (+$15/hr)
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gray-900 mb-3">Certifications</h4>
                <div className="space-y-3">
                  {certifications.map((cert, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <h5 className="font-medium text-gray-900">{cert.name}</h5>
                        <p className="text-sm text-gray-600">{cert.issuer} • {cert.date}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs ${
                        cert.verified ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {cert.verified ? 'Verified' : 'Pending'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Portfolio Tab */}
          {activeTab === 'portfolio' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900">Portfolio Projects</h3>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Add New Project
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {portfolioProjects.map(project => (
                  <div key={project.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="p-6">
                      <div className="text-4xl mb-4">{project.image}</div>
                      <h4 className="font-semibold text-gray-900 mb-2">{project.title}</h4>
                      <p className="text-sm text-gray-600 mb-4">{project.description}</p>
                      
                      <div className="flex flex-wrap gap-1 mb-4">
                        {project.technologies.map(tech => (
                          <span key={tech} className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-xs">
                            {tech}
                          </span>
                        ))}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-xs text-gray-500">{project.completedDate}</span>
                        <div className="flex space-x-2">
                          <a href={project.liveUrl} className="text-blue-600 hover:text-blue-800 text-sm">Live</a>
                          <a href={project.githubUrl} className="text-gray-600 hover:text-gray-800 text-sm">Code</a>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Experience Tab */}
          {activeTab === 'experience' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
              
              <div className="space-y-6">
                {workHistory.map((job, index) => (
                  <div key={index} className="border-l-4 border-blue-500 pl-6">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900">{job.position}</h4>
                        <p className="text-blue-600">{job.company}</p>
                      </div>
                      <span className="text-sm text-gray-500">{job.duration}</span>
                    </div>
                    <p className="text-gray-600 mb-3">{job.description}</p>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Key Achievements:</h5>
                      <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                        {job.achievements.map((achievement, i) => (
                          <li key={i}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Earnings Tab */}
          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Earnings & Analytics</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">Earnings Summary</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-green-700">Total Lifetime:</span>
                      <span className="font-bold text-green-900">${earnings.totalEarnings.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">This Year:</span>
                      <span className="font-bold text-green-900">${earnings.thisYear.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">This Month:</span>
                      <span className="font-bold text-green-900">${earnings.thisMonth.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-green-700">Last Month:</span>
                      <span className="font-bold text-green-900">${earnings.lastMonth.toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Performance Insights</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-blue-700">Avg. Project Value:</span>
                      <span className="font-bold text-blue-900">$3,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Repeat Clients:</span>
                      <span className="font-bold text-blue-900">78%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Response Time:</span>
                      <span className="font-bold text-blue-900">&lt; 2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-blue-700">Success Rate:</span>
                      <span className="font-bold text-blue-900">96%</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Monthly Earnings Trend</h4>
                <div className="h-64 bg-gradient-to-t from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-blue-600 mb-2">📈</div>
                    <div className="text-lg font-semibold text-blue-800">Steady Growth</div>
                    <div className="text-sm text-blue-600">+23% increase over last 6 months</div>
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