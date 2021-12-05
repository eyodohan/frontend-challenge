import React, { useState } from "react";
import { useSelector } from "react-redux";

import Header from "../components/Header";

const Dashboard = () => {
  const state = useSelector((state) => state.auth);

  return (
    <div>
      <Header />
      <h3 className="mt-3 d-flex justify-content-center ">
        Daha Yapacak Çok İş Var
      </h3>
    </div>
  );
};

export default Dashboard;
