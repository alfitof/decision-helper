export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  const { optionA, optionB, context } = body;

  if (!optionA || !optionB) {
    throw createError({ statusCode: 400, message: "Opsi A dan B wajib diisi" });
  }

  const config = useRuntimeConfig();

  if (!config.n8nWebhookUrl) {
    throw createError({
      statusCode: 500,
      message: "N8N_WEBHOOK_URL belum di-set di .env",
    });
  }

  if (!config.n8nApiSecret) {
    throw createError({
      statusCode: 500,
      message: "N8N_API_SECRET belum di-set di .env",
    });
  }

  try {
    const raw = await $fetch<any>(config.n8nWebhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": config.n8nApiSecret,
      },
      body: { optionA, optionB, context: context || "" },
    });

    const parsed =
      typeof raw.output === "string" ? JSON.parse(raw.output) : raw;

    return parsed;
  } catch (e: any) {
    console.error("ERROR N8N:", e);

    throw createError({
      statusCode: 502,
      message:
        e?.data?.message ||
        e.message ||
        "Gagal konek ke n8n. Cek webhook URL dan pastikan n8n aktif!",
    });
  }
});
