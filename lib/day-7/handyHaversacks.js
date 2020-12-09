import { getFormattedData } from '../../bin/fileParser.js';

const parseBagRules = (bagRules) => {
    return bagRules.reduce((acc, bagRule) => {
        let [bagColor, bagContentsArray] = parseBagRule(bagRule);

        if (bagRule.includes('no other bags')) {
            acc[bagColor] = {};
        } else {
            acc[bagColor] = bagContentsArray.reduce((contents, bagContents) => {
                let contentArray = bagContents.split(' ');
                let bag = contentArray.slice(1, -1).join(' ');
                contents[bag] = Number(contentArray[0]);
                return contents;
            }, {});
        }
        return acc;
    }, {});;
}

const parseBagRule = (bagRule) => {
    let rulesArray = bagRule.split(' bags contain ').filter(x => x);
    let bagColor = rulesArray[0].trim();
    let bagContentsArray = rulesArray[1].split(', ').filter(x => x);

    return [
        bagColor,
        bagContentsArray
    ];
};

const hasBag = (bags, bag, searchTerm) => {
    if (bags[bag][searchTerm]) {
        return true;
    }

    return Object.keys(bags[bag]).reduce((acc, key) => {
        return acc || hasBag(bags, key, searchTerm);
    }, false);
};

function numberOfBags(bags, searchTerm) {
    return Object.keys(bags[searchTerm]).reduce((acc, key) => {
        return acc + bags[searchTerm][key] * (1 + numberOfBags(bags, key));
    }, 0);
}

const solveForOne = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '.\n', (bagRules) => {
        let bags = parseBagRules(bagRules);

        let count = Object.keys(bags).reduce((count, bag) => {
            return count + hasBag(bags, bag, 'shiny gold');
        }, 0);
        callback(count);
    });
};

const solveForTwo = (relativeFilePath, callback) => {
    getFormattedData(relativeFilePath, '.\n', (bagRules) => {
        let bags = parseBagRules(bagRules);
        let count = numberOfBags(bags, 'shiny gold');
        callback(count);
    });
};

export {
    solveForOne,
    solveForTwo
}