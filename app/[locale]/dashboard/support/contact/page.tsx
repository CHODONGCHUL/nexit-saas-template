import ContactForm from "@/components/contact-form";

export default function DashboardContactPage() {
  return <ContactForm showFAQLink={true} faqLinkPath="/dashboard/faq" />;
}
