// /api/saveCode.js
export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { code, userId, hadiahEmail, hadiahPassword } = req.body;

  if (!code || !userId || !hadiahEmail || !hadiahPassword) {
    return res.status(400).json({ success: false, message: "Data tidak lengkap" });
  }

  try {
    // Ambil env dari Vercel (pastikan sudah set)
    const DATABASE_URL = process.env.FIREBASE_DATABASE_URL;
    const url = `${DATABASE_URL}/claimCodes/${code}.json`;
    const userUrl = `${DATABASE_URL}/claimUsers/${userId}.json`;

    // Simpan kode klaim (set true)
    await fetch(url, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(true)
    });

    // Simpan user + hadiah (email + password)
    await fetch(userUrl, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        code,
        hadiahEmail,
        hadiahPassword,
        claimed: false
      })
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error saveCode:", error);
    return res.status(500).json({ success: false, message: "Server error" });
  }
}
