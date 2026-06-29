'use client';

import { AnimatePresence, motion, useInView } from 'framer-motion';
import { useCallback, useEffect, useRef, useState, type ChangeEvent, type CSSProperties, type FormEvent } from 'react';
import { useLocale, useTranslations } from 'next-intl';

const FORMSPREE_ENDPOINT = 'https://formspree.io/f/YOUR_FORMSPREE_FORM_ID';

interface FormFields {
  name: string;
  phone: string;
  email: string;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function ProductsCTA() {
  const t = useTranslations('products');
  const locale = useLocale();
  const isAr = locale === 'ar';
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-60px 0px' });

  const [isOpen, setIsOpen] = useState(false);
  const [fields, setFields] = useState<FormFields>({ name: '', phone: '', email: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const openModal = () => {
    setIsOpen(true);
    setStatus('idle');
  };

  const closeModal = useCallback(() => {
    if (status === 'loading') return;
    setIsOpen(false);
    window.setTimeout(() => {
      setFields({ name: '', phone: '', email: '' });
      setStatus('idle');
    }, 350);
  }, [status]);

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, closeModal]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (status === 'loading') return;

    setStatus('loading');

    try {
      const res = await fetch(FORMSPREE_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...fields, _locale: locale }),
      });
      setStatus(res.ok ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const ui = {
    modalTitle: isAr ? 'احجزي استشارتك' : 'Book Your\nConsultation',
    modalSubtitle: isAr
      ? 'دعي خبراءنا يساعدونكِ في اختيار التركيبة المثالية لبشرتك'
      : 'Let our specialists guide you to your perfect Bella formula',
    namePH: isAr ? 'الاسم الكريم' : 'Full name',
    phonePH: isAr ? 'رقم الجوال' : 'Phone number',
    emailPH: isAr ? 'البريد الإلكتروني' : 'Email address',
    submit: isAr ? 'إرسال الطلب' : 'Send Request',
    submitting: isAr ? 'جارٍ الإرسال...' : 'Sending...',
    successTitle: isAr ? 'تم الإرسال بنجاح' : 'Request Received',
    successBody: isAr
      ? 'سنتواصل معكِ قريباً لتأكيد موعد استشارتك.'
      : "We'll be in touch shortly to confirm your consultation.",
    error: isAr ? 'حدث خطأ. يرجى المحاولة مجدداً.' : 'Something went wrong. Please try again.',
    privacy: isAr ? 'بياناتك آمنة ومحفوظة' : 'Your information is private & secure',
    close: isAr ? 'إغلاق' : 'Close',
  };

  const inputStyle = (name: string): CSSProperties => ({
    background: 'transparent',
    border: 'none',
    borderBottom: `1px solid rgba(201,169,110,${focused === name ? '0.8' : '0.3'})`,
    borderRadius: 0,
    padding: '10px 0',
    width: '100%',
    fontSize: '13px',
    color: '#1A1A1A',
    fontFamily: 'inherit',
    outline: 'none',
    transition: 'border-color 0.25s ease',
    direction: name === 'phone' || name === 'email' ? ('ltr' as const) : undefined,
  });

  return (
    <>
      <section
        ref={sectionRef}
        className="relative py-24 lg:py-36 px-6 text-center overflow-hidden"
        style={{ background: '#F5EFE6' }}
      >
        <div
          aria-hidden="true"
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 55% 55% at 50% 50%, rgba(201,169,110,0.09) 0%, transparent 70%)',
          }}
        />

        <div className="relative z-10 max-w-lg mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 12 }}
            transition={{ duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="text-[9px] font-medium tracking-[5px] uppercase text-[#C9A96E] mb-4"
          >
            {t('cta.eyebrow')}
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 18 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="font-display font-light text-[#1A1A1A] leading-[1.05] mb-4"
            style={{ fontSize: 'clamp(2rem, 4.5vw, 3.5rem)' }}
          >
            {t('cta.title')}
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="h-px w-14 mx-auto mb-6 origin-center"
            style={{ background: 'linear-gradient(90deg, transparent, #C9A96E, transparent)' }}
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7, delay: 0.42 }}
            className="text-[#1A1A1A]/50 text-sm leading-relaxed font-light mb-10"
          >
            {t('cta.description')}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
            transition={{ duration: 0.6, delay: 0.55 }}
          >
            <motion.button
              onClick={openModal}
              whileHover={{ backgroundColor: '#1A1A1A', y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ duration: 0.28, ease: 'easeOut' }}
              className="px-14 py-4 text-white text-[10px] font-medium tracking-[3px] uppercase rounded-sm border-0 cursor-pointer outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-2"
              style={{ backgroundColor: '#C9A96E' }}
              type="button"
            >
              {t('cta.button')}
            </motion.button>
          </motion.div>
        </div>
      </section>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              key="cta-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 z-[500] bg-[#1A1A1A]/55 backdrop-blur-[3px]"
              onClick={closeModal}
              aria-hidden="true"
            />

            <motion.div
              key="cta-modal"
              initial={{ opacity: 0, scale: 0.96, y: 18 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: 18 }}
              transition={{ duration: 0.34, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="fixed inset-0 z-[501] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="consult-title"
            >
              <div
                className="pointer-events-auto w-full max-w-2xl rounded-sm shadow-2xl overflow-hidden flex flex-col sm:flex-row"
                dir={isAr ? 'rtl' : 'ltr'}
                onClick={(e) => e.stopPropagation()}
              >
                <div
                  className="flex-shrink-0 sm:w-[42%] flex flex-col justify-between p-7 sm:p-10"
                  style={{ background: '#1A1A1A' }}
                >
                  <div>
                    <p
                      className="text-[8px] tracking-[5px] uppercase font-medium mb-6 sm:mb-8"
                      style={{ color: '#C9A96E' }}
                    >
                      BELLA
                    </p>
                    <h2
                      id="consult-title"
                      className="font-display font-light text-white leading-[1.1] mb-0 sm:mb-5 text-xl sm:text-[clamp(1.6rem,2.5vw,2.2rem)]"
                      style={{ whiteSpace: 'pre-line' }}
                    >
                      {ui.modalTitle}
                    </h2>
                    <div className="hidden sm:block w-8 h-px mb-5" style={{ background: 'rgba(201,169,110,0.5)' }} />
                    <p className="hidden sm:block text-white/40 text-[12px] leading-relaxed font-light">
                      {ui.modalSubtitle}
                    </p>
                  </div>

                  <div className="hidden sm:flex items-center gap-3 mt-10">
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                      <path d="M7 1L13 7L7 13L1 7Z" stroke="#C9A96E" strokeWidth="0.8" strokeOpacity="0.6" />
                    </svg>
                    <span className="text-[9px] tracking-[3px] uppercase text-white/25 font-light">
                      {isAr ? 'فخامة · أصالة · ثقة' : 'Luxury · Science · Trust'}
                    </span>
                  </div>
                </div>

                <div className="flex-1 flex flex-col" style={{ background: '#FAF8F5' }}>
                  <div className="flex items-center justify-between px-7 sm:px-10 pt-7 sm:pt-10 pb-5 border-b border-[rgba(201,169,110,0.15)]">
                    <p className="text-[9px] tracking-[4px] uppercase text-[#C9A96E] font-medium">
                      {isAr ? 'استشارة مجانية' : 'Free Consultation'}
                    </p>
                    <button
                      onClick={closeModal}
                      className="w-8 h-8 flex items-center justify-center rounded-full border border-[rgba(201,169,110,0.28)] text-[#C9A96E] hover:bg-[rgba(201,169,110,0.10)] transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#C9A96E]"
                      aria-label={ui.close}
                      type="button"
                    >
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden="true">
                        <path d="M1 1l9 9M10 1L1 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex-1 px-7 sm:px-10 py-7 sm:py-8">
                    <AnimatePresence mode="wait">
                      {status === 'success' && (
                        <motion.div
                          key="success"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          className="flex flex-col items-center justify-center py-8 text-center h-full"
                        >
                          <div className="w-14 h-14 rounded-full border border-[#C9A96E] flex items-center justify-center mb-5">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                              <path d="M4 10l5 5 7-9" stroke="#C9A96E" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </div>
                          <h3 className="font-display font-light text-[#1A1A1A] text-xl mb-2">
                            {ui.successTitle}
                          </h3>
                          <p className="text-[#1A1A1A]/50 text-sm leading-relaxed mb-6 max-w-xs">
                            {ui.successBody}
                          </p>
                          <button
                            onClick={closeModal}
                            className="text-[10px] tracking-[2px] uppercase text-[#C9A96E] border-b border-[rgba(201,169,110,0.4)] pb-0.5 hover:border-[#C9A96E] transition-colors bg-transparent outline-none cursor-pointer"
                            type="button"
                          >
                            {ui.close}
                          </button>
                        </motion.div>
                      )}

                      {status !== 'success' && (
                        <motion.form
                          key="form"
                          onSubmit={handleSubmit}
                          initial={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="space-y-6"
                          noValidate
                        >
                          <div>
                            <label className="block text-[9px] tracking-[3px] uppercase text-[#C9A96E] font-medium mb-2">
                              {isAr ? 'الاسم' : 'Name'}
                            </label>
                            <input
                              type="text"
                              name="name"
                              value={fields.name}
                              onChange={handleChange}
                              onFocus={() => setFocused('name')}
                              onBlur={() => setFocused(null)}
                              placeholder={ui.namePH}
                              required
                              disabled={status === 'loading'}
                              autoComplete="name"
                              style={inputStyle('name')}
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] tracking-[3px] uppercase text-[#C9A96E] font-medium mb-2">
                              {isAr ? 'الجوال' : 'Phone'}
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={fields.phone}
                              onChange={handleChange}
                              onFocus={() => setFocused('phone')}
                              onBlur={() => setFocused(null)}
                              placeholder={ui.phonePH}
                              required
                              disabled={status === 'loading'}
                              autoComplete="tel"
                              style={inputStyle('phone')}
                            />
                          </div>

                          <div>
                            <label className="block text-[9px] tracking-[3px] uppercase text-[#C9A96E] font-medium mb-2">
                              {isAr ? 'البريد' : 'Email'}
                            </label>
                            <input
                              type="email"
                              name="email"
                              value={fields.email}
                              onChange={handleChange}
                              onFocus={() => setFocused('email')}
                              onBlur={() => setFocused(null)}
                              placeholder={ui.emailPH}
                              required
                              disabled={status === 'loading'}
                              autoComplete="email"
                              style={inputStyle('email')}
                            />
                          </div>

                          {status === 'error' && (
                            <p className="text-[11px] text-red-500/70 tracking-wide -mt-2">
                              {ui.error}
                            </p>
                          )}

                          <div className="pt-2">
                            <motion.button
                              type="submit"
                              disabled={status === 'loading'}
                              whileHover={status !== 'loading' ? { backgroundColor: '#1A1A1A' } : undefined}
                              whileTap={status !== 'loading' ? { scale: 0.98 } : undefined}
                              transition={{ duration: 0.25 }}
                              className="w-full py-4 text-white text-[10px] font-medium tracking-[3px] uppercase rounded-sm disabled:opacity-55 cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-[#C9A96E] focus-visible:ring-offset-1"
                              style={{ backgroundColor: '#C9A96E' }}
                            >
                              {status === 'loading' ? (
                                <span className="flex items-center justify-center gap-2">
                                  <svg className="animate-spin" width="13" height="13" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                    <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="2.5" strokeOpacity="0.25" />
                                    <path d="M12 2a10 10 0 0 1 10 10" stroke="white" strokeWidth="2.5" strokeLinecap="round" />
                                  </svg>
                                  {ui.submitting}
                                </span>
                              ) : (
                                ui.submit
                              )}
                            </motion.button>
                          </div>

                          <p className="text-center text-[10px] text-[#1A1A1A]/28 tracking-wide">
                            {ui.privacy}
                          </p>
                        </motion.form>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
