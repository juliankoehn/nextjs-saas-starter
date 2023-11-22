"use client";

export default function Error() {
  return (
    <div className="grid h-screen px-4 bg-background place-content-center">
      <div className="text-center text-foreground">
        <h1 className="font-black text-foreground text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <p className="mt-4">Something went wrong. Please try again later.</p>
      </div>
    </div>
  );
}
