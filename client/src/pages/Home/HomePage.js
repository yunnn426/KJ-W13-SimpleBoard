import React from "react";
import HomeForm from "./HomeForm";
import Navbar from "../../components/Navbar";

const HomePage = ({ title }) => {
    return (
        <div>
            <Navbar title={title}/>
            <div className="page-container">
                <HomeForm />
            </div>
        </div>
    )
}

export default HomePage;