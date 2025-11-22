import React, { useState, useEffect, useRef } from "react";
import { addDays, format } from "date-fns";
import { ChevronRight, Sun, Moon } from "lucide-react";
import SideBar from "./SideBar";
import OvulationImg from "../../public/ovulationsecimg.png";
import useScreenSize from "../hooks/useScreenSize";
import { useTheme } from "../context/ThemeContext";

const OvulationCalculator = () => {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [startDate, setStartDate] = useState("");
  const [gestationInfo, setGestationInfo] = useState(null);
  const [cycleLength, setCycleLength] = useState(28);
  const [results, setResults] = useState(null);

  const [lutealPhase, setLutealPhase] = useState(14);
  const [showDetails, setShowDetails] = useState(false);
  const [showShare, setShowShare] = useState(false);
  const resultsRef = useRef(null);

  const { width } = useScreenSize();
  const { theme, toggleTheme } = useTheme();

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };

  useEffect(() => {
    if (resultsRef.current && results) {
      resultsRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [results]);

  const handleLutealPhaseChange = (e) => {
    const val = parseInt(e.target.value);
    if (!isNaN(val) && val >= 10 && val <= 16) setLutealPhase(val);
  };

  const handleShare = () => {
    if (results) {
      const text = `My Ovulation Results:
Fertile Window: ${results.fertileWindow}
Ovulation Date: ${results.ovulationDate}
Next Period: ${results.nextPeriod}
${gestationInfo ? `Gestational Age: ${gestationInfo.gestationalAge}, Due Date: ${gestationInfo.dueDate}` : ""}
(Calculated via Herizon Ovulation Calculator)`;
      navigator.clipboard.writeText(text);
      setShowShare(true);
      setTimeout(() => setShowShare(false), 2000);
    }
  };

  const calculateOvulation = () => {
    if (!startDate || isNaN(new Date(startDate))) {
      alert("Please select a valid start date.");
      return;
    }

    const today = new Date();
    const start = new Date(startDate);
    const fiveYearsAgo = addDays(today, -365 * 5);

    if (start > today || start < fiveYearsAgo) {
      alert("Start date must be within the past 5 years and not in the future.");
      return;
    }

    if (isNaN(cycleLength) || cycleLength < 20 || cycleLength > 40) {
      alert("Cycle length must be between 20 and 40 days.");
      return;
    }

    if (isNaN(lutealPhase) || lutealPhase < 10 || lutealPhase > 16) {
      alert("Luteal phase must be between 10 and 16 days.");
      return;
    }

    const ovulationDate = addDays(start, cycleLength - lutealPhase);
    const fertileStart = addDays(ovulationDate, -4);
    const fertileEnd = addDays(ovulationDate, 1);
    const nextPeriod = addDays(start, cycleLength);

    setResults({
      ovulationDate: format(ovulationDate, "EEE MMM dd yyyy"),
      fertileWindow: `${format(fertileStart, "EEE MMM dd yyyy")} - ${format(
        fertileEnd,
        "EEE MMM dd yyyy"
      )}`,
      nextPeriod: format(nextPeriod, "EEE MMM dd yyyy"),
    });

    const gestationalAgeInDays = Math.floor((today - start) / (1000 * 60 * 60 * 24));
    const gestationalWeeks = Math.floor(gestationalAgeInDays / 7);
    const gestationalDays = gestationalAgeInDays % 7;
    const dueDate = addDays(start, 280);

    const firstTrimesterEnd = addDays(start, 13 * 7);
    const secondTrimesterEnd = addDays(start, 27 * 7);
    const thirdTrimesterEnd = dueDate;

    setGestationInfo({
      gestationalAge: `${gestationalWeeks} weeks and ${gestationalDays} days`,
      dueDate: format(dueDate, "EEE MMM dd yyyy"),
      firstTrimester: `${format(start, "EEE MMM dd yyyy")} – ${format(
        firstTrimesterEnd,
        "EEE MMM dd yyyy"
      )}`,
      secondTrimesterEnd: format(secondTrimesterEnd, "EEE MMM dd yyyy"),
      thirdTrimesterEnd: format(thirdTrimesterEnd, "EEE MMM dd yyyy"),
    });
  };

  const resetForm = () => {
    setStartDate("");
    setCycleLength(28);
    setLutealPhase(14);
    setResults(null);
    setGestationInfo(null);
    setShowDetails(false);
    setShowShare(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white transition-colors duration-300">

      {/* Sidebar */}
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={6}
      />

      <div
        className={`transition-all duration-300 ease-in-out min-h-screen bg-gray-100 dark:bg-gray-900 text-black dark:text-white ${
          sidebarVisible && width > 816 ? "lg:ml-80" : "ml-0"
        }`}
      >
        {/* Sidebar Toggle */}
        {width > 816 && (
          <button
            onClick={toggleSidebar}
            className={`fixed left-4 z-40 p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-lg hover:scale-110 ${
              sidebarVisible ? "ml-64" : "ml-2"
            }`}
            style={{ top: "24px" }}
          >
            <ChevronRight
              size={20}
              className={`${sidebarVisible ? "rotate-180" : "rotate-0"} transition-transform`}
            />
          </button>
        )}

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleTheme}
          className="fixed right-4 top-6 z-40 p-3 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-600 rounded-full text-gray-700 dark:text-gray-200 shadow-lg hover:scale-110"
        >
          {theme === "dark" ? <Sun size={20} /> : <Moon size={20} />}
        </button>

        {/* Main Content */}
        <main>
          <div className="max-w-7xl mx-auto px-6 py-10">

            {/* Header */}
            <div className="text-center mb-10 max-w-4xl mx-auto">
              <h2 className="text-5xl font-bold text-purple-900 dark:text-purple-200">
                Determine Your{" "}
                <span className="text-pink-700 dark:text-pink-400">Ovulation Cycle</span>
              </h2>
              <p className="text-md text-gray-700 dark:text-gray-300 mt-4">
                Use this calculator to identify your fertile window, ovulation date,
                and pregnancy milestones if conception occurs.
              </p>
            </div>

            {/* Form */}
            <div className="bg-pink-50 dark:bg-gray-800 shadow-lg rounded-lg p-6 max-w-xl mx-auto mb-16">
              <div className="flex justify-center mb-6">
                <img src={OvulationImg} alt="Ovulation" className="w-72" />
              </div>

              {/* Date */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Last Period Start Date
                </label>
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  max={format(new Date(), "yyyy-MM-dd")}
                  min={format(addDays(new Date(), -365 * 5), "yyyy-MM-dd")}
                  className="w-full p-2 rounded bg-white dark:bg-gray-700 text-black dark:text-white border border-gray-300 dark:border-gray-600"
                />
              </div>

              {/* Cycle */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Cycle Length (in days)
                </label>
                <input
                  type="number"
                  value={cycleLength}
                  onChange={(e) => setCycleLength(parseInt(e.target.value) || 28)}
                  min={20}
                  max={40}
                  className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                />
              </div>

              {/* Luteal Phase */}
              <div className="mb-4">
                <label className="block font-semibold text-gray-800 dark:text-gray-200 mb-1">
                  Luteal Phase (10-16)
                </label>
                <input
                  type="number"
                  value={lutealPhase}
                  onChange={handleLutealPhaseChange}
                  min={10}
                  max={16}
                  className="w-full p-2 rounded bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 text-black dark:text-white"
                />
              </div>

              {/* Details Toggle */}
              <div className="flex gap-2 items-center mb-4">
                <input
                  type="checkbox"
                  checked={showDetails}
                  onChange={() => setShowDetails(!showDetails)}
                />
                <label className="text-gray-800 dark:text-gray-200">
                  Show calculation details
                </label>
              </div>

              {/* Buttons */}
              <div className="flex gap-4 justify-center mt-4">
                <button
                  onClick={calculateOvulation}
                  className="bg-pink-500 hover:bg-pink-600 text-white px-6 py-2 rounded-lg shadow"
                >
                  Calculate
                </button>
                <button
                  onClick={resetForm}
                  className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg shadow"
                >
                  Reset
                </button>

                {results && (
                  <button
                    onClick={handleShare}
                    className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg shadow"
                  >
                    Share
                  </button>
                )}
              </div>

              {showShare && (
                <p className="text-center text-green-600 dark:text-green-400 mt-2">
                  ✓ Copied to clipboard!
                </p>
              )}
            </div>

            {/* Results */}
            <div ref={resultsRef}>
              {results && (
                <>
                  <h2 className="text-3xl font-extrabold text-pink-700 dark:text-pink-400 text-center mb-6">
                    Ovulation Dates
                  </h2>

                  <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
                    {/* Fertile Window */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-semibold mb-2">Fertile Window</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 px-3 py-1 inline-block rounded mb-2">
                        {results.fertileWindow}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Your highest chance of conception.
                      </p>
                    </div>

                    {/* Ovulation */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-semibold mb-2">Ovulation Date</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 px-3 py-1 inline-block rounded mb-2">
                        {results.ovulationDate}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Egg is released on this day.
                      </p>
                    </div>

                    {/* Next Period */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-semibold mb-2">Next Period</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 px-3 py-1 inline-block rounded mb-2">
                        {results.nextPeriod}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Expected period date.
                      </p>
                    </div>
                  </div>

                  {showDetails && (
                    <div className="max-w-2xl mx-auto mt-8 bg-white dark:bg-gray-800 p-6 rounded shadow border border-gray-200 dark:border-gray-700">
                      <h3 className="text-pink-700 dark:text-pink-400 font-bold mb-3">
                        How are these calculated?
                      </h3>
                      <ul className="list-disc pl-6 text-sm space-y-2 text-gray-700 dark:text-gray-200">
                        <li>Ovulation = Start Date + (Cycle Length - Luteal Phase)</li>
                        <li>Fertile window = 4 days before ovulation → 1 day after</li>
                        <li>Next Period = Start Date + Cycle Length</li>
                      </ul>
                    </div>
                  )}
                </>
              )}

              {gestationInfo && (
                <>
                  <h2 className="text-3xl font-extrabold text-pink-700 dark:text-pink-400 text-center mt-12 mb-8">
                    Pregnancy Milestones
                  </h2>

                  <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto mb-10">
                    {/* Gestational Age */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-bold">
                        Your Gestational Age: {gestationInfo.gestationalAge}
                      </h3>
                      <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
                        Pregnancy age counted from last menstrual period.
                      </p>
                      <p className="font-semibold mt-1">
                        Due Date: {gestationInfo.dueDate}
                      </p>
                    </div>

                    {/* 1st Trimester */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-bold mb-2">First Trimester</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 inline-block px-3 py-1 rounded font-semibold mb-2">
                        {gestationInfo.firstTrimester}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Organs and heartbeat develop.
                      </p>
                    </div>

                    {/* 2nd Trimester */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-bold mb-2">Second Trimester Ends</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 inline-block px-3 py-1 rounded font-semibold mb-2">
                        {gestationInfo.secondTrimesterEnd}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Growth phase + baby movements begin.
                      </p>
                    </div>

                    {/* 3rd Trimester */}
                    <div className="bg-pink-100 dark:bg-pink-900/30 p-6 rounded shadow border border-pink-200 dark:border-pink-800">
                      <h3 className="font-bold mb-2">Third Trimester Ends</h3>
                      <p className="bg-pink-300 dark:bg-pink-700 inline-block px-3 py-1 rounded font-semibold mb-2">
                        {gestationInfo.thirdTrimesterEnd}
                      </p>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        Baby gains weight and prepares for birth.
                      </p>
                    </div>
                  </div>
                </>
              )}
            </div>

            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-12 max-w-2xl mx-auto bg-gray-50 dark:bg-gray-800 p-4 rounded border border-gray-200 dark:border-gray-700">
              <strong>Note:</strong> This is a general calculator and should not
              replace professional medical advice.
            </p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default OvulationCalculator;
