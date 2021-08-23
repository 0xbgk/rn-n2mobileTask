import React, { Component } from 'react'
import { Alert, StyleSheet, View } from 'react-native'
import { inject, observer } from 'mobx-react'
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { CoordinateDelta } from '../../constants/Enums';
import MyLocationButton from '../utils/MyLocationButton';
import SavePinArea from '../utils/SavePinArea';
import Geolocation from 'react-native-geolocation-service';
import Permissions from 'react-native-permissions';
import FirebaseUtil from '../utils/FirebaseUtil'
import database from '@react-native-firebase/database';

@inject('MapStore')
@observer
export class MapScreen extends Component {

    constructor(props) {
        super(props);
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.onPressHandler = this.onPressHandler.bind(this);
        this.getCurrentMarkers = this.getCurrentMarkers.bind(this);
        // console.log(props.MapStore)
    }

    state = {
        region: {
            latitude: this.props.MapStore.region.latitude,
            longitude: this.props.MapStore.region.longitude,
            latitudeDelta: CoordinateDelta.TOWN_LATITUDE,
            longitudeDelta: CoordinateDelta.TOWN_LONGTITUDE,
        },
        markers: []
    };



    componentDidMount() {
        Permissions.request('android.permission.ACCESS_FINE_LOCATION').then(response => {
            // allow permissions please
            // TODO check if permissions allowed or not

        })

        // this.props.MapStore.getMarkersByUserId();


        this.getCurrentMarkers();

    }

    componentDidUpdate() {
        // this.props.MapStore.getMarkersByUserId();
        // console.log(this.state.markers)
        this.getCurrentMarkers();

    }

    getCurrentMarkers() {
        let uid = FirebaseUtil.getCurrentUser().uid;
        let temp = []

        database()
            .ref(`/users/${uid}/`)
            .once('value')
            .then(snapshot => {
                snapshot.forEach((item) => {
                    temp.push({
                        id: item.val().id,
                        latlng: {
                            latitude: item.val().latlng.latitude,
                            longitude: item.val().latlng.longitude
                        },
                        title: item.val().title
                    })

                })
                this.setState({
                    markers: [...temp]
                })
                // console.log(this.state.markers)
            });
    }

    getCurrentPosition() {
        Geolocation.getCurrentPosition(
            (position) => {

                this.props.MapStore.setRegion(position)

                this.toggleMarker(position.coords)
            },
            (error) => {
                // See error code charts below.
                console.log(error.code, error.message);
            },
            {
                enableHighAccuracy: false,
                timeout: 15000,
                maximumAge: 10000
            }
        );
    }

    // -------Click Handles------
    onPressHandler(e) {
        const coordinates = e.nativeEvent.coordinate;

        // console.log(coordinates)

        this.toggleMarker(coordinates)
    }

    toggleMarker(coordinates) {
        if (this.props.MapStore.markerSet || !this.props.MapStore.markerSet) {
            this.props.MapStore.changeMarkerSet(!this.props.MapStore.markerSet);

            this.props.MapStore.setTemporaryMarker(coordinates)
        }
    }
    // -------/Click Handles------

    render() {
        // console.log(this.state.markers)
        return (
            <View style={styles.container}>
                <MyLocationButton onPressFunction={this.getCurrentPosition} />
                <MapView
                    onPress={this.onPressHandler}
                    loadingEnabled={true}
                    style={styles.map}
                    showsUserLocation={true}
                    provider={PROVIDER_GOOGLE}
                    initialRegion={this.state.region}
                // initialRegion={this.props.MapStore.region}
                // TODO cameraya göre region ayarı
                // region={this.state.region}
                >
                    {/* // Tıklama ile olusan marker */}
                    {
                        this.props.MapStore.markerSet ?
                            <Marker
                                coordinate={{
                                    latitude: this.props.MapStore.temporaryMarker.latlng.latitude,
                                    longitude: this.props.MapStore.temporaryMarker.latlng.longitude
                                }}
                                title=""
                            />
                            :
                            <View></View>
                    }
                    {/* // Daha önce kayıtlı markerların gösterimi */}
                    {
                        // this.props.MapStore.markers.map((marker) => {
                        //     return (
                        //         <Marker
                        //             key={marker.id}
                        //             coordinate={{
                        //                 latitude: marker.latlng.latitude,
                        //                 longitude: marker.latlng.longitude
                        //             }}
                        //             title={marker.title}
                        //         />
                        //     )
                        // })
                        this.state.markers.map((marker) => {
                            return (
                                <Marker
                                    key={marker.id}
                                    coordinate={{
                                        latitude: marker.latlng.latitude,
                                        longitude: marker.latlng.longitude
                                    }}
                                    title={marker.title}
                                />
                            )
                        })

                    }

                </MapView>
                {
                    this.props.MapStore.markerSet ?
                        <SavePinArea></SavePinArea>
                        :
                        <View></View>
                }
            </View>
        )
    }
}

// {
//     this.state.markers.forEach(marker => {
//         <Marker
//             coordinate={{
//                 latitude: 38.4714083,
//                 longitude: 27.229055
//             }}
//             title="test 1"
//         />
//     })

// }

export default MapScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    map: {
        flex: 1
    }
})
