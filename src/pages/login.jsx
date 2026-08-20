import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import { loginUser } from "@/api/users";
import loginImage from "@/assets/loginpagesidepic.jpg";
import "@/css/login.css";

function LoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setIsSubmitting(true);

    try {
      const result = await loginUser({
        email: email.trim().toLowerCase(),
        password,
        rememberMe,
      });

      if (!result.success) {
        setErrorMessage(
          result.message || "Invalid email or password."
        );
        return;
      }

      const user = result.user;
      const duration = rememberMe
        ? 30 * 24 * 60 * 60 * 1000
        : 1 * 24 * 60 * 60 * 1000;
      const expiresAt = Date.now() + duration;

      const authData = {
        token: result.token,
        user: user,
        expiresAt: expiresAt,
        rememberMe: rememberMe,
      };

      localStorage.setItem(
        "resicareAuth",
        JSON.stringify(authData)
      );

      localStorage.removeItem("authToken");
      localStorage.removeItem("currentUser");
      sessionStorage.removeItem("authToken");
      sessionStorage.removeItem("currentUser");

      navigate("/home", {
        replace: true,
      });
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.data?.message) {
        setErrorMessage(
          error.response.data.message
        );
      } else {
        setErrorMessage(
          "Unable to connect to the server. Please try again."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-image-section">
        <img
          src={loginImage}
          alt="ResiCare"
          className="login-image"
        />
        <div className="login-image-overlay">
          <div className="login-brand-logo-text">
            ResiCare
          </div>
          <h2 className="login-image-heading">
            Professional Care for Your Home
          </h2>
          <p className="login-image-subtext">
            Reliable home maintenance and improvement
            services delivered with precision, care,
            and professionalism.
          </p>
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-form-wrapper">
          <div className="login-card-header">
            <h1 className="login-title">
              Welcome Back
            </h1>
            <p className="login-description">
              Enter your credentials to access your account
            </p>
          </div>

          <form
            className="login-form"
            onSubmit={handleSubmit}
          >
            <div className="login-card-content">
              {errorMessage && (
                <div className="login-error-message">
                  {errorMessage}
                </div>
              )}

              <div className="login-field">
                <Label
                  htmlFor="email"
                  className="login-label"
                >
                  Email Address
                </Label>
                <div className="login-input-wrapper">
                  <Mail className="login-input-icon" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    placeholder="name@example.com"
                    autoComplete="email"
                    className="login-input"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="login-field">
                <Label
                  htmlFor="password"
                  className="login-label"
                >
                  Password
                </Label>
                <div className="login-input-wrapper">
                  <Lock className="login-input-icon" />
                  <Input
                    id="password"
                    name="password"
                    type={
                      showPassword
                        ? "text"
                        : "password"
                    }
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    placeholder="Enter your password"
                    autoComplete="current-password"
                    className="login-input"
                    required
                    disabled={isSubmitting}
                  />

                  <button
                    type="button"
                    className="login-password-toggle"
                    onClick={() =>
                      setShowPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                    disabled={isSubmitting}
                  >
                    {showPassword ? (
                      <EyeOff
                        className="login-eye-icon"
                      />
                    ) : (
                      <Eye
                        className="login-eye-icon"
                      />
                    )}
                  </button>
                </div>
                <div className="login-password-footer">
                  <Link
                    to="/forgot-password"
                    className="login-forgot-link"
                  >
                    Forgot password?
                  </Link>
                </div>
              </div>

              <div className="login-remember">
                <Checkbox
                  id="remember"
                  checked={rememberMe}
                  onCheckedChange={(checked) =>
                    setRememberMe(
                      checked === true
                    )
                  }
                  className="login-checkbox"
                  disabled={isSubmitting}
                />
                <Label
                  htmlFor="remember"
                  className="login-remember-label"
                >
                  Remember me for 30 days
                </Label>
              </div>

              <Button
                type="submit"
                className="login-submit-button"
                disabled={isSubmitting}
              >
                {isSubmitting
                  ? "Signing In..."
                  : "Sign In"}
              </Button>

              <div className="login-divider">
                <Separator
                  className="login-divider-line"
                />
                <span className="login-divider-text">
                  Or continue with
                </span>
              </div>

              <div className="login-social-buttons">
                <Button
                  type="button"
                  variant="outline"
                  className="login-social-button"
                  disabled={isSubmitting}
                >
                  Google
                </Button>
                <Button
                  type="button"
                  variant="outline"
                  className="login-social-button"
                  disabled={isSubmitting}
                >
                  GitHub
                </Button>
              </div>
            </div>
          </form>

          <div className="login-card-footer">
            <p className="login-register-text">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="login-register-link"
              >
                Create account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;