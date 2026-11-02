import CasesWall, { ClientWall } from '@/components/home/CasesWall'
import FounderWall from '@/components/home/FounderWall'
import GlobeWall from '@/components/home/GlobeWall'
import HeroWall from '@/components/home/HeroWall'
import ServicesWall from '@/components/home/ServicesWall'
import WorkWall from '@/components/home/WorkWall'
import { PageShell } from '@/components/page/PageParts'
import Seo from '@/components/seo/Seo'
import { pageMeta } from '@/data/seo'

/** One section to a wall, each a different colour. The closing wall is the site footer. */
export default function Home() {
  return (
    <PageShell walls>
      <Seo meta={pageMeta.home} />
      <HeroWall />
      <GlobeWall />
      <ServicesWall />
      <CasesWall />
      <ClientWall />
      <WorkWall />
      <FounderWall />
    </PageShell>
  )
}
