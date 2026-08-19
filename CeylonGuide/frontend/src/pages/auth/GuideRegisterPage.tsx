import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { ShieldCheck, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function GuideRegisterPage() {
  const [step, setStep] = useState(1);
  const { registerGuide } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    experienceYears: 3,
    dailyRateUSD: 50,
    languages: 'English, Sinhala',
    specializations: 'Cultural Heritage, Eco Trekking',
    licenseNumber: '',
    licenseDocumentUrl: 'https://example.com/demo-license.pdf',
    payoutBank: 'Bank of Ceylon',
    payoutAccount: '7891029381',
    agreedToTerms: false,
  });

  const [error, setError] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleNext = () => {
    setError('');
    if (step === 1 && (!formData.fullName || !formData.email || !formData.phone)) {
      setError('Please complete all personal contact details.');
      return;
    }
    if (step === 2 && (!formData.licenseNumber || !formData.location)) {
      setError('Please enter your location and SLTDA License details.');
      return;
    }
    if (step === 3 && !formData.licenseDocumentUrl) {
      setError('Please upload or confirm your License document link.');
      return;
    }
    if (step === 4 && (!formData.payoutBank || !formData.payoutAccount)) {
      setError('Please provide valid bank payout information.');
      return;
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.agreedToTerms) {
      setError('You must accept the Guide Partner Agreement.');
      return;
    }

    registerGuide(formData);
    navigate('/guide/dashboard');
  };

  return (
    <div className="min-h-screen bg-[#FAF8F3] py-12 px-6 flex justify-center items-center">
      <div className="max-w-2xl w-full bg-white rounded-2xl border border-slate-200 shadow-xl p-8">
        
        {/* Wizard Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-emerald-50 text-[#0B3D2E] px-4 py-1.5 rounded-full text-xs font-bold mb-3 border border-emerald-200">
            <ShieldCheck size={16} className="text-[#087EA4]" />
            <span>SLTDA Certified Guide Application</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-[#17211D]">Join as a Licensed Local Guide</h1>
          <p className="text-slate-600 text-sm mt-1">Step {step} of 5 — Complete verification details</p>
        </div>

        {/* Progress Tracker */}
        <div className="flex justify-between items-center mb-8 border-b pb-4">
          {[1, 2, 3, 4, 5].map(i => (
            <div key={i} className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${
                step === i ? 'bg-[#0B3D2E] text-amber-400' : step > i ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
              }`}>
                {step > i ? <CheckCircle2 size={16} /> : i}
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-700 text-sm rounded-xl">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2">1. Personal Information</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Full Name (as in SLTDA License)</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                  placeholder="Chaminda Bandara"
                  required
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                    placeholder="chaminda@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Phone Number (+94)</label>
                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                    placeholder="+94 77 123 4567"
                    required
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Professional Details */}
          {step === 2 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2">2. Professional Credentials</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Primary Base / Region</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                  placeholder="e.g. Kandy & Cultural Triangle"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Years of Experience</label>
                  <input
                    type="number"
                    name="experienceYears"
                    value={formData.experienceYears}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Daily Rate (USD $)</label>
                  <input
                    type="number"
                    name="dailyRateUSD"
                    value={formData.dailyRateUSD}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: SLTDA License & Verification */}
          {step === 3 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2">3. SLTDA Verification Documents</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">SLTDA License Number</label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                  placeholder="e.g. SLTDA/NTG/2022/4012"
                />
              </div>
              <div className="p-4 bg-slate-50 border border-dashed border-slate-300 rounded-xl text-center">
                <p className="text-xs text-slate-600 mb-2">Upload SLTDA License Card / National ID Copy (PDF/JPG)</p>
                <input type="file" className="text-xs text-slate-500" disabled />
                <p className="text-[11px] text-amber-700 mt-2 font-medium">Demo Mode: Auto-attaching verified sample document URL</p>
              </div>
            </div>
          )}

          {/* Step 4: Payout Details */}
          {step === 4 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2">4. Bank Payout Information</h2>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Bank Name</label>
                <select
                  name="payoutBank"
                  value={formData.payoutBank}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                >
                  <option value="Bank of Ceylon">Bank of Ceylon</option>
                  <option value="Commercial Bank">Commercial Bank</option>
                  <option value="Sampath Bank">Sampath Bank</option>
                  <option value="Hatton National Bank">Hatton National Bank</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Account Number</label>
                <input
                  type="text"
                  name="payoutAccount"
                  value={formData.payoutAccount}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-300 focus:ring-2 focus:ring-[#087EA4] outline-none text-sm"
                />
              </div>
            </div>
          )}

          {/* Step 5: Partner Agreement */}
          {step === 5 && (
            <div className="space-y-4">
              <h2 className="text-lg font-bold text-slate-900 border-b pb-2">5. Guide Partner Agreement</h2>
              <div className="h-40 overflow-y-auto p-4 bg-slate-50 rounded-xl border text-xs text-slate-600 leading-relaxed">
                <p className="font-bold mb-2 text-slate-800">CeylonGuide Verified Partner Terms:</p>
                1. All tour bookings require a minimum 30% initial deposit held in secure Escrow prior to confirmation.<br/>
                2. Contact information sharing before payment confirmation is strictly prohibited.<br/>
                3. Platform commission rate is fixed at 10% on gross bookings.<br/>
                4. All guides must maintain active SLTDA licensing and adhere to Sri Lankan tourism safety guidelines.
              </div>
              <label className="flex items-center gap-3 cursor-pointer pt-2">
                <input
                  type="checkbox"
                  name="agreedToTerms"
                  checked={formData.agreedToTerms}
                  onChange={handleChange}
                  className="w-4 h-4 text-[#0B3D2E] rounded border-slate-300"
                />
                <span className="text-xs font-bold text-slate-800">I agree to CeylonGuide Guide Terms & Escrow Policy</span>
              </label>
            </div>
          )}

          {/* Wizard Navigation */}
          <div className="flex justify-between items-center pt-6 border-t border-slate-200">
            {step > 1 ? (
              <button
                type="button"
                onClick={() => setStep(s => s - 1)}
                className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-300 text-slate-700 text-sm font-semibold hover:bg-slate-100 transition cursor-pointer"
              >
                <ArrowLeft size={16} /> Back
              </button>
            ) : (
              <Link to="/login" className="text-xs font-bold text-slate-500 hover:underline">
                Already registered? Sign In
              </Link>
            )}

            {step < 5 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#0B3D2E] text-amber-300 text-sm font-bold hover:bg-[#146B4A] transition cursor-pointer ml-auto"
              >
                Continue <ArrowRight size={16} />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center gap-2 px-8 py-3 rounded-xl bg-amber-400 text-slate-950 text-sm font-bold hover:bg-amber-300 transition cursor-pointer ml-auto shadow-lg"
              >
                Submit Application <ShieldCheck size={18} />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}