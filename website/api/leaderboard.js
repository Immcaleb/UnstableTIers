import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  const mode = req.query.mode || "all";

  let results;

  if (mode === "smp") {
    results = await sql`
      SELECT username, rank_earned
      FROM test_results
      WHERE mode = 'smp'
      ORDER BY created_at DESC
    `;
  } else if (mode === "mace") {
    results = await sql`
      SELECT username, rank_earned
      FROM test_results
      WHERE mode = 'mace'
      ORDER BY created_at DESC
    `;
  } else {
    results = await sql`
      SELECT username, mode, rank_earned
      FROM test_results
      ORDER BY created_at DESC
    `;
  }

  res.status(200).json(results);
}