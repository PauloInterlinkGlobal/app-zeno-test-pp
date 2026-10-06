import { PaymentDetails } from '@/modules/payments/components/PaymentDetails';
import { getPaymentByReference } from '@/modules/payments/utils/payments-filters';
import { notFound } from 'next/navigation';

export default async function PaymentDetailsPage({
  params,
}: {
  params: Promise<{ reference: string }>;
}) {
  const { reference } = await params;
  const payment = getPaymentByReference(decodeURIComponent(reference));

  if (!payment) notFound();

  return <PaymentDetails payment={payment} />;
}
