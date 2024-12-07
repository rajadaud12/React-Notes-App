import React, { useState, useEffect } from "react";
import MDEditor from "@uiw/react-md-editor";

export default function Editor({ currentNote, updateNote }) {
    // Use the current note's body as initial state
    const [content, setContent] = useState(currentNote.body);

    // Update local state and save note when currentNote changes
    useEffect(() => {
        setContent(currentNote.body);
    }, [currentNote.id]);

    const handleContentChange = (value) => {
        const newContent = value || ""; // Ensure it's always a string
        setContent(newContent);
        updateNote(newContent);
    };

    return (
        <section className="pane editor" data-color-mode="light">
            <MDEditor
                value={content}
                onChange={handleContentChange}
                height={'90vh'}
                preview="edit"
                fullscreen={false}
                theme="light"
                data-color-mode="light"
            />
        </section>
    );
}