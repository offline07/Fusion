import type { Metadata } from "next";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  ChipLoadCalculator,
  CuspHeightCalculator,
  DogboneCalculator,
} from "@/components/calculators";

export const metadata: Metadata = {
  title: "Reference",
  description:
    "Cheat sheets and calculators for Fusion 360 CNC woodworking and 3D printing: hotkeys, feeds and speeds, FDM design rules, tolerances, and toolpath picks.",
};

const HOTKEYS: [string, string][] = [
  ["S", "Tool search (find any command)"],
  ["L", "Line"],
  ["R", "Rectangle (two-point; use the palette for Center Rectangle)"],
  ["C", "Circle"],
  ["D", "Sketch dimension"],
  ["O", "Offset"],
  ["P", "Project"],
  ["X", "Toggle construction geometry"],
  ["E", "Extrude"],
  ["F", "Fillet"],
  ["Q", "Press/Pull"],
  ["H", "Hole"],
  ["M", "Move / Copy"],
  ["J", "Joint"],
  ["I", "Measure"],
  ["Shift + middle drag", "Orbit"],
  ["Middle drag", "Pan"],
  ["Scroll", "Zoom"],
  ["Double-click middle", "Fit to view"],
  ["Ctrl/Cmd + Z", "Undo"],
  ["Ctrl/Cmd + S", "Save"],
];

const FEEDS: {
  tool: string;
  material: string;
  rpm: string;
  feed: string;
  plunge: string;
  stepdown: string;
  note: string;
}[] = [
  {
    tool: '1/4" 2-flute flat (down/up cut)',
    material: "Hardwood (maple, walnut, oak)",
    rpm: "18,000",
    feed: "1,800 mm/min (72 ipm)",
    plunge: "900",
    stepdown: "3 mm",
    note: "Downcut for through-cuts where the top face shows",
  },
  {
    tool: '1/4" 2-flute flat',
    material: "Plywood / MDF / pine",
    rpm: "16,000",
    feed: "2,000-2,500 mm/min (80-100 ipm)",
    plunge: "1,000",
    stepdown: "6 mm",
    note: "MDF dust is fine and hot; keep chips clearing",
  },
  {
    tool: '1/8" 2-flute flat',
    material: "Hardwood",
    rpm: "18,000",
    feed: "1,200 mm/min (48 ipm)",
    plunge: "600",
    stepdown: "1.5-2 mm",
    note: "Deflects easily; keep stickout short",
  },
  {
    tool: '1/8" 2-flute flat',
    material: "Plywood / MDF",
    rpm: "18,000",
    feed: "1,500 mm/min (60 ipm)",
    plunge: "750",
    stepdown: "3 mm",
    note: "Use for joints and small pockets",
  },
  {
    tool: '1/8" ball nose (finishing)',
    material: "Any wood",
    rpm: "18,000",
    feed: "2,000-2,500 mm/min (80-100 ipm)",
    plunge: "1,000",
    stepdown: "n/a (0.5 mm stock to leave)",
    note: "8-10% stepover; light cut so feed can be high",
  },
  {
    tool: '1/4" ball nose (finishing)',
    material: "Any wood",
    rpm: "18,000",
    feed: "2,500 mm/min (100 ipm)",
    plunge: "1,200",
    stepdown: "n/a",
    note: "Faster finishing on big dishes, 8% stepover",
  },
  {
    tool: "60 degree V-bit",
    material: "Hardwood signs",
    rpm: "16,000-18,000",
    feed: "1,200-1,500 mm/min (48-60 ipm)",
    plunge: "600",
    stepdown: "1.5 mm (Engrave multiple depths)",
    note: "Letters under 50 mm; sharper angle = deeper for a given width",
  },
  {
    tool: "90 degree V-bit",
    material: "Hardwood signs",
    rpm: "16,000",
    feed: "1,200 mm/min (48 ipm)",
    plunge: "600",
    stepdown: "2 mm",
    note: "Bold text and wide borders",
  },
];

const FDM_RULES: [string, string][] = [
  ["Overhang", "45 degrees unsupported is safe on most printers; test your limit with the fin test in Module 3"],
  ["Bridge", "Up to about 30-40 mm with good cooling; longer bridges sag"],
  ["Wall thickness", "0.8 mm minimum (2 perimeters on 0.4 mm); 1.2-1.6 mm for anything structural"],
  ["Horizontal holes", "Use teardrops so the top stays at 45 degrees"],
  ["Vertical holes", "Print 0.2-0.4 mm undersize; drill or ream to final size for precision"],
  ["Bottom edges", "0.4 mm x 45 degree chamfer defeats elephant foot and lets lids fit"],
  ["Text", "Emboss 0.6 mm or deboss 0.8 mm; minimum stroke width 0.8 mm"],
  ["Layer orientation", "Layers in compression, never in tension across a thin section"],
  ["Screw holes", "3.5 mm through for #6 wood screws; countersink 7 mm; or design for M3 heat-set inserts (4.0 mm hole)"],
  ["Export", "3MF for units and multi-body; STL binary only when a tool requires it"],
];

const FITS: [string, string, string][] = [
  ["Press fit (permanent)", "0.05-0.15 mm total", "Inlays, pins, feet"],
  ["Transition / snap", "0.15-0.25 mm total", "Lids that stay on, box inserts"],
  ["Sliding fit", "0.25-0.35 mm total", "Drawers, bit holders, jigs that index"],
  ["Loose / free", "0.4-0.6 mm total", "Print-in-place hinges, pins that spin"],
  ["Printed part into CNC pocket", "Add 0.1-0.2 mm for the router", "Inlays and hardware mortises"],
];

const TOOLPATH_PICKS: [string, string, string][] = [
  ["Flat-bottom pocket", "2D Pocket", "Multiple depths; negative stock-to-leave for fit clearance"],
  ["Cut a part free", "2D Contour", "Tabs on; bottom height 0.3 mm into spoilboard"],
  ["Rough a big pocket fast", "2D Adaptive or 3D Adaptive", "Small radial engagement, deep stepdown"],
  ["Juice groove / channel", "Trace with ball nose", "Sideways compensation Center, negative axial offset"],
  ["Text and line art", "Engrave with V-bit", "Max depth set in Heights; pocket wide letters first"],
  ["Chamfer an edge", "2D Chamfer", "Chamfer mill; tip offset 0.5 mm so the tip does not rub"],
  ["Roundover an edge", "2D Contour with radius mill", "Model the fillet and select its edge"],
  ["Rough a 3D relief", "3D Adaptive Clearing", "0.5 mm stock to leave; rest machining later"],
  ["Finish a shallow dish", "3D Parallel", "8% stepover, 45 degrees to grain, rest from previous ops"],
  ["Finish steep walls", "3D Contour", "Combine with Parallel using slope limits"],
  ["Uniform finish everywhere", "3D Scallop", "Constant stepover in 3D; slower to compute"],
  ["Drill dowel holes", "Drill or 2D Bore", "Bore with an end mill if you have no drill bit"],
];

export default function ReferencePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 pb-16">
      <header className="max-w-3xl py-10">
        <p className="text-sm font-medium text-primary">Reference</p>
        <h1 className="mt-2 text-3xl font-semibold tracking-tight sm:text-4xl">
          Cheat sheets and calculators
        </h1>
        <p className="mt-3 text-muted-foreground text-pretty">
          Starting points for hobby-class machines. Every number here is conservative; use the
          calculators with your own RPM, bits, and measured clearances, then tune by ear and by
          test cut.
        </p>
      </header>

      <section>
        <h2 className="text-xl font-semibold tracking-tight">Calculators</h2>
        <div className="mt-4 grid gap-4 lg:grid-cols-3">
          <ChipLoadCalculator />
          <CuspHeightCalculator />
          <DogboneCalculator />
        </div>
      </section>

      <section className="mt-12">
        <h2 className="text-xl font-semibold tracking-tight">Cheat sheets</h2>
        <Tabs defaultValue="feeds" className="mt-4">
          <TabsList className="h-auto flex-wrap">
            <TabsTrigger value="feeds">Feeds and speeds</TabsTrigger>
            <TabsTrigger value="toolpaths">Which toolpath</TabsTrigger>
            <TabsTrigger value="fdm">FDM design rules</TabsTrigger>
            <TabsTrigger value="fits">Fits and clearances</TabsTrigger>
            <TabsTrigger value="hotkeys">Hotkeys</TabsTrigger>
          </TabsList>

          <TabsContent value="feeds">
            <Card>
              <CardHeader>
                <CardTitle>Wood feeds and speeds for hobby CNC routers</CardTitle>
                <CardDescription>
                  Starting points for Shapeoko, X-Carve, LongMill, and Onefinity-class machines
                  with a trim router or 1-2 kW spindle. Listen to the cut and adjust.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-sm">
                  <thead className="text-left text-xs text-muted-foreground">
                    <tr className="border-b">
                      <th className="py-2 pr-3 font-medium">Tool</th>
                      <th className="py-2 pr-3 font-medium">Material</th>
                      <th className="py-2 pr-3 font-medium">RPM</th>
                      <th className="py-2 pr-3 font-medium">Feed</th>
                      <th className="py-2 pr-3 font-medium">Plunge (mm/min)</th>
                      <th className="py-2 pr-3 font-medium">Stepdown</th>
                      <th className="py-2 font-medium">Notes</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FEEDS.map((row) => (
                      <tr key={row.tool + row.material} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-medium">{row.tool}</td>
                        <td className="py-2 pr-3">{row.material}</td>
                        <td className="py-2 pr-3 tabular-nums">{row.rpm}</td>
                        <td className="py-2 pr-3 tabular-nums">{row.feed}</td>
                        <td className="py-2 pr-3 tabular-nums">{row.plunge}</td>
                        <td className="py-2 pr-3">{row.stepdown}</td>
                        <td className="py-2 text-muted-foreground">{row.note}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="toolpaths">
            <Card>
              <CardHeader>
                <CardTitle>Which toolpath for which job</CardTitle>
                <CardDescription>
                  The Manufacture workspace has dozens of strategies. These twelve cover nearly all
                  woodworking.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-2 sm:grid-cols-2">
                  {TOOLPATH_PICKS.map(([job, path, note]) => (
                    <li key={job} className="rounded-lg border p-3 text-sm">
                      <p className="text-xs text-muted-foreground">{job}</p>
                      <p className="font-medium">{path}</p>
                      <p className="mt-0.5 text-muted-foreground">{note}</p>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fdm">
            <Card>
              <CardHeader>
                <CardTitle>Design rules for FDM printing</CardTitle>
                <CardDescription>Assumes a 0.4 mm nozzle at 0.2 mm layers.</CardDescription>
              </CardHeader>
              <CardContent>
                <dl className="grid gap-2 sm:grid-cols-2">
                  {FDM_RULES.map(([k, v]) => (
                    <div key={k} className="rounded-lg border p-3 text-sm">
                      <dt className="font-medium">{k}</dt>
                      <dd className="mt-0.5 text-muted-foreground">{v}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="fits">
            <Card>
              <CardHeader>
                <CardTitle>Fits and clearances</CardTitle>
                <CardDescription>
                  Total diametral clearance (both sides combined). Measure yours with the fit gauge
                  in Module 3 and store the results as parameters.
                </CardDescription>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="w-full min-w-[520px] text-sm">
                  <thead className="text-left text-xs text-muted-foreground">
                    <tr className="border-b">
                      <th className="py-2 pr-3 font-medium">Fit</th>
                      <th className="py-2 pr-3 font-medium">Starting clearance</th>
                      <th className="py-2 font-medium">Use it for</th>
                    </tr>
                  </thead>
                  <tbody>
                    {FITS.map(([fit, c, use]) => (
                      <tr key={fit} className="border-b last:border-0">
                        <td className="py-2 pr-3 font-medium">{fit}</td>
                        <td className="py-2 pr-3 tabular-nums">{c}</td>
                        <td className="py-2 text-muted-foreground">{use}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="hotkeys">
            <Card>
              <CardHeader>
                <CardTitle>Fusion 360 hotkeys worth memorizing</CardTitle>
                <CardDescription>Default Fusion bindings in the Design workspace.</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="grid gap-1.5 text-sm sm:grid-cols-2 lg:grid-cols-3">
                  {HOTKEYS.map(([key, action]) => (
                    <li key={key} className="flex items-center gap-3 rounded-lg border px-3 py-2">
                      <kbd className="rounded-md border bg-muted px-1.5 py-0.5 font-mono text-xs">
                        {key}
                      </kbd>
                      <span className="text-muted-foreground">{action}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </section>
    </div>
  );
}
