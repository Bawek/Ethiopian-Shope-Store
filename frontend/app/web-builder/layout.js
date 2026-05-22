'use client'
import React, { useState } from "react";
import LeftSidebar from "../components/WebBuilder/LeftSidebar";
import RightSidebar from "../components/WebBuilder/RightSidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const WebBuilderLayout = ({ children }) => {  // ✅ Properly destructuring children
  const [Clickedbutton, setClickedbutton] = useState(null);
  const handleSidebarClick = (clickedbtn) => {
    setClickedbutton(clickedbtn);
  };
  return (
    <Card className='min-h-screen min-w-full'>
      <CardContent className="flex h-screen p-4 bg-gray-100 text-gray-900">
        {/* Left Sidebar */}
        <Card className="w-1/5 flex flex-col p-3 bg-white shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>Components</CardTitle>
          </CardHeader>
          <CardContent>
            <LeftSidebar handleSidebarClick={handleSidebarClick} />
          </CardContent>
        </Card>

        {/* Main Editor */}
        <Card className="flex-1 mx-4 bg-white shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle className='text-center'>Drag and Drop Here</CardTitle>
          </CardHeader>
          <CardContent className="min-h-screen flex justify-center items-center">
            {children}  {/* ✅ Properly renders child components */}
          </CardContent>
        </Card>

        {/* Right Sidebar */}
        <Card className="w-1/5 flex flex-col p-3 bg-white shadow-md border border-gray-200">
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <RightSidebar Clickedbutton={Clickedbutton} />
          </CardContent>
        </Card>
      </CardContent>
    </Card>

  );
};

export default WebBuilderLayout;
