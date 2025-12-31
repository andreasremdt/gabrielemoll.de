'use client'

import { MapContainer, Marker, TileLayer } from 'react-leaflet'

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
      className={className}
      scrollWheelZoom={false}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={[LATITUDE, LONGITUDE]} />
    </MapContainer>
  )
}
