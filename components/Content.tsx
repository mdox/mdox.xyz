import clsx from "clsx";
import { useRouter } from "next/router";
import { MouseEventHandler } from "react";
import { useRemarkSync } from "react-remark";
import { twMerge } from "tailwind-merge";

interface Props {
  children: string;
  className?: string;
}

function Content(props: Props) {
  // Uses
  const router = useRouter();

  // Handlers
  const handleClick: MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLAnchorElement) {
      const target: HTMLAnchorElement = e.target;

      if (target.title.startsWith("Visit: ")) {
        window.open(target.href, "_blank");
      } else if (target.title.startsWith("Download: ")) {
        const a = document.createElement("a");
        a.download = target.title.split("Download: ")[1];
        a.href = target.href;
        a.hidden = true;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      } else {
        router.push(target.href);
      }

      e.stopPropagation();
      e.preventDefault();
    }
  };

  // Render
  return (
    <div
      className={twMerge(clsx("prose", "document"), props.className)}
      onClick={handleClick}
    >
      {useRemarkSync(props.children)}
    </div>
  );
}

export default Content;
