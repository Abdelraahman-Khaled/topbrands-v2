import ServicesHero from "../components/ServicesHero";
import SvcTagBar from "../components/SvcTagBar";
import SvcGrid from "../components/SvcGrid";
import SvcSplit from "../components/SvcSplit";
import ServicesCTA from "../components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function SalesMerchandisingPage({ params }) {
  const { locale } = await params;
  const sections = (await getPageData("merchandising_services", locale)) || [];
  const find = (t) => sections.find((s) => s[t])?.[t];

  const hero       = find("hero");
  const bar        = find("bar");
  const list       = find("list");
  const expertTeam = find("expert-team");
  const results    = find("results");
  const cta        = find("cta");

  const barPills = bar ? Object.keys(bar)
    .filter((k) => k.startsWith("Element"))
    .sort((a, b) => parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]))
    .map((k) => bar[k]?.value)
    .filter(Boolean) : [];

  const merchItems = list ? [
    { title: list["Element 3"]?.value, desc: list["Element 4"]?.value },
    { title: list["Element 5"]?.value, desc: list["Element 6"]?.value },
    { title: list["Element 7"]?.value, desc: list["Element 8"]?.value },
    { title: list["Element 9"]?.value, desc: list["Element 10"]?.value },
  ].filter((i) => i.title) : [];

  const expertFeatures = expertTeam ? [
    { title: expertTeam["Text Element 3"]?.value, desc: expertTeam["Text Element 4"]?.value },
    { title: expertTeam["Text Element 5"]?.value, desc: expertTeam["Text Element 6"]?.value },
    { title: expertTeam["Text Element 7"]?.value, desc: expertTeam["Text Element 8"]?.value },
  ].filter((f) => f.title) : [];

  const stats = results ? [
    { value: results["Text Element 3"]?.value, label: results["Text Element 4"]?.value },
    { value: results["Text Element 5"]?.value, label: results["Text Element 6"]?.value },
    { value: results["Text Element 7"]?.value, label: results["Text Element 8"]?.value },
    { value: results["Text Element 9"]?.value, label: results["Text Element 10"]?.value },
  ].filter((s) => s.value) : [];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {hero && <ServicesHero data={hero} />}

      <SvcTagBar items={barPills} />

      <SvcGrid
        badge="MERCHANDISING SERVICES"
        title={list?.["Element 1"]?.value}
        subtitle={list?.["Element 2"]?.value}
        items={merchItems}
        cols={2}
        dark={false}
      />

      <SvcSplit
        badge="EXPERT SALES TEAM"
        title={expertTeam?.["Text Element 1"]?.value}
        description={expertTeam?.["Text Element 2"]?.value}
        items={expertFeatures}
        imageUrl={expertTeam?.image_url || "/images/professional-sales/sales team.webp"}
        imageLeft={false}
        dark={true}
      />

      <SvcSplit
        badge="PROVEN RESULTS"
        title={results?.["Text Element 1"]?.value}
        description={results?.["Text Element 2"]?.value}
        items={[]}
        stats={stats}
        imageUrl={results?.image_url || "/images/professional-sales/results.webp"}
        imageLeft={true}
        dark={false}
      />

      {cta && <ServicesCTA data={cta} />}
    </div>
  );
}
