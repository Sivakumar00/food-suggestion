import { observable, action } from 'mobx';

export interface IStore {}

class Store implements IStore {
  @observable isConnected = true;
  @observable isRedirectedToLogin = false;
  @observable apiKey = '';
}
const observableListStore = new Store();
export default observableListStore;
