import React, { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import style from "./map.module.css";

const Map = () => {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const [mapStyle, setMapStyle] = useState(
    "mapbox://styles/eliasgrey9/clfpyxcqi000u01pdpa2lri29"
  );
  const [mapCenter, setMapCenter] = useState([-79.4512, 43.6568]);
  const [mapZoom, setMapZoom] = useState(13);

  const [roadThickness, setRoadThickness] = useState(1);
  const [showRoad, setShowRoad] = useState(true);

  const setRoadThicknessToSM = () => {
    setRoadThickness(1);
  };
  const setRoadThicknessToMD = () => {
    setRoadThickness(3);
  };
  const setRoadThicknessToLG = () => {
    setRoadThickness(5);
  };

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1IjoiZWxpYXNncmV5OSIsImEiOiJjbGZtdXd2NnAwZmdkM3VwaTZ0Zmw2OGNyIn0.TzeOb0_3JU7kl52wGIq37w";

    const map = new mapboxgl.Map({
      container: mapContainerRef.current,
      style: mapStyle,
      center: mapCenter,
      zoom: mapZoom,
      labels: false,
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
        },
        paint: {
          "line-color": "#000",
          "line-width": roadThickness,
        },
        // Set the layer to be visible by default
        // You can remove this line if you want the layer to be hidden by default
        layout: {
          visibility: showRoad ? "visible" : "none",
        },
      });
    });

    map.on("moveend", () => {
      // Get the new center coordinates
      const newCenter = map.getCenter().toArray();
      // Update the state with the new center coordinates
      setMapCenter(newCenter);
    });
    map.on("zoom", () => {
      const newZoom = map.getZoom();
      // Update the state with the new zoom level
      setMapZoom(newZoom);
    });

    map.addControl(
      new MapboxGeocoder({
        accessToken: mapboxgl.accessToken,
        mapboxgl: mapboxgl,
      })
    );

    // Store the map instance in a ref
    mapRef.current = map;

    // Return a cleanup function that removes the map instance
    return () => {
      map.remove();
    };
  }, [mapStyle, roadThickness]);

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
  return (
    <div className={style.body}>
      <div className={style.mapContainer} ref={mapContainerRef}></div>
      <div className={style.mapViewAndExportBtn}>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq239t8002701qv2eh39fuw");
          }}
        >
          Layer View
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfpyxcqi000u01pdpa2lri29");
          }}
        >
          Map View
        </button>
        <button onClick={exportImage}>Export</button>
      </div>

      <div>
        <button onClick={setRoadThicknessToSM}>Thin Road</button>
        <button onClick={setRoadThicknessToMD}>Medium Road</button>
        <button onClick={setRoadThicknessToLG}>Thick Road</button>
      </div>
      {/* <div className={style.styleBtns}>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq239t8002701qv2eh39fuw");
          }}
        >
          Thin Roads
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq3nadt001h01mckiac2fl2");
          }}
        >
          Thin Roads + labels
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq71uq0000201qvt2openbs");
          }}
        >
          Medium Roads
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq72rvp000301pgtw3iwn8a");
          }}
        >
          Medium Roads + labels
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq0768x000l01o7qehupkac");
          }}
        >
          Thick Roads
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq3ktl3002901qv7fxkt5zu");
          }}
        >
          Thick Roads + labels
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq4rtyh009v01nzrg6n70sq");
          }}
        >
          Labels Only
        </button>
        <button
          onClick={() => {
            setMapStyle("mapbox://styles/eliasgrey9/clfq4l248000w01pjoan6mqaj");
          }}
        >
          Monochrome
        </button>
      </div> */}
    </div>
  );
};

export default Map;
