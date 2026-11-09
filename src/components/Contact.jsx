import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, CheckCircle2 } from "lucide-react";
import SectionTitle from "./SectionTitle";
import TiltCard from "./TiltCard";
import SocialLinks from "./SocialLinks";
import { profile } from "../data/portfolio";

const Contact = ({ darkMode }) => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const onSubmit = (e) => {
    e.preventDefault();
    // Server kerak emas: foydalanuvchining pochta ilovasi tayyor xat bilan ochiladi
    const subject = encodeURIComponent(`Portfolio: message from ${form.name}`);
    const body = encodeURIComponent(`${form.message}\n\n— ${form.name} (${form.email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const card = darkMode ? "bg-white/5 border-white/10" : "bg-white/80 border-orange-100";
  const input = `w-full rounded-xl border px-4 py-3 text-base outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-500/30 ${
    darkMode ? "bg-gray-900/60 border-white/10 text-white placeholder-gray-500" : "bg-white border-orange-100 text-gray-900 placeholder-gray-400"
  }`;

  const info = [
    { icon: Mail, label: "Email", value: profile.email, href: `mailto:${profile.email}` },
    { icon: Phone, label: "Phone", value: profile.phone, href: `tel:${profile.phone.replace(/\s/g, "")}` },
    { icon: MapPin, label: "Location", value: profile.location },
  ];

  return (
    <section id="contact" className="relative py-20 px-4 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <SectionTitle title="Contact Me" subtitle="Have a project in mind or just want to say hi? My inbox is always open." darkMode={darkMode} />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 flex flex-col gap-4" data-aos="fade-right">
            {info.map(({ icon: Icon, label, value, href }) => (
              <TiltCard key={label} className={`group rounded-2xl border p-5 ${card}`} max={8}>
                <a href={href} className="flex items-center gap-4" style={{ transform: "translateZ(25px)" }}>
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-linear-to-br from-orange-500 to-amber-500 text-white shadow-lg shadow-orange-500/30">
                    <Icon className="h-6 w-6" />
                  </span>
                  <span className="min-w-0">
                    <span className={`block text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>{label}</span>
                    <span className={`block truncate font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>{value}</span>
                  </span>
                </a>
              </TiltCard>
            ))}
            <div className={`rounded-2xl border p-5 ${card}`}>
              <p className={`mb-4 text-center lg:text-left font-semibold ${darkMode ? "text-white" : "text-gray-900"}`}>Follow me</p>
              <SocialLinks darkMode={darkMode} />
            </div>
          </div>

          <form onSubmit={onSubmit} className={`lg:col-span-3 rounded-3xl border p-5 sm:p-8 ${card}`} data-aos="fade-left">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <label className="block">
                <span className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Name</span>
                <input required name="name" value={form.name} onChange={onChange} placeholder="Your name" className={input} autoComplete="name" />
              </label>
              <label className="block">
                <span className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Email</span>
                <input required type="email" name="email" value={form.email} onChange={onChange} placeholder="you@example.com" className={input} autoComplete="email" />
              </label>
            </div>
            <label className="block mb-6">
              <span className={`mb-1 block text-sm font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>Message</span>
              <textarea required name="message" rows={6} value={form.message} onChange={onChange} placeholder="Tell me about your project..." className={`${input} resize-none`} />
            </label>
            <motion.button
              type="submit"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-linear-to-r from-orange-500 to-amber-500 px-8 py-3 text-lg font-semibold text-white shadow-lg shadow-orange-500/30 hover:shadow-[0_0_40px_rgba(255,165,0,0.7)]"
            >
              {sent ? <><CheckCircle2 className="h-5 w-5" /> Opening mail app...</> : <><Send className="h-5 w-5" /> Send Message</>}
            </motion.button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
