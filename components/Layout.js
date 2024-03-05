import React from "react";
import Nav from "./Nav";


export const Layout = (props) => {
  return (
    <div className='w-full  h-screen'>
      <div className=" ">
        <Nav/>

        <aside className=' relative'>{props.children}</aside>
      </div>
    </div>
  );
};
