import { useState } from "react";
import "./UpdateBook.css";

function UpdateBook(props) {
    const { onUpdate } = props;
    const [id, setId] = useState(0);
    const [idParinte, setIdParinte] = useState(0);
    const [titlu, setTitlu] = useState("");
    const [gen, setGen] = useState("");
    const [url, setUrl] = useState("");

    const updateBook = () => {
        onUpdate(
            idParinte
            ,{
            id,
            titlu,
            gen,
            url
        })
    }

    return(
        <div className="book-form-update">
            <h5>Update Book</h5>
            <div className="id">
                <input type="text" placeholder="idParinte" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
            </div>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="titlu">
                <input type="text" placeholder="titlu" onChange={(evt)=>setTitlu(evt.target.value)}></input>
            </div>
            <div className="gen">
                <input type="text" placeholder="gen" onChange={(evt)=>setGen(evt.target.value)}></input>
            </div>
            <div className="url">
                <input type="text" placeholder="url" onChange={(evt)=>setUrl(evt.target.value)}></input>
            </div>
            <div className="update">
                <input type = "button" value="Update" onClick={updateBook}></input>
            </div>
        </div>
    )
}

export default UpdateBook;