# Garhwali review tool (गढ़वळि समीक्षा)

Static page + one Vercel function. Native speakers listen to short Akashvani Garhwali clips, correct the machine transcript,
and judge machine translations. Corrections are committed to `reviews/<who>.jsonl` in this repo.

## Deploy (once)
1. On https://vercel.com: **Add New → Project → Import** this GitHub repo. Framework: *Other*. Deploy.
2. GitHub → Settings → Developer settings → Fine-grained tokens → New: repository access = this repo only,
   permission **Contents: Read and write**. Copy the token.
3. Vercel → Project → Settings → Environment Variables: `GITHUB_TOKEN` = the token, `GITHUB_REPO` = `owner/garhwali-review`. Redeploy.
4. Share the Vercel URL. Reviewers pick their name on the page; progress is remembered per device.

Without the token the page still works; corrections queue in the browser and upload when the function is configured.
Audio: research use only, not for redistribution. Clips are 2-15 s excerpts of All India Radio Dehradun bulletins (Prasar Bharati).
