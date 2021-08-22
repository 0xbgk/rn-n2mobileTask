import React, { Component } from 'react'
import { Text, View, StyleSheet } from 'react-native'
import ButtonArea from './ButtonArea';
import TextInputArea from './TextInputArea'

export class LoginForm extends Component {
    render() {
        const { container } = styles
        return (
            <View style={container}>
                <TextInputArea placeholder="Email" value=""></TextInputArea>
                <TextInputArea placeholder="Şifre" value="" loginType="password"></TextInputArea>
                <ButtonArea buttonText="Kaydet!"></ButtonArea>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: 'absolute',
        bottom: 0,
        left: 50
    }
})

export default LoginForm
