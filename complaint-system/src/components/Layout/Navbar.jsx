import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

const Navbar = () => {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <AppBar position="static" sx={{ bgcolor: '#1a1a2e', boxShadow: 'none' }}>
      <Toolbar>
        <Typography variant="h6" fontWeight={500} sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
          🛡️ Smart Complaint System
        </Typography>
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Typography variant="body2" sx={{ color: '#b4b2a9' }}>Hi, {user.name}</Typography>
            <Button onClick={() => { logout(); navigate('/login') }}
              sx={{ border: '0.5px solid #534ab7', color: '#afa9ec', textTransform: 'none', borderRadius: 2 }}>
              Logout
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  )
}

export default Navbar