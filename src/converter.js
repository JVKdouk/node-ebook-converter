const fs = require('fs');
const { parentPort } = require('worker_threads');
const execPromise = require('./execPromise');

parentPort.once('message', (value) => {
    const params = process.env;
    const inputPath = params.input;
    const outputPath = params.output;
    const nonFlagParams = ['input', 'output', 'delete', 'silent'];

    /* Guard Clause in case file cannot be found */
    if (!(fs.existsSync(inputPath))) throw new Error(`Input path ${inputPath} not found!`);

    const startTime = new Date();
    let command = `ebook-convert "${inputPath}" "${outputPath}"`;

    /* Add flag params to conversion command */
    Object.keys(process.env).forEach(key => {
        if (nonFlagParams.indexOf(key) > -1) return;
        if ([true, 'true'].indexOf(process.env[key]) > -1) command += ` --${key}`;
        else command += ` --${key}="${process.env[key]}"`;
    });
    
    if (params.silent !== 'true') console.log(`Converting ${inputPath}...`);

    /* Starts conversion */
    execPromise(command)
        .then(message => {
            value.port.postMessage({ ...params, message, duration: new Date - startTime });
            value.port.close();

            if (params.delete === 'true') fs.unlink(inputPath, (err) => { if (err) throw err; });
        })
        .catch(() => { process.exit(1) });
});
