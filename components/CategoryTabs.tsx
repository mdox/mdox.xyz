import clsx from "clsx";
import { useEffect, useState } from "react";
import Button from "./Button";

export type CategoryTabsProps = {
  selection: string;
  categories: string[];
  onSelect(value: string): void;
};

export default function CategoryTabs(props: CategoryTabsProps) {
  // States
  const [stateSelection, setStateSelection] = useState(props.selection);

  // Effects
  useEffect(() => {
    setStateSelection(props.selection);
  }, [props.selection]);

  // Renders
  return (
    <div className="flex gap-2">
      {props.categories.map((category) => (
        <Button
          key={category}
          className={clsx(
            "border-t-4",
            stateSelection === category ? "border-red-500" : "border-dark"
          )}
          onClick={() => props.onSelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
