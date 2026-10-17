import { Github, Linkedin, Mail, MapPin, Phone } from 'lucide-react';
import FadeIn from '../components/FadeIn';
import ContactButton from '../components/ContactButton';
import { profile } from '../data';

const links = [
  { icon: Mail, label: profile.email, href: `mailto:${profile.email}` },
  { icon: Phone, label: profile.phone, href: `tel:${profile.phone.replace(/\s/g, '')}` },
  { icon: Github, label: 'sarrabouraoui21', href: profile.github },
  { icon: Linkedin, label: 'bouraoui-sarra', href: profile.linkedin },
];

export default function ContactSection() {
  return (
    <section id="contact" className="relative z-10 bg-[#0C0C0C] px-5 pb-12 pt-24 sm:px-8 md:px-10 md:pt-32">
      <div className="mx-auto flex max-w-5xl flex-col items-center gap-10 text-center sm:gap-14">
        <FadeIn y={40}>
          <h2
            className="hero-heading font-black uppercase leading-none tracking-tight"
            style={{ fontSize: 'clamp(3rem, 12vw, 160px)' }}
          >
            Let&apos;s talk
          </h2>
        </FadeIn>

        <FadeIn delay={0.15} className="flex flex-wrap justify-center gap-3 sm:gap-4">
          {links.map(({ icon: Icon, label, href }) => (
            <a
              key={href}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              className="flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-5 py-2.5 text-sm font-light text-[#D7E2EA] transition-colors duration-200 hover:bg-[#D7E2EA]/10 sm:text-base"
            >
              <Icon size={18} strokeWidth={1.5} />
              {label}
            </a>
          ))}
        </FadeIn>

        <FadeIn delay={0.3}>
          <ContactButton />
        </FadeIn>

        <div className="mt-10 flex w-full flex-col items-center justify-between gap-3 border-t border-[#D7E2EA]/15 pt-8 text-xs font-light uppercase tracking-wider text-[#D7E2EA]/50 sm:flex-row sm:text-sm">
          <span>© {new Date().getFullYear()} {profile.fullName}</span>
          <span className="flex items-center gap-1.5">
            <MapPin size={14} strokeWidth={1.5} />
            {profile.location}
          </span>
        </div>
      </div>
    </section>
  );
}
