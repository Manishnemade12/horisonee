"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import {
  Activity,
  Bell,
  Brain,
  Calendar,
  ChevronRight,
  FileText,
  Heart,
  Mail,
  MessageCircle,
  Moon,
  Phone,
  Pill,
  Play,
  Plus,
  Sun,
  User,
  Sparkles,
  TrendingUp,
  Target,
  Gamepad2,
  Clock,
  Award,
  BarChart2,
  X,
  CheckCircle,
  RefreshCw,
  Apple,
  GraduationCap,
  AlertTriangle,
  Shield,
  BookOpen,
  Video,
  Music,
  Camera,
  MapPin,
  Star,
  Settings,
  Download,
  Share2,
  Lock,
  Unlock,
  Eye,
  EyeOff,
  Edit,
  Trash2,
  Filter,
  Search,
  MoreHorizontal,
  ArrowUpRight,
  TrendingDown,
  Zap,
  Smile,
  Frown,
  Meh,
  Info,
} from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

// Fixed color scheme - using direct class names instead of template literals
const colorClasses = {
  light: {
    bg: "bg-gradient-to-br from-pink-50 via-white to-purple-50",
    card: "bg-gradient-to-br from-white to-pink-50/70",
    accent: "bg-gradient-to-r from-pink-500 to-purple-600",
    text: "bg-gradient-to-r from-pink-500 to-purple-600",
    border: "border-pink-200/50",
    hover: "hover:bg-pink-50/50"
  },
  dark: {
    bg: "bg-gradient-to-br from-gray-900 via-gray-800 to-purple-900/20",
    card: "bg-gradient-to-br from-gray-800 to-pink-900/20",
    accent: "bg-gradient-to-r from-pink-600 to-purple-700",
    text: "bg-gradient-to-r from-pink-500 to-purple-600",
    border: "border-purple-700/30",
    hover: "hover:bg-purple-900/20"
  }
};

// Animation variants defined inline
const pageTransition = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.645, 0.045, 0.355, 1],
      staggerChildren: 0.1,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

const cardVariants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  hover: {
    y: -8,
    transition: {
      duration: 0.3,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
  tap: {
    scale: 0.98,
    transition: {
      duration: 0.1,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

const listItemVariants = {
  initial: { opacity: 0, x: -20 },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.4,
      ease: [0.645, 0.045, 0.355, 1],
    },
  },
};

// Mock data (unchanged)
const mockChildrenData = [
  {
    id: 1,
    name: "Priya",
    age: 13,
    lastPeriod: "2024-01-01",
    nextPeriod: "2025-01-30",
    cycleLength: 28,
    currentPhase: "Menstrual",
    symptoms: ["Mild cramps", "Headache"],
    mood: "Tired",
    sleep: "Good",
    medications: ["Iron supplement"],
    appointments: [{ date: "2024-01-15", type: "Gynecologist Check-up" }],
    healthScore: 85,
    recentUpdates: [
      { date: "2024-01-03", text: "Logged period start" },
      { date: "2024-01-02", text: "Completed daily mood tracking" },
    ],
    nutritionLog: [
      {
        date: "2024-01-03",
        meals: ["Breakfast", "Lunch", "Dinner"],
        waterIntake: 2000,
        ironRichFoods: true,
      },
      {
        date: "2024-01-02",
        meals: ["Breakfast", "Lunch"],
        waterIntake: 1500,
        ironRichFoods: false,
      },
    ],
    exerciseLog: [
      { date: "2024-01-03", type: "Yoga", duration: 30, intensity: "Low" },
      {
        date: "2024-01-02",
        type: "Walking",
        duration: 45,
        intensity: "Moderate",
      },
    ],
    sleepLog: [
      {
        date: "2024-01-03",
        hours: 8,
        quality: "Good",
        bedtime: "22:00",
        wakeTime: "06:00",
      },
      {
        date: "2024-01-02",
        hours: 7,
        quality: "Fair",
        bedtime: "23:00",
        wakeTime: "06:00",
      },
    ],
    educationProgress: {
      completedModules: ["Menstrual Health Basics", "Nutrition"],
      currentModule: "Exercise & Wellness",
      quizScores: [
        { module: "Menstrual Health Basics", score: 90 },
        { module: "Nutrition", score: 85 },
      ],
    },
    mentalHealth: {
      moodPatterns: [
        {
          date: "2024-01-03",
          mood: "Happy",
          stressLevel: "Low",
          notes: "Had a great day",
        },
        {
          date: "2024-01-02",
          mood: "Anxious",
          stressLevel: "High",
          notes: "School exam",
        },
      ],
      supportResources: [
        { type: "Counselor", name: "Dr. Anjali Sharma", contact: "+91-98765-43210" },
        {
          type: "Support Group",
          name: "Teen Wellness Circle",
          schedule: "Wednesdays 4 PM",
        },
      ],
    },
    notifications: [
      {
        id: 1,
        type: "medication",
        message: "Time for Iron supplement",
        time: "08:00",
      },
      {
        id: 2,
        type: "appointment",
        message: "Upcoming gynecologist appointment",
        date: "2024-01-15",
      },
      {
        id: 3,
        type: "period",
        message: "Period expected in 3 days",
        date: "2024-01-30",
      },
    ],
  },
  {
    id: 2,
    name: "Aisha",
    age: 15,
    lastPeriod: "2023-12-25",
    nextPeriod: "2024-01-22",
    cycleLength: 30,
    currentPhase: "Luteal",
    symptoms: ["Headache"],
    mood: "Calm",
    sleep: "Fair",
    medications: ["Multivitamin"],
    appointments: [{ date: "2024-01-20", type: "Regular Check-up" }],
    healthScore: 90,
    recentUpdates: [
      { date: "2024-01-03", text: "Updated symptom tracker" },
      { date: "2024-01-01", text: "Logged exercise session" },
    ],
    nutritionLog: [
      {
        date: "2024-01-03",
        meals: ["Breakfast", "Lunch", "Dinner"],
        waterIntake: 2200,
        ironRichFoods: true,
      },
      {
        date: "2024-01-02",
        meals: ["Breakfast", "Lunch"],
        waterIntake: 1800,
        ironRichFoods: true,
      },
    ],
    exerciseLog: [
      {
        date: "2024-01-03",
        type: "Swimming",
        duration: 45,
        intensity: "Moderate",
      },
      {
        date: "2024-01-02",
        type: "Stretching",
        duration: 20,
        intensity: "Low",
      },
    ],
    sleepLog: [
      {
        date: "2024-01-03",
        hours: 9,
        quality: "Excellent",
        bedtime: "21:30",
        wakeTime: "06:30",
      },
      {
        date: "2024-01-02",
        hours: 8,
        quality: "Good",
        bedtime: "22:00",
        wakeTime: "06:00",
      },
    ],
    educationProgress: {
      completedModules: ["Understanding Your Body", "Physical Activity"],
      currentModule: "Emotional Wellness",
      quizScores: [
        { module: "Understanding Your Body", score: 95 },
        { module: "Physical Activity", score: 88 },
      ],
    },
    mentalHealth: {
      moodPatterns: [
        {
          date: "2024-01-03",
          mood: "Energetic",
          stressLevel: "Low",
          notes: "Productive day at school",
        },
        {
          date: "2024-01-02",
          mood: "Calm",
          stressLevel: "Low",
          notes: "Relaxing weekend",
        },
      ],
      supportResources: [
        {
          type: "School Counselor",
          name: "Ms. Kavita Patel",
          contact: "+91-98765-43211",
        },
        {
          type: "Support Group",
          name: "Teen Wellness Club",
          schedule: "Mondays 3 PM",
        },
      ],
    },
    notifications: [
      {
        id: 1,
        type: "medication",
        message: "Time for Multivitamin",
        time: "09:00",
      },
      {
        id: 2,
        type: "appointment",
        message: "Regular check-up tomorrow",
        date: "2024-01-20",
      },
    ],
  },
];

const resources = [
  {
    title: "Understanding Your Cycle",
    type: "Video",
    duration: "15 mins",
    level: "Beginner",
    icon: Play,
  },
  {
    title: "Nutrition & Menstrual Health",
    type: "Article",
    duration: "10 mins",
    level: "Intermediate",
    icon: FileText,
  },
  {
    title: "Managing PMS Symptoms",
    type: "Interactive",
    duration: "20 mins",
    level: "Advanced",
    icon: Brain,
  },
];

const contacts = [
  {
    name: "Dr. Priya Desai",
    role: "Primary Gynecologist",
    phone: "+91 (98765) 43210",
    email: "dr.desai@example.com",
    available: "24/7",
  },
  {
    name: "Apollo Women's Hospital",
    role: "Emergency Room",
    phone: "+91 (98765) 43211",
    email: "emergency@apollohospital.com",
    available: "24/7",
  },
  {
    name: "Teen Health Clinic",
    role: "Urgent Care",
    phone: "+91 (98765) 43212",
    email: "clinic@example.com",
    available: "8AM - 8PM",
  },
];

const cycleData = {
  days: Array.from({ length: 30 }, (_, i) => ({
    day: i + 1,
    symptoms: Math.random() * 5,
    mood: Math.random() * 5,
    energy: Math.random() * 5,
  })),
};

const medications = [
  {
    name: "Iron Supplement",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true,
  },
  {
    name: "Vitamin D",
    schedule: "Daily",
    time: "8:00 AM",
    taken: true,
  },
  {
    name: "Pain Relief",
    schedule: "As needed",
    time: "When required",
    taken: false,
  },
];

const activities = [
  {
    type: "Exercise",
    duration: "30 mins",
    date: "Today",
    completed: true,
  },
  {
    type: "Meditation",
    duration: "15 mins",
    date: "Today",
    completed: false,
  },
  {
    type: "Water Intake",
    duration: "2L",
    date: "Today",
    completed: true,
  },
];

// New data structures for enhanced functionality
const communicationLog = [
  {
    id: 1,
    date: "2024-01-03",
    type: "Doctor Consultation",
    doctor: "Dr. Priya Desai",
    topic: "Period irregularity discussion",
    notes: "Discussed cycle tracking and symptoms",
    followUp: "2024-01-15",
  },
  {
    id: 2,
    date: "2024-01-02",
    type: "School Meeting",
    teacher: "Ms. Kavita Patel",
    topic: "Health education program",
    notes: "Discussed menstrual health awareness",
    followUp: "2024-01-20",
  },
  {
    id: 3,
    date: "2024-01-01",
    type: "Parent-Child Talk",
    topic: "Menstrual health discussion",
    notes: "Open conversation about body changes",
    followUp: "Ongoing",
  },
];

const educationalResources = [
  {
    id: 1,
    title: "Understanding Menstrual Health",
    type: "Video",
    duration: "15 mins",
    level: "Beginner",
    description: "Comprehensive guide to menstrual health basics",
    tags: ["Health", "Education", "Basics"],
    completed: false,
  },
  {
    id: 2,
    title: "Nutrition for Teen Girls",
    type: "Article",
    duration: "10 mins",
    level: "Intermediate",
    description: "Essential nutrition tips for growing teens",
    tags: ["Nutrition", "Health", "Teen"],
    completed: true,
  },
  {
    id: 3,
    title: "Mental Health & Wellness",
    type: "Interactive",
    duration: "20 mins",
    level: "Advanced",
    description: "Managing emotional health during puberty",
    tags: ["Mental Health", "Wellness", "Emotional"],
    completed: false,
  },
];

const healthAlerts = [
  {
    id: 1,
    type: "warning",
    title: "Irregular Cycle Detected",
    message: "Priya's cycle has been irregular for the past 2 months",
    date: "2024-01-03",
    priority: "medium",
  },
  {
    id: 2,
    type: "info",
    title: "Upcoming Health Check",
    message: "Aisha's annual health check is due next week",
    date: "2024-01-02",
    priority: "low",
  },
  {
    id: 3,
    type: "success",
    title: "Health Goal Achieved",
    message: "Priya completed her exercise goal for the week",
    date: "2024-01-01",
    priority: "low",
  },
];

const privacySettings = {
  dataSharing: {
    healthData: true,
    educationalProgress: true,
    mentalHealth: false,
    location: false,
  },
  notifications: {
    healthAlerts: true,
    educationalUpdates: true,
    appointmentReminders: true,
    marketing: false,
  },
  accessControl: {
    doctorAccess: true,
    schoolAccess: false,
    familyAccess: true,
  },
};

const goals = [
  {
    title: "Regular Exercise",
    progress: 80,
    target: "30 mins daily",
    streak: 5,
  },
  {
    title: "Sleep Schedule",
    progress: 90,
    target: "8 hours daily",
    streak: 7,
  },
  {
    title: "Symptom Tracking",
    progress: 100,
    target: "Daily logging",
    streak: 10,
  },
];

// Fixed NotificationsPanel with proper class names
const NotificationsPanel = ({ notifications, onClose, onDismiss, onMarkAllRead }) => (
  <motion.div
    initial={{ opacity: 0, y: -20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    className="absolute right-0 top-16 w-96 rounded-2xl shadow-2xl z-50 bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-xl border border-pink-200/50 dark:border-purple-700/30"
  >
    <div className="p-4 border-b border-pink-100/50 dark:border-purple-800/30">
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
          Notifications
        </h3>
        <button
          onClick={onClose}
          className="p-2 rounded-xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all backdrop-blur-sm"
        >
          <X className="h-4 w-4" />
        </button>
      </div>
      {notifications.length > 0 && (
        <button
          onClick={onMarkAllRead}
          className="mt-2 px-3 py-1.5 rounded-lg bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white text-sm font-medium transition-all"
        >
          Mark all as read
        </button>
      )}
    </div>
    <div className="max-h-96 overflow-y-auto">
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <motion.div
            key={notification.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            className={`p-4 transition-all ${
              index < notifications.length - 1 ? 'border-b border-pink-100/30 dark:border-purple-800/20' : ''
            } hover:bg-pink-50/50 dark:hover:bg-purple-900/20`}
          >
            <div className="flex items-start space-x-3">
              <div className="p-2 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                {notification.type === "medication" && (
                  <Pill className="h-4 w-4 text-pink-600 dark:text-pink-400" />
                )}
                {notification.type === "appointment" && (
                  <Calendar className="h-4 w-4 text-purple-600 dark:text-purple-400" />
                )}
                {notification.type === "period" && (
                  <Heart className="h-4 w-4 text-rose-600 dark:text-rose-400" />
                )}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                  {notification.message}
                </p>
                <p className="text-xs text-pink-600/70 dark:text-purple-400/70 mt-1">
                  {notification.time || notification.date}
                </p>
              </div>
              <button
                onClick={() => onDismiss(notification.id)}
                className="p-1.5 rounded-lg bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all"
              >
                <X className="h-3 w-3" />
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <div className="p-8 text-center">
          <div className="w-12 h-12 mx-auto mb-3 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <Bell className="h-6 w-6 text-pink-400 dark:text-purple-400" />
          </div>
          <p className="text-gray-500 dark:text-gray-400 text-sm">No new notifications</p>
        </div>
      )}
    </div>
  </motion.div>
);

// Fixed MentalHealthModal
const MentalHealthModal = ({ child, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-xl border border-pink-200/50 dark:border-purple-700/30"
    >
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Mental Health
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Tracking for {child.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Mood Patterns */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Brain className="h-5 w-5 text-pink-500" />
            Recent Mood Patterns
          </h3>
          <div className="grid gap-3">
            {child.mentalHealth.moodPatterns.map((entry, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-100/30 dark:border-purple-800/20"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm text-gray-500">{entry.date}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      entry.stressLevel === "Low"
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : entry.stressLevel === "Medium"
                        ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                        : "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300"
                    }`}
                  >
                    {entry.stressLevel} Stress
                  </span>
                </div>
                <p className="font-semibold text-gray-900 dark:text-white">{entry.mood}</p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  {entry.notes}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Support Resources */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Heart className="h-5 w-5 text-rose-500" />
            Support Resources
          </h3>
          <div className="grid gap-3">
            {child.mentalHealth.supportResources.map((resource, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-100/30 dark:border-purple-800/20"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{resource.name}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {resource.type}
                    </p>
                    {resource.schedule && (
                      <p className="text-sm text-pink-600 dark:text-purple-400 mt-1">
                        {resource.schedule}
                      </p>
                    )}
                  </div>
                  {resource.contact && (
                    <button className="p-3 rounded-xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white transition-all shadow-lg shadow-pink-500/25">
                      <Phone className="h-4 w-4" />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex gap-4 pt-4">
          <button className="flex-1 py-3 px-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white font-semibold transition-all shadow-lg shadow-pink-500/25">
            Schedule Counseling
          </button>
          <button className="flex-1 py-3 px-6 rounded-2xl border-2 border-pink-200 dark:border-purple-700 text-pink-600 dark:text-purple-400 hover:bg-pink-50 dark:hover:bg-purple-900/20 font-semibold transition-all">
            View Resources
          </button>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Fixed NutritionModal
const NutritionModal = ({ child, onClose }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
  >
    <motion.div
      initial={{ scale: 0.95, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.95, opacity: 0 }}
      className="rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-xl border border-pink-200/50 dark:border-purple-700/30"
    >
      <div className="p-8 space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              Nutrition Tracking
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              For {child.name}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-3 rounded-2xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all backdrop-blur-sm"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Daily Log */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
            <Apple className="h-5 w-5 text-pink-500" />
            Daily Nutrition Log
          </h3>
          <div className="grid gap-4">
            {child.nutritionLog.map((log, index) => (
              <div
                key={index}
                className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-100/30 dark:border-purple-800/20"
              >
                <div className="flex justify-between items-center mb-3">
                  <span className="text-sm text-gray-500">{log.date}</span>
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${
                      log.ironRichFoods
                        ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300"
                        : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300"
                    }`}
                  >
                    {log.ironRichFoods ? "Iron-rich diet" : "Low iron intake"}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 mb-3">
                  {log.meals.map((meal, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-lg text-sm font-medium text-pink-700 dark:text-purple-300"
                    >
                      {meal}
                    </span>
                  ))}
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Water Intake:</span>
                  <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-400 to-blue-600"
                      style={{ width: `${(log.waterIntake / 2500) * 100}%` }}
                    />
                  </div>
                  <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">{log.waterIntake}ml</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-100/30 dark:border-purple-800/20">
          <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-pink-500" />
            Nutrition Recommendations
          </h3>
          <ul className="space-y-2">
            <li className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Include iron-rich foods daily</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Maintain hydration (2000-2500ml daily)</span>
            </li>
            <li className="flex items-center space-x-3">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span className="text-sm text-gray-700 dark:text-gray-300">Balance meals with proteins and vegetables</span>
            </li>
          </ul>
        </div>
      </div>
    </motion.div>
  </motion.div>
);

// Fixed EducationProgressModal
const EducationProgressModal = ({ child, onClose }) => {
  if (!child?.educationProgress) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      >
        <motion.div
          initial={{ scale: 0.95, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.95, opacity: 0 }}
          className="rounded-3xl shadow-2xl max-w-2xl w-full bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-xl border border-pink-200/50 dark:border-purple-700/30"
        >
          <div className="p-8 space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Education Progress
              </h2>
              <button
                onClick={onClose}
                className="p-3 rounded-2xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="text-center py-8">
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-center">
                <GraduationCap className="h-8 w-8 text-pink-400 dark:text-purple-400" />
              </div>
              <p className="text-gray-600 dark:text-gray-300">
                No education progress data available.
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-xl border border-pink-200/50 dark:border-purple-700/30"
      >
        <div className="p-8 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
                Education Progress
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                For {child.name}
              </p>
            </div>
            <button
              onClick={onClose}
              className="p-3 rounded-2xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all backdrop-blur-sm"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Current Module */}
          <div className="p-6 rounded-2xl bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg shadow-pink-500/25">
            <h3 className="text-lg font-semibold mb-2">Current Module</h3>
            <p className="text-xl font-bold">
              {child.educationProgress.currentModule}
            </p>
            <button className="mt-4 inline-flex items-center space-x-2 px-4 py-2 bg-white/20 hover:bg-white/30 rounded-xl text-white font-medium text-sm transition-all backdrop-blur-sm">
              <Play className="h-4 w-4" />
              <span>Continue Learning</span>
            </button>
          </div>

          {/* Completed Modules */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white flex items-center gap-2">
              <Award className="h-5 w-5 text-pink-500" />
              Completed Modules
            </h3>
            <div className="grid gap-3">
              {child.educationProgress.quizScores.map((module, index) => (
                <div
                  key={index}
                  className="p-4 rounded-2xl bg-white/70 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-100/30 dark:border-purple-800/20 flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{module.module}</p>
                    <div className="flex items-center space-x-2 mt-1 text-sm text-gray-500 dark:text-gray-400">
                      <Award className="h-4 w-4 text-yellow-500" />
                      <span>Quiz Score: {module.score}%</span>
                    </div>
                  </div>
                  <button className="p-2 rounded-xl bg-white/80 hover:bg-pink-50 dark:bg-gray-700/80 dark:hover:bg-purple-900/30 text-gray-600 dark:text-gray-300 transition-all">
                    <RefreshCw className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Progress Overview */}
          <div className="p-4 rounded-2xl bg-gradient-to-r from-pink-50 to-purple-50 dark:from-pink-900/20 dark:to-purple-900/20 border border-pink-100/30 dark:border-purple-800/20">
            <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
              <TrendingUp className="h-4 w-4 text-pink-500" />
              Learning Progress
            </h3>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-gray-700 dark:text-gray-300">Overall Progress</span>
                  <span className="font-semibold text-pink-600 dark:text-purple-400">75%</span>
                </div>
                <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-pink-500 to-purple-500"
                    style={{ width: "75%" }}
                  />
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>
                  Modules Completed:{" "}
                  {child.educationProgress.completedModules.length}
                </span>
                <span>Total Modules: 6</span>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// Enhanced ParentDashboard component with fixed color consistency
export function ParentDashboard() {
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [selectedChild, setSelectedChild] = useState(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState(mockChildrenData[0].notifications);
  const [showMentalHealthModal, setShowMentalHealthModal] = useState(false);
  const [showEducationModal, setShowEducationModal] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showNutritionModal, setShowNutritionModal] = useState(false);
  const [showPrivacySettings, setShowPrivacySettings] = useState(false);
  const [showEmergencyContacts, setShowEmergencyContacts] = useState(false);
  const [showHealthReport, setShowHealthReport] = useState(false);
  const [showCommunicationLog, setShowCommunicationLog] = useState(false);
  const [showEducationalResources, setShowEducationalResources] = useState(false);
  const [privacyMode, setPrivacyMode] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [showQuickActions, setShowQuickActions] = useState(false);

  // State for Privacy Settings
  const [currentPrivacySettings, setCurrentPrivacySettings] = useState({
    dataSharing: { ...privacySettings.dataSharing },
    notifications: { ...privacySettings.notifications },
    accessControl: { ...privacySettings.accessControl },
  });

  const handleToggle = (category, key) => {
    setCurrentPrivacySettings((prevSettings) => ({
      ...prevSettings,
      [category]: {
        ...prevSettings[category],
        [key]: !prevSettings[category][key],
      },
    }));
  };
  
  const handleDismissNotification = (id) => {
    setNotifications(notifications.filter((n) => n.id !== id));
  };
  
  const handleMarkAllRead = () => {
    setNotifications([]);
  };
  
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Fixed Enhanced Card Component
  const EnhancedCard = ({ children, className = "", hover = true, ...props }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={hover ? { y: -4, transition: { duration: 0.2 } } : {}}
      className={`rounded-2xl bg-gradient-to-br from-white to-pink-50/70 dark:bg-gradient-to-br dark:from-gray-800 dark:to-pink-900/20 backdrop-blur-sm border border-pink-200/50 dark:border-purple-700/30 shadow-lg shadow-pink-500/10 dark:shadow-purple-900/10 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );

  // Fixed Enhanced Button Component
  const EnhancedButton = ({ children, variant = "primary", className = "", ...props }) => {
    const baseClasses = "px-4 py-2 rounded-xl font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";
    
    const variants = {
      primary: "bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 text-white shadow-lg shadow-pink-500/25 focus:ring-pink-500",
      secondary: "bg-white/80 dark:bg-gray-700/80 text-gray-700 dark:text-gray-300 border border-pink-200 dark:border-purple-700 hover:bg-pink-50 dark:hover:bg-purple-900/20 focus:ring-pink-500",
      ghost: "text-pink-600 dark:text-purple-400 hover:bg-pink-50 dark:hover:bg-purple-900/20 focus:ring-pink-500"
    };

    return (
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className={`${baseClasses} ${variants[variant]} ${className}`}
        {...props}
      >
        {children}
      </motion.button>
    );
  };

  // Fixed renderOverviewCards with new components
  const renderOverviewCards = () => {
    const filteredChildren = mockChildrenData.filter((child) => {
      const matchesSearch = child.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterType === "all" || 
                           (filterType === "health" && child.healthScore) ||
                           (filterType === "education" && child.educationProgress) ||
                           (filterType === "mental" && child.mentalHealth);
      return matchesSearch && matchesFilter;
    });

    if (filteredChildren.length === 0) {
      return (
        <div className="text-center text-gray-500 dark:text-gray-400 p-8">
          <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 flex items-center justify-center">
            <User className="h-8 w-8 text-pink-400 dark:text-purple-400" />
          </div>
          <p>No children match your search criteria.</p>
        </div>
      );
    }
    
    return (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {filteredChildren.map((child) => (
          <EnhancedCard key={child.id} className="p-6">
            <div className="space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-2xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                    <span className="h-12 w-12 flex items-center justify-center rounded-xl bg-gradient-to-br from-pink-400 to-purple-500 text-white font-bold text-lg">
                      {child.name[0]}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                      {child.name}
                    </h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Age: {child.age}
                    </p>
                  </div>
                </div>
                <span className="px-4 py-2 text-sm font-semibold rounded-xl bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-700 dark:text-purple-300">
                  {child.healthScore}% Health
                </span>
              </div>

              {/* Phase Info */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  ["Current Phase", child.currentPhase, <Calendar className="h-4 w-4 text-pink-500" />],
                  ["Next Period", child.nextPeriod, <Heart className="h-4 w-4 text-purple-500" />],
                ].map(([label, value, icon], i) => (
                  <div
                    key={i}
                    className="p-4 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-100/30 dark:border-purple-800/20"
                  >
                    <div className="flex items-center gap-2 mb-2">
                      {icon}
                      <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                        {label}
                      </p>
                    </div>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      {value}
                    </p>
                  </div>
                ))}
              </div>

              {/* Recent Updates */}
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Recent Updates
                  </h4>
                  <TrendingUp className="h-5 w-5 text-pink-500" />
                </div>
                <div className="space-y-3">
                  {child.recentUpdates.map((update, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-pink-100/30 dark:border-purple-800/20"
                    >
                      <div className="flex items-start gap-3">
                        <div className="p-2 rounded-lg bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30">
                          <Activity className="h-4 w-4 text-pink-500" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900 dark:text-white">
                            {update.text}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {update.date}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-2">
                <EnhancedButton variant="primary" className="flex items-center gap-2">
                  <FileText className="h-4 w-4" />
                  View Details
                </EnhancedButton>
                <EnhancedButton variant="secondary" className="flex items-center gap-2">
                  <MessageCircle className="h-4 w-4" />
                  Contact Doctor
                </EnhancedButton>
              </div>
            </div>
          </EnhancedCard>
        ))}
      </div>
    );
  };

  // Fixed Header
  const renderHeader = () => (
    <header className=" backdrop-blur-xl bg-white/90 dark:bg-gray-900/90 border-b border-pink-200/30 dark:border-purple-800/30">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center space-x-4"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full blur-lg opacity-30 animate-pulse" />
              <Heart className="h-8 w-8 text-pink-500 relative" />
            </div>
            <h2 className="text-2xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
              Parent's Dashboard
            </h2>
          </motion.div>
          <div className="flex items-center space-x-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2.5 border border-pink-200 dark:border-purple-700 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 backdrop-blur-sm"
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-2.5 border border-pink-200 dark:border-purple-700 rounded-xl bg-white/80 dark:bg-gray-800/80 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 backdrop-blur-sm"
              >
                <option value="all">All</option>
                <option value="health">Health</option>
                <option value="education">Education</option>
                <option value="mental">Mental Health</option>
                <option value="nutrition">Nutrition</option>
              </select>
            </div>

            <div className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setShowNotifications(!showNotifications)}
                className="p-3 rounded-xl bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 text-pink-600 dark:text-purple-400 hover:from-pink-200 hover:to-purple-200 dark:hover:from-pink-800/50 dark:hover:to-purple-800/50 transition-all"
              >
                <Bell className="h-5 w-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-6 w-6 bg-gradient-to-r from-pink-500 to-purple-500 rounded-full flex items-center justify-center text-xs text-white font-bold shadow-lg">
                    {notifications.length}
                  </span>
                )}
              </motion.button>
              <AnimatePresence>
                {showNotifications && (
                  <NotificationsPanel
                    notifications={notifications}
                    onClose={() => setShowNotifications(false)}
                    onDismiss={handleDismissNotification}
                    onMarkAllRead={handleMarkAllRead}
                  />
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </header>
  );

  const { width } = useScreenSize();

  return (
    <div className="flex h-screen dark:bg-gray-900">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={13}
      />
      {/* {width > 816 && (
        <button
          onClick={toggleSidebar}
          className="fixed left-0 top-0 w-10 z-50 p-2 bg-gradient-to-b from-pink-500 to-purple-600 text-white rounded-r-xl transition-all duration-300 ease-in-out focus:outline-none focus:ring-2 focus:ring-pink-500 shadow-lg"
          style={{
            transform: sidebarVisible ? "translateX(256px)" : "translateX(0)",
          }}
          aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
        >
          <ChevronRight
            size={14}
            className={`transition-transform duration-300 block m-auto ${
              sidebarVisible ? "rotate-180" : "rotate-0"
            }`}
          />
        </button>
      )} */}

      <main
        className={`flex-1 p-6 overflow-auto transition-all duration-300 ease-in-out ${
          sidebarVisible ? "ml-64" : "ml-0"
        }`}
      >
        <div className="min-h-screen bg-gradient-to-br from-pink-50 via-white to-purple-50 dark:bg-gradient-to-br dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
          {renderHeader()}
          <main className="container mx-auto px-4 py-8">
            <div className="space-y-8">
              {/* Enhanced Tab Navigation */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="flex flex-wrap gap-1 p-1 rounded-2xl bg-white/80 dark:bg-gray-800/80 backdrop-blur-xl shadow-lg border border-pink-200/30 dark:border-purple-800/30"
              >
                {[
                  "overview",
                  "health",
                  "cycle",
                  "medications",
                  "activities",
                  "goals",
                  "education",
                  "emergency",
                  "alerts",
                  "analytics",
                  "quick-actions",
                ].map((tab) => (
                  <motion.button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex-1 px-4 py-3 text-sm font-semibold rounded-xl transition-all ${
                      activeTab === tab
                        ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-pink-500/25"
                        : "text-gray-600 dark:text-gray-400 bg-transparent hover:bg-pink-50 dark:hover:bg-purple-900/20"
                    }`}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                  </motion.button>
                ))}
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  variants={pageTransition}
                >
                  {activeTab === "overview" && renderOverviewCards()}
                  {/* Other tab render functions would follow the same enhanced pattern */}
                </motion.div>
              </AnimatePresence>
            </div>
          </main>

          {/* Modal Renderers */}
          <AnimatePresence>
            {showMentalHealthModal && selectedChild && (
              <MentalHealthModal
                child={selectedChild}
                onClose={() => setShowMentalHealthModal(false)}
              />
            )}
            {showNutritionModal && selectedChild && (
              <NutritionModal
                child={selectedChild}
                onClose={() => setShowNutritionModal(false)}
              />
            )}
            {showEducationModal && selectedChild && (
              <EducationProgressModal
                child={selectedChild}
                onClose={() => setShowEducationModal(false)}
              />
            )}
            {/* Other modals would be rendered here */}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}