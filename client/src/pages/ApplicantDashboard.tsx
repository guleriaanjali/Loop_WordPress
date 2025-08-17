import { useState, useEffect, useRef } from 'react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'
import { api } from '../utils/api'

interface ApplicantProfile {
  id: string
  firstName?: string
  lastName?: string
  phone?: string
  location?: string
  headline?: string
  summary?: string
  resumeUrl?: string
  videoCvUrl?: string
  portfolioUrl?: string
  linkedinUrl?: string
  githubUrl?: string
  skills: string[]
  experience?: any[]
  education?: any[]
  certifications?: any[]
  expectedRate?: number
  availability?: string
  timezone?: string
  languages: string[]
  status: string
  adminNotes?: string
  submittedAt: string
  createdAt: string
  updatedAt: string
}

const skillsList = [
  'JavaScript', 'TypeScript', 'React', 'Vue', 'Angular',
  'Node.js', 'Python', 'Java', 'PHP', 'Ruby',
  'PostgreSQL', 'MongoDB', 'MySQL', 'Redis',
  'AWS', 'Azure', 'Docker', 'Kubernetes',
  'UI/UX Design', 'Figma', 'Adobe Creative Suite',
  'Marketing', 'SEO', 'Content Writing', 'Social Media',
  'Project Management', 'Agile', 'Scrum'
]

const languages = [
  'English', 'Spanish', 'French', 'German', 'Italian',
  'Portuguese', 'Russian', 'Chinese', 'Japanese', 'Korean',
  'Arabic', 'Hindi', 'Dutch', 'Swedish', 'Norwegian'
]

export default function ApplicantDashboard() {
  const { user } = useAuth()
  const [profile, setProfile] = useState<ApplicantProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [isRecording, setIsRecording] = useState(false)
  const [recordedVideo, setRecordedVideo] = useState<Blob | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const streamRef = useRef<MediaStream | null>(null)

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    phone: '',
    location: '',
    headline: '',
    summary: '',
    portfolioUrl: '',
    linkedinUrl: '',
    githubUrl: '',
    skills: [] as string[],
    expectedRate: '',
    availability: 'full-time',
    timezone: '',
    languages: [] as string[],
    experience: [{ company: '', role: '', duration: '', description: '' }],
    education: [{ institution: '', degree: '', year: '', description: '' }],
    certifications: [{ name: '', issuer: '', year: '', url: '' }]
  })

  useEffect(() => {
    fetchProfile()
  }, [])

  const fetchProfile = async () => {
    try {
      const response = await api.get('/applicants/profile')
      const profileData = response.data.profile
      setProfile(profileData)
      
      // Populate form data
      setFormData({
        firstName: profileData.firstName || '',
        lastName: profileData.lastName || '',
        phone: profileData.phone || '',
        location: profileData.location || '',
        headline: profileData.headline || '',
        summary: profileData.summary || '',
        portfolioUrl: profileData.portfolioUrl || '',
        linkedinUrl: profileData.linkedinUrl || '',
        githubUrl: profileData.githubUrl || '',
        skills: profileData.skills || [],
        expectedRate: profileData.expectedRate?.toString() || '',
        availability: profileData.availability || 'full-time',
        timezone: profileData.timezone || '',
        languages: profileData.languages || [],
        experience: profileData.experience || [{ company: '', role: '', duration: '', description: '' }],
        education: profileData.education || [{ institution: '', degree: '', year: '', description: '' }],
        certifications: profileData.certifications || [{ name: '', issuer: '', year: '', url: '' }]
      })
    } catch (error) {
      console.error('Error fetching profile:', error)
      toast.error('Failed to load profile')
    } finally {
      setLoading(false)
    }
  }

  const updateProfile = async () => {
    setSaving(true)
    try {
      const response = await api.put('/applicants/profile', {
        ...formData,
        expectedRate: formData.expectedRate ? parseFloat(formData.expectedRate) : null
      })
      setProfile(response.data.profile)
      toast.success('Profile updated successfully!')
    } catch (error) {
      console.error('Error updating profile:', error)
      toast.error('Failed to update profile')
    } finally {
      setSaving(false)
    }
  }

  const handleFileUpload = async (file: File, type: 'resume' | 'videoCv') => {
    const formData = new FormData()
    formData.append(type, file)

    try {
      const response = await api.post('/applicants/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      setProfile(response.data.profile)
      toast.success(`${type === 'resume' ? 'Resume' : 'Video CV'} uploaded successfully!`)
    } catch (error) {
      console.error('Error uploading file:', error)
      toast.error(`Failed to upload ${type}`)
    }
  }

  const startVideoRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { width: 1280, height: 720 }, 
        audio: true 
      })
      streamRef.current = stream

      if (videoRef.current) {
        videoRef.current.srcObject = stream
      }

      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'video/webm;codecs=vp9'
      })
      mediaRecorderRef.current = mediaRecorder

      const chunks: Blob[] = []
      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) {
          chunks.push(event.data)
        }
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' })
        setRecordedVideo(blob)
        
        // Stop all tracks
        stream.getTracks().forEach(track => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (error) {
      console.error('Error starting video recording:', error)
      toast.error('Failed to start video recording')
    }
  }

  const stopVideoRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const uploadVideoCV = async () => {
    if (!recordedVideo) return

    const file = new File([recordedVideo], 'video-cv.webm', { type: 'video/webm' })
    await handleFileUpload(file, 'videoCv')
    setRecordedVideo(null)
  }

  const submitApplication = async () => {
    try {
      await api.post('/applicants/submit')
      await fetchProfile()
      toast.success('Application submitted successfully! We will review it and get back to you soon.')
    } catch (error: any) {
      toast.error(error.response?.data?.error || 'Failed to submit application')
    }
  }

  const toggleSkill = (skill: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.includes(skill) 
        ? prev.skills.filter(s => s !== skill)
        : [...prev.skills, skill]
    }))
  }

  const toggleLanguage = (language: string) => {
    setFormData(prev => ({
      ...prev,
      languages: prev.languages.includes(language) 
        ? prev.languages.filter(l => l !== language)
        : [...prev.languages, language]
    }))
  }

  const addExperience = () => {
    setFormData(prev => ({
      ...prev,
      experience: [...prev.experience, { company: '', role: '', duration: '', description: '' }]
    }))
  }

  const updateExperience = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.map((exp, i) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }))
  }

  const removeExperience = (index: number) => {
    setFormData(prev => ({
      ...prev,
      experience: prev.experience.filter((_, i) => i !== index)
    }))
  }

  const addEducation = () => {
    setFormData(prev => ({
      ...prev,
      education: [...prev.education, { institution: '', degree: '', year: '', description: '' }]
    }))
  }

  const updateEducation = (index: number, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.map((edu, i) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }))
  }

  const removeEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }))
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'bg-blue-100 text-blue-800'
      case 'UNDER_REVIEW': return 'bg-yellow-100 text-yellow-800'
      case 'APPROVED': return 'bg-green-100 text-green-800'
      case 'REJECTED': return 'bg-red-100 text-red-800'
      case 'REQUIRES_CHANGES': return 'bg-orange-100 text-orange-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'SUBMITTED': return 'Application Submitted'
      case 'UNDER_REVIEW': return 'Under Review'
      case 'APPROVED': return 'Approved - Welcome to Loop!'
      case 'REJECTED': return 'Application Rejected'
      case 'REQUIRES_CHANGES': return 'Changes Required'
      default: return status
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500"></div>
      </div>
    )
  }

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 via-purple-700 to-indigo-800 rounded-lg shadow-lg p-6 mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">
              Welcome to Loop Services
            </h1>
            <p className="text-purple-100 mt-2">
              Complete your application to join our global talent network
            </p>
          </div>
          <div className="text-right">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(profile?.status || 'SUBMITTED')}`}>
              {getStatusText(profile?.status || 'SUBMITTED')}
            </div>
            {profile?.adminNotes && (
              <p className="text-purple-100 text-sm mt-2 max-w-xs">
                <strong>Admin Note:</strong> {profile.adminNotes}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="border-b border-gray-200 mb-8">
        <nav className="-mb-px flex space-x-8">
          {[
            { id: 'profile', name: 'Basic Information', icon: '👤' },
            { id: 'experience', name: 'Experience & Education', icon: '🎓' },
            { id: 'skills', name: 'Skills & Languages', icon: '⚡' },
            { id: 'uploads', name: 'Resume & Video CV', icon: '📁' },
            { id: 'review', name: 'Review & Submit', icon: '✅' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                activeTab === tab.id
                  ? 'border-orange-500 text-orange-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              <span>{tab.icon}</span>
              <span>{tab.name}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Tab Content */}
      <div className="bg-white rounded-lg shadow-lg p-6">
        {activeTab === 'profile' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Basic Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  First Name *
                </label>
                <input
                  type="text"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your first name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Last Name *
                </label>
                <input
                  type="text"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="Enter your last name"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="+1 (555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Location
                </label>
                <input
                  type="text"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="City, Country"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Timezone
                </label>
                <select
                  value={formData.timezone}
                  onChange={(e) => setFormData(prev => ({ ...prev, timezone: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="">Select timezone</option>
                  <option value="UTC-12">UTC-12 (Baker Island)</option>
                  <option value="UTC-11">UTC-11 (Samoa)</option>
                  <option value="UTC-10">UTC-10 (Hawaii)</option>
                  <option value="UTC-9">UTC-9 (Alaska)</option>
                  <option value="UTC-8">UTC-8 (PST)</option>
                  <option value="UTC-7">UTC-7 (MST)</option>
                  <option value="UTC-6">UTC-6 (CST)</option>
                  <option value="UTC-5">UTC-5 (EST)</option>
                  <option value="UTC-4">UTC-4 (AST)</option>
                  <option value="UTC-3">UTC-3 (BRT)</option>
                  <option value="UTC-2">UTC-2</option>
                  <option value="UTC-1">UTC-1</option>
                  <option value="UTC+0">UTC+0 (GMT)</option>
                  <option value="UTC+1">UTC+1 (CET)</option>
                  <option value="UTC+2">UTC+2 (EET)</option>
                  <option value="UTC+3">UTC+3 (MSK)</option>
                  <option value="UTC+4">UTC+4</option>
                  <option value="UTC+5">UTC+5</option>
                  <option value="UTC+5:30">UTC+5:30 (IST)</option>
                  <option value="UTC+6">UTC+6</option>
                  <option value="UTC+7">UTC+7</option>
                  <option value="UTC+8">UTC+8 (CST)</option>
                  <option value="UTC+9">UTC+9 (JST)</option>
                  <option value="UTC+10">UTC+10</option>
                  <option value="UTC+11">UTC+11</option>
                  <option value="UTC+12">UTC+12</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Availability
                </label>
                <select
                  value={formData.availability}
                  onChange={(e) => setFormData(prev => ({ ...prev, availability: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="full-time">Full-time</option>
                  <option value="part-time">Part-time</option>
                  <option value="contract">Contract</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Headline *
              </label>
              <input
                type="text"
                value={formData.headline}
                onChange={(e) => setFormData(prev => ({ ...prev, headline: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="e.g., Senior Full-Stack Developer specializing in React and Node.js"
                maxLength={100}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Professional Summary
              </label>
              <textarea
                value={formData.summary}
                onChange={(e) => setFormData(prev => ({ ...prev, summary: e.target.value }))}
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                placeholder="Tell us about yourself, your experience, and what makes you unique..."
                maxLength={2000}
              />
              <p className="text-sm text-gray-500 mt-1">
                {formData.summary.length}/2000 characters
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Expected Hourly Rate (USD)
                </label>
                <input
                  type="number"
                  value={formData.expectedRate}
                  onChange={(e) => setFormData(prev => ({ ...prev, expectedRate: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="50"
                  min="0"
                  step="0.01"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Portfolio URL
                </label>
                <input
                  type="url"
                  value={formData.portfolioUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, portfolioUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://yourportfolio.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={formData.linkedinUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://linkedin.com/in/yourprofile"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  GitHub URL
                </label>
                <input
                  type="url"
                  value={formData.githubUrl}
                  onChange={(e) => setFormData(prev => ({ ...prev, githubUrl: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  placeholder="https://github.com/yourusername"
                />
              </div>
            </div>

            <button
              onClick={updateProfile}
              disabled={saving}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 font-medium"
            >
              {saving ? 'Saving...' : 'Save Basic Information'}
            </button>
          </div>
        )}

        {activeTab === 'experience' && (
          <div className="space-y-8">
            {/* Work Experience */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Work Experience</h3>
                <button
                  onClick={addExperience}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm"
                >
                  Add Experience
                </button>
              </div>

              {formData.experience.map((exp, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Experience {index + 1}</h4>
                    {formData.experience.length > 1 && (
                      <button
                        onClick={() => removeExperience(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={exp.company}
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      placeholder="Company Name"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={exp.role}
                      onChange={(e) => updateExperience(index, 'role', e.target.value)}
                      placeholder="Job Title/Role"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                      placeholder="Duration (e.g., Jan 2020 - Present)"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <textarea
                    value={exp.description}
                    onChange={(e) => updateExperience(index, 'description', e.target.value)}
                    placeholder="Describe your role, responsibilities, and achievements..."
                    rows={3}
                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              ))}
            </div>

            {/* Education */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Education</h3>
                <button
                  onClick={addEducation}
                  className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 text-sm"
                >
                  Add Education
                </button>
              </div>

              {formData.education.map((edu, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4 mb-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">Education {index + 1}</h4>
                    {formData.education.length > 1 && (
                      <button
                        onClick={() => removeEducation(index)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Remove
                      </button>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <input
                      type="text"
                      value={edu.institution}
                      onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      placeholder="Institution Name"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={edu.degree}
                      onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      placeholder="Degree/Certification"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                    <input
                      type="text"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                      placeholder="Year (e.g., 2020)"
                      className="px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                    />
                  </div>
                  <textarea
                    value={edu.description}
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    placeholder="Additional details about your education..."
                    rows={2}
                    className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500"
                  />
                </div>
              ))}
            </div>

            <button
              onClick={updateProfile}
              disabled={saving}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 font-medium"
            >
              {saving ? 'Saving...' : 'Save Experience & Education'}
            </button>
          </div>
        )}

        {activeTab === 'skills' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Skills *</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the skills that best describe your expertise. Choose at least 3 skills.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {skillsList.map((skill) => (
                  <button
                    key={skill}
                    onClick={() => toggleSkill(skill)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.skills.includes(skill)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {skill}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.skills.length} skills
              </p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Languages</h3>
              <p className="text-sm text-gray-600 mb-4">
                Select the languages you can communicate in professionally.
              </p>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {languages.map((language) => (
                  <button
                    key={language}
                    onClick={() => toggleLanguage(language)}
                    className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                      formData.languages.includes(language)
                        ? 'bg-orange-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {language}
                  </button>
                ))}
              </div>
              <p className="text-sm text-gray-500 mt-2">
                Selected: {formData.languages.length} languages
              </p>
            </div>

            <button
              onClick={updateProfile}
              disabled={saving}
              className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 disabled:opacity-50 font-medium"
            >
              {saving ? 'Saving...' : 'Save Skills & Languages'}
            </button>
          </div>
        )}

        {activeTab === 'uploads' && (
          <div className="space-y-8">
            {/* Resume Upload */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Resume Upload</h3>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
                {profile?.resumeUrl ? (
                  <div className="text-center">
                    <div className="text-green-600 text-4xl mb-2">✓</div>
                    <p className="text-green-600 font-medium">Resume uploaded successfully!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded: {profile.resumeUrl}
                    </p>
                    <label className="mt-3 inline-block bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 cursor-pointer">
                      Upload New Resume
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, 'resume')
                        }}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="text-gray-400 text-4xl mb-2">📄</div>
                    <p className="text-gray-600 mb-2">Upload your resume</p>
                    <p className="text-sm text-gray-500 mb-4">
                      Supported formats: PDF, DOC, DOCX (Max size: 50MB)
                    </p>
                    <label className="bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700 cursor-pointer">
                      Choose File
                      <input
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0]
                          if (file) handleFileUpload(file, 'resume')
                        }}
                      />
                    </label>
                  </div>
                )}
              </div>
            </div>

            {/* Video CV */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Video CV</h3>
              <p className="text-sm text-gray-600 mb-4">
                Record a short video introduction (2-3 minutes) to showcase your personality and communication skills.
              </p>

              {profile?.videoCvUrl ? (
                <div className="border border-gray-300 rounded-lg p-6">
                  <div className="text-center">
                    <div className="text-green-600 text-4xl mb-2">🎥</div>
                    <p className="text-green-600 font-medium">Video CV uploaded successfully!</p>
                    <p className="text-sm text-gray-500 mt-1">
                      Uploaded: {profile.videoCvUrl}
                    </p>
                  </div>
                </div>
              ) : (
                <div className="border border-gray-300 rounded-lg p-6">
                  {!isRecording && !recordedVideo && (
                    <div className="text-center">
                      <button
                        onClick={startVideoRecording}
                        className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 font-medium"
                      >
                        🔴 Start Recording
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Make sure you have good lighting and a quiet environment
                      </p>
                    </div>
                  )}

                  {isRecording && (
                    <div className="text-center">
                      <video
                        ref={videoRef}
                        autoPlay
                        muted
                        className="w-full max-w-md mx-auto mb-4 rounded-lg"
                      />
                      <button
                        onClick={stopVideoRecording}
                        className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-medium"
                      >
                        ⏹️ Stop Recording
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        Recording in progress... Click stop when finished
                      </p>
                    </div>
                  )}

                  {recordedVideo && (
                    <div className="text-center">
                      <video
                        src={URL.createObjectURL(recordedVideo)}
                        controls
                        className="w-full max-w-md mx-auto mb-4 rounded-lg"
                      />
                      <div className="space-x-4">
                        <button
                          onClick={uploadVideoCV}
                          className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 font-medium"
                        >
                          ✓ Upload Video
                        </button>
                        <button
                          onClick={() => {
                            setRecordedVideo(null)
                          }}
                          className="bg-gray-600 text-white px-6 py-3 rounded-md hover:bg-gray-700 font-medium"
                        >
                          🔄 Record Again
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'review' && (
          <div className="space-y-6">
            <h3 className="text-lg font-semibold text-gray-900">Review Your Application</h3>
            
            <div className="bg-gray-50 rounded-lg p-6 space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-900">Name</h4>
                  <p className="text-gray-600">{formData.firstName} {formData.lastName}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Headline</h4>
                  <p className="text-gray-600">{formData.headline || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Location</h4>
                  <p className="text-gray-600">{formData.location || 'Not provided'}</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">Expected Rate</h4>
                  <p className="text-gray-600">
                    {formData.expectedRate ? `$${formData.expectedRate}/hour` : 'Not provided'}
                  </p>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Skills</h4>
                <div className="flex flex-wrap gap-2 mt-1">
                  {formData.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2 py-1 bg-orange-100 text-orange-800 rounded text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium text-gray-900">Uploads</h4>
                <div className="text-sm text-gray-600 space-y-1">
                  <p>Resume: {profile?.resumeUrl ? '✓ Uploaded' : '❌ Not uploaded'}</p>
                  <p>Video CV: {profile?.videoCvUrl ? '✓ Uploaded' : '❌ Not uploaded'}</p>
                </div>
              </div>
            </div>

            {profile?.status === 'SUBMITTED' && (
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <h4 className="font-medium text-blue-900">Application Status</h4>
                <p className="text-blue-700 text-sm mt-1">
                  Your application is ready for review. You can continue updating your profile until it's submitted for final review.
                </p>
              </div>
            )}

            {profile?.status === 'UNDER_REVIEW' && (
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <h4 className="font-medium text-yellow-900">Under Review</h4>
                <p className="text-yellow-700 text-sm mt-1">
                  Your application is currently being reviewed by our team. We'll get back to you within 3-5 business days.
                </p>
              </div>
            )}

            {profile?.status === 'APPROVED' && (
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <h4 className="font-medium text-green-900">Congratulations!</h4>
                <p className="text-green-700 text-sm mt-1">
                  Your application has been approved! You can now access your talent dashboard and start working on projects.
                </p>
              </div>
            )}

            {profile?.status === 'REJECTED' && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900">Application Status</h4>
                <p className="text-red-700 text-sm mt-1">
                  Unfortunately, your application was not approved at this time. {profile?.adminNotes && `Reason: ${profile.adminNotes}`}
                </p>
              </div>
            )}

            {profile?.status === 'REQUIRES_CHANGES' && (
              <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
                <h4 className="font-medium text-orange-900">Changes Required</h4>
                <p className="text-orange-700 text-sm mt-1">
                  Please make the following changes to your application: {profile?.adminNotes}
                </p>
              </div>
            )}

            {profile?.status === 'SUBMITTED' && (
              <button
                onClick={submitApplication}
                className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 font-medium"
                disabled={!formData.firstName || !formData.lastName || !formData.headline || formData.skills.length === 0}
              >
                Submit Application for Review
              </button>
            )}

            {(!formData.firstName || !formData.lastName || !formData.headline || formData.skills.length === 0) && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                <h4 className="font-medium text-red-900">Required Fields Missing</h4>
                <p className="text-red-700 text-sm mt-1">
                  Please complete the following required fields before submitting:
                </p>
                <ul className="text-red-700 text-sm mt-2 space-y-1">
                  {!formData.firstName && <li>• First Name</li>}
                  {!formData.lastName && <li>• Last Name</li>}
                  {!formData.headline && <li>• Professional Headline</li>}
                  {formData.skills.length === 0 && <li>• At least 3 skills</li>}
                </ul>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
} 