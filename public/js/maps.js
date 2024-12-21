
maptilersdk.config.apiKey = `${mapToken}`;
const map = new maptilersdk.Map({
    container: 'map', // container's id or the HTML element to render the map
    style: maptilersdk.MapStyle.STREETS,
    center: listing.geometry.coordinates, // starting position [lng, lat]
    zoom: 10, // starting zoom
});

// console.log(coordinates);

const marker = new maptilersdk.Marker({color:"red",scale: 0.7})
  .setLngLat(listing.geometry.coordinates)
  .setPopup(new maptilersdk.Popup().setHTML(`<h3>${listing.location}</h3><p>Exact Location Provided</p>`))
  .addTo(map);


