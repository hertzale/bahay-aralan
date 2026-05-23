import { useState } from 'react'
import DashboardLayout from '../components/DashboardLayout'
import { Badge, StatCard, PageHeader, SimpleBarChart, Icon } from '../components/ui'
import { DORMS, ALL_PAYMENTS, ACTIVITY_LOG, REVENUE_DATA } from '../lib/mockData'

function OwnerLayout({ pageLabel, children }) {
  return (
    <DashboardLayout role="owner" pageLabel={pageLabel}>
      <div className="page-enter">{children}</div>
    </DashboardLayout>
  )
}

export function OwnerDashboard() {
  const totalRevenue = ALL_PAYMENTS.filter(p => p.status==='verified').reduce((s,p)=>s+p.amount,0)
  const totalSlots   = DORMS.reduce((s,d)=>s+d.slots,0)
  const occupied     = DORMS.reduce((s,d)=>s+d.occupied,0)
  return (
    <OwnerLayout pageLabel="Dashboard">
      <PageHeader title="Owner Dashboard" subtitle="Portfolio overview — May 2025" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:16, marginBottom:24 }}>
        <StatCard icon="building" label="Total Dorms"    value={DORMS.length}              sub="properties"        iconClass="icon-navy"   />
        <StatCard icon="users"    label="Total Dormers"  value={occupied}                  sub={`of ${totalSlots} slots`} iconClass="icon-forest" />
        <StatCard icon="dollar"   label="Monthly Revenue" value={`₱${(totalRevenue/1000).toFixed(0)}k`} sub="collected"   iconClass="icon-mocha"  />
        <StatCard icon="activity" label="Occupancy Rate" value={`${Math.round(occupied/totalSlots*100)}%`} sub="avg across dorms" iconClass="icon-dark" />
      </div>
      <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr', gap:20 }}>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-1" style={{ color:'var(--dark)' }}>Revenue Trend</p>
          <SimpleBarChart data={REVENUE_DATA} />
        </div>
        <div className="card" style={{ padding:20 }}>
          <p className="font-display font-bold mb-3" style={{ color:'var(--dark)' }}>Dorm Summary</p>
          {DORMS.slice(0,4).map(d => (
            <div key={d.id} style={{ marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:4 }}>
                <span style={{ fontSize:13, fontWeight:600 }}>{d.name.split(' ')[0]}</span>
                <span style={{ fontSize:12, fontFamily:"'DM Mono',monospace", color:'var(--mocha)' }}>{d.occupied}/{d.slots}</span>
              </div>
              <div style={{ height:5, background:'rgba(224,193,164,.3)', borderRadius:3 }}>
                <div style={{ height:'100%', width:`${d.occupied/d.slots*100}%`, background:'var(--navy)', borderRadius:3 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </OwnerLayout>
  )
}

export function DormListingsPage() {
  return (
    <OwnerLayout pageLabel="Dorm Listings">
      <PageHeader title="Dorm Listings" subtitle="Your registered properties" />
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill,minmax(320px,1fr))', gap:18 }}>
        {DORMS.map(d => (
          <div key={d.id} className="card" style={{ padding:0, overflow:'hidden' }}>
            <div style={{ height:80, background:`linear-gradient(135deg,${d.colorA},${d.colorB})`, position:'relative' }}>
              <div style={{ position:'absolute', bottom:10, right:14, fontFamily:"'DM Mono',monospace", fontSize:13, color:'rgba(243,239,233,.8)', fontWeight:600 }}>
                {d.slots-d.occupied} slots open
              </div>
            </div>
            <div style={{ padding:18 }}>
              <p className="font-display font-bold" style={{ fontSize:17, color:'var(--dark)', marginBottom:3 }}>{d.name}</p>
              <p style={{ fontSize:13, color:'var(--mocha)', marginBottom:10 }}>{d.address}</p>
              <div style={{ display:'flex', justifyContent:'space-between' }}>
                <span style={{ fontFamily:"'DM Mono',monospace", fontWeight:700, color:'var(--dark)' }}>₱{d.price.toLocaleString()}/mo</span>
                <div style={{ display:'flex', gap:4, alignItems:'center' }}>
                  <Icon name="star" size={13} style={{ color:'#f59e0b' }} />
                  <span style={{ fontSize:13, fontWeight:600 }}>{d.rating}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </OwnerLayout>
  )
}

export function OwnerPaymentsPage() {
  return (
    <OwnerLayout pageLabel="Payments">
      <PageHeader title="Payment Overview" subtitle="All rent collections" />
      <div className="card" style={{ overflow:'hidden' }}>
        <div className="table-wrapper">
          <table>
            <thead><tr>{['Resident','Dorm','Month','Amount','Status'].map(h=><th key={h}>{h}</th>)}</tr></thead>
            <tbody>{ALL_PAYMENTS.map(p=>(
              <tr key={p.id}>
                <td style={{ fontWeight:500 }}>{p.student}</td>
                <td style={{ fontSize:13, color:'var(--mocha)' }}>{p.dorm}</td>
                <td style={{ fontSize:13 }}>{p.month}</td>
                <td className="font-mono" style={{ fontWeight:600 }}>₱{p.amount.toLocaleString()}</td>
                <td><Badge status={p.status} /></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      </div>
    </OwnerLayout>
  )
}

export function ActivityLogPage() {
  const icons = { approve:'check', payment:'dollar', maintenance:'wrench', parcel:'package', reject:'x' }
  const colors = { approve:'var(--forest)', payment:'var(--navy)', reject:'#b91c1c', maintenance:'var(--khaki)', parcel:'var(--mocha)' }
  return (
    <OwnerLayout pageLabel="Activity Log">
      <PageHeader title="Activity Log" subtitle="Recent caretaker actions" />
      <div className="card" style={{ padding:20 }}>
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          {ACTIVITY_LOG.map(a => (
            <div key={a.id} style={{ display:'flex', gap:14, alignItems:'flex-start', paddingBottom:14, borderBottom:'1px solid rgba(224,193,164,.2)' }}>
              <div style={{ width:36, height:36, borderRadius:9, background:`rgba(0,0,0,.06)`, color:colors[a.type]||'var(--mocha)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                <Icon name={icons[a.type]||'activity'} size={16} />
              </div>
              <div>
                <p style={{ fontWeight:600, color:'var(--dark)', fontSize:14 }}>{a.action}</p>
                <p style={{ fontSize:13, color:'var(--mocha)' }}>{a.detail}</p>
                <p style={{ fontSize:12, color:'var(--sand)', fontFamily:"'DM Mono',monospace", marginTop:3 }}>{a.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </OwnerLayout>
  )
}