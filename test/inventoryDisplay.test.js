import { createItemEntry, createTableHeader } from "../src/inventoryDisplay.js";

test("createTableHeader: create table header", () => {
    const expectedResult =
    `| Item Name            | Category             | Amount | Last Restocked |
=========================================================================`;
    expect(createTableHeader()).toBe(expectedResult);
});

test("createItemEntry: create single-line item entry", () => {
    const expectedResult =
    `| Single               | Line                 | 1      | 11/11/1111     |
-------------------------------------------------------------------------`;
    expect(createItemEntry({name: "Single", category: "Line", amount: 1, restocked: "11/11/1111"})).toBe(expectedResult);
});

test("createItemEntry: create item entry with multi-line name", () => {
    const expectedResult =
    `| This is a very long  | Short                | 1      | 11/11/1111     |
| name for an item     |                      |        |                |
-------------------------------------------------------------------------`;
    expect(createItemEntry({name: "This is a very long name for an item", category: "Short", amount: 1, restocked: "11/11/1111"})).toBe(expectedResult);
});

test("createItemEntry: create item entry with multi-line category", () => {
    const expectedResult =
    `| Short                | This is a very long  | 1      | 11/11/1111     |
|                      | name for an item's   |        |                |
|                      | category             |        |                |
-------------------------------------------------------------------------`;
    expect(createItemEntry({name: "Short", category: "This is a very long name for an item's category", amount: 1, restocked: "11/11/1111"})).toBe(expectedResult);
});

test("createItemEntry: create item entry with multi-line amount", () => {
    const expectedResult =
    `| Short                | Short                | 10000- | 11/11/1111     |
|                      |                      | 000000 |                |
-------------------------------------------------------------------------`;
    expect(createItemEntry({name: "Short", category: "Short", amount: 10000000000, restocked: "11/11/1111"})).toBe(expectedResult);
});

test("createItemEntry: create item entry with everything multi-line", () => {
    const expectedResult =
    `| This is a very long  | This is a very long  | 10000- | 11/11/1111     |
| name for an item     | name for an item's   | 000000 |                |
|                      | category             |        |                |
-------------------------------------------------------------------------`;
    expect(createItemEntry({name: "This is a very long name for an item", category: "This is a very long name for an item's category", amount: 10000000000, restocked: "11/11/1111"})).toBe(expectedResult);
});