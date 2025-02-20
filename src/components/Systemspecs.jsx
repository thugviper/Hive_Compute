import React, { useState, useEffect } from "react";
import "./SystemSpecs.css";

const SystemSpecs = () => {
  // Predefined system information
  const cpu = "Intel Core i7-10700K";
  const memory = "16 GB";
  const os = "Windows 11 Pro";
  const gpu = "Nvidia Rtx 3050-ti";
  const credits = 5000

  return (
    // <div className="system-specs-container  ">
    //   <h1>System Specifications</h1>
    //   <div className="specs-display">
    //     <p><strong>CPU:</strong> {cpu}</p>
    //     <p> --------------------- </p>
    //     <p><strong>Memory:</strong> {memory}</p>
    //     <p> --------------------- </p>
    //     <p><strong>Operating System:</strong> {os}</p>
    //     <p> --------------------- </p>
    //     <p><strong>GPU</strong> {gpu}</p>
    //     <p> --------------------- </p>
    //     <p><strong>Credit Balance:</strong> {credits}</p>
    //   </div>
    // </div>
    <div className=" system-specs-container flex bg-gray-600">
      <div className="bg-white/10 backdrop-blur-md text-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h1 className="text-xl font-semibold mb-4 text-center">System Specifications</h1>
        <div className="space-y-2 spec-display">
          <p><strong>CPU:</strong> {cpu}</p>
          <hr className="border-gray-500" />
          <p><strong>Memory:</strong> {memory}</p>
          <hr className="border-gray-500" />
          <p><strong>Operating System:</strong> {os}</p>
          <hr className="border-gray-500" />
          <p><strong>GPU:</strong> {gpu}</p>
          <hr className="border-gray-500" />
          <p><strong>Credit Balance:</strong> {credits}</p>
        </div>
      </div>
    </div>

  );
};

export default SystemSpecs;