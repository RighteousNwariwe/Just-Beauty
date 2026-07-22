import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import { ref, onValue, update, remove } from 'firebase/database'
import { db } from '../firebase'
import './Admin.css'

export default function Admin() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [allRequests, setAllRequests] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    completed: 0,
    week: 0
  })

  useEffect(() => {
    const submissionsRef = ref(db, 'contact_submissions')
    
    const unsubscribe = onValue(submissionsRef, (snapshot) => {
      const data = snapshot.val()
      const requests = []
      
      if (data) {
        Object.keys(data).forEach(key => {
          requests.push({
            id: key,
            ...data[key]
          })
        })
        
        // Sort by date (newest first)
        requests.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
      }
      
      setAllRequests(requests)
      updateStats(requests)
    })

    return () => unsubscribe()
  }, [])

  const updateStats = (requests) => {
    const total = requests.length
    const pending = requests.filter(r => r.status === 'pending').length
    const completed = requests.filter(r => r.status === 'completed').length
    
    // Calculate this week's requests
    const oneWeekAgo = new Date()
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7)
    const week = requests.filter(r => new Date(r.timestamp) >= oneWeekAgo).length
    
    setStats({ total, pending, completed, week })
  }

  const updateStatus = async (requestId, newStatus) => {
    try {
      const requestRef = ref(db, `contact_submissions/${requestId}`)
      await update(requestRef, { status: newStatus })
    } catch (error) {
      console.error('Update error:', error)
      alert('Failed to update status. Please try again.')
    }
  }

  const deleteRequest = async (requestId) => {
    if (!confirm('Are you sure you want to delete this request?')) return
    
    try {
      const requestRef = ref(db, `contact_submissions/${requestId}`)
      await remove(requestRef)
    } catch (error) {
      console.error('Delete error:', error)
      alert('Failed to delete request. Please try again.')
    }
  }

  const handleSignOut = async () => {
    try {
      await signOut()
      navigate('/')
    } catch (error) {
      console.error('Sign out error:', error)
    }
  }

  const filteredRequests = currentFilter === 'all' 
    ? allRequests 
    : allRequests.filter(r => r.status === currentFilter)

  const formatDate = (timestamp) => {
    const date = new Date(timestamp)
    return date.toLocaleDateString('en-ZA', { 
      day: '2-digit', 
      month: 'short', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const capitalizeFirst = (str) => str.charAt(0).toUpperCase() + str.slice(1)

  return (
    <div className="admin-dashboard">
      <header>
        <div className="nav-inner">
          <a href="/" className="logo">Just Beauty<span>ADMIN</span></a>
          <div className="header-actions">
            <div className="user-info">
              <div className="user-avatar">
                {user?.displayName ? user.displayName.charAt(0).toUpperCase() : 'A'}
              </div>
              <span>{user?.displayName || 'Admin'}</span>
            </div>
            <button className="btn btn-outline" onClick={handleSignOut}>Sign Out</button>
          </div>
        </div>
      </header>

      <div className="wrap">
        <div className="dashboard-header">
          <h1>Dashboard</h1>
          <button className="btn btn-solid" onClick={() => navigate('/')}>
            <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14"/>
              <path d="M13 6l6 6-6 6"/>
            </svg>
            Back to Site
          </button>
        </div>

        <div className="stats-grid">
          <div className="stat-card">
            <div className="label">Total Requests</div>
            <div className="value">{stats.total}</div>
          </div>
          <div className="stat-card pending">
            <div className="label">Pending</div>
            <div className="value">{stats.pending}</div>
          </div>
          <div className="stat-card completed">
            <div className="label">Completed</div>
            <div className="value">{stats.completed}</div>
          </div>
          <div className="stat-card">
            <div className="label">This Week</div>
            <div className="value">{stats.week}</div>
          </div>
        </div>

        <div className="requests-section">
          <div className="requests-header">
            <h2>Contact Requests</h2>
            <div className="filter-tabs">
              {['all', 'pending', 'completed'].map(filter => (
                <button
                  key={filter}
                  className={`filter-tab ${currentFilter === filter ? 'active' : ''}`}
                  onClick={() => setCurrentFilter(filter)}
                >
                  {capitalizeFirst(filter)}
                </button>
              ))}
            </div>
          </div>
          
          {filteredRequests.length === 0 ? (
            <div className="empty-state">
              <svg className="icon" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                <path d="M22 6l-10 7L2 6"/>
              </svg>
              <p>No requests found</p>
            </div>
          ) : (
            <table className="requests-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Service</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map(request => (
                  <tr key={request.id}>
                    <td>{formatDate(request.timestamp)}</td>
                    <td>{request.from_name}</td>
                    <td>{request.from_email}</td>
                    <td>{request.phone || 'N/A'}</td>
                    <td>{capitalizeFirst(request.service || 'Other')}</td>
                    <td>
                      <span className={`status-badge ${request.status}`}>
                        {request.status}
                      </span>
                    </td>
                    <td>
                      <div className="action-buttons">
                        {request.status === 'pending' && (
                          <button 
                            className="action-btn approve"
                            onClick={() => updateStatus(request.id, 'completed')}
                            title="Mark as completed"
                          >
                            <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                              <path d="M20 6L9 17l-5-5"/>
                            </svg>
                          </button>
                        )}
                        <button 
                          className="action-btn delete"
                          onClick={() => deleteRequest(request.id)}
                          title="Delete request"
                        >
                          <svg className="icon" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                            <path d="M3 6h18"/>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                            <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
