import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material'
import Navbar from '../components/Layout/Navbar'
import API from '../api/axios'

const statusColors = {
  pending:    { bg: '#faeeda', color: '#854f0b' },
  inProgress: { bg: '#eeedfe', color: '#534ab7' },
  resolved:   { bg: '#eaf3de', color: '#3b6d11' },
  rejected:   { bg: '#fcebeb', color: '#a32d2d' },
}

const AdminDashboard = () => {
  const [complaints, setComplaints] = useState([])
  const [staffList, setStaffList] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [assignDialog, setAssignDialog] = useState(false)
  const [selectedComplaint, setSelectedComplaint] = useState(null)
  const [selectedStaff, setSelectedStaff] = useState('')

  useEffect(() => {
    // Load complaints
    API.get('/complaints')
      .then(({ data }) => {
        const list = [
          ...(data.pending || []),
          ...(data.inProgress || []),
          ...(data.resolved || []),
        ]
        setComplaints(list)
        setLoading(false)
      })
      .catch((err) => { setError('Failed to load complaints'); setLoading(false) })

    // Load staff list
    API.get('/auth/staff')
      .then(({ data }) => setStaffList(data))
      .catch(console.error)
  }, [])

  const handleStatusChange = async (id, status) => {
    try {
      await API.put(`/complaints/${id}/status`, { status })
      setComplaints(complaints.map(c => c._id === id ? { ...c, status } : c))
    } catch (err) { console.error(err) }
  }

  const openAssign = (complaint) => {
    setSelectedComplaint(complaint)
    setSelectedStaff('')
    setAssignDialog(true)
  }

  const handleAssign = async () => {
    try {
      await API.put(`/complaints/${selectedComplaint._id}/assign`, { staffId: selectedStaff })
      setComplaints(complaints.map(c =>
        c._id === selectedComplaint._id
          ? { ...c, assignedTo: staffList.find(s => s._id === selectedStaff) }
          : c
      ))
      setAssignDialog(false)
    } catch (err) { console.error(err) }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Box sx={{ maxWidth: 1200, mx: 'auto', p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={500}>Admin Dashboard</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>Manage all campus complaints</Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 1.5, mb: 3 }}>
          {[
            { label: 'Total', value: complaints.length, color: '#534ab7' },
            { label: 'Pending', value: complaints.filter(c => c.status === 'pending').length, color: '#ba7517' },
            { label: 'In Progress', value: complaints.filter(c => c.status === 'inProgress').length, color: '#534ab7' },
            { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: '#0f6e56' },
          ].map((s) => (
            <Box key={s.label} sx={{ bgcolor: '#f0f0f0', borderRadius: 2, p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>{s.label}</Typography>
              <Typography variant="h4" fontWeight={500} sx={{ color: s.color, mt: 0.5 }}>{s.value}</Typography>
            </Box>
          ))}
        </Box>

        {/* Table */}
        <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
          {loading ? (
            <Box sx={{ p: 4, textAlign: 'center' }}><Typography color="text.secondary">Loading...</Typography></Box>
          ) : error ? (
            <Box sx={{ p: 4, textAlign: 'center' }}><Typography color="error">{error}</Typography></Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow sx={{ bgcolor: '#f8f8f8' }}>
                  {['Title', 'Category', 'Submitted by', 'Assigned to', 'Date', 'Status', 'Actions'].map(h => (
                    <TableCell key={h} sx={{ fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>{h}</TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {complaints.length === 0 ? (
                  <TableRow><TableCell colSpan={7} align="center" sx={{ py: 6, color: 'text.secondary' }}>No complaints yet</TableCell></TableRow>
                ) : complaints.map((c) => (
                  <TableRow key={c._id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                    <TableCell sx={{ fontWeight: 500, fontSize: 14, maxWidth: 180 }}>{c.title}</TableCell>
                    <TableCell>
                      <Chip label={c.category} size="small" sx={{ bgcolor: '#eeedfe', color: '#534ab7', fontWeight: 500, fontSize: 12 }} />
                    </TableCell>
                    <TableCell sx={{ fontSize: 14, color: 'text.secondary' }}>{c.raisedBy?.name || 'N/A'}</TableCell>
                    <TableCell sx={{ fontSize: 14, color: c.assignedTo ? 'text.primary' : 'text.secondary' }}>
                      {c.assignedTo?.name || '— unassigned'}
                    </TableCell>
                    <TableCell sx={{ fontSize: 14, color: 'text.secondary' }}>{new Date(c.date).toLocaleDateString()}</TableCell>
                    <TableCell>
                      <Select value={c.status || 'pending'} size="small"
                        onChange={(e) => handleStatusChange(c._id, e.target.value)}
                        sx={{
                          fontSize: 13, fontWeight: 500,
                          color: statusColors[c.status]?.color || '#534ab7',
                          bgcolor: statusColors[c.status]?.bg || '#eeedfe',
                          borderRadius: 2,
                          '.MuiOutlinedInput-notchedOutline': { border: 'none' },
                        }}>
                        <MenuItem value="pending" sx={{ fontSize: 13 }}>Pending</MenuItem>
                        <MenuItem value="inProgress" sx={{ fontSize: 13 }}>In Progress</MenuItem>
                        <MenuItem value="resolved" sx={{ fontSize: 13 }}>Resolved</MenuItem>
                        <MenuItem value="rejected" sx={{ fontSize: 13 }}>Rejected</MenuItem>
                      </Select>
                    </TableCell>
                    <TableCell>
                      <Button size="small" onClick={() => openAssign(c)}
                        sx={{ bgcolor: '#1a1a2e', color: '#fff', borderRadius: 2, textTransform: 'none', fontSize: 12, '&:hover': { bgcolor: '#534ab7' } }}>
                        Assign →
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </Paper>
      </Box>

      {/* Assign Dialog */}
      <Dialog open={assignDialog} onClose={() => setAssignDialog(false)} maxWidth="xs" fullWidth>
        <DialogTitle sx={{ fontWeight: 500 }}>Assign complaint to staff</DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" mb={2}>{selectedComplaint?.title}</Typography>
          <Select fullWidth value={selectedStaff} onChange={(e) => setSelectedStaff(e.target.value)}
            displayEmpty size="small">
            <MenuItem value="" disabled>Select a staff member</MenuItem>
            {staffList.map(s => (
              <MenuItem key={s._id} value={s._id}>{s.name} — {s.department}</MenuItem>
            ))}
          </Select>
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setAssignDialog(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleAssign} disabled={!selectedStaff} variant="contained"
            sx={{ bgcolor: '#534ab7', '&:hover': { bgcolor: '#3c3489' }, textTransform: 'none', borderRadius: 2 }}>
            Assign
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default AdminDashboard