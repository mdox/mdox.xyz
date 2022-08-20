import Link from "next/link";

export type MusicCardDetailsProps = {
  id: string;
  title: string;
  description: string;
  date: string;
};

export default function MusicCardDetails(props: MusicCardDetailsProps) {
  return (
    <div className="flex flex-grow flex-col">
      <h2 className="grid w-fit">
        <Link href={`/music/${props.id}`}>
          <a className="overflow-hidden text-ellipsis whitespace-nowrap">
            {props.title}
          </a>
        </Link>
      </h2>
      <div className="document mb-auto">
        <p className="whitespace-pre-wrap">{props.description}</p>
      </div>
      <span className="ml-auto text-sm">{props.date}</span>
    </div>
  );
}
