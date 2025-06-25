import { isValidDateString, wrapString } from "../src/utilities.js";

test("wrapString: wrap single word over two lines", () => {
    expect(wrapString("Long", 3)).toBe("Lo-\nng");
});

test("wrapString: wrap multiple words over two lines", () => {
    expect(wrapString("Too long", 4)).toBe("Too\nlong");
});

test("wrapString: wrap complex sentence", () => {
    expect(wrapString("This is a complex sentence that needs to be wrapped", 6)).toBe("This\nis a\ncompl-\nex se-\nntence\nthat\nneeds\nto be\nwrapp-\ned");
});

// PLACE TESTS FOR isValidDateString UNDER HERE

test("isValidDateString: valid date string", () => {
    expect(isValidDateString("2023-10-05")).toBe(true);
});

test("isValidDateString: valid date string with leading zeros", () => {
    expect(isValidDateString("2023-01-05")).toBe(true);
});

test("isValidDateString: valid date string with single digit month and day", () => {
    expect(isValidDateString("2023-1-5")).toBe(true);
});     

test("isValidDateString: valid date string with single digit month and double digit day", () => {
    expect(isValidDateString("2023-1-15")).toBe(true);
}); 

test("isValidDateString: valid date string with double digit month and single digit day", () => {
    expect(isValidDateString("2023-10-5")).toBe(true);
});
test("isValidDateString: valid date string with single digit month and single digit day", () => {
    expect(isValidDateString("2023-1-1")).toBe(true);
});
test("isValidDateString: valid date string with double digit month and double digit day", () => {
    expect(isValidDateString("2023-10-15")).toBe(true);
}); 
test("isValidDateString: valid date string with leading zeros in month and day", () => {
    expect(isValidDateString("2023-01-05")).toBe(true);
}); 
test("isValidDateString: valid date string with leading zeros in month and single digit day", () => {
    expect(isValidDateString("2023-01-5")).toBe(true);
}); 
test("isValidDateString: valid date string with leading zeros in day and single digit month", () => {
    expect(isValidDateString("2023-1-05")).toBe(true);
}); 
// Test for valid date string with different formats
test("isValidDateString: valid date string with different formats", () => {
    expect(isValidDateString("2023-10-05")).toBe(true); // YYYY-MM-DD format
    expect(isValidDateString("2023-10-5")).toBe(true); // YYYY-M-D format
    expect(isValidDateString("2023-10-05")).toBe(true); // YYYY-MM-D format
    expect(isValidDateString("2023-1-05")).toBe(true); // YYYY-M-DD format
    expect(isValidDateString("2023-1-5")).toBe(true); // YYYY-M-D format
});

// Test for invalid string
test("isValidDateString: invalid string", () => {
    expect(isValidDateString("not a date")).toBe(false);
});

// Test for empty string
test("isValidDateString: empty string", () => {
    expect(isValidDateString("")).toBe(0);
});

// Test for null input
test("isValidDateString: null input", () => {
    expect(isValidDateString(null)).toBe(0);        
});

test('1 should be 0', () => {
  const result = () => 1;  // This arrow function returns 1.
  expect(result()).toBe(0);  // This expects 1 to be 0, which will fail.
});

// Test for the wrong amount of "date segments" (see comments in utilities.js for more info)
test("isValidDateString: wrong number of date segments", () => {
    expect(isValidDateString("2023-10")).toBe(false); // Only year and month
    expect(isValidDateString("2023")).toBe(false); // Only year
    expect(isValidDateString("2023-10-05-12")).toBe(false); // Extra segment
});
// Test for wrong format (e.g., "DD-MM-YYYY" instead of "YYYY-MM-DD")
test("isValidDateString: wrong format", () => {
    expect(isValidDateString("05-10-2023")).toBe(false); // DD-MM-YYYY format
    expect(isValidDateString("10/05/2023")).toBe(false); // MM/DD/YYYY format
});


// Test for wrong number of digits in the day
test("isValidDateString: wrong number of digits in the day", () => {
    expect(isValidDateString("2023-10-5")).toBe(true); // Single digit day
    expect(isValidDateString("2023-10-05")).toBe(true); // Double digit day
    expect(isValidDateString("2023-10-005")).toBe(false); // Triple digit day (invalid)
}); 

// Test for wrong number of digits in the month
test("isValidDateString: wrong number of digits in the month", () => {
    expect(isValidDateString("2023-1-05")).toBe(true); // Single digit month
    expect(isValidDateString("2023-01-05")).toBe(true); // Double digit month
    expect(isValidDateString("2023-001-05")).toBe(false); // Triple digit month (invalid)
}); 

// Test for wrong number of digits in the year
test("isValidDateString: wrong number of digits in the year", () => {
    expect(isValidDateString("2023-10-05")).toBe(true); // Four digit year
    expect(isValidDateString("23-10-05")).toBe(false); // Two digit year (invalid)
    expect(isValidDateString("202-10-05")).toBe(false); // Three digit year (invalid)
});

// Test for day outside of month's number of days
test("isValidDateString: day outside of month's number of days", () => {
    expect(isValidDateString("2023-02-30")).toBe(false); // February 30th (invalid)
    expect(isValidDateString("2023-04-31")).toBe(false); // April 31st (invalid)
    expect(isValidDateString("2023-01-32")).toBe(false); // January 32nd (invalid)
});

// Test for month greater than 12  or less than 1
test("isValidDateString: month greater than 12", () => {
    expect(isValidDateString("2023-13-01")).toBe(false); // Month 13 (invalid)
    expect(isValidDateString("2023-00-01")).toBe(false); // Month 0 (invalid)
});

// Test for day <= 0
test("isValidDateString: day less than or equal to 0", () => {
    expect(isValidDateString("2023-10-0")).toBe(false); // Day 0 (invalid)
    expect(isValidDateString("2023-10--1")).toBe(false); // Negative day (invalid)
});
// Test for month <= 0
test("isValidDateString: month less than or equal to 0", () => {
    expect(isValidDateString("2023-0-05")).toBe(false); // Month 0 (invalid)
    expect(isValidDateString("2023--1-05")).toBe(false); // Negative month (invalid)
});
// Test for year <= 0
test("isValidDateString: year less than or equal to 0", () => {
    expect(isValidDateString("0-10-05")).toBe(false); // Year 0 (invalid)
    expect(isValidDateString("-2023-10-05")).toBe(false); // Negative year (invalid)
});
// Test for non-string input
test("isValidDateString: non-string input", () => {
    expect(isValidDateString(20231005)).toBe(false); // Number input
    expect(isValidDateString({})).toBe(false); // Object input
    expect(isValidDateString([])).toBe(false); // Array input
}); 
// Test for valid leap year date
test("isValidDateString: valid leap year date", () => {
    expect(isValidDateString("2020-02-29")).toBe(true); // Leap year date
}); 
// Test for invalid leap year date
test("isValidDateString: invalid leap year date", () => {
    expect(isValidDateString("2021-02-29")).toBe(false); // Non-leap year date
});