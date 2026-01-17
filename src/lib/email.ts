import emailjs from "@emailjs/browser";

// Type for the email data
export interface EmailData {
  name?: string;
  email?: string;
  message?: string;
  [key: string]: unknown;
}

// Initialize once (e.g., at module load)
emailjs.init("Ovsh2GH6HQdpFOq27");

// Function to send an email
export const send_email = async (template_params: EmailData): Promise<void> => {
  const serviceID = "service_yuso8s3";
  const templateID = "template_1uup1dp";

  return emailjs
    .send(serviceID, templateID, template_params)
    .then((response) => {
      console.log("SUCCESS!", response.status, response.text);
    })
    .catch((error) => {
      console.error("FAILED...", error);
      alert("Failed to send email");
    });
};
