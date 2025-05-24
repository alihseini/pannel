import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import UserProvider from "./store/context/userContext";
import { ConfigProvider } from "antd";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UserProvider>
        <ConfigProvider
          theme={{
            token: {
              fontFamily: "IRANYekanXFaNum",
            },
          }}
        >
          <RouterProvider router={router} />
          <Toaster position="top-right" reverseOrder={false} />
        </ConfigProvider>
      </UserProvider>
    </QueryClientProvider>
  );
}

export default App;
