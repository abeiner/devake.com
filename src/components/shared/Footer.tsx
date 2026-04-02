import { SITE_CONFIG } from "@/lib/constants";

export default function Footer() {
  const { address, email, social, copyright } = SITE_CONFIG;

  return (
    <footer className="bg-[#0A0A0C] noise-overlay">
      <div className="max-w-6xl mx-auto px-4 xl:px-0">
        {/* Massive SVG Wordmark */}
        <div className="pt-[100px] pb-[64px] md:pt-[160px] md:pb-[100px]">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="250 274 340 56"
            className="w-full h-auto"
            aria-hidden="true"
          >
            <path
              fill="#FF3831"
              d="M306.72,300.83c0,13.49-11.05,23.47-22.25,23.47h-30.09v-46.09h30.7c10.82,0,21.64,9.52,21.64,22.63ZM291.02,300.76c0-5.49-4.5-10.21-10.21-10.21h-10.82v21.41h11.12c5.1,0,9.9-5.03,9.9-11.2Z"
            />
            <path
              fill="#FF3831"
              d="M328.43,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z"
            />
            <path
              fill="#FF3831"
              d="M359.66,278.21h17.68l9.45,33.75h.76l9.45-33.75h17.67l-15.39,46.09h-24.23l-15.39-46.09Z"
            />
            <path
              fill="#FF3831"
              d="M443.61,318.97h-16.61l-1.52,5.33h-17.52l15.39-46.09h23.92l15.39,46.09h-17.52l-1.52-5.33ZM440.18,306.62l-4.5-16.08h-.76l-4.49,16.08h9.75Z"
            />
            <path
              fill="#FF3831"
              d="M484.06,308.38l-2.59,2.89v13.03h-15.62v-46.09h15.62v14.32h.53l12.72-14.32h16.76l-17.37,19.12,18.51,26.97h-17.14l-10.82-15.92h-.61Z"
            />
            <path
              fill="#FF3831"
              d="M532.36,290.55v4.5h28.19v12.34h-28.19v4.57h28.19v12.34h-43.81v-46.09h43.81v12.34h-28.19Z"
            />
            <path
              fill="#FF3831"
              d="M568.16,310.21h17.83v14.09h-17.83v-14.09Z"
            />
          </svg>
        </div>

        {/* Three-Column Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 border-t border-white/10">
          {/* Column 1: Company Info */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 py-8 md:py-10 md:pr-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Company
            </h3>
            <a
              href={address.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono-text font-normal text-[13px] leading-relaxed text-text-primary/70 hover:text-accent transition-colors duration-300 block"
            >
              {address.company}
              <br />
              {address.street}
              <br />
              {address.city}, {address.country}
              <br />
              P.O. Box {address.poBox}
            </a>
          </div>

          {/* Column 2: Connect */}
          <div className="border-b md:border-b-0 md:border-r border-white/10 py-8 md:py-10 md:px-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Connect
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href={`mailto:${email}`}
                  className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                >
                  {email}
                </a>
              </li>
              <li>
                <a
                  href={social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href={social.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div className="py-8 md:py-10 md:pl-8">
            <h3 className="font-mono-text font-medium text-[12px] uppercase tracking-[1.5px] text-text-primary/50 mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <span className="font-mono-text font-normal text-[13px] text-text-primary/70 hover:text-accent transition-colors duration-300 cursor-pointer">
                  Privacy Policy
                </span>
              </li>
              <li>
                <span className="font-mono-text font-normal text-[13px] text-text-primary/50">
                  &copy; {copyright} {address.company}
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-text-primary/10 mt-0" />

        {/* Design Credit */}
        <div className="py-6">
          <a
            href="https://aleksandrabeiner.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-mono-text font-normal text-[11px] text-text-primary/30 hover:text-text-primary/50 transition-colors duration-300"
          >
            Design by aleksandrabeiner.com
          </a>
        </div>
      </div>
    </footer>
  );
}
