import type { ContactFormBlock } from '@/payload-types'
import PageTitle from '../ui/page-title'
import ContactFormClient from './contact-form.client'
import TiltedImage from '../ui/tilted-image'

export default function ContactForm({
  intro,
  title,
  image,
  address,
  phone,
  mobile,
  email,
}: ContactFormBlock) {
  return (
    <section className="py-16 md:py-32">
      <div className="max-w-7xl mx-auto px-4">
        <PageTitle intro={intro} title={title} />

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <TiltedImage image={image} width={400} height={600} className="hidden lg:block" />

          <div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div>
                <h2 className="text-accent-800 font-sans text-lg mb-2">Anschrift</h2>
                <p dangerouslySetInnerHTML={{ __html: address.replace(/\n/g, '<br />') }} />
              </div>

              <div>
                <h2 className="text-accent-800 font-sans text-lg mb-2">Kontakt</h2>
                <ul>
                  <li>
                    Telefon:{' '}
                    <a href={`tel:${phone}`} className="text-accent-800 hover:text-accent-700">
                      {phone}
                    </a>
                  </li>
                  <li>
                    Mobil:{' '}
                    <a href={`tel:${mobile}`} className="text-accent-800 hover:text-accent-700">
                      {mobile}
                    </a>
                  </li>
                  <li>
                    E-Mail:{' '}
                    <a href={`mailto:${email}`} className="text-accent-800 hover:text-accent-700">
                      {email}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <ContactFormClient />
          </div>
        </div>
      </div>
    </section>
  )
}
