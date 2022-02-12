import { useState } from "react";
import "./DeleteVirtualShelf.css";

function DeleteVirtualShelf(props) {
    const { onDelete } = props;
    const [id, setId] = useState(0);
    const [descriere, setDescriere] = useState("");
    const [data, setData] = useState("");

    const DeleteVirtualShelf = () => {
        onDelete({
            descriere,
            data,
            id
        })
    }

    return(
        <div className="vs-form-delete">
            <h5>Delete virtual shelf</h5>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="delete">
                <input type = "button" value="Delete" onClick={DeleteVirtualShelf}></input>
            </div>
        </div>
    )
}

export default DeleteVirtualShelf;