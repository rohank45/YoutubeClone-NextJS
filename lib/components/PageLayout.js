import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import Image from "next/image";
import useWindowDimensions from "../common/useWindowDimensions";

const PageLayout = ({ activeLink = "/", children }) => {
  const router = useRouter();
  const { height, width } = useWindowDimensions();
  const [showSidebar, setShowSidebar] = useState(true);
  const [isAuthPage, setIsAuthPage] = useState(false);

  // this is the way images are added in next js
  const logo = "https://i.ibb.co/s9Qys2j/logo.png";
  const imageLoader = ({ src }) => {
    return `https://i.ibb.co/s9Qys2j/logo.png`;
  };

  useEffect(() => {
    if (window.location.pathname.includes("/form")) {
      setIsAuthPage(true);
      setShowSidebar(false);
    } else {
      setIsAuthPage(false);
    }
  }, []);

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
          height: "8%",
          zIndex: 20,
        }}
      >
        {isAuthPage ? (
          <></>
        ) : (
          <FiMenu
            style={{
              backgroundColor: "#161515",
              color: "white",
              fontSize: 30,
              marginRight: 20,
              cursor: "pointer",
            }}
            onClick={() => setShowSidebar(!showSidebar)}
          />
        )}

        <Image
          loader={imageLoader}
          src={logo}
          alt="logo"
          width={25}
          height={25}
          style={{ backgroundColor: "#161515" }}
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

        {isAuthPage ? (
          <></>
        ) : (
          <input
            placeholder="search..."
            style={{
              backgroundColor: "#d9d9d9",
              paddingRight: 15,
              paddingLeft: 15,
              height: 40,
              borderWidth: 1,
              borderRadius: 10,
              outline: "none",
              marginRight: 20,
              fontSize: 15,
            }}
          />
        )}

        {isAuthPage ? (
          <></>
        ) : (
          <BsBell
            style={{
              backgroundColor: "#161515",
              color: "white",
              fontSize: 20,
              marginRight: 10,
              cursor: "pointer",
            }}
          />
        )}

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
            router.push("/form/login");
          }}
        >
          LOGIN
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
            width:
              showSidebar === true ? "calc(100% - 280px)" : "calc(100% - 50px)",
            height: "100%",
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
