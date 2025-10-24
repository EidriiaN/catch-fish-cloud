"use client";

import { useState, useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function LakeMap({ location, ponds, isEditable = false, onPondUpdate = null }) {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [pondPolygons, setPondPolygons] = useState([]);

  // Initialize map when component mounts
  useEffect(() => {
    // Guard against SSR
    if (typeof window !== "undefined" && !map) {
      // Fix Leaflet icon issue
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
        shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
      });

      const { coordinates } = location;
      const mapInstance = L.map(mapRef.current).setView([coordinates.lat, coordinates.lng], 15);

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(mapInstance);

      // Add marker for lake location
      L.marker([coordinates.lat, coordinates.lng]).addTo(mapInstance).bindPopup(`<b>${location.address}</b>`);

      setMap(mapInstance);
    }
  }, [location, map]);

  // Add ponds to map when map is ready and ponds change
  useEffect(() => {
    if (map && ponds) {
      // Clear old polygons
      pondPolygons.forEach((polygon) => {
        map.removeLayer(polygon);
      });

      // Create new pond polygons
      const newPolygons = ponds.map((pond) => {
        // Convert pond coordinates to Leaflet format
        const latlngs = pond.coordinates.map((coord) => [coord.lat, coord.lng]);

        // Create polygon with pond info
        const polygon = L.polygon(latlngs, {
          color: isEditable ? "red" : "blue",
          fillColor: isEditable ? "#f03" : "#03f",
          fillOpacity: 0.2,
          weight: 2,
        })
          .addTo(map)
          .bindPopup(`<b>${pond.name}</b><br>Pești: ${pond.fishTypes.join(", ")}`);

        // If editable, add edit functionality
        if (isEditable && onPondUpdate) {
          polygon.on("click", function () {
            // In a real app, this would show an editing interface
            console.log("Editing pond:", pond.id);
          });
        }

        return polygon;
      });

      setPondPolygons(newPolygons);
    }
  }, [map, ponds, isEditable, onPondUpdate, pondPolygons]);

  return <div ref={mapRef} className="h-[400px] w-full rounded-lg shadow-md" />;
}
