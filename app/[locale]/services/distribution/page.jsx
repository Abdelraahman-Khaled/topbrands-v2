import ServicesHero from "../components/ServicesHero";
import SvcStats from "../components/SvcStats";
import SvcGrid from "../components/SvcGrid";
import SvcSplit from "../components/SvcSplit";
import ServicesCTA from "../components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function DistributionPage({ params }) {
  const { locale } = await params;
  const sections = (await getPageData("distribution_services", locale)) || [];
  const find = (t) => sections.find((s) => s[t])?.[t];

  const hero      = find("hero");
  const statsData = find("stats");
  const channels  = find("channels");
  const howWeDist = find("how-we-dist");
  const cta       = find("cta");

  const stats = statsData ? [
    { value: statsData["Element 1"]?.value, label: statsData["Element 2"]?.value },
    { value: statsData["Element 3"]?.value, label: statsData["Element 4"]?.value },
    { value: statsData["Element 5"]?.value, label: statsData["Element 6"]?.value },
    { value: statsData["Element 7"]?.value, label: statsData["Element 8"]?.value },
  ].filter((s) => s.value) : [];

  const features = channels ? [
    { title: channels["Element 3"]?.value, desc: channels["Element 4"]?.value },
    { title: channels["Element 5"]?.value, desc: channels["Element 6"]?.value },
    { title: channels["Element 7"]?.value, desc: channels["Element 8"]?.value },
    { title: channels["Element 9"]?.value, desc: channels["Element 10"]?.value },
  ].filter((f) => f.title) : [];

  const steps = howWeDist ? [
    { title: howWeDist["Text Element 3"]?.value, desc: howWeDist["Text Element 4"]?.value },
    { title: howWeDist["Text Element 5"]?.value, desc: howWeDist["Text Element 6"]?.value },
    { title: howWeDist["Text Element 7"]?.value, desc: howWeDist["Text Element 8"]?.value },
    { title: howWeDist["Text Element 9"]?.value, desc: howWeDist["Text Element 10"]?.value },
  ].filter((s) => s.title) : [];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {hero && <ServicesHero data={hero} />}

      <SvcStats items={stats} />

      <SvcGrid
        badge="DISTRIBUTION CHANNELS"
        title={channels?.["Element 1"]?.value}
        subtitle={channels?.["Element 2"]?.value}
        items={features}
        cols={2}
        dark={true}
      />

      <SvcSplit
        badge="HOW WE DISTRIBUTE"
        title={howWeDist?.["Text Element 1"]?.value}
        description={howWeDist?.["Text Element 2"]?.value}
        items={steps}
        imageUrl={howWeDist?.image_url || "/images/national-distribution/distribute.webp"}
        imageLeft={false}
        dark={false}
      />

      {cta && <ServicesCTA data={cta} />}
    </div>
  );
}
