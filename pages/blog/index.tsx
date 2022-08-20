import Link from "next/link";
import Button from "../../components/Button";

export default function BlogPage() {
  return (
    <div className="document">
      <h1>No Posts Yet</h1>
      <p>This page contain no posts.</p>
      <Link href="/">
        <a>
          <Button>Go Home</Button>
        </a>
      </Link>
    </div>
  );
}
