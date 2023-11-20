import {
  Body,
  Button,
  Container,
  Head,
  Html,
  Link,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { Tailwind } from "@react-email/tailwind";

export const TemplateName = "email-verification-link";

export type EmailVerificationLinkEmailProps = {
  appName: string;
  link: string;
};

export const EmailVerificationLinkEmail = ({
  link,
  appName,
}: EmailVerificationLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Verify your email address</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">LOGO</Section>
          <Text className="text-black text-[14px] leading-[24px]">
            Hey there,
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            Thank you for registering with <strong>{appName}</strong>! Please
            confirm your email address to activate your account and access all
            features.
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            Click the following link to confirm your email address:
          </Text>
          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] px-5 py-3 font-semibold no-underline text-center"
              href={link}
            >
              Verify Email Address
            </Button>
          </Section>
          <Text className="text-black !text-[14px] leading-[24px]">
            or copy and paste this URL into your browser:{" "}
            <Link href={link} className="text-blue-600 no-underline">
              {link}
            </Link>
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            If you didn&apos;t initiate this request, you can ignore this email.
          </Text>
        </Container>
      </Body>
    </Tailwind>
  </Html>
);
