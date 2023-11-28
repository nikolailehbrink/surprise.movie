import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Toaster } from "react-hot-toast";
import { CheckCircle, CheckFat, XCircle } from "@phosphor-icons/react";

ReactDOM.createRoot(document.getElementById("root")).render(
	<React.StrictMode>
		<Toaster
			gutter={16}
			toastOptions={{
				success: {
					icon: <CheckCircle size={24} />,
				},
				error: {
					icon: <XCircle size={24} className="text-white" />,
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
