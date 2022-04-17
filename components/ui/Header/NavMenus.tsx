import {
   CloseButton,
   CloseButtonWrapper,
   LanguageToggleButton,
   MenuItem,
   MenuItems,
   MenusStyled,
} from "./Menu.styled";
import { XIcon } from "@heroicons/react/solid";
import { FC, useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";

const NavMenu: FC<{ closeMenu: () => void }> = ({ closeMenu }) => {
   const elMenu = useRef<HTMLDivElement>(null!);
   const [languageTarget, setLanguageTarget] = useState<"ID" | "EN">("ID");
   const toggleHendler = () => {
      setLanguageTarget((prev) => {
         if (prev === "ID") return "EN";
         return "ID";
      });
   };

   const closeMenuHendler = () => {
      gsap.to(elMenu.current, {
         transform: "translateX(-100%)",
         opacity: 0,
         duration: 0.35,
         ease: "power4.in",
         onComplete: () => {
            closeMenu();
         },
      });
   };

   useLayoutEffect(() => {
      gsap.from(elMenu.current, {
         transform: "translateX(-100%)",
         opacity: 0,
         duration: 0.35,
         ease: "power4.out",
      });
   }, []);

   return (
      <MenusStyled ref={elMenu}>
         <CloseButtonWrapper>
            <CloseButton onClick={closeMenuHendler}>
               <XIcon />
            </CloseButton>
         </CloseButtonWrapper>
         <div
            style={{ flex: 1, flexDirection: "column", gap: "1em" }}
            className="flex-center"
         >
            <div className="flex-center">
               <LanguageToggleButton
                  className={languageTarget}
                  onClick={toggleHendler}
               >
                  <span>ID</span>
                  <span>EN</span>
               </LanguageToggleButton>
            </div>
            <MenuItems>
               <MenuItem>
                  <a href="#">YOUTUBE</a>
               </MenuItem>
               <MenuItem>
                  <a href="#">TWITTER</a>
               </MenuItem>
               <MenuItem>
                  <a href="#">INSTAGRAM</a>
               </MenuItem>
               <MenuItem>
                  <a href="#">TIKTOK</a>
               </MenuItem>
            </MenuItems>
         </div>
      </MenusStyled>
   );
};

export default NavMenu;
