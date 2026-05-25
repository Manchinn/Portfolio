import { BuildWorkflow } from '@/components/portfolio/BuildWorkflow'
import { CapabilityGrid } from '@/components/portfolio/CapabilityGrid'
import { ContactCTA } from '@/components/portfolio/ContactCTA'
import { EngineeringManifesto } from '@/components/portfolio/EngineeringManifesto'
import { ExperienceTimeline } from '@/components/portfolio/ExperienceTimeline'
import { FeaturedSystems } from '@/components/portfolio/FeaturedSystems'
import { HeroOperator } from '@/components/portfolio/HeroOperator'
import { LabShowcase } from '@/components/portfolio/LabShowcase'
import { StackMatrix } from '@/components/portfolio/StackMatrix'
import { SystemStats } from '@/components/portfolio/SystemStats'

export default function Home() {
  return (
    <main className="console-root min-h-screen overflow-x-hidden">
      <HeroOperator />
      <SystemStats />
      <CapabilityGrid />
      <FeaturedSystems />
      <BuildWorkflow />
      <StackMatrix />
      <EngineeringManifesto />
      <ExperienceTimeline />
      <LabShowcase />
      <ContactCTA />
    </main>
  )
}
