import React from "react";
 import {UserButton} from "@clerk/nextjs";

function Dashboard({ children }) {
    return (
        <div>
            Dashboard
            <UserButton/>
        </div>
    );
}

export default Dashboard;