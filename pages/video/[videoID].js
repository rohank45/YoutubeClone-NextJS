import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Loader from "../../lib/common/Loader";
import dynamic from "next/dynamic";
import VideoCard from "../../lib/components/VideoCard";
import PageLayout from "../../lib/components/PageLayout";
import useWindowSize from "../../lib/common/useWindowSize";

const videoID = () => {
  const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
  const router = useRouter();
  const { height, width } = useWindowSize();
  const [loading, setLoading] = useState(false);
  const [videoDetails, setVideoDetails] = useState(null);
  const [allVideosData, setAllsetVideosData] = useState([]);

  const { videoID } = router.query;
  let id = videoID;

  useEffect(() => {
    setLoading(true);
    if (id) {
      const options = {
        method: "GET",
        url: process.env.NEXT_PUBLIC_GET_VIDEO_DETAILS,
        params: {
          part: "contentDetails,snippet,statistics",
          id: { id },
        },
        headers: {
          "X-RapidAPI-Key": process.env.NEXT_PUBLIC_GET_KEY,
          "X-RapidAPI-Host": process.env.NEXT_PUBLIC_GET_HOST,
        },
      };

      //   axios
      //     .request(options)
      //     .then(function (response) {
      //       console.log("video details res", response.data);
      //   setVideoDetails(response.data.items[0]);
      //     })
      //     .catch(function (error) {
      //       console.error("video details error", error);
      //     });
    }
    setLoading(false);
  }, [id]);

  return (
    <PageLayout activeLink="/">
      {loading ? (
        <Loader />
      ) : (
        <div
          style={{
            width: "100%",
            display: "flex",
            flexDirection: width < 900 ? "column" : "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              width: width < 900 ? "100%" : "76%",
              position: "relative",
              left: 0,
              top: 0,
            }}
          >
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${id}`}
              className="react-player"
              controls
            />

            {/* <p>{videoDetails.snippet.channelId}</p>
            <p>{videoDetails.snippet.title}</p>
            <p>{videoDetails.snippet.description}</p>
            <p>{videoDetails.snippet.channelTitle}</p>
            <p>{videoDetails.snippet.publishedAt}</p> */}

            {/* <div>
              <p>{parseInt(videoDetails.statistics.viewCount).toLocaleString()} Views</p>
              <p>{parseInt(videoDetails.statistics.likeCount).toLocaleString()} Likes</p>
              <p>{parseInt(videoDetails.statistics.commentCount).toLocaleString()} Comments</p>
            </div> */}
          </div>

          <div
            style={{
              width: width < 900 ? "100%" : "20%",
              position: "relative",
              right: 0,
              top: 0,
              marginRight: 30,
              marginTop: width < 900 && width > 500 ? 30 : 0,
            }}
          >
            <VideoCard
              data={allVideosData}
              flexDirection={width < 900 ? "row" : "column"}
            />
          </div>
        </div>
      )}
    </PageLayout>
  );
};

export default videoID;
