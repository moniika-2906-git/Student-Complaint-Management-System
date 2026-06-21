import { useEffect, useState } from 'react'
import { Box, Typography, Table, TableBody, TableCell, TableHead, TableRow, Paper, Chip } from '@mui/material'
import Navbar from '../components/Layout/Navbar'
import API from '../api/axios'

const statusColor = { Pending: 'warning', 'In Progress': 'info', Resolved: 'success', Rejected: 'error' }

const TrackComplaint = () => {
  const [complaints, setComplaints] = useState([])

  useEffect(() => {
    API.get('/complaints/my').then(({ data }) => setComplaints(data)).catch(console.error)
  }, [])

  return (
    <>
      <Navbar />
      <Box p={4}>
        <Typography variant="h6" mb={2}>My Complaints</Typography>
        <Paper elevation={2}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Title</TableCell>
                <TableCell>Category</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {complaints.length === 0 ? (
                <TableRow><TableCell colSpan={4} align="center">No complaints found</TableCell></TableRow>
              ) : complaints.map((c) => (
                <TableRow key={c._id}>
                  <TableCell>{c.title}</TableCell>
                  <TableCell>{c.category}</TableCell>
                  <TableCell><Chip label={c.status} color={statusColor[c.status] || 'default'} size="small" /></TableCell>
                  <TableCell>{new Date(c.createdAt).toLocaleDateString()}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Box>
    </>
  )
}

export default TrackComplaint