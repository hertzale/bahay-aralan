// src/pages/public/LandingPage.jsx
import { useNavigate } from 'react-router-dom'
import { Icon } from '../components/ui'
import { DORMS } from '../lib/mockData'

export default function LandingPage() {
  const navigate = useNavigate()

  return (
    <div className="hero-bg" style={{ minHeight:'100vh', display:'flex', flexDirection:'column', position:'relative' }}>
      {/* Decorative ornaments */}
      <div className="ornament" style={{ fontSize:220, top:-40, right:-30, color:'var(--cream)', transform:'rotate(-12deg)' }}>⌂</div>
      <div className="ornament" style={{ fontSize:120, bottom:60, left:-20, color:'var(--sand)', transform:'rotate(8deg)' }}>◈</div>

      {/* Nav */}
      <nav className="hero-content flex items-center justify-between" style={{ padding:'20px 48px' }}>
        <div className="flex items-center gap-2.5">
          <div style={{ width:36, height:36, background:'var(--sand)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="building" size={18} style={{ color:'var(--dark)' }} />
          </div>
          <span className="font-display font-bold text-xl" style={{ color:'var(--cream)', letterSpacing:'-0.01em' }}>Bahay-Aralan</span>
        </div>
        <div className="flex items-center gap-6">
          <button className="hero-nav-link">About</button>
          <button className="hero-nav-link">Dorms</button>
          <button className="btn btn-secondary" style={{ color:'var(--cream)', borderColor:'rgba(224,193,164,.5)', fontSize:15 }} onClick={() => navigate('/signin')}>Sign In</button>
          <button className="btn btn-primary" style={{ background:'var(--sand)', color:'var(--dark)', fontSize:15 }} onClick={() => navigate('/register')}>Register</button>
        </div>
      </nav>

      {/* Hero */}
      <div className="hero-content flex-1 flex flex-col items-center justify-center text-center" style={{ padding:'60px 24px' }}>
        <div style={{ display:'inline-flex', alignItems:'center', gap:8, background:'rgba(224,193,164,.15)', border:'1px solid rgba(224,193,164,.3)', color:'var(--sand)', borderRadius:20, padding:'6px 18px', marginBottom:28, fontSize:13, fontFamily:"'DM Mono',monospace", letterSpacing:'0.06em' }}>
          ◆ SMART DORMITORY MANAGEMENT
        </div>

        <h1 className="font-display font-bold" style={{ color:'var(--cream)', fontSize:'clamp(2.8rem,7vw,5.5rem)', lineHeight:1.05, marginBottom:24, maxWidth:800, letterSpacing:'-0.02em' }}>
          BAHAY-ARALAN:<br />
          <span style={{ color:'var(--sand)' }}>Home Away From Home</span>
        </h1>

        <p style={{ color:'rgba(243,239,233,.72)', fontSize:'1.2rem', maxWidth:520, lineHeight:1.65, marginBottom:40, fontFamily:"'Crimson Pro',serif" }}>
          Bahay-Aralan connects students, caretakers, dorm owners, and university admins in one seamless platform built for Filipino campus life.
        </p>

        <div className="flex items-center gap-4">
          <button className="btn btn-primary btn-lg" style={{ background:'var(--sand)', color:'var(--dark)' }} onClick={() => navigate('/register')}>
            Register Now
          </button>
          <button className="btn btn-secondary btn-lg" style={{ color:'var(--cream)', borderColor:'rgba(224,193,164,.45)' }} onClick={() => navigate('/signin')}>
            Sign In
          </button>
        </div>

        {/* Feature pills */}
        <div className="flex items-center gap-3 mt-12 flex-wrap justify-center">
          {['₱ Online Payments', '🔔 Real-time Alerts', '📋 Maintenance Requests', '🏠 Dorm Search'].map((t) => (
            <div key={t} style={{ background:'rgba(243,239,233,.1)', border:'1px solid rgba(243,239,233,.18)', borderRadius:20, padding:'7px 16px', color:'rgba(243,239,233,.75)', fontSize:14, fontFamily:"'Crimson Pro',serif" }}>
              {t}
            </div>
          ))}
        </div>
      </div>

      {/* Nearby units preview */}
      <div className="hero-content" style={{ background:'rgba(243,239,233,.06)', backdropFilter:'blur(8px)', borderTop:'1px solid rgba(224,193,164,.2)', padding:'28px 48px' }}>
        <p style={{ color:'var(--sand)', fontFamily:"'DM Mono',monospace", fontSize:11, letterSpacing:'0.1em', textTransform:'uppercase', marginBottom:16, textAlign:'center' }}>
          Available Units Near You
        </p>
        <div style={{ display:'flex', gap:16, overflowX:'auto', paddingBottom:4 }}>
          {DORMS.slice(0, 4).map((d) => (
            <div
              key={d.id}
              onClick={() => navigate('/signin')}
              style={{ background:'rgba(243,239,233,.1)', border:'1px solid rgba(224,193,164,.25)', borderRadius:12, padding:'14px 18px', minWidth:200, cursor:'pointer', flexShrink:0, transition:'all .2s' }}
              onMouseEnter={(e) => { e.currentTarget.style.background = 'rgba(243,239,233,.18)' }}
              onMouseLeave={(e) => { e.currentTarget.style.background = 'rgba(243,239,233,.1)' }}
            >
              <p className="font-display font-bold" style={{ color:'var(--cream)', fontSize:15, marginBottom:4 }}>{d.name}</p>
              <p style={{ color:'rgba(224,193,164,.7)', fontSize:13, marginBottom:8 }}>{d.address.split(',')[1]?.trim()}</p>
              <div className="flex items-center justify-between">
                <span style={{ color:'var(--sand)', fontFamily:"'DM Mono',monospace", fontSize:14, fontWeight:500 }}>₱{d.price.toLocaleString()}/mo</span>
                <span style={{ color: d.slots - d.occupied > 5 ? '#86efac' : '#fca5a5', fontSize:12, fontFamily:"'DM Mono',monospace" }}>{d.slots - d.occupied} slots</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <footer style={{ textAlign:'center', padding:16, color:'rgba(243,239,233,.35)', fontSize:13, fontFamily:"'DM Mono',monospace", letterSpacing:'0.04em', position:'relative', zIndex:2 }}>
        © 2025 BAHAY-ARALAN 
      </footer>
    </div>
  )
}