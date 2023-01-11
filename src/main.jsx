import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import { ChainId, ThirdwebProvider } from "@thirdweb-dev/react";
import App from "./App"
import "./index.css"

const activeChainId = ChainId.Goerli;
const container = document.getElementById("root");
const root = createRoot(container);

root.render(
  <ThirdwebProvider desiredChainId={activeChainId}>
    <Router>
      <App />
    </Router>
  </ThirdwebProvider>
)
