import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  AppWindowMac,
  Home,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  Menu,
  Sun,
  Moon,
  X,
  Leaf,
  Calendar,
  BookOpen,
  UserCircle,
  Settings,
  LogOut,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  GripVertical
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useNavigate, useLocation } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import { useEffect, useState } from "react";
import {
  SignedIn,
  SignedOut,
  SignInButton,
  UserButton,
  SignUpButton,
} from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext"; // Import your ThemeContext

export default function SideBar({
  sidebarVisible,
  setSidebarVisible,
  activeLink,
  onClose
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const { theme, toggleTheme } = useTheme(); // Use the theme context
  const { width } = useScreenSize();
  const [expandedSections, setExpandedSections] = useState({
    health: true,
    care: true,
    resources: true,
    family: true
  });
  const [sidebarWidth, setSidebarWidth] = useState(320);
  const [isResizing, setIsResizing] = useState(false);

  const navigationSections = [
    {
      id: "health",
      title: "Health Tracking",
      icon: <ActivitySquare size={16} />,
      items: [
        {
          icon: <LayoutDashboard size={20} />,
          label: "Dashboard",
          path: "/dashboard",
          active: activeLink === 0,
          badge: "New"
        },
        {
          icon: <ActivitySquare size={20} />,
          label: "Health Journal",
          path: "/tracker",
          active: activeLink === 5,
        },
        {
          icon: <Calendar size={20} />,
          label: "Cycle Tracker",
          path: "/ovulationcalculator",
          active: activeLink === 6,
        },
        {
          icon: <HeartPulse size={20} />,
          label: "Symptom Analysis",
          path: "/symptomsanalyzer",
          active: activeLink === 11,
        }
      ]
    },
    {
      id: "care",
      title: "Care & Support",
      icon: <Stethoscope size={16} />,
      items: [
        {
          icon: <Stethoscope size={20} />,
          label: "Expert Consultations",
          path: "/consultations",
          active: activeLink === 8,
        },
        {
          icon: <Bot size={20} />,
          label: "Eve AI Assistant",
          path: "/ChatBot",
          active: activeLink === 9,
          badge: "AI"
        },
        {
          icon: <MessageSquare size={20} />,
          label: "Community Forums",
          path: "/forums",
          active: activeLink === 14,
        }
      ]
    },
    {
      id: "resources",
      title: "Resources",
      icon: <BookOpen size={16} />,
      items: [
        {
          icon: <BookOpen size={20} />,
          label: "Health Education",
          path: "/education",
          active: activeLink === 2,
        },
        {
          icon: <Leaf size={20} />,
          label: "Nutrition Guide",
          path: "/diet-plan",
          active: activeLink === 19,
        },
        {
          icon: <ClipboardList size={20} />,
          label: "PCOS Insights",
          path: "/partner",
          active: activeLink === 7,
        },
        {
          icon: <ActivitySquare size={20} />,
          label: "Meditation",
          path: "/Meditation",
          active: activeLink === 18,
        }
      ]
    },
    {
      id: "family",
      title: "Family",
      icon: <AppWindowMac size={16} />,
      items: [
        {
          icon: <AppWindowMac size={20} />,
          label: "Parent's Dashboard",
          path: "/parents",
          active: activeLink === 13,
        }
      ]
    }
  ];

  const quickActions = [
    {
      icon: <Home size={20} />,
      label: "Home",
      path: "/",
      active: activeLink === 1,
    },
    {
      icon: <ShoppingBag size={20} />,
      label: "Health Mart",
      path: "/Ecom",
      active: activeLink === 4,
      badge: "Shop"
    }
  ];

  const bottomLinks = [
    {
      icon: <UserCircle size={20} />,
      label: "My Profile",
      path: "/profile",
    },
    {
      icon: <Settings size={20} />,
      label: "Settings",
      path: "/settings",
    }
  ];

  // Handle link click - close sidebar on mobile
  const handleLinkClick = (path) => {
    navigate(path);
    if (width <= 816) {
      onClose?.();
    }
  };

  const SidebarLink = ({ icon, label, onClick, active = false, badge, compact = false }) => {
    return (
      <motion.button
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
        onClick={onClick}
        className={`flex items-center justify-between w-full px-3 py-3 rounded-xl transition-all duration-200 group ${
          active
            ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg"
            : `text-gray-600 ${theme === "dark" ? 'dark:text-gray-300 hover:bg-blue-900/20 hover:text-blue-400' : 'hover:bg-blue-50 hover:text-blue-600'}`
        } ${compact ? 'justify-center' : ''}`}
        title={compact ? label : undefined}
      >
        <div className={`flex items-center ${compact ? 'justify-center' : 'space-x-3'}`}>
          <div className={`transition-transform duration-200 group-hover:scale-110 ${
            active ? "text-white" : `text-gray-400 ${theme === "dark" ? 'group-hover:text-blue-400' : 'group-hover:text-blue-500'}`
          }`}>
            {icon}
          </div>
          {!compact && (
            <span className="font-medium text-sm">{label}</span>
          )}
        </div>
        {!compact && badge && (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            active 
              ? "bg-white/20 text-white" 
              : `bg-blue-100 text-blue-600 ${theme === "dark" ? 'dark:bg-blue-900/30 dark:text-blue-400' : ''}`
          }`}>
            {badge}
          </span>
        )}
        {compact && badge && (
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 rounded-full" />
        )}
      </motion.button>
    );
  };

  const SectionHeader = ({ title, icon, sectionId, isExpanded, onToggle, compact = false }) => {
    if (compact) return null;

    return (
      <button
        onClick={() => onToggle(sectionId)}
        className="flex items-center justify-between w-full px-3 py-3 group"
      >
        <div className="flex items-center space-x-2">
          <div className="text-blue-500">{icon}</div>
          <span className={`text-xs font-semibold uppercase tracking-wide group-hover:text-gray-700 transition-colors ${
            theme === "dark" ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-500 group-hover:text-gray-700'
          }`}>
            {title}
          </span>
        </div>
        <motion.div
          animate={{ rotate: isExpanded ? 90 : 0 }}
          transition={{ duration: 0.2 }}
          className={`transition-colors ${theme === "dark" ? 'text-gray-400 group-hover:text-gray-300' : 'text-gray-400 group-hover:text-gray-600'}`}
        >
          <ChevronRight size={14} />
        </motion.div>
      </button>
    );
  };

  const toggleSection = (sectionId) => {
    setExpandedSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  // Handle sidebar width based on screen size
  useEffect(() => {
    if (width < 768) {
      setSidebarWidth(280);
    } else if (width < 1024) {
      setSidebarWidth(300);
    } else {
      setSidebarWidth(320);
    }
  }, [width]);

  // Auto-expand section when a link inside it becomes active
  useEffect(() => {
    const currentPath = location.pathname;
    const activeSection = navigationSections.find(section =>
      section.items.some(item => item.path === currentPath)
    );
    
    if (activeSection && !expandedSections[activeSection.id]) {
      setExpandedSections(prev => ({
        ...prev,
        [activeSection.id]: true
      }));
    }
  }, [location.pathname]);

  // Handle resize functionality
  const startResizing = (e) => {
    e.preventDefault();
    setIsResizing(true);
  };

  const stopResizing = () => {
    setIsResizing(false);
  };

  const resize = (e) => {
    if (isResizing) {
      const newWidth = e.clientX;
      if (newWidth >= 240 && newWidth <= 480) {
        setSidebarWidth(newWidth);
      }
    }
  };

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);
    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [isResizing]);

  const isCompact = sidebarWidth < 280;
  const isVeryCompact = sidebarWidth < 200;

  // Handle close function
  const handleClose = () => {
    if (width <= 816) {
      onClose?.();
    }
  };

  return (
    <>
      {/* Mobile menu button - Only show when sidebar is hidden on mobile */}
      {!sidebarVisible && width <= 816 && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed top-6 left-6 p-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl z-50 shadow-2xl border border-blue-300"
          onClick={() => setSidebarVisible(true)}
        >
          <Menu size={20} />
        </motion.button>
      )}

      {/* Mobile overlay */}
      <AnimatePresence>
        {sidebarVisible && width <= 816 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <motion.aside
        initial={false}
        animate={{ 
          x: width <= 816 ? (sidebarVisible ? 0 : -sidebarWidth) : 0,
          width: sidebarWidth
        }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        className={`h-screen overflow-hidden border-r fixed z-50 shadow-2xl flex ${
          theme === "dark" 
            ? 'bg-gray-900 border-gray-800' 
            : 'bg-white border-gray-200'
        }`}
        style={{ 
          width: sidebarWidth,
          position: 'fixed',
          left: 0,
          top: 0,
          bottom: 0
        }}
      >
        {/* Resize handle - Only show on desktop */}
        {width > 816 && (
          <div
            className="w-2 cursor-col-resize hover:bg-blue-500/20 active:bg-blue-500/40 transition-colors flex items-center justify-center"
            onMouseDown={startResizing}
          >
            <GripVertical size={12} className="text-gray-400" />
          </div>
        )}

        <div className="flex-1 flex flex-col">
          {/* Header */}
          <div className={`p-4 border-b shrink-0 ${
            theme === "dark" ? 'border-gray-800' : 'border-gray-100'
          }`}>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center shrink-0">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                {!isCompact && (
                  <div className="min-w-0 flex-1">
                    <h1 className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent truncate">
                      Herizon
                    </h1>
                    <p className={`text-xs truncate ${
                      theme === "dark" ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Women's Health
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center space-x-1">
                {!isVeryCompact && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={toggleTheme}
                    className={`p-2 rounded-xl transition-colors ${
                      theme === "dark" 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                    title="Toggle theme"
                  >
                    {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
                  </motion.button>
                )}
                
                <SignedIn>
                  <div className={isVeryCompact ? "scale-75" : ""}>
                    <UserButton />
                  </div>
                </SignedIn>
                
                {/* Close button for mobile */}
                {width <= 816 && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={handleClose}
                    className={`p-2 rounded-xl transition-colors ${
                      theme === "dark" 
                        ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                        : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                    }`}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>
            </div>

            {/* Auth Buttons */}
            <SignedOut>
              {!isCompact && (
                <div className="flex gap-2 mt-3">
                  <SignInButton mode="modal">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className={`flex-1 py-2 px-3 rounded-xl font-medium hover:shadow-lg transition-colors text-xs ${
                        theme === "dark" 
                          ? 'bg-gray-800 text-gray-300 hover:bg-gray-700' 
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      Sign In
                    </motion.button>
                  </SignInButton>

                  <SignUpButton mode="modal">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-2 px-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-medium hover:shadow-lg transition-all text-xs"
                    >
                      Get Started
                    </motion.button>
                  </SignUpButton>
                </div>
              )}
            </SignedOut>
          </div>

          {/* Navigation - This is the scrollable part */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-3 space-y-3">
              {/* Quick Actions */}
              <div>
                {!isCompact && (
                  <div className="flex items-center space-x-2 px-3 py-2">
                    <div className="text-blue-500"><Home size={14} /></div>
                    <span className={`text-xs font-semibold uppercase tracking-wide ${
                      theme === "dark" ? 'text-gray-400' : 'text-gray-500'
                    }`}>
                      Quick Access
                    </span>
                  </div>
                )}
                <div className="space-y-1">
                  {quickActions.map((action, index) => (
                    <SidebarLink
                      key={index}
                      icon={action.icon}
                      label={action.label}
                      onClick={() => handleLinkClick(action.path)}
                      active={action.active}
                      badge={action.badge}
                      compact={isCompact}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Sections */}
              {navigationSections.map((section) => (
                <div key={section.id}>
                  <SectionHeader
                    title={section.title}
                    icon={section.icon}
                    sectionId={section.id}
                    isExpanded={expandedSections[section.id]}
                    onToggle={toggleSection}
                    compact={isCompact}
                  />
                  <AnimatePresence>
                    {(!isCompact || expandedSections[section.id]) && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="space-y-1 overflow-hidden"
                      >
                        {section.items.map((item, index) => (
                          <SidebarLink
                            key={index}
                            icon={item.icon}
                            label={item.label}
                            onClick={() => handleLinkClick(item.path)}
                            active={item.active}
                            badge={item.badge}
                            compact={isCompact}
                          />
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className={`p-3 border-t shrink-0 ${
            theme === "dark" ? 'border-gray-800' : 'border-gray-100'
          }`}>
            <div className="space-y-1">
              {bottomLinks.map((link, index) => (
                <SidebarLink
                  key={index}
                  icon={link.icon}
                  label={link.label}
                  onClick={() => handleLinkClick(link.path)}
                  compact={isCompact}
                />
              ))}
              <SignedIn>
                <SidebarLink
                  icon={<LogOut size={20} />}
                  label="Sign Out"
                  onClick={() => {/* Handle sign out */}}
                  compact={isCompact}
                />
              </SignedIn>
            </div>
            
            {/* Version Info */}
            {!isCompact && (
              <div className={`mt-3 pt-3 border-t ${
                theme === "dark" ? 'border-gray-800' : 'border-gray-100'
              }`}>
                <p className={`text-xs text-center ${
                  theme === "dark" ? 'text-gray-400' : 'text-gray-500'
                }`}>
                  Herizon v2.1.0
                </p>
              </div>
            )}
          </div>
        </div>
      </motion.aside>
    </>
  );
}