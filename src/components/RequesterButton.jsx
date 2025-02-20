import React, { useState, useEffect } from "react";

const RequesterButton = () => {
  const [ws, setWs] = useState(null);
  const [status, setStatus] = useState("Not connected");
  const [result, setResult] = useState(null);
  const [totalTime, setTotalTime] = useState(null);

  useEffect(() => {
    const socket = new WebSocket("ws://10.108.21.63:8080"); // Dheeraj's IP

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
      setStatus("Connected to WebSocket");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === "result") {
        console.log("✅ Final Result Received!");
        setResult(data.result);
        setTotalTime(data.totalTime);
      }
    };

    setWs(socket);

    return () => socket.close();
  }, []);

  const sendTask = () => {
    if (!ws || ws.readyState !== WebSocket.OPEN) {
      setStatus("WebSocket Not Connected");
      return;
    }

    let matrixA = generateMatrix(100, 100);
    let matrixB = generateMatrix(100, 100);
    console.log("📤 Sending Matrix Multiplication Task to Server...");
    ws.send(JSON.stringify({ type: "task", matrixA, matrixB }));
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-gray-800 text-white rounded-lg shadow-lg">
      <button
        onClick={sendTask}
        className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition disabled:opacity-50"
        disabled={!ws || ws.readyState !== WebSocket.OPEN}
      >
        Send Task
      </button>
      <p>{status}</p>

      {/* {result && (
        <div className="overflow-x-auto">
          <h2 className="text-lg font-bold mt-2">Result:</h2>
          <table className="border-collapse border border-gray-500 mt-2">
            <tbody>
              {result.slice(0, 10).map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.slice(0, 10).map((cell, cellIndex) => (
                    <td key={cellIndex} className="border border-gray-500 px-2 py-1">
                      {cell}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {result.length > 10 || result[0].length > 10 ? (
            <button
              className="mt-2 px-3 py-1 bg-gray-700 text-white rounded-md hover:bg-gray-600"
              onClick={() => setResult(result)}
            >
              Show More
            </button>
          ) : null}
        </div>
      )} */}

      {totalTime && <p className="text-green-400">Total Time: {totalTime} ms</p>}
    </div>
  );
};

const generateMatrix = (rows, cols) => {
  return Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 10))
  );
};

export default RequesterButton;
