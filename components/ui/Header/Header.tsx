import {
   DotsIconWrapper,
   HeaderStyled,
   LogoWrapper,
   VidioUrlWrapper,
} from "./Header.styled";
import { DotsVerticalIcon } from "@heroicons/react/solid";
import VidioURL from "../../VidioUrl/VidioURL";
import NavMenu from "./NavMenus";
import { useState } from "react";

const Header = () => {
   const [showMenu, setShowMenu] = useState(false);
   const openMenuHendler = () => {
      setShowMenu(true);
   };
   const closeMenuHendler = () => {
      setShowMenu(false);
   };
   return (
      <HeaderStyled>
         <LogoWrapper className="flex-center">
            <a href="#">MAUSCOM</a>
         </LogoWrapper>
         <DotsIconWrapper className="flex-center" onClick={openMenuHendler}>
            <DotsVerticalIcon style={{ height: "20px" }} />
         </DotsIconWrapper>
         {showMenu && <NavMenu closeMenu={closeMenuHendler} />}
         <VidioUrlWrapper className="flex-center">
            <VidioURL />
         </VidioUrlWrapper>
      </HeaderStyled>
   );
};

export default Header;
