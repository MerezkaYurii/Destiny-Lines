import { NextRequest, NextResponse } from 'next/server';

const isProduction = process.env.NODE_ENV === 'production';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const webhookUrl = isProduction
      ? 'https://n8n-production-9f7d.up.railway.app/webhook/DestinyLinesTarotFullResult'
      : 'https://n8n-production-9f7d.up.railway.app/webhook-test/DestinyLinesTarotFullResult';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      const errorText = await response.text();
      return new NextResponse(`Ошибка n8n (${response.status}): ${errorText}`, {
        status: response.status,
      });
    }

    // Безопасное чтение ответа n8n
    const contentType = response.headers.get('content-type') || '';
    if (contentType.includes('application/json')) {
      const result = await response.json();
      return NextResponse.json(result);
    } else {
      const textResult = await response.text();
      return NextResponse.json({ text: textResult });
    }
  } catch (error) {
    console.error('Ошибка в API роуте:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Неизвестная ошибка';
    return new NextResponse(`Внутренняя ошибка сервера: ${errorMessage}`, {
      status: 500,
    });
  }
}
