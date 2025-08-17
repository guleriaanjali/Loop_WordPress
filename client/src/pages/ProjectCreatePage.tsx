import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

interface ProjectFormData {
  name: string
  description: string
  budget: number
  timeline: number
  teamSize: number
  complexity: string
  skills: string[]
  priority: string
}

export default function ProjectCreatePage() {
  const navigate = useNavigate()
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState<ProjectFormData>({
    name: '',
    description: '',
    budget: 10000,
    timeline: 8,
    teamSize: 2,
    complexity: 'medium',
    skills: [],
    priority: 'medium'
  })

  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 
    'PostgreSQL', 'MongoDB', 'GraphQL', 'Vue.js', 'Angular', 'Django',
    'Kubernetes', 'Machine Learning', 'DevOps', 'Mobile Development',
    'UI/UX Design', 'Data Science', 'Blockchain', 'Cybersecurity'
  ]

  const complexityOptions = {
    simple: { multiplier: 0.8, label: 'Simple (MVP, Basic Features)', description: 'Basic functionality, minimal integrations' },
    medium: { multiplier: 1.0, label: 'Medium (Standard App)', description: 'Standard features, moderate complexity' },
    complex: { multiplier: 1.4, label: 'Complex (Enterprise Solution)', description: 'Advanced features, multiple integrations' },
    enterprise: { multiplier: 1.8, label: 'Enterprise (Mission Critical)', description: 'High complexity, enterprise-grade requirements' }
  }

  const priorityOptions = [
    { value: 'low', label: 'Low Priority', color: 'bg-green-500' },
    { value: 'medium', label: 'Medium Priority', color: 'bg-yellow-500' },
    { value: 'high', label: 'High Priority', color: 'bg-orange-500' },
    { value: 'urgent', label: 'Urgent', color: 'bg-red-500' }
  ]

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill)
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const handleNext = () => {
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would typically submit to your API
    console.log('Creating project:', formData)
    // For demo, just navigate back to projects
    navigate('/projects')
  }

  const estimatedCost = Math.round(
    formData.timeline * 40 * formData.teamSize * 45 * 
    complexityOptions[formData.complexity as keyof typeof complexityOptions].multiplier
  )

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Create New Project</h1>
        <p className="mt-2 text-gray-600">Use our 4-step wizard to set up your project with AI-powered talent matching</p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step}
              </div>
              {step < 4 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-orange-600' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span>Project Details</span>
          <span>Requirements</span>
          <span>Select Talent</span>
          <span>Review</span>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        {/* Step 1: Project Details */}
        {currentStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your project name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Project Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Describe your project goals, features, and requirements"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget: ${formData.budget.toLocaleString()}
                  </label>
                  <input
                    type="range"
                    min="5000"
                    max="100000"
                    step="1000"
                    value={formData.budget}
                    onChange={(e) => setFormData(prev => ({ ...prev, budget: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>$5K</span>
                    <span>$100K</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Timeline: {formData.timeline} weeks
                  </label>
                  <input
                    type="range"
                    min="2"
                    max="52"
                    value={formData.timeline}
                    onChange={(e) => setFormData(prev => ({ ...prev, timeline: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>2 weeks</span>
                    <span>1 year</span>
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  {priorityOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setFormData(prev => ({ ...prev, priority: option.value }))}
                      className={`p-3 border rounded-lg text-center transition-all ${
                        formData.priority === option.value
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-4 h-4 rounded-full ${option.color} mx-auto mb-1`}></div>
                      <div className="text-sm font-medium">{option.label}</div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Requirements */}
        {currentStep === 2 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Project Requirements</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills</label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <button
                      key={skill}
                      onClick={() => toggleSkill(skill)}
                      className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                        formData.skills.includes(skill)
                          ? 'bg-orange-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {skill}
                    </button>
                  ))}
                </div>
                {formData.skills.length > 0 && (
                  <p className="text-sm text-gray-500 mt-2">
                    {formData.skills.length} skill{formData.skills.length > 1 ? 's' : ''} selected
                  </p>
                )}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Team Size: {formData.teamSize} developer{formData.teamSize > 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={formData.teamSize}
                    onChange={(e) => setFormData(prev => ({ ...prev, teamSize: Number(e.target.value) }))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 dev</span>
                    <span>10 devs</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Project Complexity</label>
                  <select
                    value={formData.complexity}
                    onChange={(e) => setFormData(prev => ({ ...prev, complexity: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {Object.entries(complexityOptions).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                  <p className="text-xs text-gray-500 mt-1">
                    {complexityOptions[formData.complexity as keyof typeof complexityOptions].description}
                  </p>
                </div>
              </div>

              <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-4">💰 Cost Estimate</h4>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-blue-700">Team Size:</div>
                    <div className="font-medium text-blue-900">{formData.teamSize} developer{formData.teamSize > 1 ? 's' : ''}</div>
                  </div>
                  <div>
                    <div className="text-blue-700">Duration:</div>
                    <div className="font-medium text-blue-900">{formData.timeline} weeks</div>
                  </div>
                  <div>
                    <div className="text-blue-700">Complexity:</div>
                    <div className="font-medium text-blue-900">{complexityOptions[formData.complexity as keyof typeof complexityOptions].label}</div>
                  </div>
                  <div>
                    <div className="text-blue-700">Estimated Cost:</div>
                    <div className="font-bold text-blue-900 text-lg">${estimatedCost.toLocaleString()}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 3: Select Talent (Placeholder) */}
        {currentStep === 3 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">AI-Matched Talent</h2>
            
            <div className="text-center py-12">
              <div className="text-6xl text-orange-600 mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Matching in Progress</h3>
              <p className="text-gray-600 mb-6">
                Our AI is analyzing your requirements and matching you with the best talent from our global pool.
              </p>
              <div className="bg-gray-100 rounded-lg p-6 max-w-md mx-auto">
                <div className="text-sm text-gray-600 mb-2">Analyzing requirements...</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-orange-500 h-2 rounded-full animate-pulse" style={{ width: '75%' }}></div>
                </div>
                <div className="text-xs text-gray-500 mt-2">
                  Skills: {formData.skills.join(', ') || 'None selected'}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Review */}
        {currentStep === 4 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Review & Create Project</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Project Summary</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Name:</span>
                        <div className="font-medium">{formData.name || 'Untitled Project'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Description:</span>
                        <div className="font-medium">{formData.description || 'No description provided'}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Budget:</span>
                        <div className="font-medium">${formData.budget.toLocaleString()}</div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="space-y-3">
                      <div>
                        <span className="text-sm text-gray-600">Timeline:</span>
                        <div className="font-medium">{formData.timeline} weeks</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Team Size:</span>
                        <div className="font-medium">{formData.teamSize} developer{formData.teamSize > 1 ? 's' : ''}</div>
                      </div>
                      <div>
                        <span className="text-sm text-gray-600">Priority:</span>
                        <div className="font-medium capitalize">{formData.priority}</div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {formData.skills.length > 0 && (
                  <div className="mt-4">
                    <span className="text-sm text-gray-600">Required Skills:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {formData.skills.map(skill => (
                        <span key={skill} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <h4 className="font-semibold text-green-900 mb-2">✅ Ready to Create</h4>
                <p className="text-green-700 text-sm">
                  Your project is configured and ready to be created. Once created, our AI will start matching you with the best talent.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8 pt-6 border-t border-gray-200">
          <button
            onClick={handlePrevious}
            disabled={currentStep === 1}
            className={`px-6 py-2 rounded-lg font-medium ${
              currentStep === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            }`}
          >
            Previous
          </button>
          
          <div className="flex space-x-3">
            <button
              onClick={() => navigate('/projects')}
              className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            
            {currentStep < 4 ? (
              <button
                onClick={handleNext}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
              >
                Create Project
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  )
} 