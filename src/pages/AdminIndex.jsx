import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Badge, StatCard, PageHeader, Icon } from '../components/ui'
import { STUDENTS, EMERGENCY_ALERTS } from '../lib/mockData'

function AdminLayout({ pageLabel, children }) {
  const alertCount = EMERGENCY_ALERTS.filter(a => a.level === 'high').length
  return (
    <DashboardLayout role="admin" pageLabel={pageLabel} notifCount={alertCount}>
      <div className="page-enter">{children}</div>
    </DashboardLayout>
  )
}

export function AdminDashboard() {
  return (
    <AdminLayout pageLabel="Dashboard">
      <PageHeader title="Admin Dashboard" subtitle="University oversight panel" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard icon="users"    label="Registered Students" value={STUDENTS.length}  sub="total"           iconClass="icon-navy"   />
        <StatCard icon="building" label="Dorms Monitored"     value="6"                sub="properties"      iconClass="icon-forest" />
        <StatCard icon="alert"    label="Active Alerts"       value={EMERGENCY_ALERTS.length} sub="city-wide" iconClass="icon-red"    />
        <StatCard icon="shield"   label="Compliance Rate"     value="94%"              sub="payment rate"    iconClass="icon-dark"   />
      </div>
      <div className="card" style={{ padding:20 }}>
        <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Emergency Alerts</p>
        {EMERGENCY_ALERTS.map(a => (
          <div key={a.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'12px 0', borderBottom:'1px solid rgba(224,193,164,.2)' }}>
            <div style={{ display:'flex', gap:12, alignItems:'center' }}>
              <div style={{ width:36, height:36, borderRadius:9, background: a.level==='high'?'rgba(185,28,28,.1)':'rgba(173,141,109,.1)', color: a.level==='high'?'#b91c1c':'var(--khaki)', display:'flex', alignItems:'center', justifyContent:'center' }}>
                <Icon name="alert" size={16} />
              </div>
              <div>
                <p style={{ fontWeight:600, color:'var(--dark)', fontSize:14 }}>{a.title}</p>
                <p style={{ fontSize:13, color:'var(--mocha)' }}>{a.area} · {a.time}</p>
              </div>
            </div>
            <Badge status={a.level} />
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}

export function StudentRegistryPage() {
  const [search, setSearch] = useState('')
  const filtered = STUDENTS.filter(s =>
    s.name.toLowerCase().includes(search.toLowerCase()) ||
    s.email.toLowerCase().includes(search.toLowerCase())
  )
  return (
    <AdminLayout pageLabel="Student Registry">
      <PageHeader title="Student Registry" subtitle="All registered dormers" />
      <div className="filter-bar">
        <Icon name="search" size={14} style={{ color:'var(--mocha)' }} />
        <input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search students…" className="filter-select" style={{ flex:1 }} />
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr>{['Student','Dorm','Room','Course','Contact','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>{filtered.map(s=>(
              <tr key={s.id}>
                <td><p style={{ fontWeight:600 }}>{s.name}</p><p style={{ fontSize:12, color:'var(--mocha)' }}>{s.email}</p></td>
                <td style={{ fontSize:13, color:'var(--mocha)' }}>{s.dorm}</td>
                <td><span style={{ background:'rgba(173,141,109,.15)', color:'var(--khaki)', fontSize:12, padding:'2px 8px', borderRadius:5, fontFamily:"'DM Mono',monospace" }}>Rm {s.room}</span></td>
                <td style={{ fontSize:13 }}>{s.course}</td>
                <td style={{ fontSize:13, color:'var(--navy)' }}>{s.contact}</td>
                <td><Badge status={s.paymentStatus} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}

export function AlertsPage() {
  return (
    <AdminLayout pageLabel="Alerts">
      <PageHeader title="Emergency Alerts" subtitle="City-wide safety notifications" />
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {EMERGENCY_ALERTS.map(a => (
          <div key={a.id} className="card" style={{ padding:20, borderLeft:`4px solid ${a.level==='high'?'#b91c1c':'var(--khaki)'}` }}>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
              <div>
                <p className="font-display font-bold" style={{ fontSize:17, color:'var(--dark)', marginBottom:4 }}>{a.title}</p>
                <p style={{ fontSize:14, color:'var(--mocha)' }}><Icon name="pin" size={13} style={{ display:'inline', marginRight:4 }} />{a.area}</p>
                <p style={{ fontSize:12, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginTop:4 }}>{a.time}</p>
              </div>
              <Badge status={a.level} />
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
