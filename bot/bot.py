import requests

requests.post(
    "https://unstable-t-iers.vercel.app/api/test-result",
    json={
        "username": username,
        "mode": mode,        # smp or mace
        "region": region,
        "previous_rank": previous_rank,
        "rank_earned": rank_earned,
        "tester": interaction.user.name
    }
)