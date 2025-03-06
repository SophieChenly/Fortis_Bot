const getTimeString = require('../functions/getTimeString');

test('Prints correct', () => {
    expect(getTimeString("12 AM")).toBe('🌌 12AM');
    expect(getTimeString("7 PM")).toBe('🌌 7PM');
    expect(getTimeString("6 PM")).toBe('🌄 6PM');
    expect(getTimeString("6 AM")).toBe('🌄 6AM');
    expect(getTimeString("3 PM")).toBe('🏞 3PM');
    expect(getTimeString("12 PM")).toBe('🏞 12PM');
  });