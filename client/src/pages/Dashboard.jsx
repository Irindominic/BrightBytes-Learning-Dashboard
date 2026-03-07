import React from "react";

const Dashboard = () => {

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="p-6">

      <h2 className="text-2xl font-bold mb-4">
        Welcome {user?.name || "User"}
      </h2>

      <p className="text-gray-600">
        Role: {user?.role}
      </p>

    </div>
  );
};

export default Dashboard;