import { HeaderAccount } from '@/core/components/Header';

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col h-screen overflow-hidden bg-background">
      <HeaderAccount />
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
