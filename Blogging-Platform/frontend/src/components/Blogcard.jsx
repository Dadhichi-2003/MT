import React from "react";

const Blogcard = ({ blog }) => {
  const { title, description, image, user, createdAt } = blog;
  const time = new Date(createdAt).toLocaleString();
  return (
    <div className="group w-full  border border-gray-300 rounded-2xl">
      <div className="flex items-center">
        <img
          src={image}
          alt="blogs"
          className="rounded-t-2xl w-full object-cover"
        />
      </div>
      <div className="p-4 lg:p-6 transition-all duration-300 rounded-b-2xl group-hover:bg-gray-50">
        <span className="text-indigo-600 font-medium mb-3 block">{time}</span>
        <h4 className="text-xl text-gray-900 font-medium leading-8 mb-5">
          {title}
        </h4>
        <p className="text-gray-500 leading-6 mb-6">{description}</p>
        <a
          href="javascript:;"
          className="cursor-pointer text-lg text-indigo-600 font-semibold"
        >
          Read more..
        </a>
      </div>
    </div>
  );
};

export default Blogcard;
