export type BasedIconProps = {
  path: string;
  size?: number;
  color?: string;
  className?: string;
};

export default function Icon(props: BasedIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      style={{
        width: `${(props.size ?? 1) * 1.5}rem`,
        height: `${(props.size ?? 1) * 1.5}rem`,
      }}
      className={props.className}
    >
      <path
        d={props.path}
        style={{ fill: props.color ?? "currentColor" }}
      ></path>
    </svg>
  );
}
