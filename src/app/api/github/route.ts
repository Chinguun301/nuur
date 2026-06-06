import { NextResponse } from "next/server";

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME || "";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || "";

export async function GET() {
  try {
    if (!GITHUB_USERNAME) {
      return NextResponse.json({ error: "GitHub username not configured" }, { status: 400 });
    }

    const headers: Record<string, string> = {
      Accept: "application/vnd.github.v3+json",
    };

    if (GITHUB_TOKEN) {
      headers.Authorization = `Bearer ${GITHUB_TOKEN}`;
    }

    const [userRes, reposRes, eventsRes] = await Promise.all([
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, { headers }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`, {
        headers,
      }),
      fetch(`https://api.github.com/users/${GITHUB_USERNAME}/events?per_page=100`, { headers }),
    ]);

    const [user, repos, events] = await Promise.all([
      userRes.json(),
      reposRes.json(),
      eventsRes.json(),
    ]);

    // Calculate stats
    const totalStars = repos.reduce(
      (sum: number, repo: { stargazers_count: number }) => sum + (repo.stargazers_count || 0),
      0,
    );
    const totalForks = repos.reduce(
      (sum: number, repo: { forks_count: number }) => sum + (repo.forks_count || 0),
      0,
    );
    const totalCommits = events.filter((e: { type: string }) => e.type === "PushEvent").length;
    const languages: Record<string, number> = {};
    repos.forEach((repo: { language: string }) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    // Sort languages by usage
    const sortedLanguages = Object.entries(languages)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 8)
      .map(([name, count]) => ({ name, count }));

    // Get contribution data (last 52 weeks)
    const contributions = await getContributions();

    return NextResponse.json({
      user: {
        login: user.login,
        name: user.name,
        avatar_url: user.avatar_url,
        bio: user.bio,
        public_repos: user.public_repos,
        followers: user.followers,
        following: user.following,
      },
      stats: {
        totalStars,
        totalForks,
        totalCommits,
        totalRepos: repos.length,
      },
      languages: sortedLanguages,
      contributions,
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json({ error: "Failed to fetch GitHub data" }, { status: 500 });
  }
}

async function getContributions() {
  try {
    // Using GitHub GraphQL API for contribution graph
    const query = `
      query {
        user(login: "${GITHUB_USERNAME}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays {
                  date
                  contributionCount
                }
              }
            }
          }
        }
      }
    `;

    const res = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query }),
    });

    if (!res.ok) return [];

    const data = await res.json();
    const weeks = data?.data?.user?.contributionsCollection?.contributionCalendar?.weeks || [];
    return weeks.flatMap(
      (w: { contributionDays: Array<{ date: string; contributionCount: number }> }) =>
        w.contributionDays.map((d: { date: string; contributionCount: number }) => ({
          date: d.date,
          count: d.contributionCount,
        })),
    );
  } catch {
    return [];
  }
}
