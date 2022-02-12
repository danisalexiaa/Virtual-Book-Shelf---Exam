import { useEffect, useState } from "react";
import VirtualShelf from "./virtualShelf";
import "./virtualShelfList.css"
import VirtualShelfForm from "./virtualShelfForm";
import UpdateVirtuahShelf from "./UpdateVS";
import DeleteVirtualShelf from "./DeleteVirtualShelf"
import BookList from "./bookList.js";

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`

function VirtualShelfList() {
    const [virtualShelf,setVirtualShelf] = useState([]);
    const [id1,setId]=useState(0);
    const [filter1,setFilter1]=useState("");
    const [filter2,setFilter2]=useState("");
    const [sort,setSort]=useState(0);
    const getVirtualShelf = async () =>{
        const response = await fetch(`${SERVER}/virtualShelf`);
        const data = await response.json();
        setVirtualShelf(data);
    }

    const getVirtualShelfFiltered = async () =>{
        const response = await fetch(`${SERVER}/virtualShelf?filterDescriere=${filter1}&filterData=${filter2}`);
        const data = await response.json();
        setVirtualShelf(data);
    }

    const addVirtualShelf = async(virtualShelf)=>{
        await fetch(`${SERVER}/virtualShelf`, {
            method: "post",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(virtualShelf)
        })
        getVirtualShelf();
    }

    const updateVirtualShelf = async(virtualShelf)=>{
        await fetch(`${SERVER}/virtualShelf/${virtualShelf.id}`, {
            method: "put",
            headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(virtualShelf)
        })
        getVirtualShelf();
    }

    const deleteVirtualShelf = async(virtualShelf)=>{
        await fetch(`${SERVER}/virtualShelf/${virtualShelf.id}`, {
            method: "delete",
            headers: {
                "Content-Type":"application/json"
            },
            // body: JSON.stringify(virtualShelf)
        })
        getVirtualShelf();
    }

    const updateId = async(id)=>{
        setId(id);
    }

    useEffect(()=>{
        getVirtualShelf();
    },[])
    return(
        <div className="virtualShelf-list">
            <div className="filter">
                <h5>Filter</h5>
                <div className="descriere">
                    <input type="text" placeholder="descriere" onChange={(evt)=>setFilter1(evt.target.value)}></input>
                </div>
                <div className="data">
                    <input type="text" placeholder="data" onChange={(evt)=>setFilter2(evt.target.value)}></input>
                </div>
                <div className="filter">
                    <input type = "button" value="Filter" onClick={()=>{if(filter1 !=="" && filter2!=="")getVirtualShelfFiltered()}}></input>
                </div>
                <div className="sort">
                    <input type = "button" value="Sort Shelf ASC/DESC" onClick={()=>{if(sort===0){setSort(1)}else {setSort(0)}}}></input>
                </div>
            </div>
            {
                virtualShelf.sort((a,b)=>{if(sort===1){return a.data>b.data?1:((b.data>a.data)?-1:0)}else return a.data<b.data?1:((b.data<a.data)?-1:0)}).map(e=><VirtualShelf key={e.id} item={e} onSet={updateId}></VirtualShelf>)
            }
            <VirtualShelfForm onAdd={addVirtualShelf}></VirtualShelfForm>
            <UpdateVirtuahShelf onUpdate={updateVirtualShelf}></UpdateVirtuahShelf>
            <DeleteVirtualShelf onDelete={deleteVirtualShelf}></DeleteVirtualShelf>
            <BookList id={id1}></BookList>
        </div>
    )
}

export default VirtualShelfList;