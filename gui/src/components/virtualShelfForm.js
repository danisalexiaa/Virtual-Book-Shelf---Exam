import { useState } from "react";
import "./virtualShelfForm.css";

function VirtualShelfForm(props) {
    const { onAdd } = props;
    const [descriere, setDescriere] = useState("");
    const [data, setData] = useState("");

    const addVirtualShelf = () => {
        onAdd({
            descriere,
            data
        })
    }

    return(
        <div className="vs-form">
            <h5>Add Virtual Shelf</h5>
            <div className="descriere">
                <input type="text" placeholder="descriere" onChange={(evt)=>setDescriere(evt.target.value)}></input>
            </div>
            <div className="data">
                <input type="text" placeholder="data" onChange={(evt)=>setData(evt.target.value)}></input>
            </div>
            <div className="add">
                <input type = "button" value="Adauga" onClick={addVirtualShelf}></input>
            </div>
        </div>
    )
}

export default VirtualShelfForm;