import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { Badge, StatCard, PageHeader, Modal, Input, Textarea, Select, AlertBanner, Icon } from '../components/ui'
import { DORMS, MY_PAYMENTS, MY_MAINTENANCE, NOTIFICATIONS } from '../lib/mockData'

function StudentLayout({ pageLabel, notifCount, children }) {
  return (
    <DashboardLayout role="student" pageLabel={pageLabel} notifCount={notifCount}>
      <div className="page-enter">{children}</div>
    </DashboardLayout>
  )
}

export function StudentDashboard() {
  const navigate = useNavigate()
  const unread = NOTIFICATIONS.filter(n => !n.read).length
  return (
    <StudentLayout pageLabel="Dashboard" notifCount={unread}>
      <PageHeader title="My Dashboard" subtitle="Magnolia Residences — Room 201" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard icon="building" label="Current Dorm"   value="Magnolia" sub="Room 201"         iconClass="icon-navy"   />
        <StatCard icon="card"    label="Rent Status"    value="Paid"     sub="May 2025"           iconClass="icon-forest" />
        <StatCard icon="wrench"  label="Maintenance"    value="2"        sub="open requests"      iconClass="icon-mocha"  />
        <StatCard icon="bell"    label="Notifications"  value={unread}   sub="unread"             iconClass="icon-red"    onClick={() => navigate('/student/notifications')} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Recent Payments</p>
          {MY_PAYMENTS.slice(0,3).map(p => (
            <div key={p.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid rgba(224,193,164,.2)' }}>
              <div><p style={{ fontWeight:600, fontSize:14 }}>{p.month}</p><p style={{ fontSize:12, color:'var(--mocha)', fontFamily:"'DM Mono',monospace" }}>{p.ref}</p></div>
              <div style={{ textAlign:'right' }}><p style={{ fontWeight:600, fontFamily:"'DM Mono',monospace" }}>₱{p.amount.toLocaleString()}</p><Badge status={p.status} /></div>
            </div>
          ))}
        </div>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Maintenance Requests</p>
          {MY_MAINTENANCE.map(m => (
            <div key={m.id} style={{ display:'flex', justifyContent:'space-between', alignItems:'center', padding:'10px 0', borderBottom:'1px solid rgba(224,193,164,.2)' }}>
              <div><p style={{ fontWeight:600, fontSize:14 }}>{m.type}</p><p style={{ fontSize:13, color:'var(--mocha)' }}>{m.issue}</p></div>
              <Badge status={m.status} />
            </div>
          ))}
        </div>
      </div>
    </StudentLayout>
  )
}

export function DormSearchPage() {
  const [search, setSearch] = useState('')
  const [maxPrice, setMaxPrice] = useState('')
  const filtered = DORMS.filter(d =>
    d.name.toLowerCase().includes(search.toLowerCase()) &&
    (!maxPrice || d.price <= Number(maxPrice))
  )
  return (
    <StudentLayout pageLabel="Browse Units">
      <PageHeader title="Browse Dorm Units" subtitle="Find the right place for you" />
      <div className="filter-bar">
        <Icon name="search" size={14} style={{ color:'var(--mocha)' }} />
        <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search dorms…" className="filter-select" style={{ flex:1 }} />
        <input type="number" value={maxPrice} onChange={e => setMaxPrice(e.target.value)} placeholder="Max price (₱)" className="filter-select" style={{ width:160 }} />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))', gap:18 }}>
        {filtered.map(d => (
          <div key={d.id} className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ height:90, background:`linear-gradient(135deg,${d.colorA},${d.colorB})`, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="building" size={36} style={{ color:'rgba(243,239,233,.4)' }} />
            </div>
            <div style={{ padding:18 }}>
              <p className="font-display font-bold" style={{ fontSize:17, color:'var(--dark)', marginBottom:4 }}>{d.name}</p>
              <p style={{ fontSize:13, color:'var(--mocha)', marginBottom:10 }}>{d.address}</p>
              <div style={{ display:'flex', flexWrap:'wrap', gap:6, marginBottom:12 }}>
                {d.amenities.slice(0,4).map(a => (
                  <span key={a} style={{ background:'rgba(76,107,142,.1)', color:'var(--navy)', fontSize:11, padding:'3px 8px', borderRadius:5, fontFamily:"'DM Mono',monospace" }}>{a}</span>
                ))}
              </div>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:16, color:'var(--dark)' }}>₱{d.price.toLocaleString()}/mo</span>
                <span style={{ fontSize:12, color: d.slots-d.occupied > 3 ? 'var(--forest)' : '#b91c1c', fontFamily:"'DM Mono',monospace" }}>{d.slots-d.occupied} slots left</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  )
}

export function StudentPaymentsPage() {
  return (
    <StudentLayout pageLabel="Payments">
      <PageHeader title="My Payments" subtitle="Monthly rent payment history" />
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr>{['Month','Amount','Reference','Date','Status'].map(h => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{MY_PAYMENTS.map(p => (
              <tr key={p.id}>
                <td style={{ fontWeight:600 }}>{p.month}</td>
                <td className="font-mono" style={{ fontWeight:600 }}>₱{p.amount.toLocaleString()}</td>
                <td style={{ fontFamily:"'DM Mono',monospace", fontSize:13 }}>{p.ref}</td>
                <td style={{ fontSize:13, color:'var(--mocha)' }}>{p.date}</td>
                <td><Badge status={p.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </StudentLayout>
  )
}

export function StudentMaintenancePage() {
  const [open, setOpen] = useState(false)
  const [requests, setRequests] = useState(MY_MAINTENANCE)
  const [form, setForm] = useState({ type:'', issue:'', description:'' })
  const [done, setDone] = useState(false)
  const f = k => e => setForm(v => ({ ...v, [k]: e.target.value }))

  const submit = () => {
    if (!form.type || !form.issue) return
    setRequests(v => [{ id: Date.now(), ...form, date:'Today', status:'pending' }, ...v])
    setForm({ type:'', issue:'', description:'' })
    setOpen(false); setDone(true)
    setTimeout(() => setDone(false), 3000)
  }

  return (
    <StudentLayout pageLabel="Maintenance">
      <PageHeader title="Maintenance Requests" subtitle="Report issues in your room"
        action={<button className="btn btn-primary btn-sm" onClick={() => setOpen(true)}><Icon name="plus" size={14} />New Request</button>} />
      {done && <AlertBanner type="success">Request submitted!</AlertBanner>}
      <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
        {requests.map(r => (
          <div key={r.id} className="card" style={{ padding:18, display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
            <div>
              <p style={{ fontWeight:600, fontSize:15, color:'var(--dark)' }}>{r.type} — {r.issue}</p>
              <p style={{ fontSize:13, color:'var(--mocha)', marginTop:3 }}>{r.description}</p>
              <p style={{ fontSize:12, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginTop:5 }}>{r.date}</p>
            </div>
            <Badge status={r.status} />
          </div>
        ))}
      </div>
      <Modal open={open} onClose={() => setOpen(false)} title="Submit Maintenance Request">
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Select label="Type" value={form.type} onChange={f('type')} required>
            <option value="">Select type...</option>
            {['Plumbing','Electrical','HVAC','Furniture','Internet','Other'].map(t => <option key={t}>{t}</option>)}
          </Select>
          <Input label="Issue Summary" value={form.issue} onChange={f('issue')} placeholder="e.g. Broken faucet" required />
          <Textarea label="Description" value={form.description} onChange={f('description')} rows={3} placeholder="Describe the problem..." />
          <button className="btn btn-primary" style={{ width:'100%' }} onClick={submit}>Submit Request</button>
        </div>
      </Modal>
    </StudentLayout>
  )
}

export function StudentNotificationsPage() {
  const [notifs, setNotifs] = useState(NOTIFICATIONS)
  const markAll = () => setNotifs(v => v.map(n => ({ ...n, read: true })))
  return (
    <StudentLayout pageLabel="Notifications" notifCount={notifs.filter(n => !n.read).length}>
      <PageHeader title="Notifications" subtitle={`${notifs.filter(n=>!n.read).length} unread`}
        action={<button className="btn btn-secondary btn-sm" onClick={markAll}>Mark all read</button>} />
      <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
        {notifs.map(n => (
          <div key={n.id} className="card" style={{ padding:16, display:'flex', gap:14, alignItems:'flex-start', opacity: n.read ? 0.7 : 1 }}
            onClick={() => setNotifs(v => v.map(x => x.id===n.id ? {...x,read:true} : x))}>
            <div style={{ width:38, height:38, borderRadius:10, background: n.type==='success'?'rgba(79,82,44,.15)':n.type==='warning'?'rgba(173,141,109,.15)':'rgba(76,107,142,.15)', color: n.type==='success'?'var(--forest)':n.type==='warning'?'var(--khaki)':'var(--navy)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
              <Icon name={n.type==='success'?'check':n.type==='warning'?'alert':'bell'} size={17} />
            </div>
            <div style={{ flex:1 }}>
              <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start' }}>
                <p style={{ fontWeight:600, color:'var(--dark)', fontSize:15 }}>{n.title}</p>
                {!n.read && <span style={{ width:8, height:8, background:'var(--navy)', borderRadius:'50%', flexShrink:0, marginTop:5 }} />}
              </div>
              <p style={{ fontSize:13, color:'var(--mocha)', marginTop:2 }}>{n.message}</p>
              <p style={{ fontSize:12, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginTop:4 }}>{n.time}</p>
            </div>
          </div>
        ))}
      </div>
    </StudentLayout>
  )
}