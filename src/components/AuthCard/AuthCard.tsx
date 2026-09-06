import jokerGoldLogoV3Src from "../../../assets/JokerGoldLogoV3.mp4";
import { useEffect, useRef } from "react";
import { setupSeamlessVideoLoop } from "../../utils/seamlessVideoLoop.js";
import { Button } from "../Button/Button";
import { Input } from "../Input/Input";
import "./AuthCard.css";
import type { AuthCardProps } from "./AuthCard.types";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function AuthCard({
  title = "Showroom login",
  description = "Use your email or username and password to continue into the showroom.",
  logoVideoSrc = jokerGoldLogoV3Src,
  usernameLabel = "Username",
  passwordLabel = "Password",
  usernamePlaceholder = "enter username",
  passwordPlaceholder = "enter password",
  signInLabel = "Sign In",
  usernameInputProps,
  passwordInputProps,
  className,
  ...props
}: AuthCardProps) {
  const logoHeadRef = useRef<HTMLDivElement>(null);
  const logoVideoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const video = logoVideoRef.current;
    const container = logoHeadRef.current;
    if (!video || !container) return;

    const loop = setupSeamlessVideoLoop(video, {
      container,
      readyKey: "authCardLogoLoopReady",
      activeClass: "joker-auth-card-logo-video--active",
      standbyClass: "joker-auth-card-logo-video--standby",
    });

    return () => loop.destroy();
  }, [logoVideoSrc]);

  return (
    <form {...props} className={cx("joker-auth-card", className)} noValidate>
      <div className="joker-auth-card-intro">
        <div className="joker-auth-card-home-head" ref={logoHeadRef}>
          <video
            ref={logoVideoRef}
            className="joker-auth-card-logo-video joker-auth-card-logo-video--active"
            src={logoVideoSrc}
            autoPlay
            muted
            playsInline
            preload="auto"
            aria-hidden="true"
          />
        </div>
        <div className="joker-auth-card-copy">
          <h2 className="joker-auth-card-title">{title}</h2>
          <p className="joker-auth-card-description">{description}</p>
        </div>
      </div>
      <div className="joker-auth-card-fields">
        <Input
          label={usernameLabel}
          placeholder={usernamePlaceholder}
          autoComplete="username"
          fullWidth
          {...usernameInputProps}
        />
        <Input
          label={passwordLabel}
          type="password"
          placeholder={passwordPlaceholder}
          autoComplete="current-password"
          fullWidth
          {...passwordInputProps}
        />
      </div>
      <Button type="submit" variant="primary" className="joker-auth-card-submit" label={signInLabel} fullWidth />
    </form>
  );
}
