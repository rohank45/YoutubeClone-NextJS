import {
  AppBar,
  Box,
  Button,
  Container,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Navbar from "./navbar";
import HomeIcon from "@mui/icons-material/People";
import QuizIcon from "@mui/icons-material/QuestionAnswer";
import CourseIcon from "@mui/icons-material/School";
import OfferIcon from "@mui/icons-material/LocalOffer";
import MenuIcon from "@mui/icons-material/Menu";
import { useRouter } from "next/router";

export default function MainLayout({ activeLink = "/home", children }) {
  const router = useRouter();
  const [showNavbar, setShowNavbar] = useState(true);

  const items = [
    {
      title: "Users",
      icon: HomeIcon,
      link: "/home",
    },
    {
      title: "Quizzes",
      icon: QuizIcon,
      link: "/quizzes",
    },
    {
      title: "Courses",
      icon: CourseIcon,
      link: "/courses",
    },
    {
      title: "LMD Offers",
      icon: OfferIcon,
      link: "/offers",
    },
  ];

  return (
    <Box display={"flex"} flexDirection="row">
      {showNavbar ? (
        <Navbar activeLink={activeLink} drawerWidth={240} navItems={items} />
      ) : (
        <></>
      )}
      <Box
        flexDirection={"column"}
        sx={{
          width: "100%",
        }}
      >
        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                onClick={() => setShowNavbar(!showNavbar)}
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1, cursor: "pointer" }}
                onClick={() => {
                  router.push("/home");
                }}
              >
                SustLiveAndEarn
              </Typography>
              <Button
                color="inherit"
                onClick={() => {
                  router.push("/");
                }}
              >
                Logout
              </Button>
            </Toolbar>
          </AppBar>
        </Box>
        <Box>{children}</Box>
      </Box>
    </Box>
  );
}
