import axios from "axios";
import { createContext, useEffect, useState } from "react";
import {
  Route,
  Routes,
  useNavigate
} from "react-router";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Navbar from "./components/Navbar";
import Register from "./components/Register";
import Add_edite from "./pages/Add_edite";
import AuthLayout from "./pages/AuthLayout";
import Home from "./pages/Home";
import Post from "./pages/Post";

// ------------------ Context ----------------------- //

export const AuthContext = createContext();

// ------------------ api ----------------------- //

  export const api = axios.create({
    baseURL: "https://bog-post-be.vercel.app/",
    withCredentials: true,
  });
api.interceptors.response.use(
  (res) => res,
  async (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.message === "token expired"
    ) {
      error.config._retry = true;
      await api.post("/auth/refresh");
      return api(error.config);
    }
    return Promise.reject(error);
  },
);

function App() {
  // ------------------ States ----------------------- //
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [err , setErr] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const navegate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  // ------------------ Effect ----------------------- //

  useEffect(() => {
    setLoading(true);
    api
      .get("/auth/me")
      .then((res) => setCurrentUser(res.data))
      .catch(() => setCurrentUser({}));
    const fetchData = async () => {
      try {
        const { data } = await api.get("/posts");
        setPosts(data);
      } catch (err) {
        setErr(err.message)
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  // ------------------ Handles ----------------------- //

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", user);
      setCurrentUser(data.user);
      navegate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const handleDelete = async (id) => {
    const oldPosts = [...posts];
    try {
      const newPosts = posts.filter((p) => p._id !== id);
      setPosts(newPosts);
      const res = await api.delete(`/posts/${id}`);
    } catch (err) {
      setPosts(oldPosts);
      console.log(err);
    }
  };
  
  const handleLogout = async () => {
    await api.post("/auth/logout");
    setCurrentUser({});
    navigate("/");
  };

  // ------------------ UI ----------------------- //
document.documentElement.setAttribute("data-theme", "light");

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        handleLogout,
        handleLogin,
        handleDelete,
        setUser,
        user,
        err
      }}
    >
      <Navbar />
      <Routes>
        <Route
          path="/:newAddedPost?"
          element={<Home posts={posts} loading={loading} />}
        />
        <Route path="add_edit_post/:oldPost?" element={<Add_edite />} />
        <Route element={<AuthLayout />}>
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route
          path="/post/:id"
          element={<Post posts={posts} loading={loading} />}
        />
      </Routes>
      <Footer />
    </AuthContext.Provider>
  );
}

export default App;
