import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "@phosphor-icons/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Toaster
			gutter={16}
			toastOptions={{
				success: {
					icon: <CheckCircle size={24} weight="duotone" />,
				},
				error: {
					icon: <XCircle size={24} weight="duotone" />,
				},
				style: {
					border: "2px solid white",
					borderRadius: "1rem",
					backgroundColor: "black",
					color: "white",
				},
			}}
		></Toaster>
		<App />
	</React.StrictMode>
);
