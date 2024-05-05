import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import EditorPage from "./pages/EditorPage";
import { SocketProvider } from "./context/SocketContext";
import { CodeProvider } from "./context/CodeContext";

function App() {
  return (
    <>
      <div>
        <Toaster
          position="top-right"
          toastOptions={{
            success: {
              theme: {
                primary: "#4aed48",
              },
            },
          }}
        />
      </div>

      <BrowserRouter>
        <SocketProvider>
          <CodeProvider>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/editor/:roomId" element={<EditorPage />}></Route>
            </Routes>
          </CodeProvider>
        </SocketProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
