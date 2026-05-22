export const fields = [
    {
        name: "name",
        label: "Template Name",
        placeholder: "Enter your Template Name",
        description: "Provide the Template Name.",
        type: "text", // Text input
    },
    {
        name: "basePrice",
        label: "Template Price",
        placeholder: "Enter your Template Price",
        description: "Provide the Template Price.",
        type: "Number", // Text input
    },
    {
        name: "previewUrls",
        label: "Preview Image",
        type: "file", // Checkbox input
        description: "Enter your Preview Image .",
        placeholder: "Enter your Preview Image",

    },

    {
        name: "description",
        label: "description",
        description: "Enter yourdescription  .",
        type: "textarea",
        placeholder: "Enter yourdescription ",

    },

    {
        type: "select", // Select input
        label: "Status ",
        name: 'status',
        options: [
            {
                label: "Select Status ",
                value: 'NULL',
            },
            {
                label: "PENDING",
                value: "PENDING",
            },
            {
                label: "SUSPENDED",
                value: 'SUSPENDED',
            },
            {
                label: "ACTIVE",
                value: 'ACTIVE',
            },

        ]

    },
];
