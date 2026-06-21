import { useEffect, useState } from 'react'
import { Box, Typography, Paper, Table, TableBody, TableCell, TableHead, TableRow, Chip, Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, MenuItem, Select } from '@mui/material'
import Navbar from '../components/Layout/Navbar'
import API from '../api/axios'

const statusColors = {
  pending:    { bg: '#faeeda', color: '#854f0b' },
  inProgress: { bg: '#eeedfe', color: '#534ab7' },
  resolved:   { bg: '#eaf3de', color: '#3b6d11' },
  rejected:   { bg: '#fcebeb', color: '#a32d2d' },
}

const StaffDashboard = () => {
  const [complaints, setComplaints] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [remark, setRemark] = useState('')
  const [status, setStatus] = useState('')
  const [open, setOpen] = useState(false)

  useEffect(() => {
    API.get('/complaints/assigned')
      .then(({ data }) => {
        const list = Array.isArray(data) ? data : [
          ...(data.pending || []),
          ...(data.inProgress || []),
          ...(data.resolved || []),
        ]
        setComplaints(list)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const handleOpen = (c) => {
    setSelected(c)
    setStatus(c.status)
    setRemark('')
    setOpen(true)
  }

  const handleUpdate = async () => {
    try {
      await API.post(`/complaints/${selected._id}/staff-update`, { status, remark })
      setComplaints(complaints.map(c => c._id === selected._id ? { ...c, status } : c))
      setOpen(false)
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f8f8f8' }}>
      <Navbar />
      <Box sx={{ maxWidth: 1100, mx: 'auto', p: 4 }}>
        <Box sx={{ mb: 3 }}>
          <Typography variant="h5" fontWeight={500}>Staff Dashboard</Typography>
          <Typography variant="body2" color="text.secondary" mt={0.5}>
            Complaints assigned to you
          </Typography>
        </Box>

        {/* Stats */}
        <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 1.5, mb: 3 }}>
          {[
            { label: 'Assigned', value: complaints.length, color: '#534ab7' },
            { label: 'In Progress', value: complaints.filter(c => c.status === 'inProgress').length, color: '#ba7517' },
            { label: 'Resolved', value: complaints.filter(c => c.status === 'resolved').length, color: '#0f6e56' },
          ].map((s) => (
            <Box key={s.label} sx={{ bgcolor: '#f0f0f0', borderRadius: 2, p: 2 }}>
              <Typography variant="caption" color="text.secondary" sx={{ textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                {s.label}
              </Typography>
              <Typography variant="h4" fontWeight={500} sx={{ color: s.color, mt: 0.5 }}>{s.value}</Typography>
            </Box>
          ))}
        </Box>

        {/* Table */}
        <Paper elevation={0} sx={{ border: '0.5px solid #e0e0e0', borderRadius: 3, overflow: 'hidden' }}>
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: '#f8f8f8' }}>
                {['Title', 'Category', 'Raised By', 'Date', 'Status', 'Action'].map(h => (
                  <TableCell key={h} sx={{ fontWeight: 500, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.05em', color: 'text.secondary' }}>{h}</TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {loading ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 4, color: 'text.secondary' }}>Loading...</TableCell></TableRow>
              ) : complaints.length === 0 ? (
                <TableRow><TableCell colSpan={6} align="center" sx={{ py: 6, color: 'text.secondary' }}>No complaints assigned yet</TableCell></TableRow>
              ) : complaints.map((c) => (
                <TableRow key={c._id} sx={{ '&:hover': { bgcolor: '#fafafa' } }}>
                  <TableCell sx={{ fontWeight: 500 }}>{c.title}</TableCell>
                  <TableCell>
                    <Chip label={c.category} size="small" sx={{ bgcolor: '#eeedfe', color: '#534ab7', fontWeight: 500, fontSize: 12 }} />
                  </TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: 14 }}>{c.raisedBy?.name || 'N/A'}</TableCell>
                  <TableCell sx={{ color: 'text.secondary', fontSize: 14 }}>{new Date(c.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <Chip label={c.status} size="small"
                      sx={{ bgcolor: statusColors[c.status]?.bg || '#eeedfe', color: statusColors[c.status]?.color || '#534ab7', fontWeight: 500, fontSize: 12 }} />
                  </TableCell>
                  <TableCell>
                    <Button size="small" onClick={() => handleOpen(c)}
                      sx={{ bgcolor: '#534ab7', color: '#fff', borderRadius: 2, textTransform: 'none', fontSize: 12, '&:hover': { bgcolor: '#3c3489' } }}>
                      Update
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>

      {/* Update Dialog */}
      <Dialog open={open} onClose={() => setOpen(false)} maxWidth="sm" fullWidth>
        <DialogTitle sx={{ fontWeight: 500 }}>Update complaint</DialogTitle>
        <DialogContent sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 2 }}>
          <Typography variant="body2" color="text.secondary">{selected?.title}</Typography>
          <Select value={status} onChange={(e) => setStatus(e.target.value)} size="small" fullWidth>
            <MenuItem value="pending">Pending</MenuItem>
            <MenuItem value="inProgress">In Progress</MenuItem>
            <MenuItem value="resolved">Resolved</MenuItem>
            <MenuItem value="rejected">Rejected</MenuItem>
          </Select>
          <TextField label="Remark" multiline rows={3} value={remark}
            onChange={(e) => setRemark(e.target.value)} fullWidth size="small"
            placeholder="Add a note about the update..." />
        </DialogContent>
        <DialogActions sx={{ p: 2.5, pt: 0 }}>
          <Button onClick={() => setOpen(false)} sx={{ textTransform: 'none', color: 'text.secondary' }}>Cancel</Button>
          <Button onClick={handleUpdate} variant="contained"
            sx={{ bgcolor: '#534ab7', '&:hover': { bgcolor: '#3c3489' }, textTransform: 'none', borderRadius: 2 }}>
            Save update
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default StaffDashboard