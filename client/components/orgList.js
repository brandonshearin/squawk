import Link from "next/link";

export default function OrgList({ organizations }) {
  return organizations.map((org) => {
    return (
      <div key={org.id}>
        <h1>{org.name}</h1>
        <h3>{org.address}</h3>
        <Link href={`/organization/${org.id}`}>
          <a>See more</a>
        </Link>
      </div>
    );
  });
}
