import { MobileNotSupported } from "#/components/ui/mobile-not-supported";
import Providers from "./providers";

export default function AppLayout(props: { children: React.ReactNode }) {
  return (
    <Providers>
      <MobileNotSupported />
      {props.children}
    </Providers>
  );
}
