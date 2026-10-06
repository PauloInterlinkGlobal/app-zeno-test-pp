import { HeaderTitle } from '@/core/components/Header/HeaderTitle';

import { HeaderActions } from './HeaderActions';

const HEADER_HEIGHT = 80;

export function Header() {
  return (
    <header
      style={{ height: HEADER_HEIGHT }}
      className="sticky top-0 z-50 flex shrink-0 items-center justify-between border-b border-border-ui bg-background px-6"
    >
      <HeaderTitle />
      <HeaderActions />
    </header>
  );
}

export { HeaderAccount } from './HeaderAccount';
export { HeaderActions } from './HeaderActions';
export { HeaderTitle } from './HeaderTitle';
