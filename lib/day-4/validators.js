// ex birthYearValidator(test.split('byr:').filter(Boolean)[0]);
function birthYearValidator(year) {
    return yearValidator(year, 1920, 2002);
}

// ex issueYearValidator(test.split('byr:').filter(Boolean)[0]);
function issueYearValidator(year) {
    return yearValidator(year, 2010, 2020);
}

// ex experirationYearValidator(test.split('byr:').filter(Boolean)[0]);
function experirationYearValidator(year) {
    return yearValidator(year, 2020, 2030);
}

// ex heightValidator(test.split('hgt:').filter(Boolean)[0]);
function heightValidator(height) {
    let cm = height.includes('cm') ? height.split('cm')[0] : '';
    let inch = height.includes('in') ? height.split('in')[0] : '';;

    if (cm) return rangeValidator(Number(cm), 150, 193);
    else if (inch) return rangeValidator(Number(inch), 59, 76);
    return false;
}

// ex hairColorValidator(test.split('hcl:').filter(Boolean)[0]);
function hairColorValidator(color) {
    if (color.charAt(0) !== '#') return false;
    else if (color.replace(/[^0-9a-f]/gi, '').length !== 6) return false;
    return true;
}

// ex eyeColorValidator(test.split('ecl:').filter(Boolean)[0]);
function eyeColorValidator(color) {
    const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
    return validEyeColors.some(x => x == color);
}

// ex passportValidator(test.split('pid:').filter(Boolean)[0]);
function passportValidator(passportId, validLength = 9) {  
    if (passportId.length > validLength) return false;
    if (!Number.isInteger(Number(passportId))) return false;
    if (passportId.length < validLength) return false;
    return true;
}

function yearValidator(year, startInterval, endInterval) {
    if (year.length !== 4) return false;
    if (!rangeValidator(Number(year), startInterval, endInterval)) return false;
    return true;
}

function rangeValidator(num, start, end) {
    if (num < start || num > end) return false;
    return true;
}

export {
    birthYearValidator,
    issueYearValidator,
    experirationYearValidator,
    heightValidator,
    hairColorValidator,
    eyeColorValidator,
    passportValidator
}