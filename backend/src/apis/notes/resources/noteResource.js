export default class NoteResource {
  constructor(data) {
    this._id = data._id;
    this.title = data.title;
    this.content = data.content;
    this.tags = data.tags;
    this.isPinned = data.isPinned;
  }
}
