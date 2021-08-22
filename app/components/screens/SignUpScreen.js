import React, { Component } from 'react';
import { Text, StyleSheet, View, SafeAreaView, TextInput, Alert, Button, TouchableOpacity } from 'react-native';
import { ScreenName } from '../../constants/Enums';
import FirebaseUtil from '../utils/FirebaseUtil'
import AppStyles from '../../styles/AppStyles'
import ButtonArea from '../utils/ButtonArea';
import auth from '@react-native-firebase/auth';

const {
    WINDOW_WIDTH,
    WINDOW_HEIGHT,
    BACKGROUND_COLOR,
    BORDER_RADIUS,
    HEADER_COLOR,
    FONT_COLOR_FULL
} = AppStyles;

export default class SignUpScreen extends Component {

    constructor(props) {
        super(props);
        this.signUp = this.signUp.bind(this);
        this.setEmail = this.setEmail.bind(this);
        this.setPassword = this.setPassword.bind(this);
        this.onAuthStateChanged = this.onAuthStateChanged.bind(this);
    }

    state = {
        user: null,
        email: "",
        password: ""
    }

    // componentDidMount() {
    //     const subscriber = auth().onAuthStateChanged(this.onAuthStateChanged);

    //     if (this.state.user != null) {
    //         this.props.navigation.navigate(ScreenName.HOME);
    //     }
    //     else {
    //         this.props.navigation.navigate(ScreenName.SIGNIN);
    //     }
    // }

    // componentDidUpdate() {
    //     if (this.state.user != null) {
    //         this.props.navigation.navigate(ScreenName.HOME);
    //     }
    //     else {
    //         this.props.navigation.navigate(ScreenName.SIGNIN);
    //     }
    // }

    setEmail(email) {
        this.setState({
            email
        });
    }

    setPassword(password) {
        this.setState({
            password
        });
    }

    signUp(email, password) {
        FirebaseUtil.signUp(email, password)
    }

    onAuthStateChanged(user) {
        this.setState({
            user
        })
    }

    render() {

        const { loginContainer, loginHeader, loginHeaderText, loginBody, loginBodyText } = styles;

        return (
            <SafeAreaView style={loginContainer}>
                <View style={loginHeader}>
                    <Text style={loginHeaderText}>
                        Sign Up
                    </Text>
                </View>
                <View style={loginBody}>
                    <TextInput
                        style={loginBodyText}
                        placeholder="Email"
                        value={this.state.email}
                        onChangeText={(text) => this.setEmail(text)}
                    />
                    <TextInput
                        style={{ marginBottom: 25, ...loginBodyText }}
                        placeholder="Password"
                        value={this.state.password}
                        onChangeText={(text) => this.setPassword(text)}
                        secureTextEntry={true}
                    />
                    {

                    }
                    <ButtonArea buttonText="Sign Up" onPressFunction={() => {

                        // console.log(this.state.user)

                        if (this.state.email == "" || this.state.password == "") {
                            Alert.alert(
                                'Error',
                                'Please enter value!',
                            );
                        }
                        else {
                            this.signUp(this.state.email, this.state.password)

                            // this.props.navigation.navigate(ScreenName.HOME);
                        }

                    }} />

                </View>
                <View style={{ flex: 0.5, flexDirection: 'row', height: 30, margin: 15, justifyContent: 'center', alignContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'white' }}>
                        Go
                    </Text>
                    <TouchableOpacity style={{ marginLeft: 5 }} onPress={() => {
                        this.props.navigation.navigate(ScreenName.SIGNIN)
                    }}>
                        <Text style={{ fontSize: 14, fontWeight: 'bold', color: 'white' }}>Back!</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    loginContainer: {
        flex: 1,
        backgroundColor: HEADER_COLOR,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    loginHeader: {
        flex: 1,
        margin: 15,
        backgroundColor: HEADER_COLOR,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginBody: {
        flex: 5,
        margin: 15,
        backgroundColor: HEADER_COLOR,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    loginHeaderText: {
        fontSize: 36,
        color: 'white',
        fontWeight: 'bold'
    },
    loginBodyText: {
        fontSize: 20,
        margin: 5,
        height: WINDOW_HEIGHT / 16,
        width: WINDOW_WIDTH - 100,
        backgroundColor: 'white',
        textAlign: "center",
        fontWeight: 'bold',
        borderRadius: BORDER_RADIUS
    }
})
