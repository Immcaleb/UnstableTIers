 import { neon } from '@neondatabase/serverless';

const sql = neon(process.env.DATABASE_URL);

export default async function handler(req, res) {
  try {
    if (req.method === 'POST') {
      const body = req.body || {};

      await sql`
        INSERT INTO test_results (
          discord_id,
          username,
          mode,
          region,
          previous_rank,
          rank_earned,
          tester
        ) VALUES (
          ${body.discord_id || ''},
          ${body.username || ''},
          ${body.mode || ''},
          ${body.region || ''},
          ${body.previous_rank || ''},
          ${body.rank_earned || ''},
          ${body.tester || ''}
        )
        ON CONFLICT (discord_id, mode)
        DO UPDATE SET
          username = EXCLUDED.username,
          region = EXCLUDED.region,
          previous_rank = EXCLUDED.previous_rank,
          rank_earned = EXCLUDED.rank_earned,
          tester = EXCLUDED.tester,
          created_at = NOW()
      `;

      return res.status(200).json({ success: true, saved: true });
    }

    if (req.method === 'GET') {
      const results = await sql`
        SELECT *
        FROM test_results
        ORDER BY created_at DESC
      `;

      return res.status(200).json(results);
    }

    return res.status(405).json({ error: 'Method not allowed' });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Database error' });
  }
}