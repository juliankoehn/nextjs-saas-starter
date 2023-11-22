import { ThemeProvider } from "#/components/providers/theme-provider";
import { Toaster } from "#/components/ui/toaster";
import { getPageSession } from "#/lib/auth/lucia";

export interface GlobalProvidersProps {
  children: React.ReactNode;
}

export const GlobalProviders: React.FC<GlobalProvidersProps> = async (
  props
) => {
  const { children } = props;
  const session = await getPageSession();

  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      forcedTheme={session?.user.theme}
    >
      {children}
      <Toaster />
    </ThemeProvider>
  );
};
