import React, { useEffect, useRef } from "react";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import Graphic from "@arcgis/core/Graphic";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import '@arcgis/core/assets/esri/themes/light/main.css';
import themeColors from "@/shared/styles/themes/default/colors";
import Typography from "@/shared/components/common/Typography";
import fontWeight from "@/shared/styles/themes/default/fontWeight";
import * as S from './VisitorContent.styles'

const VisitorContent = () => {
    const mapRef = useRef<HTMLDivElement>(null);
    const viewRef = useRef<MapView>();

    useEffect(() => {
        if (!mapRef.current) return;

        const map = new Map({ basemap: "topo-vector" });

        const view = new MapView({
            container: mapRef.current,
            map: map,
            center: [-98.5795, 39.8283],
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
        <S.Container>
            <S.MapWrapper ref={mapRef} />
            <S.InfoOverlay>
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
            </S.InfoOverlay>
        </S.Container>
    );
};

export default VisitorContent;
