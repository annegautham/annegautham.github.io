interface Props {
  title: string;
  href: string;
}

export default function NoteCard({ title, href }: Props) {
  return (
    <a
      href={href}
      className="block rounded-lg border border-skin-line bg-skin-card px-4 py-3 transition-all duration-200 hover:border-skin-accent hover:shadow"
    >
      <h2 className="text-lg font-semibold text-skin-base">{title}</h2>
    </a>
  );
}
