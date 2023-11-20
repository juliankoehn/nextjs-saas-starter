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

export const TemplateName = "project-invite-email";

const subject = "You've been invited to a project";

export type EmailVerificationLinkEmailProps = {
  appName: string;
  link: string;
};

export const Template = ({
  link,
  appName,
}: EmailVerificationLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>{subject}</Preview>
    <Tailwind>
      <Body className="bg-white my-auto mx-auto font-sans">
        <Container className="border-separate border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] w-[465px]">
          <Section className="mt-[32px]">LOGO</Section>
          <Text className="text-black text-[14px] leading-[24px]">
            Hey there,
          </Text>
          <Text className="text-black text-[14px] leading-[24px]">
            <strong>joker (joker@arkham.com)</strong> has invited you to the{" "}
            <strong>Batmobile</strong> project on <strong>AppName</strong>.
          </Text>
          <Section className="text-center mt-[32px] mb-[32px]">
            <Button
              className="bg-[#000000] rounded text-white text-[12px] px-5 py-3 font-semibold no-underline text-center"
              href={link}
            >
              Join the project
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
