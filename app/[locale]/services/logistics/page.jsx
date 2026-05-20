import ServicesHero from "../components/ServicesHero";
import SvcTagBar from "../components/SvcTagBar";
import SvcGrid from "../components/SvcGrid";
import SvcSplit from "../components/SvcSplit";
import ServicesCTA from "../components/ServicesCTA";
import { getPageData } from "@/services/home.service";

export default async function LogisticsPage({ params }) {
  const { locale } = await params;
  const sections = (await getPageData("logestics_services", locale)) || [];
  const find = (t) => sections.find((s) => s[t])?.[t];

  const hero      = find("hero");
  const bar       = find("bar");
  const solutions = find("solutions");
  const warehouse = find("warehouse");
  const fleet     = find("fleet");
  const cta       = find("cta");

  const barTags = bar ? Object.keys(bar)
    .filter((k) => k.startsWith("Element"))
    .sort((a, b) => parseInt(a.split(" ")[1]) - parseInt(b.split(" ")[1]))
    .map((k) => bar[k]?.value)
    .filter(Boolean) : [];

  const features = solutions ? [
    { title: solutions["Element 3"]?.value, desc: solutions["Element 4"]?.value },
    { title: solutions["Element 5"]?.value, desc: solutions["Element 6"]?.value },
    { title: solutions["Element 7"]?.value, desc: solutions["Element 8"]?.value },
    { title: solutions["Element 9"]?.value, desc: solutions["Element 10"]?.value },
  ].filter((f) => f.title) : [];

  const warehousePoints = warehouse ? [
    { text: warehouse["Text Element 3"]?.value },
    { text: warehouse["Text Element 4"]?.value },
    { text: warehouse["Text Element 5"]?.value },
    { text: warehouse["Text Element 6"]?.value },
  ].filter((p) => p.text) : [];

  const fleetItems = fleet ? [
    { title: fleet["Text Element 3"]?.value, desc: fleet["Text Element 4"]?.value },
    { title: fleet["Text Element 5"]?.value, desc: fleet["Text Element 6"]?.value },
    { title: fleet["Text Element 7"]?.value, desc: fleet["Text Element 8"]?.value },
    { title: fleet["Text Element 9"]?.value, desc: fleet["Text Element 10"]?.value },
  ].filter((f) => f.title) : [];

  return (
    <div className="min-h-screen" style={{ background: "#0f0f0f" }}>
      {hero && <ServicesHero data={hero} />}

      <SvcTagBar items={barTags} />

      <SvcGrid
        badge="LOGISTICS SOLUTIONS"
        title={solutions?.["Element 1"]?.value}
        subtitle={solutions?.["Element 2"]?.value}
        items={features}
        cols={2}
        dark={true}
      />

      <SvcSplit
        badge="WAREHOUSE OPERATIONS"
        title={warehouse?.["Text Element 1"]?.value}
        description={warehouse?.["Text Element 2"]?.value}
        items={warehousePoints}
        checkmarks={true}
        imageUrl={warehouse?.image_url || "/images/logistics/warehouse.webp"}
        imageLeft={true}
        dark={false}
      />

      <SvcGrid
        badge="FLEET MANAGEMENT"
        title={fleet?.["Text Element 1"]?.value}
        subtitle={fleet?.["Text Element 2"]?.value}
        items={fleetItems}
        cols={2}
        dark={true}
      />

      {cta && <ServicesCTA data={cta} />}
    </div>
  );
}
