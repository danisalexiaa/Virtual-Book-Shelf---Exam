import "./book.css";

function Book(props){
    const {item}=props;
    return(
        <div className="book">
            <div className="titlu">
                {item.titlu}
            </div>
            <div className="gen">
                {item.gen}
            </div>
            <div className="url">
                {item.url}
            </div>
            <div className="shelf">
                {item.virtualShelfId}
            </div>
        </div>
    )
}

export default Book;