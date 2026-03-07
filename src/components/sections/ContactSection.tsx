'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, Mail, MapPin, Send, ExternalLink } from 'lucide-react';
import Container from '@/components/ui/Container';
import Section from '@/components/ui/Section';
import SectionHeader from '@/components/ui/SectionHeader';
import Button from '@/components/ui/Button';
import { siteConfig } from '@/config/site.config';

const contactSchema = z.object({
  name: z.string().min(2, 'Ad Soyad en az 2 karakter olmalıdır'),
  phone: z.string().min(10, 'Geçerli bir telefon numarası giriniz'),
  email: z.string().email('Geçerli bir e-posta adresi giriniz'),
  doorType: z.string().min(1, 'Kapı türü seçiniz'),
  dimensions: z.string().optional(),
  message: z.string().min(10, 'Mesajınız en az 10 karakter olmalıdır'),
});

type ContactFormData = z.infer<typeof contactSchema>;

const doorTypes = [
  'Çelik Kapı',
  'İç Kapı (Oda)',
  'Villa Kapısı',
  'Amerikan Panel Kapı',
  'Cam Kapı / Sürgülü',
  'Yangın Kapısı',
  'Kapı Montajı',
  'Kapı Aksesuarları',
  'Diğer',
];

export default function ContactSection() {
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormData) => {
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.');
        reset();
      } else {
        alert('Bir hata oluştu. Lütfen tekrar deneyin.');
      }
    } catch {
      alert('Bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const contactCards = [
    {
      icon: Phone,
      title: 'Telefon',
      content: siteConfig.contact.phone,
      href: `tel:${siteConfig.contact.phone}`,
    },
    {
      icon: Mail,
      title: 'E-posta',
      content: siteConfig.contact.email,
      href: `mailto:${siteConfig.contact.email}`,
    },
    {
      icon: MapPin,
      title: 'Adres',
      content: `${siteConfig.contact.address.street}, ${siteConfig.contact.address.district}`,
      href: `https://maps.google.com/?q=${encodeURIComponent(
        siteConfig.contact.address.street +
          ', ' +
          siteConfig.contact.address.district +
          ', ' +
          siteConfig.contact.address.city
      )}`,
    },
  ];

  return (
    <Section id="contact" background="gradient">
      <Container>
        <SectionHeader
          subtitle="İletişim"
          title="Ücretsiz Teklif & Ölçü Randevusu"
          description="Formu doldurun, uzman ekibimiz en kısa sürede sizinle iletişime geçsin."
        />

        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-12"
        >
          {/* Form */}
          <div className="lg:col-span-3 bg-white rounded-xl shadow-md border border-gray-100 p-6 md:p-8">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Ad Soyad *
                  </label>
                  <input
                    {...register('name')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                    placeholder="Adınız Soyadınız"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon *
                  </label>
                  <input
                    {...register('phone')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                    placeholder="05XX XXX XX XX"
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    E-posta *
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                    placeholder="ornek@email.com"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Kapı Türü *
                  </label>
                  <select
                    {...register('doorType')}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                  >
                    <option value="">Seçiniz...</option>
                    {doorTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  {errors.doorType && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.doorType.message}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Ölçü Bilgisi (Genişlik x Yükseklik)
                </label>
                <input
                  {...register('dimensions')}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm"
                  placeholder="Örn: 90cm x 210cm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Mesajınız *
                </label>
                <textarea
                  {...register('message')}
                  rows={4}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all text-sm resize-none"
                  placeholder="İhtiyacınızı kısaca açıklayın..."
                />
                {errors.message && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="secondary"
                size="lg"
                className="w-full"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'Gönderiliyor...'
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    Teklif İste
                  </>
                )}
              </Button>
            </form>
          </div>

          {/* Contact Cards */}
          <div className="grid grid-cols-1 gap-4">
            {contactCards.map((card, index) => (
              <a
                key={index}
                href={card.href}
                target={card.icon === MapPin ? '_blank' : undefined}
                rel={card.icon === MapPin ? 'noopener noreferrer' : undefined}
                className="bg-white rounded-xl shadow-md border border-gray-100 p-5 flex items-center space-x-4 hover:shadow-lg transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                  <card.icon className="w-5 h-5 text-primary-600" />
                </div>
                <div>
                  <p className="text-xs text-gray-500 font-medium">
                    {card.title}
                  </p>
                  <p className="text-sm text-primary-900 font-medium">
                    {card.content}
                  </p>
                </div>
              </a>
            ))}
          </div>
        </motion.div>

        {/* Map */}
        <div className="rounded-xl overflow-hidden shadow-md border border-gray-100">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(
              siteConfig.contact.address.street +
                ', ' +
                siteConfig.contact.address.district +
                ', ' +
                siteConfig.contact.address.city
            )}&output=embed`}
            width="100%"
            height="320"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Harita"
          />
          <div className="bg-white p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
            <div>
              <p className="font-medium text-primary-900 text-sm">
                {siteConfig.showroom.title}
              </p>
              <p className="text-gray-500 text-xs">
                {siteConfig.contact.address.street},{' '}
                {siteConfig.contact.address.district},{' '}
                {siteConfig.contact.address.city}
              </p>
            </div>
            <a
              href={`https://maps.google.com/?q=${encodeURIComponent(
                siteConfig.contact.address.street +
                  ', ' +
                  siteConfig.contact.address.district +
                  ', ' +
                  siteConfig.contact.address.city
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-1 text-sm text-accent-600 hover:text-accent-700 font-medium"
            >
              <span>Google Maps&apos;te Aç</span>
              <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </Container>
    </Section>
  );
}
