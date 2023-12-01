import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "@phosphor-icons/react";
import { HelmetProvider } from "react-helmet-async";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<HelmetProvider>
			<Toaster
				gutter={16}
				toastOptions={{
					// duration: 40000,
					success: {
						icon: <CheckCircle size={24} weight="duotone" />,
					},
					error: {
						icon: <XCircle size={24} weight="duotone" />,
					},
					style: {
						border: "2px solid white",
						borderRadius: "1rem",
						backgroundColor: "#262626",
						color: "white",
						padding: ".5rem 1rem",
					},
				}}
			></Toaster>
			<App />
		</HelmetProvider>
	</React.StrictMode>
);
