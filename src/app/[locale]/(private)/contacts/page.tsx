import { ContactsList } from '@/modules/contacts/components/ContactsList';
import { contactsMock } from '@/modules/contacts/mocks/contacts.mock';
import { parseContactsFilters } from '@/modules/contacts/utils/contacts-filters';

interface ContactsPageProps {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}

export default async function ContactsPage({
  searchParams,
}: ContactsPageProps) {
  const filters = parseContactsFilters(await searchParams);
  const data = contactsMock;
  return <ContactsList data={data} filters={filters} />;
}
