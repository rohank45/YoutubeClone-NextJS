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

function Sidebar({ activeLink = "/" }) {
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
      title: "History",
      icon: BiHistory,
      link: "/history",
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
      title: "Settings",
      icon: FiSettings,
      // link: "/settings",
    },
  ];

  return (
    <div>
      <Drawer
        variant="persistent"
        anchor="left"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: 250,
            height: "91.7%",
            backgroundColor: "black",
            color: "white",
            position: "absolute",
            top: "8.3%",
            left: 0,
          },
        }}
        open
      >
        {navItems.map((item, index) => {
          return (
            <div
              key={index}
              onClick={() => {
                router.push(item.link);
              }}
              style={{
                display: "flex",
                flexDirection: "row",
                // justifyContent: "center",
                alignItems: "center",
                gap: 10,
                cursor: "pointer",
                marginBottom: 5,
                paddingLeft: 20,
              }}
            >
              <item.icon
                style={{
                  color: link === activeLink ? "white" : "red",
                  fontSize: 20,
                  cursor: "pointer",
                }}
              />
              <p style={{ color: "white", fontSize: 15 }}>{item.title}</p>
            </div>
          );
        })}
      </Drawer>
    </div>
  );
}

export default Sidebar;
