const WebSocket = require("ws");
const fs = require('fs');
const server = new WebSocket.Server({ port: 8080 });

let workers = new Map(); // Stores workers and their power values
let pendingTasks = {};
let startTime = null;

server.on("connection", (ws) => {
    console.log("✅ New Client Connected!");

    ws.on("message", (message) => {
        const data = JSON.parse(message);

        if (data.type === "register") {
            workers.set(ws, data.power); // Store computational power
            console.log(`🖥️ Worker Registered (Power: ${data.power}, Total Workers: ${workers.size})`);
        }
        else if (data.type === "task") {
            console.log("📥 Task Received for Matrix Multiplication");
            startTime = Date.now();

            // Write input matrices to files
            fs.writeFileSync('log_data/matrixA.json', JSON.stringify(data.matrixA));
            fs.writeFileSync('log_data/matrixB.json', JSON.stringify(data.matrixB));

            if (workers.size === 0) {
                console.log("⚠️ No workers available! Running computation locally...");
                let localStart = Date.now();

                let result = multiplyMatrices(data.matrixA, data.matrixB);
                let totalTime = Date.now() - localStart;
                console.log(`🖥️ Computation completed locally in ${totalTime} ms`);

                ws.send(JSON.stringify({ type: "result", result, totalTime }));
            } else {
                distributeTask(data.matrixA, data.matrixB, ws);
            }
        }
        else if (data.type === "result") {
            console.log(`✅ Result received from Worker ${data.workerId}`);
            handleResult(data);
        }
    });

    ws.on("close", () => {
        workers.delete(ws);
        console.log("❌ Worker Disconnected!");
    });
});

function distributeTask(matrixA, matrixB, requester) {
    let totalPower = [...workers.values()].reduce((a, b) => a + b, 0); // Sum all computational power
    let workersArray = [...workers.keys()]; // Get worker WebSocket objects
    let totalRows = matrixA.length;

    pendingTasks = {};
    let rowIndex = 0;

    for (let i = 0; i < workersArray.length; i++) {
        let workerPower = workers.get(workersArray[i]);
        let chunkSize = Math.round((workerPower / totalPower) * totalRows); // Assign proportional work

        let rowChunk = matrixA.slice(rowIndex, rowIndex + chunkSize);
        console.log(`📤 Assigning ${chunkSize} rows to Worker ${i} (Rows ${rowIndex} - ${rowIndex + chunkSize - 1}, Power: ${workerPower})`);

        pendingTasks[i] = { requester, results: [], expected: workersArray.length };
        workersArray[i].send(JSON.stringify({ type: "compute", matrixA: rowChunk, matrixB, workerId: i, startTime: Date.now() }));

        // Log task assignment
        fs.appendFileSync('log_data/worker_logs.txt', `Worker ${i} assigned ${chunkSize} rows at ${new Date().toISOString()}\n`);

        rowIndex += chunkSize;
    }
}

// function handleResult(data) {
//     let requester = pendingTasks[data.workerId]?.requester;
//     if (!requester) return;

//     let workerTime = Date.now() - data.startTime;
//     console.log(`⏱️ Worker ${data.workerId} finished in ${workerTime} ms`);

//     // Log task completion
//     fs.appendFileSync('log_data/worker_logs.txt', `Worker ${data.workerId} completed task in ${workerTime} ms at ${new Date().toISOString()}\n`);

//     pendingTasks[data.workerId].results.push(...data.result);

//     let allResults = Object.values(pendingTasks).flatMap(t => t.results);
//     fs.writeFileSync('log_data/result.json', JSON.stringify(allResults));
//     if (allResults.length >= pendingTasks[data.workerId].expected) {
//         let totalTime = Date.now() - startTime;
//         console.log(`🚀 All results received in ${totalTime} ms! Sending to requester.`);

//         // Write output matrix to file


//         requester.send(JSON.stringify({ type: "result", result: allResults, totalTime }));
//         pendingTasks = {}; // Clear tasks
//     }
// }
function handleResult(data) {
    let requester = pendingTasks[data.workerId]?.requester;
    if (!requester) return;

    let workerTime = Date.now() - data.startTime;
    console.log(`⏱️ Worker ${data.workerId} finished in ${workerTime} ms`);

    // Log task completion
    fs.appendFileSync('log_data/worker_logs.txt', `Worker ${data.workerId} completed task in ${workerTime} ms at ${new Date().toISOString()}\n`);

    pendingTasks[data.workerId].results.push(...data.result);

    let allResults = Object.values(pendingTasks).flatMap(t => t.results);
    try {
        fs.writeFileSync('log_data/result.json', JSON.stringify(allResults));
        console.log('✅ Results written to result.json');
    } catch (err) {
        console.error('Error writing to result.json:', err);
    }

    if (allResults.length >= pendingTasks[data.workerId].expected) {
        let totalTime = Date.now() - startTime;
        console.log(`🚀 All results received in ${totalTime} ms! Sending to requester.`);
        try {
            requester.send(JSON.stringify({ type: "result", result: allResults, totalTime }));
            console.log('✅ Results sent to requester');
        } catch (err) {
            console.error('Error sending results to requester:', err);
        }

        pendingTasks = {}; // Clear tasks
    }
}

function multiplyMatrices(A, B) {
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
}

console.log("🚀 WebSocket Server running on ws://0.0.0.0:8080");
