export async function GET() {
  return Response.json({ initialFactor: 100, exponentP: 1.9, multiplier: 200 });
}