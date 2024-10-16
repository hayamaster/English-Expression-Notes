import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";

const NotePage = () => {
  const { id: noteId } = useParams();
  const navigate = useNavigate();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      if (noteId === "new") return;

      const data = await fetch(`/api/notes/${noteId}`).then((res) =>
        res.json()
      );

      setNote(data);
    };

    getNote();
  }, [noteId]);

  const createNote = async () => {
    await fetch(`/api/notes/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const updateNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(note),
    });
  };

  const deleteNote = async () => {
    await fetch(`/api/notes/${noteId}/`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    navigate("/");
  };

  const handleSave = async () => {
    if (noteId !== "new" && note.body === "") {
      await deleteNote();
    } else if (noteId !== "new") {
      await updateNote();
    } else if (noteId === "new" && note) {
      await createNote();
    }

    navigate("/");
  };

  const handleChange = (e) => {
    setNote((note) => ({ ...note, body: e.target.value }));
  };

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <ArrowLeft onClick={handleSave} />
        </h3>
        {noteId !== "new" ? (
          <button onClick={deleteNote}>Delete</button>
        ) : (
          <button onClick={handleSave}>Done</button>
        )}
      </div>
      <textarea onChange={handleChange} value={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
