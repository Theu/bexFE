import React, { useEffect, useCallback } from 'react';
import { connect } from 'react-redux';

import { getCoords } from '../../../../../redux/modules/coords/actions';
import { tooglePanel } from '../../../../../redux/modules/panel/actions';
import { tourMock } from '../../../../../../server/tourMock';
import { createMapContainer, extractBound } from './helpers/mapHelpers';
import { createMarkers } from './helpers/markersHelpers';
import styles from './mapRender.module.scss';

const { pointOfInterest } = tourMock;

const mapBounds = extractBound(pointOfInterest);

const MapRender = ({ targetMap, lat, long, zoom, getCoords, tooglePanel }) => {
    const mapFromLeaflet = createMapContainer(lat, long, zoom, targetMap);
    const containerInit = targetMap.DomUtil.get('map');
    const MARKERS = createMarkers(targetMap, mapBounds);

    const initializeMap = useCallback((container, markers) => {
        if (container != null) {
            container._leaflet_id = null;
        }
        container = targetMap.map('map', mapFromLeaflet).fitBounds(mapBounds);

        targetMap
            .featureGroup(markers)
            .eachLayer(function (layer) {
                layer.on('click', function (ev) {
                    tooglePanel(true);
                    getCoords(ev.latlng);
                });
            })
            .addTo(container);
    }, [getCoords, mapFromLeaflet, targetMap, tooglePanel]);

    useEffect(() => initializeMap(containerInit, MARKERS), [MARKERS, containerInit, initializeMap]);

    return <div id="map" className={styles.mapWrapper} />;
};

const mapDispatchToProps = { getCoords, tooglePanel };

export default connect(null, mapDispatchToProps)(MapRender);
