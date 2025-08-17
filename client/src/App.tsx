import { Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './context/AuthContext'
import Layout from './components/Layout'
import LandingPage from './pages/LandingPage'
import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import Dashboard from './pages/Dashboard'
import ClientDashboard from './pages/ClientDashboard'
import TalentDashboard from './pages/TalentDashboard'
import ApplicantDashboard from './pages/ApplicantDashboard'
import ProjectsPage from './pages/ProjectsPage'
import ProjectCreatePage from './pages/ProjectCreatePage'
import ProjectDetailPage from './pages/ProjectDetailPage'
import TalentProfilePage from './pages/TalentProfilePage'
import TalentSearchPage from './pages/TalentSearchPage'
import AdminPage from './pages/AdminPage'
import LoadingSpinner from './components/LoadingSpinner'

// Smart Dashboard Router Component
function DashboardRouter() {
  const { user } = useAuth()
  
  if (!user) {
    return <Navigate to="/login" replace />
  }

  switch (user.role) {
    case 'CLIENT':
      return <ClientDashboard />
    case 'TALENT':
      return <TalentDashboard />
    case 'APPLICANT':
      return <ApplicantDashboard />
    case 'ADMIN':
      return <AdminPage />
    default:
      return <Dashboard />
  }
}

function App() {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    )
  }

  return (
    <Routes>
      {/* Public routes */}
      <Route path="/" element={<LandingPage />} />
      <Route 
        path="/login" 
        element={user ? <Navigate to="/dashboard" replace /> : <LoginPage />} 
      />
      <Route 
        path="/signup" 
        element={user ? <Navigate to="/dashboard" replace /> : <SignupPage />} 
      />
      
      {/* Protected routes */}
      <Route 
        path="/dashboard" 
        element={user ? <Layout><DashboardRouter /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/projects" 
        element={user ? <Layout><ProjectsPage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/projects/create" 
        element={user ? <Layout><ProjectCreatePage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/projects/:id" 
        element={user ? <Layout><ProjectDetailPage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/talent" 
        element={user ? <Layout><TalentSearchPage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/talent/search" 
        element={user ? <Layout><TalentSearchPage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/profile" 
        element={user ? <Layout><TalentProfilePage /></Layout> : <Navigate to="/login" replace />} 
      />
      <Route 
        path="/admin" 
        element={user?.role === 'ADMIN' ? <Layout><AdminPage /></Layout> : <Navigate to="/dashboard" replace />} 
      />
      
      {/* Catch all */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App 