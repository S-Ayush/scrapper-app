import logo from "./logo.svg";
import "./App.css";
import ScrappingForm from "./pages/scrappingForm/ScrappingForm";
import RouterComponent from "./router/RouterComponent";
import { SiteInfoProvider } from "./context/SiteContext";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import RouteDefinitions from "./router/RouteDefinition";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate(RouteDefinitions.ROUTE_HOME);
  }, []);

  return (
    <div className="App">
      {/* site provider context is applied here */}
      <SiteInfoProvider>
        {/* Router Component */}
        <RouterComponent />
        {/* Toaster Component */}
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
      </SiteInfoProvider>
    </div>
  );
}

export default App;
