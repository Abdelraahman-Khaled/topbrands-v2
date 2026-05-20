import ServicesHero from "../components/ServicesHero";
import SvcStats from "../components/SvcStats";
import SvcGrid from "../components/SvcGrid";
import SvcSplit from "../components/SvcSplit";
import ServicesCTA from "../components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function MarketingPage({ params }) {
  const { locale } = await params;
  const sections = (await getPageData("marketing_services", locale)) || [];
  const find = (t) => sections.find((s) => s[t])?.[t];

  const hero          = find("hero");
  const statsData     = find("stats");
  const servicesData  = find("services");
  const whyMarketing  = find("why-marketing");
  const approach      = find("approach");
  const cta           = find("cta");

  const stats = statsData ? [
    { value: statsData["Element 1"]?.value, label: statsData["Element 2"]?.value },
    { value: statsData["Element 3"]?.value, label: statsData["Element 4"]?.value },
    { value: statsData["Element 5"]?.value, label: statsData["Element 6"]?.value },
    { value: statsData["Element 7"]?.value, label: statsData["Element 8"]?.value },
  ].filter((s) => s.value) : [];

  const serviceCards = servicesData ? [
    { title: servicesData["Element 3"]?.value,  desc: servicesData["Element 4"]?.value },
    { title: servicesData["Element 5"]?.value,  desc: servicesData["Element 6"]?.value },
    { title: servicesData["Element 7"]?.value,  desc: servicesData["Element 8"]?.value },
    { title: servicesData["Element 9"]?.value,  desc: servicesData["Element 10"]?.value },
    { title: servicesData["Element 11"]?.value, desc: servicesData["Element 12"]?.value },
    { title: servicesData["Element 13"]?.value, desc: servicesData["Element 14"]?.value },
  ].filter((s) => s.title) : [];

  const capabilities = whyMarketing ? [
    { title: whyMarketing["Element 3"]?.value, desc: whyMarketing["Element 4"]?.value },
    { title: whyMarketing["Element 5"]?.value, desc: whyMarketing["Element 6"]?.value },
    { title: whyMarketing["Element 7"]?.value, desc: whyMarketing["Element 8"]?.value },
    { title: whyMarketing["Element 9"]?.value, desc: whyMarketing["Element 10"]?.value },
  ].filter((c) => c.title) : [];

  const steps = approach ? [
    { title: approach["Element 3"]?.value, desc: approach["Element 4"]?.value },
    { title: approach["Element 5"]?.value, desc: approach["Element 6"]?.value },
    { title: approach["Element 7"]?.value, desc: approach["Element 8"]?.value },
    { title: approach["Element 9"]?.value, desc: approach["Element 10"]?.value },
  ].filter((s) => s.title) : [];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {hero && <ServicesHero data={hero} />}

      <SvcStats items={stats} />

      <SvcGrid
        badge="MARKETING SERVICES"
        title={servicesData?.["Element 1"]?.value}
        subtitle={servicesData?.["Element 2"]?.value}
        items={serviceCards}
        cols={3}
        dark={true}
      />

      <SvcSplit
        badge="WHY CHOOSE US"
        title={whyMarketing?.["Element 1"]?.value}
        description={whyMarketing?.["Element 2"]?.value}
        items={capabilities}
        imageUrl={whyMarketing?.image_url || "/images/markting/marketing solutions.webp"}
        imageLeft={false}
        dark={false}
      />

      <SvcGrid
        badge="OUR APPROACH"
        title={approach?.["Element 1"]?.value}
        subtitle={approach?.["Element 2"]?.value}
        items={steps}
        cols={4}
        dark={true}
      />

      {cta && <ServicesCTA data={cta} />}
    </div>
  );
}
