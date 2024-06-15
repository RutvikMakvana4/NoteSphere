export default class NoteListResource {
  constructor(data) {
    this.notes =
      data !== null
        ? data.map((data) => {
            return {
              _id: data._id,
              title: data.title,
              content: data.content,
              tags: data.tags,
              isPinned: data.isPinned,
              createdOn: data.createdAt,
            };
          })
        : null;
  }
}
