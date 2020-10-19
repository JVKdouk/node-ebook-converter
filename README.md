# Node E-Book Converter
Node.js minimal and powerful ebook converter (single package) with built in queue and threading functionalities. With a few steps, you can convert ebooks and other documents to any format wanted. You can also define custom properties defined at [Calibre Documentation](https://manual.calibre-ebook.com/generated/en/ebook-convert.html). **Atention:** This library is not responsable for the convertion algorithm, only the wrapper, queue system, threading and pooling.

# How to use it?
First, you need to install Calibre official conversion package, as this library work as a full-featured wrapper for it. To install it, access [Calibre Website](https://calibre-ebook.com/). (There are CLI and GUI versions).<br/><br/>
Second, install the package through NPM (Node Package Manager) as it follows:
```
npm i node-ebook-converter
```
If you use yarn as your package manager:
```
yarn add node-ebook-converter
```
<br/>
After installing the library, you must import it inside your .js (JavaScript) file and start converting ebooks:
```javascript
const ebookConverter =  require('node-ebook-converter');

/* Adds the convertion to the Execution Queue */
ebookConverter.convert({
  input: "./input/bear.pdf",
  output: "./output/bear.epub"
}).then(response => console.log(response))
  .catch(error => console.error(error));
```
This example takes a pdf at ```"./input/bear.pdf"``` and converts it to an epub (specified in the output extension) at ```"./output/bear.epub"```.
**To specifiy the output extension, you just need to specify the extension in the output attribute of the conversion object.**

# Convertion Attributes
You can specify attributes before starting your convertion. The list can be found in the following table:

| Attribute | Optional | Type | Description |
| ------------- |:-------------:| -----:|:---------:|
| input | false | string | Defines the input file to be converted (any extension) |
| output | false | string | Defines where to save the converted file to the specified extension (should contain the extension to convert in it) |
| delete | true | boolean | Deletes the input file when the conversion is done |

**Currently the library does not have support to many Calibre flags. Soon we will finish importing all of them!** (Help me do that, please)

# Methods
Currently, there are two methods in this package:

## Convert
Starts the conversion. Can be used through the following structure:
```javascript
ebookConverter.convert({
  input: "./input/bear.pdf", // Input file
  output: "./output/bear.epub", // Output file + Extension to convert
  delete: false // Does not delete input after converting
}).then(response => console.log(response))
  .catch(error => console.error(error));
```

## setThreadPoolSize
Changes the thread pool size, allowing the execution of n thread simultaneously. Can be used through the following structure:
```javascript
ebookConverter.setThreadPoolSize(2); // Allows 2 conversions to run simultaneously.
```
If more ebooks are added than the thread pool size, it will be stored in the Idle Queue to be processed later.

# Queue
This package comes with a built-in library system, allowing the user to add infinitely many conversions and limit the number of those that can occur concurrently. The size of the **Execution Queue** (Thread Pool Size) is defined through the ```setThreadPoolSize``` described above. If more convertions are called than the allowed by the Thread Pool Size, it will be stored in the **Idle Queue** to be processed later. This is an event-based and lightweight implementation of the queue process.

# Contributing
This package is built under the MIT license. For the long-term support, you can contribute to this project by openning issues in the "Issue" tab in the GitHub platform, submit Pull Requests, and give tips on building this package. If you want me to keep doing this kind of job, help me by [buying me a coffee!](https://www.buymeacoffee.com/JVKdouk)<br/><br/>
<a href="https://www.buymeacoffee.com/JVKdouk" target="_blank"><img src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png" alt="Buy Me A Coffee" style="max-width: 50%;" ></a>