import { useEffect, useState } from "react";
import Book from "./book";
import "./bookList.css"
import BookForm from "./bookForm";
import UpdateBook from "./UpdateBook";
import DeleteBook from "./DeleteBook";

const SERVER = `${window.location.protocol}//${window.location.hostname}:${window.location.port}/api`

function BookList(props) {
    const [books, setBooks] = useState([]);
    const { id } = props;
    const [id1, setId1] = useState(id);
    const getBooks = async() => {
        const response = await fetch(`${SERVER}/book`);
        const data = await response.json();
        setBooks(data);
    }

    const addBook = async(idParinte, book) => {
        await fetch(`${SERVER}/virtualShelf/${idParinte}/book`, {
        // await fetch(`${SERVER}/books`, {
            method: "post",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        getBooks();
    }
    const updateBook = async(idParinte, book) => {
        await fetch(`${SERVER}/virtualShelf/${idParinte}/book/${book.id}`, {
            method: "put",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(book)
        })
        getBooks();
    }

    const deleteBook = async(idParinte, id) => {
        await fetch(`${SERVER}/virtualShelf/${idParinte}/book/${id}`, {
            method: "delete",
            headers: {
                "Content-Type": "application/json"
            }
        })
        getBooks();
    }

    useEffect(() => {
        setId1(id);
        getBooks();
    }, [id])
    return ( 
        <div className="book-list"> {
            books
            .filter((val) => { if (val.VirtualShelfId == id.id) return val })
            .map(e => <Book key={e.id} item={e}></Book>)
            } 
            <BookForm onAdd={addBook}></BookForm> 
            <UpdateBook onUpdate={updateBook}></UpdateBook>
            <DeleteBook onDelete={deleteBook}></DeleteBook>
        </div>
        )
    }

    export default BookList;