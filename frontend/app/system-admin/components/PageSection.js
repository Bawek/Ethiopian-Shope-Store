'use client';
import React, { useState, useReducer, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';
import { setCurrentPage } from "@/lib/features/admin-my/currentPageSlice";
import axios from "axios";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { Pencil, Trash } from "lucide-react";

export default function PageSection({ templateId }) {
  const [show, setShow] = useState(false);
  const [pages, setPages] = useState([]);
  const [name, setName] = useState("");
  const [isValid, setIsValid] = useState(true);
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPage = useSelector((state) => state.currentPage);
  /** 🔹 Fetch Pages */
  useEffect(() => {
    let isMounted = true;
    const fetchPages = async () => {
      try {
        const response = await axios.get(`http://localhost:8000/api/pages/get-by-template/${templateId}`);
        if (isMounted) {
          if (response.data.status === "success") {
            setPages(response.data.pages.length > 0 ? response.data.pages : []);
          }
        }
      } catch (error) {
        toast.error("Something went wrong while fetching pages.");
      }
    };
    fetchPages();
    return () => {
      isMounted = false; // Cleanup to avoid memory leaks
    };
  }, [currentPage, templateId]);

  /** 🔹 Handle Delete Page */
  const handleDeletePage = async (id) => {
    console.log(id, 'id')
    try {
      const response = await axios.delete(`http://localhost:8000/api/pages/delete/${id}`);
      if (response.data.status === "success") {
        setPages((prevPages) => prevPages.filter((page) => page.id !== id));
        toast.success(response.data.message || "Successfully deleted.");
        router.refresh();
      } else {
        toast.error("Something went wrong.");
      }
    } catch (error) {
      toast.error("Something went wrong while deleting.");
    }
  };
  /** 🔹 Handle Create Page */
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      setIsValid(false);
      return;
    }
    const newPage = {
      id: crypto.randomUUID(), // Unique ID
      name,
      html: `
      <section class="hero-section">
          <h1>Welcome to Our Platform</h1>
          <p>Build, customize, and create stunning ${name} pages effortlessly.</p>
          <button class="cta-button">Get Started</button>
      </section>
  `,
      css: `
      body {
          font-family: Arial, sans-serif;
          margin: 0;
          padding: 0;
          background: #f5f7fa;
          color: #333;
          text-align: center;
      }
      .hero-section {
          display: flex;
          flex-direction: column;
          align-items: center;
          height: 100vh;
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          padding: 20px;
          border-radius: 10px;
      }
      .hero-section h1 {
          font-size: 2.5rem;
          margin-bottom: 10px;
      }
      .hero-section p {
          font-size: 1.2rem;
          margin-bottom: 20px;
      }
      .cta-button {
          padding: 12px 24px;
          font-size: 1rem;
          background: #ff7eb3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          transition: 0.3s;
      }
      .cta-button:hover {
          background: #ff5777;
      }
  `,
      js: `
      document.querySelector('.cta-button')?.addEventListener('click', () => {
          alert('Welcome! Let’s start building.');
      });
  `,
      templateId
    };
    try {
      const response = await axios.post('http://localhost:8000/api/pages/register', newPage)
      if (response.data?.status !== "success") {
        closeModal();
        toast({
          title: 'Error',
          description: response.data?.message || 'Something went wrong. please try Again.',
          duration: 2000,
        })
        return
      }

      console.log("pages add", response)
      dispatch(setCurrentPage(newPage));
      setPages([...pages, newPage]);
      closeModal();
    } catch (error) {
      toast({
        title: 'Error',
        description: response.data?.message || 'Something went wrong. please try Again.',
        duration: 2000,
        variant: "destructive"
      })
    }
    closeModal();
    // router.refresh();
  };

  /** 🔹 Close Modal */
  const closeModal = () => {
    setName("");
    setIsValid(true);
    setShow(false); // explicitly close the dialog
  };


  return (
    <div className="my-2 d-flex flex-column">
      <button
        type="button"
        className="btn btn-outline-secondary btn-sm mb-2 mx-2"
        onClick={setShow}
      >
        <i className="fa fa-plus"></i> Add Page
      </button>

      {/* Create Page Dialog */}
      <Dialog open={show} onClose={closeModal} fullWidth maxWidth="sm">
        <form onSubmit={handleSubmit}>
          <DialogTitle>Create Page</DialogTitle>
          <DialogContent>
            <TextField
              label="Name"
              fullWidth
              variant="outlined"
              size="small"
              value={name}
              onChange={(e) => setName(e.target.value)}
              error={!isValid}
              helperText={!isValid ? "Please provide a valid name." : ""}
            />
          </DialogContent>
          <DialogActions>
            <Button variant="contained" color="secondary" onClick={closeModal}>
              Close
            </Button>
            <Button variant="contained" color="primary" type="submit">
              Save Changes
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      {/* Page List */}
      <ul className="list-group pages">
        {pages && pages.length > 0 ?
          (
            pages.map((page) => (
              <li key={page.id} className={`flex justify-between items-center p-2 border-b ${currentPage.name === page.name ? "border-l border-orange-700 bg-orange-100 drop-shadow-lg" : ""}`}>
                {
                  <h5>{page.name}</h5>
                }
                <div className="flex gap-2">
                  <button
                    onClick={() => dispatch(setCurrentPage({
                      id: page.id,
                      name: page.name,
                      js: page.js || "",
                      css: page.css || "",
                      html: page.html || "",
                      templateId
                    }))}
                    className="p-1 text-blue-500 hover:text-blue-900"
                  >
                    <Pencil />
                    {/* <i className="fa fa-pencil"></i> */}
                  </button>
                  <button
                    onClick={() => handleDeletePage(page.id)}
                    className="p-1 text-red-500 hover:text-red-900 rounded"
                  >
                    <Trash />
                    {/* <i className="fa fa-trash"></i> */}
                  </button>
                </div>
              </li>

            ))
          )
          : <p>please add page!.</p>
        }
      </ul>
    </div>
  );
}
