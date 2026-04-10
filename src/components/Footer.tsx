import Link from "next/link";

const footerLinks = [
  { href: "/story", label: "STORY" },
  { href: "/member", label: "MEMBER" },
  { href: "/music", label: "MUSIC" },
  { href: "/movie", label: "MOVIE" },
  { href: "/gallery", label: "GALLERY" },
  { href: "/news", label: "NEWS" },
  { href: "/goods", label: "GOODS" },
  { href: "/about", label: "ABOUT" },
  { href: "/contact", label: "CONTACT" },
];

const socialLinks = [
  { href: "#", label: "YouTube" },
  { href: "#", label: "Spotify" },
  { href: "#", label: "X (Twitter)" },
  { href: "#", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-[#111111] border-t border-white/5">
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {/* Logo & Tagline */}
          <div>
            <Link href="/">
              <span className="font-heading text-2xl font-bold tracking-widest text-[var(--ht-ivory)]">
                HoneyTrap
              </span>
            </Link>
            <p className="mt-4 text-sm text-[var(--ht-ivory)]/40 leading-relaxed font-body">
              漫画のページから、ロックが鳴り出す。
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] text-[var(--ht-ivory)]/30 mb-4">
              NAVIGATION
            </h4>
            <div className="grid grid-cols-2 gap-2">
              {footerLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm text-[var(--ht-ivory)]/50 hover:text-[var(--ht-pink)] transition-colors font-body"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-heading text-xs tracking-[0.2em] text-[var(--ht-ivory)]/30 mb-4">
              FOLLOW
            </h4>
            <div className="flex flex-col gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-[var(--ht-ivory)]/50 hover:text-[var(--ht-teal)] transition-colors font-body"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--ht-ivory)]/20 font-heading tracking-wider">
            © 2026 HoneyTrap / chao! All Rights Reserved.
          </p>
          <p className="text-xs text-[var(--ht-ivory)]/20 font-body">
            Original Work: 「ロックが鳴る！」(Jump Rookie!)
          </p>
        </div>
      </div>
    </footer>
  );
}
