import { Helmet } from "react-helmet-async";

export const SITE_TITLE = "ElderConnect | Supervised group volunteering";
export const SITE_DESCRIPTION = "A student-led South Bay pilot for students 13 and older to join staff-led group activities at senior centers. Join the ElderConnect waitlist.";
export const SHARE_IMAGE = "https://elderconnect.org/__l5e/assets-v1/4265fb2d-39dd-45bf-a138-28d09fb49d07/hero-social.jpg";

type Props = { title: string; description: string; url: string; noindex?: boolean };

const PageMetadata = ({ title, description, url, noindex = false }: Props) => (
  <Helmet>
    <title>{title}</title>
    <meta name="description" content={description} />
    <link rel="canonical" href={url} />
    {noindex && <meta name="robots" content="noindex, follow" />}
    <meta property="og:title" content={title} />
    <meta property="og:description" content={description} />
    <meta property="og:url" content={url} />
    <meta property="og:type" content="website" />
    <meta property="og:image" content={SHARE_IMAGE} />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="Three seniors playing cards at a table in a sunny park." />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content={title} />
    <meta name="twitter:description" content={description} />
    <meta name="twitter:url" content={url} />
    <meta name="twitter:image" content={SHARE_IMAGE} />
    <meta name="twitter:image:alt" content="Three seniors playing cards at a table in a sunny park." />
  </Helmet>
);

export default PageMetadata;
