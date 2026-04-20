import { NextResponse } from "next/server"
import OpenAI from "openai"
import { getSupabaseAdmin } from "@/lib/supabase-admin"

const VALID_CATEGORIES = ["language", "hardware", "software", "internet", "person", "company"] as const

export async function GET(request: Request) {
  // Verify cron secret to prevent unauthorized calls
  const authHeader = request.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  // Calculate tomorrow's date
  const tomorrow = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)
  const month = String(tomorrow.getMonth() + 1).padStart(2, "0")
  const day = String(tomorrow.getDate()).padStart(2, "0")
  const tomorrowDate = `${month}-${day}`

  const monthNames = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
  ]
  const readableDate = `${parseInt(day)} de ${monthNames[parseInt(month) - 1]}`

  // Check if an ephemeris already exists for tomorrow
  const { data: existing } = await getSupabaseAdmin()
    .from("ephemerides")
    .select("id")
    .eq("date", tomorrowDate)

  if (existing && existing.length > 0) {
    return NextResponse.json({
      message: `Ephemeris already exists for ${tomorrowDate}`,
      skipped: true,
    })
  }

  // Generate ephemeris with Gemini (OpenAI-compatible API)
  const gemini = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai/",
  })

  const completion = await gemini.chat.completions.create({
    model: "gemini-2.0-flash",
    temperature: 0.3,
    response_format: { type: "json_object" },
    messages: [
      {
        role: "system",
        content: `Eres un historiador experto en la historia de la computación, programación y tecnología. 
Tu tarea es proporcionar una efeméride REAL y VERIFICABLE que ocurrió un día concreto de la historia.

REGLAS ESTRICTAS:
- El evento DEBE haber ocurrido exactamente en la fecha indicada (día y mes). Esto es CRÍTICO.
- Debe ser un evento real, documentado y verificable. NO inventes eventos.
- Si no estás 100% seguro de la fecha exacta, elige otro evento del que sí estés seguro.
- Prioriza eventos relevantes para: programación, computación, hardware, software, internet, o personas/empresas clave del sector tecnológico.
- El contenido debe estar en ESPAÑOL.
- La descripción debe tener entre 1 y 3 frases, concisa pero informativa.

Categorías válidas: "language" (lenguajes de programación), "hardware", "software", "internet", "person" (nacimiento/muerte de personas clave), "company" (fundación/hitos de empresas).

Responde SOLO con un JSON con esta estructura exacta:
{
  "year": <número del año>,
  "title": "<título corto del evento>",
  "description": "<descripción en español>",
  "category": "<una de las categorías válidas>",
  "confidence": "<high o medium>",
  "source_hint": "<breve referencia de por qué sabes que esta fecha es correcta>"
}`,
      },
      {
        role: "user",
        content: `Dame una efeméride de programación/computación que ocurrió exactamente el ${readableDate}. Recuerda: la fecha debe ser EXACTA, no aproximada.`,
      },
    ],
  })

  const content = completion.choices[0]?.message?.content
  if (!content) {
    return NextResponse.json({ error: "No response from OpenAI" }, { status: 500 })
  }

  let parsed: {
    year: number
    title: string
    description: string
    category: string
    confidence: string
    source_hint: string
  }

  try {
    parsed = JSON.parse(content)
  } catch {
    return NextResponse.json({ error: "Invalid JSON from OpenAI", raw: content }, { status: 500 })
  }

  // Validate fields
  if (!parsed.year || !parsed.title || !parsed.description || !parsed.category) {
    return NextResponse.json({ error: "Missing required fields", raw: parsed }, { status: 500 })
  }

  if (!VALID_CATEGORIES.includes(parsed.category as typeof VALID_CATEGORIES[number])) {
    return NextResponse.json({ error: `Invalid category: ${parsed.category}`, raw: parsed }, { status: 500 })
  }

  if (parsed.confidence === "medium") {
    console.warn(`[generate-ephemeris] Medium confidence for ${tomorrowDate}:`, parsed.source_hint)
  }

  // Insert into Supabase
  const { data, error } = await getSupabaseAdmin()
    .from("ephemerides")
    .insert({
      date: tomorrowDate,
      year: parsed.year,
      title: parsed.title,
      description: parsed.description,
      category: parsed.category as typeof VALID_CATEGORIES[number],
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: "Failed to insert", details: error.message }, { status: 500 })
  }

  return NextResponse.json({
    message: `Ephemeris created for ${tomorrowDate}`,
    data,
    source_hint: parsed.source_hint,
  })
}
