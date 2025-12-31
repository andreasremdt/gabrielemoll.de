import type { HeroBlock } from '@/payload-types'
import TiltedImage from '../ui/tilted-image'
import Button from '../ui/button'

export default function Hero({ intro, title, content, image }: HeroBlock) {
  return (
    <section className="bg-accent-50 py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4 lg:grid lg:grid-cols-2 lg:gap-8">
        <div className="self-center">
          <p className="font-sans mb-4 text-accent-800 text-lg">{intro}</p>
          <h1 className="font-title text-5xl md:text-6xl lg:text-7xl text-balance mb-8">{title}</h1>
          <p className="text-base md:text-lg lg:text-xl text-balance mb-8">{content}</p>

          <div className="flex gap-8 mb-16 lg:mb-0">
            <Button href="/atelier">Zum Atelier &rarr;</Button>
            <Button href="/werke">Meine Werke &rarr;</Button>
          </div>
        </div>
        <div className="place-self-end">
          <TiltedImage
            image={image}
            width={400}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
