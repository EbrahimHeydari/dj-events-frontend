import iconUrl from 'leaflet/dist/images/marker-icon.png'
import shadowUrl from 'leaflet/dist/images/marker-shadow.png'

import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet'
import L from 'leaflet'

import styles from '@/styles/Map.module.css'
import 'leaflet/dist/leaflet.css'

const Map = () => {
  const position = [51.505, -0.09]

  L.Icon.Default.mergeOptions({
    iconUrl: iconUrl.src,
    shadowUrl: shadowUrl.src
  })

  return (
    <MapContainer center={position} zoom={13} scrollWheelZoom={false} className={styles.map}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          Event Address
        </Popup>
      </Marker>
    </MapContainer>
  )
}

export default Map

