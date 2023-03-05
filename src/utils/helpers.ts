import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

/// Encrypting password
export const hashPwd = async (pwd: string) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(pwd, salt);
};

/// Decrypt the password
export const comparePwd = async (bodyPwd: string, dbPwd: string) => {
  return await bcrypt.compare(bodyPwd, dbPwd);
};

//Generate token
export const generateToken = (id: string) => {
  const secret = process.env.JWT_TOKEN_SECRET || "jwt-secret";
  return jwt.sign({ accountId: id }, secret, {
    expiresIn: "5 days",
  });
};

/// Verifying jwt token
export function verifyToken(token: string): JwtPayload {
  const verify = jwt.verify(
    token,
    process.env.JWT_TOKEN_SECRET || "jwt-secret"
  );
  return verify as JwtPayload;
}
