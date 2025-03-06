import prisma from "./prisma";
import passport from "passport";
import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import cookie from "cookie";

const options = {
	jwtFromRequest: ExtractJwt.fromExtractors([
		(req) => {
			let token = null;
			if (req && req.headers.cookie) {
				const cookies = cookie.parse(req.headers.cookie);
				token = cookies.auth_token;
			}
			return token;
		},
	]),
	secretOrKey: process.env.JWT_SECRET as string,
};

passport.use(
	new JwtStrategy(options, async (jwt_payload, done) => {
		try {
			const user = await prisma.user.findUnique({
				where: { id: jwt_payload.id },
			});

			if (user) return done(null, user);

			return done(null, false);
		} catch (err) {
			return done(err, false);
		}
	})
);

export default passport;
