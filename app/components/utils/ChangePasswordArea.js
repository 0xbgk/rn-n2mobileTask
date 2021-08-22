import { inject, observer } from 'mobx-react';
import React, { Component } from 'react'
import { Text, View, StyleSheet, Keyboard } from 'react-native'
import ButtonArea from './ButtonArea';
import PasswordInputArea from './PasswordInputArea'

@inject('MapStore')
@observer
export class ChangePasswordArea extends Component {
    render() {
        const { container, topHalf, bottomHalf } = styles
        return (
            <View style={container}>
                <View style={topHalf}>
                    <Text>SES</Text>
                </View>
                <View style={bottomHalf}>
                    <PasswordInputArea placeholder="Şifre Değiştir" value="" loginType="password"></PasswordInputArea>
                    <ButtonArea buttonText="Kaydet!" onPressFunction={() => {
                        console.log('sifreyi degistir.')
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
        flex: 5
    },
    bottomHalf: {
        flex: 3
    }
})

export default ChangePasswordArea
