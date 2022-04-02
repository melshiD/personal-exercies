const loadFile = file => Promise.resolve(`contents of ${file}`);
const files = ['01.md', '02.md', '03.md', '04.md', '05.md'];

const allPromises = files.map(file => loadFile(file));
Promise.all(allPromises).then(result => {
    console.log(result);
})