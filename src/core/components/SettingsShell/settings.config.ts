export const SETTINGS_TABS = [
  { key: 'general', href: '/settings/general' },
  { key: 'security', href: '/settings/security' },
  { key: 'preferences', href: '/settings/preferences' },
  { key: 'project', href: '/settings/project' }
] as const;

export type SettingsTabKey = (typeof SETTINGS_TABS)[number]['key'];
