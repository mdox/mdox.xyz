import Link from "next/link";
import Button from "~/components/Button";

export default function InternalServerErrorPage() {
  return (
    <div className="document">
      <h1>500 Internal Server Error</h1>
      <p>Something went wrong.</p>
      <Link href="/">
        <a>
          <Button>Go Home</Button>
        </a>
      </Link>
    </div>
  );
}
