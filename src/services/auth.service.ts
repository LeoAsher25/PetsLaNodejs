import JWT from "jsonwebtoken";
import { ETokenType, TokenResponse } from "src/types/auth.type";
import { SignUpUserData, UserDto } from "src/types/user.type";
import bcrypt from "bcryptjs";
import User from "src/models/User";
import Session from "src/models/Session"; 
import { Error } from "mongoose";

const authService = {
  encodedToken(
    userId: any,
    username: string,
    tokenType: ETokenType,
    sessionId?: string | number
  ): string {
    const payload = {
      sub: userId,
      iss: username,
      sessionId,
    };
    if (sessionId) {
      payload["sessionId"] = sessionId;
    }
    return JWT.sign(
      payload,
      tokenType === ETokenType.ACCESS_TOKEN
        ? process.env.JWT_SECRET_ACCESS_TOKEN!
        : process.env.JWT_SECRET_REFRESH_TOKEN!,
      {
        expiresIn:
          tokenType === ETokenType.ACCESS_TOKEN
            ? Number(process.env.ACCESS_TOKEN_LIFE)
            : Number(process.env.REFRESH_TOKEN_LIFE),
      }
    );
  },
  async signUp(user: SignUpUserData): Promise<UserDto> {
    try {
      // generate a salt
      const salt = await bcrypt.genSalt(10);
      // generate a password hash (salt + hash)
      const passwordHashed = await bcrypt.hash(user.password, salt);
      // re-assign password hashed
      user.password = passwordHashed;
      const newUser = await User.create(user);
      return newUser;
    } catch (err) {
      throw err;
    }
  },

  async login(user: UserDto) {
    try {
      const sessionId = Date.now();
      const accessToken: string = this.encodedToken(
        user?._id,
        user?.email,
        ETokenType.ACCESS_TOKEN,
        sessionId
      );

      const refreshToken: string = this.encodedToken(
        user?._id,
        user?.email,
        ETokenType.REFRESH_TOKEN
      );

      let tokenResponse: TokenResponse = {
        accessToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      const session = await Session.findOne({
        userId: user?._id,
      });

      if (session) {
        tokenResponse["refreshToken"] = session.sessionId as string;
      } else {
        const refreshToken: string = this.encodedToken(
          user?._id,
          user?.email,
          ETokenType.REFRESH_TOKEN
        );

        await Session.create({
          userId: user?._id,
          sessionId: refreshToken,
          expireAt: new Date(
            Date.now() + Number(process.env.REFRESH_TOKEN_LIFE)
          ),
        });

        tokenResponse["refreshToken"] = refreshToken;
      }

      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },

  async refreshToken(refreshToken: string): Promise<TokenResponse> {
    try {
      let tokenResponse: TokenResponse = {
        refreshToken,
        expiresAt: Date.now() + Number(process.env.ACCESS_TOKEN_LIFE),
        refreshExpiresAt: Date.now() + Number(process.env.REFRESH_TOKEN_LIFE),
      };

      JWT.verify(
        refreshToken,
        process.env.JWT_SECRET_REFRESH_TOKEN!,
        (err: any, decoded: any) => {
          if (err) {
            throw err;
          } else {
            tokenResponse["accessToken"] = this.encodedToken(
              decoded.sub,
              decoded.iss,
              ETokenType.ACCESS_TOKEN
            );
          }
        }
      );
      return tokenResponse;
    } catch (err) {
      throw err;
    }
  },
  handleError(error: any): { [key: string]: string } {
    const returnedError: { [key: string]: string } = {};
    if (error.message.includes("User validation failed")) {
      Object.values((error as Error.ValidationError).errors).forEach(
        (err) => {
          const _error = err as Error.ValidatorError;
          returnedError[_error.properties.path as string] =
            _error.properties.message;
        }
      );
    }

    return returnedError;
  },
};
export default authService;
