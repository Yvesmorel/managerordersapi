const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

const {
  createAtempt,
  findAttempt,
} = require("../controllers/bruteForceAttemptController");

const { convertDateToMilliscnd } = require("../lib/utils");
const { createUser } = require("../controllers/userController");
const auth = getAuth();

class FirebaseAuthController {
  async registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      // Création de l'utilisateur
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Envoi de l'email de vérification
      try {
        await sendEmailVerification(auth.currentUser);
      } catch (emailError) {
        console.error(emailError);
        return res
          .status(500)
          .json({ error: "Error sending email verification" });
      }

      // Création de l'utilisateur dans la base de données ou autre traitement
      try {
        await createUser(email, auth.currentUser.uid, res);
      } catch (createUserError) {
        console.error(createUserError);
        return res.status(500).json({ error: "Error to create user" });
      }

      return res.status(201).json({
        message: "Verification email sent! User created successfully!",
      });
    } catch (error) {
      console.error(error);
      const errorMessage =
        error.message || "An error occurred while registering user";
      return res.status(500).json({ error: errorMessage });
    }
  }

  async loginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    try {
      const attempt = await findAttempt([
        {
          ipAddress: req.clientIp,
          isBlocked: true,
        },
      ]);

      if (
        attempt !== null &&
        convertDateToMilliscnd(attempt.blockedUntil) >= Date.now()
      ) {
        
        res.status(400).json({
          message: "Your are blocked",
          blockedUntil: attempt.blockedUntil,
        });

        return;
      }

      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const idToken = userCredential._tokenResponse.idToken;

      if (idToken) {
        res.cookie("access_token", idToken, { httpOnly: true });
        return res.status(200).json({
          message: "User logged in successfully",
          userCredential,
        });
      } else {
        return res.status(500).json({ error: "Internal Server Error" });
      }
    } catch (error) {
      if (error.message.includes("auth/invalid-credential")) {
        try {
          await createAtempt(req, res);

          return res
            .status(400)
            .json({ error: "An error occurred while logging in attemp" });
        } catch (attemptError) {
          return res
            .status(500)
            .json({ error: "An error occurred while logging in attemp" });
        }
      }

      const errorMessage =
        error.message || "An error occurred while logging in";
      return res.status(500).json({ error: errorMessage + "dddd" });
    }
  }

  async logoutUser(req, res) {
    try {
      await signOut(auth);
      res.clearCookie("access_token");
      return res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }

  async resetPassword(req, res) {
    const { email } = req.body;

    if (!email) {
      return res.status(422).json({ email: "Email is required" });
    }

    try {
      await sendPasswordResetEmail(auth, email);
      return res
        .status(200)
        .json({ message: "Password reset email sent successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  }
}

module.exports = new FirebaseAuthController();
