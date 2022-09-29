import React from "react";
import PageLayout from "../lib/components/PageLayout";

const myVideos = () => {
  return (
    <PageLayout activeLink="/myVideos">
      <div style={{ color: "white" }}>myVideos</div>
    </PageLayout>
  );
};

export default myVideos;
