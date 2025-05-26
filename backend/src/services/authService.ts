import prisma from "../config/database";

export const findUserByEmail = (email: string) => {
  return prisma.user.findUnique({ where: { email } });
};

export const createUser = (data: {
  email: string;
  firstName: string;
  lastName: string;
  username: string;
  photo: string;
}) => {
  return prisma.user.create({ data });
};

export const findUserById = (id: string) => {
  return prisma.user.findUnique({ where: { id } });
};
