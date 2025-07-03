export default function Footer({ isSidebarOpen = false }) {
  return (
    <footer className="self-center text-center font-outfit text-[.6rem] text-primary-light md:text-xs">
      {isSidebarOpen && <span>Coded by{' '}</span>}
      <a
        href="https://yakshdevani.vercel.app/"
        target="_blank"
        rel="noreferrer"
        className="font-bold uppercase underline transition-all duration-300 hover:text-white"
      >
        Yaksh
      </a>
    </footer>
  );
}
