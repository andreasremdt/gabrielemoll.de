import type { ExhibitionsBlock } from '@/payload-types'
import Exhibition from '../ui/exhibition'
import PageTitle from '../ui/page-title'
import { getExhibitions } from '@/lib/fetchers'
import Button from '../ui/button'

export default async function Exhibitions({
  title,
  intro,
  numberOfExhibitions,
  linkToExhibitions,
}: ExhibitionsBlock) {
  const exhibitions = await getExhibitions(numberOfExhibitions ?? 5)

  return (
    <section className="py-16 md:py-32 bg-accent-50">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle intro={intro} title={title} level={2} />

        <div className="flex flex-col gap-16 max-w-5xl mx-auto">
          {exhibitions.map((exhibition, index) => (
            <Exhibition
              key={exhibition.id}
              description={exhibition.description}
              date={exhibition.date}
              title={exhibition.title}
              image={exhibition.image}
              reverse={index % 2 !== 0}
            />
          ))}
        </div>

        {linkToExhibitions ? (
          <div className="text-center mt-16">
            <Button href="/ausstellungen">Alle Ausstellungen &rarr;</Button>
          </div>
        ) : null}
      </div>
    </section>
  )
}
