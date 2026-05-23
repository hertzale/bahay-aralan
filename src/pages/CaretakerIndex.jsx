// src/pages/caretaker/index.jsx
import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import DashboardLayout from '../components/DashboardLayout'
import { Badge, StatCard, PageHeader, AlertBanner, Icon, Input, Textarea, Select } from '../../components/ui'
import { ALL_DORMERS, ALL_PAYMENTS, APPLICATIONS, ACTIVITY_LOG, CARETAKER_MAINTENANCE, MONTHS, DORMS } from '../../lib/mockData'

const DORM_NAMES = [...new Set(DORMS.map((d) => d.name))]

function CaretakerLayout({ pageLabel, children }) {
  return (
    <DashboardLayout role="caretaker" pageLabel={pageLabel}>
      <div className="page-enter">{children}</div>
    </DashboardLayout>
  )
}

// ─── DASHBOARD ─────────────────────────────────────────────────
export function CaretakerDashboard() {
  const navigate = useNavigate()
  return (
    <CaretakerLayout pageLabel="Dashboard">
      <PageHeader title="Caretaker Dashboard" subtitle="Magnolia Residences — May 2025" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard icon="users"   label="Total Dormers"  value="18" sub="of 20 slots"      iconClass="icon-navy"   />
        <StatCard icon="card"    label="Unpaid Rent"    value="3"  sub="residents"         iconClass="icon-red"    />
        <StatCard icon="file"    label="Pending Apps"   value="2"  sub="awaiting"          iconClass="icon-mocha"  onClick={() => navigate('/caretaker/apps')} />
        <StatCard icon="wrench"  label="Maintenance"    value="2"  sub="open requests"     iconClass="icon-forest" />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Recent Activity</p>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {ACTIVITY_LOG.slice(0, 4).map((a) => {
              const iconName = a.type==='payment'?'dollar':a.type==='maintenance'?'wrench':a.type==='parcel'?'package':'file'
              const bg = { approve:'rgba(79,82,44,.1)', payment:'rgba(76,107,142,.1)', reject:'rgba(185,28,28,.1)' }[a.type] || 'rgba(173,141,109,.1)'
              const fg = { approve:'var(--forest)', payment:'var(--navy)', reject:'#b91c1c' }[a.type] || 'var(--khaki)'
              return (
                <div key={a.id} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                  <div style={{ width:34, height:34, borderRadius:9, background:bg, color:fg, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                    <Icon name={iconName} size={15} />
                  </div>
                  <div>
                    <p style={{ fontWeight:600, color:'var(--dark)', fontSize:14 }}>{a.action}</p>
                    <p style={{ fontSize:13, color:'var(--mocha)' }}>{a.detail} · {a.time}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Quick Actions</p>
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:10 }}>
            {[
              { icon:'users',   label:'Dormers',        path:'/caretaker/dormers',   bg:'var(--dark)'   },
              { icon:'file',    label:'Applications',   path:'/caretaker/apps',      bg:'var(--navy)'   },
              { icon:'dollar',  label:'Record Payment', path:'/caretaker/payments',  bg:'var(--forest)' },
              { icon:'package', label:'Parcel Log',     path:'/caretaker/parcels',   bg:'var(--khaki)'  },
            ].map((a) => (
              <button key={a.path} onClick={() => navigate(a.path)}
                style={{ display:'flex', alignItems:'center', gap:10, padding:'12px 14px', borderRadius:10, background:a.bg, color:'var(--cream)', border:'none', cursor:'pointer', fontFamily:"'Crimson Pro',serif", fontSize:15, fontWeight:600 }}
                className="hover:opacity-85 transition-opacity">
                <Icon name={a.icon} size={17} />{a.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    </CaretakerLayout>
  )
}

// ─── DORMER MANAGEMENT ─────────────────────────────────────────
export function DormerManagementPage() {
  const [dormFilter, setDormFilter] = useState('all')
  const [payFilter,  setPayFilter]  = useState('all')
  const [sortBy,     setSortBy]     = useState('name-az')
  const [search,     setSearch]     = useState('')

  const filtered = useMemo(() => {
    let list = [...ALL_DORMERS]
    if (dormFilter !== 'all') list = list.filter((s) => s.dorm === dormFilter)
    if (payFilter  !== 'all') list = list.filter((s) => s.paymentStatus === payFilter)
    if (search) list = list.filter((s) => s.name.toLowerCase().includes(search.toLowerCase()) || s.email.toLowerCase().includes(search.toLowerCase()))
    if (sortBy === 'name-az')  list.sort((a, b) => a.name.localeCompare(b.name))
    else if (sortBy === 'name-za') list.sort((a, b) => b.name.localeCompare(a.name))
    else if (sortBy === 'room-asc') list.sort((a, b) => a.room.localeCompare(b.room))
    return list
  }, [dormFilter, payFilter, sortBy, search])

  return (
    <CaretakerLayout pageLabel="Dormers">
      <PageHeader title="Dormer Management" subtitle="All residents across your dorms" />
      <div className="filter-bar">
        <Icon name="filter" size={14} style={{ color:'var(--mocha)' }} />
        <div style={{ position:'relative', flex:1, minWidth:160 }}>
          <Icon name="search" size={13} style={{ position:'absolute', left:10, top:'50%', transform:'translateY(-50%)', color:'var(--mocha)' }} />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search dormers…" className="filter-select" style={{ paddingLeft:30, width:'100%' }} />
        </div>
        <select value={dormFilter} onChange={(e) => setDormFilter(e.target.value)} className="filter-select">
          <option value="all">All Dorms</option>
          {DORM_NAMES.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={payFilter} onChange={(e) => setPayFilter(e.target.value)} className="filter-select">
          <option value="all">All Payment Status</option>
          <option value="paid">Paid</option>
          <option value="unpaid">Unpaid</option>
          <option value="pending">Pending</option>
        </select>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select">
          <option value="name-az">Name A–Z</option>
          <option value="name-za">Name Z–A</option>
          <option value="room-asc">Room No.</option>
        </select>
        <span style={{ fontFamily:"'DM Mono',monospace", fontSize:12, color:'var(--mocha)' }}>{filtered.length} results</span>
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr>{['Resident','Dorm','Room','Course','Contact','Status'].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{filtered.length === 0
              ? <tr><td colSpan={6} style={{ textAlign:'center', padding:30, color:'var(--mocha)' }}>No dormers match the filters.</td></tr>
              : filtered.map((s) => (
                <tr key={s.id}>
                  <td><p style={{ fontWeight:600 }}>{s.name}</p><p style={{ fontSize:13, color:'var(--mocha)' }}>{s.email}</p></td>
                  <td style={{ fontSize:14, color:'var(--mocha)' }}>{s.dorm}</td>
                  <td><span style={{ background:'rgba(173,141,109,.15)', color:'var(--khaki)', fontSize:12, padding:'3px 10px', borderRadius:6, fontFamily:"'DM Mono',monospace" }}>Rm {s.room}</span></td>
                  <td style={{ fontSize:14 }}>{s.course}</td>
                  <td style={{ fontSize:14, color:'var(--navy)' }}>{s.contact}</td>
                  <td><Badge status={s.paymentStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CaretakerLayout>
  )
}

// ─── APPLICATION REVIEW ────────────────────────────────────────
export function ApplicationReviewPage() {
  const [apps,       setApps]       = useState(APPLICATIONS)
  const [dormFilter, setDormFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const update = (id, status) => setApps((v) => v.map((a) => a.id === id ? { ...a, status } : a))
  const filtered = apps.filter((a) => (dormFilter === 'all' || a.dorm === dormFilter) && (statusFilter === 'all' || a.status === statusFilter))

  return (
    <CaretakerLayout pageLabel="Applications">
      <PageHeader title="Application Review" subtitle="Pending dormitory applications" />
      <div className="filter-bar">
        <Icon name="filter" size={14} style={{ color:'var(--mocha)' }} />
        <select value={dormFilter} onChange={(e) => setDormFilter(e.target.value)} className="filter-select">
          <option value="all">All Dorms</option>
          {[...new Set(apps.map((a) => a.dorm))].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="rejected">Rejected</option>
        </select>
      </div>
      <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
        {filtered.map((a) => (
          <div key={a.id} className="card" style={{ padding:20 }}>
            <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
              <div>
                <p className="font-display font-bold" style={{ color:'var(--dark)', fontSize:17 }}>{a.name}</p>
                <p style={{ fontSize:13, color:'var(--mocha)' }}>{a.email}</p>
              </div>
              <div style={{ display:'flex', alignItems:'flex-start', gap:10 }}>
                <span style={{ fontSize:13, color:'var(--mocha)', fontFamily:"'DM Mono',monospace" }}>{a.dorm}</span>
                <Badge status={a.status} />
              </div>
            </div>
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:14, marginBottom:12 }}>
              {[['Course', a.course], ['Year', `Year ${a.year}`], ['Room Pref.', a.room]].map(([l, v]) => (
                <div key={l}>
                  <p style={{ fontSize:12, color:'var(--mocha)', fontFamily:"'DM Mono',monospace", textTransform:'uppercase', letterSpacing:'0.06em', marginBottom:3 }}>{l}</p>
                  <p style={{ fontWeight:600, color:'var(--dark)', fontSize:15 }}>{v}</p>
                </div>
              ))}
            </div>
            {a.notes && <div style={{ background:'rgba(243,239,233,.7)', borderRadius:9, padding:'10px 14px', fontSize:14, color:'var(--mocha)', marginBottom:12, border:'1px solid rgba(224,193,164,.3)' }}>{a.notes}</div>}
            <p style={{ fontSize:13, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginBottom:12 }}>Applied: {a.date}</p>
            {a.status === 'pending' && (
              <div style={{ display:'flex', gap:10 }}>
                <button className="btn btn-primary btn-sm" onClick={() => update(a.id, 'approved')}><Icon name="check" size={13} />Approve</button>
                <button className="btn btn-danger  btn-sm" onClick={() => update(a.id, 'rejected')}><Icon name="x"     size={13} />Reject</button>
              </div>
            )}
          </div>
        ))}
      </div>
    </CaretakerLayout>
  )
}

// ─── PAYMENT RECORDING ─────────────────────────────────────────
export function PaymentRecordingPage() {
  const [form, setForm]   = useState({ dormer:'', month:'', amount:'', ref:'', date:'' })
  const [errors, setErrors] = useState({})
  const [done, setDone]   = useState(false)
  const [dormFilter, setDormFilter] = useState('all')
  const [monthFilter, setMonthFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortDir, setSortDir] = useState('desc')
  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.dormer) e.dormer = 'Select a dormer'
    if (!form.month)  e.month  = 'Select month'
    if (!form.amount || isNaN(form.amount)) e.amount = 'Valid amount required'
    if (!form.ref)    e.ref    = 'Reference required'
    return e
  }

  const filteredPay = useMemo(() => {
    let list = [...ALL_PAYMENTS]
    if (dormFilter  !== 'all') list = list.filter((p) => p.dorm   === dormFilter)
    if (monthFilter !== 'all') list = list.filter((p) => p.month  === monthFilter)
    if (statusFilter!== 'all') list = list.filter((p) => p.status === statusFilter)
    list.sort((a, b) => sortDir === 'asc' ? a.amount - b.amount : b.amount - a.amount)
    return list
  }, [dormFilter, monthFilter, statusFilter, sortDir])

  const totalCollected = filteredPay.filter((p) => p.status === 'verified').reduce((s, p) => s + p.amount, 0)

  return (
    <CaretakerLayout pageLabel="Record Payment">
      <PageHeader title="Record Payment" subtitle="Log a dormer's rent payment" />
      {done && <AlertBanner type="success">Payment recorded successfully!</AlertBanner>}
      <div style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-4" style={{ color:'var(--dark)' }}>Payment Details</p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <Select label="Select Dormer" value={form.dormer} onChange={f('dormer')} error={errors.dormer} required>
              <option value="">Choose resident...</option>
              {ALL_DORMERS.map((s) => <option key={s.id} value={s.name}>{s.name} — Rm {s.room}</option>)}
            </Select>
            <Select label="Billing Month" value={form.month} onChange={f('month')} error={errors.month} required>
              <option value="">Select month...</option>
              {MONTHS.map((m) => <option key={m}>{m}</option>)}
            </Select>
            <Input label="Amount (₱)" type="number" value={form.amount} onChange={f('amount')} placeholder="3500" error={errors.amount} required />
            <Input label="GCash Reference No." value={form.ref} onChange={f('ref')} placeholder="GC-XXXXXXXX" error={errors.ref} required />
            <Input label="Date Received" type="date" value={form.date} onChange={f('date')} />
            <button className="btn btn-primary" style={{ width:'100%' }}
              onClick={() => { const e = validate(); if (Object.keys(e).length) { setErrors(e) } else { setDone(true); setForm({ dormer:'', month:'', amount:'', ref:'', date:'' }); setTimeout(() => setDone(false), 4000) } }}>
              Record Payment
            </button>
          </div>
        </div>
        <div className="card" style={{ padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}>
            <p className="font-display font-bold" style={{ color:'var(--dark)' }}>Payment Overview</p>
            <span style={{ fontFamily:"'DM Mono',monospace", fontSize:14, color:'var(--navy)', fontWeight:600 }}>₱{totalCollected.toLocaleString()} collected</span>
          </div>
          <div className="filter-bar" style={{ marginBottom:12 }}>
            <Icon name="filter" size={13} style={{ color:'var(--mocha)' }} />
            <select value={dormFilter}   onChange={(e) => setDormFilter(e.target.value)}   className="filter-select">
              <option value="all">All Dorms</option>
              {DORM_NAMES.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
            <select value={monthFilter}  onChange={(e) => setMonthFilter(e.target.value)}  className="filter-select">
              <option value="all">All Months</option>
              {[...new Set(ALL_PAYMENTS.map((p) => p.month))].map((m) => <option key={m} value={m}>{m}</option>)}
            </select>
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="unpaid">Unpaid</option>
            </select>
            <select value={sortDir} onChange={(e) => setSortDir(e.target.value)} className="filter-select">
              <option value="desc">High → Low</option>
              <option value="asc">Low → High</option>
            </select>
          </div>
          <div className="table-wrapper">
            <table>
              <thead><tr>{['Resident','Dorm','Month','Amount','Status'].map((h) => <th key={h}>{h}</th>)}</tr></thead>
              <tbody>{filteredPay.length === 0
                ? <tr><td colSpan={5} style={{ textAlign:'center', padding:20, color:'var(--mocha)' }}>No records match.</td></tr>
                : filteredPay.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontWeight:500 }}>{p.student}</td>
                    <td style={{ fontSize:13, color:'var(--mocha)' }}>{p.dorm.split(' ')[0]}…</td>
                    <td style={{ fontSize:13, color:'var(--mocha)' }}>{p.month}</td>
                    <td className="font-mono" style={{ fontWeight:600 }}>₱{p.amount.toLocaleString()}</td>
                    <td><Badge status={p.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CaretakerLayout>
  )
}

// ─── MAINTENANCE MANAGEMENT ────────────────────────────────────
export function MaintenanceMgmtPage() {
  const [requests, setRequests] = useState(CARETAKER_MAINTENANCE)
  const [dormFilter,   setDormFilter]   = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const update = (id, s) => setRequests((v) => v.map((r) => r.id === id ? { ...r, status: s } : r))
  const filtered = requests.filter((r) => (dormFilter === 'all' || r.dorm === dormFilter) && (statusFilter === 'all' || r.status === statusFilter))

  return (
    <CaretakerLayout pageLabel="Maintenance">
      <PageHeader title="Maintenance Management" subtitle="All maintenance requests" />
      <div className="filter-bar">
        <Icon name="filter" size={14} style={{ color:'var(--mocha)' }} />
        <select value={dormFilter}   onChange={(e) => setDormFilter(e.target.value)}   className="filter-select">
          <option value="all">All Dorms</option>
          {[...new Set(requests.map((r) => r.dorm))].map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
        <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="filter-select">
          <option value="all">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="resolved">Resolved</option>
        </select>
      </div>
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr>{['Resident','Rm','Type','Issue','Dorm','Date','Status','Action'].map((h) => <th key={h}>{h}</th>)}</tr></thead>
            <tbody>{filtered.length === 0
              ? <tr><td colSpan={8} style={{ textAlign:'center', padding:24, color:'var(--mocha)' }}>No requests match.</td></tr>
              : filtered.map((r) => (
                <tr key={r.id}>
                  <td style={{ fontWeight:500 }}>{r.student}</td>
                  <td><span style={{ background:'rgba(173,141,109,.15)', color:'var(--khaki)', fontSize:12, padding:'2px 8px', borderRadius:6, fontFamily:"'DM Mono',monospace" }}>{r.room}</span></td>
                  <td style={{ fontSize:14 }}>{r.type}</td>
                  <td style={{ fontSize:14, color:'var(--mocha)' }}>{r.issue}</td>
                  <td style={{ fontSize:13, color:'var(--mocha)' }}>{r.dorm.split(' ')[0]}…</td>
                  <td style={{ fontSize:13, color:'var(--mocha)' }}>{r.date}</td>
                  <td><Badge status={r.status} /></td>
                  <td>
                    <select value={r.status} onChange={(e) => update(r.id, e.target.value)} className="filter-select" style={{ fontSize:13 }}>
                      {['pending','in-progress','resolved'].map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </CaretakerLayout>
  )
}

// ─── PARCEL LOG ────────────────────────────────────────────────
export function ParcelLoggingPage() {
  const [form, setForm] = useState({ dormer:'', desc:'' })
  const [errors, setErrors] = useState({})
  const [logs, setLogs] = useState([
    { id:1, dormer:'Sandra Fresnido', desc:'Package from Shopee (small box)',  date:'May 14, 2025', claimed:true  },
    { id:2, dormer:'Alfonso Mendoza', desc:'Envelope from SSS',                date:'May 16, 2025', claimed:false },
    { id:3, dormer:'Xavier Mendez',   desc:'Lazada package (medium box)',       date:'May 20, 2025', claimed:false },
  ])
  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.dormer) e.dormer = 'Select a dormer'
    if (!form.desc.trim()) e.desc = 'Required'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLogs((v) => [{ id: Date.now(), dormer: form.dormer, desc: form.desc, date: 'Today', claimed: false }, ...v])
    setForm({ dormer:'', desc:'' }); setErrors({})
  }

  return (
    <CaretakerLayout pageLabel="Parcel Log">
      <PageHeader title="Parcel Log" subtitle="Record deliveries for your dormers" />
      <div style={{ display:'grid', gridTemplateColumns:'2fr 3fr', gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-4" style={{ color:'var(--dark)' }}>Log New Parcel</p>
          <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
            <Select label="Recipient" value={form.dormer} onChange={f('dormer')} error={errors.dormer} required>
              <option value="">Select dormer...</option>
              {ALL_DORMERS.map((s) => <option key={s.id} value={s.name}>{s.name} — Rm {s.room}</option>)}
            </Select>
            <Textarea label="Description" value={form.desc} onChange={f('desc')} placeholder="e.g. Small box from Shopee" rows={3} error={errors.desc} required />
            <button className="btn btn-primary" style={{ width:'100%', display:'flex', alignItems:'center', justifyContent:'center', gap:8 }} onClick={submit}>
              <Icon name="package" size={16} />Log Delivery
            </button>
          </div>
        </div>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Delivery Log</p>
          <div style={{ display:'flex', flexDirection:'column', gap:10 }}>
            {logs.map((l) => (
              <div key={l.id} style={{ display:'flex', gap:12, alignItems:'flex-start', padding:'12px 14px', border:'1px solid rgba(224,193,164,.3)', borderRadius:10 }}>
                <div style={{ width:36, height:36, background:'rgba(173,141,109,.15)', color:'var(--khaki)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name="package" size={17} />
                </div>
                <div style={{ flex:1 }}>
                  <p style={{ fontWeight:600, color:'var(--dark)', fontSize:15 }}>{l.dormer}</p>
                  <p style={{ fontSize:14, color:'var(--mocha)' }}>{l.desc}</p>
                  <p style={{ fontSize:12, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginTop:3 }}>{l.date}</p>
                </div>
                <Badge status={l.claimed ? 'resolved' : 'pending'} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </CaretakerLayout>
  )
}
