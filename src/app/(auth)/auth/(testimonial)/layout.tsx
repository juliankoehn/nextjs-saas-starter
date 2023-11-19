import { Logo } from "#/components/ui/logo";

export default function ProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="grid flex-1 w-full lg:grid-cols-5 relative">
      <div className="col-span-2 hidden lg:flex flex-col bg-neutral-900 text-white dark:border-r p-10">
        <div className="relative z-20 flex items-center text-lg font-medium">
          <Logo className="mr-2" />
          Acme Inc
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;This library has saved me countless hours of work and
              helped me deliver stunning designs to my clients faster than ever
              before.&rdquo;
            </p>
            <footer className="text-sm">Sofia Davis</footer>
          </blockquote>
        </div>
      </div>
      <div className="col-span-3 flex flex-col items-center justify-center p-8">
        {children}
      </div>
    </div>
  );
}
