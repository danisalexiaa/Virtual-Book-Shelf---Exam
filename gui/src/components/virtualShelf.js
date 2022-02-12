import "./virtualShelf.css";
import { useState, useEffect } from "react";

function VirtualShelf(props){
    const {item}=props;
    const {onSet}=props;
    const [id, setId] = useState(item.id);

    const setare = () => {
        onSet({
            id
        })
    }
    return(
        <div className="virtualShelf">
            <div className="descriere">
                {item.descriere}
            </div>
            <div className="data">
                {item.data}
            </div>
            <input type = "button" value="Afisare carti" onClick={setare}></input>
        </div>
    )
}

export default VirtualShelf;