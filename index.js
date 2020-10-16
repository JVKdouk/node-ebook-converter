const { Worker, isMainThread, MessageChannel } = require('worker_threads');
const path = require('path');

let ebookThreadSize = 3;
let executionQueue = [];
let idleQueue = [];

function convert (data) {
    if (!isMainThread) return;

    const removeWorkerFromQueue = (id) => {
        executionQueue = executionQueue.filter(item => item.worker.threadId !== id);
        refreshExecutionQueue();
    }

    const addWorkerToQueue = (item) => {
        idleQueue.push(item);
        refreshExecutionQueue();
    }

    const refreshExecutionQueue = () => {
        if (executionQueue.length >= ebookThreadSize || idleQueue.length === 0) return;
        const item = idleQueue[0];
        executionQueue.push(item);
        item.worker.postMessage({ port: item.port }, [item.port]);
        idleQueue.shift();
    }

    return new Promise((resolve, reject) => {
        data.input = path.resolve(require.main.path, data.input);
        data.output = path.resolve(require.main.path, data.output);

        const worker = new Worker('./converter.js', { env: { ...data } });
        const channel = new MessageChannel();

        channel.port2.on('message', value => resolve(value));
        channel.port2.on('close', () => removeWorkerFromQueue(worker.threadId));
        worker.on('error', error => reject(error));

        addWorkerToQueue({ ...data, worker, port: channel.port1 });
    });
}

exports.convert = convert;
exports.setPoolSize = (value) => { ebookThreadSize = value };