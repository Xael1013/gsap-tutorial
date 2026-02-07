import React from "react";
import gsap from "gsap";
import { SplitText, ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, SplitText);

const About = () => {
  useGSAP(() => {
    // === Existing scroll animations ===
    const titleSplit = SplitText.create("#about h2", { type: "words" });

    const scrollTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: "#about",
        start: "top center",
      },
    });

    scrollTimeline
      .from(titleSplit.words, {
        opacity: 0,
        yPercent: 100,
        duration: 1,
        ease: "expo.out",
        stagger: 0.02,
      })
      .from(
        ".top-grid div, .bottom-grid div",
        {
          opacity: 0,
          duration: 1,
          ease: "power1.inOut",
          stagger: 0.04,
        },
        "-=0.5"
      );

    // === UNIQUE hover/touch/click animations for photos ===
    const cards = gsap.utils.toArray("#about .top-grid > div, #about .bottom-grid > div");

    const cleanupFns = [];

    cards.forEach((card) => {
      const img = card.querySelector("img");
      const noisy = card.querySelector(".noisy");
      if (!img) return;

      // initial subtle styling
      gsap.set(card, { transformPerspective: 1000, transformStyle: "preserve-3d" });
      gsap.set(img, { transformOrigin: "50% 50%", scale: 1, rotateZ: 0 });

      // quick "tilt follow" on hover (desktop)
      const onMove = (e) => {
        const r = card.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width; // 0..1
        const y = (e.clientY - r.top) / r.height; // 0..1
        const rotY = (x - 0.5) * 14; // -7..7
        const rotX = -(y - 0.5) * 14; // -7..7

        gsap.to(img, {
          rotateX: rotX,
          rotateY: rotY,
          scale: 1.04,
          duration: 0.25,
          ease: "power2.out",
        });

        if (noisy) {
          gsap.to(noisy, { opacity: 0.22, duration: 0.25, ease: "power2.out" });
        }
      };

      const onEnter = () => {
        // "glow pop" + slight lift
        gsap.to(card, { y: -4, duration: 0.25, ease: "power2.out" });
        gsap.to(img, {
          filter: "saturate(1.15) contrast(1.08)",
          duration: 0.25,
          ease: "power2.out",
        });
      };

      const onLeave = () => {
        gsap.to(card, { y: 0, duration: 0.3, ease: "power2.out" });
        gsap.to(img, {
          rotateX: 0,
          rotateY: 0,
          scale: 1,
          filter: "saturate(1) contrast(1)",
          duration: 0.35,
          ease: "power3.out",
        });
        if (noisy) {
          gsap.to(noisy, { opacity: 0, duration: 0.25, ease: "power2.out" });
        }
      };

      // click / tap = "bounce + flash reveal"
      const onClick = () => {
        gsap.timeline()
          .to(img, { scale: 0.98, duration: 0.08, ease: "power2.out" })
          .to(img, { scale: 1.06, duration: 0.22, ease: "back.out(3)" })
          .to(img, { scale: 1.02, duration: 0.18, ease: "power2.out" })
          .to(img, { scale: 1.04, duration: 0.18, ease: "power2.out" });

        if (noisy) {
          gsap.timeline()
            .to(noisy, { opacity: 0.35, duration: 0.12, ease: "power2.out" })
            .to(noisy, { opacity: 0.12, duration: 0.25, ease: "power2.out" })
            .to(noisy, { opacity: 0, duration: 0.25, ease: "power2.out" });
        }
      };

      // touch (mobile): press + release
      const onTouchStart = () => {
        gsap.to(img, { scale: 0.985, duration: 0.12, ease: "power2.out" });
        if (noisy) gsap.to(noisy, { opacity: 0.18, duration: 0.12, ease: "power2.out" });
      };

      const onTouchEnd = () => {
        gsap.to(img, { scale: 1.04, duration: 0.25, ease: "back.out(2.2)" });
        if (noisy) gsap.to(noisy, { opacity: 0, duration: 0.25, ease: "power2.out" });
      };

      // attach listeners
      card.addEventListener("mouseenter", onEnter);
      card.addEventListener("mousemove", onMove);
      card.addEventListener("mouseleave", onLeave);
      card.addEventListener("click", onClick);

      card.addEventListener("touchstart", onTouchStart, { passive: true });
      card.addEventListener("touchend", onTouchEnd, { passive: true });

      // cleanup for React unmount
      cleanupFns.push(() => {
        card.removeEventListener("mouseenter", onEnter);
        card.removeEventListener("mousemove", onMove);
        card.removeEventListener("mouseleave", onLeave);
        card.removeEventListener("click", onClick);
        card.removeEventListener("touchstart", onTouchStart);
        card.removeEventListener("touchend", onTouchEnd);
      });
    });

    return () => cleanupFns.forEach((fn) => fn());
  });

  return (
    <div id="about">
      <div className="mb-16 md:px-0 px-5">
        <div className="content">
          <div className="md:col-span-8">
            <p className="badge">Best Bar</p>
            <h2>
              Where Every Moment is a Memory{" "}
              <span className="text-white">- </span>
              from Our Story to Your Experience
            </h2>
          </div>

          <div className="sub-content">
            <p>
              Every customer we served is a part of our story, and we are grateful
              for the opportunity to create memorable moments together. We look
              forward to welcoming you to Bolthole, where every visit is a
              celebration of great drinks, good company, and unforgettable
              memories.
            </p>
            <div>
              <p className="md:text-3xl text-xl font-bold">
                <span>4.5</span>/5
              </p>
              <p className="text-sm text-white-100">Based on 1,000+ Customer</p>
            </div>
          </div>
        </div>
      </div>

      <div className="top-grid">
        <div className="md:col-span-3">
          <div />
          <img src="/images/abt1.jpg" alt="grid-img-1" />
        </div>

        <div className="md:col-span-6">
          <div />
          <img src="/images/abt2.jpg" alt="grid-img-2" />
        </div>

        <div className="md:col-span-3">
          <div  />
          <img src="/images/abt5.jpg" alt="grid-img-5" />
        </div>
      </div>

      <div className="bottom-grid">
        <div className="md:col-span-8">
          <div  />
          <img src="/images/abt3.jpg" alt="grid-img-3" />
        </div>

        <div className="md:col-span-4">
          <div  />
          <img src="/images/abt4.jpg" alt="grid-img-4" />
        </div>
      </div>
    </div>
  );
};

export default About;
