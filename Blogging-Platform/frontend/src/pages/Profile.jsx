import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogcard from "../components/Blogcard";
import CreateBlog from "../components/CreateBlog";

const Profile = () => {
  const [blogs, setBlogs] = useState([]);
 
  const [user, setUser] = useState();

  const getUsersBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      const token = localStorage.getItem("authToken");
      const { data } = await axios.get(
        `http://localhost:5000/api/posts/my-posts/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data?.success) {
        setBlogs(data?.posts.posts);
        setUser(data?.posts.username);
      }
    } catch (err) {
      console.log(err);
    }
  };
  console.log(blogs);
  useEffect(() => {
    getUsersBlogs();
  }, []);
  return (
    <div className="py-24 mx-auto max-w-7xl">
      <div>
        <h1 className="text-3xl font-bold mb-8">Hello {user}</h1>
      </div>

      <p className="text-2xl mb-4">Your Blogs</p>

      <CreateBlog  />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
        {blogs &&
          blogs.map((blog, index) => <Blogcard blog={blog} key={index} />)}
      </div>
    </div>
  );
};

export default Profile;
