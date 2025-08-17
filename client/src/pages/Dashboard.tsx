import { useState, useEffect } from 'react'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState('overview')
  const [timeRange, setTimeRange] = useState('7d')

  const renderClientDashboard = () => (
    <div className="space-y-6">
      {/* Advanced Analytics Header */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}!</h2>
            <p className="text-orange-100">Your talent marketplace command center</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">$47,230</div>
            <div className="text-orange-100">Total Investment</div>
            <div className="text-sm text-orange-200">+12% vs last month</div>
          </div>
        </div>
      </div>

      {/* Advanced Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-xs text-green-600">+2 this week</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">📊</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '75%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">75% capacity utilization</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Talent Pool</h3>
              <p className="text-2xl font-bold text-gray-900">24</p>
              <p className="text-xs text-blue-600">3 new this week</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
          <div className="mt-4 flex space-x-1">
            <div className="flex-1 bg-green-200 h-2 rounded"></div>
            <div className="flex-1 bg-yellow-200 h-2 rounded"></div>
            <div className="flex-1 bg-red-200 h-2 rounded"></div>
          </div>
          <p className="text-xs text-gray-500 mt-1">18 active, 4 available, 2 on break</p>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">ROI This Month</h3>
              <p className="text-2xl font-bold text-gray-900">284%</p>
              <p className="text-xs text-green-600">+47% vs target</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">📈</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-500">Revenue: $28,450</div>
            <div className="text-xs text-gray-500">Investment: $10,020</div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">AI Match Score</h3>
              <p className="text-2xl font-bold text-gray-900">94.2%</p>
              <p className="text-xs text-purple-600">Excellent matching</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">🤖</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Project Management */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Project Performance</h3>
            <select className="text-sm border rounded px-2 py-1">
              <option>Last 7 days</option>
              <option>Last 30 days</option>
              <option>Last 90 days</option>
            </select>
          </div>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">E-commerce Platform</div>
                  <div className="text-sm text-gray-500">3 developers • 67% complete</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-green-600">On Track</div>
                <div className="text-xs text-gray-500">Due in 12 days</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-yellow-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">Mobile App Redesign</div>
                  <div className="text-sm text-gray-500">2 designers • 34% complete</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-yellow-600">At Risk</div>
                <div className="text-xs text-gray-500">Due in 8 days</div>
              </div>
            </div>

            <div className="flex items-center justify-between p-3 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-3"></div>
                <div>
                  <div className="font-medium">API Integration</div>
                  <div className="text-sm text-gray-500">1 backend dev • 89% complete</div>
                </div>
              </div>
              <div className="text-right">
                <div className="font-semibold text-blue-600">Ahead</div>
                <div className="text-xs text-gray-500">Due in 5 days</div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">AI Insights & Recommendations</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg border-l-4 border-purple-500">
              <div className="flex items-start">
                <span className="text-purple-600 text-xl mr-3">🎯</span>
                <div>
                  <h4 className="font-medium text-purple-900">Talent Optimization</h4>
                  <p className="text-sm text-purple-700 mt-1">Consider adding a DevOps specialist to reduce deployment bottlenecks by 40%</p>
                  <button className="text-xs text-purple-600 hover:text-purple-800 mt-2">View Details →</button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg border-l-4 border-green-500">
              <div className="flex items-start">
                <span className="text-green-600 text-xl mr-3">💡</span>
                <div>
                  <h4 className="font-medium text-green-900">Cost Optimization</h4>
                  <p className="text-sm text-green-700 mt-1">Switching to fixed-price contracts could save 15% on current projects</p>
                  <button className="text-xs text-green-600 hover:text-green-800 mt-2">Explore Options →</button>
                </div>
              </div>
            </div>

            <div className="p-4 bg-gradient-to-r from-orange-50 to-orange-100 rounded-lg border-l-4 border-orange-500">
              <div className="flex items-start">
                <span className="text-orange-600 text-xl mr-3">⚡</span>
                <div>
                  <h4 className="font-medium text-orange-900">Performance Alert</h4>
                  <p className="text-sm text-orange-700 mt-1">Project velocity increased 23% after implementing daily standups</p>
                  <button className="text-xs text-orange-600 hover:text-orange-800 mt-2">Apply to All →</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Action Center */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Smart Action Center</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button className="p-4 border-2 border-dashed border-orange-300 rounded-lg hover:border-orange-500 hover:bg-orange-50 transition-all group">
            <div className="text-center">
              <div className="text-orange-600 text-3xl mb-2 group-hover:scale-110 transition-transform">🚀</div>
              <div className="font-medium">Launch New Project</div>
              <div className="text-sm text-gray-500 mt-1">AI-powered project setup</div>
            </div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-blue-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all group">
            <div className="text-center">
              <div className="text-blue-600 text-3xl mb-2 group-hover:scale-110 transition-transform">🎯</div>
              <div className="font-medium">Find Perfect Talent</div>
              <div className="text-sm text-gray-500 mt-1">AI matching algorithm</div>
            </div>
          </button>
          
          <button className="p-4 border-2 border-dashed border-green-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all group">
            <div className="text-center">
              <div className="text-green-600 text-3xl mb-2 group-hover:scale-110 transition-transform">📊</div>
              <div className="font-medium">Analytics Deep Dive</div>
              <div className="text-sm text-gray-500 mt-1">Advanced reporting</div>
            </div>
          </button>
        </div>
      </div>

      {/* Real-time Notifications */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Live Updates</h3>
        <div className="space-y-3">
          <div className="flex items-center p-3 bg-green-50 border-l-4 border-green-400 rounded">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-3 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-green-800">Project milestone completed</p>
              <p className="text-xs text-green-600">E-commerce Platform - Payment integration finished</p>
            </div>
            <span className="text-xs text-green-500">2 min ago</span>
          </div>
          
          <div className="flex items-center p-3 bg-blue-50 border-l-4 border-blue-400 rounded">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-3 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-blue-800">New talent application</p>
              <p className="text-xs text-blue-600">Senior React Developer from Berlin applied</p>
            </div>
            <span className="text-xs text-blue-500">5 min ago</span>
          </div>
          
          <div className="flex items-center p-3 bg-orange-50 border-l-4 border-orange-400 rounded">
            <div className="w-2 h-2 bg-orange-500 rounded-full mr-3 animate-pulse"></div>
            <div className="flex-1">
              <p className="text-sm font-medium text-orange-800">Budget alert</p>
              <p className="text-xs text-orange-600">Mobile App project at 80% budget utilization</p>
            </div>
            <span className="text-xs text-orange-500">12 min ago</span>
          </div>
        </div>
      </div>
    </div>
  )

  const renderTalentDashboard = () => (
    <div className="space-y-6">
      {/* Talent Performance Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Welcome back, {user?.email?.split('@')[0]}!</h2>
            <p className="text-blue-100">Your professional growth dashboard</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">$8,450</div>
            <div className="text-blue-100">This Month</div>
            <div className="text-sm text-blue-200">+28% vs last month</div>
          </div>
        </div>
      </div>

      {/* Advanced Talent Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Skill Rating</h3>
              <p className="text-2xl font-bold text-gray-900">4.9/5</p>
              <p className="text-xs text-green-600">Top 5% performer</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">⭐</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="flex space-x-1">
              {[1,2,3,4,5].map(i => (
                <div key={i} className={`flex-1 h-2 rounded ${i <= 5 ? 'bg-green-500' : 'bg-gray-200'}`}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-xs text-blue-600">2 high priority</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">📋</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-500 h-2 rounded-full" style={{ width: '85%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">85% completion rate</p>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Hours This Week</h3>
              <p className="text-2xl font-bold text-gray-900">38.5</p>
              <p className="text-xs text-purple-600">96% efficiency</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">⏱️</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="text-xs text-gray-500">Target: 40 hours</div>
            <div className="text-xs text-gray-500">Billable: 36.2 hours</div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Market Value</h3>
              <p className="text-2xl font-bold text-gray-900">$95/hr</p>
              <p className="text-xs text-orange-600">+$10 this month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">💰</span>
            </div>
          </div>
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-orange-500 h-2 rounded-full" style={{ width: '78%' }}></div>
            </div>
            <p className="text-xs text-gray-500 mt-1">78th percentile</p>
          </div>
        </div>
      </div>

      {/* Skill Development & Learning */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Skill Development Path</h3>
          <div className="space-y-4">
            <div className="p-4 bg-gradient-to-r from-green-50 to-green-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-green-900">React Advanced Patterns</h4>
                <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">85%</span>
              </div>
              <div className="w-full bg-green-200 rounded-full h-2">
                <div className="bg-green-500 h-2 rounded-full" style={{ width: '85%' }}></div>
              </div>
              <p className="text-xs text-green-700 mt-2">2 modules remaining • Est. 4 hours</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-blue-900">AWS Solutions Architect</h4>
                <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">42%</span>
              </div>
              <div className="w-full bg-blue-200 rounded-full h-2">
                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '42%' }}></div>
              </div>
              <p className="text-xs text-blue-700 mt-2">8 modules remaining • Est. 16 hours</p>
            </div>

            <div className="p-4 bg-gradient-to-r from-purple-50 to-purple-100 rounded-lg">
              <div className="flex justify-between items-center mb-2">
                <h4 className="font-medium text-purple-900">Machine Learning Basics</h4>
                <span className="text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">New</span>
              </div>
              <div className="w-full bg-purple-200 rounded-full h-2">
                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '0%' }}></div>
              </div>
              <p className="text-xs text-purple-700 mt-2">12 modules • Est. 24 hours</p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Performance Analytics</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Code Quality Score</span>
              <div className="flex items-center">
                <span className="text-lg font-bold text-green-600 mr-2">9.2/10</span>
                <span className="text-xs text-green-600">↗ +0.3</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Client Satisfaction</span>
              <div className="flex items-center">
                <span className="text-lg font-bold text-blue-600 mr-2">4.8/5</span>
                <span className="text-xs text-blue-600">↗ +0.1</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Delivery Speed</span>
              <div className="flex items-center">
                <span className="text-lg font-bold text-purple-600 mr-2">94%</span>
                <span className="text-xs text-purple-600">↗ +2%</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded">
              <span className="text-sm font-medium">Communication</span>
              <div className="flex items-center">
                <span className="text-lg font-bold text-orange-600 mr-2">4.9/5</span>
                <span className="text-xs text-orange-600">→ 0</span>
              </div>
            </div>
          </div>
          
          <div className="mt-4 p-3 bg-gradient-to-r from-yellow-50 to-yellow-100 rounded border-l-4 border-yellow-500">
            <h4 className="font-medium text-yellow-900">Growth Opportunity</h4>
            <p className="text-sm text-yellow-700 mt-1">Focus on TypeScript mastery to unlock senior roles (+$15/hr potential)</p>
          </div>
        </div>
      </div>

      {/* Opportunity Marketplace */}
      <div className="bg-white shadow rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommended Opportunities</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 border border-green-200 rounded-lg bg-gradient-to-r from-green-50 to-green-100">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-green-900">Senior React Developer</h4>
              <span className="text-xs bg-green-200 text-green-800 px-2 py-1 rounded">98% Match</span>
            </div>
            <p className="text-sm text-green-700 mb-3">FinTech startup building next-gen trading platform</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-green-600">$110/hr</span>
              <button className="text-xs bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700">Apply Now</button>
            </div>
          </div>
          
          <div className="p-4 border border-blue-200 rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
            <div className="flex justify-between items-start mb-2">
              <h4 className="font-medium text-blue-900">Full Stack Engineer</h4>
              <span className="text-xs bg-blue-200 text-blue-800 px-2 py-1 rounded">92% Match</span>
            </div>
            <p className="text-sm text-blue-700 mb-3">E-commerce platform scaling to 1M+ users</p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">$95/hr</span>
              <button className="text-xs bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700">View Details</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  const renderAdminDashboard = () => (
    <div className="space-y-6">
      {/* Advanced Admin Header */}
      <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-lg p-6 text-white">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold mb-2">Platform Command Center</h2>
            <p className="text-gray-300">Real-time platform monitoring and management</p>
          </div>
          <div className="text-right">
            <div className="text-3xl font-bold">99.9%</div>
            <div className="text-gray-300">System Health</div>
            <div className="text-sm text-green-400">All systems operational</div>
          </div>
        </div>
      </div>

      {/* Advanced System Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Total Users</h3>
              <p className="text-2xl font-bold text-gray-900">2,847</p>
              <p className="text-xs text-blue-600">+127 this week</p>
            </div>
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-xl">👥</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Revenue</h3>
              <p className="text-2xl font-bold text-gray-900">$284K</p>
              <p className="text-xs text-green-600">+18% MoM</p>
            </div>
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span className="text-green-600 text-xl">💰</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Active Projects</h3>
              <p className="text-2xl font-bold text-gray-900">156</p>
              <p className="text-xs text-purple-600">+23 this week</p>
            </div>
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 text-xl">📊</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">AI Accuracy</h3>
              <p className="text-2xl font-bold text-gray-900">96.8%</p>
              <p className="text-xs text-orange-600">+2.1% this month</p>
            </div>
            <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span className="text-orange-600 text-xl">🤖</span>
            </div>
          </div>
        </div>

        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-red-500">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Support Tickets</h3>
              <p className="text-2xl font-bold text-gray-900">12</p>
              <p className="text-xs text-red-600">-8 vs yesterday</p>
            </div>
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <span className="text-red-600 text-xl">🎫</span>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Management Tabs */}
      <div className="bg-white shadow rounded-lg">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['overview', 'users', 'projects', 'analytics', 'security'].map((tab) => (
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
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Platform Health</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span>API Response Time</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">89ms</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Excellent</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Database Performance</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">99.2%</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Optimal</span>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>CDN Cache Hit Rate</span>
                    <div className="flex items-center">
                      <span className="text-sm text-gray-500 mr-2">94.7%</span>
                      <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Good</span>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Recent Alerts</h4>
                <div className="space-y-3">
                  <div className="p-3 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                    <div className="text-sm font-medium text-yellow-800">High CPU Usage</div>
                    <div className="text-xs text-yellow-600">Server load at 85% - consider scaling</div>
                  </div>
                  <div className="p-3 bg-green-50 border-l-4 border-green-400 rounded">
                    <div className="text-sm font-medium text-green-800">Backup Completed</div>
                    <div className="text-xs text-green-600">Daily backup successful at 02:00 UTC</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div>
              <div className="flex justify-between items-center mb-4">
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
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    <tr>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm">JD</div>
                          <div className="ml-3">
                            <div className="text-sm font-medium text-gray-900">John Doe</div>
                            <div className="text-sm text-gray-500">john@example.com</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs">Talent</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs">Active</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">$12,450</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button className="text-orange-600 hover:text-orange-900 mr-3">Edit</button>
                        <button className="text-red-600 hover:text-red-900">Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">Revenue Analytics</h4>
                <div className="h-64 bg-gradient-to-t from-green-50 to-green-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-green-600 mb-2">📈</div>
                    <div className="text-lg font-semibold text-green-800">Revenue Trending Up</div>
                    <div className="text-sm text-green-600">+24% vs last quarter</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-gray-900 mb-4">User Growth</h4>
                <div className="h-64 bg-gradient-to-t from-blue-50 to-blue-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-blue-600 mb-2">👥</div>
                    <div className="text-lg font-semibold text-blue-800">Steady Growth</div>
                    <div className="text-sm text-blue-600">+15% new users this month</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {user?.role === 'CLIENT' && renderClientDashboard()}
      {user?.role === 'TALENT' && renderTalentDashboard()}
      {user?.role === 'ADMIN' && renderAdminDashboard()}
    </div>
  )
} 