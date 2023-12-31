import { FC, useState, useEffect } from "react";
import { WebHeaderProps } from ".";
import { NavLink, useNavigate } from "react-router-dom";
import "./WebHeader.css";
import webSlice, { setLogoutUser } from "@/store/slice/web-slice";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { KioskState } from "@/store/slice/kiosk-slice";
import { WebState } from "@/store/slice/web-slice";
import { useDispatch } from "react-redux";
import { webAPI } from "@/store/api/api";
import { useLocation } from "react-router-dom";


export const WebHeader: FC<WebHeaderProps> = (props) => {
  const location = useLocation();
  const navigation = useNavigate();
  const dispatch = useDispatch();
  const webData = useSelector((state: { kiosk: KioskState; web: WebState }) => {
    return state.web;
  });




  

  const [isUserIn, setIsUserIn] = useState(webData.isUserIn);
  useEffect(() => {
    setIsUserIn(webData.isUserIn);
    console.log(location.pathname)
  }, [webData.isUserIn]);
  return (
    <div {...props}>
      <div className="web-header">
        <div className="web-header-logo">
          <img
            src="/TAB_logo.png?url"
            alt="TAB_logo"
            className="web-header-logo"
            onClick={() => navigation("/")}
          />
        </div>
        <div className="header-links" id="navitems">
          <NavLinkForm dest="/" word="홈" />
          <NavLinkForm dest="/board" word="게시판" />
          <NavLinkForm dest="/recommend/" word="관광/맛집" />
          {webData.loginData.role=="MANAGER" ? <NavLinkForm dest="/surveyMaster" word="수요조사 결과" /> : <NavLinkForm dest="/survey" word="수요조사" />}
          
          
        </div>
        <div className="header-btns" id="navitems">
          {!isUserIn ? (
            <div>
              <NavLinkForm dest="/login/" word="로그인" />
            </div>
          ) : (
            <div
            
              onClick={() => {
                webAPI
                  .delete(`/user/logout`, {
                    headers: {
                      Authorization: webData.Token,
                    },
                  })
                  .then((response) => {
                    console.log(response.data);
                  });
                dispatch(setLogoutUser());
                alert("로그아웃 되셨습니다.");
                navigation("/");
              }}
            >
              <p style={{fontSize:"21px",fontWeight:"bold",cursor:"pointer"}}>로그아웃</p>
            </div>
          )}
        </div>
      
      </div>
      
      <div className={location.pathname == '/' || location.pathname == '/login/' || location.pathname == '/signup/' ? '' : "backmainimg"}>
      </div>
    
    </div>
  );
};

export function NavLinkForm(props) {
  return (
    <NavLink
      to={props.dest}
      style={({ isActive, isPending }) => {
        return {
          fontSize: "21px",
          fontWeight: isActive ? "bold" : "",
          color: isActive ? "#016FF2" : "black",
        };
      }}
    >
      {props.word}
    </NavLink>
  );
}
