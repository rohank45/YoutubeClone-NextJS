import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useRouter } from "next/router";
import React, { useState } from "react";

export default function Navbar({
  activeLink = "/home",
  drawerWidth = 320,
  navItems = [],
}) {
  const [link, setLink] = useState(activeLink);
  const router = useRouter();
  return (
    <Box
      component={"nav"}
      sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <Drawer
        variant="persistent"
        anchor="left"
        sx={{
          display: { xs: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        <List>
          {navItems.map((item, index) => {
            return (
              <ListItem key={index}>
                <ListItemButton
                  selected={link == item.link}
                  onClick={() => {
                    router.push(item.link);
                  }}
                >
                  <ListItemIcon>
                    <item.icon />
                  </ListItemIcon>
                  <ListItemText primary={item.title} />
                  <Divider />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      </Drawer>
    </Box>
  );
}
