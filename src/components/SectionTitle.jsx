const SectionTitle = ({ title, subtitle, darkMode }) => (
  <header className="text-center mb-10 sm:mb-14" data-aos="fade-up">
    <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-3 text-transparent bg-linear-to-r from-orange-400 to-orange-600 bg-clip-text">
      {title}
    </h2>
    {subtitle && (
      <p className={`max-w-2xl mx-auto text-sm sm:text-base ${darkMode ? "text-gray-400" : "text-gray-600"}`}>{subtitle}</p>
    )}
    <div className="mx-auto mt-4 h-1 w-20 rounded-full bg-linear-to-r from-orange-500 to-amber-500" />
  </header>
);

export default SectionTitle;
