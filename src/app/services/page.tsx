'use client'

import { services } from '@/lib/constent/services'
import ServiceCard from '@/app/components/ServiceCard'
import ServicesBackground from '@/app/components/ServicesBackground'
import UserHeader from '@/app/components/UserHeader'
import AIServicesHeader from '@/app/components/AIServicesHeader'

export default function ServicesPage() {

  return (
    <ServicesBackground>
      <UserHeader showServicesButton={false} />
      <AIServicesHeader
        subtitle="✨ AI Services Dashboard"
        title="Your AI Services"
        tagline="Empower your creativity and productivity with the magic of AI."
        description="Explore and utilize our suite of AI-powered services designed to enhance your productivity and creativity."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mt-8">
        {services.map((_, idx) => (
          <ServiceCard key={idx} idx={idx} />
        ))}
      </div>
    </ServicesBackground>
  )
}