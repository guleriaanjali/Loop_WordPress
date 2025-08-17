import { useState } from 'react'
import { Link } from 'react-router-dom'

interface TalentProfile {
  id: string
  name: string
  title: string
  location: string
  rate: number
  rating: number
  completedProjects: number
  skills: string[]
  avatar: string
  experience: string
  availability: string
  specialties: string[]
  languages: string[]
  timezone: string
  description: string
  verified: boolean
}

export default function TalentSearchPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [rateRange, setRateRange] = useState([20, 100])
  const [experienceLevel, setExperienceLevel] = useState('all')
  const [availability, setAvailability] = useState('all')
  const [sortBy, setSortBy] = useState('rating')

  const skills = [
    'React', 'Node.js', 'Python', 'TypeScript', 'AWS', 'Docker', 
    'PostgreSQL', 'MongoDB', 'GraphQL', 'Vue.js', 'Angular', 'Django',
    'Kubernetes', 'Machine Learning', 'DevOps', 'Mobile Development',
    'UI/UX Design', 'Data Science', 'Blockchain', 'Cybersecurity'
  ]

  const talentProfiles: TalentProfile[] = [
    {
      id: '1',
      name: 'Rajesh Kumar',
      title: 'Senior Full Stack Developer',
      location: 'Bangalore, India',
      rate: 45,
      rating: 4.9,
      completedProjects: 127,
      skills: ['React', 'Node.js', 'AWS', 'TypeScript', 'PostgreSQL'],
      avatar: 'RK',
      experience: '8+ years',
      availability: 'Available now',
      specialties: ['E-commerce', 'Fintech', 'SaaS'],
      languages: ['English (Fluent)', 'Hindi (Native)'],
      timezone: 'IST (UTC+5:30)',
      description: 'Experienced full-stack developer with expertise in modern web technologies and cloud platforms.',
      verified: true
    },
    {
      id: '2',
      name: 'Maria Santos',
      title: 'Frontend Specialist & UX Engineer',
      location: 'São Paulo, Brazil',
      rate: 38,
      rating: 4.8,
      completedProjects: 89,
      skills: ['React', 'Vue.js', 'TypeScript', 'GraphQL', 'UI/UX Design'],
      avatar: 'MS',
      experience: '6+ years',
      availability: 'Available in 1 week',
      specialties: ['Design Systems', 'Mobile-First', 'Performance'],
      languages: ['English (Fluent)', 'Portuguese (Native)', 'Spanish (Conversational)'],
      timezone: 'BRT (UTC-3)',
      description: 'Frontend specialist focused on creating beautiful, performant user experiences.',
      verified: true
    },
    {
      id: '3',
      name: 'Alex Petrov',
      title: 'DevOps Engineer & Cloud Architect',
      location: 'Kiev, Ukraine',
      rate: 42,
      rating: 4.9,
      completedProjects: 156,
      skills: ['AWS', 'Docker', 'Python', 'PostgreSQL', 'Kubernetes', 'DevOps'],
      avatar: 'AP',
      experience: '7+ years',
      availability: 'Available now',
      specialties: ['Cloud Migration', 'CI/CD', 'Security'],
      languages: ['English (Fluent)', 'Ukrainian (Native)', 'Russian (Native)'],
      timezone: 'EET (UTC+2)',
      description: 'DevOps engineer specializing in cloud infrastructure and automation.',
      verified: true
    },
    {
      id: '4',
      name: 'Priya Sharma',
      title: 'AI/ML Engineer',
      location: 'Mumbai, India',
      rate: 48,
      rating: 4.9,
      completedProjects: 73,
      skills: ['Python', 'Machine Learning', 'AWS', 'PostgreSQL', 'Data Science'],
      avatar: 'PS',
      experience: '5+ years',
      availability: 'Available in 2 weeks',
      specialties: ['NLP', 'Computer Vision', 'Data Science'],
      languages: ['English (Fluent)', 'Hindi (Native)'],
      timezone: 'IST (UTC+5:30)',
      description: 'AI/ML engineer with expertise in natural language processing and computer vision.',
      verified: true
    },
    {
      id: '5',
      name: 'Carlos Rodriguez',
      title: 'Mobile App Developer',
      location: 'Mexico City, Mexico',
      rate: 35,
      rating: 4.7,
      completedProjects: 64,
      skills: ['React Native', 'Mobile Development', 'TypeScript', 'Node.js'],
      avatar: 'CR',
      experience: '4+ years',
      availability: 'Available now',
      specialties: ['iOS', 'Android', 'Cross-platform'],
      languages: ['English (Fluent)', 'Spanish (Native)'],
      timezone: 'CST (UTC-6)',
      description: 'Mobile developer specializing in cross-platform applications.',
      verified: false
    },
    {
      id: '6',
      name: 'Elena Volkov',
      title: 'Blockchain Developer',
      location: 'Tallinn, Estonia',
      rate: 55,
      rating: 4.8,
      completedProjects: 42,
      skills: ['Blockchain', 'Python', 'Node.js', 'Cybersecurity'],
      avatar: 'EV',
      experience: '6+ years',
      availability: 'Busy',
      specialties: ['Smart Contracts', 'DeFi', 'Web3'],
      languages: ['English (Fluent)', 'Russian (Native)', 'Estonian (Native)'],
      timezone: 'EET (UTC+2)',
      description: 'Blockchain developer with expertise in smart contracts and DeFi protocols.',
      verified: true
    }
  ]

  const toggleSkill = (skill: string) => {
    setSelectedSkills(prev => 
      prev.includes(skill) 
        ? prev.filter(s => s !== skill)
        : [...prev, skill]
    )
  }

  // Filter talent based on search criteria
  const filteredTalent = talentProfiles.filter(talent => {
    // Text search
    const matchesSearch = searchQuery === '' || 
      talent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      talent.skills.some(skill => skill.toLowerCase().includes(searchQuery.toLowerCase()))

    // Skills filter
    const matchesSkills = selectedSkills.length === 0 || 
      selectedSkills.some(skill => talent.skills.includes(skill))

    // Rate filter
    const matchesRate = talent.rate >= rateRange[0] && talent.rate <= rateRange[1]

    // Experience filter
    const matchesExperience = experienceLevel === 'all' || 
      (experienceLevel === 'junior' && talent.experience.includes('2+') || talent.experience.includes('3+')) ||
      (experienceLevel === 'mid' && (talent.experience.includes('4+') || talent.experience.includes('5+') || talent.experience.includes('6+'))) ||
      (experienceLevel === 'senior' && (talent.experience.includes('7+') || talent.experience.includes('8+')))

    // Availability filter
    const matchesAvailability = availability === 'all' ||
      (availability === 'available' && talent.availability.includes('Available')) ||
      (availability === 'busy' && talent.availability.includes('Busy'))

    return matchesSearch && matchesSkills && matchesRate && matchesExperience && matchesAvailability
  })

  // Sort talent
  const sortedTalent = [...filteredTalent].sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return b.rating - a.rating
      case 'rate':
        return a.rate - b.rate
      case 'experience':
        return b.completedProjects - a.completedProjects
      case 'availability':
        return a.availability.localeCompare(b.availability)
      default:
        return 0
    }
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Find Talent</h1>
        <p className="mt-2 text-gray-600">Discover and hire world-class developers from our global talent pool</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white shadow rounded-lg p-6 sticky top-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Name, skills, or title..."
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              />
            </div>

            {/* Skills */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Skills</label>
              <div className="max-h-40 overflow-y-auto">
                <div className="space-y-2">
                  {skills.map(skill => (
                    <label key={skill} className="flex items-center">
                      <input
                        type="checkbox"
                        checked={selectedSkills.includes(skill)}
                        onChange={() => toggleSkill(skill)}
                        className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">{skill}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            {/* Rate Range */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Hourly Rate: ${rateRange[0]} - ${rateRange[1]}
              </label>
              <div className="space-y-2">
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={rateRange[0]}
                  onChange={(e) => setRateRange([Number(e.target.value), rateRange[1]])}
                  className="w-full"
                />
                <input
                  type="range"
                  min="20"
                  max="100"
                  value={rateRange[1]}
                  onChange={(e) => setRateRange([rateRange[0], Number(e.target.value)])}
                  className="w-full"
                />
              </div>
            </div>

            {/* Experience Level */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Experience Level</label>
              <select
                value={experienceLevel}
                onChange={(e) => setExperienceLevel(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All Levels</option>
                <option value="junior">Junior (2-3 years)</option>
                <option value="mid">Mid-level (4-6 years)</option>
                <option value="senior">Senior (7+ years)</option>
              </select>
            </div>

            {/* Availability */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Availability</label>
              <select
                value={availability}
                onChange={(e) => setAvailability(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="all">All</option>
                <option value="available">Available Now</option>
                <option value="busy">Busy</option>
              </select>
            </div>

            {/* Clear Filters */}
            <button
              onClick={() => {
                setSearchQuery('')
                setSelectedSkills([])
                setRateRange([20, 100])
                setExperienceLevel('all')
                setAvailability('all')
              }}
              className="w-full text-sm text-orange-600 hover:text-orange-800"
            >
              Clear All Filters
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">
                {sortedTalent.length} talent{sortedTalent.length !== 1 ? 's' : ''} found
              </h3>
              {selectedSkills.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {selectedSkills.map(skill => (
                    <span key={skill} className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-xs">
                      {skill}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
            >
              <option value="rating">Sort by Rating</option>
              <option value="rate">Sort by Rate (Low to High)</option>
              <option value="experience">Sort by Experience</option>
              <option value="availability">Sort by Availability</option>
            </select>
          </div>

          {/* Talent Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {sortedTalent.map(talent => (
              <div key={talent.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                      {talent.avatar}
                    </div>
                    <div className="ml-3">
                      <div className="flex items-center">
                        <h4 className="font-semibold text-gray-900">{talent.name}</h4>
                        {talent.verified && (
                          <span className="ml-2 text-green-500 text-sm">✓</span>
                        )}
                      </div>
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

                <p className="text-sm text-gray-600 mb-4">{talent.description}</p>

                <div className="space-y-3">
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

                  <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
                    <div>
                      <span className="font-medium">Experience:</span> {talent.experience}
                    </div>
                    <div>
                      <span className={`font-medium ${
                        talent.availability.includes('Available') ? 'text-green-600' : 'text-yellow-600'
                      }`}>
                        {talent.availability}
                      </span>
                    </div>
                  </div>

                  <div className="text-xs text-gray-600">
                    <div className="mb-1">
                      <span className="font-medium">Specialties:</span> {talent.specialties.join(', ')}
                    </div>
                    <div>
                      <span className="font-medium">Languages:</span> {talent.languages.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-orange-600 text-white py-2 rounded text-sm hover:bg-orange-700">
                    Invite to Project
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    View Profile
                  </button>
                  <button className="px-3 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50">
                    Message
                  </button>
                </div>
              </div>
            ))}
          </div>

          {sortedTalent.length === 0 && (
            <div className="text-center py-12">
              <div className="text-4xl text-gray-400 mb-4">🔍</div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No talent found</h3>
              <p className="text-gray-600">Try adjusting your filters or search criteria</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 