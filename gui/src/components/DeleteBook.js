import { useState } from "react";
import "./DeleteBook.css";

function DeleteBook(props) {
    const { onDelete } = props;
    const [id, setId] = useState(0);
    const [idParinte, setIdParinte] = useState(0);

    const deleteBook = () => {
        onDelete(
            idParinte,
            id
        )
    }

    return(
        <div className="book-form-delete">
            <h5>Delete Book</h5>
            <div className="id">
                <input type="text" placeholder="idParinte" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
            </div>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="delete">
                <input type = "button" value="Delete" onClick={deleteBook}></input>
            </div>
        </div>
    )
}

export default DeleteBook;