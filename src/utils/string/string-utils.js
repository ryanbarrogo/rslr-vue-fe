/**
 * Returns a random string from given characters or a default set
 * @param {Number} length
 * @param {String} set
 * @returns {String}
 */
export function random(length = 16, set = '') {

    if (length === undefined || typeof length !== 'number' || length <= 0) {
        length = 16;
    }

    let charList = (typeof set === 'string' && set.length > 0)
        ? set
        : "ABCDEF0123456789";

    const maxCharIdx = (charList.length - 1);
    let randomString = '';
    let randomNumber = function () {
        return Math.floor((Math.random() * maxCharIdx));
    };
    do {
        let randomChar = charList.substr(randomNumber(), 1);
        randomString += randomChar;
    } while (randomString.length < length);
    return randomString;
}

/**
 * Generates a somewhat convincing UUID4
 * @returns {string}
 */
export function fakeUuid4() {
    return /([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})/gi
    .exec(random(32))
    .slice(1, 6)
    .join('-');
}

/**
 * Generates an effective UUID4
 * @returns {string}
 */
export function uuid4() {
    return /([A-F0-9]{8})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{4})([A-F0-9]{12})/gi
    .exec(random(32))
    .slice(1, 6)
    .join('-');
}

export function replaceWithParams(stringTemplate, params) {
    let replacedStr = stringTemplate;

    Object.keys(params).forEach((key) => {
        let match = `[${key}]`;

        if (stringTemplate.includes(match)) {
            replacedStr = replacedStr.replace(match, params[key]);
        }
    });

    return replacedStr;
}
