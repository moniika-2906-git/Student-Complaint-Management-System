import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import Navbar from '../components/Layout/Navbar'
import API from '../api/axios'

const StudentDashboard = () => {
  const navigate = useNavigate()
  const { user } = useAuth()
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    API.get('/complaints/my')
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : [
          ...(data.pending || []),
          ...(data.inProgress || []),
          ...(data.resolved || []),
        ]
        setComplaints(list)
      })
      .catch(console.error)
  }, [])

  const stats = [
    { label: 'Total submitted', value: complaints.length, color: '#534ab7' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: '#0f6e56' },
    { label: 'Pending', value: complaints.filter(c => c.status === 'pending').length, color: '#ba7517' },
  ]

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Box sx={{ maxWidth: 900, mx: 'auto', p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={500}>Good day, {user?.name}</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Here's an overview of your complaints and quick actions.
          </Typography>
        </Box>

        {/* Live Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1.5, mb: 3 }}>
          {stats.map((s) => (
            <Box key={s.label} sx={{ bgcolor: '#f0f0f0', borderRadius: 2, p: 2 }}>
              <Typography variant="caption" color="text.secondary"
                sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.label}
              </Typography>
              <Typography variant="h4" fontWeight={500} sx={{ color: s.color, mt: 0.5 }}>
                {s.value}
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Action Cards */}
        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2, mb: 3 }}>
          <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, p: 3 }}>
            <Box sx={{ width: 44, height: 44, bgcolor: '#eeedfe', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontSize: 22 }}>
              📝
            </Box>
            <Typography variant="h6" fontWeight={500} mb={0.75}>Submit a complaint</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Report an issue with infrastructure, academics, hostel, transport, or anything else on campus.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/complaints/new')}
              sx={{ bgcolor: '#534ab7', '&:hover': { bgcolor: '#3c3489' }, borderRadius: 2, textTransform: 'none' }}>
              New complaint →
            </Button>
          </Paper>

          <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, p: 3 }}>
            <Box sx={{ width: 44, height: 44, bgcolor: '#e1f5ee', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 2, fontSize: 22 }}>
              ✅
            </Box>
            <Typography variant="h6" fontWeight={500} mb={0.75}>Track my complaints</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
              Check the status of your submitted complaints and see any updates from staff.
            </Typography>
            <Button variant="contained" onClick={() => navigate('/my-complaints')}
              sx={{ bgcolor: '#0f6e56', '&:hover': { bgcolor: '#085041' }, borderRadius: 2, textTransform: 'none' }}>
              View status →
            </Button>
          </Paper>
        </Box>

        {/* Recent Complaints */}
        {complaints.length > 0 && (
          <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, p: 3 }}>
            <Typography variant="subtitle1" fontWeight={500} mb={2}>Recent complaints</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {complaints.slice(0, 3).map((c, i) => (
                <Box key={c._id} sx={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  py: 1.5, borderBottom: i < 2 ? '0.5px solid #f0f0f0' : 'none'
                }}>
                  <Box>
                    <Typography variant="body2" fontWeight={500}>{c.title}</Typography>
                    <Typography variant="caption" color="text.secondary">
                      {c.category} · {new Date(c.date).toLocaleDateString()}
                    </Typography>
                  </Box>
                  <Box sx={{
                    px: 1.5, py: 0.5, borderRadius: 99, fontSize: 12, fontWeight: 500,
                    bgcolor: c.status === 'resolved' ? '#eaf3de' : c.status === 'inProgress' ? '#eeedfe' : '#faeeda',
                    color: c.status === 'resolved' ? '#3b6d11' : c.status === 'inProgress' ? '#534ab7' : '#854f0b',
                  }}>
                    {c.status}
                  </Box>
                </Box>
              ))}
            </Box>
          </Paper>
        )}
      </Box>
    </Box>
  )
}

export default StudentDashboard