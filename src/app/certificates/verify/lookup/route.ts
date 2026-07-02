import { redirect } from 'next/navigation';

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get('token');
  redirect(token ? `/certificates/verify/${encodeURIComponent(token)}` : '/certificates/verify');
}
