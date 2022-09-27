import React, { useState } from "react";
import PageLayout from "../lib/components/PageLayout";
import WatchLaterVideoCard from "../lib/components/WatchLaterVideoCard";

const watchLater = () => {
  const [watchLaterVideosData, setWatchLaterVideosData] = useState([]);

  return (
    <PageLayout activeLink="/watchLater">
      <WatchLaterVideoCard data={watchLaterVideosData} />
    </PageLayout>
  );
};

export default watchLater;
