import { useState } from "react";
import "./bookForm.css";

function BookForm(props) {
    const { onAdd } = props;
    const [idParinte, setIdParinte] = useState(0);
    const [titlu, setTitlu] = useState("");
    const [gen, setGen] = useState("");
    const [url, setUrl] = useState("");


    const addBook = () => {
        onAdd(
            idParinte,{
            titlu,
            gen,
            url
        })
    }

    return(
        <div className="book-form">
            <h5>Add a book</h5>
            <div className="idParinte">
                <input type="text" placeholder="id virtual shelf" onChange={(evt)=>setIdParinte(evt.target.value)}></input>
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
            <div className="add">
                <input type = "button" value="Adauga" onClick={addBook}></input>
            </div>
        </div>
    )
}

export default BookForm;