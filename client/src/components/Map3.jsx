// import { useEffect, useRef } from "react";
// import L from "leaflet";
// import "leaflet-routing-machine";
// import "leaflet/dist/leaflet.css";

// const Map3 = () => {
//   const fromLat = parseFloat(localStorage.getItem("fromLat"));
//   const fromLong = parseFloat(localStorage.getItem("fromLong"));
//   const toLat = parseFloat(localStorage.getItem("toLat"));
//   const toLong = parseFloat(localStorage.getItem("toLong"));

//   const mapRef = useRef(null);
//   const mapContainerRef = useRef(null);

//   useEffect(() => {
//     if (!mapContainerRef.current || mapRef.current) return;

//     mapRef.current = L.map(mapContainerRef.current).setView(
//       [fromLat, fromLong],
//       5
//     );

//     L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
//       mapRef.current
//     );

//     const customIcon = (iconUrl) =>
//       L.icon({
//         iconUrl,
//         iconSize: [20, 20],
//         iconAnchor: [20, 20],
//       });

//     L.marker([fromLat, fromLong], {
//       icon: customIcon(
//         "https://cdn-icons-png.flaticon.com/128/9131/9131546.png"
//       ),
//     })
//       .addTo(mapRef.current)
//       .bindPopup("<b>Starting Point</b>");

//     L.marker([toLat, toLong], {
//       icon: customIcon(
//         "https://cdn-icons-png.flaticon.com/128/9131/9131546.png"
//       ),
//     })
//       .addTo(mapRef.current)
//       .bindPopup("<b>Destination</b>");

//     const createRoute = (color, waypoints) => {
//       return L.Routing.control({
//         waypoints,
//         router: new L.Routing.OSRMv1({
//           serviceUrl: "https://router.project-osrm.org/route/v1",
//         }),
//         createMarker: () => null,
//         show: false,
//         addWaypoints: false,
//         draggableWaypoints: false,
//         fitSelectedRoutes: false,
//         lineOptions: {
//           styles: [{ color, weight: 4, opacity: 0.8 }],
//         },
//         container: L.DomUtil.create("div"),
//       }).addTo(mapRef.current);
//     };

//     createRoute("red", [
//       L.latLng(fromLat, fromLong),
//       L.latLng(fromLat - 0.01, fromLong - 0.01),
//       L.latLng(toLat, toLong),
//     ]);

//     setTimeout(() => {
//       document
//         .querySelectorAll(".leaflet-routing-container")
//         .forEach((el) => el.remove());
//     }, 500);

//     return () => {
//       mapRef.current?.remove();
//       mapRef.current = null;
//     };
//   }, [fromLat, fromLong, toLat, toLong]);

//   return (
//     <>
//       <style>
//         {`
//               .leaflet-routing-container {
//                 display: none !important;
//               }
//             `}
//       </style>
//       <div ref={mapContainerRef} className="w-[170px] h-[170px]" />
//     </>
//   );
// };

// export default Map3;

import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet-routing-machine";
import "leaflet/dist/leaflet.css";

const Map3 = () => {
  const fromLatStr = localStorage.getItem("fromLat");
  const fromLongStr = localStorage.getItem("fromLong");
  const toLatStr = localStorage.getItem("toLat");
  const toLongStr = localStorage.getItem("toLong");

  const fromLat = fromLatStr ? parseFloat(fromLatStr) : null;
  const fromLong = fromLongStr ? parseFloat(fromLongStr) : null;
  const toLat = toLatStr ? parseFloat(toLatStr) : null;
  const toLong = toLongStr ? parseFloat(toLongStr) : null;

  const mapRef = useRef(null);
  const mapContainerRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Check for invalid coordinates
    if (
      fromLat === null ||
      fromLong === null ||
      toLat === null ||
      toLong === null ||
      isNaN(fromLat) ||
      isNaN(fromLong) ||
      isNaN(toLat) ||
      isNaN(toLong)
    ) {
      console.error("Invalid coordinates found in localStorage");
      return;
    }

    mapRef.current = L.map(mapContainerRef.current).setView(
      [fromLat, fromLong],
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(
      mapRef.current
    );

    const customIcon = (iconUrl) =>
      L.icon({
        iconUrl,
        iconSize: [20, 20],
        iconAnchor: [20, 20],
      });

    L.marker([fromLat, fromLong], {
      icon: customIcon(
        "https://cdn-icons-png.flaticon.com/128/9131/9131546.png"
      ),
    })
      .addTo(mapRef.current)
      .bindPopup("<b>Starting Point</b>");

    L.marker([toLat, toLong], {
      icon: customIcon(
        "https://cdn-icons-png.flaticon.com/128/9131/9131546.png"
      ),
    })
      .addTo(mapRef.current)
      .bindPopup("<b>Destination</b>");

    const createRoute = (color, waypoints) => {
      return L.Routing.control({
        waypoints,
        router: new L.Routing.OSRMv1({
          serviceUrl: "https://router.project-osrm.org/route/v1",
        }),
        createMarker: () => null,
        show: false,
        addWaypoints: false,
        draggableWaypoints: false,
        fitSelectedRoutes: false,
        lineOptions: {
          styles: [{ color, weight: 4, opacity: 0.8 }],
        },
        container: L.DomUtil.create("div"),
      }).addTo(mapRef.current);
    };

    createRoute("red", [
      L.latLng(fromLat, fromLong),
      L.latLng(fromLat - 0.01, fromLong - 0.01),
      L.latLng(toLat, toLong),
    ]);

    setTimeout(() => {
      document
        .querySelectorAll(".leaflet-routing-container")
        .forEach((el) => el.remove());
    }, 500);

    return () => {
      mapRef.current?.remove();
      mapRef.current = null;
    };
  }, [fromLat, fromLong, toLat, toLong]);

  return (
    <>
      <style>
        {`
              .leaflet-routing-container {
                display: none !important;
              }
            `}
      </style>
      <div ref={mapContainerRef} className="w-[170px] h-[170px]" />
    </>
  );
};

export default Map3;
