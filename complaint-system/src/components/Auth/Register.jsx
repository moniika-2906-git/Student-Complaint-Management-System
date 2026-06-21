import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Box, Button, TextField, Typography, Paper, Alert, MenuItem } from '@mui/material'
import API from '../../api/axios'


// const Register = () => {
//   const navigate = useNavigate()
//   const [form, setForm] = useState({ name: '', email: '', password: '', role: 'student', department: '' })
const Register = ({ defaultRole = 'student' }) => {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: defaultRole, department: '' })
  

  const [error, setError] = useState('')

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    try {
      await API.post('/auth/register', form)
      navigate('/login')
    } catch (err) {
      setError(err.response?.data?.message || 'Registration failed')
    }
  }

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', bgcolor: '#f5f5f5' }}>
      <Paper elevation={3} sx={{ p: 4, width: 400 }}>
        <Typography variant="h6" sx={{ textAlign: 'center', mb: 2 }}>Register</Typography>
        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField label="Full Name" name="name" value={form.name} onChange={handleChange} required fullWidth />
          <TextField label="Email" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth />
          <TextField label="Password" name="password" type="password" value={form.password} onChange={handleChange} required fullWidth />
          <TextField label="Department" name="department" value={form.department} onChange={handleChange} required fullWidth />
          <TextField select label="Role" name="role" value={form.role} onChange={handleChange} fullWidth>
            <MenuItem value="student">Student</MenuItem>
            <MenuItem value="staff">Staff</MenuItem>
          </TextField>
          <Button type="submit" variant="contained" fullWidth sx={{ mt: 1 }}>Register</Button>
          <Typography sx={{ textAlign: 'center' }} variant="body2">
            Already have an account? <Link to="/login">Login</Link>
          </Typography>
        </Box>
      </Paper>
    </Box>
  )
}

export default Register