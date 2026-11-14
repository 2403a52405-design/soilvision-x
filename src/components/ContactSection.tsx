import React, { useState } from 'react';
import { Mail, GraduationCap, Building2, User, Send, CheckCircle2, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setErrorMsg('Please complete all required fields.');
      return;
    }

    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await response.json();

      if (!response.ok || !data.success) {
        throw new Error(data.error || 'Failed to submit contact message.');
      }

      setSubmitSuccess(true);
      setFormData({ name: '', email: '', subject: '', message: '' });
    } catch (err: any) {
      setErrorMsg(err.message || 'Error sending inquiry.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Academic & Project Info (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="text-xs font-semibold text-emerald-800 tracking-wider uppercase mb-2">
                Academic Demonstration & Inquiries
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
                Project & Developer Information
              </h2>
              <p className="mt-3 text-sm text-slate-600 leading-relaxed">
                SoilVision-X was engineered as an advanced final-year capstone research project in the School of Computer Science & Artificial Intelligence.
              </p>
            </div>

            {/* Official Credentials Box */}
            <div className="p-6 bg-[#FAF8F5] border border-stone-200 rounded-2xl space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-lg bg-emerald-100 text-emerald-800 shrink-0 mt-0.5">
                  <User className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Principal Investigator / Developer</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">N. Nikitha Reddy</div>
                  <div className="text-xs font-mono text-emerald-800 mt-0.5">Roll No: 2403a52405@sru.edu.in</div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <div className="p-2 rounded-lg bg-stone-200 text-slate-800 shrink-0 mt-0.5">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">Academic Department</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">
                    Department of Computer Science and Engineering
                  </div>
                  <div className="text-xs text-slate-600">
                    Specialization in Artificial Intelligence & Machine Learning (AI & ML)
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-3 pt-3 border-t border-stone-200">
                <div className="p-2 rounded-lg bg-stone-200 text-slate-800 shrink-0 mt-0.5">
                  <Building2 className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs text-slate-500 uppercase tracking-wide">University / Institution</div>
                  <div className="text-sm font-semibold text-slate-900 mt-0.5">SR University</div>
                  <div className="text-xs text-slate-600">Warangal, Telangana, India</div>
                </div>
              </div>
            </div>

            <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl text-xs text-emerald-950">
              <strong className="block mb-1 font-semibold">Research Scope:</strong>
              Fine-grained pedological image classification using PyTorch Swin Transformer (Shifted-Window Attention) for real-world automated soil testing.
            </div>
          </div>

          {/* Right Column: Contact Form (7 cols) */}
          <div className="lg:col-span-7 bg-[#FAF8F5] border border-stone-200 rounded-2xl p-6 sm:p-10 shadow-xs">
            <h3 className="text-xl font-bold text-slate-900 mb-1">
              Send an Academic or Field Inquiry
            </h3>
            <p className="text-xs text-slate-500 mb-6">
              Connect regarding model evaluation, soil dataset collaboration, or project presentation queries.
            </p>

            {submitSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-xl text-center space-y-3">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" />
                <h4 className="text-base font-bold text-emerald-950">Message Sent Successfully</h4>
                <p className="text-xs text-emerald-900/80 max-w-md mx-auto">
                  Thank you! Your message has been forwarded to N. Nikitha Reddy and the SR University research team.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  className="px-4 py-2 text-xs font-semibold text-emerald-800 bg-emerald-100 hover:bg-emerald-200 rounded-lg transition-colors cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Dr. Ramesh Kumar"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. ramesh@sru.edu.in"
                      className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    placeholder="e.g. B.Tech Demonstration / Swin Transformer Architecture"
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 uppercase tracking-wide mb-1.5">
                    Message *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Share feedback, dataset inquiries, or questions regarding SoilVision-X..."
                    className="w-full px-3.5 py-2.5 text-xs bg-white border border-stone-300 rounded-lg focus:outline-none focus:border-emerald-700 transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-xs text-rose-800 flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 text-rose-700 shrink-0" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-xs font-semibold text-white bg-emerald-800 hover:bg-emerald-900 disabled:bg-stone-300 rounded-lg transition-colors cursor-pointer shadow-xs"
                >
                  {isSubmitting ? (
                    <span>Sending Inquiry...</span>
                  ) : (
                    <>
                      <Send className="w-3.5 h-3.5" />
                      <span>Submit Inquiry</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
