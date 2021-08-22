import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import { Text, View, StyleSheet, TextInput, Alert, ScrollView } from 'react-native'
import ButtonArea from './ButtonArea';
import FirebaseUtil from './FirebaseUtil'
import AppStyles from '../../styles/AppStyles'

const {
    BUTTON_BLUE_COLOR,
    BORDER_RADIUS,
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR,
    FONT_COLOR_FULL
} = AppStyles;

@inject('MapStore', 'ProfileStore')
@observer
export class EditProfileArea extends Component {

    constructor(props) {
        super(props)
        this.changePassword = this.changePassword.bind(this)
        this.setPassword = this.setPassword.bind(this)
    }

    state = {
        password: ""
    }

    setPassword(password) {
        this.setState({
            password
        })
    }

    changePassword() {
        FirebaseUtil.changePassword(this.state.password)
    }

    render() {
        const { container, topHalf, bottomHalf, inputStyle } = styles
        return (
            <View style={container}>
                <View style={topHalf}>
                    <View style={{ flexDirection: 'row' }}>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Email: </Text>
                        <Text style={{ fontSize: 20, fontWeight: 'bold', color: FONT_COLOR_FULL }}>
                            {this.props.ProfileStore.user ? this.props.ProfileStore.user.email : ""}
                        </Text>
                    </View>
                </View>
                <View style={bottomHalf}>

                    <Text style={{ fontSize: 28, fontWeight: 'bold', color: 'white', marginBottom: 5, alignContent: 'center' }}>
                        Change Password
                    </Text>

                    <TextInput
                        style={inputStyle}
                        placeholder="new password"
                        onChangeText={(text) => this.setPassword(text)}
                        secureTextEntry={true}
                        value={this.state.password}
                    />
                    <ButtonArea buttonText="Change" onPressFunction={() => {
                        // console.log('sifreyi degistir.')
                        if (this.state.password == "") {
                            Alert.alert(
                                'Error',
                                'Please enter value!',
                            );
                        }
                        else {
                            this.changePassword();

                        }
                    }}></ButtonArea>
                </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,

    },
    topHalf: {
        flex: 3,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'

    },
    bottomHalf: {
        flex: 5,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    inputStyle: {
        marginBottom: 20,
        fontSize: 20,
        height: WINDOW_HEIGHT / 16,
        width: WINDOW_WIDTH - 100,
        textAlign: "center",
        fontWeight: 'bold',
        borderRadius: BORDER_RADIUS,
        // borderColor: FONT_COLOR_FULL,
        backgroundColor: FONT_COLOR_FULL
    }
})

export default EditProfileArea
