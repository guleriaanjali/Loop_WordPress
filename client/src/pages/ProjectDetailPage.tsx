import { useState } from 'react'
import { useParams } from 'react-router-dom'

interface Task {
  id: string
  title: string
  description: string
  status: 'backlog' | 'in-progress' | 'review' | 'done'
  priority: 'low' | 'medium' | 'high' | 'urgent'
  assignee: string
  dueDate: string
  timeSpent: number
  estimatedHours: number
  tags: string[]
  comments: number
}

export default function ProjectDetailPage() {
  const { id } = useParams()
  const [activeTab, setActiveTab] = useState('kanban')
  const [showTaskModal, setShowTaskModal] = useState(false)
  const [selectedTask, setSelectedTask] = useState<Task | null>(null)
  const [draggedTask, setDraggedTask] = useState<string | null>(null)

  const project = {
    id: '1',
    name: 'E-commerce Platform',
    description: 'Building a modern e-commerce solution with React and Node.js',
    status: 'active',
    progress: 67,
    budget: 12500,
    spent: 8350,
    startDate: '2024-11-01',
    dueDate: '2024-12-15',
    client: 'TechCorp Inc.',
    teamSize: 3
  }

  const teamMembers = [
    { id: '1', name: 'John Doe', role: 'Full Stack Developer', avatar: 'JD', status: 'online' },
    { id: '2', name: 'Sarah Wilson', role: 'Frontend Developer', avatar: 'SW', status: 'online' },
    { id: '3', name: 'Mike Chen', role: 'Backend Developer', avatar: 'MC', status: 'away' }
  ]

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'User Authentication System',
      description: 'Implement JWT-based authentication with login, register, and password reset',
      status: 'done',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-11-15',
      timeSpent: 16,
      estimatedHours: 20,
      tags: ['backend', 'security'],
      comments: 3
    },
    {
      id: '2',
      title: 'Product Catalog UI',
      description: 'Create responsive product listing and detail pages',
      status: 'in-progress',
      priority: 'high',
      assignee: 'Sarah Wilson',
      dueDate: '2024-11-20',
      timeSpent: 12,
      estimatedHours: 24,
      tags: ['frontend', 'ui'],
      comments: 5
    },
    {
      id: '3',
      title: 'Shopping Cart API',
      description: 'Build REST API for cart operations (add, remove, update)',
      status: 'in-progress',
      priority: 'medium',
      assignee: 'Mike Chen',
      dueDate: '2024-11-18',
      timeSpent: 8,
      estimatedHours: 16,
      tags: ['backend', 'api'],
      comments: 2
    },
    {
      id: '4',
      title: 'Payment Integration',
      description: 'Integrate Stripe payment processing',
      status: 'review',
      priority: 'high',
      assignee: 'John Doe',
      dueDate: '2024-11-25',
      timeSpent: 14,
      estimatedHours: 18,
      tags: ['backend', 'payments'],
      comments: 1
    },
    {
      id: '5',
      title: 'Admin Dashboard',
      description: 'Create admin interface for managing products and orders',
      status: 'backlog',
      priority: 'medium',
      assignee: 'Sarah Wilson',
      dueDate: '2024-12-01',
      timeSpent: 0,
      estimatedHours: 32,
      tags: ['frontend', 'admin'],
      comments: 0
    },
    {
      id: '6',
      title: 'Order Management System',
      description: 'Backend system for processing and tracking orders',
      status: 'backlog',
      priority: 'high',
      assignee: 'Mike Chen',
      dueDate: '2024-12-05',
      timeSpent: 0,
      estimatedHours: 28,
      tags: ['backend', 'orders'],
      comments: 0
    }
  ])

  const columns = [
    { id: 'backlog', title: 'Backlog', color: 'bg-gray-100' },
    { id: 'in-progress', title: 'In Progress', color: 'bg-blue-100' },
    { id: 'review', title: 'Review', color: 'bg-yellow-100' },
    { id: 'done', title: 'Done', color: 'bg-green-100' }
  ]

  const handleDragStart = (taskId: string) => {
    setDraggedTask(taskId)
  }

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault()
  }

  const handleDrop = (e: React.DragEvent, newStatus: string) => {
    e.preventDefault()
    if (draggedTask) {
      setTasks(prev => prev.map(task => 
        task.id === draggedTask 
          ? { ...task, status: newStatus as Task['status'] }
          : task
      ))
      setDraggedTask(null)
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

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status)
  }

  const projectStats = {
    totalTasks: tasks.length,
    completedTasks: tasks.filter(t => t.status === 'done').length,
    inProgressTasks: tasks.filter(t => t.status === 'in-progress').length,
    totalTimeSpent: tasks.reduce((sum, task) => sum + task.timeSpent, 0),
    totalEstimated: tasks.reduce((sum, task) => sum + task.estimatedHours, 0)
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Project Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white mb-8">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold mb-2">{project.name}</h1>
            <p className="text-blue-100 mb-4">{project.description}</p>
            <div className="flex items-center space-x-6">
              <div className="flex items-center">
                <span className="text-blue-200 mr-2">Client:</span>
                <span className="font-medium">{project.client}</span>
              </div>
              <div className="flex items-center">
                <span className="text-blue-200 mr-2">Team:</span>
                <div className="flex -space-x-2">
                  {teamMembers.map(member => (
                    <div key={member.id} className="relative">
                      <div className="w-8 h-8 bg-white bg-opacity-20 rounded-full flex items-center justify-center text-white text-sm font-medium border-2 border-white">
                        {member.avatar}
                      </div>
                      <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full border-2 border-white ${
                        member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                      }`}></div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{project.progress}%</div>
            <div className="text-blue-200">Complete</div>
            <div className="w-32 bg-white bg-opacity-20 rounded-full h-2 mt-2">
              <div 
                className="bg-white h-2 rounded-full" 
                style={{ width: `${project.progress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Project Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-blue-500">
          <h3 className="text-sm font-medium text-gray-500">Total Tasks</h3>
          <p className="text-2xl font-bold text-gray-900">{projectStats.totalTasks}</p>
          <p className="text-xs text-blue-600">{projectStats.completedTasks} completed</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-green-500">
          <h3 className="text-sm font-medium text-gray-500">Budget</h3>
          <p className="text-2xl font-bold text-gray-900">${project.budget.toLocaleString()}</p>
          <p className="text-xs text-green-600">${project.spent.toLocaleString()} spent</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-purple-500">
          <h3 className="text-sm font-medium text-gray-500">Time Tracked</h3>
          <p className="text-2xl font-bold text-gray-900">{projectStats.totalTimeSpent}h</p>
          <p className="text-xs text-purple-600">{projectStats.totalEstimated}h estimated</p>
        </div>
        <div className="bg-white shadow rounded-lg p-6 border-l-4 border-orange-500">
          <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
          <p className="text-2xl font-bold text-gray-900">Dec 15</p>
          <p className="text-xs text-orange-600">18 days remaining</p>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="bg-white shadow rounded-lg mb-6">
        <div className="border-b border-gray-200">
          <nav className="-mb-px flex space-x-8 px-6">
            {['kanban', 'timeline', 'team', 'files', 'analytics'].map((tab) => (
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
          {/* Kanban Board */}
          {activeTab === 'kanban' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Project Board</h3>
                <button 
                  onClick={() => setShowTaskModal(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                >
                  + Add Task
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {columns.map(column => (
                  <div 
                    key={column.id}
                    className={`${column.color} rounded-lg p-4 min-h-96`}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, column.id)}
                  >
                    <div className="flex justify-between items-center mb-4">
                      <h4 className="font-semibold text-gray-900">{column.title}</h4>
                      <span className="bg-white bg-opacity-70 text-gray-700 px-2 py-1 rounded-full text-xs">
                        {getTasksByStatus(column.id).length}
                      </span>
                    </div>

                    <div className="space-y-3">
                      {getTasksByStatus(column.id).map(task => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => handleDragStart(task.id)}
                          onClick={() => setSelectedTask(task)}
                          className="bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow cursor-pointer"
                        >
                          <div className="flex justify-between items-start mb-2">
                            <h5 className="font-medium text-gray-900 text-sm">{task.title}</h5>
                            <div className={`w-3 h-3 rounded-full ${getPriorityColor(task.priority)}`}></div>
                          </div>
                          
                          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{task.description}</p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {task.tags.map(tag => (
                              <span key={tag} className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs">
                                {tag}
                              </span>
                            ))}
                          </div>

                          <div className="flex justify-between items-center text-xs text-gray-500">
                            <div className="flex items-center">
                              <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center text-white text-xs mr-2">
                                {task.assignee.split(' ').map(n => n[0]).join('')}
                              </div>
                              <span>{task.assignee.split(' ')[0]}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <span>⏱️ {task.timeSpent}h</span>
                              <span>💬 {task.comments}</span>
                            </div>
                          </div>

                          <div className="mt-2">
                            <div className="w-full bg-gray-200 rounded-full h-1">
                              <div 
                                className="bg-blue-500 h-1 rounded-full" 
                                style={{ width: `${(task.timeSpent / task.estimatedHours) * 100}%` }}
                              ></div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Timeline Tab */}
          {activeTab === 'timeline' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Timeline</h3>
              <div className="space-y-4">
                <div className="flex items-center p-4 bg-green-50 border-l-4 border-green-400 rounded">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-green-900">User Authentication Completed</h4>
                    <p className="text-sm text-green-700">John Doe completed the authentication system</p>
                  </div>
                  <span className="text-sm text-green-600">2 hours ago</span>
                </div>
                
                <div className="flex items-center p-4 bg-blue-50 border-l-4 border-blue-400 rounded">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-blue-900">Payment Integration in Review</h4>
                    <p className="text-sm text-blue-700">Code review requested for Stripe integration</p>
                  </div>
                  <span className="text-sm text-blue-600">5 hours ago</span>
                </div>
                
                <div className="flex items-center p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
                  <div className="flex-1">
                    <h4 className="font-medium text-yellow-900">Product Catalog UI Progress</h4>
                    <p className="text-sm text-yellow-700">Sarah Wilson updated the product listing page</p>
                  </div>
                  <span className="text-sm text-yellow-600">1 day ago</span>
                </div>
              </div>
            </div>
          )}

          {/* Team Tab */}
          {activeTab === 'team' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Team Members</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {teamMembers.map(member => (
                  <div key={member.id} className="bg-gray-50 rounded-lg p-6">
                    <div className="flex items-center mb-4">
                      <div className="relative">
                        <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.avatar}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                          member.status === 'online' ? 'bg-green-500' : 'bg-yellow-500'
                        }`}></div>
                      </div>
                      <div className="ml-3">
                        <h4 className="font-semibold text-gray-900">{member.name}</h4>
                        <p className="text-sm text-gray-600">{member.role}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Tasks Assigned:</span>
                        <span className="font-medium">{tasks.filter(t => t.assignee === member.name).length}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Hours This Week:</span>
                        <span className="font-medium">
                          {tasks.filter(t => t.assignee === member.name).reduce((sum, t) => sum + t.timeSpent, 0)}h
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Status:</span>
                        <span className={`font-medium ${member.status === 'online' ? 'text-green-600' : 'text-yellow-600'}`}>
                          {member.status}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Files Tab */}
          {activeTab === 'files' && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Project Files</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                <div className="text-4xl text-gray-400 mb-4">📁</div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">No files uploaded yet</h4>
                <p className="text-gray-600 mb-4">Upload project files, documents, and assets here</p>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                  Upload Files
                </button>
              </div>
            </div>
          )}

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Project Analytics</h3>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-blue-900 mb-4">Task Distribution</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Backlog:</span>
                      <span className="font-bold text-blue-900">{getTasksByStatus('backlog').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">In Progress:</span>
                      <span className="font-bold text-blue-900">{getTasksByStatus('in-progress').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Review:</span>
                      <span className="font-bold text-blue-900">{getTasksByStatus('review').length}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-blue-700">Done:</span>
                      <span className="font-bold text-blue-900">{getTasksByStatus('done').length}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">Time Tracking</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Total Logged:</span>
                      <span className="font-bold text-green-900">{projectStats.totalTimeSpent}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Estimated:</span>
                      <span className="font-bold text-green-900">{projectStats.totalEstimated}h</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-green-700">Efficiency:</span>
                      <span className="font-bold text-green-900">
                        {Math.round((projectStats.totalTimeSpent / projectStats.totalEstimated) * 100)}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h4 className="font-semibold text-gray-900 mb-4">Progress Chart</h4>
                <div className="h-64 bg-gradient-to-t from-gray-50 to-gray-100 rounded-lg flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl text-gray-600 mb-2">📊</div>
                    <div className="text-lg font-semibold text-gray-800">Project on Track</div>
                    <div className="text-sm text-gray-600">{project.progress}% complete, {18} days remaining</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Task Detail Modal */}
      {selectedTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-start">
                <div>
                  <h2 className="text-xl font-bold text-gray-900">{selectedTask.title}</h2>
                  <div className="flex items-center mt-2 space-x-4">
                    <span className={`px-2 py-1 rounded-full text-xs ${getPriorityColor(selectedTask.priority)} text-white`}>
                      {selectedTask.priority}
                    </span>
                    <span className="text-sm text-gray-500">Due: {selectedTask.dueDate}</span>
                  </div>
                </div>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="text-gray-400 hover:text-gray-600 text-2xl"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-600">{selectedTask.description}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Assignee</h3>
                    <div className="flex items-center">
                      <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm mr-2">
                        {selectedTask.assignee.split(' ').map(n => n[0]).join('')}
                      </div>
                      <span>{selectedTask.assignee}</span>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Time Tracking</h3>
                    <div className="text-sm text-gray-600">
                      <div>Spent: {selectedTask.timeSpent}h / {selectedTask.estimatedHours}h</div>
                      <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-500 h-2 rounded-full" 
                          style={{ width: `${(selectedTask.timeSpent / selectedTask.estimatedHours) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedTask.tags.map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Comments ({selectedTask.comments})</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-gray-600 text-sm">No comments yet. Be the first to add a comment!</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-200 flex justify-between">
              <button className="text-gray-600 hover:text-gray-800">
                Add Comment
              </button>
              <div className="flex space-x-3">
                <button className="px-4 py-2 text-gray-600 hover:text-gray-800">
                  Edit Task
                </button>
                <button 
                  onClick={() => setSelectedTask(null)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 