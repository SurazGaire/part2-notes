import { useState, useEffect } from "react";
import Note from "./components/Note";
import noteService from "./services/notes";

const App = () => {
	const [notes, setNotes] = useState([]);

	const [newNote, setNewNote] = useState("");

	const [showAll, setShowAll] = useState(true);

	const [errorMesssage, setErrorMessage] = useState(null);

	useEffect(() => {
		console.log("effect");
		noteService.getAll().then((initialNotes) => {
			setNotes(initialNotes);
		});
	}, []);

	console.log("render", notes.length, "notes");

	const notesToShow = showAll ? notes : notes.filter((note) => note.important);

	const Notification = ({ message }) => {
		if (message === null) {
			return null;
		}

		return <div className="error">{message}</div>;
	};

	const Footer = () => {
		const footerStyle = {
			color: "green",
			fontStyle: "italic",
			fontSize: 16,
		};
		return (
			<div style={footerStyle}>
				<br />
				<em>
					Note app, Department of Computer Science, University of Helsinki 2022
				</em>
			</div>
		);
	};

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

		noteService
			.update(id, changedNote)
			.then((returnedNote) => {
				setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
			})
			.catch((error) => {
				setErrorMessage(
					`Note : [ ${note.content} ] was already removed from server`
				);
				setTimeout(() => {
					setErrorMessage(null);
				}, 5000);
				setNotes(notes.filter((n) => n.id !== id));
			});
	};

	const handleNoteChange = (e) => {
		console.log(e.target.value);
		setNewNote(e.target.value);
	};

	return (
		<div>
			<h1>Notes</h1>
			<Notification message={errorMesssage} />
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
			<Footer />
		</div>
	);
};

export default App;
