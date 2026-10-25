export async function onRequestPost({ request, env }) {
  try {
    let data;
    const contentType = request.headers.get("content-type") || "";

    if (contentType.includes("application/json")) {
      data = await request.json();
    } else if (
      contentType.includes("application/x-www-form-urlencoded") ||
      contentType.includes("multipart/form-data")
    ) {
      const formData = await request.formData();
      data = Object.fromEntries(formData.entries());
    } else {
      const text = await request.text();
      try {
        data = JSON.parse(text);
      } catch {
        return new Response(JSON.stringify({ error: "Unsupported content type" }), {
          status: 415,
          headers: { "Content-Type": "application/json" }
        });
      }
    }

    // Spam honeypot validation
    if (data.fax) {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { "Content-Type": "application/json" }
      });
    }

    const name = (data.name || data.inputName || "").trim();
    const company = (data.company || data.companyname || "").trim();
    const phone = (data.phone || "").trim();
    const dialCode = (data.dialCode || data.countryCode || "").trim();
    const email = (data.email || data.inputEmail || "").trim();
    const inquiryType = (data.inquiryType || "General Commercial Inquiry").trim();
    const comment = (data.comment || "").trim();

    if (!email || !phone) {
      return new Response(
        JSON.stringify({ error: "Missing required fields: email and phone" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    // Ready for Cloudflare Email Routing / D1 / External webhook dispatch
    // e.g.:
    // if (env.DB) await env.DB.prepare("INSERT INTO inquiries ...").run();

    return new Response(
      JSON.stringify({
        success: true,
        message: "Inquiry received successfully."
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
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
