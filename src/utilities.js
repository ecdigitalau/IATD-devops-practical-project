/**
 * Returns toWrap split with newlines inserted at relevant points to avoid exceeding lineLength characters per line.
 * Attempts to break between words but will split using hyphens if necessary.
 * 
 * @param {string} toWrap the string to wrap
 * @param {number} lineLength the maximum number of characters per line
 */
export function wrapString(toWrap, lineLength) {
    const words = toWrap.split(" ");
    let wrapped = "";
    let currentLineLength = 0;

    words.forEach(word => {
        let remainingLength = lineLength - currentLineLength;
        if (word.length >= remainingLength && word.length <= lineLength || word.length > lineLength && remainingLength < 3) {
            wrapped = wrapped.concat("\n");
            currentLineLength = 0;
            remainingLength = lineLength - currentLineLength;
        }

        if (word.length > lineLength) {
            let first = "";
            let second = "";

            if (currentLineLength === 0) {
                first = word.slice(0, remainingLength - 1);
                second = word.slice(remainingLength - 1, word.length);
                wrapped = wrapped.concat(first, "-\n", second);
            } else {
                first = word.slice(0, remainingLength - 2);
                second = word.slice(remainingLength - 2, word.length);
                wrapped = wrapped.concat(" ", first, "-\n", second);
            }
            currentLineLength = second.length;
        } else {
            if (currentLineLength === 0) {
                wrapped = wrapped.concat(word);
                currentLineLength += word.length;
            } else {
                wrapped = wrapped.concat(" ", word);
                currentLineLength += word.length + 1;
            }
        }
    })

    return wrapped;
}

/**
 * Prints the provided string, breaking it where necessary to ensure it does not exceed maxLength characters per line.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logWrapped(toPrint, lineLength) {
    console.log(wrapString(toPrint, lineLength));
}

/**
 * Prints the provided string surrounded by separators.
 * 
 * @param {string} toPrint the string to print
 * @param {number} lineLength the maximum number of characters to print per line
 */
export function logSeparated(toPrint, lineLength) {
    console.log("=".repeat(lineLength));
    logWrapped(toPrint, lineLength);
    console.log("=".repeat(lineLength));
}

/**
 * Returns true if the string complies with DD/MM/YYYY date formatting and is a valid date. Returns false otherwise.
 * 
 * @param {string} date the date to validate
 */
export function isValidDateString(date) {
    // Null/undefined/empty check
    if (typeof date !== 'string' || !date.trim()) return false;

    const segments = date.split("/"); // DD/MM/YYYY

    if (segments.length !== 3) return false;

    // Ensure strict format: DD/MM/YYYY
    if (segments[0].length !== 2 || segments[1].length !== 2 || segments[2].length !== 4) return false;

    const [dayStr, monthStr, yearStr] = segments;
    const day = Number(dayStr);
    const month = Number(monthStr);
    const year = Number(yearStr);

    if (
        isNaN(day) || isNaN(month) || isNaN(year) ||
        day <= 0 || month <= 0 || year <= 0 ||
        month > 12
    ) {
        return false;
    }

    // Handle February and leap year logic
    if (month === 2) {
        const isLeap = (year % 4 === 0 && year % 100 !== 0) || (year % 400 === 0);
        if (day > (isLeap ? 29 : 28)) return false;
    } else {
        const daysInMonths = [31, -1, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
        if (day > daysInMonths[month - 1]) return false;
    }

    return true;
}
