import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function LandingPage() {
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [projectBudget, setProjectBudget] = useState(5000)
  const [projectDuration, setProjectDuration] = useState(4)
  const [teamSize, setTeamSize] = useState(2)
  const [projectComplexity, setProjectComplexity] = useState('medium')
  const [selectedTalent, setSelectedTalent] = useState<string | null>(null)

  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 
    'PostgreSQL', 'MongoDB', 'GraphQL', 'Vue.js', 'Angular', 'Django',
    'Kubernetes', 'Machine Learning', 'DevOps', 'Mobile Development'
  ]

  const complexityMultipliers = {
    simple: { multiplier: 0.8, label: 'Simple (MVP, Basic Features)' },
    medium: { multiplier: 1.0, label: 'Medium (Standard App)' },
    complex: { multiplier: 1.4, label: 'Complex (Enterprise Solution)' },
    enterprise: { multiplier: 1.8, label: 'Enterprise (Mission Critical)' }
  }

  const talentProfiles = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      title: 'Senior Full Stack Developer',
      location: 'Bangalore, India',
      rate: 45,
      rating: 4.9,
      completedProjects: 127,
      skills: ['React', 'Node.js', 'AWS', 'TypeScript'],
      avatar: 'RK',
      experience: '8+ years',
      availability: 'Available now',
      specialties: ['E-commerce', 'Fintech', 'SaaS'],
      languages: ['English (Fluent)', 'Hindi (Native)'],
      timezone: 'IST (UTC+5:30)'
    },
    {
      id: '2',
      name: 'Maria Santos',
      title: 'Frontend Specialist & UX Engineer',
      location: 'São Paulo, Brazil',
      rate: 38,
      rating: 4.8,
      completedProjects: 89,
      skills: ['React', 'Vue.js', 'TypeScript', 'GraphQL'],
      avatar: 'MS',
      experience: '6+ years',
      availability: 'Available in 1 week',
      specialties: ['Design Systems', 'Mobile-First', 'Performance'],
      languages: ['English (Fluent)', 'Portuguese (Native)', 'Spanish (Conversational)'],
      timezone: 'BRT (UTC-3)'
    },
    {
      id: '3',
      name: 'Alex Petrov',
      title: 'DevOps Engineer & Cloud Architect',
      location: 'Kiev, Ukraine',
      rate: 42,
      rating: 4.9,
      completedProjects: 156,
      skills: ['AWS', 'Docker', 'Python', 'PostgreSQL', 'Kubernetes'],
      avatar: 'AP',
      experience: '7+ years',
      availability: 'Available now',
      specialties: ['Cloud Migration', 'CI/CD', 'Security'],
      languages: ['English (Fluent)', 'Ukrainian (Native)', 'Russian (Native)'],
      timezone: 'EET (UTC+2)'
    },
    {
      id: '4',
      name: 'Priya Sharma',
      title: 'AI/ML Engineer',
      location: 'Mumbai, India',
      rate: 48,
      rating: 4.9,
      completedProjects: 73,
      skills: ['Python', 'Machine Learning', 'AWS', 'PostgreSQL'],
      avatar: 'PS',
      experience: '5+ years',
      availability: 'Available in 2 weeks',
      specialties: ['NLP', 'Computer Vision', 'Data Science'],
      languages: ['English (Fluent)', 'Hindi (Native)'],
      timezone: 'IST (UTC+5:30)'
    }
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  // Advanced cost calculation
  const baseHourlyRate = 45 // Average rate
  const hoursPerWeek = 40
  const complexityMult = complexityMultipliers[projectComplexity as keyof typeof complexityMultipliers].multiplier
  
  const totalHours = projectDuration * hoursPerWeek * teamSize
  const adjustedRate = baseHourlyRate * complexityMult
  const estimatedCost = Math.round(totalHours * adjustedRate)
  const usMarketCost = Math.round(estimatedCost * 2.5) // US rates are typically 2.5x higher
  const estimatedSavings = usMarketCost - estimatedCost
  const savingsPercentage = Math.round((estimatedSavings / usMarketCost) * 100)

  // Filter talent based on selected skills
  const filteredTalent = talentProfiles.filter(talent => 
    selectedSkills.length === 0 || 
    selectedSkills.some(skill => talent.skills.includes(skill))
  ).slice(0, 3) // Show top 3 matches

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-lg">L</span>
              </div>
              <span className="ml-2 text-xl font-bold text-gray-900">Loop Services</span>
            </div>
            <div className="flex items-center space-x-4">
              <Link to="/login" className="text-gray-600 hover:text-gray-900">Sign In</Link>
              <Link 
                to="/signup" 
                className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-orange-50 via-white to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-5xl font-extrabold text-gray-900 mb-6">
              The Future of 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-600 to-blue-600"> Global Talent</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Connect with world-class developers, designers, and specialists from top tech hubs. 
              Save 60% on costs while accessing premium talent with enterprise-grade security and AI-powered matching.
            </p>
            <div className="flex justify-center space-x-4">
              <Link 
                to="/signup?role=client" 
                className="bg-gradient-to-r from-orange-500 to-orange-600 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:from-orange-600 hover:to-orange-700 transform hover:scale-105 transition-all"
              >
                Hire Top Talent
              </Link>
              <Link 
                to="/signup?role=talent" 
                className="bg-white text-orange-600 border-2 border-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-orange-50 transform hover:scale-105 transition-all"
              >
                Join as Talent
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Talent Demo */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Match</h2>
            <p className="text-lg text-gray-600">Try our AI-powered talent matching system with advanced project estimation</p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Project Requirements */}
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Project Requirements</h3>
                
                {/* Skills Selection */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Required Skills</label>
                  <div className="flex flex-wrap gap-2">
                    {skills.map(skill => (
                      <button
                        key={skill}
                        onClick={() => toggleSkill(skill)}
                        className={`px-3 py-1 rounded-full text-sm font-medium transition-all ${
                          selectedSkills.includes(skill)
                            ? 'bg-orange-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {skill}
                      </button>
                    ))}
                  </div>
                  {selectedSkills.length > 0 && (
                    <p className="text-sm text-gray-500 mt-2">
                      {selectedSkills.length} skill{selectedSkills.length > 1 ? 's' : ''} selected
                    </p>
                  )}
                </div>

                {/* Team Size */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Team Size: {teamSize} developer{teamSize > 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={teamSize}
                    onChange={(e) => setTeamSize(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 dev</span>
                    <span>10 devs</span>
                  </div>
                </div>

                {/* Project Duration */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Timeline: {projectDuration} week{projectDuration > 1 ? 's' : ''}
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="52"
                    value={projectDuration}
                    onChange={(e) => setProjectDuration(Number(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                  <div className="flex justify-between text-xs text-gray-500 mt-1">
                    <span>1 week</span>
                    <span>1 year</span>
                  </div>
                </div>

                {/* Project Complexity */}
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-3">Project Complexity</label>
                  <select
                    value={projectComplexity}
                    onChange={(e) => setProjectComplexity(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                  >
                    {Object.entries(complexityMultipliers).map(([key, value]) => (
                      <option key={key} value={key}>{value.label}</option>
                    ))}
                  </select>
                </div>

                {/* Advanced Cost Breakdown */}
                <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-lg">
                  <h4 className="font-semibold text-green-900 mb-4">💰 Cost Analysis</h4>
                  <div className="space-y-3 text-sm">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-green-700">Team Size:</div>
                        <div className="font-medium text-green-900">{teamSize} developer{teamSize > 1 ? 's' : ''}</div>
                      </div>
                      <div>
                        <div className="text-green-700">Duration:</div>
                        <div className="font-medium text-green-900">{projectDuration} week{projectDuration > 1 ? 's' : ''}</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-green-700">Total Hours:</div>
                        <div className="font-medium text-green-900">{totalHours.toLocaleString()}h</div>
                      </div>
                      <div>
                        <div className="text-green-700">Avg Rate:</div>
                        <div className="font-medium text-green-900">${Math.round(adjustedRate)}/hr</div>
                      </div>
                    </div>
                    <div className="border-t border-green-200 pt-3">
                      <div className="flex justify-between">
                        <span className="text-green-700">US Market Rate:</span>
                        <span className="font-medium text-green-900">${usMarketCost.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-green-700">Loop Services Rate:</span>
                        <span className="font-medium text-green-900">${estimatedCost.toLocaleString()}</span>
                      </div>
                      <div className="border-t border-green-200 pt-2 flex justify-between">
                        <span className="font-semibold text-green-800">You Save:</span>
                        <span className="font-bold text-green-600">${estimatedSavings.toLocaleString()} ({savingsPercentage}%)</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Matched Talent */}
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-semibold text-gray-900">AI-Matched Talent</h3>
                  <span className="text-sm text-gray-500">
                    {filteredTalent.length} match{filteredTalent.length !== 1 ? 'es' : ''} found
                  </span>
                </div>
                
                <div className="space-y-4">
                  {filteredTalent.map(talent => (
                    <div 
                      key={talent.id}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedTalent === talent.id
                          ? 'border-orange-500 bg-orange-50'
                          : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                      }`}
                      onClick={() => setSelectedTalent(talent.id)}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {talent.avatar}
                          </div>
                          <div className="ml-3">
                            <h4 className="font-semibold text-gray-900">{talent.name}</h4>
                            <p className="text-sm text-gray-600">{talent.title}</p>
                            <p className="text-xs text-gray-500">{talent.location} • {talent.timezone}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-gray-900">${talent.rate}/hr</div>
                          <div className="flex items-center text-sm">
                            <span className="text-yellow-500">★</span>
                            <span className="ml-1 text-gray-600">{talent.rating} ({talent.completedProjects})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex flex-wrap gap-1">
                          {talent.skills.map(skill => (
                            <span 
                              key={skill}
                              className={`px-2 py-1 rounded text-xs ${
                                selectedSkills.includes(skill)
                                  ? 'bg-orange-100 text-orange-800 font-medium'
                                  : 'bg-gray-100 text-gray-600'
                              }`}
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                        
                        <div className="text-xs text-gray-600">
                          <div className="flex justify-between">
                            <span>Experience: {talent.experience}</span>
                            <span className="text-green-600">{talent.availability}</span>
                          </div>
                          <div className="mt-1">
                            <span className="font-medium">Specialties:</span> {talent.specialties.join(', ')}
                          </div>
                          <div className="mt-1">
                            <span className="font-medium">Languages:</span> {talent.languages.join(', ')}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {selectedTalent && (
                  <div className="mt-6 space-y-3">
                    <button className="w-full bg-gradient-to-r from-orange-500 to-orange-600 text-white py-3 rounded-lg font-semibold hover:from-orange-600 hover:to-orange-700 transition-all">
                      Start Project with Selected Talent
                    </button>
                    <button className="w-full bg-white border border-orange-600 text-orange-600 py-2 rounded-lg font-medium hover:bg-orange-50 transition-all">
                      Schedule Interview
                    </button>
                  </div>
                )}

                {filteredTalent.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">🔍</div>
                    <p>No talent matches your selected skills.</p>
                    <p className="text-sm">Try selecting different skills or browse all talent.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Loop Services?</h2>
            <p className="text-lg text-gray-600">Enterprise-grade offshoring platform with cutting-edge features</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🤖</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI-Powered Matching</h3>
              <p className="text-gray-600">Our advanced AI analyzes 50+ data points to find the perfect talent match for your project requirements.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise Security</h3>
              <p className="text-gray-600">Bank-grade security, NDA management, IP protection, and compliance with SOC 2, GDPR, and HIPAA.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Collaboration</h3>
              <p className="text-gray-600">Integrated project management, video calls, screen sharing, and time tracking for seamless remote work.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">60% Cost Savings</h3>
              <p className="text-gray-600">Access top-tier talent from global tech hubs at a fraction of US market rates without compromising quality.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Quality Guarantee</h3>
              <p className="text-gray-600">Rigorous vetting process, skill assessments, and performance monitoring ensure only top 3% talent.</p>
            </div>

            <div className="text-center p-6">
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-white text-2xl">📈</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Scalable Teams</h3>
              <p className="text-gray-600">Scale your team up or down instantly. From single developers to full engineering teams in 48 hours.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Transparent Pricing</h2>
            <p className="text-lg text-gray-600">No hidden fees. Pay only for the talent you use.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Starter</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">$35-55<span className="text-lg text-gray-600">/hr</span></div>
              <p className="text-gray-600 mb-6">Junior to mid-level developers</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">2-4 years experience</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Basic project management</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Standard support</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border-2 border-orange-500 relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                <span className="bg-orange-500 text-white px-4 py-1 rounded-full text-sm font-medium">Most Popular</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Professional</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">$55-85<span className="text-lg text-gray-600">/hr</span></div>
              <p className="text-gray-600 mb-6">Senior developers & specialists</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">5-8 years experience</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Advanced project management</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Priority support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Team lead capabilities</span>
                </li>
              </ul>
              <button className="w-full bg-orange-600 text-white py-2 rounded-lg hover:bg-orange-700">
                Get Started
              </button>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 border">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Enterprise</h3>
              <div className="text-3xl font-bold text-gray-900 mb-2">$85-120<span className="text-lg text-gray-600">/hr</span></div>
              <p className="text-gray-600 mb-6">Architects & tech leads</p>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">8+ years experience</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Full team management</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">24/7 dedicated support</span>
                </li>
                <li className="flex items-center">
                  <span className="text-green-500 mr-2">✓</span>
                  <span className="text-gray-600">Custom solutions</span>
                </li>
              </ul>
              <button className="w-full bg-gray-100 text-gray-800 py-2 rounded-lg hover:bg-gray-200">
                Contact Sales
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 to-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Transform Your Development Process?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join 500+ companies already saving millions with Loop Services
          </p>
          <div className="flex justify-center space-x-4">
            <Link 
              to="/signup?role=client" 
              className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transform hover:scale-105 transition-all"
            >
              Start Hiring Today
            </Link>
            <button className="border-2 border-white text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-white hover:text-orange-600 transform hover:scale-105 transition-all">
              Book a Demo
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center mb-4">
                <div className="h-8 w-8 bg-gradient-to-r from-orange-500 to-orange-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-lg">L</span>
                </div>
                <span className="ml-2 text-xl font-bold">Loop Services</span>
              </div>
              <p className="text-gray-400">The future of global talent collaboration.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Find Talent</a></li>
                <li><a href="#" className="hover:text-white">Post Projects</a></li>
                <li><a href="#" className="hover:text-white">Enterprise</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">API Docs</a></li>
                <li><a href="#" className="hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white">About</a></li>
                <li><a href="#" className="hover:text-white">Careers</a></li>
                <li><a href="#" className="hover:text-white">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Loop Services. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
        }
        .slider::-moz-range-thumb {
          height: 20px;
          width: 20px;
          border-radius: 50%;
          background: #ea580c;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  )
} 