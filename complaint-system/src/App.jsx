import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import LandingPage from './pages/LandingPage'
import Login from './components/Auth/Login'
import Register from './components/Auth/Register'
import StudentDashboard from './pages/StudentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import StaffDashboard from './pages/StaffDashboard'
import SubmitComplaint from './pages/SubmitComplaint'
import TrackComplaint from './pages/TrackComplaint'
import ProtectedRoute from './components/shared/ProtectedRoute'

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Landing page — public info page, separate from login */}
          <Route path="/" element={<LandingPage />} />

          {/* Auth */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/register/student" element={<Register defaultRole="student" />} />
          <Route path="/register/staff" element={<Register defaultRole="staff" />} />

          {/* Student routes */}
          <Route path="/student/dashboard" element={
            <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
          } />
          <Route path="/complaints/new" element={
            <ProtectedRoute role="student"><SubmitComplaint /></ProtectedRoute>
          } />
          <Route path="/my-complaints" element={
            <ProtectedRoute role="student"><TrackComplaint /></ProtectedRoute>
          } />

          {/* Staff routes */}
          <Route path="/staff/dashboard" element={
            <ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>
          } />

          {/* Admin routes */}
          <Route path="/admin/dashboard" element={
            <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
          } />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App;
// import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
// import { AuthProvider } from './context/AuthContext'
// import Login from './components/Auth/Login'
// import Register from './components/Auth/Register'
// import StudentDashboard from './pages/StudentDashboard'
// import AdminDashboard from './pages/AdminDashboard'
// import StaffDashboard from './pages/StaffDashboard'
// import SubmitComplaint from './pages/SubmitComplaint'
// import TrackComplaint from './pages/TrackComplaint'
// import ProtectedRoute from './components/shared/ProtectedRoute'

// function App() {
//   return (
//     <AuthProvider>
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Navigate to="/login" />} />

//           {/* Auth */}
//           <Route path="/login" element={<Login />} />
//           <Route path="/register" element={<Register />} />
//           <Route path="/register/student" element={<Register defaultRole="student" />} />
//           <Route path="/register/staff" element={<Register defaultRole="staff" />} />

//           {/* Student routes */}
//           <Route path="/student/dashboard" element={
//             <ProtectedRoute role="student"><StudentDashboard /></ProtectedRoute>
//           } />
//           <Route path="/complaints/new" element={
//             <ProtectedRoute role="student"><SubmitComplaint /></ProtectedRoute>
//           } />
//           <Route path="/my-complaints" element={
//             <ProtectedRoute role="student"><TrackComplaint /></ProtectedRoute>
//           } />

//           {/* Staff routes */}
//           <Route path="/staff/dashboard" element={
//             <ProtectedRoute role="staff"><StaffDashboard /></ProtectedRoute>
//           } />

//           {/* Admin routes */}
//           <Route path="/admin/dashboard" element={
//             <ProtectedRoute role="admin"><AdminDashboard /></ProtectedRoute>
//           } />

//           {/* Fallback */}
//           <Route path="*" element={<Navigate to="/login" />} />
//         </Routes>
//       </BrowserRouter>
//     </AuthProvider>
//   )
// }

// export default App
// import Button from '@mui/material/Button';
// function App() {
//   let handleClick = () => {
//     console.log("button was clicked");
//   };
//   return (
//     <>
//     <h1> Material UI Demo </h1>
//     <Button variant="contained" onClick={handleClick}>Contained</Button>
    
//     </>
//   );
// }
// export default App;