import { action, observable } from 'mobx';
import auth from '@react-native-firebase/auth'
import FirebaseUtil from '../components/utils/FirebaseUtil'

class ProfileStore {

    constructor() {
        // console.log('Profile Store initialized')
        // this.getCurrentUser();
    }

    @observable user = null;
    @observable email = "";
    @observable password = "";

    @action setEmail(value) {
        this.email = value
    }

    @action setEmail(value) {
        this.email = value
    }

    @action getCurrentUser() {
        this.user = FirebaseUtil.getCurrentUser()
        console.log(this.user.uid)
    }
}

export default new ProfileStore();