export default class UserProfileResource {
  constructor(data) {
    this._id = data._id;
    this.fullName = data.fullName;
    this.email = data.email;
  }
}
