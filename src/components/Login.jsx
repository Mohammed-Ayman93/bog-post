import { useContext } from "react";
import { Link } from "react-router";
import { AuthContext } from "../App";

export default function Login() {
  // ------------------ States ----------------------- //

  const { handleLogin, setUser, user } = useContext(AuthContext);

  // ------------------ UI ----------------------- //

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="card bg-white shadow-xl border border-base-200">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
              Welcome Back
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Login to your account
            </p>
            <form
              onSubmit={() => {
                handleLogin(event);
              }}
              className="space-y-4"
            >
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
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="input input-bordered w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">
                Login
              </button>
            </form>
            <div className="divider text-gray-400">OR</div>
            <p className="text-center text-sm text-gray-500">
              Don’t have an account?
              <Link
                href="/register"
                className="text-blue-600 hover:underline font-medium"
              >
                Register now
              </Link>
            </p>
          </div>
        </div>
        <p className="text-center text-xs text-gray-400 mt-4">© 2026 Blogify</p>
      </div>
    </div>
  );
}
