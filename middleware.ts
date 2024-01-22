import { withAuth } from "next-auth/middleware";

export default process.env.NODE_ENV === "development"
  ? withAuth
  : withAuth({
      callbacks: {
        authorized: ({ req }) => {
          const sessionToken = req.cookies.get(
            "__Secure-next-auth.session-token"
          );
          if (sessionToken) return true;
          else return false;
        },
      },
    });

export const config = {
  matcher: ["/chat", "/register"],
};
