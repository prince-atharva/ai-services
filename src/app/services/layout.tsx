import { AuthProvider } from '@/context/AuthContext'
import React from 'react'

const ServicesLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <AuthProvider>
        {children}
      </AuthProvider>
    </div>
  )
}

export default ServicesLayout