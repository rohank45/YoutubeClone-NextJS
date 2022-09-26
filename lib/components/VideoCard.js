import React from "react";
import { HiCheckCircle } from "react-icons/hi";

const VideoCard = ({ data }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
      }}
    >
      {data &&
        data.map((v, i) => {
          return (
            <div
              key={i}
              // onClick={() => v.id.videoId}
              style={{
                cursor: "pointer",
                width: 300,
                height: 50,
              }}
            >
              <img
                src={v.snippet.thumbnails.standard.url}
                height={v.snippet.thumbnails.standard.height}
                width={v.snippet.thumbnails.standard.width}
              />
              <p>{v.snippet.title}</p>
              {/* <p>{v.snippet.description}</p> */}

              <span
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: 5,
                  cursor: "pointer",
                }}
              >
                <p
                // onClick={() => v.snippet.channelId}
                >
                  {v.snippet.channelTitle}
                </p>
                <HiCheckCircle />
              </span>

              <p>{v.snippet.publishedAt}</p>
            </div>
          );
        })}
    </div>
  );
};

export default VideoCard;
