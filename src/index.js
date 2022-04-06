import "react-app-polyfill/ie11";
import "react-app-polyfill/stable";
import React from "react";
import ReactDOM from "react-dom";
import { HashRouter } from "react-router-dom";
import "./styles/index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { loadProgressBar } from "axios-progress-bar";
import { Provider } from "react-redux";
import { store, persistor } from "./store/configureStore";
import { PersistGate } from "redux-persist/integration/react";
// import "./assets/styles/bootstrap.min.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import "bootstrap-daterangepicker/daterangepicker.css";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import "axios-progress-bar/dist/nprogress.css";
import "react-toastify/dist/ReactToastify.css";
import "primereact/resources/themes/saga-orange/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "./assets/styles/style.css";
import "react-phone-input-2/lib/style.css";
import 'bootstrap/dist/js/bootstrap.bundle.min';

loadProgressBar();

ReactDOM.render(
  <React.StrictMode>
    <HashRouter>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </HashRouter>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
