import { useState } from "react";
import { DndContext, useDroppable } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";
import Backdrop from "./backdrop";
import NavBar from "./NavBar";
import { Button } from "@/components/ui/button";
import AdminNavbar from "../Navbars/AdminNavbar";
import TemplateNavbar from "@/app/[locale]/web-builder/templates/template1/NavBar";
const DroppableContainer = () => {
  const [isMobileView, setMobileView] = useState(false);
  function toggleView(view) {
    if (view === "mobile" && !isMobileView) {
      setMobileView(true);
    } else if (view === "desktop" && isMobileView) {
      setMobileView(false);
    }
  }

  return (
    <section className="min-w-full">
      <NavBar onButtonClick={toggleView} />
      <div className="shadow-md flex justify-center mx-auto  w-full min-h-[91vh] relative bg-neutral-200 rounded-lg">
        <TemplateNavbar />
        {isMobileView && <Backdrop />}
        {isMobileView && (
          <div className=" flex break-words w-80 bg-gray-100 z-10 rounded-2xl text-center h-full absolute"></div>
        )}
      </div>
    </section>
  );
};
export default DroppableContainer;
