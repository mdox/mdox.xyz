export type NavLink = {
  path: string;
  text: string;
};

export const mainLinks: NavLink[] = [
  { path: "/", text: "Home" },
  { path: "/blog", text: "Blog" },
  { path: "/music", text: "Music" },
  { path: "/gallery", text: "Gallery" },
];

export const sideLinks: NavLink[] = [
  { path: "/contact", text: "Contact" },
  { path: "/about", text: "About" },
  { path: "/support", text: "Support" },
  { path: "/follow", text: "Follow" },
];
