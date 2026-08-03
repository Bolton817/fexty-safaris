import { CheckCircle2, XCircle } from 'lucide-react';

interface PackageInclusionsProps {
  inclusions: string[];
  exclusions: string[];
}

export default function PackageInclusions({ inclusions, exclusions }: PackageInclusionsProps) {
  const safeInclusions = Array.isArray(inclusions) ? inclusions : [];
  const safeExclusions = Array.isArray(exclusions) ? exclusions : [];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {/* Includes */}
      <div className="bg-white p-8 rounded-2xl border border-green-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-green-50 rounded-bl-full -z-10" />
        <h3 className="text-xl font-bold text-savanna-900 mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-green-500" /> Included
        </h3>
        {safeInclusions.length > 0 ? (
          <ul className="space-y-4">
            {safeInclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sand-700">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sand-600">Standard safari inclusions apply.</p>
        )}
      </div>

      {/* Excludes */}
      <div className="bg-white p-8 rounded-2xl border border-red-100 shadow-sm relative overflow-hidden">
        <div className="absolute top-0 right-0 w-24 h-24 bg-red-50 rounded-bl-full -z-10" />
        <h3 className="text-xl font-bold text-savanna-900 mb-6 flex items-center gap-2">
          <XCircle className="w-6 h-6 text-red-400" /> Excluded
        </h3>
        {safeExclusions.length > 0 ? (
          <ul className="space-y-4">
            {safeExclusions.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sand-700">
                <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-sand-600">Standard exclusions apply.</p>
        )}
      </div>
    </div>
  );
}
