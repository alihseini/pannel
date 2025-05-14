import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import UserProvider from "./store/context/userContext";
import { ConfigProvider } from "antd";

function App() {
  return (
    <UserProvider>
      <ConfigProvider
        theme={{
          token: {
            fontFamily: "IRANYekanXFaNum",
          },
        }}
      >
        <RouterProvider router={router} />
      </ConfigProvider>
    </UserProvider>
  );
}

export default App;
