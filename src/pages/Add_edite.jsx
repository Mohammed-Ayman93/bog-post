import axios from "axios";
import { useContext, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { AuthContext, api } from "../App";

export default function Add_edite() {
  // ------------------ States ----------------------- //

  const { currentUser, token } = useContext(AuthContext);
  const [searchParams] = useSearchParams();
  const oldPost = searchParams.get("data");
  const navigate = useNavigate();
  const [post, setPost] = useState(
    oldPost
      ? { ...JSON.parse(oldPost) }
      : {
          title: "",
          description: "",
          image: "",
          author: "",
        },
  );

  // ------------------ Handles ----------------------- //

  const handleAddPost = async (e) => {
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
      const postData = {
        ...post,
        image: data.data.url,
        author: currentUser._id,
      };

      const newpost = await api.post("/posts", postData);
      navigate(`/?data=${JSON.stringify(newpost.data)}`);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const form = new FormData(event.target);
    const image = form.get("image");
    let Imagedata;
    if (image.name) {
      Imagedata = new FormData();
      Imagedata.append("image", image);
    }
    try {
      let data;
      if (image.name) {
        data = await axios.post(
          "https://api.imgbb.com/1/upload?key=2a984cae3652108793fac192ed3b265b",
          Imagedata,
        );
      }
      const postData = {
        ...post,
        author: currentUser._id,
        updatedAt: currentUser.updatedAt,
        image: image.name ? data.data.data.url : post.image,
      };
      const newpost = await api.patch(`/posts`, postData);
      navigate(`/?updateData=${JSON.stringify(postData)}`);
    } catch (err) {
      console.log(err);
    }
  };

  // ------------------ UI ----------------------- //

  return (
    <div className="min-h-screen bg-base-100 flex items-center justify-center px-4">
      <div className="w-full max-w-2xl">
        <div className="card bg-white shadow-xl border border-base-200">
          <div className="card-body p-8">
            <h2 className="text-2xl font-bold text-center text-blue-600 mb-2">
              Create New Post
            </h2>
            <p className="text-center text-gray-500 mb-6">
              Share your thoughts with the world
            </p>
            <form
              onSubmit={oldPost ? handleUpdate : handleAddPost}
              className="space-y-5"
            >
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Post Title</span>
                </label>
                <input
                  onChange={(e) => {
                    setPost({ ...post, title: e.target.value });
                  }}
                  value={post.title}
                  type="text"
                  placeholder="Enter post title..."
                  className="input input-bordered w-full focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">
                    Post Description
                  </span>
                </label>
                <textarea
                  onChange={(e) => {
                    setPost({ ...post, description: e.target.value });
                  }}
                  value={post.description}
                  rows="4"
                  placeholder="Write your post..."
                  className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-500 resize-none"
                ></textarea>
              </div>
              <div>
                <label className="label">
                  <span className="label-text text-gray-600">Upload Image</span>
                </label>
                <input
                  type="file"
                  name="image"
                  id="image"
                  className="file-input file-input-bordered w-full"
                />
              </div>
              <button className="btn bg-blue-600 hover:bg-blue-700 text-white w-full mt-2">
                {oldPost ? "Edite Post" : "Publish Post "}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
