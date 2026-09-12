"use client";

import { useId, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  unit,
  min = 0,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  unit?: string;
  min?: number;
}) {
  const id = useId();
  return (
    <label htmlFor={id} className="grid gap-1 text-sm">
      <span className="text-muted-foreground">{label}</span>
      <span className="flex items-center rounded-lg border bg-background focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/50">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step={step}
          min={min}
          value={Number.isFinite(value) ? value : ""}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="h-9 w-full bg-transparent px-3 tabular-nums outline-none"
        />
        {unit ? <span className="pr-3 text-xs text-muted-foreground">{unit}</span> : null}
      </span>
    </label>
  );
}

function Result({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="rounded-lg bg-muted/60 px-3 py-2">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="text-lg font-semibold tabular-nums">{value}</p>
      {hint ? <p className="text-xs text-muted-foreground">{hint}</p> : null}
    </div>
  );
}

export function ChipLoadCalculator() {
  const [rpm, setRpm] = useState(18000);
  const [flutes, setFlutes] = useState(2);
  const [chipLoadMm, setChipLoadMm] = useState(0.05);
  const [diameterMm, setDiameterMm] = useState(6.35);

  const feedMm = rpm * flutes * chipLoadMm;
  const feedIn = feedMm / 25.4;
  const chipLoadIn = chipLoadMm / 25.4;
  const plunge = feedMm * 0.5;
  const stepdownHardwood = diameterMm * 0.5;
  const stepdownSoft = diameterMm * 1;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Feed rate from chip load</CardTitle>
        <CardDescription>
          Feed = RPM x flutes x chip load. Hobby routers: start at 0.03-0.05 mm (0.001-0.002 in)
          per tooth in hardwood and work up until chips look like flakes.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField label="Spindle speed" value={rpm} onChange={setRpm} step={500} unit="RPM" />
          <NumberField label="Flutes" value={flutes} onChange={setFlutes} step={1} min={1} />
          <NumberField
            label="Chip load per tooth"
            value={chipLoadMm}
            onChange={setChipLoadMm}
            step={0.005}
            unit="mm"
          />
          <NumberField
            label="Bit diameter"
            value={diameterMm}
            onChange={setDiameterMm}
            step={0.1}
            unit="mm"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Result
            label="Cutting feed"
            value={`${Math.round(feedMm)} mm/min`}
            hint={`${feedIn.toFixed(0)} in/min at ${chipLoadIn.toFixed(4)} in per tooth`}
          />
          <Result label="Plunge feed (50%)" value={`${Math.round(plunge)} mm/min`} />
          <Result
            label="Stepdown, hardwood"
            value={`${stepdownHardwood.toFixed(1)} mm`}
            hint="About half the bit diameter on a hobby machine"
          />
          <Result
            label="Stepdown, plywood / MDF / pine"
            value={`${stepdownSoft.toFixed(1)} mm`}
            hint="About one bit diameter; adaptive can go deeper"
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function CuspHeightCalculator() {
  const [ballMm, setBallMm] = useState(3.175);
  const [stepoverPct, setStepoverPct] = useState(8);

  const r = ballMm / 2;
  const s = (ballMm * stepoverPct) / 100;
  const inside = r * r - (s / 2) * (s / 2);
  const cusp = inside > 0 ? r - Math.sqrt(inside) : r;
  const sandReady = cusp <= 0.02;
  const passesPer100 = s > 0 ? Math.ceil(100 / s) : 0;

  const target = 0.02;
  const maxStepForTarget = 2 * Math.sqrt(r * r - (r - target) * (r - target));
  const maxPct = (maxStepForTarget / ballMm) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Cusp height for ball nose finishing</CardTitle>
        <CardDescription>
          The scallop left between passes: h = r - sqrt(r&sup2; - (s/2)&sup2;). Anything under
          0.02 mm sands out at 150 grit.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField
            label="Ball nose diameter"
            value={ballMm}
            onChange={setBallMm}
            step={0.1}
            unit="mm"
          />
          <NumberField
            label="Stepover"
            value={stepoverPct}
            onChange={setStepoverPct}
            step={1}
            unit="% of dia"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Result
            label="Cusp height"
            value={`${cusp.toFixed(3)} mm`}
            hint={sandReady ? "Sand-ready finish" : "Visible scallops; reduce stepover"}
          />
          <Result label="Stepover distance" value={`${s.toFixed(2)} mm`} />
          <Result
            label="Passes per 100 mm"
            value={String(passesPer100)}
            hint="Machine time scales with this number"
          />
          <Result
            label="Max stepover for 0.02 mm cusps"
            value={`${maxPct.toFixed(0)}%`}
            hint={`${maxStepForTarget.toFixed(2)} mm with this bit`}
          />
        </div>
      </CardContent>
    </Card>
  );
}

export function DogboneCalculator() {
  const [bitMm, setBitMm] = useState(6.35);
  const [stockMm, setStockMm] = useState(18);

  const r = bitMm / 2;
  const minimalOffset = r * (1 - Math.SQRT1_2);
  const tabW = Math.max(6, Math.round(stockMm * 0.5));
  const tabH = Math.max(1.5, Math.round(stockMm * 0.17 * 2) / 2);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Inside corner relief and tab sizing</CardTitle>
        <CardDescription>
          A router leaves a radius equal to the bit radius in every inside corner. Dogbones add a
          circle of the bit diameter so a square tenon seats fully.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <div className="grid gap-3 sm:grid-cols-2">
          <NumberField label="Bit diameter" value={bitMm} onChange={setBitMm} step={0.1} unit="mm" />
          <NumberField
            label="Stock thickness"
            value={stockMm}
            onChange={setStockMm}
            step={0.5}
            unit="mm"
          />
        </div>
        <div className="grid gap-2 sm:grid-cols-2">
          <Result
            label="Inside corner radius left by bit"
            value={`${r.toFixed(2)} mm`}
            hint="Why square tenons will not seat without relief"
          />
          <Result
            label="Dogbone circle diameter"
            value={`${bitMm.toFixed(2)} mm`}
            hint="Center placed r along the 45 degree bisector from the corner"
          />
          <Result
            label="Minimal (45 degree) relief depth"
            value={`${minimalOffset.toFixed(2)} mm`}
            hint="How far the relief shows past the corner on the show face"
          />
          <Result
            label="Suggested tabs"
            value={`${tabW} x ${tabH} mm`}
            hint="Width x height, 3-4 per part, kept off corners"
          />
        </div>
      </CardContent>
    </Card>
  );
}
