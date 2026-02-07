import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger, SplitText } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger, SplitText, useGSAP);

const Hero = () => {
  const videoRef = useRef(null);
  const heroRef = useRef(null);

  const isMobile = useMediaQuery({ maxWidth: 767 });

  useGSAP(
    () => {
      // Scope selectors to this component only
      const heroSplit = new SplitText(".title", { type: "chars,words" });

      // If you want ONLY the paragraph subtitle, give it a unique class
      const paragraphSplit = new SplitText(".subtitle-paragraph", { type: "lines" });

      heroSplit.chars.forEach((char) => char.classList.add("text-gradient"));

      gsap.from(heroSplit.chars, {
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
      });

      gsap.from(paragraphSplit.lines, {
        opacity: 0,
        yPercent: 100,
        duration: 1.8,
        ease: "expo.out",
        stagger: 0.06,
        delay: 1,
      });

      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#hero",
            start: "top top",
            end: "bottom top",
            scrub: true,
          },
        })
        .to(".right-lemon", { y: 200 }, 0)
        .to(".left-leaf", { y: -200 }, 0);

        const startValue = isMobile ? "top 50%" : "center 60%";
	    const endValue = isMobile ? "120% top" : "bottom top";

        let tl = gsap.timeline({
	 scrollTrigger: {
		trigger: "video",
		start: startValue,
		end: endValue,
		scrub: true,
		pin: true,
	 },
	});
	
	videoRef.current.onloadedmetadata = () => {
	 tl.to(videoRef.current, {
		currentTime: videoRef.current.duration,
	 });
	};
 }, []);
 
        
	


  return (
    <div ref={heroRef} className="relative">
      <section id="hero" className="noisy relative">
        <h1 className="title">Tequila</h1>

        <img
          src="/images/hero-left-leaf.png"
          alt="left-leaf"
          className="left-leaf"
        />

        <img
          src="/images/hero-right-lemon.png"
          alt="right-lemon"
          className="right-lemon"
        />

        <div className="body">
          <div className="content">
            <div className="space-y-5 hidden md:block">
              <p>Cool. Crisp. Classic.</p>
              <p className="subtitle">
                Sip the Spirit <br /> of summer
              </p>
            </div>

            <div className="view-cocktails">
              <p className="subtitle-paragraph">
                Our drinks are crafted to match the Bolthole vibe — bold flavors,
                smooth blends, and refreshing mixes designed for every mood.
                Whether you’re unwinding after a long day or celebrating with
                friends, each glass is made to elevate the moment.
              </p>
              <a href="/cocktails">View Cocktails</a>
            </div>
          </div>
        </div>
      </section>

      {/* FIXED: inset-0 */}
      <div className="video absolute inset-0 pointer-events-none">
        <video
          ref={videoRef}
          src="/videos/output.mp4"
          muted
          playsInline
          preload="auto"
        />
      </div>
    </div>
  );
};

export default Hero;
