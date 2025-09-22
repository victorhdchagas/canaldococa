import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const audioUrl = searchParams.get('url')

    if (!audioUrl) {
      return NextResponse.json(
        { error: 'Parâmetro de URL de áudio ausente.' },
        { status: 400 },
      )
    }

    // Validação básica da URL para evitar requisições maliciosas
    if (!audioUrl.startsWith('https://www.myinstants.com/')) {
      return NextResponse.json({ error: 'URL inválida.' }, { status: 403 })
    }

    const response = await fetch(audioUrl)

    if (!response.ok) {
      throw new Error(`Falha ao buscar o áudio: ${response.statusText}`)
    }

    const headers = new Headers(response.headers)
    headers.set(
      'Content-Disposition',
      `attachment; filename="${audioUrl.split('/').pop()}"`,
    )

    // Retorna a resposta com o áudio e os cabeçalhos apropriados
    return new NextResponse(response.body, {
      headers: headers,
      status: response.status,
    })
  } catch (error) {
    console.error('Erro no proxy de áudio:', error)
    return NextResponse.json(
      { error: 'Erro interno do servidor ao processar a requisição de áudio.' },
      { status: 500 },
    )
  }
}
