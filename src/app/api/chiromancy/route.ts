import { NextRequest, NextResponse } from 'next/server';

// Определение продакшена по переменной окружения Node.js
const isProduction = process.env.NODE_ENV === 'production';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();

    const webhookUrl = isProduction
      ? 'https://n8n-production-9f7d.up.railway.app/webhook/DestinyLinesChiromancy'
      : 'https://n8n-production-9f7d.up.railway.app/webhook-test/DestinyLinesChiromancy';

    const response = await fetch(webhookUrl, {
      method: 'POST',
      body: formData,
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
