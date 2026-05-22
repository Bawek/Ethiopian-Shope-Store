export const accountRegisterFields = [
    {
        name: "firestName",
        label: "Firest Name",
        placeholder: "Enter your firest name",
        description: "Name Must be alphbet only.",
        type: "text",
    },
    {
        name: "lastName",
        label: "Last Name",
        type: "text",
        description: "Name Must be alphbet only.",
        placeholder: "Enter your last name",
    },
    {
        name: "email",
        label: "email",
        type: "email",
        description: "Name Must be valid email.",
        placeholder: "Enter your email",
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        description: "Name Must be strong.",
        placeholder: "Enter your password",
    },

    {
        name: "role",
        label: "role",
        description: "Select the your on our platform.",
        type: "select",
        options: [
            { value: "", label: "Select Shop Type" },
            { value: "CUSTOMER", label: "CUSTOMER" },
            { value: "MERCHANT", label: "MERCHANT" },
        ],
    },
];
