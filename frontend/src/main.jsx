import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import CustomeBackground from "./components/CustomBackGround.jsx";

createRoot(document.getElementById("root")).render(
    <StrictMode>
        <CustomeBackground>
            <App />
        </CustomeBackground>
    </StrictMode>
);
