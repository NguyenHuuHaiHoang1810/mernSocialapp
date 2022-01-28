import PageRender from "./customRouter/PageRender";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import PrivateRouter from "./customRouter/PrivateRouter";
import Home from "./pages/home";
import Login from "./pages/login";
import Register from "./pages/register";
import Alert from "./components/alert/Alert";
import Header from "./components/header/Header";
import io from "socket.io-client";
import SocketClient from "./SocketClient";

import { refreshToken } from "./redux/actions/authAction";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import StatusModal from "./components/StatusModal";
import { getPosts } from "./redux/actions/postAction";
import { GLOBALTYPES } from "./redux/actions/globalTypes";
function App() {
  const { auth, status, modal } = useSelector((state) => state);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshToken());
    const socket = io();
    dispatch({ type: GLOBALTYPES.SOCKET, payload: socket });
    return () => socket.close();
  }, [dispatch]);

  useEffect(() => {
    if (auth.token) {
      dispatch(getPosts(auth.token));
    }
  }, [dispatch, auth.token]);

  return (
    <BrowserRouter>
      <Alert />
      <input type="checkbox" id="theme" />
      <div className={`App ${(status || modal) && "mode"}`}>
        <div className="main">
          {auth.token && <Header />}
          {status && <StatusModal />}
          {auth.token && <SocketClient />}
          <Routes>
            <Route path="/" element={auth.token ? <Home /> : <Login />} />
            <Route path="/register" element={<Register />} />

            <Route
              path="/:page"
              element={
                <PrivateRouter>
                  <PageRender />
                </PrivateRouter>
              }
            />
            <Route
              path="/:page/:id"
              element={
                <PrivateRouter>
                  <PageRender />
                </PrivateRouter>
              }
            />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
