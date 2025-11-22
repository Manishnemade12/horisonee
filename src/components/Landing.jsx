import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  HeartPulse,
  GraduationCap,
  ShoppingBag,
  ActivitySquare,
  ClipboardList,
  Stethoscope,
  Bot,
  HeartHandshake,
  ChevronRight,
  Handshake,
  Check,
  UsersRound,
  ArrowRight,
  Star,
  Shield,
  Users,
  Calendar,
  Microscope,
  Brain,
  Baby,
  Activity,
  Tablet,
  ShieldCheck,
  Zap,
  Target,
  BarChart3,
  Clock,
  Cloud,
  Cpu,
  Database,
  Sparkles,
  Circle,
  UserCheck
} from "lucide-react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import FAQSection from './FAQSection';

export function Landing() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const { width } = useScreenSize();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  const features = [
    {
      icon: <Brain className="w-8 h-8" />,
      title: "AI Health Assistant",
      description: "24/7 personalized health guidance and symptom analysis",
      gradient: "from-purple-500 to-pink-500",
      stats: "94% accuracy",
      path: "/ChatBot",
      onClick: () => navigate("/ChatBot")
    },
    {
      icon: <ActivitySquare className="w-8 h-8" />,
      title: "Smart Tracking",
      description: "Advanced cycle and symptom pattern recognition",
      gradient: "from-blue-500 to-cyan-500",
      stats: "10M+ data points",
        path: "/tracker",
      onClick: () => navigate("/tracker")
    },
    {
      icon: <UsersRound className="w-8 h-8" />,
      title: "Expert Network",
      description: "Connect with specialized healthcare professionals",
      gradient: "from-green-500 to-emerald-500",
      stats: "500+ doctors",
              path: "/consultations",
      onClick: () => navigate("/consultations")

    },
    {
      icon: <ShieldCheck className="w-8 h-8" />,
      title: "Secure Platform",
      description: "Your health data is protected with enterprise-grade security",
      gradient: "from-orange-500 to-red-500",
      stats: "100% encrypted",
              path: "/parents",
      onClick: () => navigate("/parents")
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      {/* Sidebar - Fixed positioning */}
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={1}
        onClose={() => setSidebarVisible(false)}
      />

      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out ${sidebarVisible && width > 816 ? "lg:ml-80" : "ml-0"
        }`}>
        {/* Top toggle button - only show on larger screens */}
        {width > 816 && (
          <button
            onClick={toggleSidebar}
            className={`fixed left-4 z-40 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-lg transition-all duration-300 ease-out hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl hover:scale-110 ${isScrolled ? 'top-24' : 'top-6'
              } ${sidebarVisible ? 'ml-64' : 'ml-2'
              }`}
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <ChevronRight
              size={20}
              className={`transition-transform duration-300 ${sidebarVisible ? "rotate-180" : "rotate-0"
                }`}
            />
          </button>
        )}

        {/* Main Content */}
        <main className="relative">
          {/* Floating Action Button */}
          <div className="fixed bottom-8 right-8 z-40">
            <div
              onClick={() => navigate("/Chatbot")}
              className="group relative cursor-pointer"
            >
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
              <div className="relative bg-gradient-to-br from-purple-600 to-pink-600 p-4 rounded-2xl shadow-2xl border border-white/20 backdrop-blur-md transform transition-all duration-500 group-hover:scale-110 group-hover:rotate-12">
                <Bot className="w-8 h-8 text-white" />
                <div className="absolute -top-2 -right-2 bg-white dark:bg-gray-800 text-purple-600 text-xs font-bold px-2 py-1 rounded-full shadow-lg border border-purple-200 dark:border-purple-800">
                  AI
                </div>
              </div>
            </div>
          </div>

          {/* Content Container with proper sidebar spacing */}
          <div className="max-w-7xl mx-auto space-y-24 px-6 py-12">
            {/* Enhanced Hero Section */}
            <section className="relative min-h-[90vh] flex items-center">
              {/* Background Elements */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-500/10 rounded-full blur-3xl"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
              </div>

              <div className="relative grid lg:grid-cols-2 gap-16 items-center w-full">
                <div className="space-y-8">
                  {/* Badge */}
                  <div className="inline-flex items-center gap-3 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-purple-700 dark:text-purple-300 px-6 py-3 rounded-2xl text-sm font-semibold border border-purple-200 dark:border-purple-800 shadow-lg">
                    <Sparkles className="w-5 h-5" />
                    AI-Powered Women's Health Platform
                  </div>

                  {/* Main Heading */}
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight">
                    <span className="bg-gradient-to-r from-gray-900 via-purple-700 to-pink-600 dark:from-white dark:via-purple-300 dark:to-pink-400 bg-clip-text text-transparent">
                      Revolutionizing
                    </span>
                    <br />
                    <span className="bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
                      Women's Healthcare
                    </span>
                  </h1>

                  {/* Description */}
                  <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 leading-relaxed">
                    Experience the future of women's health with our intelligent platform that combines
                    cutting-edge AI, personalized insights, and expert care in one seamless experience.
                  </p>

                  {/* CTA Buttons */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => navigate("/Signup")}
                      className="group relative bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:from-purple-500 hover:to-pink-500 transform transition-all duration-500 hover:scale-105 shadow-xl hover:shadow-2xl"
                    >
                      <span className="relative z-10 flex items-center gap-3">
                        Start Your Journey
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    </button>

                    <button
                      onClick={() => navigate("/demo")}
                      className="group border-2 border-purple-200 dark:border-purple-800 text-purple-600 dark:text-purple-400 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:border-purple-300 dark:hover:border-purple-700 hover:bg-purple-50 dark:hover:bg-purple-900/20 transform transition-all duration-500 hover:scale-105"
                    >
                      Watch Demo
                    </button>
                  </div>

                  {/* Trust Indicators */}
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 sm:gap-8 pt-8">
                    <div className="flex items-center gap-4">
                      <div className="flex -space-x-3">
                        {[1, 2, 3, 4].map((i) => (
                          <div key={i} className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full border-2 border-white dark:border-gray-800 shadow-lg"></div>
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="font-semibold">10,000+</div>
                        <div>Women Empowered</div>
                      </div>
                    </div>

                    <div className="hidden sm:block h-12 w-px bg-gray-300 dark:bg-gray-600"></div>

                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                        ))}
                      </div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">
                        <div className="font-semibold">4.9/5</div>
                        <div>Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Hero Visual */}
                <div className="relative">
                  <div className="relative bg-gradient-to-br from-white/80 to-purple-50/80 dark:from-gray-800/80 dark:to-purple-900/20 backdrop-blur-xl rounded-3xl p-6 sm:p-8 border border-white/50 dark:border-gray-700/50 shadow-2xl">
                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-4 sm:gap-6">
                      <div className="space-y-4 sm:space-y-6">
                        <FeatureVisualCard
                          icon={<ActivitySquare className="w-5 h-5 sm:w-6 sm:h-6" />}
                          title="Health Tracking"
                          value="94%"
                          subtitle="Accuracy"
                          color="purple"
                        />
                        <FeatureVisualCard
                          icon={<Brain className="w-5 h-5 sm:w-6 sm:h-6" />}
                          title="AI Predictions"
                          value="10M+"
                          subtitle="Data Points"
                          color="pink"
                        />
                      </div>
                      <div className="space-y-4 sm:space-y-6 mt-4 sm:mt-8">
                        <FeatureVisualCard
                          icon={<UsersRound className="w-5 h-5 sm:w-6 sm:h-6" />}
                          title="Expert Network"
                          value="500+"
                          subtitle="Doctors"
                          color="blue"
                        />
                        <FeatureVisualCard
                          icon={<ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />}
                          title="Secure & Private"
                          value="100%"
                          subtitle="Encrypted"
                          color="green"
                        />
                      </div>
                    </div>

                    {/* Animated Progress Bars */}
                    <div className="mt-6 sm:mt-8 space-y-4">
                      <ProgressBar label="Cycle Prediction" percentage={94} color="purple" />
                      <ProgressBar label="Symptom Analysis" percentage={89} color="pink" />
                      <ProgressBar label="Treatment Success" percentage={92} color="blue" />
                    </div>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute -top-2 -right-2 sm:-top-4 sm:-right-4 w-6 h-6 sm:w-8 sm:h-8 bg-purple-500 rounded-full blur-xl opacity-50 animate-pulse"></div>
                  <div className="absolute -bottom-2 -left-2 sm:-bottom-4 sm:-left-4 w-6 h-6 sm:w-8 sm:h-8 bg-pink-500 rounded-full blur-xl opacity-50 animate-pulse delay-1000"></div>
                </div>
              </div>
            </section>

            {/* Features Grid */}
            {/* <section>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Intelligent Health Features
                </h2>
                <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Powered by advanced AI and designed with women's unique health needs in mind
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                {features.map((feature, index) => (
                  <FeatureCard
                    key={index}
                    {...feature}
                    index={index}
                    onClick={() => navigate(`/feature-${feature.title.toLowerCase().replace(/\s+/g, '-')}`)}
                  />
                ))}
              </div>
            </section> */}
           <section>
  <div className="text-center mb-16">
    <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
      Intelligent Health Features
    </h2>
    <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
      Powered by advanced AI and designed with women's unique health needs in mind
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
    {features.map((feature, index) => (
      <FeatureCard
        key={index}
        {...feature}
        index={index}
        onClick={() => navigate(feature.path)}   // ✅ FIXED
      />
    ))}
  </div>
</section>



            {/* Stats Section */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <StatCard
                number="25,480"
                label="Women Helped"
                icon={<UsersRound className="w-5 h-5 sm:w-6 sm:h-6" />}
                color="purple"
              />
              <StatCard
                number="15,620"
                label="AI Consultations"
                icon={<Brain className="w-5 h-5 sm:w-6 sm:h-6" />}
                color="pink"
              />
              <StatCard
                number="94.7%"
                label="Accuracy Rate"
                icon={<Target className="w-5 h-5 sm:w-6 sm:h-6" />}
                color="blue"
              />
              <StatCard
                number="500+"
                label="Health Experts"
                icon={<Stethoscope className="w-5 h-5 sm:w-6 sm:h-6" />}
                color="green"
              />
            </section>

            {/* How It Works */}
            <section className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-3xl blur-3xl"></div>
              <div className="relative">
                <div className="text-center mb-16">
                  <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                    How Herizon Works
                  </h2>
                </div>

                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                  <StepCard
                    number="01"
                    title="Personal Assessment"
                    description="Complete your health profile with our intelligent onboarding process"
                    icon={<UserCheck className="w-7 h-7 sm:w-8 sm:h-8" />}
                    color="purple"
                  />
                  <StepCard
                    number="02"
                    title="AI-Powered Insights"
                    description="Receive personalized recommendations and health predictions"
                    icon={<Brain className="w-7 h-7 sm:w-8 sm:h-8" />}
                    color="pink"
                  />
                  <StepCard
                    number="03"
                    title="Continuous Care"
                    description="Track progress and get ongoing support from our platform"
                    icon={<HeartPulse className="w-7 h-7 sm:w-8 sm:h-8" />}
                    color="blue"
                  />
                </div>
              </div>
            </section>

            {/* Testimonials */}
            <section>
              <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
                  Trusted by Women Worldwide
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                <TestimonialCard
                  quote="Herizon helped me understand my body in ways I never thought possible. The AI insights are incredibly accurate!"
                  author="Sarah Chen"
                  role="Software Engineer"
                  rating={5}
                />
                <TestimonialCard
                  quote="As a busy professional, Herizon gives me the tools to manage my health without the stress. Life-changing!"
                  author="Maria Rodriguez"
                  role="Marketing Director"
                  rating={5}
                />
                <TestimonialCard
                  quote="The community support and expert access made all the difference in my health journey."
                  author="Dr. Emily Watson"
                  role="Physician"
                  rating={5}
                />
              </div>
            </section>

            {/* CTA Section */}
            <section>
              <div className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-black/10"></div>
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
                <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>

                <div className="relative">
                  <h3 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                    Ready to Transform Your Health Journey?
                  </h3>
                  <p className="text-lg sm:text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
                    Join thousands of women who have taken control of their health with Herizon's intelligent platform.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                      onClick={() => navigate("/Signup")}
                      className="bg-white text-purple-600 px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-gray-100 transform transition-all duration-500 hover:scale-105 shadow-2xl border-0"
                    >
                      Get Started Free
                    </button>
                    <button
                      onClick={() => navigate("/plans")}
                      className="border-2 border-white/30 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-2xl font-semibold hover:bg-white/10 transform transition-all duration-500 hover:scale-105"
                    >
                      View Plans
                    </button>
                  </div>
                  <p className="text-purple-200 text-sm mt-6">
                    No credit card required • 30-day free trial
                  </p>
                </div>
              </div>
            </section>

            <FAQSection />
            <EnhancedFooter />
          </div>
        </main>
      </div>
    </div>
  );
}

// Enhanced UI Components - ADDED BACK ALL MISSING COMPONENTS
const FeatureVisualCard = ({ icon, title, value, subtitle, color }) => {
  const colorClasses = {
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <div className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-4 border border-white/50 dark:border-gray-700/50 shadow-lg">
      <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-xl flex items-center justify-center text-white mb-3`}>
        {icon}
      </div>
      <div className="text-2xl font-bold text-gray-900 dark:text-white">{value}</div>
      <div className="text-sm font-semibold text-gray-700 dark:text-gray-300">{title}</div>
      <div className="text-xs text-gray-500 dark:text-gray-400">{subtitle}</div>
    </div>
  );
};

const ProgressBar = ({ label, percentage, color }) => {
  const colorClasses = {
    purple: "bg-gradient-to-r from-purple-500 to-pink-500",
    pink: "bg-gradient-to-r from-pink-500 to-rose-500",
    blue: "bg-gradient-to-r from-blue-500 to-cyan-500"
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between text-sm">
        <span className="font-medium text-gray-700 dark:text-gray-300">{label}</span>
        <span className="font-semibold text-gray-600 dark:text-gray-400">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
        <div
          className={`h-2 rounded-full ${colorClasses[color]} transition-all duration-1000 ease-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, gradient, stats, index, onClick }) => {
  return (
    <div
      onClick={onClick}
      className="group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
    >
      {/* Animated Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>

      {/* Icon */}
      <div className={`relative w-14 h-14 bg-gradient-to-br ${gradient} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>

      {/* Content */}
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed mb-4">
        {description}
      </p>

      {/* Stats */}
      <div className="text-sm font-semibold text-purple-600 dark:text-purple-400">
        {stats}
      </div>

      {/* Hover Arrow */}
      <div className="absolute bottom-6 right-6 text-purple-600 dark:text-purple-400 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-500">
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  );
};

const StatCard = ({ number, label, icon, color }) => {
  const colorClasses = {
    purple: "from-purple-500 to-pink-500",
    pink: "from-pink-500 to-rose-500",
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500">
      <div className={`w-12 h-12 bg-gradient-to-br ${colorClasses[color]} rounded-2xl flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-500`}>
        {icon}
      </div>
      <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
        {number}
      </div>
      <div className="text-gray-600 dark:text-gray-300 font-medium">
        {label}
      </div>
    </div>
  );
};

const StepCard = ({ number, title, description, icon, color }) => {
  const colorClasses = {
    purple: "text-purple-600 dark:text-purple-400",
    pink: "text-pink-600 dark:text-pink-400",
    blue: "text-blue-600 dark:text-blue-400"
  };

  return (
    <div className="group text-center bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500">
      <div className={`text-5xl font-black opacity-10 mb-4 ${colorClasses[color]} group-hover:opacity-20 transition-opacity duration-500`}>
        {number}
      </div>
      <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl flex items-center justify-center text-white group-hover:scale-110 transition-transform duration-500 ${color === 'purple' ? 'bg-gradient-to-br from-purple-500 to-pink-500' :
          color === 'pink' ? 'bg-gradient-to-br from-pink-500 to-rose-500' :
            'bg-gradient-to-br from-blue-500 to-cyan-500'
        }`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
        {description}
      </p>
    </div>
  );
};

const TestimonialCard = ({ quote, author, role, rating }) => {
  return (
    <div className="group bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-all duration-500">
      <div className="flex items-center gap-2 mb-4">
        {[...Array(5)].map((_, i) => (
          <Star
            key={i}
            className={`w-5 h-5 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
      <p className="text-gray-600 dark:text-gray-300 italic mb-6 leading-relaxed">
        "{quote}"
      </p>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-semibold">
          {author.split(' ').map(n => n[0]).join('')}
        </div>
        <div>
          <p className="font-semibold text-gray-900 dark:text-white">
            {author}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {role}
          </p>
        </div>
      </div>
    </div>
  );
};

const EnhancedFooter = () => {
  const navigate = useNavigate();

  return (
    <footer className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-100 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2">
            <h4 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-4">
              Herizon
            </h4>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md">
              The intelligent women's health platform combining AI-powered insights with compassionate care.
            </p>
            <div className="flex space-x-4">
              {[FaLinkedin, FaTwitter, FaInstagram].map((Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center hover:bg-purple-100 dark:hover:bg-purple-900/20 transition-colors duration-300"
                >
                  <Icon className="text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400" />
                </a>
              ))}
            </div>
          </div>

          {[
            {
              title: "Product",
              links: ["Features", "Pricing", "Case Studies", "API"]
            },
            {
              title: "Resources",
              links: ["Blog", "Help Center", "Community", "Research"]
            },
            {
              title: "Company",
              links: ["About", "Careers", "Contact", "Security"]
            }
          ].map((section, index) => (
            <div key={index}>
              <h4 className="font-semibold text-gray-900 dark:text-white mb-4">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors duration-300">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            © 2025 Herizon. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            {['Privacy', 'Terms', 'Cookies'].map((item) => (
              <a key={item} href="#" className="text-gray-600 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 text-sm transition-colors duration-300">
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
};

// Base component
const Card = ({ children, className = "" }) => {
  return (
    <div className={`bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-xl border border-gray-100 dark:border-gray-700 transition-all duration-300 ${className}`}>
      {children}
    </div>
  );
};

export default Landing;