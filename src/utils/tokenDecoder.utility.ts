import jwt, { JwtPayload, VerifyOptions } from "jsonwebtoken";
import { AppError } from "../errors/appError";

function tokenDecoder(authorization: string): void {
  const token = authorization.split(" ")[1];

  const payload: any = jwt.verify(
    token,
    process.env.SECRET_KEY as string,
    (error, decoded): VerifyOptions | string | JwtPayload | undefined => {
      if (!decoded) {
        console.log("------------------decoded----", decoded);
        throw new AppError("Invalid Token", 401);
      }
      return decoded;
    }
  );

  return payload;
}

export default tokenDecoder;
