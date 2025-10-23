import { unauthorized } from 'next/navigation'
import { NextRequest } from 'next/server'

export async function GET() {
  try {
    return Response.json([
      'https://placehold.co/256x126/orange/white?font=roboto&text=Bem+vindo',
      'https://placehold.co/256x126/black/white?font=roboto&text=Bem+vindo',
      'https://placehold.co/256x126/red/white?font=roboto&text=Bem+vindo',
      'https://placehold.co/256x126/yellow/white?font=roboto&text=Bem+vindo',
    ])
  } catch {
    unauthorized()
  }
}
