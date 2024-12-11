export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="py-16 px-4 flex items-center justify-center">
      {children}
    </main>
  );
}
