import React, { createContext, useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import { useRouter } from "next/router";
import { FiMenu } from "react-icons/fi";
import { BsBell } from "react-icons/bs";
import Image from "next/image";
import useWindowSize from "../common/useWindowSize";

// const SidebarContext = createContext();

const PageLayout = ({ activeLink = "/", children }) => {
  const router = useRouter();
  const { height, width } = useWindowSize();
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

    if (
      window.location.pathname.includes("/video") === true ||
      window.location.pathname.includes("/channel") === true
    ) {
      setShowSidebar(false);
      console.log("first", window.location.pathname.includes("/video"));
    }
  }, []);

  useEffect(() => {
    if (width < 900) {
      setShowSidebar(false);
    } else {
      setShowSidebar(true);
    }
  }, [width]);

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
          justifyContent: width < 500 ? "space-between" : "",
          paddingRight: width < 500 ? 8 : 20,
          paddingLeft: width < 500 ? 8 : 20,
          backgroundColor: "#161515",
          color: "white",
          width: "100%",
          height: width < 500 ? 65 : "8%",
          zIndex: 20,
          position: "fixed",
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
              marginRight: width < 500 ? 5 : 20,
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
          onClick={() => {
            router.push("/");
          }}
        />

        {width < 500 ? (
          <></>
        ) : (
          <h5
            style={{
              flexGrow: 1,
              cursor: "pointer",
              fontSize: 18,
              marginLeft: width < 500 ? 0 : 10,
              backgroundColor: "#161515",
            }}
            onClick={() => {
              router.push("/");
            }}
          >
            YouTube
          </h5>
        )}

        {isAuthPage ? (
          <></>
        ) : (
          <input
            placeholder="search..."
            style={{
              backgroundColor: "#d9d9d9",
              paddingRight: width < 500 ? 8 : 15,
              paddingLeft: width < 500 ? 8 : 15,
              height: width < 500 ? 30 : 40,
              borderWidth: 1,
              borderRadius: 10,
              outline: "none",
              marginRight: width < 500 ? 5 : 20,
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
            fontSize: width < 500 ? 10 : 15,
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
            <Sidebar
              activeLink={activeLink}
              showSidebar={showSidebar}
              setShowSidebar={setShowSidebar}
              width={width}
            />
          ) : (
            <></>
          )}
        </div>

        <div
          style={{
            position: "relative",
            left: showSidebar === true ? 260 : 15,
            top: 100,
            width:
              showSidebar === true ? "calc(100% - 260px)" : "calc(100% - 15px)",
            height: "100%",
            overflowX: "hidden",
            overflowY: "auto",
            paddingBottom: 50,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default PageLayout;
