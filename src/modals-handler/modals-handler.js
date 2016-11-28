

export default class ModalsHandler {
  constructor() {
    // _ prefix indicates private, don't directly reference these variables
    this._registeredContainers = {};
  }

  /*

  */
  registerModalContainer(containerName, modalContainer) {
    this._registeredContainers[containerName] = modalContainer;
  }

  /*

  */
  isModalVisible(containerName, modalName) {
    let component = this._registeredContainers[containerName];
    if(component === undefined) return false;
    let newState = component.state;
    if(newState.visibleModalNames.indexOf(modalName) !== -1){
      return true;
    }
    return false;
  }

  /*

  */
  showModal(containerName, modalName) {
    let component = this._registeredContainers[containerName];
    let newState = component.state;
    if(newState.visibleModalNames.indexOf(modalName) === -1){
      newState.visibleModalNames.push(modalName);
    }
    component.setState(newState);
  }

  /*

  */
  hideModal(containerName, modalName) {
    let component = this._registeredContainers[containerName];
    let newState = component.state;
    let index = newState.visibleModalNames.indexOf(modalName);
    if(index > -1){
      newState.visibleModalNames.splice(index, 1);
    }
    component.setState(newState);
  }




}
