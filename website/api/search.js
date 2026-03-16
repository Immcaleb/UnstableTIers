import { neon } from "@neondatabase/serverless";

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {

  const { id } = req.query;

  const player = await sql`
    SELECT *
    FROM test_results
    WHERE discord_id = ${id}
  `;

  res.status(200).json(player);
}