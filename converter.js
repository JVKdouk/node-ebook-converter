const fs = require('fs');
const { exec } = require('child_process');
const { parentPort } = require('worker_threads');

const execPromise = (command) => {
    return new Promise((resolve, reject) => {
        exec(command, (error, stdout) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(stdout);
        });
    });
}

parentPort.once('message', (value) => {
    const params = process.env;
    const inputPath = params.input;
    const outputPath = params.output;

    if (!(fs.existsSync(inputPath))) throw new Error(`Input path ${inputPath} not found!`);

    const command = `ebook-convert ${inputPath} ${outputPath}`;
    const startTime = new Date();
    
    console.log(`Converting ${inputPath}...`);

    execPromise(command)
        .then(message => {
            value.port.postMessage({ ...params, message, duration: new Date - startTime });
            value.port.close();

            if (params.delete) fs.unlink(inputPath, (err) => { if (err) throw err; });
        })
        .catch(err => { throw err; });
});