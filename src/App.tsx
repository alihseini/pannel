import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import { useEffect } from "react";
import api from "./services/api";

function App() {
  useEffect(() => {
    api
      .get("/v1/User/GetCurrentUser")
      .then((response) => console.log(response))
      .catch((error) => console.log(error));
  }, []);
  return <RouterProvider router={router} />;
}

export default App;
