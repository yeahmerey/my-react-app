import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./store.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("/service-worker.js")
      .then((registration) => {
        console.log(
          "[App] Service Worker registered successfully:",
          registration.scope
        );

        // Проверяем обновления каждые 60 секунд
        setInterval(() => {
          registration.update();
        }, 60000);
      })
      .catch((error) => {
        console.error("[App] Service Worker registration failed:", error);
      });
  });
}
