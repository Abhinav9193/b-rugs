import { useState, useCallback } from "react";
import { isValidEmail } from "../../../lib/utils";

export function useWholesaleForm() {
  const [formData, setFormData] = useState({
    name: "",
    companyName: "",
    businessEmail: "",
    phoneNumber: "",
    country: "",
    requirementType: "",
    estimatedQuantity: "",
    sizeSpecification: "",
    message: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setSubmitError("");

    // Clear field error on change
    setErrors((prev) => {
      if (prev[name]) {
        const next = { ...prev };
        delete next[name];
        return next;
      }
      return prev;
    });
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Please enter your name";
    }

    if (!formData.companyName.trim()) {
      newErrors.companyName = "Please enter your company name";
    }

    if (!formData.businessEmail.trim()) {
      newErrors.businessEmail = "Please enter your business email";
    } else if (!isValidEmail(formData.businessEmail)) {
      newErrors.businessEmail = "Please enter a valid email address";
    }

    if (!formData.country) {
      newErrors.country = "Please select a country";
    }

    if (!formData.requirementType) {
      newErrors.requirementType = "Please select a requirement type";
    }

    if (!formData.estimatedQuantity) {
      newErrors.estimatedQuantity = "Please select an estimated quantity";
    }

    if (!formData.message.trim()) {
      newErrors.message = "Please provide details about your requirement";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      setSubmitError("");

      if (!validate()) return;

      setIsSubmitting(true);

      try {
        const response = await fetch("/api/contact", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.name.trim(),
            companyName: formData.companyName.trim(),
            businessEmail: formData.businessEmail.trim(),
            phoneNumber: formData.phoneNumber.trim(),
            country: formData.country.trim(),
            requirementType: formData.requirementType.trim(),
            estimatedQuantity: formData.estimatedQuantity.trim(),
            sizeSpecification: formData.sizeSpecification.trim(),
            message: formData.message.trim(),
          }),
        });

        const result = await response.json();

        if (response.ok && result.success) {
          setIsSubmitted(true);
          setFormData({
            name: "",
            companyName: "",
            businessEmail: "",
            phoneNumber: "",
            country: "",
            requirementType: "",
            estimatedQuantity: "",
            sizeSpecification: "",
            message: "",
          });
        } else {
          setSubmitError(
            result.message || "Unable to send your enquiry. Please try again.",
          );
        }
      } catch (err) {
        console.error("[Wholesale Submit Error]:", err);
        setSubmitError("Unable to send your enquiry. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    },
    [formData, validate],
  );

  const resetForm = useCallback(() => {
    setFormData({
      name: "",
      companyName: "",
      businessEmail: "",
      phoneNumber: "",
      country: "",
      requirementType: "",
      estimatedQuantity: "",
      sizeSpecification: "",
      message: "",
    });
    setErrors({});
    setSubmitError("");
    setIsSubmitted(false);
  }, []);

  return {
    formData,
    errors,
    submitError,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  };
}
