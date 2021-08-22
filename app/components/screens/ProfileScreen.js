import { inject, observer } from 'mobx-react';
import React, { Component } from 'react';
import { Text, View, ScrollView, StyleSheet, SafeAreaView } from 'react-native';
import AppStyles from '../../styles/AppStyles'
import { ScreenName } from '../../constants/Enums';
import EditProfileArea from '../utils/EditProfileArea';
import ButtonArea from '../utils/ButtonArea';
import FirebaseUtil from '../utils/FirebaseUtil'

const {
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR
} = AppStyles;

@inject('ProfileStore', 'MapStore')
@observer
export class ProfileScreen extends Component {

    constructor(props) {
        super(props)
        this.signOut = this.signOut.bind(this)
        this.getData = this.getData.bind(this)
    }

    componentDidMount() {
        this.props.ProfileStore.getCurrentUser();
    }

    signOut() {
        FirebaseUtil.signOut();
    }

    getData() {
        this.props.MapStore.getMarkersByUserId();
    }

    render() {

        const { container, pinContainer, pinHeader, pinText } = styles;

        return (
            <SafeAreaView style={container}>
                <View style={pinHeader}>
                    <Text style={pinText}>
                        Profile
                    </Text>
                </View>

                <EditProfileArea>

                </EditProfileArea>

                <ButtonArea buttonText="data" onPressFunction={() => {
                    this.getData();
                    // this.props.navigation.navigate(ScreenName.LOGIN)
                }} />

                <ButtonArea buttonText="LOGOUT" onPressFunction={() => {
                    this.signOut();
                    // this.props.navigation.navigate(ScreenName.LOGIN)
                }} />
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
        fontSize: 32,
        color: 'white',
        fontWeight: 'bold'
    }
})


export default ProfileScreen
