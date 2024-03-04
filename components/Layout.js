import React from "react";
import { Nav } from "./Nav";

export const Layout = (props) => {
  return (
    <div className='w-full bg-black h-screen'>
      <div className=" bg-black text-white">
        <Nav />

        <aside>{props.children}</aside>
      </div>
    </div>
  );
};
