import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import jokerGoldLogoV3Src from "../../../assets/JokerGoldLogoV3.mp4";
import { useEffect, useRef } from "react";
import { setupSeamlessVideoLoop } from "../../utils/seamlessVideoLoop.js";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./AuthCard.css";
function cx(...classes) {
    return classes.filter(Boolean).join(" ");
}
export function AuthCard({ title = "Showroom login", description = "Use your email or username and password to continue into the showroom.", logoVideoSrc = jokerGoldLogoV3Src, usernameLabel = "Username", passwordLabel = "Password", usernamePlaceholder = "enter username", passwordPlaceholder = "enter password", signInLabel = "Sign In", usernameInputProps, passwordInputProps, className, ...props }) {
    const logoHeadRef = useRef(null);
    const logoVideoRef = useRef(null);
    useEffect(() => {
        const video = logoVideoRef.current;
        const container = logoHeadRef.current;
        if (!video || !container)
            return;
        const loop = setupSeamlessVideoLoop(video, {
            container,
            readyKey: "authCardLogoLoopReady",
            activeClass: "joker-auth-card-logo-video--active",
            standbyClass: "joker-auth-card-logo-video--standby",
        });
        return () => loop.destroy();
    }, [logoVideoSrc]);
    return (_jsxs("form", { ...props, className: cx("joker-auth-card", className), noValidate: true, children: [_jsxs("div", { className: "joker-auth-card-intro", children: [_jsx("div", { className: "joker-auth-card-home-head", ref: logoHeadRef, children: _jsx("video", { ref: logoVideoRef, className: "joker-auth-card-logo-video joker-auth-card-logo-video--active", src: logoVideoSrc, autoPlay: true, muted: true, playsInline: true, preload: "auto", "aria-hidden": "true" }) }), _jsxs("div", { className: "joker-auth-card-copy", children: [_jsx("h2", { className: "joker-auth-card-title", children: title }), _jsx("p", { className: "joker-auth-card-description", children: description })] })] }), _jsxs("div", { className: "joker-auth-card-fields", children: [_jsx(Input, { label: usernameLabel, placeholder: usernamePlaceholder, autoComplete: "username", fullWidth: true, ...usernameInputProps }), _jsx(Input, { label: passwordLabel, type: "password", placeholder: passwordPlaceholder, autoComplete: "current-password", fullWidth: true, ...passwordInputProps })] }), _jsx(Button, { type: "submit", variant: "primary", className: "joker-auth-card-submit", label: signInLabel, fullWidth: true })] }));
}
