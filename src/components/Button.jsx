import React, { useState, useEffect } from "react";

const WebSocketButton = () => {
  const [ipAddress, setIpAddress] = useState(""); // State for input field
  const [ws, setWs] = useState(null);
  const [status, setStatus] = useState("Not connected");

  const connectWebSocket = () => {
    if (!ipAddress.trim()) {
      setStatus("Please enter an IP address!");
      return;
    }

    const socket = new WebSocket(`ws://${ipAddress}:8080`); // Dynamic IP Address

    socket.onopen = () => {
      console.log(`✅ Connected to Server at ${ipAddress}`);
      setStatus(`Connected to ${ipAddress}`);

      let computationalPower = estimatePower();
      socket.send(JSON.stringify({ type: "register", power: computationalPower }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "compute") {
        console.log(`📥 Worker ${data.workerId} received task (Processing ${data.matrixA.length} rows)`);
        setStatus("Processing matrix...");

        let start = Date.now();
        let result = multiplyMatrices(data.matrixA, data.matrixB);
        let end = Date.now();

        console.log(`⏱️ Worker ${data.workerId} finished in ${end - start} ms`);

        socket.send(JSON.stringify({ type: "result", workerId: data.workerId, result, startTime: data.startTime }));
        setStatus("Waiting for tasks...");
      }
    };

    setWs(socket);
  };

  const handleClick = () => {
    if (ws && ws.readyState === WebSocket.OPEN) {
      setStatus("Requesting Task...");
      ws.send(JSON.stringify({ type: "request_task" }));
    } else {
      setStatus("WebSocket Not Connected");
    }
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg opacity-3">
      <input
        type="text"
        placeholder="Enter IP Address (e.g., 10.108.18.168)"
        value={ipAddress}
        onChange={(e) => setIpAddress(e.target.value)}
        className="px-4 py-2 border border-gray-600 rounded-md text-black w-64"
      />
      <button
        onClick={connectWebSocket}
        className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
      >
        Connect WebSocket
      </button>
      <button
        onClick={handleClick}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        disabled={!ws || ws.readyState !== WebSocket.OPEN}
      >
        Request Task
      </button>
      <p>{status}</p>
    </div>
  );
};

// Matrix Multiplication Function
const multiplyMatrices = (A, B) => {
  let rowsA = A.length, colsA = A[0].length, colsB = B[0].length;
  let result = new Array(rowsA).fill(0).map(() => new Array(colsB).fill(0));

  for (let i = 0; i < rowsA; i++) {
    for (let j = 0; j < colsB; j++) {
      for (let k = 0; k < colsA; k++) {
        result[i][j] += A[i][k] * B[k][j];
      }
    }
  }
  return result;
};

// Estimate Computational Power
const estimatePower = () => {
  let start = Date.now();
  let testMatrixA = generateMatrix(100, 100);
  let testMatrixB = generateMatrix(100, 100);
  multiplyMatrices(testMatrixA, testMatrixB);
  let end = Date.now();
  return 1 / (end - start + 1);
};

// Generate Matrix with Random Numbers
const generateMatrix = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
  );
};

export default WebSocketButton;
