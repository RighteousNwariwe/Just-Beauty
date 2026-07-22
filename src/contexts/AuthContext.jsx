import { createContext, useContext, useEffect, useState } from 'react'
import { 
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut as firebaseSignOut
} from 'firebase/auth'
import { auth } from '../firebase'

const AuthContext = createContext()

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user)
      setLoading(false)
    })

    return unsubscribe
  }, [])

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider()
    try {
      const result = await signInWithPopup(auth, provider)
      return result.user
    } catch (error) {
      throw error
    }
  }

  const signUpWithEmail = async (email, password) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      throw error
    }
  }

  const signInWithEmail = async (email, password) => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password)
      return result.user
    } catch (error) {
      throw error
    }
  }

  const signOut = async () => {
    try {
      await firebaseSignOut(auth)
    } catch (error) {
      throw error
    }
  }

  const value = {
    user,
    loading,
    signInWithGoogle,
    signUpWithEmail,
    signInWithEmail,
    signOut
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
