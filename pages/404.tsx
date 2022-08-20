import Link from "next/link";
import Button from "../components/Button";

export default function NotFoundPage() {
  return (
    <div className="document">
      <h1>404 Page Not Found</h1>
      <p>This page could not be found.</p>
      <Link href="/">
        <a>
          <Button>Go Home</Button>
        </a>
      </Link>
    </div>
  );
}
