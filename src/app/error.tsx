'use client';

import Link from 'next/link';
import { RefreshCcw, Home } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <Container size="sm">
        <div className="text-center">
          <h1 className="text-6xl font-heading font-bold text-primary-900 mb-4">
            Hata
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Üzgünüz, bir hata oluştu. Lütfen tekrar deneyin.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Button onClick={reset} variant="primary">
              <RefreshCcw className="w-4 h-4 mr-2" />
              Tekrar Dene
            </Button>
            <Link href="/">
              <Button variant="outline">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
