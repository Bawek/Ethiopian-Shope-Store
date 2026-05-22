'use client'
import { setCurrentPage } from "@/lib/features/admin-my/currentPageSlice";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";

function PageDetail({ page }) {
  const currentPage = useSelector((state) => state.currentPage)
  const dispatch = useDispatch()
  const { name } = page;
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center">
      {/* <Link className="text-decoration-none" href={`/editor/${page.id}`}>
        {name}
      </Link> */}
      <h1>{name}</h1>
      <div>
        <button onClick={() => {
          console.log(currentPage,'now current page')

          dispatch(setCurrentPage({
            id: page.id,
            name: page.name,
            js: "",
            css: page.css,
            html: page.html
          }
          ))
        }
        } className="btn btn-sm btn-outline-primary">
          <i className="fa fa-pencil"></i>
        </button>
        <button className="btn btn-sm btn-outline-danger">
          <i className="fa fa-trash"></i>
        </button>
      </div>
    </li>
  );
}

export default PageDetail;