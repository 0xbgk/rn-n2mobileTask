import { action, observable } from 'mobx';


class ProfileStore {
    @observable email = "";
    @observable password = "";

    @action setEmail(value){
        this.email = value
    }

    @action setEmail(value){
        this.email = value
    }
}

export default new ProfileStore();