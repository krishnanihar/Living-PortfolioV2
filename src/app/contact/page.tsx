import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Contact - Krishna Nihar',
  description: 'Get in touch with Krishna Nihar for design collaborations, speaking opportunities, or general inquiries.',
  openGraph: {
    title: 'Contact - Krishna Nihar',
    description: 'Get in touch with Krishna Nihar for design collaborations, speaking opportunities, or general inquiries.',
    type: 'website',
  },
  twitter: {
    card: 'summary',
    title: 'Contact - Krishna Nihar',
    description: 'Get in touch with Krishna Nihar for design collaborations, speaking opportunities, or general inquiries.',
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-black text-white/92 flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-light mb-4">Contact</h1>
        <p className="text-white/65">Coming soon...</p>
      </div>
    </div>
  );
}
