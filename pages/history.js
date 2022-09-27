import React, { useState } from "react";
import PageLayout from "../lib/components/PageLayout";
import HistoryVideoCard from "../lib/components/HistoryVideoCard";

const history = () => {
  const [historyVideosData, setHistoryVideosData] = useState([]);

  return (
    <div>
      <PageLayout activeLink="/history">
        <HistoryVideoCard data={historyVideosData} />
      </PageLayout>
    </div>
  );
};

export default history;
