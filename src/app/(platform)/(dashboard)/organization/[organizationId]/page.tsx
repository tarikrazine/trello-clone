export default function OrganizationId({
  params,
}: {
  params: { organizationId: string };
}) {
  return <div>{params.organizationId}</div>;
}
