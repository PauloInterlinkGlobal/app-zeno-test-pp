import { Logo } from '@/core/components/Logo';
import { PreferencesMenu } from '@/core/components/PreferencesMenu';
import { Link } from '@/core/i18n/navigation';
import { LogOut } from 'lucide-react';

export function HeaderAccount() {
  return (
    <header className="sticky top-0 z-50 flex items-center justify-between h-16 px-6 bg-surface border-b border-border-ui shrink-0">
      <div className="flex items-center gap-4">
        <Link href="/create-account" className="flex items-center gap-2">
          <Logo size="sm" className="h-8 w-auto" />
        </Link>
        <span className="hidden sm:inline-block h-4 w-px bg-border-ui" />
      </div>

      <div className="flex items-center gap-3">
        <PreferencesMenu />

        <div className="w-px h-5 bg-border-ui" />

        <Link
          href="/login"
          title="Sair"
          className="w-9 h-9 flex items-center justify-center rounded-xl hover:bg-item-hover text-text-muted hover:text-red-500 transition-colors"
        >
          <LogOut className="w-4 h-4" />
        </Link>
      </div>
    </header>
  );
}

export default HeaderAccount;
