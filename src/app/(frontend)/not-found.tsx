import type { Metadata } from 'next'
import Button from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Seite nicht gefunden',
  description:
    'Die von Ihnen gewünschte Seite konnte nicht gefunden werden. Bitte vergewissern Sie sich, das die URL stimmt.',
}

export default function NotFound() {
  return (
    <>
      <p>Seite nicht gefunden</p>
      <Button href="/">Zur Startseite</Button>
    </>
  )
}
