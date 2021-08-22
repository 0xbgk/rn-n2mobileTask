import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import MarkerInfo from '../utils/MarkerInfo';
import AppStyles from '../../styles/AppStyles'
import { ScreenName } from '../../constants/Enums';
import ChangePasswordArea from '../utils/ChangePasswordArea';

const {
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR
} = AppStyles;

@inject('MapStore')
@observer
export class ProfileScreen extends Component {

    constructor(props) {
        super(props)
    }

    render() {

        const { container, pinContainer, pinHeader, pinText } = styles;

        return (
            <SafeAreaView style={container}>
                <View style={pinHeader}>
                    <Text style={pinText}>
                        Profil
                    </Text>
                </View>
                <ChangePasswordArea>
                    
                </ChangePasswordArea>
            </SafeAreaView>
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
        fontSize: 28,
        color: 'white',
        fontWeight: 'bold'
    }
})


export default ProfileScreen
