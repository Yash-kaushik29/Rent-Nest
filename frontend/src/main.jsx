import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { SnackbarProvider, closeSnackbar } from "notistack";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SnackbarProvider
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        action={(snackbarId) => (
          <button
            onClick={() => closeSnackbar(snackbarId)}
            style={{ background: "none", border: "none", margin: "5px" }}
          >
            X
          </button>
        )}
      >
      <Router>
        <App />
      </Router>
    </SnackbarProvider>
  </React.StrictMode>
);
