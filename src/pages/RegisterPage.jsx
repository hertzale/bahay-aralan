import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Icon, Input, Select, AlertBanner } from '../components/ui'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name:'', email:'', password:'', role:'student' })
  const [errors, setErrors] = useState({})
  const [done, setDone] = useState(false)
  const f = (k) => (e) => setForm(v => ({ ...v, [k]: e.target.value }))

  const validate = () => {
    const e = {}
    if (!form.name.trim()) e.name = 'Name is required'
    if (!form.email || !/\S+@\S+\.\S+/.test(form.email)) e.email = 'Valid email required'
    if (!form.password || form.password.length < 6) e.password = 'Minimum 6 characters'
    return e
  }

  const submit = () => {
    const e = validate()
    if (Object.keys(e).length) { setErrors(e); return }
    setDone(true)
    setTimeout(() => navigate('/signin'), 2000)
  }

  return (
    <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', background:'var(--cream)', padding:24 }}>
      <div style={{ width:'100%', maxWidth:420 }}>
        <div className="flex items-center gap-2 mb-8">
          <div style={{ width:32, height:32, background:'var(--dark)', borderRadius:8, display:'flex', alignItems:'center', justifyContent:'center' }}>
            <Icon name="building" size={16} style={{ color:'var(--cream)' }} />
          </div>
          <span className="font-display font-bold text-lg" style={{ color:'var(--dark)' }}>Bahay-Aralan</span>
        </div>
        <h3 className="font-display font-bold" style={{ color:'var(--dark)', fontSize:'1.7rem', marginBottom:4 }}>Create Account</h3>
        <p style={{ color:'var(--mocha)', marginBottom:24 }}>Join the Bahay-Aralan community</p>
        {done && <AlertBanner type="success">Account created! Redirecting to sign in…</AlertBanner>}
        <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
          <Input label="Full Name" value={form.name} onChange={f('name')} placeholder="Juan dela Cruz" error={errors.name} required />
          <Input label="Email" type="email" value={form.email} onChange={f('email')} placeholder="ikaw@example.com" error={errors.email} required />
          <Input label="Password" type="password" value={form.password} onChange={f('password')} placeholder="••••••••" error={errors.password} required />
          <Select label="Role" value={form.role} onChange={f('role')}>
            <option value="student">Student</option>
            <option value="caretaker">Caretaker</option>
            <option value="owner">Dorm Owner</option>
          </Select>
          <button className="btn btn-primary" style={{ width:'100%', fontSize:16, padding:12 }} onClick={submit}>
            Register →
          </button>
        </div>
        <p style={{ textAlign:'center', marginTop:20, fontSize:'0.95rem', color:'var(--mocha)' }}>
          Already have an account?{' '}
          <button style={{ color:'var(--navy)', fontWeight:600 }} onClick={() => navigate('/signin')}>Sign in</button>
        </p>
      </div>
    </div>
  )
}