import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const SIZE_CHART = [
  { size: "36R", chest: '36"', waist: '30"', length: '29.5"' },
  { size: "38R", chest: '38"', waist: '32"', length: '30"' },
  { size: "40R", chest: '40"', waist: '34"', length: '30.5"' },
  { size: "42R", chest: '42"', waist: '36"', length: '31"' },
  { size: "44R", chest: '44"', waist: '38"', length: '31.5"' },
  { size: "46R", chest: '46"', waist: '40"', length: '32"' },
];

interface SizeGuideModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SizeGuideModal({ open, onOpenChange }: SizeGuideModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-brand-charcoal text-brand-cream sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Size Guide</DialogTitle>
          <DialogDescription className="text-brand-cream/60">
            Measurements in inches. Between sizes? Size up for a classic fit, size down for a
            tailored fit.
          </DialogDescription>
        </DialogHeader>
        <table className="mt-2 w-full text-left text-sm">
          <thead>
            <tr className="border-b border-white/10 text-brand-cream/50">
              <th className="py-2 font-normal">Size</th>
              <th className="py-2 font-normal">Chest</th>
              <th className="py-2 font-normal">Waist</th>
              <th className="py-2 font-normal">Jacket length</th>
            </tr>
          </thead>
          <tbody>
            {SIZE_CHART.map((row) => (
              <tr key={row.size} className="border-b border-white/5">
                <td className="py-2 font-medium">{row.size}</td>
                <td className="py-2 text-brand-cream/70">{row.chest}</td>
                <td className="py-2 text-brand-cream/70">{row.waist}</td>
                <td className="py-2 text-brand-cream/70">{row.length}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
}
