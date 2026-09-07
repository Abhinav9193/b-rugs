import React from 'react';
import { motion } from 'motion/react';
import { useWholesaleForm } from '../hooks/useWholesaleForm';
import { Input } from '../../../components/ui/Input';
import { Select } from '../../../components/ui/Select';
import { Textarea } from '../../../components/ui/Textarea';
import { REQUIREMENT_TYPES, QUANTITY_RANGES, COUNTRIES } from '../../../lib/constants';
import './WholesaleContact.css';

/* Page 04 — Exact recommended copy from brief */
const WHOLESALE_PAGE_COPY = {
  eyebrow: 'WHOLESALE ENQUIRY',
  headline: {
    line1: 'Built Around',
    line2: 'Your Needs.',
  },
  body: 'From individual collections to larger wholesale requirements, we work with retailers, designers and businesses to develop rugs according to their specifications.',
  cta: 'SEND WHOLESALE ENQUIRY',
  verticalMotif: {
    line1: 'TRADITION',
    line2: 'IN MOTION',
  },
};

export default function WholesaleContact() {
  const {
    formData,
    errors,
    submitError,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
  } = useWholesaleForm();

  return (
    <section id="wholesale" className="wholesale-section">
      {/* Floating Vertical Badge on far left margin */}
      <div className="wholesale-floating-badge" aria-hidden="true">
        <span className="ws-v-text">{WHOLESALE_PAGE_COPY.verticalMotif.line1}</span>
        <div className="ws-v-line" />
        <div className="ws-diamond-icon">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
            <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
            <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
          </svg>
        </div>
        <div className="ws-v-line" />
        <span className="ws-v-text">{WHOLESALE_PAGE_COPY.verticalMotif.line2}</span>
      </div>

      <div className="container">
        <div className="wholesale-grid">
          {/* Left Column: Visual & Brand Text */}
          <div className="wholesale-brand-col">
            <div className="wholesale-brand-content">
              <span className="section-label">{WHOLESALE_PAGE_COPY.eyebrow}</span>
              <div className="wholesale-label-line" />

              <h2 className="wholesale-heading">
                {WHOLESALE_PAGE_COPY.headline.line1}<br />
                {WHOLESALE_PAGE_COPY.headline.line2}
              </h2>

              <p className="wholesale-desc">
                {WHOLESALE_PAGE_COPY.body}
              </p>

              {/* Stacked Rug Image */}
              <div className="wholesale-img-wrap">
                <img
                  src="/images/wholesale/weaving-rug-thumbnail.jpg"
                  alt="Fine handcrafted Bunaai weaving on loom"
                  className="wholesale-img"
                  loading="lazy"
                />
              </div>

              {/* Bottom decorative motif */}
              <div className="wholesale-bottom-motif" aria-hidden="true">
                <div className="ws-motif-line" />
                <div className="ws-motif-diamond">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2">
                    <rect x="3" y="3" width="18" height="18" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
                    <rect x="7" y="7" width="10" height="10" transform="rotate(45 12 12)" stroke="currentColor" fill="none" />
                  </svg>
                </div>
                <div className="ws-motif-line" />
              </div>
            </div>
          </div>

          {/* Right Column: Wholesale Enquiry Form */}
          <div className="wholesale-form-col">
            {isSubmitted ? (
              <motion.div 
                className="wholesale-success-box"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="wholesale-success-icon">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <path d="M8 12l3 3 5-5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
                <h3 className="wholesale-success-title">Thank You for Your Enquiry</h3>
                <p className="wholesale-success-desc">
                  Thank you. Your wholesale enquiry has been sent successfully. Our team will review your specifications and get in touch shortly.
                </p>
                <button className="wholesale-reset-btn" onClick={resetForm}>
                  SUBMIT ANOTHER ENQUIRY
                </button>
              </motion.div>
            ) : (
              <form className="wholesale-form" onSubmit={handleSubmit} noValidate>
                {/* Field 1 & 2: Name & Company Name */}
                <div className="wholesale-form__row">
                  <Input
                    id="name"
                    label="NAME"
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={handleChange}
                    error={errors.name}
                    required
                  />
                  <Input
                    id="companyName"
                    label="COMPANY NAME"
                    placeholder="Company / Business Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    error={errors.companyName}
                    required
                  />
                </div>

                {/* Field 3 & 4: Business Email & Phone */}
                <div className="wholesale-form__row">
                  <Input
                    id="businessEmail"
                    type="email"
                    label="BUSINESS EMAIL"
                    placeholder="Email Address"
                    value={formData.businessEmail}
                    onChange={handleChange}
                    error={errors.businessEmail}
                    required
                  />
                  <Input
                    id="phoneNumber"
                    type="tel"
                    label="PHONE NUMBER"
                    placeholder="Phone Number"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    error={errors.phoneNumber}
                  />
                </div>

                {/* Field 5 & 6: Country & Requirement Type */}
                <div className="wholesale-form__row">
                  <Select
                    id="country"
                    label="COUNTRY"
                    placeholder="Select Country"
                    options={COUNTRIES}
                    value={formData.country}
                    onChange={handleChange}
                    error={errors.country}
                    required
                  />
                  <Select
                    id="requirementType"
                    label="REQUIREMENT TYPE"
                    placeholder="Select Requirement"
                    options={REQUIREMENT_TYPES}
                    value={formData.requirementType}
                    onChange={handleChange}
                    error={errors.requirementType}
                    required
                  />
                </div>

                {/* Field 7 & 8: Estimated Quantity & Size / Specification */}
                <div className="wholesale-form__row">
                  <Select
                    id="estimatedQuantity"
                    label="ESTIMATED QUANTITY"
                    placeholder="Select Quantity Range"
                    options={QUANTITY_RANGES}
                    value={formData.estimatedQuantity}
                    onChange={handleChange}
                    error={errors.estimatedQuantity}
                    required
                  />
                  <Input
                    id="sizeSpecification"
                    label="SIZE / SPECIFICATION"
                    placeholder="e.g. 8x10 ft, Custom Size, Runner, Round, etc."
                    value={formData.sizeSpecification}
                    onChange={handleChange}
                    error={errors.sizeSpecification}
                  />
                </div>

                {/* Field 9: Message / Requirements */}
                <div className="wholesale-form__full">
                  <Textarea
                    id="message"
                    label="MESSAGE / REQUIREMENTS"
                    placeholder="Tell us about your requirements, design preferences, colour choices, quality expectations or any other details."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    required
                    rows={4}
                  />
                </div>

                {submitError && (
                  <div className="wholesale-form__general-error" role="alert">
                    {submitError}
                  </div>
                )}

                {/* Submit CTA Button */}
                <div className="wholesale-form__submit-wrap">
                  <button
                    type="submit"
                    className="wholesale-submit-btn"
                    disabled={isSubmitting}
                  >
                    <span>{isSubmitting ? 'SENDING...' : WHOLESALE_PAGE_COPY.cta}</span>
                    <span className="wholesale-submit-arrow">→</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
