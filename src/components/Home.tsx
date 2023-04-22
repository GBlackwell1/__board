import React from "react";

type Props = {
  handleLogout: () => void;
}

const Home: React.FC<Props> = ({handleLogout}) => {
    return (
        <>
        <h1>HOME</h1>
        </>
    );
}

export default Home;