import { useState, useEffect } from "react";
import { ChevronRight, Droplet, Calendar, User, Scale, Target, Apple, AlertCircle } from "lucide-react";
import SideBar from "../components/SideBar";
import { useTheme } from "../context/ThemeContext";
import useScreenSize from "../hooks/useScreenSize";

const getAIResponse = async (prompt) => {
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
  if (!apiKey) throw new Error("API key missing. Add VITE_GEMINI_API_KEY in .env.");

  const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
  const payload = { contents: [{ role: "user", parts: [{ text: prompt }] }] };

  let retries = 0;
  const maxRetries = 3;

  while (retries < maxRetries) {
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        return result.candidates?.[0]?.content?.parts?.[0]?.text || "";
      } else if (res.status === 429) {
        await new Promise((r) => setTimeout(r, 1000 * Math.pow(2, retries)));
        retries++;
      } else {
        throw new Error(`Error ${res.status}: ${await res.text()}`);
      }
    } catch (err) {
      if (retries === maxRetries - 1) throw err;
      retries++;
    }
  }
  throw new Error("Failed after multiple retries.");
};

const formatResponse = (text) => {
  if (!text) return null;

  text = text.replace(/\*\*/g, "").replace(/\*/g, "");

  return text.split("\n").map((line, i) => {
    const l = line.trim();

    if (/^Day\s*\d+/i.test(l)) {
      return (
        <h4 key={i} className="text-lg font-bold text-pink-600 dark:text-pink-400 mt-6 mb-3 pb-2 border-b border-pink-200 dark:border-pink-700">
          {l}
        </h4>
      );
    }
    if (/^(Breakfast|Lunch|Dinner|Snacks|Notes)/i.test(l)) {
      return (
        <div key={i} className="flex items-center mt-4 mb-2">
          <div className="w-2 h-2 bg-pink-500 rounded-full mr-3"></div>
          <p className="font-semibold text-pink-700 dark:text-pink-300 text-lg">
            {l}
          </p>
        </div>
      );
    }
    if (l.startsWith("-")) {
      return (
        <li key={i} className="ml-8 list-disc text-gray-700 dark:text-gray-300 py-1">
          {l.replace(/^[-]\s*/, "")}
        </li>
      );
    }
    return (
      <p key={i} className="text-gray-700 dark:text-gray-300 mt-2 leading-relaxed">
        {l}
      </p>
    );
  });
};

const DietPlan = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    weight: "",
    preference: "",
    allergies: "",
    goals: "",
    lastPeriod: "",
    cycleLength: "",
    periodDuration: "",
  });
  const [recommendation, setRecommendation] = useState("");
  const [phase, setPhase] = useState("");
  const [loading, setLoading] = useState(false);

  const [sidebarVisible, setSidebarVisible] = useState(true);
  const { theme, toggleTheme } = useTheme();
  const { width } = useScreenSize();

  useEffect(() => setSidebarVisible(width >= 816), [width]);
  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);

  const handleChange = (e) =>
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const calculatePhase = () => {
    const lastDate = new Date(formData.lastPeriod);
    const today = new Date();
    const diff = Math.floor((today - lastDate) / (1000 * 60 * 60 * 24));
    const cycleLength = parseInt(formData.cycleLength);
    const dayInCycle = diff % cycleLength;

    if (dayInCycle <= formData.periodDuration) return "Menstrual";
    if (dayInCycle <= 14) return "Follicular";
    if (dayInCycle <= 16) return "Ovulatory";
    return "Luteal";
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setRecommendation("");

    const currentPhase = calculatePhase();
    setPhase(currentPhase);

    const prompt = `
      You are a female health and nutrition assistant.
      Generate a vegetarian diet plan for the "${currentPhase}" phase of a menstrual cycle.
      Personalize it for:
      Name: ${formData.name}, Age: ${formData.age}, Weight: ${formData.weight}kg,
      Preference: ${formData.preference}, Allergies: ${formData.allergies}, Goals: ${formData.goals}.
      Keep it structured by days and meals, short and friendly.
      Do NOT use markdown or asterisks (*, **). Only plain text.
    `;

    try {
      const text = await getAIResponse(prompt);
      setRecommendation(text || "No response generated.");
    } catch (err) {
      setRecommendation(err.message);
    } finally {
      setLoading(false);
    }
  };

  const inputFields = [
    { label: "Full Name", name: "name", type: "text", icon: User },
    { label: "Age", name: "age", type: "number", icon: User },
    { label: "Weight (kg)", name: "weight", type: "number", icon: Scale },
    { label: "Diet Preference", name: "preference", type: "text", icon: Apple },
    { label: "Allergies", name: "allergies", type: "text", icon: AlertCircle },
    { label: "Health Goals", name: "goals", type: "text", icon: Target },
    { label: "First Day of Last Period", name: "lastPeriod", type: "date", icon: Calendar },
    { label: "Cycle Length (days)", name: "cycleLength", type: "number", icon: Calendar },
    { label: "Period Duration (days)", name: "periodDuration", type: "number", icon: Calendar },
  ];

  const getPhaseColor = (phase) => {
    switch (phase) {
      case "Menstrual": return "from-purple-500 to-pink-500";
      case "Follicular": return "from-blue-500 to-teal-500";
      case "Ovulatory": return "from-green-500 to-emerald-500";
      case "Luteal": return "from-orange-500 to-red-500";
      default: return "from-pink-500 to-purple-500";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={19}
        toggleDarkMode={toggleTheme}
      />

      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed top-4 z-50 w-10 h-10 p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-r-md flex items-center justify-center transition-all duration-300 shadow-lg hover:shadow-xl"
          style={{ left: sidebarVisible ? "256px" : "0px" }}
        >
          <ChevronRight
            size={14}
            className={`transition-transform ${sidebarVisible ? "rotate-180" : "rotate-0"}`}
          />
        </button>
      )}

      <div
        className={`flex-1 p-4 sm:p-8 text-gray-800 dark:text-gray-100 transition-all duration-300 overflow-y-auto ${
          width > 816 && sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="relative">
                <div className="absolute inset-0 bg-pink-400 dark:bg-pink-600 rounded-full blur-md opacity-30"></div>
                <Droplet className="relative text-pink-600 dark:text-pink-400 w-10 h-10 mr-3" />
              </div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                CycleSync Diet Planner
              </h1>
            </div>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get a personalized vegetarian diet plan tailored to your current menstrual phase for optimal health and wellness.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form Section */}
            <div className="lg:col-span-2">
              <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <style>
                  {`
                    input:-webkit-autofill {
                      -webkit-box-shadow: 0 0 0px 1000px #f8fafc inset !important;
                      -webkit-text-fill-color: #1f2937 !important;
                      transition: background-color 5000s ease-in-out 0s;
                    }
                    .dark input:-webkit-autofill {
                      -webkit-box-shadow: 0 0 0px 1000px #374151 inset !important;
                      -webkit-text-fill-color: #f3f4f6 !important;
                    }
                  `}
                </style>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {inputFields.map(({ label, name, type, icon: Icon }) => (
                      <div key={name} className="relative group">
                        <div className="absolute left-4 top-1/2 transform -translate-y-1/2 z-10">
                          <Icon size={18} className="text-pink-500 dark:text-pink-400" />
                        </div>
                        <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2 ml-8">
                          {label}
                        </label>
                        <input
                          type={type}
                          name={name}
                          value={formData[name]}
                          onChange={handleChange}
                          required
                          className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 dark:border-gray-600 rounded-xl bg-gray-50 dark:bg-gray-700 text-gray-900 dark:text-gray-100 focus:border-pink-500 focus:ring-2 focus:ring-pink-200 dark:focus:ring-pink-800 transition-all duration-200"
                          placeholder={`Enter ${label.toLowerCase()}`}
                        />
                      </div>
                    ))}
                  </div>
                  
                  <button
                    type="submit"
                    disabled={loading}
                    className={`w-full font-bold py-4 px-6 rounded-xl shadow-lg transition-all duration-200 ${
                      loading
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:scale-105 hover:shadow-xl transform"
                    }`}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                        Generating Your Plan...
                      </div>
                    ) : (
                      "Generate Personalized Diet Plan"
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Info Section */}
            <div className="lg:col-span-1">
              <div className="bg-gradient-to-br from-pink-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-3xl shadow-xl p-6 border border-pink-200 dark:border-pink-800">
                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200 mb-4">
                  How It Works
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">1</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Fill in your personal details and menstrual cycle information
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">2</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      We calculate your current menstrual phase automatically
                    </p>
                  </div>
                  <div className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm font-bold">3</span>
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      Get a personalized vegetarian diet plan for your phase
                    </p>
                  </div>
                </div>

                {phase && (
                  <div className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl shadow-inner">
                    <h4 className="font-semibold text-gray-800 dark:text-gray-200 mb-2">
                      Current Phase
                    </h4>
                    <div className={`inline-flex items-center px-3 py-1 rounded-full bg-gradient-to-r ${getPhaseColor(phase)} text-white font-semibold`}>
                      <div className="w-2 h-2 bg-white rounded-full mr-2"></div>
                      {phase}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Results Section */}
          {recommendation && (
            <div className="mt-8 bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-200">
                    Your Personalized Diet Plan
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">
                    Tailored for your {phase} phase
                  </p>
                </div>
                {phase && (
                  <div className={`px-4 py-2 rounded-full bg-gradient-to-r ${getPhaseColor(phase)} text-white font-semibold shadow-lg`}>
                    {phase} Phase
                  </div>
                )}
              </div>
              
              <div className="bg-gradient-to-br from-gray-50 to-pink-50 dark:from-gray-700 dark:to-gray-600 rounded-2xl p-6 border border-gray-200 dark:border-gray-600">
                <div className="prose prose-pink dark:prose-invert max-w-none">
                  {formatResponse(recommendation)}
                </div>
              </div>
              
              <div className="mt-6 text-center">
                <button 
                  onClick={() => window.print()}
                  className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:scale-105 transition-all duration-200"
                >
                  <Droplet size={18} className="mr-2" />
                  Save or Print Plan
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DietPlan;