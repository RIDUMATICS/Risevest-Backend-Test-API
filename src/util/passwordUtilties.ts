import bcrypt from "bcryptjs";

export const hashPassword = (password: string): string => {
  const salt = bcrypt.genSaltSync(12);
  const hash = bcrypt.hashSync(password, salt);

  return hash;
};

export const isValidPassword = (
  plainPassword: string,
  hashPassword: string
): boolean => {
  return bcrypt.compareSync(plainPassword, hashPassword);
};
