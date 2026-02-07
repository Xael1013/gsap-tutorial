import { useGSAP } from "@gsap/react";
import { navLinks } from "../constants";
import gsap from "gsap";

const Navbar = () => {
  useGSAP(() => {
    const navTween = gsap.timeline({
      scrollTrigger: {
        trigger: "nav",
        start: "bottom top",
      },
    });

    // fixed blur property + smooth glass effect
    navTween.fromTo(
      "nav",
      { backgroundColor: "transparent" },
      {
        backgroundColor: "#00000050",
        backdropFilter: "blur(10px)",
        duration: 1,
        ease: "power1.inOut",
      }
    );
  });

  return (
    <nav>
      <div>
        <a href="#hero" className="flex items-center gap-2">
          <img
            src="/images/bolthole.png"
            alt="logo"
            className="w-10 h-10 object-contain"
          />

          {/* Neon sign text */}
          <p
            style={{
              color: "#7dd3ff",
              fontWeight: "bold",
              letterSpacing: "1px",
              textShadow: `
                0 0 5px #7dd3ff,
                0 0 10px #38bdf8,
                0 0 20px #0ea5e9,
                0 0 40px #0284c7
              `,
              animation: "neonPulse 1.6s ease-in-out infinite alternate",
            }}
          >
            BOLTHOLE
          </p>
        </a>

        <ul>
          {navLinks.map((link) => (
            <li key={link.id}>
              <a href={`#${link.id}`}>{link.title}</a>
            </li>
          ))}
        </ul>
      </div>

      {/* Neon pulse animation */}
      <style>
        {`
          @keyframes neonPulse {
            from { opacity: 0.85; }
            to { opacity: 1; }
          }
        `}
      </style>
    </nav>
  );
};

export default Navbar;
