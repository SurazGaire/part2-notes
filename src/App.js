import { useState, useEffect } from "react";
import Note from "./components/Note";

import axios from "axios";

const App = () => {
	const [notes, setNotes] = useState([]);

	const [newNote, setNewNote] = useState("");

	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		console.log("effect");
		axios.get("http://localhost:3001/notes").then((response) => {
			console.log("fulfilled");
			setNotes(response.data);
		});
	}, []);

	console.log("render", notes.length, "notes");

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const addNote = (event) => {
		event.preventDefault();
		const newObject = {
			content: newNote,
			date: new Date().toISOString(),
			important: Math.random() < 0.5,
			id: notes.length + 1,
		};
		setNotes(notes.concat(newObject));
		setNewNote("");
	};

	const handleNoteChange = (e) => {
		console.log(e.target.value);
		setNewNote(e.target.value);
	};

	return (
		<div>
			<h1>Notes</h1>
			<button onClick={() => setShowAll(!showAll)}>
				Show {showAll ? "important" : "all"}
			</button>
			<ul>
				{notesToShow.map((note) => (
					<Note key={note.id} note={note} />
				))}
			</ul>
			<form onSubmit={addNote}>
				<input value={newNote} onChange={handleNoteChange} />
				<button type="submit">Save</button>
			</form>
		</div>
	);
};

export default App;
