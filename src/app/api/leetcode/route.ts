import { NextResponse } from "next/server";

const LEETCODE_USERNAME = process.env.NEXT_PUBLIC_LEETCODE_USERNAME || "";

export async function GET() {
  try {
    if (!LEETCODE_USERNAME) {
      return NextResponse.json({ error: "LeetCode username not configured" }, { status: 400 });
    }

    const query = `
      query userProfile($username: String!) {
        matchedUser(username: $username) {
          username
          submitStats: submitStatsGlobal {
            acSubmissionNum {
              difficulty
              count
              submissions
            }
          }
          profile {
            ranking
            reputation
            starRating
          }
          languageProblemCount {
            languageName
            problemsSolved
          }
        }
        userContestRanking(username: $username) {
          attendedContestsCount
          rating
          globalRanking
          totalParticipants
          topPercentage
        }
      }
    `;

    const res = await fetch("https://leetcode.com/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        query,
        variables: { username: LEETCODE_USERNAME },
      }),
    });

    if (!res.ok) {
      return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 502 });
    }

    const data = await res.json();

    if (data.errors) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const user = data.data.matchedUser;
    const ranking = data.data.userContestRanking;

    const stats = {
      username: user.username,
      ranking: user.profile.ranking,
      reputation: user.profile.reputation,
      problems: user.submitStats.acSubmissionNum.map(
        (s: { difficulty: string; count: number }) => ({
          difficulty: s.difficulty,
          solved: s.count,
        }),
      ),
      totalSolved: user.submitStats.acSubmissionNum.reduce(
        (sum: number, s: { count: number }) => sum + s.count,
        0,
      ),
      languages: user.languageProblemCount.map(
        (l: { languageName: string; problemsSolved: number }) => ({
          language: l.languageName,
          solved: l.problemsSolved,
        }),
      ),
      contestRating: ranking?.rating || 0,
      globalRanking: ranking?.globalRanking || 0,
      contestsAttended: ranking?.attendedContestsCount || 0,
    };

    return NextResponse.json(stats);
  } catch (error) {
    console.error("LeetCode API error:", error);
    return NextResponse.json({ error: "Failed to fetch LeetCode data" }, { status: 500 });
  }
}
