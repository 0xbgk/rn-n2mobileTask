import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import AppStyles from '../../styles/AppStyles';

const {
    BUTTON_BLUE_COLOR,
    BORDER_RADIUS,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR
} = AppStyles;

export default class ButtonArea extends Component {
    render() {

        const { buttonContainer, buttonText } = styles;

        return (
            <TouchableOpacity
                touchSoundDisabled={true}
                onPress={this.props.onPressFunction}
                style={buttonContainer}>
                <Text style={buttonText}>
                    {
                        (this.props.buttonText != null ?
                            this.props.buttonText :
                            'Default Text').toString()
                    }
                </Text>
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
        zIndex: 1001,
        height: WINDOW_HEIGHT / 16,
        width: WINDOW_WIDTH - 100,
        backgroundColor: BUTTON_BLUE_COLOR,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 5,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9
    },
    buttonText: {
        fontSize: 26,
        color: BACKGROUND_COLOR,
        fontWeight: 'bold'
    },

})