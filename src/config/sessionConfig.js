import session from "express-session";

const sessionConfig = session({
  secret: "user-dash",
  resave: false,
  saveUninitialized: true,
  cookie: { maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true },
});

export default sessionConfig;
