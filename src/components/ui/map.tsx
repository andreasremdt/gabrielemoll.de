'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'
import { cn } from '@/lib/utils'

type Props = {
  className?: string
}

const LATITUDE = 47.59189
const LONGITUDE = 7.600248
const ZOOM = 17

export default function Map({ className }: Props) {
  return (
    <MapContainer
      center={[LATITUDE, LONGITUDE]}
      zoom={ZOOM}
      className={cn('z-10', className)}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[LATITUDE, LONGITUDE]} />
    </MapContainer>
  )
}
