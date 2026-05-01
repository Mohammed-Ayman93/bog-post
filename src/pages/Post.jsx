import { useContext } from "react";
import { Link, useParams } from "react-router";
import { AuthContext } from "../App";

export default function Post({ posts, loading }) {
  // ------------------ States ----------------------- //

  const { currentUser, handleDelete, err } = useContext(AuthContext);
  const param = useParams();
  const post = posts.filter((p) => p._id === param.id);

  // ------------------ UI ----------------------- //

  if (loading)
    return (
      <span className="loading loading-ring loading-xl text-primary mt-48"></span>
    );

  if (err)
    return (
      <div role="alert" className="alert alert-error w-3/4 mx-auto my-44">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
        <span>{err}</span>
      </div>
    );
  return (
    <div className="bg-gray-50 min-h-screen py-10 px-4">
      <p className="w-3xl mx-auto my-5 ps-6 md:ps-10 ">
        <Link to="/" className="link-hover underline">
          All Posts
        </Link>{" "}
        / <span className="text-blue-700">{post[0].title}</span>
      </p>
      <div className="max-w-3xl mx-auto bg-white rounded-2xl shadow-sm p-6 md:p-10">
        <img
          src={post[0].image}
          alt=""
          className="w-full h-64 md:h-80 object-cover rounded-xl mb-6"
        />
        <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4 leading-snug">
          {post[0].title}
        </h1>
        <div className="flex items-center justify-between mb-6 flex-wrap gap-4">
          <div className="flex items-center gap-3">
            <img
              src={post[0].author.profilePic}
              alt=""
              className="w-10 h-10 rounded-full object-cover border"
            />
            <div>
              <p className="text-sm font-medium text-gray-700">
                {post[0].author.name}
              </p>
              <p className="text-xs text-gray-500">
                {new Date(post[0].createdAt).toDateString()} · Updated{" "}
                {new Date(post[0].updatedAt).toDateString()}
              </p>
            </div>
          </div>
          {post[0].author._id === currentUser._id && (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  handleDelete(post[0]._id);
                }}
                className="btn bg-red-600 text-white px-2 hover:bg-white hover:text-red-700 border hover:border-red-800 btn-sm"
              >
                Delete
              </button>
              <Link
                to={`/add_edit_post/?data=${JSON.stringify(post[0])}`}
                            className="btn bg-info text-stone-50 hover:bg-white hover:text-cyan-700 border hover:border-cyan-800 btn-sm"
              >
                Edit
              </Link>
            </div>
          )}
        </div>
        <div className="divider"></div>
        <p className="text-gray-700 leading-8 text-[15px] md:text-base whitespace-pre-line">
          {post[0].description}
        </p>
      </div>
    </div>
  );
}
