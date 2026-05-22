'use client'
import React from "react";
import { useParams } from "next/navigation";
import Pagebuilder from "@/app/components/sitebuilder/pageBuilder";
function Template() {
  const params = useParams()
  return (
    <div className="App">
      {/* <GrapesjsMain/> */}
      <Pagebuilder templetId={params.templetId} />
    </div>
  );
}

export default Template;
