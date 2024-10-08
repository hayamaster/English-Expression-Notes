import { Link } from "react-router-dom";

const getTime = (note) => {
  return new Date(note.updated).toLocaleDateString();
};

const getTitle = (note) => {
  const title = note.body.split("\n")[0];

  return title;
};

const getContent = (note) => {
  const title = getTitle(note);
  const content = note.body.replaceAll("\n", " ").replaceAll(title, "");

  return content;
};

const ListItem = ({ note }) => {
  return (
    <Link to={`note/${note.id}`}>
      <div className="notes-list-item">
        <h3 className="title">{getTitle(note)}</h3>
        <p>
          <span>{getTime(note)}</span>
          <span className="content">{getContent(note)}</span>
        </p>
      </div>
    </Link>
  );
};

export default ListItem;
