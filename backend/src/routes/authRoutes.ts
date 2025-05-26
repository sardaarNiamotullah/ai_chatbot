import { Router } from "express";
import passport from "passport";
import { getCurrentUser } from "../controllers/authController";

const router = Router();

router.get("/google", passport.authenticate("google", { scope: ["profile", "email"] }));

router.get("/google/callback",
  passport.authenticate("google", { failureRedirect: process.env.CLIENT_ORIGIN || "http://localhost:3000?error=auth_failed" }),
  (req, res) => {
    // Successful authentication, redirect to frontend with token/session
    res.redirect(`${process.env.CLIENT_ORIGIN || "http://localhost:3000"}/chatbot`);
  }
);

router.get("/me", getCurrentUser);

router.post("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    req.session.destroy(() => {
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });
});

export default router;
