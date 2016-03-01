import React from 'react';
import ReactDOM from 'react-dom';

let map = null;
let markers = [];

let wallIcon = L.icon({
    iconUrl: 'img/marker.png',

    iconSize:     [41, 54.5], // size of the icon
    iconAnchor:   [20.5, 53], // point of the icon which will correspond to marker's location
    popupAnchor:  [0, -54.5] // point from which the popup should open relative to the iconAnchor
});

let wallSelectedIcon = L.icon({
    iconUrl: 'img/marker-choosing.png',

    iconSize:     [100, 100], // size of the icon
    iconAnchor:   [50, 76], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
});

module.exports = React.createClass({

    componentDidMount() {
        map = L.map('walls-map', {
            minZoom: 10,
            maxZoom: 16
        }).setView([43.700000, 7.250000], 11);

        L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {}).addTo(map);
    },

    componentWillUnmount() {
        map = null;
        markers = [];
    },

    _displayWalls(walls) {
        walls.forEach((wall) => {
            let marker = L.marker([wall.latitude, wall.longitude], {
                clickable: true,
                title: wall.address,
                alt: 'wall icon',
                icon: wallIcon
            }).addTo(map);
            marker.addEventListener('click', () => {
                this.props.onWallClick(wall.id);
            });
            marker.wall = wall;
            markers.push(marker);
        });
    },

    componentWillReceiveProps (nextProps) {
        let wallsToKeep = [];
        let wallsToAdd = [];

        // delete those who are absent and list all that we must keep
        markers.forEach( (marker) => {
            let index = nextProps.walls.findIndex((wall) => { return wall.id == marker.wall.id; });
            if (index < 0) {
                // the wall has to be deleted
                map.removeLayer(marker);
            } else {
                // the wall has to be keeped
                wallsToKeep.push(marker.wall);
            }
        });

        nextProps.walls.forEach((wall) => {
            let index = wallsToKeep.findIndex((wallToKeep) => { return wallToKeep.id == wall.id; });
            if (index < 0) {
                // the wall has to be added
                wallsToAdd.push(wall);
            }
        });

        // draw all the walls
        this._displayWalls(wallsToAdd);

        if (nextProps.isChoosingAWall) {
            markers.forEach((marker) => {
                marker.setIcon(wallSelectedIcon);
            });
        } else {
            markers.forEach((marker) => {
                marker.setIcon(wallIcon);
            });
        }
    },

    render() {
        return (
            <div id="walls-map"></div>
        );
    }

});
