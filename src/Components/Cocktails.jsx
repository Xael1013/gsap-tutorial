import React, { useRef } from "react";
import { cocktailLists, mockTailLists } from "../constants";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Cocktails = () => {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: sectionRef.current, // #cocktails
            start: "top 80%",
            end: "bottom top", // ✅ scrubs until the bottom leaves the top
            scrub: true,
            // markers: true, // turn ON if you want to debug
          },
        })
        .fromTo(
          "#c-left-leaf",
          { x: -120, y: 120 },
          { x: 0, y: 0, ease: "none" }
        )
        .fromTo(
          "#c-right-leaf",
          { x: 120, y: 120 },
          { x: 0, y: 0, ease: "none" },
          0
        );
    },
    { scope: sectionRef }
  );

  return (
    <section ref={sectionRef} id="cocktails" className="noisy">
      <img src="/images/cocktail-left-leaf.png" alt="l-leaf" id="c-left-leaf" />
      <img src="/images/cocktail-right-leaf.png" alt="r-leaf" id="c-right-leaf" />

      <div className="list">
        <div className="popular">
          <h2>Most popular drinks:</h2>
          <ul>
            {cocktailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="md:me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>-{price}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="loved">
          <h2>Our VIP Bottles:</h2>
          <ul>
            {mockTailLists.map(({ name, country, detail, price }) => (
              <li key={name}>
                <div className="me-28">
                  <h3>{name}</h3>
                  <p>
                    {country} | {detail}
                  </p>
                </div>
                <span>-{price}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Cocktails;
