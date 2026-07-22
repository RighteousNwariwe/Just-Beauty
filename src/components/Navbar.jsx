import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { user, signOut } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const navLinks = [
    { href: '#hair', label: 'Hair' },
    { href: '#spa', label: 'Spa' },
    { href: '#laundry', label: 'Laundry' },
    { href: '#visit', label: 'Visit' },
    { href: '#contact', label: 'Contact' },
  ]

  return (
    <header className={scrolled ? 'scrolled' : ''}>
      <div className="nav-inner">
        <Link to="/" className="logo">
          Just Beauty<span>CAPE TOWN</span>
        </Link>
        <nav className={`links ${menuOpen ? 'open' : ''}`}>
          {navLinks.map((link) => (
            <a 
              key={link.href} 
              href={link.href}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </a>
          ))}
          {user ? (
            <>
              <Link to="/admin" className="auth-link" onClick={() => setMenuOpen(false)}>
                Admin Portal
              </Link>
              <button 
                onClick={handleSignOut}
                className="auth-link"
                style={{ background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}
              >
                Sign Out
              </button>
            </>
          ) : (
            <Link to="/auth" className="auth-link" onClick={() => setMenuOpen(false)}>
              Sign In
            </Link>
          )}
        </nav>
        <button 
          className={`menu-toggle ${menuOpen ? 'active' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </header>
  )
}
