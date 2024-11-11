import React, { useState } from "react";
import { useSelector } from "react-redux";
import { NavLink, Navigate, Outlet, useNavigate, Link } from "react-router-dom";


import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";

const tabsItem = [
  {
    label: "Profile",
    value: "profile",
    path: "/profile",
  },
  {
    label: "Orders",
    value: "orders",
    path: "/profile/orders",
  },
  {
    label: "Payments",
    value: "payments",
    path: "/profile/payments",
  },
  {
    label: "Reviews",
    value: "reviews",
    path: "/profile/reviews",
  },
];

const Profile = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  const handleTabClick = (value, to) => {
    // Update the active tab state
    setActiveTab(value);

    // Navigate to the new path (to is assumed to be part of your data)
    navigate(to);
  };

  

  return (
      <div>
        <div className="">
        <Tabs value={activeTab}>
          <TabsHeader
            className="rounded-none border-b border-blue-gray-50 bg-transparent p-0"
            indicatorProps={{
              className:
                "bg-transparent border-b-2 border-gray-900 shadow-none rounded-none",
            }}
          >
            {tabsItem.map(({ label, value, path }) => (
              <Tab
                key={value}
                value={value}
                onClick={() => handleTabClick(value, path)}
                className={activeTab === value ? "text-gray-900" : ""}
              >
                {label}
              </Tab>
            ))}
          </TabsHeader>
        </Tabs>
      </div>
      <main className="p-8 bg-white w-full">
        <Outlet />
      </main>
      </div>
      
    
  );
};

export default Profile;
