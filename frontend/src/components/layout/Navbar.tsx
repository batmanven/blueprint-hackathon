import { Link, useNavigate } from 'react-router-dom';
import { Shield, Menu, X, LogOut, ChevronRight } from 'lucide-react';
import { useLanguage } from '@/lib/LanguageContext';
import { toast } from 'sonner';
import { useEffect, useState } from 'react';
import { AnimatePresence, motion, type Variants } from 'framer-motion';

const Navbar = () => {
  const { t, lang, setLang } = useLanguage();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('aarogya-user') || 'null');
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('aarogya-token');
    localStorage.removeItem('aarogya-user');
    toast.success('Logged out');
    setOpen(false);
    navigate('/login');
  };

  const closeMenu = () => setOpen(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const links = [
    { label: t.nav.schemes, path: '/schemes' },
    { label: t.nav.bills, path: '/bill-analysis' },
    { label: t.nav.meds, path: '/medicines' },
    { label: t.nav.plan, path: '/expenses' },
    { label: t.nav.emergency, path: '/emergency' },
    { label: t.nav.impact, path: '/analytics' },
  ];

  const drawerVariants: Variants = {
    hidden: { opacity: 0, y: -16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.35,
        ease: [0.16, 1, 0.3, 1],
        when: 'beforeChildren',
        staggerChildren: 0.06,
      },
    },
    exit: {
      opacity: 0,
      y: -12,
      transition: {
        duration: 0.22,
        ease: [0.4, 0, 1, 1],
        when: 'afterChildren',
        staggerChildren: 0.04,
        staggerDirection: -1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 14 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
      opacity: 0,
      y: 10,
      transition: { duration: 0.18, ease: [0.4, 0, 1, 1] },
    },
  };

  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b border-oat/80 bg-white/90 backdrop-blur-md">
        <div className="mx-auto flex h-20 max-w-[1200px] items-center justify-between px-5">
          <Link to="/" className="flex shrink-0 items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-off-black text-white shadow-sm">
              <Shield size={18} />
            </div>
            <span className="whitespace-nowrap text-[18px] font-semibold text-off-black">
              Aarogya<span className="text-fin">Raksha</span>
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {links.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="relative text-[14px] font-medium text-black/60 transition hover:text-off-black after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-fin after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'hi' : 'en')}
              className="hidden h-10 items-center rounded-xl border border-oat bg-white px-3 text-sm font-semibold text-off-black transition hover:border-fin/40 hover:bg-background sm:flex"
            >
              {lang === 'en' ? 'हिंदी' : 'EN'}
            </button>
            {user ? (
              <>
                <img
                  src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user.name}`}
                  alt={user.name}
                  className="h-9 w-9 rounded-full border border-oat bg-background"
                />
                <button
                  onClick={handleLogout}
                  className="hidden h-10 items-center rounded-xl border border-red-200 px-4 text-sm font-medium text-red-600 transition hover:bg-red-500 hover:text-white sm:flex"
                >
                  Logout
                </button>
              </>
            ) : (
              <div className="hidden items-center gap-3 sm:flex">
                <Link
                  to="/login"
                  className="text-sm text-black/60 transition hover:text-off-black"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="flex h-10 items-center rounded-xl bg-off-black px-5 text-sm text-white transition hover:bg-fin"
                >
                  {t.nav.getStarted}
                </Link>
              </div>
            )}

            <button
              onClick={() => setOpen((prev) => !prev)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              className="flex h-11 w-11 items-center justify-center rounded-xl border border-oat bg-white text-off-black shadow-sm transition hover:border-fin/40 hover:bg-background lg:hidden"
            >
              {open ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-40 bg-off-black/30 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={closeMenu}
            />

            <motion.div
              variants={drawerVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="fixed inset-x-4 top-[88px] z-50 overflow-hidden rounded-[24px] border border-oat/80 bg-white/95 shadow-[0_20px_60px_rgba(0,0,0,0.12)] backdrop-blur-xl lg:hidden"
            >
              <div className="px-5 pb-5 pt-4">
                <div className="mb-4 flex items-center justify-between border-b border-oat pb-3">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-black/40">
                      Menu
                    </p>
                    <p className="text-sm text-black/60">Quick navigation</p>
                  </div>

                  {user && (
                    <div className="flex items-center gap-3 rounded-2xl bg-background px-3 py-2">
                      <img
                        src={`https://api.dicebear.com/9.x/lorelei/svg?seed=${user.name}`}
                        alt={user.name}
                        className="h-10 w-10 rounded-full border border-oat bg-white"
                      />
                      <div className="max-w-[140px]">
                        <p className="truncate text-sm font-semibold text-off-black">
                          {user.name}
                        </p>
                        <p className="text-xs text-black/50">Signed in</p>
                      </div>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  {links.map((link) => (
                    <motion.div key={link.path} variants={itemVariants}>
                      <Link
                        to={link.path}
                        onClick={closeMenu}
                        className="group flex items-center justify-between rounded-2xl border border-transparent bg-[#fcfbf8] px-4 py-3 text-sm font-medium text-off-black transition hover:border-oat hover:bg-white"
                      >
                        <span>{link.label}</span>
                        <ChevronRight
                          size={16}
                          className="text-black/35 transition group-hover:translate-x-1 group-hover:text-fin"
                        />
                      </Link>
                    </motion.div>
                  ))}
                </div>

                <motion.div
                  variants={itemVariants}
                  className="mt-5 border-t border-oat pt-4"
                >
                  {user ? (
                    <button
                      onClick={handleLogout}
                      className="flex w-full items-center justify-between rounded-2xl bg-red-50 px-4 py-3 text-left text-sm font-semibold text-red-600 transition hover:bg-red-100"
                    >
                      <span>Logout</span>
                      <LogOut size={16} />
                    </button>
                  ) : (
                    <div className="grid grid-cols-2 gap-3">
                      <Link
                        to="/login"
                        onClick={closeMenu}
                        className="flex h-11 items-center justify-center rounded-2xl border border-oat bg-white text-sm font-medium text-off-black transition hover:bg-background"
                      >
                        Login
                      </Link>
                      <Link
                        to="/register"
                        onClick={closeMenu}
                        className="flex h-11 items-center justify-center rounded-2xl bg-off-black text-sm font-medium text-white transition hover:bg-fin"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;