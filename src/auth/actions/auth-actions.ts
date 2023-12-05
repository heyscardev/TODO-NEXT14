import { authOptions } from "@/app/api/auth/[...nextauth]/auth";
import prisma from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { getServerSession } from "next-auth";
export const SignInEmailPassword = async (email: string, password: string) => {
  if (!email || !password) return null;
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) {
    const dbUser = await createUser(email, password);
    return dbUser;
  }

  if (!user.password || !bcrypt.compareSync(password, user.password)) {
    return null;
  }
  return user;
};
export const createUser = async (email: string, password: string) => {
  const user = await prisma.user.create({
    data: {
      name: email.split("@")[0],
      email,
      password: bcrypt.hashSync(password),
    },
  });
  return user;
};
export const getUserSessionServer = async () => {
  const session = await getServerSession(authOptions);

  return session?.user;
};
