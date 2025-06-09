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
      return new Response(JSON.stringify({ error: 'Missing field' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

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
      const errText = await res.text();
      console.error("Firebase response error:", errText);
      return new Response(JSON.stringify({ error: 'Failed to save to Firebase', detail: errText }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (err) {
    console.error("Unexpected error:", err);
    return new Response(JSON.stringify({ error: 'Internal Server Error', detail: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
