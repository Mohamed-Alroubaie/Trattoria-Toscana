// app/page.tsx
import { redirect } from 'next/navigation';

export default function RootRedirectPage() {
  // Directly forward root traffic straight to the main German landing experience
  redirect('/de');
}
