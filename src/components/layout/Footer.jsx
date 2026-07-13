import siteData from '@/data/site.json'
import contactData from '@/data/contact.json'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-[#030812] border-t border-[rgba(59,130,246,0.04)]">
      <div className="page-container py-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
          {/* Left - Logo + Copyright */}
          <div className="flex items-center gap-3 opacity-60">
            <img src="/images/logo.svg" alt={siteData.companyName} className="h-7 w-auto" />
          </div>

          {/* Center - Quick Links */}
          <div className="flex items-center gap-8">
            {contactData.quickLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault()
                  document.getElementById(link.href.replace('#', ''))?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="text-sm text-slate-500 hover:text-brand-300 transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right */}
          <p className="text-sm text-slate-600">
            &copy; {currentYear} {siteData.companyNameEn}. {siteData.description}
          </p>
        </div>
      </div>
    </footer>
  )
}
