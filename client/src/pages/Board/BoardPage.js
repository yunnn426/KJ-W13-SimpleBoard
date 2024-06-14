import React from "react";
import Navbar from "../../components/Navbar";
import BoardForm from "./BoardForm";

const BoardPage = () => {
    const title = "Board";

    return (
        <div>
            <Navbar title={title}/>
            <div className="page-container">
                <BoardForm />
            </div>
        </div>
    )
}

export default BoardPage;