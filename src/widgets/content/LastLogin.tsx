import React, { useEffect } from "react";
import "./LastLogin.css";

const DateContainer: React.FC<{
  loginString1: string | undefined;
  loginString2: string | undefined;
  style1?: React.CSSProperties;
  style2?: React.CSSProperties;
  subheader1: string;
  subheader2: string;
}> = ({ loginString1, loginString2, style1, style2, subheader1, subheader2}) => {
  return (
    <div
      style={{
        flex: "1",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          ...style1,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: ".5em",
          borderRadius: "10px 10px 0 0",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.23)",
          fontFamily: "Open Sans Bold",
          fontSize: "1.5em",
        }}
      >
        <p>{loginString1}</p>
        <p style={{margin: ".35em 0 0 .5em", padding: "0", fontSize: ".5em"}}>{subheader1}</p>
      </div>
      <div
        style={{
          ...style2,
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          margin: ".5em",
          borderRadius: "0 0 10px 10px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.23)",
          fontFamily: "Open Sans Bold",
          fontSize: "1.5em",
        }}
      >
        <p>{loginString2}</p>
        <p style={{margin: ".35em 0 0 .5em", padding: "0", fontSize: ".5em"}}>{subheader2}</p>
      </div>
    </div>
  );
};

const LastLogin: React.FC = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("LastLogin", new Date().toUTCString());
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  const lastLoginString = localStorage.getItem("LastLogin");
  let LastLogin: Date | null = lastLoginString
    ? new Date(Date.parse(lastLoginString))
    : null;

  return (
    <div>
      <section className="lastLoginContainer">
        <div className="lastLoginDate">
          <DateContainer
            loginString1={LastLogin?.toLocaleDateString("en-US", {
              weekday: "short",
            })}
            loginString2={LastLogin?.getUTCDate().toLocaleString("en-US")}
            style1={{ background: "linear-gradient(135deg, var(--tag-red) 0%, #ffffff 400%)"}}
            style2={{ background: "linear-gradient(135deg, var(--tag-yellow) 0%, #ffffff 400%)"}}
            subheader1="day"
            subheader2="date"
          />
          <DateContainer
            loginString1={LastLogin?.getMonth().toLocaleString("en-US")}
            loginString2={
              "'" +
              LastLogin?.getFullYear()
                .toString()
                .slice(2)
            }
            style1={{ background: "linear-gradient(135deg, var(--tag-green) 0%, #ffffff 400%)"}}
            style2={{ background: "linear-gradient(135deg, var(--tag-blue) 0%, #ffffff 400%)"}}
            subheader1="mo"
            subheader2="yr"
          />
        </div>
        <DateContainer
          loginString1={LastLogin?.getHours().toLocaleString("en-US")}
          loginString2={LastLogin?.getMinutes().toLocaleString("en-US")}
          style1={{ background: "linear-gradient(135deg, var(--tag-blue) 0%, #ffffff 400%)"}}
          style2={{ background: "linear-gradient(135deg, var(--tag-purple) 0%, #ffffff 400%)"}}
          subheader1="hr"
          subheader2="min"
        />
      </section>
    </div>
  );
};

export default LastLogin;
