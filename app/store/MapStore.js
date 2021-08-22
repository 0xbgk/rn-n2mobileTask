import { action, observable } from 'mobx';
import { CoordinateDelta } from '../constants/Enums'

class MapStore {

    constructor() {
        // console.log(this.markers.length)
    }

    @observable markerSet = false;

    @observable region = {
        latitude: 38.4714083,
        longitude: 27.209055
    };

    @observable temporaryMarker = {
        id: 0,
        latlng: {
            latitude: 0,
            longitude: 0
        },
        title: ''
    };

    @observable markerTitle = "Default Title";
    @observable markerId = 0;

    @observable markers = [
        {
            id: 1,
            latlng: {
                latitude: 38.4714083,
                longitude: 27.229055
            },
            title: 'MARK 1'
        },
        {
            id: 2,
            latlng: {
                latitude: 38.4714083,
                longitude: 27.219055
            },
            title: 'MARK 2'
        },
        {
            id: 3,
            latlng: {
                latitude: 38.4714083,
                longitude: 27.239055
            },
            title: 'MARK 3',
        },
        {
            id: 4,
            latlng: {
                latitude: 38.4714083,
                longitude: 27.199055
            },
            title: 'GORKEM',
        }
    ];

    @action changeMarkerSet(value) {
        this.markerSet = value;
    }

    @action setMarkerTitle(value) {
        this.markerTitle = value;
    }

    @action setMarkerId() {
        this.markerId = this.markers.length + 1;

        console.log(this.markerId)
    }

    @action setRegion(position) {
        this.region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
        }
    }

    @action setPin(position) {
        this.region = {
            latitude: position.latitude,
            longitude: position.longitude
        }

        console.log('-----')
        console.log(this.region)
        console.log('-----')
    }

    @action setTemporaryMarker(coordinates) {
        // console.log(coordinates)
        this.setMarkerId();

        this.temporaryMarker = {
            id: this.markerId,
            latlng: {
                latitude: coordinates.latitude,
                longitude: coordinates.longitude
            },
            title: this.markerTitle
        }
        // console.log(this.temporaryMarker)
    }

    @action addTemporaryMarkerToCollection(temp) {
        // console.log(temp.latlng + ' EKLENECEK');
        // console.log(temp.latlng.latitude + ' EKLENECEK');
        // console.log(temp.latlng.longitude + ' EKLENECEK');
        // console.log(temp.title + ' EKLENECEK');
        // console.log(this.markers)

        this.markers = [...this.markers, {
            id: this.markerId,
            latlng: {
                latitude: temp.latlng.latitude,
                longitude: temp.latlng.longitude
            },
            title: this.markerTitle,
        }]

        // console.log(this.markers)
    }
}

export default new MapStore();