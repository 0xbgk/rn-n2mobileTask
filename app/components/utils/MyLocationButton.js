import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyles from '../../styles/AppStyles';

const {
    BUTTON_BLUE_COLOR,
    ICON_SIZE,
    BORDER_RADIUS
} = AppStyles;

export default class MyLocationButton extends Component {
    render() {

        const { buttonContainer } = styles;

        return (
            <TouchableOpacity
                touchSoundDisabled={true}
                onPress={this.props.onPressFunction}
                style={buttonContainer}>
                <Icon name="map-marker-alt" size={ICON_SIZE*1.5} color={BUTTON_BLUE_COLOR} />
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    buttonContainer: {
        position: 'absolute',
        top: 10,
        left: 10,
        zIndex: 1001,
        height: ICON_SIZE*2,
        width: ICON_SIZE*2,
        backgroundColor: '#ebf2f2',
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        margin: 15,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9
    }
})