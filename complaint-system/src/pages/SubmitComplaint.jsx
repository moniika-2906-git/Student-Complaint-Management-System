import { useState } from 'react'
import { Box, Typography, Paper, TextField, Button, Alert } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import Navbar from '../components/Layout/Navbar'
import API from '../api/axios'

const categories = [
  { label: 'Infrastructure', icon: '🏗️' },
  { label: 'Academics', icon: '📚' },
  { label: 'Hostel', icon: '🏠' },
  { label: 'Transport', icon: '🚌' },
  { label: 'Other', icon: '•••' },
]

const SubmitComplaint = () => {
  const navigate = useNavigate()
  const [form, setForm] = useState({ title: '', category: 'Infrastructure', description: '' })
  const [success, setSuccess] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(''); setSuccess('')
    try {
      await API.post('/complaints', form)
      setSuccess('Complaint submitted successfully!')
      setForm({ title: '', category: 'Infrastructure', description: '' })
    } catch (err) {
      setError(err.response?.data?.message || 'Submission failed')
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Box sx={{ maxWidth: 680, mx: 'auto', p: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button onClick={() => navigate('/student/dashboard')} variant="outlined" size="small"
            sx={{ borderRadius: 2, textTransform: 'none', color: 'text.secondary', borderColor: '#e0e0e0' }}>
            ← Back
          </Button>
          <Typography variant="h5" fontWeight={500}>Submit a complaint</Typography>
        </Box>

        <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, p: 3 }}>
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Title
              </Typography>
              <TextField fullWidth size="small" placeholder="Brief description of the issue"
                value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
                required sx={{ mt: 0.75 }} />
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Category
              </Typography>
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mt: 0.75 }}>
                {categories.map((cat) => (
                  <Button key={cat.label} onClick={() => setForm({ ...form, category: cat.label })}
                    variant="outlined" size="small"
                    sx={{
                      borderRadius: 2, textTransform: 'none', gap: 0.5,
                      borderColor: form.category === cat.label ? '#7f77dd' : '#e0e0e0',
                      bgcolor: form.category === cat.label ? '#eeedfe' : 'transparent',
                      color: form.category === cat.label ? '#534ab7' : 'text.secondary',
                    }}>
                    {cat.icon} {cat.label}
                  </Button>
                ))}
              </Box>
            </Box>

            <Box>
              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                Description
              </Typography>
              <TextField fullWidth multiline rows={5} placeholder="Describe the issue in detail — when it happened, where it is, and how it's affecting you..."
                value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })}
                required sx={{ mt: 0.75 }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1.5, pt: 1.5, borderTop: '0.5px solid #e0e0e0' }}>
              <Button onClick={() => navigate('/student/dashboard')} variant="outlined"
                sx={{ borderRadius: 2, textTransform: 'none', borderColor: '#e0e0e0', color: 'text.secondary' }}>
                Cancel
              </Button>
              <Button type="submit" variant="contained"
                sx={{ bgcolor: '#534ab7', '&:hover': { bgcolor: '#3c3489' }, borderRadius: 2, textTransform: 'none' }}>
                Submit complaint →
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Box>
  )
}

export default SubmitComplaint