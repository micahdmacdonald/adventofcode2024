const fs = require('fs');

leftList = [];
rightList = [];
distances = [];
totalDistance = 0;

similarities = [];
similarity = 0;

const startTime = Date.now();

fs.readFile('day1.txt', 'utf8', (err, data) => {
    if (err) {
    console.error('Error reading file:', err);
    return;
    }

    // Split the file content into lines
    const rows = data.split('\n');

    // Map each line into an array of two columns, splitting by tab
    leftList = rows.map(row => row.split('   ')[0]).sort((a, b) => a - b);
    rightList = rows.map(row => row.split('   ')[1]).sort((a, b) => a - b);

    console.log('Left list length: ', leftList.length);
    console.log('Right list length: ', rightList.length);

    leftList.forEach((element, index) => {
        distances.push(Math.abs(element - rightList[index]));
        similarities.push(element * rightList.filter(num => num === element).length);
    });

    totalDistance = distances.reduce((prev, cur) => { return prev + cur});
    similarity = similarities.reduce((prev, cur) => { return prev + cur});
    console.log('Total distance: ', totalDistance);
    console.log('Total similarity: ', similarity);
    console.log('Execution time: ', Date.now() - startTime, 'ms');
    console.log('Similarities: ', similarities.filter(num => num > 0));
});
