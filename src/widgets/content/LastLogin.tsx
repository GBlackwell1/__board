import React from "react";

const LastLogin: React.FC = () => {
  window.addEventListener("beforeunload", () => {
    localStorage.setItem("LastLogin", new Date().toLocaleString());
  });

  let LastLogin: string | null | undefined = localStorage.getItem("LastLogin") ? localStorage.getItem("LastLogin") : "No previous logins";
  
  return (
    <div>
      <p>Time of last login: { LastLogin }</p>
    </div>
  );
}

export default LastLogin;
