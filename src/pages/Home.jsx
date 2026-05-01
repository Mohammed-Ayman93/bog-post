import { useContext } from "react";
import { Link, useNavigate, useSearchParams } from "react-router";
import { AuthContext } from "../App";

export default function Home({ posts, loading }) {
  // ------------------ States ----------------------- //

  const navigate = useNavigate();
  const { currentUser, handleDelete } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const newAddedPost = searchParams.get("data");
  const updatedPost = searchParams.get("updateData");

  if (newAddedPost) {
    const newPost = JSON.parse(newAddedPost);
    const newPostAuthered = { ...newPost, author: { ...currentUser } };
    posts.unshift(newPostAuthered);
    navigate("/");
  }

  if (updatedPost) {
    const updated = JSON.parse(updatedPost);
    const updatedAuthered = { ...updated, author: { ...currentUser } };
    console.log(updated);
    posts.forEach((item) =>
      item._id === updatedAuthered._id
        ? ((item.title = updatedAuthered.title),
          (item.description = updatedAuthered.description),
          (item.image = updatedAuthered.image))
        : null,
    );
  }

  // ------------------ UI ----------------------- //

  if (loading)
    return (
      <div className="text-center mt-32">
        <span className="loading loading-ring loading-xl text-primary"></span>
      </div>
    );

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="max-w-5xl mx-auto px-6 py-10">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800">Latest Posts</h2>
        </div>
        <div className="flex flex-col gap-6">
          {posts.map((post) => (
            <div
              key={post._id}
              className="bg-white rounded-2xl max-h-50 shadow-sm hover:shadow-lg transition flex flex-col md:flex-row overflow-hidden"
            >
              <img
                src={post.image}
                alt=""
                className="w-full md:w-60 h-48 md:h-auto object-center"
              />
              <div className="p-5 flex flex-col justify-between flex-1">
                <div>
                  <a
                    href={`/post/${post._id}`}
                    className="text-xl font-semibold text-gray-800 hover:text-blue-600 transition"
                  >
                    {post.title}
                  </a>
                  <p className="text-gray-500 text-sm mt-2 line-clamp-2">
                    {post.description}
                  </p>
                </div>
                <div className="flex items-center justify-between mt-5 flex-wrap gap-3">
                  <div className="flex items-center gap-2">
                    <img
                      src={post.author.profilePic}
                      alt=""
                      className="w-9 h-9 rounded-full object-cover border"
                    />
                    <div className="text-xs text-gray-500">
                      <p className="font-medium text-gray-700">
                        {post.author.name}
                      </p>
                      <p>
                        puplished at :{" "}
                        {new Date(post.createdAt).toLocaleDateString()} , last
                        update : {new Date(post.updatedAt).toLocaleDateString()}{" "}
                        {new Date(post.updatedAt).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    {post.author._id === currentUser._id && (
                      <>
                        <button
                          onClick={() => {
                            handleDelete(post._id);
                          }}
                          className="btn btn-error btn-outline btn-sm"
                        >
                          Delete
                        </button>

                        <Link
                          to={`/add_edit_post/?data=${JSON.stringify(post)}`}
                          className="btn btn-info btn-outline btn-sm"
                        >
                          Edit
                        </Link>
                      </>
                    )}
                    <Link
                      to={`/post/${post._id}`}
                      className="btn bg-blue-600 hover:bg-blue-700 text-white btn-sm"
                    >
                      Read
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        <Link
          href="/add_edit_post"
          className="fixed bottom-6 right-6 btn btn-circle bg-blue-600 hover:bg-blue-700 text-white shadow-lg "
        >
          +
        </Link>
      </div>
    </div>
  );
}
