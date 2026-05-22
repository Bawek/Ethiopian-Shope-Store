import "grapesjs/dist/css/grapes.min.css";
import { plugin1 } from "./plugin";
import block from "grapesjs-blocks-basic";
import pluginForms from "grapesjs-plugin-forms";

const WithGrapesjsConfig = (templateId) => {
  const projectID = 1;
  const projectEndpoint = `http://localhost:8000/shop/updatecustomized_template/${templateId}/`;

  const config = {
    // Indicate where to init the editor. You can also pass an HTMLElement
    container: '#gjs',
    // Get the content for the canvas directly from the element
    // As an alternative we could use: `components: '<h1>Hello World Component!</h1>'`,
    fromElement: true,
    // Size of the editor
    height: '90vh',
    width: 'auto',
    // Disable the storage manager for the moment
    storageManager: false,
    // Avoid any default panel
    allowScripts: true,
    showDevices: false,
    avoidInlineStyle: true,
    forceClass: false,

    // Block Manager Configuration
    blockManager: {
      appendTo: "#blocks",
      open: false,
    },

    // Panels Configuration
    panels: {
      defaults: [
        {
          id: "panel-switcher",
          el: ".panel__switcher",
          buttons: [
            {
              id: "select",
              className: "selectIcon",
              command: "sw-visibility",
              context: "core:component-select",
              attributes: { title: "Select element" },
            },
            {
              id: "undo",
              className: "undo",
              command: "core:undo",
              attributes: { title: "Undo (CTRL/CMD + Z)" },
            },
            {
              id: "redo",
              className: "redo",
              command: "core:redo",
              attributes: { title: "Redo (CTRL/CMD + SHIFT + Z)" },
            },
            {
              id: "clean-all",
              className: "trash",
              command: "core:canvas-clear",
              attributes: { title: "Empty canvas" },
            },
            {
              id: "images",
              className: "image",
              command: "open-asset-manager",
              attributes: { title: "Add Images" },
            },
            {
              id: "codeExport",
              className: "export",
              command: "export-template",
              attributes: { title: "Export Code" },
            },
            {
              id: "open-code",
              className: "editor",
              command: "open-code",
              togglable: false,
              attributes: { title: "Open Code" },
            },
          ],
        },
        {
          id: "panel-devices",
          el: ".views-actions",
          buttons: [
            {
              id: "deviceXl",
              className: "screenWindow",
              command: "set-device-xl",
              attributes: { title: "Extra Large" },
            },
            {
              id: "deviceSm",
              className: "tabWindow",
              command: "set-device-sm",
              attributes: { title: "Small" },
            },
            {
              id: "deviceXs",
              className: "mobilewindow",
              command: "set-device-xs",
              attributes: { title: "Extra Small" },
            },
          ],
        },
      ],
    },

    // DOM Components Configuration
    domComponents: {
      storeWrapper: 1,
      wrapper: {
        stylable: [
          "background", "background-color", "background-image",
          "background-repeat", "background-attachment", "background-position",
          "background-size", "font-family", "font-size", "color",
          "width", "height", "max-width", "min-height",
          "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
          "padding", "padding-top", "padding-right", "padding-bottom", "padding-left"
        ],
      },
    },

    // Plugins
    plugins: [plugin1, block, pluginForms],
    pluginsOpts: {
      [plugin1.toString()]: {},
      [block.toString()]: {},
      [pluginForms.toString()]: {},
    },

    // UI Components
    colorPicker: {
      appendTo: "parent",
      offset: { top: 26, left: -180 }
    },
    selectorManager: {
      appendTo: "#traits-container",
      componentFirst: true,
    },
    traitManager: {
      appendTo: "#traits-container",
      defaults: {},
    },
    styleManager: {
      appendTo: ".styles-container",
      sectors: [
        {
          name: "Basic",
          open: true,
          buildProps: [
            "background", "background-image", "background-color",
            "background-size", "background-repeat", "background-position",
            "font-family", "color", "font-size", "font-weight",
            "letter-spacing", "border-color", "border-style",
            "border-width", "margin", "padding"
          ],
        },
        {
          name: "Extra",
          open: false,
          buildProps: [
            "font-weight", "letter-spacing", "line-height",
            "text-transform", "text-align", "text-decoration",
            "font-style", "text-shadow", "margin", "padding",
            "border-radius", "width", "height", "max-height",
            "max-width", "min-height", "min-width", "position",
            "top", "bottom", "left", "right", "opacity",
            "box-shadow", "background", "transform", "perspective",
            "cursor", "overflow", "overflow-x", "overflow-y",
            "transition", "display", "flex-direction", "justify-content",
            "align-items", "flex-children", "order", "flex",
            "align-self", "flex-wrap", "align-content"
          ],
          properties: [
            // Detailed properties configuration...
            // (Keep your existing properties configuration here)
          ],
        },
      ],
    },

    // Canvas Configuration
    canvas: {
      //autoscrollLimit: 50,
      styles: [
        "https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css",
        "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.14.0/css/all.min.css",
        "https://my-assets-bucket.s3.amazonaws.com/assets/plugin1.css",
        "https://my-assets-bucket.s3.amazonaws.com/assets/framework1.css",
        "https://fonts.googleapis.com/css2?family=Manrope:wght@200,300,400,500,600,700&display=swap",
        "https://fonts.googleapis.com/css2?family=Nunito:wght@200,300,400,500,600,700&display=swap",
        "https://kit.fontawesome.com/0e53af926d.js",
      ],
      scripts: [
        "https://cdn.tailwindcss.com",
        "https://code.jquery.com/jquery-3.4.1.slim.min.js",
        "https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js",
        "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js",
      ],
    },
  };

  return config;
};

export default WithGrapesjsConfig;