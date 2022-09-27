import Image from "next/image";
import React from "react";
import { HiCheckCircle } from "react-icons/hi";
import useWindowSize from "../common/useWindowSize";
import moment from "moment";

const VideoCard = ({ data }) => {
  const { height, width } = useWindowSize();

  let newdata = [
    {
      id: 1,
      snippet: {
        thumbnails: {
          standard: {
            url: require("../../assets/demo1.jpg"),
            height: 200,
            width: 300,
          },
        },
        title: "You Might Never Become A Great Developer",
        description:
          "Do you want to become a full-stack web developer? Check out codedamn's full-stack learning ",
        channelTitle: "codedamn",
        publishedAt: "2011-08-12T19:33:18Z",
      },
    },
    {
      id: 2,
      snippet: {
        thumbnails: {
          standard: {
            url: require("../../assets/demo1.jpg"),
            height: 200,
            width: 300,
          },
        },
        title: "You Might Never Become A Great Developer",
        description:
          "Do you want to become a full-stack web developer? Check out codedamn's full-stack learning ",
        channelTitle: "codedamn",
        publishedAt: "2011-08-12T19:33:18Z",
      },
    },
  ];

  const imageLoader = ({ src, width, quality }) => {
    return src;
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}
    >
      {newdata &&
        newdata.map((v, i) => {
          return (
            <div
              key={i}
              // onClick={() => v.id.videoId}
              style={{
                width: 340,
                height: 300,
                border: "1px solid",
                borderRadius: 5,
                backgroundColor: "#161515",
                display: "flex",
                flexDirection: "column",
                gap: 0,
                padding: 1,
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Image
                // loader={imageLoader}
                src={v.snippet.thumbnails.standard.url}
                width={340}
                height={180}
                alt={`thumbnail`}
                style={{ cursor: "pointer" }}
              />
              <div
                style={{
                  backgroundColor: "#161515",
                  paddingRight: 10,
                  paddingLeft: 10,
                }}
              >
                <p
                  style={{
                    backgroundColor: "#161515",
                    color: "white",
                    fontWeight: "bolder",
                    padding: 0,
                    marginTop: 10,
                  }}
                >
                  {v.snippet.title}
                </p>

                <span
                  style={{
                    backgroundColor: "#161515",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    cursor: "pointer",
                  }}
                >
                  <p
                    style={{
                      backgroundColor: "#161515",
                      color: "white",
                      margin: 0,
                      padding: 0,
                    }}
                    // onClick={() => v.snippet.channelId}
                  >
                    {v.snippet.channelTitle}
                  </p>
                  <HiCheckCircle
                    style={{ backgroundColor: "#161515", color: "white" }}
                  />
                </span>

                <p
                  style={{
                    backgroundColor: "#161515",
                    color: "white",
                    display: "flex",
                    justifyContent: "end",
                    fontSize: 12,
                  }}
                >
                  {moment(v.snippet.publishedAt).utc().format("YYYY-MM-DD")}
                </p>
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default VideoCard;
