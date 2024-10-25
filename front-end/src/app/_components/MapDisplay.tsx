"use client";

import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect, useState } from "react";
import "../App.css";

interface MapData {
	cafeName: string;
	cafeStatus: boolean;
	coords: [number, number];
}

export default function MapDisplay() {
	const [center, setCenter] = useState<[number, number]>([30.538, 50.434]);
	const [zoom, setZoom] = useState<number>(15.02);
	const [pitch, setPitch] = useState<number>(75);

	const mapboxglToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;

	const mapRef = useRef<mapboxgl.Map | null>(null);
	const mapContainerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (mapboxglToken) {
			mapboxgl.accessToken = mapboxglToken;
		} else {
			console.error("Invalid Access Token");
		}
		mapRef.current = new mapboxgl.Map({
			container: mapContainerRef.current,
			center: center,
			zoom: zoom,
			pitch: pitch,
		});

		mapRef.current.on("move", () => {
			const mapCenter = mapRef.current.getCenter();
			const mapZoom = mapRef.current.getZoom();
			const mapPitch = mapRef.current.getPitch();

			setCenter([mapCenter.lng, mapCenter.lat]);
			setZoom(mapZoom);
			setPitch(mapPitch);
		});

		return () => {
			mapRef.current.remove();
		};
	}, []);

	return (
		<div className="h-[60vh] sm:w-full sm:h-full relative bg-red-500/0 rounded-[20px] p-2 sm:p-0">
			<div
				id="map-container"
				ref={mapContainerRef}
				className="opacity-100 overflow-visible"
			/>
		</div>
	);
}
