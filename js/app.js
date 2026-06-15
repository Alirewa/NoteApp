import NotesAPI from "./notesapi.js";
import NotesView from "./notesview.js";

export default class App {
  constructor(root) {
    this.notes = [];
    this.activeNote = null;
    this.searchQuery = "";
    this.view = new NotesView(root, this._handlers());
    this._refreshNotes();
  }

  _refreshNotes() {
    const allNotes = NotesAPI.getAllNotes();

    const filtered = this.searchQuery
      ? allNotes.filter(n =>
          (n.title || "").toLowerCase().includes(this.searchQuery.toLowerCase()) ||
          (n.body || "").toLowerCase().includes(this.searchQuery.toLowerCase())
        )
      : allNotes;

    this.view.updateNoteList(filtered);

    if (allNotes.length > 0) {
      const activeStillExists = this.activeNote && allNotes.find(n => n.id === this.activeNote.id);
      if (activeStillExists) {
        this.view.updateActiveNote(this.activeNote);
      } else {
        const firstNote = filtered.length > 0 ? filtered[0] : allNotes[0];
        this._setActiveNote(firstNote);
      }
      this.view.updateNotePreviewVisibility(true);
    } else {
      this.activeNote = null;
      this.view.updateNotePreviewVisibility(false);
    }
  }

  _setActiveNote(note) {
    this.activeNote = note;
    this.view.updateActiveNote(note);
  }

  _handlers() {
    return {
      onNoteAdd: () => {
        this.searchQuery = "";
        const newNote = { title: "یادداشت جدید", body: "" };
        NotesAPI.saveNote(newNote);
        this._refreshNotes();
      },
      onNoteEdit: (newTitle, newBody) => {
        if (!this.activeNote) return;
        NotesAPI.saveNote({
          id: this.activeNote.id,
          title: newTitle,
          body: newBody,
        });
        this._refreshNotes();
      },
      onNoteSelect: (noteId) => {
        const selected = this.notes.find
          ? this.notes.find(n => n.id == noteId)
          : null;
        if (selected) {
          this._setActiveNote(selected);
        } else {
          const allNotes = NotesAPI.getAllNotes();
          const found = allNotes.find(n => n.id == noteId);
          if (found) this._setActiveNote(found);
        }
      },
      onNoteDelete: (noteId) => {
        NotesAPI.deleteNote(noteId);
        if (this.activeNote && this.activeNote.id == noteId) {
          this.activeNote = null;
        }
        this._refreshNotes();
      },
      onSearch: (query) => {
        this.searchQuery = query;
        const allNotes = NotesAPI.getAllNotes();
        const filtered = query
          ? allNotes.filter(n =>
              (n.title || "").toLowerCase().includes(query.toLowerCase()) ||
              (n.body || "").toLowerCase().includes(query.toLowerCase())
            )
          : allNotes;
        this.notes = filtered;
        this.view.updateNoteList(filtered);
        if (this.activeNote) {
          const stillVisible = filtered.find(n => n.id === this.activeNote.id);
          if (stillVisible) this.view.updateActiveNote(this.activeNote);
        }
      },
    };
  }
}
