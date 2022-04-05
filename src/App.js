import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);

	const [newNote, setNewNote] = useState("");

	const [showAll, setShowAll] = useState(true);

	useEffect(() => {
		console.log("effect");
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
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
		};

		noteService.create(newObject).then((returnedNote) => {
			setNotes(notes.concat(returnedNote));
			setNewNote("");
		});
	};

	const toggleImportanceOf = (id) => {
		console.log(`Importance of id ${id} needs to be toggled`);

		const note = notes.find((note) => note.id === id);
		const changedNote = { ...note, important: !note.important };

		noteService.update(id, changedNote).then((returnedNote) => {
			setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
		});
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
					<Note
						key={note.id}
						note={note}
						toggleImportance={() => toggleImportanceOf(note.id)}
					/>
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
