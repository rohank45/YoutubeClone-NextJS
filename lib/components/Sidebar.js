import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Drawer } from "@mui/material";
import {
  MdOutlineExplore,
  MdOutlineSubscriptions,
  MdOutlineOndemandVideo,
  MdOutlineWatchLater,
} from "react-icons/md";
import { FiHome, FiSettings } from "react-icons/fi";
import { BiHistory, BiLike } from "react-icons/bi";
import { AiOutlineClose } from "react-icons/ai";

function Sidebar({ activeLink = "/", showSidebar, setShowSidebar, width }) {
  const [link, setLink] = useState(activeLink);
  const router = useRouter();

  useEffect(() => {
    setLink(router.pathname);
  }, [router]);

  const navItems = [
    {
      title: "Home",
      icon: FiHome,
      link: "/",
    },
    {
      title: "Explore",
      icon: MdOutlineExplore,
      link: "/explore",
    },
    {
      title: "Watch Later",
      icon: MdOutlineWatchLater,
      link: "/watchLater",
    },
    {
      title: "Liked Videos",
      icon: BiLike,
      link: "/likedVideos",
    },
    {
      title: "Subscriptions",
      icon: MdOutlineSubscriptions,
      // link: "/subscriptions",
    },
    {
      title: "My Videos",
      icon: MdOutlineOndemandVideo,
      link: "/myVideos",
    },
    {
      title: "Watch History",
      icon: BiHistory,
      link: "/history",
    },
    {
      title: "Settings",
      icon: FiSettings,
      // link: "/settings",
    },
  ];

  return (
    <div
      style={{
        width: width < 500 ? "80%" : 250,
        height: width < 500 ? "100%" : "92%",
        backgroundColor: "#161515",
        color: "white",
        position: "absolute",
        top: width < 500 ? 8 : "8%",
        left: 0,
        borderRightWidth: "1px solid #999999",
        borderColor: "#999999",
        zIndex: 30,
        overflowX: "hidden",
        overflowY: "auto",
        position: "fixed",
      }}
    >
      {width < 500 ? (
        <AiOutlineClose
          style={{
            backgroundColor: "#161515",
            color: "white",
            fontSize: 25,
            margin: 20,
          }}
          onClick={() => setShowSidebar(false)}
        />
      ) : (
        <></>
      )}

      {navItems.map((item, index) => {
        return (
          <div
            key={index}
            onClick={() => {
              router.push(item.link);
              // router.push({
              //   pathname: item.link,
              //   query: { showSidebar },
              // });
            }}
            className="style-sidebar-tabs"
            style={{
              display: "flex",
              flexDirection: "row",
              // justifyContent: "center",
              alignItems: "center",
              gap: 10,
              cursor: "pointer",
              marginBottom: 5,
              paddingLeft: 20,
              backgroundColor: "#161515",
              // "&:hover": {
              //   backgroundColor: "white",
              // },
            }}
          >
            <item.icon
              style={{
                backgroundColor: "#161515",
                color: link === activeLink ? "white" : "red",
                fontSize: 20,
                cursor: "pointer",
              }}
            />
            <p
              style={{
                backgroundColor: "#161515",
                color: "white",
                fontSize: 15,
              }}
            >
              {item.title}
            </p>
          </div>
        );
      })}
    </div>
  );
}

export default Sidebar;
