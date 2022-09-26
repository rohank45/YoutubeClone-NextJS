import React, { useState } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import Image from "next/image";

const PageLayout = ({ activeLink = "/", children }) => {
  const router = useRouter();
  const [showSidebar, setShowSidebar] = useState(true);

  // this is the way images are added in next js
  const logo = "https://i.ibb.co/s9Qys2j/logo.png";
  const imageLoader = ({ src }) => {
    return `https://i.ibb.co/s9Qys2j/logo.png`;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "8.3%",
        display: "flex",
        flexDirection: "row",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            paddingRight: 10,
            paddingLeft: 10,
            backgroundColor: "black",
            color: "white",
            width: "100%",
          }}
        >
          <FiMenu
            style={{
              color: "white",
              fontSize: 30,
              marginRight: 15,
              cursor: "pointer",
            }}
            onClick={() => setShowSidebar(!showSidebar)}
          />

          <Image
            loader={imageLoader}
            src={logo}
            alt="logo"
            width={25}
            height={25}
          />

          <h4
            style={{
              flexGrow: 1,
              cursor: "pointer",
              fontSize: 20,
              marginLeft: 10,
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Youtube Clone
          </h4>

          <BsBell
            style={{
              color: "white",
              fontSize: 20,
              marginRight: 10,
              cursor: "pointer",
            }}
          />

          <button
            style={{
              backgroundColor: "black",
              color: "white",
              cursor: "pointer",
              fontSize: 15,
              fontWeight: "initial",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            Logout
          </button>
        </div>

        <div>{children}</div>
      </div>

      {showSidebar ? <Sidebar activeLink={activeLink} /> : <></>}
    </div>
  );
};

export default PageLayout;
