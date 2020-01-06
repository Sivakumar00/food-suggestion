import { observable } from 'mobx';

export interface IStore {}

class HomeStore implements IStore {
  @observable isModalVisible = false;
  @observable modalData: any = {
    image: '',
    data: ''
  };
}
const observableListStore = new HomeStore();
export default observableListStore;
