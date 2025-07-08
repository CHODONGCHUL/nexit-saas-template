import ContactForm from "@/components/contact-form";
import MaxWidthWrapper from "@/components/max-width-wrapper";

export default function ContactPage() {
  return (
    <MaxWidthWrapper className="py-12">
      <ContactForm showFAQLink={true} faqLinkPath="/faq" />
    </MaxWidthWrapper>
  );
}
