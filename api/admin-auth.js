export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { username, password } = req.body;

  const ADMIN_USERNAME = "Fizzx";
  const ADMIN_PASSWORD = "Fizzx132";

  if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
    res.status(200).json({ success: true });
  } else {
    res.status(401).json({ success: false, message: "Username atau password salah" });
  }
}
