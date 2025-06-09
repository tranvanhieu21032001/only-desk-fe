import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import '@arcgis/core/assets/esri/themes/light/main.css';
import styled from "styled-components";
import themeColors from "@/shared/styles/themes/default/colors";
import Typography from "@/shared/components/common/Typography";
import fontWeight from "@/shared/styles/themes/default/fontWeight";

// Styled Components
const Container = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const MapWrapper = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 8px;
`;

const InfoOverlay = styled.div`
  position: absolute;
  top: 24px;
  left: 24px;
  background-color: rgba(0, 0, 0, 0.7);
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
  color:${themeColors?.newtralLightest};
  font-size: 14px;
  line-height: 1.6;
  min-width: 180px;
  justify-content: center;
  width: 248px;
  height: 126px;
  z-index: 10;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;


const Title = styled.div`
  font-weight: bold;
`;

const Highlight = styled.span`
  color: #0077cc;
`;

const VisitorContent = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<MapView>();

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new Map({ basemap: "topo-vector" });

        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-98.5795, 39.8283], // Center of the USA
            zoom: 4,
        });

        viewRef.current = view;
        view.ui.remove("attribution");
        view.ui.move("zoom", "bottom-right");


        const graphicsLayer = new GraphicsLayer();
        map.add(graphicsLayer);

        const visitors = [
            { id: 1, name: "Alice", location: [105.8542, 21.0285] },
            { id: 2, name: "Bob", location: [105.8342, 21.0375] },
        ];

        visitors.forEach(({ id, name, location }) => {
            const point = {
                type: "point",
                longitude: location[0],
                latitude: location[1],
            };

            const markerSymbol = {
                type: "simple-marker",
                color: "blue",
                outline: {
                    color: "white",
                    width: 1,
                },
            };

            const popupTemplate = {
                title: name,
                content: `Visitor ID: ${id}`,
            };

            const pointGraphic = new Graphic({
                geometry: point,
                symbol: markerSymbol,
                popupTemplate,
            });

            graphicsLayer.add(pointGraphic);
        });

        return () => {
            if (viewRef.current) {
                viewRef.current.destroy();
                viewRef.current = undefined;
            }
        };
    }, []);

    return (
        <Container>
            <MapWrapper ref={mapRef} />
            <InfoOverlay>
                <Typography fontWeight={fontWeight?.light} color={themeColors?.newtralLightest} variant="caption-small">
                    0 Online users
                </Typography>
                <Typography fontWeight={fontWeight?.light} color={themeColors?.newtralLightest} variant="caption-small">
                    0 Active now
                </Typography>
                <hr />
                <Typography fontWeight={fontWeight?.light} color={themeColors?.newtralLightest} variant="caption-small">
                    Live view from MagicMap
                </Typography>
            </InfoOverlay>
        </Container>
    );
};

export default VisitorContent;
