import emailjs from "@emailjs/browser";

// Type for the email data
export interface EmailData {
  name?: string;
  email?: string;
  message?: string;
}

// Function to send an email
export const send_email = (template_params: EmailData): void => {
  // Your EmailJS user ID and service template (you get this from the EmailJS dashboard)
  const serviceID = "service_yuso8s3"; // Replace with your Service ID
  const templateID = "template_1uup1dp"; // Replace with your Template ID

  // Sending the email via EmailJS
  emailjs
    .send(serviceID, templateID, template_params, {
      publicKey: "Ovsh2GH6HQdpFOq27",
    })
    .then(
      () => {
        console.log("SUCCESS!");
      },
      (error) => {
        console.log("FAILED...", error.text);
      }
    );
};
