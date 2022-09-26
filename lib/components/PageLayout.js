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
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          paddingRight: 20,
          paddingLeft: 20,
          backgroundColor: "#161515",
          color: "white",
          width: "100%",
        }}
      >
        <FiMenu
          style={{
            backgroundColor: "#161515",
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

        <h5
          style={{
            flexGrow: 1,
            cursor: "pointer",
            fontSize: 18,
            marginLeft: 10,
            backgroundColor: "#161515",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          YouTube
        </h5>

        <BsBell
          style={{
            backgroundColor: "#161515",
            color: "white",
            fontSize: 20,
            marginRight: 10,
            cursor: "pointer",
          }}
        />

        <button
          style={{
            backgroundColor: "#161515",
            color: "white",
            cursor: "pointer",
            fontSize: 15,
            fontWeight: "initial",
            border: "none",
            outline: "none",
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          Login
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "row" }}>
        <div>
          {showSidebar === true ? (
            <Sidebar activeLink={activeLink} showSidebar />
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            position: "relative",
            left: showSidebar === true ? 280 : 50,
            top: 10,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
