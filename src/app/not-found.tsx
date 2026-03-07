import Link from 'next/link';
import { Home, ArrowLeft } from 'lucide-react';
import Button from '@/components/ui/Button';
import Container from '@/components/ui/Container';

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 pt-20">
      <Container size="sm">
        <div className="text-center">
          <h1 className="text-8xl font-heading font-bold text-primary-300 mb-4">
            404
          </h1>
          <h2 className="text-2xl font-heading font-bold text-primary-900 mb-4">
            Sayfa Bulunamadı
          </h2>
          <p className="text-gray-600 mb-8">
            Aradığınız sayfa mevcut değil veya taşınmış olabilir.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/">
              <Button variant="primary">
                <Home className="w-4 h-4 mr-2" />
                Ana Sayfa
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Ürünlerimiz
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
