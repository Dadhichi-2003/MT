import React, { useEffect, useState } from "react";
import axios from "axios";
import Blogcard from "../components/Blogcard";

const Home = () => {
  const [blogs, setBlogs] = useState([]);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:5000/api/posts");
      if (data?.success) {
        setBlogs(data?.posts);
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <section className="py-24 ">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <h2 className="font-manrope text-4xl font-bold text-gray-900 text-center mb-10">
          Our latest blog
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          {blogs &&
            blogs.map((blog, index) => <Blogcard blog={blog} key={index} />)}
        </div>
      </div>
    </section>
  );
};

export default Home;
