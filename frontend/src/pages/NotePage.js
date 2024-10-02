import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { ReactComponent as ArrowLeft } from "../assets/arrow-left.svg";
import { Link } from "react-router-dom";

const NotePage = () => {
  const { id: noteId } = useParams();
  const [note, setNote] = useState(null);

  useEffect(() => {
    const getNote = async () => {
      const data = await fetch(`/api/notes/${noteId}`).then((res) =>
        res.json()
      );

      setNote(data);
    };

    getNote();
  }, [noteId]);

  return (
    <div className="note">
      <div className="note-header">
        <h3>
          <Link to="/">
            <ArrowLeft />
          </Link>
        </h3>
      </div>
      <textarea defaultValue={note?.body}></textarea>
    </div>
  );
};

export default NotePage;
