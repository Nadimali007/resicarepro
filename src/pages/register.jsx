import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { registerUser } from "@/api/users";
import loginImage from "@/assets/loginpagesidepic.jpg";
import "@/css/register.css";

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [serverError, setServerError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const formik = useFormik({
    initialValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      fullName: Yup.string()
        .trim()
        .required("Full name is required")
        .min(3, "Full name must be at least 3 characters")
        .max(100, "Full name cannot exceed 100 characters"),

      email: Yup.string()
        .trim()
        .lowercase()
        .required("Email address is required")
        .email("Enter a valid email address")
        .max(254, "Email address cannot exceed 254 characters"),

      phone: Yup.string()
        .trim()
        .required("Phone number is required")
        .matches(
          /^(03[0-9]{9}|\+923[0-9]{9})$/,
          "Enter a valid Pakistani phone number"
        ),

      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(72, "Password cannot exceed 72 characters"),

      confirmPassword: Yup.string()
        .required("Please confirm your password")
        .oneOf(
          [Yup.ref("password")],
          "Passwords do not match"
        ),
    }),
    validateOnChange: true,
    validateOnBlur: true,
    validateOnMount: false,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        setServerError("");
        setSuccessMessage("");

        const cleanedValues = {
          fullName: values.fullName.trim(),
          email: values.email.trim().toLowerCase(),
          phone: values.phone.trim(),
          password: values.password,
        };

        const result = await registerUser(cleanedValues);

        if (!result.success) {
          setServerError(
            result.message || "Unable to create account."
          );
          return;
        }

        resetForm();

        setSuccessMessage(
          "Account created successfully. Redirecting to login..."
        );

        setTimeout(() => {
          navigate("/login");
        }, 1500);
      } catch (error) {
        console.error("Registration error:", error);

        if (error.response?.data?.message) {
          setServerError(error.response.data.message);
        } else {
          setServerError(
            "Unable to create account. Please try again."
          );
        }
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleFieldChange = (event) => {
    const { name, value } = event.target;

    formik.setFieldValue(name, value);
    formik.setFieldTouched(name, true, false);
  };

  const handleFieldBlur = (event) => {
    const { name } = event.target;

    formik.setFieldTouched(name, true, true);
  };

  const getInputClass = (field) => {
    return `register-input ${
      formik.touched[field] && formik.errors[field]
        ? "register-input-error"
        : ""
    }`;
  };

  const showError = (field) => {
    return Boolean(
      formik.touched[field] && formik.errors[field]
    );
  };

  return (
    <div className="register-page">
      {/* Form section is placed first so it appears on the left */}
      <div className="register-form-section">
        <div className="register-form-wrapper">
          <div className="register-card-header">
            <h1 className="register-title">
              Create Your Account
            </h1>
            <p className="register-description">
              Enter your details to register for your account
            </p>
          </div>

          <form
            className="register-form"
            onSubmit={formik.handleSubmit}
            noValidate
          >
            <div className="register-card-content">
              {serverError && (
                <div className="register-error-message">
                  {serverError}
                </div>
              )}

              {successMessage && (
                <div className="register-success-message">
                  {successMessage}
                </div>
              )}

              <div className="register-field">
                <label
                  htmlFor="fullName"
                  className="register-label"
                >
                  Full Name
                </label>

                <div className="register-input-wrapper">
                  <User className="register-input-icon" />

                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    placeholder="Enter your full name"
                    className={getInputClass("fullName")}
                    value={formik.values.fullName}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="name"
                    aria-invalid={showError("fullName")}
                    aria-describedby={
                      showError("fullName")
                        ? "fullName-error"
                        : undefined
                    }
                  />
                </div>

                {showError("fullName") && (
                  <div
                    id="fullName-error"
                    className="register-field-error"
                  >
                    {formik.errors.fullName}
                  </div>
                )}
              </div>

              <div className="register-field">
                <label
                  htmlFor="email"
                  className="register-label"
                >
                  Email Address
                </label>

                <div className="register-input-wrapper">
                  <Mail className="register-input-icon" />

                  <input
                    id="email"
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    className={getInputClass("email")}
                    value={formik.values.email}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="email"
                    maxLength={254}
                    aria-invalid={showError("email")}
                    aria-describedby={
                      showError("email")
                        ? "email-error"
                        : undefined
                    }
                  />
                </div>

                {showError("email") && (
                  <div
                    id="email-error"
                    className="register-field-error"
                  >
                    {formik.errors.email}
                  </div>
                )}
              </div>

              <div className="register-field">
                <label
                  htmlFor="phone"
                  className="register-label"
                >
                  Phone Number
                </label>

                <div className="register-input-wrapper">
                  <Phone className="register-input-icon" />

                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="03XXXXXXXXX or +923XXXXXXXXX"
                    className={getInputClass("phone")}
                    value={formik.values.phone}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="tel"
                    inputMode="tel"
                    aria-invalid={showError("phone")}
                    aria-describedby={
                      showError("phone")
                        ? "phone-error"
                        : undefined
                    }
                  />
                </div>

                {showError("phone") && (
                  <div
                    id="phone-error"
                    className="register-field-error"
                  >
                    {formik.errors.phone}
                  </div>
                )}
              </div>

              <div className="register-field">
                <label
                  htmlFor="password"
                  className="register-label"
                >
                  Password
                </label>

                <div className="register-input-wrapper">
                  <Lock className="register-input-icon" />

                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    className={getInputClass("password")}
                    value={formik.values.password}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="new-password"
                    maxLength={72}
                    aria-invalid={showError("password")}
                    aria-describedby={
                      showError("password")
                        ? "password-error"
                        : undefined
                    }
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowPassword((prev) => !prev)
                    }
                    aria-label={
                      showPassword
                        ? "Hide password"
                        : "Show password"
                    }
                  >
                    {showPassword ? (
                      <EyeOff className="register-eye-icon" />
                    ) : (
                      <Eye className="register-eye-icon" />
                    )}
                  </button>
                </div>

                {showError("password") && (
                  <div
                    id="password-error"
                    className="register-field-error"
                  >
                    {formik.errors.password}
                  </div>
                )}
              </div>

              <div className="register-field">
                <label
                  htmlFor="confirmPassword"
                  className="register-label"
                >
                  Confirm Password
                </label>

                <div className="register-input-wrapper">
                  <Lock className="register-input-icon" />

                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    placeholder="Confirm your password"
                    className={getInputClass(
                      "confirmPassword"
                    )}
                    value={formik.values.confirmPassword}
                    onChange={handleFieldChange}
                    onBlur={handleFieldBlur}
                    autoComplete="new-password"
                    maxLength={72}
                    aria-invalid={showError(
                      "confirmPassword"
                    )}
                    aria-describedby={
                      showError("confirmPassword")
                        ? "confirmPassword-error"
                        : undefined
                    }
                  />

                  <button
                    type="button"
                    className="register-password-toggle"
                    onClick={() =>
                      setShowConfirmPassword(
                        (prev) => !prev
                      )
                    }
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="register-eye-icon" />
                    ) : (
                      <Eye className="register-eye-icon" />
                    )}
                  </button>
                </div>

                {showError("confirmPassword") && (
                  <div
                    id="confirmPassword-error"
                    className="register-field-error"
                  >
                    {formik.errors.confirmPassword}
                  </div>
                )}
              </div>

              <button
                type="submit"
                className="register-submit-button"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting
                  ? "Creating Account..."
                  : "Create Account"}
              </button>
            </div>
          </form>

          <div className="register-card-footer">
            <p className="register-register-text">
              Already have an account?{" "}
              <Link
                to="/login"
                className="register-register-link"
              >
                Sign In
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Image section is placed second so it appears on the right */}
      <div className="register-image-section">
        <img
          src={loginImage}
          alt="ResiCare"
          className="register-image"
        />

        <div className="register-image-overlay">
          <div className="register-brand-logo-text">
            ResiCare
          </div>

          <h2 className="register-image-heading">
            Professional Care for Your Home
          </h2>

          <p className="register-image-subtext">
            Reliable home maintenance and improvement
            services delivered with precision, care,
            and professionalism.
          </p>
        </div>
      </div>
    </div>
  );
}