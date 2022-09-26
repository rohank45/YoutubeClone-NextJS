import { useRouter } from "next/router";
import React from "react";
import PageLayout from "../../lib/components/PageLayout";

const register = () => {
  const router = useRouter();

  return (
    <PageLayout activeLink="">
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginTop: 25,
        }}
      >
        <div
          style={{
            backgroundColor: "#161515",
            height: 450,
            width: 400,
            borderWidth: 1,
            borderRadius: 20,
            borderColor: "#999999",
            padding: 1,
            outline: "none",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "column",
            gap: 18,
            paddingBottom: 15,
          }}
        >
          <h1
            style={{
              backgroundColor: "#161515",
              color: "white",
              fontSize: 40,
            }}
          >
            REGISTER
          </h1>

          <input
            style={{
              color: "black",
              backgroundColor: "white",
              height: 40,
              width: "80%",
              paddingRight: 15,
              paddingLeft: 15,
              outline: "none",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "#999999",
              fontSize: 18,
            }}
            placeholder="full name"
            // value={}
            // onChange={() =>}
          />

          <input
            style={{
              color: "black",
              backgroundColor: "white",
              height: 40,
              width: "80%",
              paddingRight: 15,
              paddingLeft: 15,
              outline: "none",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "#999999",
              fontSize: 18,
            }}
            type="email"
            placeholder="email"
            // value={}
            // onChange={() =>}
          />

          <input
            style={{
              color: "black",
              backgroundColor: "white",
              height: 40,
              width: "80%",
              paddingRight: 15,
              paddingLeft: 15,
              outline: "none",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "#999999",
              fontSize: 18,
            }}
            type="number"
            placeholder="contact number"
            // value={}
            // onChange={() =>}
          />

          <input
            style={{
              color: "black",
              backgroundColor: "white",
              height: 40,
              width: "80%",
              paddingRight: 15,
              paddingLeft: 15,
              outline: "none",
              borderWidth: 1,
              borderRadius: 12,
              borderColor: "#999999",
              fontSize: 18,
            }}
            type="password"
            placeholder="password"
            // value={}
            // onChange={() =>}
          />

          <button
            style={{
              color: "white",
              backgroundColor: "#eb3528",
              height: 40,
              width: "80%",
              borderWidth: 1,
              borderRadius: 40,
              borderColor: "#999999",
              fontSize: 18,
              fontWeight: "bold",
              cursor: "pointer",
              outline: "none",
            }}
          >
            REGISTER
          </button>

          <p
            onClick={() => {
              router.push("/form/login");
            }}
            style={{
              backgroundColor: "#161515",
              color: "#f5695f",
              cursor: "pointer",
              fontSize: 12,
            }}
          >
            already register? go to LOGIN!
          </p>
        </div>
      </div>
    </PageLayout>
  );
};

export default register;
