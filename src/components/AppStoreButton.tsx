import type { MouseEventHandler } from "react";
import { Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import { APP_STORE_URL } from "@/lib/appStore";
import { cn } from "@/lib/utils";

type AppStoreButtonProps = {
  label?: string;
  light?: boolean;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
};

const AppStoreButton = ({ label = "Download on the App Store", light = false, className, onClick }: AppStoreButtonProps) => (
  <Button asChild variant={light ? "waitlist" : "default"} className={cn(light && "focus-visible:ring-primary-foreground focus-visible:ring-offset-primary", className)}>
    <a href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" onClick={onClick}>
      <Download aria-hidden="true" />
      <span>{label}</span>
    </a>
  </Button>
);

export default AppStoreButton;
