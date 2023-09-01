import React from "react";
import { Routes, Route } from "react-router-dom";
import Dashboard from "../components/Dashboard";
import AddOrganisation from "../containers/AddOrganisation";
const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/addOrganisation" element={<AddOrganisation />} />
    </Routes>
  );
};

export default AppRoutes;
