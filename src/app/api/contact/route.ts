import { NextResponse } from 'next/server';
import { z } from 'zod';

const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'İsim en az 2 karakter olmalıdır')
    .max(100, 'İsim en fazla 100 karakter olabilir'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  phone: z
    .string()
    .min(10, 'Geçerli bir telefon numarası giriniz')
    .max(20, 'Geçerli bir telefon numarası giriniz'),
  subject: z
    .string()
    .min(2, 'Konu en az 2 karakter olmalıdır')
    .max(200, 'Konu en fazla 200 karakter olabilir'),
  message: z
    .string()
    .min(10, 'Mesaj en az 10 karakter olmalıdır')
    .max(5000, 'Mesaj en fazla 5000 karakter olabilir'),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    // TODO: Entegrasyon noktası — e-posta gönderimi veya CRM bağlantısı
    // Örnek: Nodemailer, SendGrid, Resend veya bir webhook'a iletim
    console.log('İletişim formu gönderildi:', validatedData);

    return NextResponse.json(
      {
        success: true,
        message: 'Mesajınız başarıyla gönderildi. En kısa sürede size dönüş yapacağız.',
      },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof z.ZodError) {
      const issues = error.issues ?? [];
      return NextResponse.json(
        {
          success: false,
          message: 'Lütfen form alanlarını kontrol ediniz.',
          errors: issues.map((e) => ({
            field: e.path.join('.'),
            message: e.message,
          })),
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: false,
        message: 'Bir hata oluştu. Lütfen daha sonra tekrar deneyiniz.',
      },
      { status: 500 }
    );
  }
}
