const fs = require('fs');

safeCount = 0;

function isReportSafe(report, originalReport, ignoreIndex = 0) {
    
    if (ignoreIndex > originalReport.length) { return false };

    summary = {
        'report': report,
        'ascendingIndices': [],
        'descendingIndices': [],
        'unsafeSpreadIndices': [],
        'isSafe': false
    }
    
    report.forEach((level, levelIndex) => {
        // Skip first level
        if (levelIndex == 0) { return };

        prevLevel = report[levelIndex - 1];

        if (level < prevLevel) {
            summary.descendingIndices.push(levelIndex);
        } else if (level > prevLevel) {
            summary.ascendingIndices.push(levelIndex);
        }

        // Any two adjacent levels differ by at least one and at most three.
        if (Math.abs(level - prevLevel) < 1 || Math.abs(level - prevLevel) > 3) {
            summary.unsafeSpreadIndices.push(levelIndex);
        } 
    });

    isAllAscending = summary.ascendingIndices.length == report.length - 1;
    isAllDescending = summary.descendingIndices.length == report.length - 1;
    hasUnsafeSpread = summary.unsafeSpreadIndices.length > 0;
    summary.isSafe = ((isAllAscending || isAllDescending) && !hasUnsafeSpread)

    if (summary.isSafe) {
        return true;
    } else {
        filteredReport = originalReport.filter((_, index) => index !== ignoreIndex );
        return isReportSafe(filteredReport, originalReport, ignoreIndex + 1);
    }
}

fs.readFile('day2.txt', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }
    
    const rows = data.split('\n');
    
    rows.forEach(row => {
        report = row.split(' ').map(Number);
        if (isReportSafe(report, report, 0)){
            safeCount += 1;
        }
    });

    console.log('Safe level count: ', safeCount);
});