import { Feed, Item } from "feed";
import { mkdir, readFile, writeFile } from "fs/promises";
import { __dev__ } from "~/lib/consts";
import { GalleryPost, MusicPost } from "./post-types";

const site = "https://mdox.xyz";
const host = "http://localhost:3000";

const rssurl = __dev__ ? host : site;

async function getAllPosts() {
  const musicPosts: MusicPost[] = JSON.parse(
    await readFile("database/music-posts.json", "utf-8")
  );
  const galleryPosts: GalleryPost[] = JSON.parse(
    await readFile("database/gallery-posts.json", "utf-8")
  );

  const results: any[] = [];

  function setType(type: string, item: any) {
    item.__type = type;
  }

  musicPosts.forEach((item) => setType("music", item));
  galleryPosts.forEach((item) => setType("gallery", item));

  function push(path: string, item: any) {
    results.push({
      path: `${path}/${item.id}`,
      content: item.description,
      ...item,
    });
  }

  musicPosts.forEach((item) => push("/music", item));
  galleryPosts.forEach((item) => push("/gallery", item));

  results.sort((a, b) => (a.date > b.date ? -1 : 1));

  return results;
}

export default async function genRSS() {
  const posts = await getAllPosts();
  const siteURL = rssurl;
  const date = new Date();
  const author = {
    name: "Márton Dávid Orosz",
    email: "mdox@mdox.xyz",
    link: site,
  };

  // Creating feed
  const feed = new Feed({
    title: "MDOX",
    description: "MDOX Blog",
    id: siteURL,
    link: siteURL,
    image: `${siteURL}/favicon.ico`,
    favicon: `${siteURL}/favicon.ico`,
    copyright: `All rights reserved ${date.getFullYear()}, Márton Dávid Orosz`,
    updated: date, // today's date
    generator: "Feed for Node.js",
    feedLinks: {
      rss2: `${siteURL}/rss/feed.xml`, // xml format
      json: `${siteURL}/rss/feed.json`, // json fromat
    },
    author,
  });

  // Adding blogs to the rss feed
  posts.forEach((post) => {
    const url = `${siteURL}/${post.path.replace(/^\//, "")}`;

    const item: Item = {
      title: post.title,
      id: url,
      link: url,
      description: post.content,
      content: post.content,
      author: [author],
      contributor: [author],
      date: new Date(post.date),
    };

    if (post.__type === "music") {
      item.audio = `${rssurl}${post.audioPath}`;
      item.image = `${rssurl}${post.imagePath}`;
    }

    if (post.__type === "gallery") {
      item.image = `${rssurl}${post.images[0].imagePath}`;
    }

    feed.addItem(item);
  });

  // generating the xml and json for rss
  await mkdir("public/rss", { recursive: true });
  await Promise.all([
    writeFile("public/rss/feed.xml", feed.rss2()),
    writeFile("public/rss/feed.json", feed.json1()),
  ]);
}
