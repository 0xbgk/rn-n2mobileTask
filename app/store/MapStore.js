import { action, observable } from 'mobx';
import { CoordinateDelta } from '../constants/Enums'
import FirebaseUtil from '../components/utils/FirebaseUtil'
import database from '@react-native-firebase/database';
import { act } from 'react-test-renderer';


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
    @observable markerId = 1;

    @observable markers = [];

    // @observable markers = [
    //     {
    //         0: {
    //             id: 1,
    //             latlng: {
    //                 latitude: 38.4714083,
    //                 longitude: 27.229055
    //             },
    //             title: 'MARK 1'
    //         },
    //         1: {
    //             id: 2,
    //             latlng: {
    //                 latitude: 38.4714083,
    //                 longitude: 27.219055
    //             },
    //             title: 'MARK 2'
    //         },
    //         2: {
    //             id: 3,
    //             latlng: {
    //                 latitude: 38.4714083,
    //                 longitude: 27.239055
    //             },
    //             title: 'MARK 3',
    //         }
    //     }
    // ];

    // @observable markers = [
    //     {
    //         id: 1,
    //         latlng: {
    //             latitude: 38.4714083,
    //             longitude: 27.229055
    //         },
    //         title: 'MARK 1'
    //     },
    //     {
    //         id: 2,
    //         latlng: {
    //             latitude: 38.4714083,
    //             longitude: 27.219055
    //         },
    //         title: 'MARK 2'
    //     },
    //     {
    //         id: 3,
    //         latlng: {
    //             latitude: 38.4714083,
    //             longitude: 27.239055
    //         },
    //         title: 'MARK 3',
    //     },
    //     {
    //         id: 4,
    //         latlng: {
    //             latitude: 38.4714083,
    //             longitude: 27.199055
    //         },
    //         title: 'GORKEM',
    //     }
    // ];



    @action changeMarkerSet(value) {
        this.markerSet = value;
    }

    @action setMarkerTitle(value) {
        this.markerTitle = value;
    }

    @action setMarkerId() {
        if (this.markers != null) {
            this.markerId = this.markers.length + 1;
        }
        else {
            this.markerId = 1;
        }

        // console.log(this.markerId)
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

        // console.log('-----')
        // console.log(this.region)
        // console.log('-----')
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

    // ------toAddWithoutDbLocal-----
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
    // ------/toAddWithoutDbLocal-----

    // ----DB-----
    @action getMarkersByUserId() {

        let uid = FirebaseUtil.getCurrentUser().uid;

        database()
            .ref(`/users/${uid}`)
            .once('value')
            .then(snapshot => {
                // console.log('User data: ', snapshot.val());
                // this.markers = JSON.parse(JSON.stringify(snapshot.val()));
                // this.markers = JSON.stringify(snapshot.val());
                // console.log(JSON.parse(JSON.stringify(snapshot.val())))
                console.log(snapshot.val())
                // this.markers = snapshot.val();
                // console.log(this.markers);

                // snapshot.forEach((item) => {
                //     temp.push([{
                //         id: item.val().id,
                //         latlng: {
                //             latitude: item.val().latlng.latitude,
                //             longitude: item.val().latlng.longitude
                //         },
                //         title: item.val().title
                //     }])
                // })

                // console.log(temp)
                // console.log('-----')
                // console.log(Object.entries(temp))

                // {
                //     id: 1,
                //     latlng: {
                //         latitude: 38.4714083,
                //         longitude: 27.229055
                //     },
                //     title: 'MARK 1'
                // },
                // marker += '['
                // snapshot.forEach((item) => {
                //     marker += `
                //             {
                //                 "id": ${item.val().id},
                //                 "latlng": {
                //                     "latitude": ${item.val().latlng.latitude},
                //                     "longitude": ${item.val().latlng.longitude}
                //                 },
                //                 "title": "${item.val().title}"
                //             },`
                // })
                // marker += ']';

                // let part1 = marker.substring(0, marker.length - 2);
                // let part2 = marker.substring(marker.length - 2 + 1, marker.length);
                // marker = part1 + part2
                // console.log(marker)
                // console.log(JSON.parse(marker))
                // this.markers = JSON.stringify(marker);
                // console.log(this.markers)
            });
    }

    @action saveMarkerToUser(tempMarker) {

        let uid = FirebaseUtil.getCurrentUser().uid;

        database()
            // .ref(`/users/${uid}/${this.markerId}`)
            .ref(`/users/${uid}/`)
            .push()
            .set(
                {
                    id: this.markerId,
                    latlng: {
                        latitude: tempMarker.latlng.latitude,
                        longitude: tempMarker.latlng.longitude
                    },
                    title: this.markerTitle,
                }
            )
            .then(() => {
                console.log('Data added.')
                console.log(this.markers)
            });
    }
    // ----/DB-----
}

export default new MapStore();