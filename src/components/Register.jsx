import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { api } from "../App";

export default function Register() {
  // ------------------ States ----------------------- //

  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    profilePic: "",
  });

  // ------------------ Handles ----------------------- //

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
    const form = new FormData(event.target);
    const image = form.get("image");
    const Imagedata = new FormData();
    Imagedata.append("image", image);      
      const { data } = await axios.post(
        "https://api.imgbb.com/1/upload?key=808976a7ea3d13b80a0551fe7c161438",
        Imagedata,
      );
      const userData = { ...user, profilePic: data.data.url };
    
      const newUser = await api.post(
        "http://localhost:3000/auth/register",
        userData,
      );
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------ UI ----------------------- //

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl border border-base-200">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
              Create Account
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Join Blogify and start sharing your ideas
            </p>
            <form
              onSubmit={() => {
                handleRegister(event);
              }}
              className="space-y-4"
            >
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Full Name</span>
                </label>
                <input
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                  type="text"
                  placeholder="Mohamed Ayman"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Email</span>
                </label>
                <input
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                  type="email"
                  placeholder="you@example.com"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Password</span>
                </label>
                <input
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">
                    Confirm Password
                  </span>
                </label>
                <input
                  type="password"
                  placeholder="••••••••"
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">
                    Profile Picture
                  </span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <button className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">
                Sign Up
              </button>
            </form>
            <div className="divider text-gray-400">OR</div>
            <p className="text-center text-sm text-gray-500">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-blue-600 hover:underline font-medium"
              >
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
