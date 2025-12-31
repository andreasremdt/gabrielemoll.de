'use client'

import dynamic from 'next/dynamic'
import type { LocationMapBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'

const Map = dynamic(() => import('../ui/map'), { ssr: false })

export default function LocationMap({ intro, title, directions }: LocationMapBlock) {
  return (
    <section className="pb-32">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle intro={intro} title={title} level={2} />

        <Map className="h-96 shadow-xl mb-16" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {directions.map((direction) => (
            <div key={direction.id}>
              <h3 className="text-accent-800 font-sans uppercase text-xl mb-2">
                {direction.title}
              </h3>
              <p>{direction.content}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
