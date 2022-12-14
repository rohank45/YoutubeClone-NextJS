import Head from "next/head";
import React, { useState } from "react";
import axios from "axios";
import PageLayout from "../lib/components/PageLayout";
import VideoCard from "../lib/components/VideoCard";

const index = () => {
  const [allVideosData, setAllsetVideosData] = useState([]);

  const options = {
    method: "GET",
    url: process.env.NEXT_PUBLIC_GET_ALL_VIDEOS_URI,
    params: {
      relatedToVideoId: "7ghhRHRP6t4",
      part: "id,snippet",
      type: "video",
      maxResults: "50",
    },
    headers: {
      "X-RapidAPI-Key": process.env.NEXT_PUBLIC_GET_KEY,
      "X-RapidAPI-Host": process.env.NEXT_PUBLIC_GET_HOST,
    },
  };

  // axios
  //   .request(options)
  //   .then(function (response) {
  //     // console.log("All videos res", response.data.items);
  //     setAllsetVideosData(response.data.items);
  //   })
  //   .catch(function (error) {
  //     console.error(error);
  //   });

  return (
    <div>
      <Head>
        <title>YouTube Clone</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageLayout activeLink="/">
        <VideoCard data={allVideosData} flexDirection={"row"} />
      </PageLayout>
    </div>
  );
};

export default index;
