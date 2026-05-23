// src/components/shared/ProtectedRoute.jsx
import { Navigate } from 'react-router-dom'
import { useAuthStore } from '../lib/store'

export default function ProtectedRoute({ children, allowedRole }) {
  const { isAuthenticated, user } = useAuthStore()

  if (!isAuthenticated) return <Navigate to="/signin" replace />
  if (allowedRole && user?.role !== allowedRole) {
    // Redirect to the correct dashboard for the user's actual role
    const dashboards = { student: '/student', caretaker: '/caretaker', owner: '/owner', admin: '/admin' }
    return <Navigate to={dashboards[user?.role] || '/'} replace />
  }

  return children
}
