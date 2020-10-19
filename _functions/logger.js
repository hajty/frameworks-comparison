const fs = require('fs').promises;

module.exports = async (frameworkName, methodName, times) => {
    const path = `/home/hajty/Desktop/do pracy/BADANIA/${frameworkName}_${methodName}_${times.length}.txt`;
    let text = '';

    try {
        for (let time of times) text += time + '\n';
        await fs.writeFile(path, text);
        console.log(`${path} saved.`);
    } catch (e) {
        throw e;
    }
}