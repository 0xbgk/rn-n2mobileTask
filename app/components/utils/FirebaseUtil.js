import auth, { firebase } from '@react-native-firebase/auth';
import database from '@react-native-firebase/database';
import { Alert } from 'react-native';


export default class FirebaseUtil {

    static signIn = (email, password) => {
        // console.log(email)
        // console.log(password)
        return auth().signInWithEmailAndPassword(email, password)
            .then(() => {
                // console.log('giris basarili')
            })
            .catch((error) => {
                // Alert.alert(
                //     'Error',
                //     'Invalid Email or Password',
                // );
                Alert.alert(
                    'Error',
                    error.message,
                );
                // console.log(error.code);
                // console.log(error.message);
            });
    };

    static signUp = (email, password) => {

        let err_message = "";

        return auth().createUserWithEmailAndPassword(email, password)
            .then(() => {

            })
            .catch((error) => {
                // if (error.code === 'auth/email-already-in-use') {
                //     console.log('That email address is already in use!');
                //     err_message = "That email address is already in use!"
                // }

                // if (error.code === 'auth/invalid-email') {
                //     // console.log('That email address is invalid!');
                //     err_message = "That email address is invalid!"
                // }
                Alert.alert(
                    'Error',
                    error.message,
                );
                // console.log(error);            
            });;
    };

    static signOut = () => {
        return auth().signOut().then(() => {

        });
    };

    static changePassword = (newPassword) => {
        const user = firebase.auth().currentUser;
        // const newPassword = getASecureRandomPassword();

        user.updatePassword(newPassword).then(() => {
            // Update successful.
            Alert.alert(
                'Done',
                'Successfully changed',
            );
        }).catch((error) => {
            // An error ocurred
            // ...
            Alert.alert(
                'Error',
                error.message,
            );
        });

    }

    static getCurrentUser = () => {
        return firebase.auth().currentUser;
        /*
        displayName
        email
        emailVerified
        isAnonymous
        metadata
        phoneNumber
        photoURL
        providerData
        */
    }

    // static getMarkersByUserId = () => {

    //     let uid = this.getCurrentUser().uid;

    //     let data = [];

    //     database()
    //         .ref(`/users/${uid}`)
    //         .once('value')
    //         .then(snapshot => {
    //             // console.log('User data: ', snapshot.val());                
    //             return JSON.stringify(snapshot.val());
    //         });

    // }
}