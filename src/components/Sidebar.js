import React from "react";

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => (
        <div key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <div className="time-text">
                    <input 
                        type="text" 
                        value={note.title} 
                        onChange={(e) => props.updateTitle(note.id, e.target.value)} 
                        className="note-title-input"
                        onClick={(e) => e.stopPropagation()}
                    />
                    <h6 className="time">
                        {note.time}
                    </h6>
                </div>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.onDelete(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>
    ));

    return (
        <section className="pane sidebar">
            <div className="sidebar--header">
                <h3>Notes App</h3>
                <button className="new-note" onClick={props.newNote}>+</button>
            </div>
            {noteElements}
        </section>
    );
}
