import NotesAPI from "./notesapi.js";
import NotesView from "./notesview.js";
export default class App {
     constructor(root) {
          this.notes = [];
          this.activeNote = null;
          this.view = new NotesView(root, this._handlers());
          this._refreshNotes()
     }

     _refreshNotes () {
          const notes = NotesAPI.getAllNotes();
          // set notes :
          this._setNotes(notes);
          // set active note
          if(notes.length > 0) {
               this._setActiveNotes(notes[0]);
          }
     }
          _setActiveNotes(note) {
          this.activeNote = note = note;
          this.view.updateActiveNote(note);
          }
          _setNotes(notes) {
          this.notes = notes;
          this.view.updateNoteList(notes);
          this.view.updateNotePreviewVisibility(notes.length > 0);
          }

     _handlers() {
          return {
               onNoteAdd : () => {
                    const newNote = {
                         title: "New Note",
                         body: "Take Some Note",
                    }
                    NotesAPI.saveNote(newNote);
                    this._refreshNotes();
               },
               onNoteEdit : (newTitle , newBody) => {
                         NotesAPI.saveNote({
                              id: this.activeNote.id,
                              title: newTitle,
                              body: newBody,
                         });
                         this._refreshNotes();
                    },
               onNoteSelect : (noteId) => {
                         const selectedNote = this.notes.find(n => n.id == noteId);
                         this._setActiveNotes(selectedNote);
                    },
               onNoteDelete : (noteId) => {
                        NotesAPI.deleteNote(noteId);
                        this._refreshNotes();
                    },
          }
     }
}