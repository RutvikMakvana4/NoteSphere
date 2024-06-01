export default class RegisterResource {
  constructor(data) {
    this._id = data._id;
    this.fullName = data.fullName;
    this.email = data.email;
  }
}
