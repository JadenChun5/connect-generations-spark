import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { useLocation } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

type PublicPageProps = {
  title: string;
  description: string;
  heading: string;
  intro: string;
  children: ReactNode;
};

const PublicPage = ({ title, description, heading, intro, children }: PublicPageProps) => {
  const { pathname } = useLocation();
  const url = `https://elderconnect.org${pathname}`;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <Helmet>
        <title>{title} | ElderConnect</title>
        <meta name="description" content={description} />
        <link rel="canonical" href={url} />
        <meta property="og:title" content={`${title} | ElderConnect`} />
        <meta property="og:description" content={description} />
        <meta property="og:url" content={url} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={`${title} | ElderConnect`} />
        <meta name="twitter:description" content={description} />
      </Helmet>
      <Header />
      <main className="site-container flex-1 py-12 md:py-20">
        <div className="mx-auto max-w-[960px]">
          <h1 className="max-w-[850px] text-[36px] leading-tight sm:text-5xl lg:text-[56px]">{heading}</h1>
          <p className="mt-6 max-w-[760px] text-lg text-muted-foreground">{intro}</p>
          <div className="mt-10 space-y-10 md:mt-12 md:space-y-12">{children}</div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default PublicPage;