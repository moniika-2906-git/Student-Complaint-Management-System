import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, TextField, Typography, Alert } from '@mui/material'
import { useAuth } from '../../context/AuthContext'
import API from '../../api/axios'

const roles = [
  { label: 'Student', icon: '🎓', value: 'student' },
  { label: 'Staff', icon: '👷', value: 'staff' },
  { label: 'Admin', icon: '🔑', value: 'admin' },
]

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [form, setForm] = useState({ email: '', password: '', role: 'student' })
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      const { data } = await API.post('/auth/login', form)
      login(data.user, data.token)
      if (data.user.role === 'admin') navigate('/admin/dashboard')
      else if (data.user.role === 'staff') navigate('/staff/dashboard')
      else navigate('/student/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed')
    }
  }

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', fontFamily: 'Roboto, sans-serif' }}>

      {/* Left Panel */}
      <Box sx={{
        width: { xs: '0%', md: '45%' },
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#1a1a2e',
        p: 5,
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box sx={{ width: 36, height: 36, bgcolor: '#534ab7', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18 }}>🛡️</Box>
          <Typography sx={{ color: '#fff', fontWeight: 500 }}>Smart Complaint System</Typography>
        </Box>

        <Box>
          <Typography sx={{ color: '#fff', fontSize: 26, fontWeight: 500, lineHeight: 1.4, mb: 1.5 }}>
            Your voice matters on campus
          </Typography>
          <Typography sx={{ color: '#888780', fontSize: 14, lineHeight: 1.7 }}>
            Submit, track, and resolve complaints efficiently. Built for students, staff, and administrators.
          </Typography>
          <Box sx={{ mt: 3, display: 'flex', flexDirection: 'column', gap: 1.5 }}>
            {['Real-time complaint tracking', 'Role-based access for students & staff', 'Email notifications on updates', 'Admin dashboard with full oversight'].map((f) => (
              <Box key={f} sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#7f77dd', flexShrink: 0 }} />
                <Typography sx={{ color: '#b4b2a9', fontSize: 13 }}>{f}</Typography>
              </Box>
            ))}
          </Box>
        </Box>

        <Typography sx={{ color: '#444441', fontSize: 12 }}>© 2026 Smart Complaint System</Typography>
      </Box>

      {/* Right Panel */}
      <Box sx={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        p: { xs: 3, md: 6 },
        bgcolor: 'background.paper',
      }}>
        <Box sx={{ maxWidth: 400, width: '100%', mx: 'auto' }}>
          <Typography variant="h5" fontWeight={500} mb={0.75}>Welcome back</Typography>
          <Typography variant="body2" color="text.secondary" mb={3}>Sign in to your account to continue</Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          {/* Role Tabs */}
          <Box sx={{ display: 'flex', gap: 1, mb: 3 }}>
            {roles.map((r) => (
              <Button key={r.value} onClick={() => setForm({ ...form, role: r.value })}
                fullWidth size="small"
                sx={{
                  border: '0.5px solid',
                  borderColor: form.role === r.value ? '#7f77dd' : '#e0e0e0',
                  bgcolor: form.role === r.value ? '#eeedfe' : 'transparent',
                  color: form.role === r.value ? '#534ab7' : 'text.secondary',
                  borderRadius: 2,
                  textTransform: 'none',
                  fontWeight: form.role === r.value ? 500 : 400,
                  py: 1,
                }}>
                {r.icon} {r.label}
              </Button>
            ))}
          </Box>

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                Email address
              </Typography>
              <TextField fullWidth size="small" type="email" placeholder="you@college.edu"
                value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                required sx={{ mt: 0.75 }} />
            </Box>

            <Box>
              <Typography variant="caption" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>
                Password
              </Typography>
              <TextField fullWidth size="small" type="password" placeholder="••••••••"
                value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })}
                required sx={{ mt: 0.75 }} />
            </Box>

            <Button type="submit" variant="contained" fullWidth
              sx={{ bgcolor: '#534ab7', '&:hover': { bgcolor: '#3c3489' }, borderRadius: 2, textTransform: 'none', py: 1.25, mt: 0.5 }}>
              Sign in →
            </Button>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, my: 2.5 }}>
            <Box sx={{ flex: 1, height: '0.5px', bgcolor: '#e0e0e0' }} />
            <Typography variant="caption" color="text.secondary">new here?</Typography>
            <Box sx={{ flex: 1, height: '0.5px', bgcolor: '#e0e0e0' }} />
          </Box>

          <Typography variant="body2" sx={{ textAlign: 'center', color: 'text.secondary' }}>
            Don't have an account?{' '}
            <Link to="/register" style={{ color: '#534ab7', fontWeight: 500, textDecoration: 'none' }}>Register now</Link>
          </Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default Login