const fs = require('fs');

let total = 0;

fs.readFile('input.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const mulRegex = /mul\(\d{1,3},\d{1,3}\)/g;
    const doRegex = /do\(\)/g;
    const dontRegex = /don't\(\)/g;

    const muls = [...data.matchAll(mulRegex)];
    const dos = [...data.matchAll(doRegex)];
    const donts = [...data.matchAll(dontRegex)];

    muls.forEach((mul, index) => {
        previousDos = dos.filter(item => item.index < mul.index);
        previousDonts = donts.filter(item => item.index < mul.index);

        if (previousDonts.length == 0 
            || (
                previousDos.length > 0 
                && previousDos.slice(-1)[0].index > previousDonts.slice(-1)[0].index
            )) {
            numbers = mul[0].match(/\d{1,3}/g).map(Number);
            total += numbers[0] * numbers[1];
        }
    });

    console.log('Total:', total);
});