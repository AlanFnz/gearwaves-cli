import React, { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

const Mapbox = (props) => {
  const { locations } = props;

  mapboxgl.accessToken =
    'pk.eyJ1IjoiYWxhbmZueiIsImEiOiJja2dqbXpqbXUwMWtoMnVtcGpvc2Q3a2JrIn0.NvRjm7E6zAg5TUajZvSIRQ';

  useEffect(() => {
    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/alanfnz/ckgkm3cz620jd1anmx4h7cjon',
      scrollZoom: false,
      center: [3.7038, 40.4168],
      zoom: 5,
    });

    const bounds = new mapboxgl.LngLatBounds();

    locations.forEach((loc) => {
      const marker = document.createElement('div');
      marker.className = 'marker';
      new mapboxgl.Marker({ element: marker, anchor: 'bottom'})
        .setLngLat(loc.coordinates)
        .addTo(map);

      new mapboxgl.Popup({ offset: 30, focusAfterOpen: false })
        .setLngLat(loc.coordinates)
        .setHTML(`<strong>${loc.name}</strong><br/><p>${loc.description}</p>`)
        .addTo(map);

      bounds.extend(loc.coordinates);
    });

    map.fitBounds(bounds, {
      padding: {
        top: 250,
        bottom: 150,
        left: 100,
        right: 100,
      },
    });
  }, [locations]);

  return <div id="map" />;
};

export default Mapbox;
