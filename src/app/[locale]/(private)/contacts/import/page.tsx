import { ImportWizard } from '@/modules/contacts-import/components/ImportWizard';
import { groupsMock } from '@/modules/groups/mocks/groups.mock';

export default async function ContactsImportPage() {
  const groups = groupsMock.map((g) => ({ value: g.id, label: g.name }));

  return <ImportWizard groups={groups} />;
}
