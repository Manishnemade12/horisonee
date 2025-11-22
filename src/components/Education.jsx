import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  ChevronDown,
  ChevronUp,
  Stethoscope,
  Search,
  Utensils,
  Leaf,
  Clock,
  Bookmark,
  Share2,
  Award,
  Sparkles,
  Brain,
  Dumbbell,
  Pill,
  Droplet,
  X,
  ChevronRight,
  BookOpen,
  GraduationCap,
  Filter,
  TrendingUp,
  Users,
  Eye,
  Menu,
} from "lucide-react";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

// Quiz Component
function Quiz({ onQuizComplete }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const questions = [
    {
      questionText: "What is the average length of a menstrual cycle?",
      answerOptions: [
        { answerText: "14 days", isCorrect: false },
        { answerText: "28 days", isCorrect: true },
        { answerText: "45 days", isCorrect: false },
        { answerText: "60 days", isCorrect: false },
      ],
    },
    {
      questionText: "Which of these is NOT a phase of the menstrual cycle?",
      answerOptions: [
        { answerText: "Follicular phase", isCorrect: false },
        { answerText: "Ovulation", isCorrect: false },
        { answerText: "Luteal phase", isCorrect: false },
        { answerText: "Gestation phase", isCorrect: true },
      ],
    },
    {
      questionText: "What hormone is responsible for the thickening of the uterine lining?",
      answerOptions: [
        { answerText: "Estrogen", isCorrect: true },
        { answerText: "Testosterone", isCorrect: false },
        { answerText: "Adrenaline", isCorrect: false },
        { answerText: "Insulin", isCorrect: false },
      ],
    },
  ];

  const handleAnswerClick = (isCorrect, index) => {
    setSelectedAnswer(index);
    
    setTimeout(() => {
      if (isCorrect) {
        setScore(score + 1);
      }

      const nextQuestion = currentQuestion + 1;
      if (nextQuestion < questions.length) {
        setCurrentQuestion(nextQuestion);
        setSelectedAnswer(null);
      } else {
        setShowScore(true);
        onQuizComplete(score + (isCorrect ? 1 : 0));
      }
    }, 1000);
  };

  return (
    <div className="quiz bg-gradient-to-br from-white to-pink-50 dark:from-gray-800 dark:to-gray-900 rounded-2xl p-6 shadow-xl">
      {showScore ? (
        <div className="text-center space-y-4">
          <div className={`w-20 h-20 mx-auto rounded-full flex items-center justify-center ${
            score === 3 ? "bg-gradient-to-r from-yellow-400 to-orange-400" :
            score === 2 ? "bg-gradient-to-r from-purple-400 to-pink-400" :
            "bg-gradient-to-r from-blue-400 to-cyan-400"
          }`}>
            <Award className="h-10 w-10 text-white" />
          </div>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-white">
            Quiz Complete!
          </h3>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            You scored <span className="font-bold text-pink-600">{score}</span> out of {questions.length}
          </p>
          <div className="text-sm text-gray-500 dark:text-gray-400">
            {score === 3 ? "🎉 Perfect! You're a women's health expert!" :
             score === 2 ? "👍 Great job! You know your stuff!" :
             "💪 Good start! Keep learning!"}
          </div>
        </div>
      ) : (
        <>
          <div className="mb-6">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm font-medium text-pink-600 bg-pink-100 dark:bg-pink-900/30 px-3 py-1 rounded-full">
                Question {currentQuestion + 1}/{questions.length}
              </span>
              <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                <div 
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-800 dark:text-white leading-relaxed">
              {questions[currentQuestion].questionText}
            </h3>
          </div>
          <div className="space-y-3">
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(answerOption.isCorrect, index)}
                disabled={selectedAnswer !== null}
                className={`w-full p-4 text-left rounded-xl transition-all duration-300 ${
                  selectedAnswer === index
                    ? answerOption.isCorrect
                      ? "bg-green-100 border-2 border-green-500 text-green-700 dark:bg-green-900/30 dark:border-green-400 dark:text-green-300"
                      : "bg-red-100 border-2 border-red-500 text-red-700 dark:bg-red-900/30 dark:border-red-400 dark:text-red-300"
                    : "bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-pink-300 dark:hover:border-pink-600 hover:shadow-md"
                }`}
              >
                <div className="flex items-center">
                  <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center mr-3 ${
                    selectedAnswer === index
                      ? answerOption.isCorrect
                        ? "border-green-500 bg-green-500"
                        : "border-red-500 bg-red-500"
                      : "border-gray-300 dark:border-gray-500"
                  }`}>
                    {selectedAnswer === index && (
                      <div className="w-2 h-2 rounded-full bg-white"></div>
                    )}
                  </div>
                  <span className="font-medium">{answerOption.answerText}</span>
                </div>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

const blogPosts = [
  {
    id: 1,
    title: "Understanding Your Menstrual Cycle",
    excerpt: "Learn about the phases of your menstrual cycle and how they affect your body.",
    author: "Dr. Janvi Gupta",
    date: "2024-03-15",
    readingTime: "5 min",
    views: "2.4K",
    icon: <Calendar className="h-12 w-12 text-pink-500" />,
    category: "Health",
    content: "The menstrual cycle is typically 28 days long, but can range from 21 to 35 days. It consists of four main phases: menstruation, the follicular phase, ovulation, and the luteal phase. Each phase is characterized by different hormonal changes that affect your body and mood. Understanding these phases can help you better manage your health and well-being throughout your cycle.",
    video: (
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/7HlHGLr1hTA?si=pGQOe9NJgCEsV9L5"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    ),
  },
  {
    id: 2,
    title: "How long does the menstrual cycle and period last?",
    excerpt: "Discover the best foods to eat during your menstrual cycle for optimal health.",
    author: "Nutritionist Sachin Rai",
    date: "2024-03-10",
    readingTime: "4 min",
    views: "1.8K",
    icon: <Utensils className="h-12 w-12 text-green-500" />,
    category: "Nutrition",
    content: "Your menstrual cycle takes around 28 days to complete, but this is a good time to point out that EVERYONE is different! Just like your fingerprints are unique, so is your bloody brilliant body and how you experience periods. So, while we say 28 days it might be a little longer, it might be a little shorter, there really aren't any set rules here. Of those 28 days, you could expect to bleed for anywhere between 3-8 days. Again, everyone is different, and your periods are likely to change. Your body can take some time to get into its own flow, so cut it a bit of slack - it's learning what to do while you're getting used to things too!",
    video: (
      <iframe
        width="100%"
        height="315"
        src="https://www.youtube.com/embed/kQyByK9XaQg?si=Xnu21W1iMabfH68Z"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="rounded-lg"
      ></iframe>
    )
  },
  {
    id: 3,
    title: "What are the signs that my period is coming?",
    excerpt: "Explore natural remedies and lifestyle changes to alleviate PMS symptoms.",
    author: "Holistic Health Coach Namita Arora",
    date: "2024-03-05",
    readingTime: "6 min",
    views: "3.2K",
    icon: <Leaf className="h-12 w-12 text-purple-500" />,
    category: "Wellness",
    content: "If you've never had a period before, there are some signs which might indicate your period is coming and they're all natural parts of growing up. If you've noticed your boobs are beginning to develop, and you've started to grow pubic hair, then you could expect to get your period about two years later. A more immediate sign for some people is if you notice discharge in your pants. Discharge is a white or yellowish fluid which usually shows up a few months before your first period. There are lots of other signs your period is coming and these can be both physical and emotional. We call these signs PMS (premenstrual syndrome). Not everyone gets PMS and we all experience it differently. It usually happens just before and during your period, and it's basically the reason you might find yourself wanting to eat your body weight in chocolate or burst into tears at the smallest of things…lost sock, bad hair day, burnt toast…trust me, we all have those days! PMS brings with it all kinds of symptoms such as headaches, bloating, cramps, mood swings, feeling tired and having trouble concentrating.",
    video: (
      <iframe width="100%" height="315" src="https://www.youtube.com/embed/kQyByK9XaQg?si=iyoRPoEHMefjHsQM" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen className="rounded-lg"></iframe>
    )
  },
  // Add more posts as needed...
];

const womenHealthTopics = [
  {
    id: 1,
    question: "What is a period?",
    answer: "Your period or menstruation (that's the 'sciencey' name) is part of your menstrual cycle. This cycle is ultimately your body's way of preparing itself for a possible pregnancy. During your menstrual cycle, there is an increase and decrease in a number of different hormones such as oestrogen and progesterone which control different aspects of this cycle, you'll be hearing a lot about these hormones, so sit tight.During your cycle your body releases an egg from your ovaries – we're talking teeny tiny eggs here - you can't see them with the naked eye, they're that small! In order for the egg to be released it has to be matured, which is a job for our hormones.These hormones are also responsible for making the lining of your uterus thick. Should one day an egg get fertilised by sperm, it would land on the thick cosy lining and that's where a pregnancy would start. However, if the egg doesn't get fertilised your body no longer needs the lining, so (here comes the hormones again!) your hormones instruct your body to break the lining down and remove it from the uterus via your vagina.",
  },
  {
    id: 2,
    question: "Breast Health and Self-Examination",
    answer: "Regular breast self-examinations are crucial for early detection of any abnormalities. Perform a self-exam once a month, preferably a few days after your period ends. Look for changes in size, shape, or color, and feel for lumps or thickening. If you notice any changes or have concerns, consult with your healthcare provider promptly.",
  },
  // Add more topics as needed...
];

export function Blogs() {
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState(null);
  const [readSections, setReadSections] = useState(Array(womenHealthTopics.length).fill(false));
  const [completedBlogs, setCompletedBlogs] = useState(0);
  const [completedTopics, setCompletedTopics] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [savedPosts, setSavedPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [allSectionsRead, setAllSectionsRead] = useState(false);
  const [quizScore, setQuizScore] = useState(null);
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const toggleAccordion = (id) => {
    setActiveItem((prev) => (prev === id ? null : id));
  };

  const handleRead = (index) => {
    const updatedReadSections = [...readSections];
    updatedReadSections[index] = true;
    setReadSections(updatedReadSections);
    setCompletedTopics(updatedReadSections.filter(Boolean).length);

    if (updatedReadSections.every(Boolean)) {
      setAllSectionsRead(true);
    }
  };

  const handleSavePost = (postId, e) => {
    e.stopPropagation();
    setSavedPosts((prev) => {
      if (prev.includes(postId)) {
        return prev.filter((id) => id !== postId);
      } else {
        return [...prev, postId];
      }
    });
  };

  const handleShare = (postId, e) => {
    e.stopPropagation();
    const articleUrl = `${window.location.origin}/blogs`;

    if (navigator.share) {
      navigator.share({
        title: 'Check out this article!',
        text: "Here's something interesting I found:",
        url: articleUrl,
      });
    } else {
      navigator.clipboard.writeText(articleUrl);
      alert('Link copied to clipboard!');
    }
  };

  const handleCardClick = (post) => {
    setSelectedPost(post);
    if (!savedPosts.includes(post.id)) {
      setCompletedBlogs((prev) => prev + 1);
    }
  };

  const handleQuizComplete = (score) => {
    setQuizScore(score);
  };

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  // Filter posts based on category and search query
  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         post.author.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const { width } = useScreenSize();

  // Auto-close sidebar on mobile when route changes
  useEffect(() => {
    if (width < 816) {
      setSidebarVisible(false);
    }
  }, [navigate, width]);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-gray-50 via-white to-pink-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900/20">
      <SideBar
        sidebarVisible={sidebarVisible}
        setSidebarVisible={setSidebarVisible}
        activeLink={2}
      />

      {/* Mobile Menu Button */}
      {!sidebarVisible && width < 816 && (
        <button
          onClick={() => setSidebarVisible(true)}
          className="fixed top-6 left-6 z-50 p-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-2xl shadow-2xl border border-pink-300 transition-all duration-300 hover:scale-110"
          aria-label="Open menu"
        >
          <Menu size={20} />
        </button>
      )}

      {/* Desktop Toggle Button */}
      {width > 816 && (
        <button
          onClick={toggleSidebar}
          className={`fixed z-50 p-3 bg-white/90 dark:bg-gray-800/90 backdrop-blur-md border border-gray-200 dark:border-gray-600 text-gray-600 dark:text-gray-300 rounded-full shadow-lg transition-all duration-300 ease-out hover:bg-white dark:hover:bg-gray-700 hover:shadow-xl hover:scale-110 ${
            sidebarVisible ? 'left-64 top-6' : 'left-6 top-6'
          }`}
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

      {/* Mobile Overlay */}
      {sidebarVisible && width < 816 && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
          onClick={() => setSidebarVisible(false)}
        />
      )}

      {/* Main Content */}
      <main
        className={`flex-1 transition-all duration-300 ease-in-out min-w-0 ${
          sidebarVisible && width > 816 ? "lg:ml-80" : "ml-0"
        }`}
      >
        <div className="max-w-7xl mx-auto space-y-8 p-6">
          {/* Header Section */}
          <div className="text-center space-y-4">
            <div className="inline-flex items-center gap-2 bg-white/80 dark:bg-gray-800/80 backdrop-blur-md text-purple-700 dark:text-purple-300 px-4 py-2 rounded-2xl text-sm font-semibold border border-purple-200 dark:border-purple-800 shadow-lg">
              <Sparkles className="w-4 h-4" />
              Women's Health Education
            </div>
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-pink-600 via-purple-600 to-blue-600 dark:from-pink-400 dark:via-purple-400 dark:to-blue-400 bg-clip-text text-transparent">
              Education Hub
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Empowering women through comprehensive health education and resources
            </p>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedBlogs}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Articles Read</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center">
                  <GraduationCap className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{completedTopics}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Topics Completed</p>
                </div>
              </div>
            </div>
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">{quizScore || 0}/3</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Quiz Score</p>
                </div>
              </div>
            </div>
          </div>

          {/* Search and Filter Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-6 border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="flex flex-col lg:flex-row gap-4 items-stretch">
              {/* Search Input */}
              <div className="flex-1 relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search articles, topics, or authors..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-14 pl-12 pr-4 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-300"
                />
              </div>
              
              {/* Category Filter */}
              <div className="flex gap-4">
                <div className="relative min-w-[200px]">
                  <Filter className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full h-14 pl-12 pr-10 text-gray-900 dark:text-white bg-white dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent appearance-none transition-all duration-300"
                  >
                    <option value="All">All Categories</option>
                    <option value="Health">Health</option>
                    <option value="Nutrition">Nutrition</option>
                    <option value="Wellness">Wellness</option>
                    <option value="Fitness">Fitness</option>
                    <option value="Mental Health">Mental Health</option>
                    <option value="Hygiene">Hygiene</option>
                    <option value="Contraception">Contraception</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* Featured Article */}
          <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="absolute -top-20 -right-20 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="relative">
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="w-5 h-5 text-yellow-300" />
                <span className="font-semibold">Featured Article</span>
              </div>
              <h2 className="text-2xl md:text-3xl font-bold mb-4">
                Embracing Your Cycle: A Guide to Menstrual Wellness
              </h2>
              <p className="text-pink-100 mb-6 max-w-2xl">
                Discover how to work with your menstrual cycle for optimal health and well-being. 
                Learn about cycle tracking, symptom management, and holistic approaches to menstrual care.
              </p>
              <button className="bg-white text-pink-600 px-6 py-3 rounded-xl font-semibold hover:bg-gray-100 transform transition-all duration-300 hover:scale-105 shadow-lg">
                Read Featured Article
              </button>
            </div>
          </div>

          {/* Blog Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPosts.map((post) => (
              <div
                key={post.id}
                className="group bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700 hover:shadow-2xl transform transition-all duration-500 hover:scale-105 cursor-pointer overflow-hidden"
                onClick={() => handleCardClick(post)}
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                      {post.icon}
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={(e) => handleSavePost(post.id, e)}
                        className={`p-2 rounded-xl transition-all duration-300 ${
                          savedPosts.includes(post.id)
                            ? "bg-pink-100 text-pink-600 dark:bg-pink-900/30 dark:text-pink-400"
                            : "bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-pink-100 hover:text-pink-600"
                        }`}
                      >
                        <Bookmark className={`w-4 h-4 ${savedPosts.includes(post.id) ? "fill-current" : ""}`} />
                      </button>
                      <button
                        onClick={(e) => handleShare(post.id, e)}
                        className="p-2 rounded-xl bg-gray-100 text-gray-500 dark:bg-gray-700 dark:text-gray-400 hover:bg-pink-100 hover:text-pink-600 transition-all duration-300"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 rounded-full">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3 line-clamp-2 leading-relaxed">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <span className="font-medium text-gray-700 dark:text-gray-300">{post.author}</span>
                      <span>•</span>
                      <span>{post.readingTime} read</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Women's Health Topics Section */}
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                Women's Health 101
              </h2>
              <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                Explore key topics in women's health to deepen your understanding and take control of your well-being.
              </p>
            </div>

            {/* Progress Section */}
            <div className="bg-gradient-to-r from-pink-50 to-purple-50 dark:from-gray-700 dark:to-gray-800 rounded-2xl p-6 mb-8">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Learning Progress
                </span>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {readSections.filter(Boolean).length}/{readSections.length} completed
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-gradient-to-r from-pink-500 to-purple-500 h-3 rounded-full transition-all duration-1000 ease-out"
                  style={{
                    width: `${(readSections.filter(Boolean).length / readSections.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Accordion */}
            <div className="space-y-4">
              {womenHealthTopics.map(({ id, question, answer }, index) => (
                <div
                  key={id}
                  className="border border-pink-200 dark:border-pink-800 rounded-2xl overflow-hidden transition-all duration-300 hover:shadow-lg"
                >
                  <button
                    className="flex justify-between items-center w-full p-6 text-left bg-white dark:bg-gray-800 hover:bg-pink-50 dark:hover:bg-gray-700 transition-colors duration-300"
                    onClick={() => toggleAccordion(id)}
                  >
                    <div className="flex items-center gap-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        readSections[index] 
                          ? "bg-green-100 text-green-600 dark:bg-green-900/30 dark:text-green-400" 
                          : "bg-gray-100 text-gray-400 dark:bg-gray-700 dark:text-gray-500"
                      }`}>
                        {readSections[index] ? "✓" : index + 1}
                      </div>
                      <span className="text-lg font-semibold text-gray-800 dark:text-gray-200">
                        {question}
                      </span>
                    </div>
                    {activeItem === id ? (
                      <ChevronUp className="text-pink-500 w-5 h-5" />
                    ) : (
                      <ChevronDown className="text-pink-500 w-5 h-5" />
                    )}
                  </button>
                  {activeItem === id && (
                    <div className="p-6 bg-gray-50 dark:bg-gray-900 border-t border-pink-100 dark:border-pink-800">
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-6">
                        {answer}
                      </p>
                      <div className="flex items-center justify-between">
                        <label className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 cursor-pointer">
                          <div className="relative">
                            <input
                              type="checkbox"
                              checked={readSections[index]}
                              onChange={() => handleRead(index)}
                              className="sr-only"
                            />
                            <div className={`w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-300 ${
                              readSections[index]
                                ? "bg-pink-500 border-pink-500"
                                : "bg-white border-gray-300 dark:bg-gray-700 dark:border-gray-600"
                            }`}>
                              {readSections[index] && (
                                <ChevronUp className="w-4 h-4 text-white" />
                              )}
                            </div>
                          </div>
                          <span className="font-medium">Mark as read</span>
                        </label>
                        {readSections[index] && (
                          <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                            <GraduationCap className="w-4 h-4" />
                            <span className="text-sm font-medium">Completed</span>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Quiz Section */}
          {allSectionsRead && (
            <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-md rounded-2xl p-8 border border-gray-100 dark:border-gray-700 shadow-lg">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 dark:from-pink-400 dark:to-purple-400 bg-clip-text text-transparent mb-4">
                  Knowledge Check Quiz
                </h2>
                <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
                  Test your knowledge on women's health topics. Answer the questions below and see how much you've learned!
                </p>
              </div>
              <Quiz onQuizComplete={handleQuizComplete} />
            </div>
          )}
        </div>
      </main>

      {/* Modal for selected post */}
      {selectedPost && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white dark:bg-gray-800 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-6 flex justify-between items-center">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {selectedPost.title}
              </h2>
              <button
                onClick={() => setSelectedPost(null)}
                className="p-2 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 transition-colors"
              >
                <X className="w-5 h-5 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-gradient-to-br from-pink-100 to-purple-100 dark:from-pink-900/30 dark:to-purple-900/30 rounded-2xl flex items-center justify-center">
                  {selectedPost.icon}
                </div>
                <div>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="font-semibold text-gray-700 dark:text-gray-300">{selectedPost.author}</span>
                    <span>•</span>
                    <span>{selectedPost.date}</span>
                    <span>•</span>
                    <span>{selectedPost.readingTime} read</span>
                  </div>
                  <div className="mt-1">
                    <span className="inline-block px-3 py-1 text-xs font-semibold bg-pink-100 text-pink-700 dark:bg-pink-900/30 dark:text-pink-300 rounded-full">
                      {selectedPost.category}
                    </span>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed text-lg">
                {selectedPost.content}
              </p>
              
              {selectedPost.video && (
                <div className="space-y-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-pink-500" />
                    Video Explanation
                  </h3>
                  <div className="bg-gray-100 dark:bg-gray-700 rounded-xl overflow-hidden">
                    {selectedPost.video}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Blogs;