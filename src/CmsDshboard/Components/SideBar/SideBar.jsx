import React, { useState } from "react";
import "./SideBar.css";
import { Link } from "react-router-dom";
import FoundationIcon from "@mui/icons-material/Foundation";
import QrCodeScannerIcon from "@mui/icons-material/QrCodeScanner";
import CommentIcon from "@mui/icons-material/Comment";
import GroupIcon from "@mui/icons-material/Group";
import StorefrontIcon from "@mui/icons-material/Storefront";
import DiscountIcon from "@mui/icons-material/Discount";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from '@mui/icons-material/Close';

export default function SideBar() {
  const [clickMenu, setClickMenu] = useState(false);
  const [displayIconMenu, setdisplayIconMenu] = useState(true);
  
  const showMenuHandler = () => {
    setClickMenu((prev) => true);

  };
  return (
    <>
        <div className={clickMenu ? 'SideBarSmallMenu' : 'sidebarBigStyle'}>
          <p className="welcome">به داشبورد خوش آمدید</p>
          <hr />
          <Link to={"/"} className="LinkStyle">
            <FoundationIcon /> صفحه اصلی
          </Link>
          <Link to={"/products"} className="LinkStyle">
            <QrCodeScannerIcon /> مجصولات
          </Link>
          <Link to={"/comments"} className="LinkStyle">
            <CommentIcon /> کامنت ها{" "}
          </Link>
          <Link to={"/users"} className="LinkStyle">
            <GroupIcon /> کاربران
          </Link>
          <Link to={"/orders"} className="LinkStyle">
            <StorefrontIcon /> سفارشات
          </Link>
          <Link to={"/discount"} className="LinkStyle">
            <DiscountIcon /> تخفیفات{" "}
          </Link>
        </div>
  

      <div className='menu'>
        <MenuIcon className="hamberger" style={clickMenu ? {display:'none'} : {display:'block'}} onClick={() => showMenuHandler()} />
        {clickMenu && <CloseIcon className="closeButton" onClick={() => setClickMenu(false)}/>}
      </div>
    </>
  );
}
