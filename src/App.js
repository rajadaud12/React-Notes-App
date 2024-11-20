import React from "react";
import Sidebar from "./components/Sidebar";
import Editor from "./components/Editor";
import Split from "react-split";
import { nanoid } from "nanoid";

export default function App() {
    const [notes, setNotes] = React.useState(
        () => JSON.parse(localStorage.getItem("notes")) || []
    );

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    );

    React.useEffect(() => {
        localStorage.setItem("notes", JSON.stringify(notes));
    }, [notes]);

    function createNewNote() {
        const newNote = {
            id: nanoid(),
            title: "Untitled Note",
            body: "",
            time: new Date().toLocaleString('en-US', {
                year: 'numeric', 
                month: 'long', 
                day: 'numeric', 
                hour: '2-digit', 
                minute: '2-digit',
                second: '2-digit',
                hour12: true
            })
        };
        setNotes(prevNotes => [newNote, ...prevNotes]);
        setCurrentNoteId(newNote.id);
    }

    function updateNote(text) {
        setNotes(oldNotes => {
            const newArray = [];
            for (let i = 0; i < oldNotes.length; i++) {
                if (oldNotes[i].id === currentNoteId) {
                    newArray.unshift({
                        ...oldNotes[i],
                        body: text,
                        time: new Date().toLocaleString('en-US', {
                            year: 'numeric', 
                            month: 'long', 
                            day: 'numeric', 
                            hour: '2-digit', 
                            minute: '2-digit',
                            second: '2-digit',
                            hour12: true
                        })
                    });
                } else {
                    newArray.push(oldNotes[i]);
                }
            }
            return newArray;
        });
    }

    function updateTitle(id, newTitle) {
        setNotes(oldNotes => 
            oldNotes.map(note => 
                note.id === id ? { ...note, title: newTitle } : note
            )
        );
    }

    function deleteNote(event, noteId) {
        event.stopPropagation();

        const isConfirmed = window.confirm("Are you sure you want to delete this note?");
    
        if (isConfirmed) {
            console.log(`${noteId}: Note deleted`);
            setNotes(oldNotes => oldNotes.filter(oldNote => oldNote.id !== noteId));
        } else {
            console.log(`${noteId}: Note deletion canceled`);
        }
    }

    function findCurrentNote() {
        return notes.find(note => note.id === currentNoteId) || notes[0];
    }

    return (
        <main>
            {
                notes.length > 0 
                ? (
                    <Split 
                        sizes={[30, 70]} 
                        direction="horizontal" 
                        className="split"
                    >
                        <Sidebar
                            notes={notes}
                            currentNote={findCurrentNote()}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            onDelete={deleteNote}
                            updateTitle={updateTitle}
                        />
                        {
                            currentNoteId && 
                            notes.length > 0 &&
                            <Editor 
                                currentNote={findCurrentNote()} 
                                updateNote={updateNote} 
                            />
                        }
                    </Split>
                ) : (
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button 
                            className="first-note" 
                            onClick={createNewNote}
                        >
                            Create one now
                        </button>
                    </div>
                )
            }
        </main>
    );
}
