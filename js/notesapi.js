const notes = [
     {
          id: 1, 
          title: "First Note", 
          body: "this is first note",
          updated: "2023-04-24T20:11:47.139Z",
     },
     {
          id: 2, 
          title: "Second Note", 
          body: "this is second note",
          updated: "2024-02-24T20:11:47.139Z",
     },
     {
          id: 3, 
          title: "Third Note", 
          body: "this is Third note",
          updated: "2024-03-24T20:11:47.139Z",
     },
];

export default class NotesAPI {
     static getAllNotes() {
        const savedNotes =  JSON.parse(localStorage.getItem("notes-app")) || [];
        return savedNotes.sort((a,b) => {
          return new Date(a.updated) > new Date(b.updated) ? -1 : 1;
        })
     };

     static saveNote(noteToSave) {
          // existed or not
          const notes = NotesAPI.getAllNotes();
          const existedNote = notes.find(n => n.id == noteToSave.id);
          if(existedNote) {
               existedNote.title = noteToSave.title;
               existedNote.body = noteToSave.body;
               existedNote.updated = new Date().toISOString();

          } else {
               noteToSave.id = new Date().getTime();
               noteToSave.updated = new Date().toISOString();
               notes.push(noteToSave);
          }
          localStorage.setItem("notes-app" , JSON.stringify(notes));
     };

     static deleteNote(id) {
          const notes = NotesAPI.getAllNotes();
          const filteredNotes = notes.filter((n) => n.id != id); // 1!== 2, 3!==2
          localStorage.setItem("notes-app", JSON.stringify(filteredNotes));
        };
};