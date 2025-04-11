const {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
} = require("../config/firebase");

const { createAtempt } = require("../controllers/bruteForceAttemptController");

const { createUser } = require("../controllers/userController");
const auth = getAuth();

class FirebaseAuthController {
  registerUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        sendEmailVerification(auth.currentUser)
          .then(() => {
            createUser(email, auth.currentUser.uid, res)
              .then((_) => {
                res.status(201).json({
                  message:
                    "Verification email sent! User created successfully!",
                });
              })
              .catch((error) => {
                console.error(error);
                res.status(500).json({ error: "Error to create user" });
              });
          })
          .catch((error) => {
            console.error(error);
            res.status(500).json({ error: "Error sending email verification" });
          });
      })
      .catch((error) => {
        const errorMessage =
          error.message || "An error occurred while registering user";
        res.status(500).json({ error: errorMessage });
      });
  }

  loginUser(req, res) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(422).json({
        email: "Email is required",
        password: "Password is required",
      });
    }
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const idToken = userCredential._tokenResponse.idToken;
        if (idToken) {
          res.cookie("access_token", idToken, {
            httpOnly: true,
          });
          res
            .status(200)
            .json({ message: "User logged in successfully", userCredential });
        } else {
          res.status(500).json({ error: "Internal Server Error" });
        }
      })
      .catch((error) => {
        if (error.message.includes("auth/invalid-credential")) {
          console.log(error.message);
          createAtempt(req, res)
            .then(() =>
              res
                .status(500)
                .json({ error: "An error occurred while logging in attemp" })
            )
            .catch((_) =>
              res
                .status(500)
                .json({ error: "An error occurred while logging in attemp" })
            );
        }

        const errorMessage =
          error.message || "An error occurred while logging in";

        res.status(500).json({ error: errorMessage+"dddd"});
      });
  }

  logoutUser(req, res) {
    signOut(auth)
      .then(() => {
        res.clearCookie("access_token");
        res.status(200).json({ message: "User logged out successfully" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }

  resetPassword(req, res) {
    const { email } = req.body;
    if (!email) {
      return res.status(422).json({
        email: "Email is required",
      });
    }
    sendPasswordResetEmail(auth, email)
      .then(() => {
        res
          .status(200)
          .json({ message: "Password reset email sent successfully!" });
      })
      .catch((error) => {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
      });
  }
}

module.exports = new FirebaseAuthController();
