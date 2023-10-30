const emailRegex =
  /^(?=.{1,256}$)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:(?!-)[a-zA-Z0-9-]{1,63}(?<!-)\.)+(?!-)[a-zA-Z]{2,6}$/;

// Function to check if a string matches the regex
export function isValidEmail(email) {
  return emailRegex.test(email);
}
