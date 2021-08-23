import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import MarkerInfo from '../utils/MarkerInfo';
import AppStyles from '../../styles/AppStyles'
import { ScreenName } from '../../constants/Enums';
import database from '@react-native-firebase/database';
import FirebaseUtil from '../utils/FirebaseUtil'

const {
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR,
    BUTTON_ORANGE_COLOR,
    ORANGE_COLOR_FULL
} = AppStyles;

@inject('MapStore')
@observer
export class PinsScreen extends Component {

    constructor(props) {
        super(props)
        this.getCurrentMarkers = this.getCurrentMarkers.bind(this);
    }

    state = {
        markers: []
    }

    componentDidMount() {
        // this.props.MapStore.getMarkersByUserId();

        this.getCurrentMarkers()

    }

    componentDidUpdate() {
        this.getCurrentMarkers()
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

    render() {

        const { container, pinContainer, pinHeader, pinText } = styles;

        return (
            <SafeAreaView style={container}>
                <View style={pinHeader}>
                    <Text style={pinText}>
                        My Pins
                    </Text>
                </View>
                <ScrollView style={pinContainer}>
                    {
                        this.state.markers.length > 0 ?
                            this.state.markers.map((marker) => {
                                return (
                                    <MarkerInfo key={marker.id} icon="map-marker-alt" title={marker.title} navigateToMarker={() => {

                                        this.props.MapStore.setPin(marker.latlng)

                                        // console.log(this.props.MapStore.region)

                                        this.props.navigation.navigate(ScreenName.MAP)

                                    }}></MarkerInfo>

                                )
                            }) :
                            <View style={{
                                flex: 1, justifyContent: 'center',
                                alignContent: 'center',
                                alignItems: 'center'
                            }}>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: ORANGE_COLOR_FULL }}>You have no pins yet!</Text>
                                <Text style={{ fontSize: 18, fontWeight: 'bold', color: BUTTON_ORANGE_COLOR, paddingTop: 10 }}>Tap on Map to add one!</Text>
                            </View>
                    }
                </ScrollView>
            </SafeAreaView >
        )
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BACKGROUND_COLOR,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    pinContainer: {
        flex: 9,
        marginBottom: 20
    },
    pinHeader: {
        flex: 0.1,
        margin: 15,
        backgroundColor: BACKGROUND_COLOR,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    pinText: {
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    }
})


export default PinsScreen
