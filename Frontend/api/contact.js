import { Resend } from "resend";
import logoData from "./logo-b64.json" with { type: "json" };

// Simple email regex for validation
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Helper to get friendly labels for code values
const REQUIREMENT_LABELS = {
  wholesale: "Wholesale Collection",
  custom: "Custom Rugs",
  "private-label": "Private Label",
  hospitality: "Hospitality / Contract",
  retail: "Retail",
  other: "Other",
};

const COUNTRY_LABELS = {
  IN: "India",
  US: "United States",
  GB: "United Kingdom",
  DE: "Germany",
  FR: "France",
  AE: "United Arab Emirates",
  AU: "Australia",
  CA: "Canada",
  IT: "Italy",
  ES: "Spain",
  NL: "Netherlands",
  SA: "Saudi Arabia",
  JP: "Japan",
  SG: "Singapore",
  SE: "Sweden",
  CH: "Switzerland",
  BE: "Belgium",
  DK: "Denmark",
  NO: "Norway",
  NZ: "New Zealand",
  OTHER: "Other",
};

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    return res.status(405).json({
      success: false,
      message: "Method Not Allowed. Please send a POST request.",
    });
  }

  try {
    const {
      name,
      companyName,
      businessEmail,
      phoneNumber,
      country,
      requirementType,
      estimatedQuantity,
      sizeSpecification,
      message,
    } = req.body || {};

    // Trim and sanitize inputs
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedCompanyName =
      typeof companyName === "string" ? companyName.trim() : "";
    const trimmedBusinessEmail =
      typeof businessEmail === "string" ? businessEmail.trim() : "";
    const trimmedPhone =
      typeof phoneNumber === "string" ? phoneNumber.trim() : "";
    const trimmedCountryCode =
      typeof country === "string" ? country.trim() : "";
    const trimmedRequirementCode =
      typeof requirementType === "string" ? requirementType.trim() : "";
    const trimmedQuantity =
      typeof estimatedQuantity === "string" ? estimatedQuantity.trim() : "";
    const trimmedSize =
      typeof sizeSpecification === "string" ? sizeSpecification.trim() : "";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    // Human-readable labels
    const displayCountry =
      COUNTRY_LABELS[trimmedCountryCode] || trimmedCountryCode;
    const displayRequirement =
      REQUIREMENT_LABELS[trimmedRequirementCode] || trimmedRequirementCode;

    // Validate required fields
    if (
      !trimmedName ||
      !trimmedCompanyName ||
      !trimmedBusinessEmail ||
      !trimmedCountryCode ||
      !trimmedRequirementCode ||
      !trimmedQuantity ||
      !trimmedMessage
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill in all required fields.",
      });
    }

    // Validate email format
    if (!EMAIL_REGEX.test(trimmedBusinessEmail)) {
      return res.status(400).json({
        success: false,
        message: "Please provide a valid business email address.",
      });
    }

    const apiKey = process.env.RESEND_API_KEY;
    const fromEmail =
      process.env.EMAIL_FROM || "Bunaai Rugs <onboarding@resend.dev>";
    const toEmail = process.env.CONTACT_RECEIVER_EMAIL;

    if (!apiKey) {
      console.error(
        "[API /api/contact Error]: Missing RESEND_API_KEY in environment variables.",
      );
      return res.status(500).json({
        success: false,
        message: "Unable to send your enquiry. Please try again.",
      });
    }

    if (!toEmail) {
      console.error(
        "[API /api/contact Error]: Missing CONTACT_RECEIVER_EMAIL in environment variables.",
      );
      return res.status(500).json({
        success: false,
        message: "Unable to send your enquiry. Please try again.",
      });
    }

    const resend = new Resend(apiKey);

    // Build Luxury HTML email template matching Bunaai Rugs website aesthetic exactly
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Wholesale Enquiry — ${trimmedCompanyName}</title>
</head>
<body style="margin: 0; padding: 0; background-color: #EDE6D8; font-family: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; color: #1A1A1A; -webkit-font-smoothing: antialiased;">

  <!-- Outer Canvas with Website Warm Ivory Tint -->
  <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #EDE6D8; padding: 48px 16px;">
    <tr>
      <td align="center">

        <!-- Main Card Container: Crisp White + Subtle Gold/Bronze Border -->
        <table width="100%" style="max-width: 650px; background-color: #FFFFFF; border: 1px solid rgba(196, 149, 106, 0.4); box-shadow: 0 16px 40px rgba(35, 25, 15, 0.08);" border="0" cellspacing="0" cellpadding="0">

          <!-- ════════════════════════════════════════════════
               TOP BRAND HEADER: Broad & Big BUNAAI RUGS Typography
               ════════════════════════════════════════════════ -->
          <tr>
            <td align="center" style="background-color: #FFFFFF; padding: 46px 40px 22px 40px; text-align: center;">
              <!-- Broad, Big Bunaai Rugs Brand Name -->
              <h1 style="margin: 0; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 44px; font-weight: 700; letter-spacing: 0.22em; text-transform: uppercase; color: #1A1A1A; line-height: 1;">
                BUNAAI RUGS
              </h1>
              <p style="margin: 14px 0 0 0; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.28em; text-transform: uppercase; color: #8C5828;">
                MANUFACTURING &bull; WHOLESALE &bull; EXPORTS
              </p>
            </td>
          </tr>

          <!-- Decorative Website Accent Divider (Gold/Bronze Line with Center Diamond) -->
          <tr>
            <td style="padding: 0 40px 32px 40px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="height: 1.5px; background-color: rgba(196, 149, 106, 0.45);"></td>
                  <td width="30" align="center" style="padding: 0 10px; color: #8C5828; font-size: 14px; line-height: 1;">&#9670;</td>
                  <td style="height: 1.5px; background-color: rgba(196, 149, 106, 0.45);"></td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ════════════════════════════════════════════════
               HERO TITLE: Big Serif Headline matching Website
               ════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 44px 28px 44px; text-align: left;">
              <!-- Eyebrow Tag -->
              <table border="0" cellspacing="0" cellpadding="0" style="margin-bottom: 12px;">
                <tr>
                  <td style="background-color: #F7F3EB; border: 1px solid rgba(196, 149, 106, 0.4); padding: 4px 12px; border-radius: 2px;">
                    <span style="font-family: 'Montserrat', sans-serif; font-size: 10px; font-weight: 600; letter-spacing: 0.18em; text-transform: uppercase; color: #8C5828;">
                      NEW WHOLESALE ENQUIRY
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Main Heading (Cormorant Garamond Serif style) -->
              <h1 style="margin: 0 0 6px 0; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 36px; font-weight: 400; line-height: 1.1; color: #1A1A1A; letter-spacing: -0.01em;">
                ${trimmedCompanyName}
              </h1>

              <div style="width: 44px; height: 1.5px; background-color: #C4956A; margin: 12px 0 14px 0;"></div>

              <p style="margin: 0; font-family: 'Montserrat', sans-serif; font-size: 13.5px; color: #6B6B6B; line-height: 1.5;">
                Submitted by <strong style="color: #1A1A1A; font-weight: 600;">${trimmedName}</strong> &bull; ${displayCountry}
              </p>
            </td>
          </tr>

          <!-- ════════════════════════════════════════════════
               SPECIFICATIONS CARD: Website Form Field Styles
               ════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 44px 32px 44px;">
              <table width="100%" border="0" cellspacing="0" cellpadding="0" style="background-color: #F7F3EB; border: 1px solid rgba(196, 149, 106, 0.35);">
                
                <!-- Header of Table -->
                <tr>
                  <td colspan="2" style="padding: 14px 20px; background-color: #F0EAE0; border-bottom: 1px solid rgba(196, 149, 106, 0.3);">
                    <span style="font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.14em; text-transform: uppercase; color: #1A1A1A;">
                      CLIENT &amp; SPECIFICATION DETAILS
                    </span>
                  </td>
                </tr>

                <!-- Contact Person -->
                <tr>
                  <td width="38%" style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Contact Person
                  </td>
                  <td width="62%" style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 600; color: #1A1A1A;">
                    ${trimmedName}
                  </td>
                </tr>

                <!-- Company Name -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Company
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 600; color: #1A1A1A;">
                    ${trimmedCompanyName}
                  </td>
                </tr>

                <!-- Business Email -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Business Email
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 600;">
                    <a href="mailto:${trimmedBusinessEmail}" style="color: #8C5828; text-decoration: none;">${trimmedBusinessEmail}</a>
                  </td>
                </tr>

                <!-- Phone -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Phone Number
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; color: #1A1A1A;">
                    ${trimmedPhone ? `<a href="tel:${trimmedPhone.replace(/\s+/g, "")}" style="color: #1A1A1A; text-decoration: none;">${trimmedPhone}</a>` : '<span style="color: #999999;">Not provided</span>'}
                  </td>
                </tr>

                <!-- Country -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Country / Region
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 600; color: #1A1A1A;">
                    ${displayCountry}
                  </td>
                </tr>

                <!-- Requirement Type -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Requirement Type
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2);">
                    <span style="display: inline-block; background-color: #8C5828; color: #FFFFFF; font-family: 'Montserrat', sans-serif; font-size: 11px; font-weight: 600; letter-spacing: 0.08em; text-transform: uppercase; padding: 4px 10px; border-radius: 2px;">
                      ${displayRequirement}
                    </span>
                  </td>
                </tr>

                <!-- Estimated Quantity -->
                <tr>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Estimated Quantity
                  </td>
                  <td style="padding: 13px 20px; border-bottom: 1px solid rgba(196, 149, 106, 0.2); font-family: 'Montserrat', sans-serif; font-size: 14px; font-weight: 700; color: #1A1A1A;">
                    ${trimmedQuantity} pieces
                  </td>
                </tr>

                <!-- Size / Specifications -->
                <tr>
                  <td style="padding: 13px 20px; font-family: 'Montserrat', sans-serif; font-size: 11.5px; font-weight: 500; color: #7A7A7A; text-transform: uppercase; letter-spacing: 0.08em;">
                    Size / Specifications
                  </td>
                  <td style="padding: 13px 20px; font-family: 'Montserrat', sans-serif; font-size: 14px; color: #1A1A1A;">
                    ${trimmedSize || '<span style="color: #888888;">Custom / To be discussed</span>'}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ════════════════════════════════════════════════
               MESSAGE SECTION
               ════════════════════════════════════════════════ -->
          <tr>
            <td style="padding: 0 44px 28px 44px;">
              <h2 style="margin: 0 0 4px 0; font-family: 'Cormorant Garamond', Georgia, 'Times New Roman', serif; font-size: 24px; font-weight: 400; color: #1A1A1A;">
                Message &amp; Requirements
              </h2>
              <div style="width: 32px; height: 1.5px; background-color: #C4956A; margin: 8px 0 16px 0;"></div>

              <div style="background-color: #FAF8F5; border-left: 3px solid #8C5828; padding: 18px 22px; font-family: 'Montserrat', sans-serif; font-size: 14px; line-height: 1.7; color: #2A2A2A; white-space: pre-wrap;">${trimmedMessage}</div>
            </td>
          </tr>

          <!-- ════════════════════════════════════════════════
               CALL TO ACTION: Website Style Button (#8C5828)
               ════════════════════════════════════════════════ -->
          <tr>
            <td align="center" style="padding: 0 44px 40px 44px;">
              <table border="0" cellspacing="0" cellpadding="0" width="100%">
                <tr>
                  <td align="center">
                    <a
                      href="mailto:${trimmedBusinessEmail}?subject=Re:%20Bunaai%20Rugs%20Wholesale%20Enquiry%20-%20${encodeURIComponent(trimmedCompanyName)}"
                      style="display: block; background-color: #8C5828; color: #FFFFFF; font-family: 'Montserrat', sans-serif; font-size: 12px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; text-decoration: none; padding: 16px 32px; text-align: center; border-radius: 0; box-shadow: 0 4px 12px rgba(140, 88, 40, 0.25);"
                    >
                      Reply to ${trimmedName} &rarr;
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ════════════════════════════════════════════════
               FOOTER: Charcoal Dark (#1A1A1A) Matching Website Footer
               ════════════════════════════════════════════════ -->
          <tr>
            <td style="background-color: #1A1A1A; padding: 44px 40px 36px 40px; text-align: center;">
              
              <!-- Company Name in Footer -->
              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 16px auto;">
                <tr>
                  <td align="center" style="border-bottom: 2px solid #C4956A; padding-bottom: 12px;">
                    <span style="font-family: 'Cormorant Garamond', Georgia, serif; font-size: 30px; font-weight: 700; color: #FFFFFF; letter-spacing: 0.24em; text-transform: uppercase;">
                      BUNAAI RUGS
                    </span>
                  </td>
                </tr>
              </table>

              <!-- Brand Tagline from Website -->
              <p style="margin: 0 0 18px 0; font-family: 'Montserrat', sans-serif; font-size: 11px; color: #C4956A; letter-spacing: 0.14em; text-transform: uppercase; font-weight: 500;">
                Manufacturing Excellence &bull; Rooted in Tradition
              </p>

              <!-- Center Diamond Divider -->
              <table border="0" cellspacing="0" cellpadding="0" align="center" style="margin: 0 auto 20px auto; width: 140px;">
                <tr>
                  <td style="height: 1px; background-color: rgba(196, 149, 106, 0.35);"></td>
                  <td width="20" align="center" style="color: #C4956A; font-size: 11px; line-height: 1;">&#9670;</td>
                  <td style="height: 1px; background-color: rgba(196, 149, 106, 0.35);"></td>
                </tr>
              </table>

              <!-- Contact Info -->
              <p style="margin: 0 0 6px 0; font-family: 'Montserrat', sans-serif; font-size: 11.5px; color: #BDB9B3; line-height: 1.6;">
                Village &ndash; Shivrampur, Post Saripur 221314, Umarha BO, Uttar Pradesh, India
              </p>

              <p style="margin: 0 0 10px 0; font-family: 'Montserrat', sans-serif; font-size: 11.5px; color: #BDB9B3;">
                <a href="tel:+918840442688" style="color: #BDB9B3; text-decoration: none;">+91 88404 42688</a>
                &nbsp;&bull;&nbsp;
                <a href="tel:+919205207838" style="color: #BDB9B3; text-decoration: none;">+91 92052 07838</a>
              </p>

              <!-- Official Email -->
              <p style="margin: 0 0 24px 0;">
                <a href="mailto:bunaairugs@gmail.com" style="font-family: 'Montserrat', sans-serif; font-size: 13px; font-weight: 600; color: #C4956A; text-decoration: none; letter-spacing: 0.04em;">
                  bunaairugs@gmail.com
                </a>
              </p>

              <!-- Copyright -->
              <p style="margin: 0; font-family: 'Montserrat', sans-serif; font-size: 10px; color: #666666; letter-spacing: 0.1em; text-transform: uppercase;">
                &copy; ${new Date().getFullYear()} BUNAAI RUGS. ALL RIGHTS RESERVED.
              </p>
            </td>
          </tr>

        </table>

        <!-- Small Website Link Underneath -->
        <p style="margin: 20px 0 0 0; font-family: 'Montserrat', sans-serif; font-size: 11px; color: #7A7A7A; text-align: center;">
          Sent via the official wholesale inquiry form &bull; <a href="https://www.bunaairugs.com" style="color: #8C5828; text-decoration: none;">www.bunaairugs.com</a>
        </p>

      </td>
    </tr>
  </table>
</body>
</html>
`;

    // Plain text alternative
    const textContent = `
BUNAAI RUGS — NEW WHOLESALE ENQUIRY
===================================

Client Name: ${trimmedName}
Company Name: ${trimmedCompanyName}
Business Email: ${trimmedBusinessEmail}
Phone Number: ${trimmedPhone || "Not provided"}
Country / Region: ${displayCountry}
Requirement Type: ${displayRequirement}
Estimated Quantity: ${trimmedQuantity} pieces
Size / Specification: ${trimmedSize || "Custom / To be discussed"}

MESSAGE & REQUIREMENTS:
-----------------------
${trimmedMessage}

===================================
Reply directly to: ${trimmedBusinessEmail}
Bunaai Rugs Official Email: bunaairugs@gmail.com
Phone: +91 88404 42688 | +91 92052 07838
Address: Village – Shivrampur, Post Saripur 221314, Umarha BO, Uttar Pradesh, India
`;

    const data = await resend.emails.send({
      from: fromEmail,
      to: [toEmail],
      replyTo: trimmedBusinessEmail,
      subject: `New Wholesale Enquiry — ${trimmedCompanyName}`,
      html: htmlContent,
      text: textContent,
      attachments: [
        {
          filename: "bunaai-official-logo.png",
          content: logoData.data,
        },
      ],
    });

    if (data.error) {
      console.error("[Resend Delivery Error]:", data.error);
      return res.status(500).json({
        success: false,
        message: "Unable to send your enquiry. Please try again.",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Thank you. Your wholesale enquiry has been sent successfully.",
      id: data.data?.id,
    });
  } catch (error) {
    console.error("[Server Error /api/contact]:", error);
    return res.status(500).json({
      success: false,
      message: "Unable to send your enquiry. Please try again.",
    });
  }
}
