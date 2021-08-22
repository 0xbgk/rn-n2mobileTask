import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';
import AppStyles from '../../styles/AppStyles';

const {
    BUTTON_BLUE_COLOR,
    BORDER_RADIUS,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR
} = AppStyles;


@inject('MapStore')
@observer
export default class PasswordInputArea extends Component {

    constructor(props) {
        super(props)
        this.setText = this.setText.bind(this)
    }

    state = {
        password: ""
    }
    
    setText(text) {
        this.setState({
            password: text
        });
    }

    render() {

        const { textInputContainer, inputStyle } = styles;

        return (
            <View
                style={textInputContainer}>
                <TextInput
                    style={inputStyle}
                    placeholder={
                        (this.props.placeholder != null ?
                            this.props.placeholder :
                            'Default Placeholder').toString()
                    }
                    onChangeText={(text) => this.setText(text)}
                    secureTextEntry={
                        this.props.loginType == "password" ?
                            true :
                            false
                    }
                    value={this.state.password}
                />
            </View>
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
    textInputContainer: {
        zIndex: 1001,
        height: WINDOW_HEIGHT / 16,
        width: WINDOW_WIDTH - 100,
        backgroundColor: BUTTON_BLUE_COLOR,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 3,
        borderRadius: BORDER_RADIUS,
        opacity: 0.9
    },
    inputStyle: {
        flex: 1,
        fontSize: 20,
        height: WINDOW_HEIGHT / 16,
        width: WINDOW_WIDTH - 100,
        textAlign: "center",
        fontWeight: 'bold',
        borderRadius: BORDER_RADIUS,
        // borderColor: FONT_COLOR_FULL,
        // backgroundColor: FONT_COLOR_FULL
    },

})