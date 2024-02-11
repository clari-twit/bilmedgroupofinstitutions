// Declaring required variables
const phoneNumberDelimiters = '()- ';
// characters allowed in international phone numbers (a leading + is OK)
const validWorldPhoneChars = `${phoneNumberDelimiters}+`;
// Minimum number of digits in an international phone number without the country code.
const minDigitsInIPhoneNumber = 7;

function isInteger(s) {
  for (let i = 0; i < s.length; i += 1) {
    // Check that the current character is a number.
    const c = s.charAt(i);
    if (c < '0' || c > '9') {
      return false;
    }
  }
  // All characters are numbers.
  return true;
}

function trim(s) {
  let returnString = '';
  // Search through the string's characters one by one.
  // If the character is not a whitespace, append to returnString.
  for (let i = 0; i < s.length; i += 1) {
    // Check that the current character isn't whitespace.
    const c = s.charAt(i);
    if (c !== ' ') {
      returnString += c;
    }
  }
  return returnString;
}

function stripCharsInBag(s, bag) {
  let returnString = '';
  // Search through the string's characters one by one.
  // If the character is not in the bag, append to returnString.
  for (let i = 0; i < s.length; i += 1) {
    // Check that the current character isn't whitespace.
    const c = s.charAt(i);
    if (bag.indexOf(c) === -1) {
      returnString += c;
    }
  }
  return returnString;
}

export function checkInternationalPhone(strPhone) {
  let bracket = 3;
  strPhone = trim(strPhone);

  if (strPhone.indexOf('+') > 1) {
    return false;
  }
  if (strPhone.indexOf('-') !== -1) {
    bracket += 1;
  }
  if (strPhone.indexOf('(') !== -1 && strPhone.indexOf('(') > bracket) {
    return false;
  }
  const brchr = strPhone.indexOf('(');

  if (strPhone.indexOf('(') !== -1 && strPhone.charAt(brchr + 2) !== ')') {
    return false;
  }
  if (strPhone.indexOf('(') === -1 && strPhone.indexOf(')') !== -1) {
    return false;
  }
  const s = stripCharsInBag(strPhone, validWorldPhoneChars);
  return isInteger(s) && s.length >= minDigitsInIPhoneNumber;
}
