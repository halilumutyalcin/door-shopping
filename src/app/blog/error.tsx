'use client';

import Link from 'next/link';
import { RefreshCcw, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function BlogError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <Container size="sm">
        <div className="text-center">
          <h1 className="text-4xl font-heading font-bold text-primary-900 mb-4">
            Blog Hatası
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Blog yazısı yüklenirken bir hata oluştu.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={reset} variant="primary">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
            <Link href="/blog">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Blog
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
