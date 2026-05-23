import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import LandingPage from './pages/LandingPage'
import SignInPage from './pages/SignInPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'

// Caretaker pages
import {
  CaretakerDashboard, DormerManagementPage, ApplicationReviewPage,
  PaymentRecordingPage, MaintenanceMgmtPage, ParcelLoggingPage
} from './pages/CaretakerIndex'

// Student pages
import {
  StudentDashboard, DormSearchPage, StudentPaymentsPage,
  StudentMaintenancePage, StudentNotificationsPage
} from './pages/StudentIndex'

// Owner pages
import {
  OwnerDashboard, DormListingsPage, OwnerPaymentsPage, ActivityLogPage
} from './pages/OwnerIndex'

// Admin pages
import { AdminDashboard, StudentRegistryPage, AlertsPage } from './pages/AdminIndex'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* Student */}
        <Route path="/student" element={<ProtectedRoute allowedRole="student"><StudentDashboard /></ProtectedRoute>} />
        <Route path="/student/search" element={<ProtectedRoute allowedRole="student"><DormSearchPage /></ProtectedRoute>} />
        <Route path="/student/payments" element={<ProtectedRoute allowedRole="student"><StudentPaymentsPage /></ProtectedRoute>} />
        <Route path="/student/maintenance" element={<ProtectedRoute allowedRole="student"><StudentMaintenancePage /></ProtectedRoute>} />
        <Route path="/student/notifications" element={<ProtectedRoute allowedRole="student"><StudentNotificationsPage /></ProtectedRoute>} />

        {/* Caretaker */}
        <Route path="/caretaker" element={<ProtectedRoute allowedRole="caretaker"><CaretakerDashboard /></ProtectedRoute>} />
        <Route path="/caretaker/dormers" element={<ProtectedRoute allowedRole="caretaker"><DormerManagementPage /></ProtectedRoute>} />
        <Route path="/caretaker/apps" element={<ProtectedRoute allowedRole="caretaker"><ApplicationReviewPage /></ProtectedRoute>} />
        <Route path="/caretaker/payments" element={<ProtectedRoute allowedRole="caretaker"><PaymentRecordingPage /></ProtectedRoute>} />
        <Route path="/caretaker/maintenance" element={<ProtectedRoute allowedRole="caretaker"><MaintenanceMgmtPage /></ProtectedRoute>} />
        <Route path="/caretaker/parcels" element={<ProtectedRoute allowedRole="caretaker"><ParcelLoggingPage /></ProtectedRoute>} />

        {/* Owner */}
        <Route path="/owner" element={<ProtectedRoute allowedRole="owner"><OwnerDashboard /></ProtectedRoute>} />
        <Route path="/owner/dorms" element={<ProtectedRoute allowedRole="owner"><DormListingsPage /></ProtectedRoute>} />
        <Route path="/owner/payments" element={<ProtectedRoute allowedRole="owner"><OwnerPaymentsPage /></ProtectedRoute>} />
        <Route path="/owner/activity" element={<ProtectedRoute allowedRole="owner"><ActivityLogPage /></ProtectedRoute>} />

        {/* Admin */}
        <Route path="/admin" element={<ProtectedRoute allowedRole="admin"><AdminDashboard /></ProtectedRoute>} />
        <Route path="/admin/registry" element={<ProtectedRoute allowedRole="admin"><StudentRegistryPage /></ProtectedRoute>} />
        <Route path="/admin/alerts" element={<ProtectedRoute allowedRole="admin"><AlertsPage /></ProtectedRoute>} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
