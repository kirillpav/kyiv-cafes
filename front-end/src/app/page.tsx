"use client";

import Image from "next/image";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useRef, useEffect } from "react";
import "./App.css";

export default function Home() {
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
		});

		return () => {
			mapRef.current.remove();
		};
	}, []);

	return (
		<div>
			<div id="map-container" ref={mapContainerRef} />
		</div>
	);
}
