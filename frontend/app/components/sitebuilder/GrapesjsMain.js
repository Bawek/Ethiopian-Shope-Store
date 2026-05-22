'use client'
import React, { useEffect, useState, useRef } from "react";
import { grapesjs } from "grapesjs";

import 'grapesjs/dist/css/grapes.min.css';
import dynamicConfig from "./WithGrapesjs";
import "../../../styles/app.css";
import Drawer from "@mui/material/Drawer";
import { TuneOutlined } from "@mui/icons-material";
import { KeyboardBackspaceOutlined } from "@mui/icons-material";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { AddProduct } from "./ProductForm/FormDialogue";
import CustomToaster from "./Toaster/Toaster";
import { useUpdateCustomPageMutation } from "@/lib/features/merchantTemplates/buyedTemplateApi";
import { useGetShopByAccountQuery } from "@/lib/features/shop/shop";
import { useSelector } from "react-redux";
const WithGrapesjs = ({ data, page, templateId, refetch }) => {
  const account = useSelector((state) => state.account)

  const [updateCustomPage] = useUpdateCustomPageMutation();
  // get shop by account
  const { data: shopData } = useGetShopByAccountQuery(account.id)
  const [pageContent, setpageContent] = useState({});

  const [editor, setEditor] = useState(null);
  const [uploadImage, setUploadedImage] = useState([]);
  const handlePageChange = (e) => {
    const selectedPageName = e.target.value;
    refetch()
    if (!selectedPageName) return;

    const selectedPage = page.find((pa) => pa.name === selectedPageName);
    if (!selectedPage) {
      console.warn(`Page "${selectedPageName}" not found.`);
      return;
    }

    // Update local page state
    setpageContent(selectedPage);


    editor.setComponents(selectedPage.html);
    editor.setStyle(selectedPage.css);



    // Update settings drawer state
    setsettingOpen((prev) => ({
      ...prev,
      name: selectedPage.name,
      pageId: selectedPage.id,
    }));
  };



  const conf = {
    storageType: "server",
    storeOnChange: true,
    storeAfterUpload: true,
    credentials: "include",
    multiUpload: true,
    assets: [],
    assetManager: {
      // Basic configuration
      storageType: "server",  // 'local' for localStorage, 'server' for server-side storage
      storeOnChange: true,   // Whether to store assets in the manager automatically when they change
      storeAfterUpload: true, // Store asset after upload
      credentials: "include",  // Credentials for cross-origin requests, can be "same-origin" or "include"
      multiUpload: true,      // Allow multiple files to be uploaded at once
      uploadName: "files",    // Name of the field to be sent during the upload (used in the FormData object)
      dropZone: ".asset-dropzone", // Selector for the drop area where files can be dragged and dropped

      uploadFile: function (e) {
        const files = e.dataTransfer ? e.dataTransfer.files : e.target.files;
        const formData = new FormData();
        Array.from(files).forEach((file) => {
          formData.append("files", file); // Append each file
        });

        // Send the files to the server
        fetch("http://localhost:8000/api/image/upload", {
          method: "POST",
          body: formData,
        })
          .then((response) => response.json())
          .then((data) => {
            console.log('Image upload response:', data.success, data.url);

            // Check if the response contains the expected URL
            if (data.success && data.url) {
              console.log('enter hat')
              const images = [{ type: "image", src: data.url }];
              editor.AssetManager.add(images);  // Add the uploaded image to the AssetManager
            } else {
              console.error("Unexpected response format");
            }
          })
          .catch((error) => {
            console.error("Error uploading files:", error);
          });
      },


      // Customize the asset view in the AssetManager
      assets: [],  // Provide initial assets if any (Array of asset objects)
      upload: true,  // Enable file upload support
      noAssets: "No assets available.",  // Message when no assets are available

      // Asset Manager events
      events: {
        add: 'asset:add',      // Event when an asset is added
        remove: 'asset:remove',  // Event when an asset is removed
        removeBefore: 'asset:remove:before', // Event before asset is removed
        update: 'asset:update',  // Event when an asset is updated
        open: 'asset:open',    // Event when asset manager is opened
      },

      // Customize the appearance of the AssetManager
      stylePrefix: "gjs-am-",  // Prefix for all classes in AssetManager
      // assetCategories: [],  // Categorize assets (optional)

      // Events for asset addition/removal
      onAdd: function (asset) {
        console.log('Asset added:', asset);
      },
      onRemove: function (asset) {
        console.log('Asset removed:', asset);
      },

      // Configuration for asset filters (optional)
      filters: [],  // Array of filter options for assets

      // Configure the pagination of the assets
      pagination: {
        enabled: true, // Enable pagination
        perPage: 10,   // Number of items per page
      },

      // Custom asset renderer (optional)
      // customAssetRenderer: function (asset) {
      //   console.log("Custom asset renderer:", asset);
      //   // You can return your custom DOM element here for rendering the asset
      // },

      // When assets are stored on the server
      // storage: {
      //   type: 'server',  // Can be 'local' or 'server'
      //   urlLoad: '/assets/load',  // URL to load assets from server
      //   urlStore: '/assets/store',  // URL to store assets to server
      //   fetchOptions: (opts) => {
      //     return opts.method === 'POST' ? { method: 'PATCH' } : {};
      //   },
      //   onStore: (data) => {
      //     console.log('Asset data:', data);
      //     return data;  // Return the saved asset data
      //   },
      //   onLoad: (response) => {
      //     console.log('Assets loaded:', response);
      //     return response.assets;  // Return the assets data from the server response
      //   },
      // },
    },
  };



  useEffect(() => {
    if (editor && editor.AssetManager && uploadImage.length > 0) {
      // Map the stored image URLs to the format expected by AssetManager

      // Add the images to the AssetManager
      editor.AssetManager.add(uploadImage);

      // Optionally, clear the uploadImage state if you don't need it anymore
      setUploadedImage([]);
    }
  }, [editor, uploadImage]); // Depend on both editor and uploadImage states

  const initialHtmlState = {
    html: "",
    css: "",
    assets: [],
    custom_body: `<script>console.log('body')</script>`,
    custom_footer: `<script>console.log('footer')</script>`,
    custom_head:
      '<link rel="stylesheet" type="text/css" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">',
  };
  const router = useRouter();
  /** initial mount ref */
  const isInitialMount = useRef(true);

  const [initialComponents, setInitialComponents] = useState(initialHtmlState);
  const [builder, setBuilder] = useState({
    panelRight: false,
  });
  const [settingOpen, setsettingOpen] = useState({
    name: "",
    domain: "",
    pageId: null,
    open: false,
  });

  useEffect(() => {
    if (page) {
      // Filter the data to include only the page with the name "home"
      const homePage = page.find((pa) => pa.name === "Home");
      // If a home page is found, set it as the initial pageContent
      if (homePage) {
        setpageContent(homePage);
      } else {
        // If no home page is found, you can set the first page as the initial pageContent
        // or handle this case as needed
        setpageContent(page[0]);
      }
    }
    if (data) {
      const homePage = data.find((page) => page.name === "Home");
      const pageToRender = homePage;

      setInitialComponents({
        html: pageToRender?.content.html,
        css: pageToRender?.content.css,
        custom_head: pageToRender?.custom_head || "",
        custom_footer: pageToRender?.custom_footer || "",
      });
      setsettingOpen({
        name: pageToRender?.name,
        domain: pageToRender?.customdomain || "",
        open: false,
      });
    }
  }, [data, page]);

  /** Grapes js Initialization */
  const loadGrapesJs = async () => {
    const editor = grapesjs.init({
      ...dynamicConfig(templateId),
      assetManager: conf,

    });
    console.log('the grapes js are called yes thanks')
    // const assetManager = editor.AssetManager.conf;
    setEditor(editor);
    addCommands(editor);
    addDevices(editor);
    isStylesOpen(editor);
    imageUploader(editor);
    addStyleManager(editor);
    onLoad(editor);
    const canvas = editor.Canvas;
    // assetManager.add(assets);
    // setTimeout(addStyleManager(editor),0);
    const selected = editor.getSelected();
    // console.log(editor.getSelected);
    // Scroll smoothly (this behavior can be polyfilled)
    // canvas.scrollTo(selected, { alignToTop : false });
    canvas.scrollTo(selected, { behavior: "smooth" });
    // Force the scroll, even if the element is alredy visible
    canvas.scrollTo(selected, { force: true });
    // editor.StyleManager.getProperty('typography', 'Rubik');
  };


  /** handle open style container */
  const handleopen = () => {
    setBuilder({ ...builder, panelRight: true });
  };

  /** handle close style container */
  const handleClose = () => {
    const ele = window?.editor?.getSelected();
    window.editor?.selectToggle(ele);
    setBuilder({ ...builder, panelRight: false });
  };

  /** after loaading of grapejs  */
  const onLoad = (editor) => {
    console.log('on loaed excuited')
    const categories = editor.BlockManager.getCategories();

    // Assuming `data` is the prop that contains the updated content
    const homePage = data.find((page) => page.name === "home");
    // Set initial HTML in builder using the updated data
    console.log(homePage, 'the home page on the loading errect of man')
    editor.setComponents(homePage?.content.html || "");
    editor.setStyle(homePage?.content.css || "");
    console.log(editor, 'the Editorjjjjj page on the loading errect of man')

    /** Find block categories and make default open false */
    categories.forEach((category) => {
      category.set("open", false).on("change:open", (opened) => {
        opened.get("open") &&
          categories.each((category) => {
            category !== opened && category.set("open", false);
          });
      });
    });
  };

  /** add commands */
  const addCommands = (editor) => {
    const commands = editor.Commands;
    commands.getAll();
    commands.add("set-device-xs", {
      run(editor) {
        console.log('hell mobile clicked')
        editor.setDevice("Mobile");
      },
    });
    commands.add("set-device-sm", {
      run(editor) {
        editor.setDevice("Tablet");
      },
    });
    commands.add("set-device-md", {
      run(editor) {
        editor.setDevice("Medium");
      },
    });
    commands.add("set-device-lg", {
      run(editor) {
        editor.setDevice("Large");
      },
    });
    commands.add("set-device-xl", {
      run(editor) {
        editor.setDevice("Desktop");
      },
    });
    commands.add("open-assset-manager", {
      run(editor) {
        console.log(EventTarget);
        const myCommands = commands.get("core:open-assets");
        myCommands.run(editor, { target: "_blank" });
      },
    });
    return
  };
  // add devices
  const addDevices = (editor) => {
    const deviceManager = editor.DeviceManager;
    deviceManager.add("Mobile", "385px", {
      width: "385px", //width for mobile size
      name: "Mobile", // device name
      widthMedia: "576px", // the width that will be used for the CSS media
    });
  };

  /** component and canvas action events */
  const isStylesOpen = (editor) => {
    editor.on("component:selected", handleopen);
    editor.on("component:deselected", handleClose);
    editor.on("run:preview:before", function () { });
  };

  // add dynamic styles
  const addStyleManager = (editor) => {
    const styleManager = editor.StyleManager;
    // let list = fontProperty.get('list');
    // list.push({ value: 'Manrope, sans-serif', name: 'Manrope' });
    // list.push({ value: 'Nunito, sans-serif', name: 'Nunito' });
    // list.push({ value: 'Segoe UI', name: 'Segoe UI' });
  };

  // Refine the imageUploader function
  const imageUploader = (editor) => {
    // editor.AssetManager.storageType = "server";
    // editor.AssetManager.storeOnChange = true;
    // editor.AssetManager.storeAfterUpload = true;
    // editor.AssetManager.upload = 'http://localhost:8000/shop/upload/';
    // editor.AssetManager.assets = [];

    // editor.AssetManager.uploadFile = function (e) {
    //   var files = e.dataTransfer? e.dataTransfer.files : e.target.files;
    //   var formData = new FormData();

    //   Array.from(files).forEach(file => {
    // 	formData.append("files[]", file);
    //   });

    //   return fetch(editor.AssetManager.upload, {
    // 	method: "POST",
    // 	body: formData,
    //   })
    //  .then(response => response.json())
    //  .then(data => {
    // 	if (Array.isArray(data.urls)) {
    // 	  const images = data.urls.map(item => ({
    // 		type: "image",
    // 		src: item.url,
    // 	  }));
    // 	  return images;
    // 	} else {
    // 	  throw new Error('Unexpected response format');
    // 	}
    //   })
    //  .catch(error => {
    // 	console.error("Error uploading files:", error);
    // 	throw error; // Rethrow the error for GrapesJS to handle
    //   });
    // };

    editor.on("asset:upload:start", () => {
      console.log("Start uploading...");
    });

    editor.on("asset:upload:error", (err) => {
      console.error("Error during upload:", err);
    });

    editor.on("asset:upload:response", (response) => {
      console.log("Response from server:", response);
      if (Array.isArray(response)) {
        const images = response.map((item) => ({
          type: "image",
          src: item.url,
        }));
        editor.AssetManager.add(images);
      } else {
        console.error("Expected an array, got:", typeof response);
      }
    });

    editor.on("asset:upload:end", () => {
      console.log("Upload ended.");
    });
  };

  //  Life cycle method for loading grapesjs */
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      try {
        loadGrapesJs();
      } catch (error) {
        console.error('Editor initialization failed:', error);
        toast.error('Failed to load editor');
      }
    }
  }, []);

  const toggleDrawer = () => {
    setsettingOpen({
      ...settingOpen,
      open: !settingOpen.open,
    });
  };

  const updatePageHandler = async (isPublish = false) => {
    toast.dismiss();
    try {
      if (!editor || !pageContent?.id) {
        throw new Error("Editor or page content not ready");
      }

      // Get the current content from the editor
      const html = editor.getHtml();
      const css = editor.getCss();
      

      // Prepare the update data
      const updateData = {
        html,
        css,
        name: settingOpen.name,
        domain: settingOpen.domain,
        mermerchantTemplateId: templateId,
      };

      // Call the update mutation
      const result = await updateCustomPage({
        id: pageContent.id,
        ...updateData
      }).unwrap();
      console.log(result, 'this the reuslt')
      toast.success("Page saved successfully");

      if (isPublish) {
        toast.success("Page published successfully");
        // Additional publish logic if needed
      }

    } catch (error) {
      console.error("Error updating page:", error);
      toast.error(error.message || "Failed to save page");
    } finally {
      setTriggerRequest(false);
    }
  };
  return (
    <div>
      <Drawer
        anchor={"right"}
        open={settingOpen.open}
        onClose={toggleDrawer}
        PaperProps={{ className: "z-30" }}
      >
        <div style={{ padding: "1rem" }} className="">
          <form>
            <div id="Page-name" className="field-wrapper input">
              <label htmlFor="page-name">Page Name</label>

              <select
                id="name"
                name="page-name"
                className="form-control"
                value={settingOpen.name}
                onChange={handlePageChange}
              >
                {data.map((page, index) => (
                  <option key={index} value={page.name}>
                    {page.name}
                  </option>
                ))}
              </select>
            </div>
          </form>
          <div>
            <AddProduct />
          </div>
        </div>
      </Drawer>
      <div className="panel__top flex flex-wrap">
        {/* <div>
        </div> */}
        <div className="panel__switcher">
          <KeyboardBackspaceOutlined
            onClick={() => router.back()}
            className="go_back"
          />
        </div>

        <div className="views-actions" style={{ position: "static" }}></div>

        <div className="panel-action ">
          <button
            className="py-1 px-3 btn-primary rounded-lg"
            onClick={() => updatePageHandler()}
          >
            Save
          </button>
          <CustomToaster />
          {/* </Link> */}
          {pageContent?.id && (
            <Link
              href={`/${shopData?.shop?.domain}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button
                className="py-1 px-3 btn-primary rounded-lg"
                style={{ marginLeft: "1rem" }}
              >
                Preview
              </button>
            </Link>
          )}
          <TuneOutlined
            style={{ marginLeft: "1rem", cursor: "pointer" }}
            fontSize="medium"
            onClick={toggleDrawer}
          />
        </div>
      </div>
      <div className="editor-row ml-4">
        <div id="blocks" className="ml-0" />
        <div className="editor-canvas overflow-x-hidden">
          <div id="gjs">
            {/* {template?.html}
            <h1>Hello world</h1> */}
          </div>
        </div>
        <div
          className="panel__right"
          style={
            builder.panelRight ? { display: "block" } : { display: "none" }
          }
        >
          <div className="close-icon">
            <i
              className="crossCircle"
              style={{ cursor: "pointer", color: "black" }}
              onClick={handleClose}
            ></i>
          </div>
          <div id="traits-container" />
          <div className="layers-container" />
          <div className="styles-container" />
        </div>
      </div>
    </div>
  );
};

export default WithGrapesjs;
