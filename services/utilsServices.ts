export const formatDate = (date: Date) => {
  return date.toISOString().slice(0, 10);
};

export const validatePassword = (
  password: string,
  confirmPassword: string
): {isSuccess: boolean; msg: string} => {
  const passwordRegex =
    /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}[\]:;<>,.?/~_+\-=|\\]).{8,}$/;

  if (password !== confirmPassword) {
    return { isSuccess: false, msg: "Passwords do not match" };
  } else if (password.length < 8) {
    return {
      isSuccess: false,
      msg: "Password must have at least 8 characters",
    };
  } else if (!passwordRegex.test(password)) {
    return {
      isSuccess: false,
      msg: "Password must be at least 8 characters, including one uppercase letter (A-Z), one lowercase letter (a-z), one number (0-9), and one special character (e.g., !, @, #, $)",
    };
  }

  return {isSuccess: true, msg: "Valid password"};
};
