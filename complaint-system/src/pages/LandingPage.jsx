import { useNavigate } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { Box, Typography, Button } from '@mui/material'

/* ---------- Scroll-reveal hook ---------- */
function useReveal() {
  const ref = useRef(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.unobserve(node) } },
      { threshold: 0.15 }
    )
    obs.observe(node)
    return () => obs.disconnect()
  }, [])
  return [ref, visible]
}

const Reveal = ({ children, delay = 0, sx = {} }) => {
  const [ref, visible] = useReveal()
  return (
    <Box ref={ref} sx={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'translateY(0)' : 'translateY(28px)',
      transition: `opacity 0.7s cubic-bezier(.21,.91,.4,1) ${delay}s, transform 0.7s cubic-bezier(.21,.91,.4,1) ${delay}s`,
      ...sx,
    }}>
      {children}
    </Box>
  )
}

/* ---------- Animated hero ticket — the signature element ---------- */
const stages = [
  { key: 'pending', label: 'Pending', bg: '#faeeda', color: '#854f0b', bar: 18 },
  { key: 'in-progress', label: 'In Progress', bg: '#eeedfe', color: '#534ab7', bar: 62 },
  { key: 'resolved', label: 'Resolved', bg: '#eaf3de', color: '#3b6d11', bar: 100 },
]

const LiveTicket = () => {
  const [stage, setStage] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setStage((s) => (s + 1) % stages.length), 2400)
    return () => clearInterval(id)
  }, [])
  const s = stages[stage]
  return (
    <Box sx={{
      bgcolor: '#fff', border: '1px solid #ece9f9', borderRadius: 4, p: 3, width: '100%', maxWidth: 380,
      boxShadow: '0 24px 48px -16px rgba(83,74,183,0.18)',
    }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography sx={{ fontFamily: 'monospace', fontSize: 12, color: '#9a9aae', letterSpacing: '0.04em' }}>
          #CMP-2026-0481
        </Typography>
        <Box sx={{
          px: 1.4, py: 0.45, borderRadius: 99, fontSize: 12, fontWeight: 600,
          bgcolor: s.bg, color: s.color, transition: 'background-color 0.5s, color 0.5s',
        }}>
          {s.label}
        </Box>
      </Box>
      <Typography sx={{ fontWeight: 600, fontSize: 16, mb: 0.5 }}>Leaking pipe — Block C washroom</Typography>
      <Typography sx={{ fontSize: 13, color: '#7a7a8e', mb: 2.5 }}>Hostel · Reported by a student</Typography>
      <Box sx={{ height: 6, bgcolor: '#f0f0f5', borderRadius: 99, overflow: 'hidden', mb: 1 }}>
        <Box sx={{
          height: '100%', borderRadius: 99, bgcolor: s.color, width: `${s.bar}%`,
          transition: 'width 0.7s cubic-bezier(.21,.91,.4,1), background-color 0.5s',
        }} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        {stages.map((st, i) => (
          <Typography key={st.key} sx={{
            fontSize: 11, fontWeight: i === stage ? 600 : 400,
            color: i <= stage ? '#1a1a2e' : '#c4c4d2', transition: 'color 0.4s',
          }}>
            {st.label}
          </Typography>
        ))}
      </Box>
    </Box>
  )
}

/* ---------- Page content ---------- */
const roles = [
  { icon: '🎓', title: 'Student', desc: 'Report an issue, attach a photo, and watch it move toward resolution.' },
  { icon: '🛠️', title: 'Staff', desc: 'Work the queue assigned to you and log progress as it happens.' },
  { icon: '🧭', title: 'Administrator', desc: 'See everything, assign the right person, and track how the system performs.' },
]

const steps = [
  { n: '01', title: 'Submit', desc: 'A student reports an issue with a photo and an urgency level.' },
  { n: '02', title: 'Assign', desc: 'An admin routes it to the right staff member.' },
  { n: '03', title: 'Resolve', desc: 'Staff logs progress and closes it out — the student is notified instantly.' },
  { n: '04', title: 'Review', desc: 'A 5-star rating closes the loop and builds a record over time.' },
]

const features = [
  { icon: '🔐', title: 'Role-based access', desc: 'Separate, secure logins for students, staff, and admins.' },
  { icon: '📎', title: 'Photo evidence', desc: 'Attach images on submission and on every resolution update.' },
  { icon: '⏱️', title: 'Urgency levels', desc: 'Flag how urgent an issue is so it gets the right attention.' },
  { icon: '📊', title: 'Live analytics', desc: 'Real-time stats on volume, resolution time, and staff performance.' },
  { icon: '⭐', title: '5-star feedback', desc: 'Students rate and comment on how their issue was handled.' },
  { icon: '📧', title: 'Email alerts', desc: 'Automatic notification the moment a complaint is resolved.' },
]

const faqs = [
  { q: 'Who can submit a complaint?', a: 'Any registered student can submit a complaint about hostel, academics, transport, infrastructure, or any other campus issue.' },
  { q: 'How do I know who is handling my complaint?', a: 'Once an admin assigns your complaint to a staff member, the status updates to "In Progress" and you can track every update on the complaint detail page.' },
  { q: 'Can I add a photo to my complaint?', a: 'Yes — you can attach an image when submitting, and staff can attach photos to their progress updates too.' },
  { q: 'What happens after my complaint is resolved?', a: 'You will get an email notification, and you can rate the resolution with a 5-star rating and an optional comment.' },
]

const FaqItem = ({ q, a }) => {
  const [open, setOpen] = useState(false)
  return (
    <Box sx={{ borderBottom: '0.5px solid #e8e8ee', py: 2.25 }}>
      <Box onClick={() => setOpen(!open)} sx={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer',
      }}>
        <Typography sx={{ fontSize: 15.5, fontWeight: 500 }}>{q}</Typography>
        <Typography sx={{
          fontSize: 20, color: '#534ab7', transform: open ? 'rotate(45deg)' : 'rotate(0deg)',
          transition: 'transform 0.25s',
        }}>
          +
        </Typography>
      </Box>
      <Box sx={{
        maxHeight: open ? 200 : 0, overflow: 'hidden', transition: 'max-height 0.35s ease',
      }}>
        <Typography sx={{ fontSize: 14, color: '#6a6a7e', lineHeight: 1.6, pt: 1.5, pr: 4 }}>{a}</Typography>
      </Box>
    </Box>
  )
}

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Roles', href: '#roles' },
  { label: 'How it works', href: '#how' },
  { label: 'Features', href: '#features' },
  { label: 'FAQs', href: '#faqs' },
]

const LandingPage = () => {
  const navigate = useNavigate()

  const scrollTo = (href) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <Box sx={{ bgcolor: '#fafaf8', color: '#1a1a2e', overflowX: 'hidden' }}>
      {/* Nav */}
      <Box sx={{
        position: 'sticky', top: 0, zIndex: 10, bgcolor: 'rgba(250,250,248,0.85)',
        backdropFilter: 'blur(10px)', borderBottom: '0.5px solid #e8e8ee',
      }}>
        <Box sx={{
          maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: 1.75,
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
            <Box sx={{
              width: 32, height: 32, borderRadius: '9px', bgcolor: '#534ab7',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              color: '#fff', fontWeight: 700, fontSize: 15,
            }}>
              S
            </Box>
            <Typography sx={{ fontWeight: 600, fontSize: 15.5 }}>Smart Complaint System</Typography>
          </Box>

          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3.5 }}>
            {navLinks.map((l) => (
              <Typography key={l.href} onClick={() => scrollTo(l.href)}
                sx={{
                  fontSize: 14, color: '#5a5a6e', cursor: 'pointer', fontWeight: 500,
                  '&:hover': { color: '#534ab7' }, transition: 'color 0.15s',
                }}>
                {l.label}
              </Typography>
            ))}
          </Box>

          <Button onClick={() => navigate('/login')} variant="contained"
            sx={{
              bgcolor: '#1a1a2e', color: '#fff', borderRadius: 2, textTransform: 'none',
              px: 2.5, py: 0.8, fontSize: 14, fontWeight: 500,
              '&:hover': { bgcolor: '#534ab7' },
            }}>
            Log in
          </Button>
        </Box>
      </Box>

      {/* Hero */}
      <Box id="about" sx={{
        maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, pt: { xs: 7, md: 10 }, pb: { xs: 7, md: 9 },
        display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1.15fr 1fr' }, gap: { xs: 6, md: 4 },
        alignItems: 'center',
      }}>
        <Box>
          <Box sx={{
            display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.6,
            bgcolor: '#eeedfe', color: '#534ab7', borderRadius: 99, fontSize: 12.5, fontWeight: 600,
            mb: 3, letterSpacing: '0.02em',
          }}>
            Built for campus complaint resolution
          </Box>
          <Typography sx={{
            fontSize: { xs: 36, md: 52 }, fontWeight: 700, lineHeight: 1.08, letterSpacing: '-0.025em', mb: 2.5,
          }}>
            Every complaint,<br />tracked to resolution.
          </Typography>
          <Typography sx={{ fontSize: 17, color: '#5a5a6e', lineHeight: 1.6, mb: 4, maxWidth: 480 }}>
            One system for students to report campus issues, for staff to resolve them,
            and for administrators to keep the whole process accountable — in real time.
          </Typography>
          <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
            <Button onClick={() => navigate('/login')} variant="contained" size="large"
              sx={{
                bgcolor: '#534ab7', borderRadius: 2, textTransform: 'none', px: 3.5, py: 1.3, fontSize: 15.5,
                '&:hover': { bgcolor: '#3c3489', transform: 'translateY(-1px)' },
                transition: 'transform 0.15s, background-color 0.15s',
              }}>
              Log in →
            </Button>
            <Button onClick={() => navigate('/register/student')} variant="outlined" size="large"
              sx={{
                borderRadius: 2, textTransform: 'none', px: 3.5, py: 1.3, fontSize: 15.5,
                borderColor: '#d8d8e8', color: '#1a1a2e', '&:hover': { borderColor: '#534ab7', bgcolor: '#fff' },
              }}>
              Register as student
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <LiveTicket />
        </Box>
      </Box>

      {/* Roles */}
      <Box id="roles" sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 7, md: 9 } }}>
        <Reveal>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
            Built for three roles
          </Typography>
          <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 700, mb: 5, letterSpacing: '-0.01em' }}>
            One system, the right view for everyone.
          </Typography>
        </Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
          {roles.map((r, i) => (
            <Reveal key={r.title} delay={i * 0.1}>
              <Box sx={{
                border: '1px solid #ece9f9', borderRadius: 4, p: 3.5, bgcolor: '#fff', height: '100%',
                transition: 'transform 0.2s, box-shadow 0.2s',
                '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 16px 32px -12px rgba(83,74,183,0.16)' },
              }}>
                <Box sx={{
                  width: 46, height: 46, borderRadius: 2.5, bgcolor: '#f3f2fc',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, mb: 2.25,
                }}>
                  {r.icon}
                </Box>
                <Typography sx={{ fontSize: 17, fontWeight: 600, mb: 1 }}>{r.title}</Typography>
                <Typography sx={{ fontSize: 14, color: '#6a6a7e', lineHeight: 1.6 }}>{r.desc}</Typography>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>

      {/* How it works */}
      <Box id="how" sx={{ bgcolor: '#1a1a2e', color: '#fff' }}>
        <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 8, md: 10 } }}>
          <Reveal>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#a89ee0', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
              How it works
            </Typography>
            <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 700, mb: 6, letterSpacing: '-0.01em' }}>
              From report to resolution, in four steps.
            </Typography>
          </Reveal>
          <Box sx={{ position: 'relative' }}>
            <Box sx={{
              position: 'absolute', top: 22, left: 0, right: 0, height: 1, bgcolor: '#36365280',
              display: { xs: 'none', md: 'block' },
            }} />
            <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: { xs: 4, md: 2 } }}>
              {steps.map((s, i) => (
                <Reveal key={s.n} delay={i * 0.12}>
                  <Box>
                    <Box sx={{
                      width: 44, height: 44, borderRadius: '50%', bgcolor: '#534ab7',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontFamily: 'monospace', fontSize: 14, fontWeight: 600, mb: 2.5, position: 'relative', zIndex: 1,
                    }}>
                      {s.n}
                    </Box>
                    <Typography sx={{ fontSize: 16.5, fontWeight: 600, mb: 0.75 }}>{s.title}</Typography>
                    <Typography sx={{ fontSize: 13.5, color: '#b8b8c8', lineHeight: 1.55 }}>{s.desc}</Typography>
                  </Box>
                </Reveal>
              ))}
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Features */}
      <Box id="features" sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 8, md: 10 } }}>
        <Reveal>
          <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
            What's included
          </Typography>
          <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 700, mb: 6, letterSpacing: '-0.01em' }}>
            Everything a complaint needs to get resolved.
          </Typography>
        </Reveal>
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <Box sx={{
                display: 'flex', gap: 1.75, alignItems: 'flex-start', p: 2.5, borderRadius: 3,
                transition: 'background-color 0.2s', '&:hover': { bgcolor: '#fff' },
              }}>
                <Box sx={{ fontSize: 20, lineHeight: 1, mt: 0.25 }}>{f.icon}</Box>
                <Box>
                  <Typography sx={{ fontSize: 14.5, fontWeight: 600, mb: 0.4 }}>{f.title}</Typography>
                  <Typography sx={{ fontSize: 13.5, color: '#6a6a7e', lineHeight: 1.5 }}>{f.desc}</Typography>
                </Box>
              </Box>
            </Reveal>
          ))}
        </Box>
      </Box>

      {/* FAQ */}
      <Box id="faqs" sx={{ bgcolor: '#fff', borderTop: '0.5px solid #e8e8ee' }}>
        <Box sx={{ maxWidth: 760, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 8, md: 10 } }}>
          <Reveal>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
              FAQs
            </Typography>
            <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 700, mb: 4, letterSpacing: '-0.01em' }}>
              Common questions.
            </Typography>
          </Reveal>
          <Reveal delay={0.1}>
            <Box>
              {faqs.map((f) => <FaqItem key={f.q} {...f} />)}
            </Box>
          </Reveal>
        </Box>
      </Box>

      {/* CTA */}
      <Box sx={{ bgcolor: '#eeedfe' }}>
        <Box sx={{
          maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 8, md: 9 },
          display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' },
          justifyContent: 'space-between', gap: 3, textAlign: { xs: 'center', md: 'left' },
        }}>
          <Box>
            <Typography sx={{ fontSize: { xs: 22, md: 27 }, fontWeight: 700, mb: 1 }}>
              Have an issue to report?
            </Typography>
            <Typography sx={{ fontSize: 14.5, color: '#5a5a6e' }}>
              Sign in and submit it in under a minute.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 1.5, justifyContent: 'center', flexShrink: 0 }}>
            <Button onClick={() => navigate('/register/student')} variant="contained"
              sx={{
                bgcolor: '#534ab7', borderRadius: 2, textTransform: 'none', px: 3, py: 1.2, fontSize: 14.5,
                '&:hover': { bgcolor: '#3c3489' },
              }}>
              Register as student
            </Button>
            <Button onClick={() => navigate('/login')} variant="outlined"
              sx={{
                borderRadius: 2, textTransform: 'none', px: 3, py: 1.2, fontSize: 14.5,
                borderColor: '#534ab7', color: '#534ab7', '&:hover': { bgcolor: '#fff' },
              }}>
              Log in
            </Button>
          </Box>
        </Box>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 3 }}>
        <Box sx={{
          maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 },
          display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
        }}>
          <Typography sx={{ fontSize: 13, color: '#9a9aae' }}>Smart Student Complaint Management System</Typography>
          <Typography sx={{ fontSize: 13, color: '#9a9aae' }}>Built for students, staff, and administrators</Typography>
        </Box>
      </Box>
    </Box>
  )
}

export default LandingPage
// import { useNavigate } from 'react-router-dom'
// import { Box, Typography, Button, Paper } from '@mui/material'

// const roles = [
//   {
//     icon: '🎓',
//     title: 'Student',
//     desc: 'Submit complaints with photos, track their status in real time, and rate how they were resolved.',
//     bullets: ['Submit complaints with evidence photos', 'Track status: pending → in progress → resolved', 'Rate and review the resolution'],
//   },
//   {
//     icon: '🛠️',
//     title: 'Staff',
//     desc: 'Work the complaints assigned to you, log progress with photos and notes, and mark issues resolved.',
//     bullets: ['See only what\u2019s assigned to you', 'Add progress photos and remarks', 'Update status as work happens'],
//   },
//   {
//     icon: '🧭',
//     title: 'Administrator',
//     desc: 'See every complaint across campus, assign it to the right staff member, and monitor resolution performance.',
//     bullets: ['Full visibility across all departments', 'Assign complaints to available staff', 'Track stats and response times'],
//   },
// ]

// const steps = [
//   { n: '1', title: 'Submit', desc: 'A student reports an issue — what it is, where, how urgent — with an optional photo.' },
//   { n: '2', title: 'Assign', desc: 'An admin reviews it and assigns it to the right staff member for that department.' },
//   { n: '3', title: 'Resolve', desc: 'Staff works the issue, logs progress, and marks it resolved. The student gets notified by email.' },
//   { n: '4', title: 'Review', desc: 'The student rates the resolution — closing the loop and building a record of staff performance.' },
// ]

// const LandingPage = () => {
//   const navigate = useNavigate()

//   return (
//     <Box sx={{ bgcolor: '#fff', color: '#1a1a2e' }}>
//       {/* Nav */}
//       <Box sx={{
//         position: 'sticky', top: 0, zIndex: 10, bgcolor: 'rgba(255,255,255,0.92)',
//         backdropFilter: 'blur(8px)', borderBottom: '0.5px solid #e8e8e8',
//       }}>
//         <Box sx={{
//           maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: 1.75,
//           display: 'flex', alignItems: 'center', justifyContent: 'space-between',
//         }}>
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
//             <Box sx={{
//               width: 32, height: 32, borderRadius: '8px', bgcolor: '#534ab7',
//               display: 'flex', alignItems: 'center', justifyContent: 'center',
//               color: '#fff', fontWeight: 700, fontSize: 15,
//             }}>
//               S
//             </Box>
//             <Typography sx={{ fontWeight: 600, fontSize: 15.5 }}>
//               Smart Complaint System
//             </Typography>
//           </Box>
//           <Button onClick={() => navigate('/login')} variant="contained"
//             sx={{
//               bgcolor: '#1a1a2e', color: '#fff', borderRadius: 2, textTransform: 'none',
//               px: 2.75, py: 0.85, fontSize: 14, fontWeight: 500,
//               '&:hover': { bgcolor: '#534ab7' },
//             }}>
//             Log in
//           </Button>
//         </Box>
//       </Box>

//       {/* Hero */}
//       <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, pt: { xs: 7, md: 11 }, pb: { xs: 6, md: 9 } }}>
//         <Box sx={{ maxWidth: 700 }}>
//           <Box sx={{
//             display: 'inline-flex', alignItems: 'center', gap: 0.75, px: 1.5, py: 0.6,
//             bgcolor: '#eeedfe', color: '#534ab7', borderRadius: 99, fontSize: 12.5, fontWeight: 600,
//             mb: 3, letterSpacing: '0.02em',
//           }}>
//             Campus complaint resolution, end to end
//           </Box>
//           <Typography sx={{
//             fontSize: { xs: 34, md: 48 }, fontWeight: 600, lineHeight: 1.12, letterSpacing: '-0.02em', mb: 2.5,
//           }}>
//             Every campus issue, tracked from report to resolution.
//           </Typography>
//           <Typography sx={{ fontSize: 17, color: '#5a5a6e', lineHeight: 1.6, mb: 4.5, maxWidth: 560 }}>
//             The Smart Student Complaint Management System gives students a clear way to report problems —
//             hostel, academics, transport, infrastructure — and gives staff and administrators the tools to
//             assign, resolve, and follow up on every single one.
//           </Typography>
//           <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
//             <Button onClick={() => navigate('/login')} variant="contained" size="large"
//               sx={{
//                 bgcolor: '#534ab7', borderRadius: 2, textTransform: 'none', px: 3.5, py: 1.3, fontSize: 15.5,
//                 '&:hover': { bgcolor: '#3c3489' },
//               }}>
//               Log in to your account →
//             </Button>
//             <Button onClick={() => navigate('/register')} variant="outlined" size="large"
//               sx={{
//                 borderRadius: 2, textTransform: 'none', px: 3.5, py: 1.3, fontSize: 15.5,
//                 borderColor: '#d8d8e8', color: '#1a1a2e', '&:hover': { borderColor: '#534ab7', bgcolor: '#fafaff' },
//               }}>
//               Create an account
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* Status strip — explains the workflow visually */}
//       <Box sx={{ borderTop: '0.5px solid #eee', borderBottom: '0.5px solid #eee', bgcolor: '#fafafa' }}>
//         <Box sx={{
//           maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: 3,
//           display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 }, flexWrap: 'wrap',
//         }}>
//           {[
//             { label: 'Pending', bg: '#faeeda', color: '#854f0b' },
//             { label: 'In Progress', bg: '#eeedfe', color: '#534ab7' },
//             { label: 'Resolved', bg: '#eaf3de', color: '#3b6d11' },
//           ].map((s, i) => (
//             <Box key={s.label} sx={{ display: 'flex', alignItems: 'center', gap: { xs: 2, md: 3 } }}>
//               <Box sx={{
//                 px: 1.75, py: 0.65, borderRadius: 99, fontSize: 13, fontWeight: 600,
//                 bgcolor: s.bg, color: s.color,
//               }}>
//                 {s.label}
//               </Box>
//               {i < 2 && <Typography sx={{ color: '#bbb', fontSize: 18 }}>→</Typography>}
//             </Box>
//           ))}
//           <Typography sx={{ fontSize: 14, color: '#7a7a8e', ml: { md: 1 } }}>
//             Every complaint moves through the same three stages — visible to everyone involved.
//           </Typography>
//         </Box>
//       </Box>

//       {/* Roles */}
//       <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 7, md: 10 } }}>
//         <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
//           Built for three roles
//         </Typography>
//         <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 600, mb: 5, letterSpacing: '-0.01em' }}>
//           One system, the right view for everyone.
//         </Typography>
//         <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' }, gap: 2.5 }}>
//           {roles.map((r) => (
//             <Paper key={r.title} elevation={0} sx={{
//               border: '0.5px solid #e0e0e0', borderRadius: 3, p: 3.5,
//               transition: 'border-color 0.15s', '&:hover': { borderColor: '#a89ee0' },
//             }}>
//               <Box sx={{
//                 width: 46, height: 46, borderRadius: 2, bgcolor: '#f3f2fc',
//                 display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22, mb: 2.25,
//               }}>
//                 {r.icon}
//               </Box>
//               <Typography sx={{ fontSize: 17, fontWeight: 600, mb: 1 }}>{r.title}</Typography>
//               <Typography sx={{ fontSize: 14, color: '#6a6a7e', lineHeight: 1.6, mb: 2.25 }}>{r.desc}</Typography>
//               <Box component="ul" sx={{ m: 0, pl: 2.25, display: 'flex', flexDirection: 'column', gap: 0.85 }}>
//                 {r.bullets.map((b) => (
//                   <Typography key={b} component="li" sx={{ fontSize: 13.5, color: '#4a4a5e', lineHeight: 1.5 }}>
//                     {b}
//                   </Typography>
//                 ))}
//               </Box>
//             </Paper>
//           ))}
//         </Box>
//       </Box>

//       {/* How it works */}
//       <Box sx={{ bgcolor: '#fafafa', borderTop: '0.5px solid #eee', borderBottom: '0.5px solid #eee' }}>
//         <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 7, md: 10 } }}>
//           <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
//             How it works
//           </Typography>
//           <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 600, mb: 5, letterSpacing: '-0.01em' }}>
//             From report to resolution, in four steps.
//           </Typography>
//           <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: 'repeat(4, 1fr)' }, gap: 2 }}>
//             {steps.map((s) => (
//               <Box key={s.n}>
//                 <Typography sx={{ fontSize: 28, fontWeight: 700, color: '#d8d4f5', mb: 1, lineHeight: 1 }}>
//                   {s.n}
//                 </Typography>
//                 <Typography sx={{ fontSize: 15.5, fontWeight: 600, mb: 0.75 }}>{s.title}</Typography>
//                 <Typography sx={{ fontSize: 13.5, color: '#6a6a7e', lineHeight: 1.55 }}>{s.desc}</Typography>
//               </Box>
//             ))}
//           </Box>
//         </Box>
//       </Box>

//       {/* Feature grid */}
//       <Box sx={{ maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 7, md: 10 } }}>
//         <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#534ab7', textTransform: 'uppercase', letterSpacing: '0.08em', mb: 1.5 }}>
//           What's included
//         </Typography>
//         <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 600, mb: 5, letterSpacing: '-0.01em' }}>
//           Everything a complaint needs to get resolved.
//         </Typography>
//         <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: 'repeat(3, 1fr)' }, gap: 2 }}>
//           {[
//             { icon: '🔐', title: 'Role-based access', desc: 'Separate, secure logins for students, staff, and admins.' },
//             { icon: '📎', title: 'Photo evidence', desc: 'Attach images when submitting or resolving a complaint.' },
//             { icon: '⏱️', title: 'Urgency levels', desc: 'Flag how urgent an issue is so it gets the right attention.' },
//             { icon: '📊', title: 'Live analytics', desc: 'Admins see real-time stats on volume and resolution time.' },
//             { icon: '⭐', title: '5-star feedback', desc: 'Students rate and comment on how their issue was handled.' },
//             { icon: '📧', title: 'Email alerts', desc: 'Automatic notifications the moment a complaint is resolved.' },
//           ].map((f) => (
//             <Box key={f.title} sx={{ display: 'flex', gap: 1.75, alignItems: 'flex-start' }}>
//               <Box sx={{ fontSize: 19, lineHeight: 1, mt: 0.25 }}>{f.icon}</Box>
//               <Box>
//                 <Typography sx={{ fontSize: 14.5, fontWeight: 600, mb: 0.4 }}>{f.title}</Typography>
//                 <Typography sx={{ fontSize: 13.5, color: '#6a6a7e', lineHeight: 1.5 }}>{f.desc}</Typography>
//               </Box>
//             </Box>
//           ))}
//         </Box>
//       </Box>

//       {/* CTA */}
//       <Box sx={{ bgcolor: '#1a1a2e', color: '#fff' }}>
//         <Box sx={{
//           maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 }, py: { xs: 7, md: 9 },
//           display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: { md: 'center' },
//           justifyContent: 'space-between', gap: 3,
//         }}>
//           <Box>
//             <Typography sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 600, mb: 1 }}>
//               Have an issue to report?
//             </Typography>
//             <Typography sx={{ fontSize: 14.5, color: '#b8b8c8' }}>
//               Sign in and submit it in under a minute.
//             </Typography>
//           </Box>
//           <Box sx={{ display: 'flex', gap: 1.5, flexShrink: 0 }}>
//             <Button onClick={() => navigate('/register/student')} variant="contained"
//               sx={{
//                 bgcolor: '#534ab7', borderRadius: 2, textTransform: 'none', px: 3, py: 1.2, fontSize: 14.5,
//                 '&:hover': { bgcolor: '#6c62d6' },
//               }}>
//               Register as student
//             </Button>
//             <Button onClick={() => navigate('/login')} variant="outlined"
//               sx={{
//                 borderRadius: 2, textTransform: 'none', px: 3, py: 1.2, fontSize: 14.5,
//                 borderColor: '#44445a', color: '#fff', '&:hover': { borderColor: '#fff' },
//               }}>
//               Log in
//             </Button>
//           </Box>
//         </Box>
//       </Box>

//       {/* Footer */}
//       <Box sx={{ borderTop: '0.5px solid #eee', py: 3 }}>
//         <Box sx={{
//           maxWidth: 1180, mx: 'auto', px: { xs: 3, md: 4 },
//           display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 1,
//         }}>
//           <Typography sx={{ fontSize: 13, color: '#9a9aae' }}>
//             Smart Student Complaint Management System
//           </Typography>
//           <Typography sx={{ fontSize: 13, color: '#9a9aae' }}>
//             Built for students, staff, and administrators
//           </Typography>
//         </Box>
//       </Box>
//     </Box>
//   )
// }

// export default LandingPage