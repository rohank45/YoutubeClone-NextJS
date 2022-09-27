import Image from "next/image";
import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { HiCheckCircle } from "react-icons/hi";

const WatchLaterVideoCard = ({ data }) => {
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
        publishedAt: "Sep 26, 2022",
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
        publishedAt: "Sep 26, 2022",
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
        flexDirection: "column",
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
                width: "80%",
                height: 130,
                border: "1px solid #999999",
                borderRadius: 5,
                borderColor: "#999999",
                backgroundColor: "#161515",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
                gap: 0,
                padding: 8,
                overflowY: "auto",
                overflowX: "hidden",
              }}
            >
              <Image
                // loader={imageLoader}
                src={v.snippet.thumbnails.standard.url}
                width={200}
                height={100}
                alt={`thumbnail`}
                style={{ cursor: "pointer" }}
              />

              <div
                style={{
                  width: "100%",
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
                    marginTop: 15,
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
                    }}
                    // onClick={() => v.snippet.channelId}
                  >
                    {v.snippet.channelTitle}
                  </p>
                  <HiCheckCircle
                    style={{ backgroundColor: "#161515", color: "white" }}
                  />
                </span>
              </div>

              <BsThreeDotsVertical
                style={{
                  backgroundColor: "#161515",
                  color: "white",
                  display: "flex",
                  justifyContent: "end",
                  marginRight: 10,
                  marginTop: 10,
                  fontSize: 18,
                  cursor: "pointer",
                }}
              />
            </div>
          );
        })}
    </div>
  );
};

export default WatchLaterVideoCard;
