import React, { useState } from 'react';
import { ShieldCheck, User, Award, FileText, CheckCircle } from 'lucide-react';

export default function GuideWizard() {
  const [step, setStep] = useState(1);
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-serif font-bold text-emerald-950">Become a PearlGo Partner</h1>
        <p className="text-slate-600 mt-1">Complete your application to get verified by Sri Lanka Tourism Admin.</p>
      </div>

      {/* Steps Progress */}
      <div className="flex justify-between border-b border-slate-200 pb-4 mb-8">
        {['Personal', 'Professional', 'Verification', 'Agreement'].map((title, i) => (
          <div key={i} className={`text-xs font-bold uppercase tracking-wider ${step === i+1 ? 'text-amber-600 border-b-2 border-amber-500 pb-1' : 'text-slate-400'}`}>
            {i+1}. {title}
          </div>
        ))}
      </div>

      <div className="bg-white p-8 rounded-2xl border border-slate-200 shadow-sm">
        {step === 1 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Personal Details</h3>
            <input type="text" placeholder="Full Name" className="w-full border p-3 rounded-xl" />
            <input type="email" placeholder="Email Address" className="w-full border p-3 rounded-xl" />
            <input type="tel" placeholder="Phone Number (+94)" className="w-full border p-3 rounded-xl" />
            <button onClick={() => setStep(2)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Professional Details</button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Professional Details</h3>
            <input type="number" placeholder="Years of Experience" className="w-full border p-3 rounded-xl" />
            <input type="number" placeholder="Daily Rate (LKR)" className="w-full border p-3 rounded-xl" />
            <textarea placeholder="Biography & Languages Spoken" className="w-full border p-3 rounded-xl h-24"></textarea>
            <button onClick={() => setStep(3)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Document Upload</button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h3 className="font-bold text-lg text-emerald-900">Government Verification</h3>
            <p className="text-xs text-slate-500">Your documents remain 100% confidential and will never be shown publicly.</p>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Guide License Registration No.</label>
              <input type="text" placeholder="SLTDA-2026-XXXX" className="w-full border p-3 rounded-xl" />
            </div>
            <div>
              <label className="block text-xs font-bold text-slate-600 mb-1">Upload License / NIC Photo</label>
              <input type="file" className="w-full border p-2 rounded-xl text-xs" />
            </div>
            <button onClick={() => setStep(4)} className="w-full bg-emerald-900 text-white py-3 rounded-xl font-bold">Next: Agreement</button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6">
            <h3 className="font-bold text-lg text-emerald-900">Partner Agreement</h3>
            <div className="bg-slate-50 p-4 rounded-xl text-xs text-slate-600 leading-relaxed border max-h-40 overflow-y-auto">
              By registering as a guide on PearlGo, you agree to uphold national safety standard regulations, provide honest tour services, and accept 10% platform commission deductions upon booking completions.
            </div>
            <label className="flex items-center gap-3 text-sm font-semibold text-slate-800">
              <input type="checkbox" checked={agreed} onChange={e => setAgreed(e.target.checked)} className="w-4 h-4 text-emerald-900" />
              I have read and agree to the PearlGo Tour Guide Partner Agreement.
            </label>
            <button disabled={!agreed} onClick={() => alert("Application submitted! Your status is now PENDING_VERIFICATION.")} className="w-full bg-amber-500 disabled:opacity-50 text-emerald-950 py-3.5 rounded-xl font-bold">
              Submit Application
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
