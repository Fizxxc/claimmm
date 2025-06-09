export const config = {
  runtime: 'edge',
};

export default async function handler(req) {
  if (req.method !== 'POST') {
    return new Response('Method Not Allowed', { status: 405 });
  }

  try {
    const body = await req.json();

    const { userId, code, hadiahEmail, hadiahPassword } = body;

    if (!userId || !code || !hadiahEmail || !hadiahPassword) {
      return new Response(JSON.stringify({ error: 'Missing field' }), { status: 400 });
    }

    // Ganti URL berikut dengan URL Firebase Realtime Database kamu
    const firebaseURL = "https://e-commerce-a6fe2-default-rtdb.asia-southeast1.firebasedatabase.app";
    const fullPath = `${firebaseURL}/claimUsers/${userId}.json`;

    const data = {
      code,
      hadiahEmail,
      hadiahPassword,
      claimed: false,
    };

    const res = await fetch(fullPath, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to save to Firebase');
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (err) {
    console.error('ERROR:', err);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), { status: 500 });
  }
}
