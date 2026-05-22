"use client";
import {useState} from "react";
import html2canvas from "html2canvas";
const captureAndUploadScreenshot = async () => {
        const [message, setMessage] = useState("");
		try {
			const canvas = await html2canvas(
				document.querySelector("#features")
			);
			// Convert the canvas to a data URL
			const imgData = canvas.toDataURL("image/png");

			// Decode the base64 data URL to get the binary data
			const binaryData = atob(imgData.split(",")[1]);

			// Create a new Uint8Array from the binary data
			const dataArray = new Uint8Array(binaryData.length);
			for (let i = 0; i < binaryData.length; i++) {
				dataArray[i] = binaryData.charCodeAt(i);
			}

			// Create a Blob from the Uint8Array
			const blob = new Blob([dataArray], {type: "image/png"});

			// Create a File object from the Blob
			const file = new File([blob], "screenshot.png", {type: "image/png"});

			// Now you can append this file to FormData for upload
			const formData = new FormData();
			formData.append("image", file);
			// Send the screenshot to the Django backend
			const response = await fetch("http://localhost:8000/shop/upload/", {
				method: "POST",
				// Remove the 'Content-Type' header to let the browser set it automatically
				body: formData,
			});

			if (response.ok) {
				setMessage("Screenshot uploaded successfully");
			} else {
				setMessage("Failed to upload screenshot");
			}
		} catch (error) {
			console.error("Error capturing or uploading screenshot:", error);
			setMessage("Error capturing or uploading screenshot");
		}
	};

	


export default captureAndUploadScreenshot;