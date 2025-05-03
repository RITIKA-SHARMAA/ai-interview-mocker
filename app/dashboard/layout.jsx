import React from "react";
import {UserButton} from "@clerk/nextjs";
import Header from "./_components/Header";

function DashboardLayout({ children }) {
  return (
    <div>
        <Header />
        <children />
        <UserButton></UserButton>
    </div>
  );
}

export default DashboardLayout;