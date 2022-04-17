import { gsap } from "gsap";
import { RefObject } from "react";

const useAnimatePageIlustration = () => {
   const enterAnimation = (pageWrapperEl: RefObject<HTMLDivElement>) => {
      const el = gsap.utils.selector(pageWrapperEl);
      gsap.from(el(".ilustration"), {
         y: -100,
         opacity: 0,
         duration: 1.2,
         ease: "power2.out",
      });
      gsap.from(el(".ilustration-desc"), {
         y: -80,
         opacity: 0,
         duration: 1.2,
         ease: "power2.out",
      });
   };

   const leaveAnimation = (
      pageWrapperEl: RefObject<HTMLDivElement>,
      onComplete: () => void
   ) => {
      const el = gsap.utils.selector(pageWrapperEl);
      gsap.to(el(".ilustration"), {
         y: 100,
         opacity: 0,
         duration: 1.2,
         ease: "power2.out",
      });
      gsap.to(el(".ilustration-desc"), {
         y: 120,
         opacity: 0,
         duration: 1.2,
         ease: "power2.out",
         onComplete: () => {
            onComplete();
         },
      });
   };

   return {
      enterAnimation,
      leaveAnimation,
   };
};

export default useAnimatePageIlustration;
