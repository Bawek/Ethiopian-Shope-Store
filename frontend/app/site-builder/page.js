"use client";
import React from "react";
import "../../../styles/page.css";
import Pagebuilder from "../components/sitebuilder/pageBuilder";
import { useParams } from "next/navigation";
function App() {
  const params = useParams()
 const templates= {
    "id": "template-123",
    "pages": [
      {
        "name": "Home",
        "html": "<div><h1>Welcome to Our Store</h1><p>Shop amazing Ethiopian products.</p></div>",
        "css": "h1 { color: #2c3e50; } p { font-size: 18px; }"
      },
      {
        "name": "Products",
        "html": "<div><h2>Our Bestsellers</h2></div>",
        "css": "h2 { color: #3498db; }"
      }
    ]
  }
  
  return (
    <div className="App">
      {/* <GrapesjsMain/> */}
      <Pagebuilder templetId={params.templetId} />
    </div>
  );
}

export default App;
