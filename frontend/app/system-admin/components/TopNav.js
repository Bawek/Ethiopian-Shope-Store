import Link from "next/link";
import { toggleSidebar } from "../api_urls/geditor_utils";
import { Menu } from "lucide-react";
function TopNav() {
  const handleClick = () => {
    toggleSidebar(false);
  };
  return (
    <nav className="navbar navbar-light">
      <div className="container">
        <button
          className="btn btn-sm btn-outline-primary"
          onClick={handleClick}
        >
          <Menu />
        </button>
        <div className="panel__devices bg-white hover:bg-amber-100"></div>
        <div className="panel__editor bg-white hover:bg-amber-100"></div>
        <div className="panel__basic-actions bg-white hover:bg-amber-100 text-black"></div>
        <Link href={'/system-admin/manage-template'} className="border border-red-500 no-underline text-red-500 hover:bg-orange-700 rounded-md hover:text-white px-2 py-1">Go Templates</Link>
      </div>
    </nav>
  );
}

export default TopNav;