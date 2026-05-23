// src/pages/public/SignInPage.jsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthStore, DEMO_USERS } from '../../lib/store'
import { Icon, Input, AlertBanner } from '../../components/ui'

export default function SignInPage() {
  const navigate         = useNavigate()
  const { login }        = useAuthStore()
  const [form, setForm]  = useState({ email: '', password: '' })
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const [err, setErr]    = useState('')

  const f = (k) => (e) => setForm((v) => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.email) e.email = 'Email is required'
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = 'Enter a valid email'
    if (!form.password) e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setLoading(true); setErr('')
    setTimeout(() => {
      const user = DEMO_USERS[form.email]
      if (user && form.password.length >= 6) {
        login(user, 'mock-token-' + user.id)
        const paths = { student:'/student', caretaker:'/caretaker', owner:'/owner', admin:'/admin' }
        navigate(paths[user.role])
      } else {
        setErr('Invalid email or password.')
        setLoading(false)
      }
    }, 800)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', background:'var(--cream)' }}>
      {/* Left panel */}
      <div className="hero-bg hidden md:flex flex-col justify-center" style={{ flex:'0 0 45%', padding:'60px 56px', position:'relative', overflow:'hidden' }}>
        <div className="ornament" style={{ fontSize:300, top:-80, right:-60, color:'var(--cream)', transform:'rotate(-15deg)' }}>⌂</div>
        <div style={{ position:'relative', zIndex:2 }}>
          <div className="flex items-center gap-2.5 mb-10">
            <div style={{ width:36, height:36, background:'var(--sand)', borderRadius:10, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="building" size={18} style={{ color:'var(--dark)' }} />
            </div>
            <span className="font-display font-bold text-xl" style={{ color:'var(--cream)' }}>Bahay-Aralan</span>
          </div>
          <h2 className="font-display font-bold" style={{ color:'var(--cream)', fontSize:'3rem', lineHeight:1.1, marginBottom:16 }}>
            Maligayang<br />Pagbabalik. 🏠
          </h2>
          <p style={{ color:'rgba(243,239,233,.7)', fontSize:'1.1rem', maxWidth:320, lineHeight:1.6 }}>
            Sign in to access your personalized dashboard and manage your dormitory experience.
          </p>
          <div style={{ marginTop:36, display:'flex', flexDirection:'column', gap:12 }}>
            {['Secure role-based access','Real-time notifications','Mobile-friendly design'].map((t, i) => (
              <div key={i} className="flex items-center gap-3" style={{ color:'rgba(243,239,233,.8)', fontSize:'1rem' }}>
                <div style={{ width:20, height:20, background:'var(--sand)', borderRadius:'50%', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <Icon name="check" size={11} style={{ color:'var(--dark)' }} />
                </div>{t}
              </div>
            ))}
          </div>
          {/* Demo credentials hint */}
          <div style={{ marginTop:32, background:'rgba(243,239,233,.1)', borderRadius:10, padding:'12px 14px', border:'1px solid rgba(243,239,233,.15)' }}>
            <p style={{ color:'var(--sand)', fontSize:12, fontFamily:"'DM Mono',monospace", marginBottom:8, letterSpacing:'0.08em', textTransform:'uppercase' }}>Demo Logins</p>
            {Object.entries(DEMO_USERS).map(([email, u]) => (
              <p key={email} style={{ color:'rgba(243,239,233,.7)', fontSize:13, marginBottom:2 }}>
                <span style={{ color:'var(--sand)' }}>{u.role}:</span> {email}
              </p>
            ))}
            <p style={{ color:'rgba(243,239,233,.5)', fontSize:12, marginTop:6 }}>any password (6+ chars)</p>
          </div>
        </div>
      </div>

      {/* Right panel */}
      <div style={{ flex:1, display:'flex', alignItems:'center', justifyContent:'center', padding:24 }}>
        <div style={{ width:'100%', maxWidth:400 }}>
          <div className="md:hidden flex items-center gap-2 mb-8">
            <div style={{ width:30, height:30, background:'var(--dark)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
              <Icon name="building" size={15} style={{ color:'var(--cream)' }} />
            </div>
            <span className="font-display font-bold text-lg" style={{ color:'var(--dark)' }}>Bahay-Aralan</span>
          </div>

          <h3 className="font-display font-bold" style={{ color:'var(--dark)', fontSize:'1.7rem', marginBottom:4 }}>Sign In</h3>
          <p style={{ color:'var(--mocha)', fontSize:'1rem', marginBottom:28 }}>Enter your credentials to continue</p>

          {err && <AlertBanner type="danger">{err}</AlertBanner>}

          <div style={{ display:'flex', flexDirection:'column', gap:16, marginBottom:16 }}>
            <Input label="Email Address" type="email" value={form.email} onChange={f('email')} placeholder="ikaw@example.com" error={errors.email} required />
            <Input label="Password" type="password" value={form.password} onChange={f('password')} placeholder="••••••••" error={errors.password} required />
          </div>

          <div style={{ display:'flex', justifyContent:'flex-end', marginBottom:22 }}>
            <button style={{ color:'var(--navy)', fontSize:14, fontFamily:"'Crimson Pro',serif" }} className="hover:underline">Forgot password?</button>
          </div>

          <button className="btn btn-primary" style={{ width:'100%', fontSize:17, padding:13 }} onClick={submit} disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In →'}
          </button>

          <p style={{ textAlign:'center', marginTop:20, fontSize:'0.95rem', color:'var(--mocha)' }}>
            No account yet?{' '}
            <button style={{ color:'var(--navy)', fontWeight:600 }} className="hover:underline" onClick={() => navigate('/register')}>Register here</button>
          </p>
          <p style={{ textAlign:'center', marginTop:10, fontSize:13 }}>
            <button style={{ color:'var(--mocha)' }} className="hover:underline" onClick={() => navigate('/')}>← Back to home</button>
          </p>
        </div>
      </div>
    </div>
  )
}