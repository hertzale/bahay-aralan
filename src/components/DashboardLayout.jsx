// src/components/layout/DashboardLayout.jsx
import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '../lib/store'
import { Icon } from './ui'

// ─── Menu definitions ──────────────────────────────────────────
const MENUS = {
  student: [
    { path: '/student',              label: 'Dashboard',     icon: 'home'     },
    { path: '/student/search',       label: 'Browse Units',  icon: 'search'   },
    { path: '/student/payments',     label: 'Payments',      icon: 'card'     },
    { path: '/student/maintenance',  label: 'Maintenance',   icon: 'wrench'   },
    { path: '/student/notifications',label: 'Notifications', icon: 'bell'     },
  ],
  caretaker: [
    { path: '/caretaker',            label: 'Dashboard',     icon: 'home'     },
    { path: '/caretaker/dormers',    label: 'Dormers',       icon: 'users'    },
    { path: '/caretaker/apps',       label: 'Applications',  icon: 'file'     },
    { path: '/caretaker/payments',   label: 'Record Payment',icon: 'dollar'   },
    { path: '/caretaker/maintenance',label: 'Maintenance',   icon: 'wrench'   },
    { path: '/caretaker/parcels',    label: 'Parcel Log',    icon: 'package'  },
  ],
  owner: [
    { path: '/owner',                label: 'Dashboard',     icon: 'home'     },
    { path: '/owner/dorms',          label: 'Dorm Listings', icon: 'building' },
    { path: '/owner/payments',       label: 'Payments',      icon: 'card'     },
    { path: '/owner/activity',       label: 'Activity Log',  icon: 'activity' },
  ],
  admin: [
    { path: '/admin',                label: 'Dashboard',     icon: 'shield'   },
    { path: '/admin/registry',       label: 'Student Registry', icon: 'users' },
    { path: '/admin/alerts',         label: 'Alerts',        icon: 'alert'    },
  ],
}

const ROLE_LABELS = {
  student: 'Student', caretaker: 'Caretaker',
  owner: 'Dorm Owner', admin: 'Univ. Admin',
}

// ─── Sidebar ───────────────────────────────────────────────────
function Sidebar({ role, user, onLogout }) {
  const navigate  = useNavigate()
  const location  = useLocation()
  const items     = MENUS[role] || []

  const isActive = (path) => {
    if (path.split('/').length === 2) return location.pathname === path
    return location.pathname.startsWith(path)
  }

  return (
    <aside className="sidebar flex flex-col shrink-0">
      {/* Brand */}
      <div style={{ padding: '24px 16px 16px' }}>
        <div className="flex items-center gap-2.5 mb-4">
          <div style={{ width:32, height:32, background:'var(--navy)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="building" size={16} style={{ color:'var(--cream)' }} />
          </div>
          <span className="font-display font-bold text-lg" style={{ color:'var(--cream)', letterSpacing:'-0.01em' }}>Bahay-Aralan</span>
        </div>
        {/* User chip */}
        <div style={{ background:'rgba(243,239,233,.07)', borderRadius:10, padding:'10px 12px' }}>
          <p style={{ fontSize:11, color:'var(--sand)', fontFamily:"'DM Mono',monospace", letterSpacing:'0.1em', textTransform:'uppercase' }}>
            {ROLE_LABELS[role]}
          </p>
          <p style={{ color:'var(--cream)', fontSize:15, marginTop:2, fontWeight:500 }}>{user?.name || 'User'}</p>
        </div>
      </div>

      {/* Nav items */}
      <nav style={{ flex:1, padding:'0 10px' }}>
        <p style={{ fontSize:10, color:'rgba(243,239,233,.25)', fontFamily:"'DM Mono',monospace", letterSpacing:'0.12em', textTransform:'uppercase', padding:'4px 8px', marginBottom:6 }}>
          Menu
        </p>
        {items.map((item) => (
          <div
            key={item.path}
            className={`nav-item ${isActive(item.path) ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <Icon name={item.icon} size={16} />
            {item.label}
          </div>
        ))}
      </nav>

      {/* Sign out */}
      <div style={{ padding:'0 10px 20px' }}>
        <div style={{ borderTop:'1px solid rgba(243,239,233,.1)', paddingTop:12 }}>
          <div className="nav-item" onClick={onLogout}>
            <Icon name="logout" size={16} />Sign Out
          </div>
        </div>
      </div>
    </aside>
  )
}

// ─── Top header ────────────────────────────────────────────────
function TopBar({ role, label, user, notifCount = 0, onToggleSidebar, onNotif }) {
  return (
    <header style={{ background:'var(--ivory)', borderBottom:'1px solid rgba(224,193,164,.3)', padding:'12px 24px', display:'flex', alignItems:'center', justifyContent:'space-between', position:'sticky', top:0, zIndex:10 }}>
      <div className="flex items-center gap-3">
        <button onClick={onToggleSidebar} style={{ color:'var(--mocha)', padding:6, borderRadius:8 }} className="hover:opacity-70">
          <Icon name="menu" size={20} />
        </button>
        <h2 className="font-display font-bold" style={{ color:'var(--dark)', fontSize:17 }}>{label}</h2>
      </div>
      <div className="flex items-center gap-3">
        {(role === 'student' || role === 'admin') && (
          <button className="relative" style={{ color:'var(--mocha)', padding:8, borderRadius:8 }} onClick={onNotif}>
            <Icon name="bell" size={20} />
            {notifCount > 0 && (
              <span style={{ position:'absolute', top:-2, right:-2, width:16, height:16, background:'#b91c1c', color:'white', fontSize:10, borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', fontFamily:"'DM Mono',monospace" }}>
                {notifCount}
              </span>
            )}
          </button>
        )}
        <div style={{ width:32, height:32, borderRadius:'50%', background:'var(--navy)', color:'var(--cream)', fontSize:12, fontFamily:"'DM Mono',monospace", display:'flex', alignItems:'center', justifyContent:'center', fontWeight:500 }}>
          {user?.name?.split(' ').map((n) => n[0]).join('').slice(0, 2).toUpperCase() || '?'}
        </div>
      </div>
    </header>
  )
}

// ─── Main layout wrapper ────────────────────────────────────────
export default function DashboardLayout({ role, pageLabel, notifCount, children }) {
  const { user, logout } = useAuthStore()
  const navigate = useNavigate()
  const [sideOpen, setSideOpen] = useState(true)

  const handleLogout = () => { logout(); navigate('/') }

  const handleNotif = () => {
    if (role === 'student') navigate('/student/notifications')
    if (role === 'admin')   navigate('/admin/alerts')
  }

  return (
    <div className="flex" style={{ minHeight:'100vh' }}>
      {sideOpen && <Sidebar role={role} user={user} onLogout={handleLogout} />}
      <main className="flex-1 flex flex-col min-w-0">
        <TopBar
          role={role}
          label={pageLabel}
          user={user}
          notifCount={notifCount}
          onToggleSidebar={() => setSideOpen((v) => !v)}
          onNotif={handleNotif}
        />
        <div className="flex-1 page-enter" style={{ padding:24, background:'var(--cream)', overflowY:'auto' }}>
          {children}
        </div>
      </main>
    </div>
  )
}
