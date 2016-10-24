
const FIRST_NAME_PLACEHOLDER = '[NoName]';

export default class userSessionHandler {
  constructor(reactComponent) {
    // _ prefix indicates private, don't directly reference these variables
    this._reactComponent = reactComponent;
    this._isLoggedIn = false;
    this._authType = undefined;

    this._firstName = FIRST_NAME_PLACEHOLDER;
    this._lastName = undefined;
    this._email = undefined;
  }

  /*
  Returns whether a user is logged in.
  */
  isLoggedIn() {
    return this._isLoggedIn;
  }

  /*
  options:
    isLoggedIn: (boolean)
  */
  loginSet(options={}) {
    if(options.isLoggedIn === true || options.isLoggedIn === false){
      this._isLoggedIn = options.isLoggedIn;
    }else{
      this._isLoggedIn = !this._isLoggedIn;
    }

    options._authType = (options.authType !== undefined) ? options.authType : undefined;

    if(options.response !== undefined){
      console.log(options.response);
      switch(options.authType){
        case 'facebook':
          this._email = (options.response.email !== undefined) ?
            options.response.email : undefined;
          this._firstName = (options.response.name !== undefined) ?
            options.response.name.split(' ')[0] : FIRST_NAME_PLACEHOLDER;
          this._lastName = (options.response.name !== undefined) ?
            options.response.name.split(' ')[1] : undefined;
          break;
        case 'google':
          this._firstName = (options.response.profileObj.givenName !== undefined) ?
            options.response.profileObj.givenName : FIRST_NAME_PLACEHOLDER;
          break;
        case 'mokbnb':
          // TODO: Fix this implementation
          this._firstName = (options.response.firstName !== undefined) ?
            options.response.firstName : FIRST_NAME_PLACEHOLDER;
          break;
      }
    }


    let newState = this._reactComponent.state;
    newState.userSessionHandler = this;
    this._reactComponent.setState(newState);
  }

  /*

  */
  getFirstName() {
    return this._firstName;
  }

  /*

  */
  getAuthType() {
    return this._authType;
  }


}
