import React, { createContext, useContext, useState } from "react";
const OTTContext = createContext(null);
function Account() {
  return (
    <div>
      <Devices />
    </div>
  );
}
function Devices() {
  return (
    <div>
      <Tv />
      <Phone />
    </div>
  );
}
function Tv() {
  const { netflix, setNetflix, amazon, setAmazon } = useContext(OTTContext);
  return (
    <div>
      <h3>Tv</h3>
      <p>Netflix Watched: {netflix}</p>
      <p>Amazon Watched: {amazon}</p>
      <button onClick={() => setNetflix("ep1")}>Netflix</button>{" "}
      <button onClick={() => setAmazon("newap1")}>Amazon</button>
    </div>
  );
}
function Phone() {
  const { netflix, setNetflix, amazon, setAmazon } = useContext(OTTContext);
  return (
    <div>
      <h3>Phone</h3>
      <h5>Netflix Watched: {netflix}</h5>
      <h5>Amazon Watched: {amazon}</h5>
      <button onClick={() => setNetflix("ep2")}>Netflix</button>{" "}
      <button onClick={() => setAmazon("newap2")}>Amazon</button>
    </div>
  );
}
