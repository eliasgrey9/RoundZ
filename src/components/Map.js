import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import style from "./map.module.css";
import { BsEye, BsEyeSlash } from "react-icons/bs";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/eliasgrey9/clfpyxcqi000u01pdpa2lri29"
  );
  const [mapCenter, setMapCenter] = useState([-79.4512, 43.6568]);
  console.log("mapCenter", mapCenter);
  const [mapZoom, setMapZoom] = useState(13);

  const [roadThickness, setRoadThickness] = useState(1);
  const [showRoad, setShowRoad] = useState(true);

  const [labelFontSize, setLabelFontSize] = useState(12);
  const [showLabels, setShowLabels] = useState(true);

  const timers = useRef({ moveend: null, zoom: null });

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZWxpYXNncmV5OSIsImEiOiJjbGZtdXd2NnAwZmdkM3VwaTZ0Zmw2OGNyIn0.TzeOb0_3JU7kl52wGIq37w";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: mapCenter,
      zoom: mapZoom,
    });

    map.on("load", () => {
      // Map is fully loaded

      map.addLayer({
        id: "roads",
        type: "line",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "road",
        layout: {
          "line-join": "round",
          "line-cap": "round",
          visibility: showRoad ? "visible" : "none",
        },
        paint: {
          "line-color": "#000",
          "line-width": roadThickness,
        },
      });

      map.addLayer({
        id: "road-names",
        type: "symbol",
        source: {
          type: "vector",
          url: "mapbox://mapbox.mapbox-streets-v8",
        },
        "source-layer": "road",
        layout: {
          "text-field": "{name}",
          "text-font": ["Open Sans Regular"],
          "text-size": labelFontSize,
          visibility: showLabels ? "visible" : "none",
        },
        paint: {
          "text-color": "#000",
          "text-halo-color": "#fff",
          "text-halo-width": 1,
        },
      });

      map.addControl(
        new MapboxGeocoder({
          accessToken: mapboxgl.accessToken,
          mapboxgl: mapboxgl,
        })
      );

      map.on("moveend", async () => {
        clearTimeout(timers.current.moveend);
        timers.current.moveend = setTimeout(() => {
          // Get the new center coordinates
          const newCenter = map.getCenter().toArray();
          // Update the state with the new center coordinates
          setMapCenter(newCenter);
        }, 250);
      });

      map.on("zoom", async () => {
        clearTimeout(timers.current.zoom);
        timers.current.zoom = setTimeout(() => {
          const newZoom = map.getZoom();
          // Update the state with the new zoom level
          setMapZoom(newZoom);
        }, 250);
      });

      // Store the map instance in a ref
      mapRef.current = map;
    });

    // Return a cleanup function that removes the map instance
    return () => {
      map.remove();
    };
  }, [
    mapStyle,
    roadThickness,
    mapCenter,
    mapZoom,
    showRoad,
    showLabels,
    labelFontSize,
  ]);

  const exportImage = () => {
    const map = mapRef.current;
    map.once("render", function () {
      const canvas = map.getCanvas();
      const dataURL = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "map.png";
      link.href = dataURL;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    });
    map.triggerRepaint();
  };

  const mapView = () => {
    setMapStyle("mapbox://styles/eliasgrey9/clfpyxcqi000u01pdpa2lri29");
    setShowLabels(false);
    setShowRoad(false);
  };

  return (
    <div className={style.body}>
      <div className={style.mapContainer} ref={mapContainerRef}></div>
      <div className={style.mapViewAndExportBtn}>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfr4qbjg002o01nsprw4ip9o");
          }}
        >
          Layer View
        </button>
        <button onClick={mapView}>Map View</button>
        <button onClick={exportImage}>Export</button>
      </div>
      <div className={style.roadThicknessControls}>
        <div>Road thickness</div>
        <button onClick={() => setRoadThickness((prev) => prev + 1)}>+</button>
        <button onClick={() => setRoadThickness((prev) => prev - 1)}>-</button>
        <button onClick={() => setShowRoad((prev) => !prev)}>
          {showRoad ? <div>Hide</div> : <div>Show</div>}
        </button>
      </div>
      <div className={style.LabelsControls}>
        <div>Road Labels</div>
        <button onClick={() => setLabelFontSize((prev) => prev + 1)}>+</button>
        <button onClick={() => setLabelFontSize((prev) => prev - 1)}>-</button>
        <button onClick={() => setShowLabels((prev) => !prev)}>
          {showLabels ? <div>Hide</div> : <div>Show</div>}
        </button>
      </div>
    </div>
  );
};

export default Map;
