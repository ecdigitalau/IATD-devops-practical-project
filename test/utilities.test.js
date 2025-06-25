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
    expect(isValidDateString("25/06/2025")).toBe(true);
});


test("isValidDateString: valid date string with leading zeros", () => {
    expect(isValidDateString("05/01/2025")).toBe(true);
});

test("isValidDateString: valid date string with single digit month and day", () => {
    expect(isValidDateString("5/1/2025")).toBe(false);
});     

test("isValidDateString: valid date string with single digit month and double digit day", () => {
    expect(isValidDateString("15/1/2025")).toBe(false);
}); 

test("isValidDateString: valid date string with double digit month and single digit day", () => {
    expect(isValidDateString("5/10/2025")).toBe(false);
});

test("isValidDateString: valid date string with single digit month and single digit day", () => {
    expect(isValidDateString("1/1/2025")).toBe(false);
});

test("isValidDateString: valid date string with double digit month and double digit day", () => {
    expect(isValidDateString("15/10/2025")).toBe(true);
}); 

test("isValidDateString: valid date string with leading zeros in month and day", () => {
    expect(isValidDateString("05/01/2025")).toBe(true);
}); 

test("isValidDateString: valid date string with leading zeros in month and single digit day", () => {
    expect(isValidDateString("5/01/2025")).toBe(false);
}); 

test("isValidDateString: valid date string with leading zeros in day and single digit month", () => {
    expect(isValidDateString("05/1/2025")).toBe(false);
}); 

// Tests for valid date string with different formats
test("isValidDateString: valid date string with different formats", () => {
    expect(isValidDateString("05/10/2025")).toBe(true); // DD/MM/YYYY
    expect(isValidDateString("5/10/2025")).toBe(false);  // D/MM/YYYY
    expect(isValidDateString("05/10/2025")).toBe(true); // DD/MM/YYYY
    expect(isValidDateString("05/1/2025")).toBe(false);  // DD/M/YYYY
    expect(isValidDateString("5/1/2025")).toBe(false);   // D/M/YYYY
});

// Test for invalid string
test("isValidDateString: invalid date string with wrong format", () => {
    expect(isValidDateString("2025/10/05")).toBe(false);
});

// Test for empty string
test("isValidDateString: empty string", () => {
    expect(isValidDateString("")).toBe(false);
});

// Test for null input
test("isValidDateString: null input", () => {
    expect(isValidDateString(null)).toBe(false);
}); 

test('1 should be 1', () => {
  const result = () => 1;  // This arrow function returns 1.
  expect(result()).toBe(1);  // This expects 1 to be 1, which will pass.
});

// Test for the wrong amount of "date segments" (see comments in utilities.js for more info)
test("isValidDateString: wrong number of date segments", () => {
    expect(isValidDateString("06-2025")).toBe(false); // Only year and month
    expect(isValidDateString("2025")).toBe(false); // Only year
    expect(isValidDateString("25-06-12-2025")).toBe(false); // Extra segment
});
// Test for wrong format (e.g., "YYYY-MM-DD" instead of "DD-MM-YYYY")
test("isValidDateString: wrong format", () => {
    expect(isValidDateString("2025-06-25")).toBe(false); // YYYY-MM-DD format
    expect(isValidDateString("2025/06/25")).toBe(false); // YYYY/MM/DD format
});

// Test for wrong number of digits in the day
test("isValidDateString: wrong number of digits in the day", () => {
    expect(isValidDateString("5-10-2025")).toBe(false);   // Single digit day
    expect(isValidDateString("05/10/2025")).toBe(true);  // Double digit day
    expect(isValidDateString("005/10/2025")).toBe(false); // Triple digit day (invalid)
}); 

// Test for wrong number of digits in the month
test("isValidDateString: wrong number of digits in the month", () => {
    expect(isValidDateString("05/1/2025")).toBe(false);   // Single digit month
    expect(isValidDateString("05/01/2025")).toBe(true);  // Double digit month
    expect(isValidDateString("05/001/2025")).toBe(false); // Triple digit month (invalid)
}); 

// Test for wrong number of digits in the year
test("isValidDateString: wrong number of digits in the year", () => {
    expect(isValidDateString("05/10/2025")).toBe(true);  // Four digit year
    expect(isValidDateString("05/10/23")).toBe(false);   // Two digit year (invalid)
    expect(isValidDateString("05/10/202")).toBe(false);  // Three digit year (invalid)
});

// Test for day outside of month's number of days
test("isValidDateString: day outside of month's number of days", () => {
    expect(isValidDateString("30/02/2025")).toBe(false); // February 30th (invalid)
    expect(isValidDateString("31/04/2025")).toBe(false); // April 31st (invalid)
    expect(isValidDateString("32/01/2025")).toBe(false); // January 32nd (invalid)
});

// Test for month greater than 12 or less than 1
test("isValidDateString: month greater than 12", () => {
    expect(isValidDateString("01/13/2025")).toBe(false); // Month 13 (invalid)
    expect(isValidDateString("01/00/2025")).toBe(false); // Month 0 (invalid)
});

// Test for day <= 0
test("isValidDateString: day less than or equal to 0", () => {
    expect(isValidDateString("0/10/2025")).toBe(false);   // Day 0 (invalid)
    expect(isValidDateString("-1/10/2025")).toBe(false);  // Negative day (invalid)
});

// Test for month <= 0
test("isValidDateString: month less than or equal to 0", () => {
    expect(isValidDateString("05/0/2025")).toBe(false);   // Month 0 (invalid)
    expect(isValidDateString("05-/-1/2025")).toBe(false);  // Negative month (invalid)
});

// Test for year <= 0
test("isValidDateString: year less than or equal to 0", () => {
    expect(isValidDateString("05/10/0")).toBe(false);       // Year 0 (invalid)
    expect(isValidDateString("05/10/-2025")).toBe(false);   // Negative year (invalid)
});

// Test for non-string input
test("isValidDateString: non-string input", () => {
    expect(isValidDateString(20250625)).toBe(false); // Number input
    expect(isValidDateString(25062025)).toBe(false); // Number input
    expect(isValidDateString({})).toBe(false);       // Object input
    expect(isValidDateString([])).toBe(false);       // Array input
}); 

// Test for valid leap year date
test("isValidDateString: valid leap year date", () => {
    expect(isValidDateString("29/02/2020")).toBe(true); // Leap year date
}); 

// Test for invalid leap year date
test("isValidDateString: invalid leap year date", () => {
    expect(isValidDateString("29/02/2021")).toBe(false); // Non-leap year date
});
