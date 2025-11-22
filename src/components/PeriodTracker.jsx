import React, { useState, useMemo, useEffect } from "react";
import { format, addDays } from "date-fns";
import { useNavigate } from "react-router-dom";
import { useAuth, useUser } from "@clerk/clerk-react";
import {
  Smile, Frown, Angry, Coffee, Moon, Zap, ChevronLeft, ChevronRight, HeartPulse,
} from "lucide-react";
import axios from "axios";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";
import { motion, AnimatePresence } from "framer-motion";

const server_url = import.meta.env.VITE_SERVER_URL;

const moodOptions = [
  { name: "Happy", icon: Smile },
  { name: "Sad", icon: Frown },
  { name: "Calm", icon: Coffee },
  { name: "Angry", icon: Angry },
  { name: "Tired", icon: Moon },
  { name: "Energized", icon: Zap },
];

const moodSeverityOptions = [
  { name: "Low", value: "low" },
  { name: "Medium", value: "medium" },
  { name: "High", value: "high" },
];

const symptomOptions = [
  "Lower Abdomen Cramps",
  "Back Pain",
  "Bloating",
  "Fatigue",
  "Headaches",
  "Nausea",
  "Sleep Disruption",
  "Digestive Issues",
];

const symptomSeverityOptions = ["None", "Mild", "Moderate", "Severe"];
const sleepQualityOptions = ["Poor", "Fair", "Good", "Excellent"];

const steps = [
  "Cycle Info",
  "Mood",
  "Symptoms",
  "Sleep",
  "Health Tips"
];

export function PeriodTracker() {
  const navigate = useNavigate();
  const { isLoaded, isSignedIn } = useAuth();
  const { user } = useUser();
  const { width } = useScreenSize();
  
  const [sidebarVisible, setSidebarVisible] = useState(true);

  useEffect(() => {
    if (isLoaded && !isSignedIn) {
      navigate("/login");
    }
  }, [isLoaded, isSignedIn, navigate]);

  // State for each step
  const [step, setStep] = useState(0);

  // Cycle Info
  const [cycleDuration, setCycleDuration] = useState("");
  const [lastPeriodStart, setLastPeriodStart] = useState("");
  const [lastPeriodDuration, setLastPeriodDuration] = useState("");
  const [nextPeriodPrediction, setNextPeriodPrediction] = useState("");

  // Mood
  const [moodTypes, setMoodTypes] = useState([]);
  const [moodSeverity, setMoodSeverity] = useState("");
  const [moodDate, setMoodDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // Symptoms
  const [symptoms, setSymptoms] = useState([]);
  const [symptomSeverities, setSymptomSeverities] = useState({});
  const [symptomDate, setSymptomDate] = useState(format(new Date(), "yyyy-MM-dd"));

  // Sleep
  const [sleepDuration, setSleepDuration] = useState("");
  const [sleepQuality, setSleepQuality] = useState("");

  // Misc
  const [showHealthTips, setShowHealthTips] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Predict next period when info changes
  useEffect(() => {
    if (lastPeriodStart && cycleDuration) {
      const nextPeriodDate = addDays(
        new Date(lastPeriodStart),
        parseInt(cycleDuration)
      );
      setNextPeriodPrediction(format(nextPeriodDate, "yyyy-MM-dd"));
    }
  }, [lastPeriodStart, cycleDuration]);

  // Health tips
  const generateHealthTips = useMemo(() => {
    const tips = [];
    if (cycleDuration) {
      const cycleDurationInt = parseInt(cycleDuration);
      if (cycleDurationInt < 21) {
        tips.push("Your cycle is shorter than average. Consider consulting with a healthcare professional.");
      } else if (cycleDurationInt > 35) {
        tips.push("Your cycle is longer than average. You may want to discuss it with your doctor.");
      } else {
        tips.push("Your cycle length is within the normal range.");
      }
    }
    if (lastPeriodDuration) {
      const periodDuration = parseInt(lastPeriodDuration);
      if (periodDuration > 7) {
        tips.push("Your period duration is longer than average. If this is consistent, consult your healthcare provider.");
      } else if (periodDuration < 3) {
        tips.push("Your period duration is shorter than average. Track consistently to identify patterns.");
      } else {
        tips.push("Your period duration is within the normal range.");
      }
    }
    if (symptoms.includes("Lower Abdomen Cramps")) {
      const severity = symptomSeverities["Lower Abdomen Cramps"] || "Not specified";
      if (severity === "Severe") {
        tips.push("For severe cramps, try pain relievers, a heating pad, and gentle exercise. If pain is debilitating, consult your doctor.");
      } else {
        tips.push("For cramps, try a heating pad, gentle yoga, or over-the-counter pain relievers.");
      }
    }
    if (symptoms.includes("Fatigue")) {
      tips.push("Combat fatigue by ensuring adequate iron intake, hydration, and rest.");
    }
    if (symptoms.includes("Bloating")) {
      tips.push("To reduce bloating, limit salt, avoid carbonated drinks, and eat smaller meals.");
    }
    if (sleepQuality === "Poor" || sleepQuality === "Fair") {
      tips.push("Improve sleep by keeping a regular schedule and avoiding caffeine/screens before bed.");
    }
    if (moodTypes.includes("Sad") || moodTypes.includes("Angry")) {
      tips.push("Mood changes are normal. Exercise, mindfulness, and sleep can help.");
    }
    if (tips.length === 0) {
      tips.push("Keep tracking your cycle for more personalized insights.");
    }
    return tips;
  }, [
    cycleDuration,
    lastPeriodDuration,
    symptoms,
    symptomSeverities,
    sleepQuality,
    moodTypes,
  ]);

  // Handlers
  const handleMoodTypeChange = (moodName) => {
    setMoodTypes((prev) =>
      prev.includes(moodName)
        ? prev.filter((mood) => mood !== moodName)
        : [...prev, moodName]
    );
  };
  const handleSymptomChange = (symptom) => {
    setSymptoms((prev) =>
      prev.includes(symptom)
        ? prev.filter((s) => s !== symptom)
        : [...prev, symptom]
    );
  };
  const handleSymptomSeverityChange = (symptom, severity) => {
    setSymptomSeverities((prev) => ({
      ...prev,
      [symptom]: severity,
    }));
  };

  // Submission
  const handleSubmit = async () => {
    if (!isSignedIn || !user) {
      alert("You must be logged in to submit data");
      navigate("/login");
      return;
    }
    setSubmitting(true);
    const submissionData = {
      userId: user.id,
      cycleDuration,
      lastPeriodStart,
      lastPeriodDuration,
      moodTypes,
      moodSeverity,
      moodDate,
      symptoms,
      symptomSeverities,
      symptomDate,
      sleepDuration,
      sleepQuality,
      nextPeriodPrediction,
    };
    try {
      const token = await user.getToken();
      await axios.post(
        `${server_url}/api/period/trackerdata`,
        submissionData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setShowHealthTips(true);
      setStep(steps.length - 1);
      alert("Data submitted successfully!");
    } catch (error) {
      alert("Error submitting data. Please try again.");
    }
    setSubmitting(false);
  };

  // Stepper UI
  const StepIndicator = () => (
    <div className="flex items-center justify-center gap-2 mb-8">
      {steps.map((label, idx) => (
        <div key={label} className="flex items-center">
          <div
            className={`w-8 h-8 flex items-center justify-center rounded-full font-bold text-sm
              ${idx === step ? "bg-pink-500 text-black" : "bg-zinc-200 dark:bg-zinc-700 text-zinc-600 dark:text-black"}
            `}
          >
            {idx + 1}
          </div>
          {idx < steps.length - 1 && (
            <div className="w-8 h-1 bg-zinc-300 dark:bg-zinc-700 mx-1 rounded" />
          )}
        </div>
      ))}
    </div>
  );

  // Step content
  const stepContent = [
    // Step 0: Cycle Info
    <motion.div key="cycle" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Cycle Information</h2>
      <div className="grid gap-4">
        <div>
          <label className="block text-sm mb-1">Average Cycle Duration (days)</label>
          <input type="number" min="1" value={cycleDuration} onChange={e=>setCycleDuration(e.target.value)}
            className="w-full px-4 py-2 text-black rounded border focus:ring-2 focus:ring-pink-400"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Last Period Start Date</label>
          <input type="date" value={lastPeriodStart} onChange={e=>setLastPeriodStart(e.target.value)}
            className="w-full px-4 py-2 text-black rounded border focus:ring-2 focus:ring-pink-400"/>
        </div>
        <div>
          <label className="block text-sm mb-1">Last Period Duration (days)</label>
          <input type="number" min="1" value={lastPeriodDuration} onChange={e=>setLastPeriodDuration(e.target.value)}
            className="w-full px-4 py-2 text-black rounded border focus:ring-2 focus:ring-pink-400"/>
        </div>
        {nextPeriodPrediction && (
          <div className="p-3 rounded bg-pink-50 dark:bg-pink-900/20 border border-pink-200 dark:border-pink-800 mt-2">
            <span className="text-pink-700 dark:text-pink-300 font-medium">
              Next period predicted: {nextPeriodPrediction}
            </span>
          </div>
        )}
      </div>
    </motion.div>,

    // Step 1: Mood
    <motion.div key="mood" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Mood Tracking</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Date</label>
        <input type="date" value={moodDate} onChange={e=>setMoodDate(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-pink-400"/>
      </div>
      <div className="mb-4">
        <label className="block text-sm mb-1">Mood Types</label>
        <div className="flex flex-wrap gap-3">
          {moodOptions.map((mood) => {
            const MoodIcon = mood.icon;
            const isSelected = moodTypes.includes(mood.name);
            return (
              <button key={mood.name} type="button"
                onClick={() => handleMoodTypeChange(mood.name)}
                className={`flex items-center gap-2 px-4 py-2 rounded border text-sm transition-colors
                  ${isSelected
                    ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 border-pink-200"
                    : "bg-white dark:bg-zinc-800 text-zinc-700 border-gray-300 hover:bg-pink-50"}
                `}
              >
                <MoodIcon className="w-5 h-5" />
                {mood.name}
              </button>
            );
          })}
        </div>
      </div>
      <div>
        <label className="block text-sm mb-1">Mood Intensity</label>
        <div className="flex gap-3">
          {moodSeverityOptions.map((option) => (
            <button key={option.value} type="button"
              onClick={() => setMoodSeverity(option.value)}
              className={`px-4 py-2 rounded border text-sm
                ${moodSeverity === option.value
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 border-pink-200"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 border-gray-300 hover:bg-pink-50"}
              `}
            >
              {option.name}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,

    // Step 2: Symptoms
    <motion.div key="symptoms" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Symptom Tracking</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Date</label>
        <input type="date" value={symptomDate} onChange={e=>setSymptomDate(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-pink-400"/>
      </div>
      <div>
        <label className="block text-sm mb-1">Symptoms</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {symptomOptions.map((symptom) => {
            const isSelected = symptoms.includes(symptom);
            return (
              <div key={symptom} className="flex flex-col gap-1">
                <label className="flex items-center gap-2">
                  <input type="checkbox" checked={isSelected}
                    onChange={() => handleSymptomChange(symptom)}
                    className="h-4 w-4 text-pink-500 rounded border-gray-300"/>
                  {symptom}
                </label>
                {isSelected && (
                  <div className="flex gap-2 ml-6">
                    {symptomSeverityOptions.map((severity) => (
                      <button key={severity} type="button"
                        onClick={() => handleSymptomSeverityChange(symptom, severity)}
                        className={`px-3 py-1 rounded text-xs border
                          ${symptomSeverities[symptom] === severity
                            ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 border-pink-200"
                            : "bg-white dark:bg-zinc-800 text-zinc-700 border-gray-300 hover:bg-pink-50"}
                        `}
                      >
                        {severity}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </motion.div>,

    // Step 3: Sleep
    <motion.div key="sleep" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Sleep Tracking</h2>
      <div className="mb-4">
        <label className="block text-sm mb-1">Sleep Duration (hours)</label>
        <input type="number" min="0" max="24" step="0.5" value={sleepDuration}
          onChange={e=>setSleepDuration(e.target.value)}
          className="w-full px-4 py-2 rounded border focus:ring-2 focus:ring-pink-400"/>
      </div>
      <div>
        <label className="block text-sm mb-1">Sleep Quality</label>
        <div className="flex gap-3">
          {sleepQualityOptions.map((quality) => (
            <button key={quality} type="button"
              onClick={() => setSleepQuality(quality)}
              className={`px-4 py-2 rounded text-sm border
                ${sleepQuality === quality
                  ? "bg-pink-100 dark:bg-pink-900/30 text-pink-700 border-pink-200"
                  : "bg-white dark:bg-zinc-800 text-zinc-700 border-gray-300 hover:bg-pink-50"}
              `}
            >
              {quality}
            </button>
          ))}
        </div>
      </div>
    </motion.div>,

    // Step 4: Health Tips
    <motion.div key="tips" initial={{opacity:0, y:20}} animate={{opacity:1, y:0}} exit={{opacity:0, y:-20}}>
      <h2 className="text-xl font-bold mb-4 text-pink-600">Personalized Health Tips</h2>
      <div className="space-y-3">
        {generateHealthTips.map((tip, idx) => (
          <div key={idx} className="flex items-start gap-3 p-3 bg-pink-50 dark:bg-pink-900/10 border border-pink-100 dark:border-pink-800 rounded-md">
            <HeartPulse className="w-5 h-5 text-pink-500 flex-shrink-0 mt-0.5" />
            <span className="text-sm text-zinc-800 dark:text-zinc-200">{tip}</span>
          </div>
        ))}
      </div>
    </motion.div>
  ];

  // Navigation
  const canGoBack = step > 0;
  const canGoNext = step < steps.length - 1;
  const canSubmit = step === steps.length - 2;

  return (
    <div className="min-h-screen bg-zinc-100 dark:bg-zinc-900 text-zinc-800 dark:text-zinc-100 transition-colors duration-300">
      {/* Sidebar - Fixed positioning */}
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={5}
      />
      
      {/* Main Content Area */}
      <div className={`transition-all duration-300 ease-in-out min-h-screen ${
        sidebarVisible && width > 816 ? "lg:ml-80" : "ml-0"
      }`}>
        {/* Top toggle button - only show on larger screens */}
        {width > 816 && (
          <button
            onClick={() => setSidebarVisible(!sidebarVisible)}
            className={`fixed left-4 z-40 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-lg transition-all duration-300 ease-out hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl hover:scale-110 ${
              sidebarVisible ? 'ml-64' : 'ml-2'
            }`}
            style={{ top: '24px' }}
            aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
          >
            <ChevronRight
              size={20}
              className={`transition-transform duration-300 ${
                sidebarVisible ? "rotate-180" : "rotate-0"
              }`}
            />
          </button>
        )}

        {/* Main Content */}
        <main className="relative">
          <div className="max-w-4xl mx-auto px-6 py-8">
            <div className="w-full bg-white dark:bg-zinc-800 rounded-xl shadow-lg p-8">
              <StepIndicator />
              <AnimatePresence mode="wait">
                {stepContent[step]}
              </AnimatePresence>
              <div className="flex justify-between mt-8">
                <button
                  onClick={() => setStep((s) => Math.max(0, s - 1))}
                  disabled={!canGoBack}
                  className={`flex items-center gap-1 px-4 py-2 rounded font-medium border transition-colors
                    ${canGoBack
                      ? "bg-zinc-200 dark:bg-zinc-700 text-zinc-700 dark:text-zinc-200 hover:bg-zinc-300"
                      : "bg-zinc-100 dark:bg-zinc-800 text-zinc-400 cursor-not-allowed"}
                  `}
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                {canGoNext && (
                  <button
                    onClick={() => setStep((s) => Math.min(steps.length - 1, s + 1))}
                    className="flex items-center gap-1 px-4 py-2 rounded font-medium bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  >
                    Next <ChevronRight className="w-4 h-4" />
                  </button>
                )}
                {canSubmit && (
                  <button
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="flex items-center gap-1 px-4 py-2 rounded font-medium bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  >
                    {submitting ? "Submitting..." : "Submit"}
                  </button>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}