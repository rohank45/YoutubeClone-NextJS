import React, { useState } from "react";
import PageLayout from "../lib/components/PageLayout";
import WatchLaterVideoCard from "../lib/components/WatchLaterVideoCard";

const likedVideos = () => {
  const [likedVideosData, setLikedVideosData] = useState([]);

  return (
    <PageLayout activeLink="/likedVideos">
      <WatchLaterVideoCard data={likedVideosData} />
    </PageLayout>
  );
};

export default likedVideos;
