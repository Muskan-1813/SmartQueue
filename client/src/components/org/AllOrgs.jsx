import React, { useState } from "react";
import { setOrgs } from "../../redux/features/orgSlice.js";
import { motion } from "framer-motion";
import Error from "../utils/Error.jsx";
import api from "../../api/api.js";
import { useSelector } from "react-redux";

function AllOrgs() {
  const [error, setError] = useState(null);
  const allOrgs = useSelector((state) => state.orgs);
  try {
    const res = api.get("/org");
    console.log("orgs:", res.data);
    setOrgs(res.data);
  } catch (err) {
    console.log(err);
    setError(err.response?.data?.message);
  }
  motion;
  return (
    <motion.div className="m-40">
      {error && <Error err={error} />}
      {allOrgs.map((org, idx) => (
        <motion.div key={idx} className="m-40">
          <p> {org.name} </p>
        </motion.div>
      ))}
    </motion.div>
  );
}

export default AllOrgs;
