export async function onRequestGet({ request, env }) {
  try {
    const adminPassword = env.ADMIN_PASSWORD;

    if (!adminPassword) {
      return new Response(
        JSON.stringify({
          error: "ADMIN_PASSWORD environment variable is not configured."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const authHeader = request.headers.get("Authorization") || "";
    const customHeader = request.headers.get("x-admin-password") || "";
    const providedPassword =
      customHeader ||
      (authHeader.startsWith("Bearer ") ? authHeader.slice(7).trim() : "");

    if (!providedPassword || providedPassword !== adminPassword) {
      return new Response(
        JSON.stringify({ error: "Unauthorized: Invalid password." }),
        {
          status: 401,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    if (!env.DB) {
      return new Response(
        JSON.stringify({
          error: "D1 database binding 'DB' not configured in Pages project."
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const { results } = await env.DB.prepare(
      "SELECT id, name, company, phone, email, inquiry_type, comment, created_at FROM inquiries ORDER BY id DESC LIMIT 500"
    ).all();

    return new Response(
      JSON.stringify({
        success: true,
        leads: results || []
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          "Cache-Control": "no-store"
        }
      }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: err.message || "Internal server error" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
}
