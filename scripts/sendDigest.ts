import fs from "fs";
import path from "path";
import matter from "gray-matter";
import axios from "axios";
import dayjs from "dayjs";

const BLOG_DIR = path.join(process.cwd(), "src", "content", "blog");
const BUTTONDOWN_API_KEY = process.env.BUTTONDOWN_API_KEY;

if (!BUTTONDOWN_API_KEY) {
  console.error("❌ Missing BUTTONDOWN_API_KEY");
  process.exit(1);
}

function getRecentPosts(days = 7) {
  const files = fs.readdirSync(BLOG_DIR).filter(f => f.endsWith(".md"));
  const cutoff = dayjs().subtract(days, "day");

  const posts = files.map(filename => {
    const filepath = path.join(BLOG_DIR, filename);
    const fileContent = fs.readFileSync(filepath, "utf-8");
    const { data } = matter(fileContent);

    return {
      title: data.title || filename.replace(/\.md$/, ""),
      description: data.description || "",
      date: dayjs(data.pubDate || data.date || data.publishedAt || new Date()),
      slug: filename.replace(/\.md$/, ""),
    };
  });

  return posts
    .filter(p => p.date.isAfter(cutoff))
    .sort((a, b) => b.date.valueOf() - a.date.valueOf());
}

function generateHTML(posts: ReturnType<typeof getRecentPosts>) {
  const hasPosts = posts.length > 0;

  const postBlocks = hasPosts
    ? posts.map(post => `
      <div style="margin-bottom:24px">
        <a href="https://annegautham.github.io/blog/${post.slug}" 
           style="font-size:18px;font-weight:bold;color:#000;text-decoration:none;display:inline-block;margin-bottom:4px">
          ${post.title}
        </a><br/>
        <span style="font-size:14px;color:#444">${post.description}</span><br/>
        <span style="font-size:12px;color:#888">${post.date.format("MMMM D, YYYY")}</span>
      </div>
    `).join("")
    : `<p style="font-size:16px;color:#555">No new posts this week. Locking in, I promise.</p>`;

  const catHtml = `
    <div style="margin-top:40px;text-align:center">
      <img src="https://cataas.com/cat/says/Ok%20Byesies?width=300&cache=${Date.now()}" 
           alt="Cute cat saying Ok Byesies" 
           style="max-width:100%;border-radius:12px;margin-top:20px" />
    </div>
  `;

  return `
    <div style="font-family:sans-serif;padding:24px">
      <h2 style="margin-bottom:16px">Gautham's Weekly Update</h2>
      ${postBlocks}
      ${catHtml}
    </div>
  `;
}
async function sendEmail(html: string) {
  try {
    const plainText = "Check out the latest posts from me at https://annegautham.github.io/blog";

    const res = await axios.post(
      "https://api.buttondown.email/v1/emails",
      {
        subject: "Gautham's Weekly Update",
        body: plainText,
        body_html: html,
      },
      {
        headers: {
          Authorization: `Token ${BUTTONDOWN_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    );

    console.log(`✅ Email sent! ID: ${res.data.id}`);
  } catch (err: any) {
    console.error("❌ Failed to send email:", err.response?.data || err.message);
  }
}


(async () => {
  const posts = getRecentPosts(7);
  const html = generateHTML(posts);
  console.log("=== EMAIL HTML PREVIEW ===\n", html);
  await sendEmail(html);
})();
