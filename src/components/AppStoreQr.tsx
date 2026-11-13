import { QRCodeSVG } from "qrcode.react";
import { APP_STORE_URL } from "@/lib/appStore";
import { cn } from "@/lib/utils";

const AppStoreQr = ({ className }: { className?: string }) => (
  <div className={cn("w-fit rounded-2xl border border-border bg-card p-4 text-card-foreground shadow-soft", className)}>
    <p className="mb-3 text-sm font-semibold">Scan to download</p>
    <QRCodeSVG
      value={APP_STORE_URL}
      size={132}
      bgColor="hsl(var(--card))"
      fgColor="hsl(var(--primary))"
      level="M"
      role="img"
      aria-label="QR code to download ElderConnect on the App Store"
    />
  </div>
);

export default AppStoreQr;
