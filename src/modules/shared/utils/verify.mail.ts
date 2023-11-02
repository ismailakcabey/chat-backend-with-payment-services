export const verifyMail = (id:string) => {
    const verifyLink = `http://[::1]:3000/auth/verify/${id}`
    const VERIFY_HTML = `
    <!-- Free to use, HTML email template designed & built by FullSphere. Learn more about us at www.fullsphere.co.uk -->

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional //EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html
  xmlns="http://www.w3.org/1999/xhtml"
  xmlns:v="urn:schemas-microsoft-com:vml"
  xmlns:o="urn:schemas-microsoft-com:office:office"
>
  <head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <!--[if !mso]><!-->
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <!--<![endif]-->

    <!-- Your title goes here -->
    <title>Newsletter</title>
    <!-- End title -->

    <!-- Start stylesheet -->
    <style type="text/css">
      a,
      a[href],
      a:hover,
      a:link,
      a:visited {
        /* This is the link colour */
        text-decoration: none !important;
        color: #0000ee;
      }
      .link {
        text-decoration: underline !important;
      }
      p,
      p:visited {
        /* Fallback paragraph style */
        font-size: 15px;
        line-height: 24px;
        font-family: "Helvetica", Arial, sans-serif;
        font-weight: 300;
        text-decoration: none;
        color: #000000;
      }
      h1 {
        /* Fallback heading style */
        font-size: 22px;
        line-height: 24px;
        font-family: "Helvetica", Arial, sans-serif;
        font-weight: normal;
        text-decoration: none;
        color: #000000;
      }
      .ExternalClass p,
      .ExternalClass span,
      .ExternalClass font,
      .ExternalClass td {
        line-height: 100%;
      }
      .ExternalClass {
        width: 100%;
      }

      p {
        font-size: 1.5em;
      }

      button {
        background-color: black;
        color: white;
        font-size: 1.3em;
        border-radius: 5px;
        height: 50px;
        width: 150px;
        margin-bottom: 20px;
      }
    </style>
    <!-- End stylesheet -->
  </head>

  <!-- You can change background colour here -->
  <body
    style="
      text-align: center;
      margin: 0;
      padding-top: 10px;
      padding-bottom: 10px;
      padding-left: 0;
      padding-right: 0;
      -webkit-text-size-adjust: 100%;
      background-color: #f2f4f6;
      color: #000000;
    "
    align="center"
  >
    <!-- Fallback force center content -->
    <div style="text-align: center">
      <!-- Email not displaying correctly -->

      <!-- Email not displaying correctly -->

      <!-- Start container for logo -->
      <table
        align="center"
        style="
          text-align: center;
          vertical-align: top;
          width: 600px;
          max-width: 600px;
          background-color: #ffffff;
        "
        width="600"
      >
        <tbody>
          <tr>
            <td
              style="
                width: 596px;
                vertical-align: top;
                padding-left: 0;
                padding-right: 0;
                padding-top: 15px;
                padding-bottom: 15px;
              "
              width="596"
            >
              <!-- Your logo is here -->
              <img
                style="text-align: center; color: #ffffff"
                alt="Logo"
                src="data:image/png;base64,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"
                align="center"
              />
            </td>
          </tr>
          <tr>
            <td>
              <h1>AI App: All-in-One AI Chatbot</h1>
              <br />
              <p>
                AI App offers an intuitive user interface for accessing ChatGPT,
                <br />
                <br />
                GPT-4, and Google Bard without any daily usage limits, all at an
                <br />
                <br />
                affordable price with a single membership.
              </p>
              <br />
              <p>
                To begin using AI App on the web, mobile, and desktop, simply
                tap the 'Get Started' button.
              </p>
              <a href="${verifyLink}" target="_blank"
                ><button>Get Started</button></a
              >
            </td>
          </tr>
        </tbody>
      </table>

      <!-- End container for logo -->

      <!-- Yazılar -->
      <!-- Start footer -->
      <table
        align="center"
        style="
          text-align: center;
          vertical-align: top;
          width: 600px;
          max-width: 600px;
          background-color: #000000;
        "
        width="600"
      >
        <tbody>
          <tr>
            <td
              style="
                width: 596px;
                vertical-align: top;
                padding-left: 30px;
                padding-right: 30px;
                padding-top: 30px;
                padding-bottom: 30px;
              "
              width="596"
            >
              <p
                style="
                  font-size: 13px;
                  line-height: 24px;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-weight: 400;
                  text-decoration: none;
                  color: #ffffff;
                "
              >
                Address line 1, London, L2 4LN
              </p>

              <p
                style="
                  margin-bottom: 0;
                  font-size: 13px;
                  line-height: 24px;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-weight: 400;
                  text-decoration: none;
                  color: #ffffff;
                "
              >
                <a
                  target="_blank"
                  style="text-decoration: underline; color: #ffffff"
                  href="https://fullsphere.co.uk"
                >
                  www.fullsphere.co.uk
                </a>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End footer -->

      <!-- Start unsubscribe section -->
      <table
        align="center"
        style="
          text-align: center;
          vertical-align: top;
          width: 600px;
          max-width: 600px;
        "
        width="600"
      >
        <tbody>
          <tr>
            <td
              style="
                width: 596px;
                vertical-align: top;
                padding-left: 30px;
                padding-right: 30px;
                padding-top: 30px;
                padding-bottom: 30px;
              "
              width="596"
            >
              <p
                style="
                  font-size: 12px;
                  line-height: 12px;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-weight: normal;
                  text-decoration: none;
                  color: #000000;
                "
              >
                Not wanting to receive these emails?
              </p>

              <p
                style="
                  font-size: 12px;
                  line-height: 12px;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-weight: normal;
                  text-decoration: none;
                  color: #000000;
                "
              >
                You can
                <a
                  style="text-decoration: underline; color: #000000"
                  href="insert-unsubscribe-link-here"
                  ><u>unsubscribe here</u></a
                >
              </p>

              <p
                style="
                  font-size: 12px;
                  line-height: 12px;
                  font-family: 'Helvetica', Arial, sans-serif;
                  font-weight: normal;
                  text-decoration: none;
                  color: #919293;
                  margin-top: 30px;
                "
              >
                Email template built by
                <a
                  style="text-decoration: none; color: #919293"
                  href="https://fullsphere.co.uk"
                  ><u>Chat GPT</u></a
                >
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <!-- End unsubscribe section -->
    </div>
  </body>
</html>
    `
    return VERIFY_HTML
}