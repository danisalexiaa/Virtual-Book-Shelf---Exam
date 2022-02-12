import { useState } from "react";
import "./UpdateVS.css";

function UpdateVS(props) {
    const { onUpdate } = props;
    const [id, setId] = useState(0);
    const [descriere, setDescriere] = useState("");
    const [data, setData] = useState("");

    const updateVS = () => {
        onUpdate({
            descriere,
            data,
            id
        })
    }

    return(
        <div className="vs-form-update">
            <h5>Update virtual shelf</h5>
            <div className="id">
                <input type="text" placeholder="id" onChange={(evt)=>setId(evt.target.value)}></input>
            </div>
            <div className="descriere">
                <input type="text" placeholder="descriere" onChange={(evt)=>setDescriere(evt.target.value)}></input>
            </div>
            <div className="data">
                <input type="text" placeholder="data" onChange={(evt)=>setData(evt.target.value)}></input>
            </div>
            <div className="update">
                <input type = "button" value="Update" onClick={updateVS}></input>
            </div>
        </div>
    )
}

export default UpdateVS;