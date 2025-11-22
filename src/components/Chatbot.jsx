import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Send,
  Moon,
  Sun,
  Trash2,
  LayoutDashboard,
  Bot,
  MessageSquare,
  HeartPulse,
  Paperclip,
  Smile,
  Volume2,
  VolumeX,
  HelpCircle,
  BookOpen,
  ChevronRight,
  Mic,
  Square,
  Download,
  Share2
} from "lucide-react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

const GEMINI_API_KEY = "AIzaSyA_2bSrBX_5j8lSvsQe4U3VAytI2VdPi-w";
const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const TAB_CHOICES = [
  {
    title: "Health & Wellness",
    desc: "Physical and mental wellbeing support",
    icon: <HeartPulse className="text-pink-500 hover:text-pink-600" size={28} />,
    key: "health",
    intro: "You're in the Health & Wellness tab. Feel free to ask about periods, cycle tracking, body changes, or mental health.",
    color: "from-pink-500 to-rose-500",
    bgColor: "from-pink-50 to-rose-50 dark:from-pink-950 dark:to-rose-950"
  },
  {
    title: "Supportive Chat",
    desc: "Friendly conversations and emotional support",
    icon: <MessageSquare className="text-purple-500 hover:text-purple-600" size={28} />,
    key: "support",
    intro: "You're in Supportive Chat. Need to talk, vent, or share how you feel? I'm here for emotional support.",
    color: "from-purple-500 to-indigo-500",
    bgColor: "from-purple-50 to-indigo-50 dark:from-purple-950 dark:to-indigo-950"
  },
  {
    title: "Learning & Growth",
    desc: "Educational support and personal development",
    icon: <BookOpen className="text-indigo-500 hover:text-indigo-600" size={28} />,
    key: "learning",
    intro: "You're in Learning & Growth. Ask about personal development, study tips, or learning about your body and mind.",
    color: "from-indigo-500 to-blue-500",
    bgColor: "from-indigo-50 to-blue-50 dark:from-indigo-950 dark:to-blue-950"
  },
];

const popularEmojis = [
  "😊", "😂", "❤️", "😍", "🥰", "😭", "😘", "🥺", "✨", "😅",
  "🙏", "🔥", "😊", "💕", "😌", "💜", "😩", "😤", "🥳", "💪",
];

function getTabByKey(key) {
  return TAB_CHOICES.find((t) => t.key === key);
}

export function Chatbot() {
  const navigate = useNavigate();
  const [sidebarVisible, setSidebarVisible] = useState(true);
  const [selectedTab, setSelectedTab] = useState(() => {
    const storedTab = sessionStorage.getItem("Herizon_selectedTab");
    return storedTab ? storedTab : null;
  });
  const [messages, setMessages] = useState(() => {
    const stored = sessionStorage.getItem("Herizon_messages");
    return stored ? JSON.parse(stored) : [];
  });
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [speechRecognition, setSpeechRecognition] = useState(null);
  const [currentSpeakingMessage, setCurrentSpeakingMessage] = useState(null);
  
  const inputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const { width } = useScreenSize();
  const [userName, setUserName] = useState(() => {
    const stored = sessionStorage.getItem("Herizon_username");
    return stored ? stored : "";
  });

  // Initialize speech recognition
  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setInput(prev => prev + transcript);
        setIsRecording(false);
      };

      recognition.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      setSpeechRecognition(recognition);
    }
  }, []);

  // Sync state to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("Herizon_selectedTab", selectedTab ? selectedTab : "");
  }, [selectedTab]);
  
  useEffect(() => {
    sessionStorage.setItem("Herizon_messages", JSON.stringify(messages));
  }, [messages]);
  
  useEffect(() => {
    sessionStorage.setItem("Herizon_username", userName || "");
  }, [userName]);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Alternative scroll method for smooth scrolling to specific element
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ 
      behavior: "smooth",
      block: "end"
    });
  }, [messages, isTyping]);

  // Always focus the input bar after message sent or tab change
  useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
  }, [isTyping, messages, selectedTab]);

  // On mount, restore state from sessionStorage
  useEffect(() => {
    const storedTab = sessionStorage.getItem("Herizon_selectedTab");
    const storedMsgs = sessionStorage.getItem("Herizon_messages");
    const storedName = sessionStorage.getItem("Herizon_username");
    if (storedTab) setSelectedTab(storedTab);
    if (storedMsgs) setMessages(JSON.parse(storedMsgs));
    if (storedName) setUserName(storedName);
  }, []);

  const handleTabSelect = (key) => {
    setSelectedTab(key);
    const tab = getTabByKey(key);
    const newMessages = [
      {
        role: "assistant",
        content: tab.intro,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      },
    ];
    setMessages(newMessages);
    sessionStorage.setItem("Herizon_selectedTab", key);
    sessionStorage.setItem("Herizon_messages", JSON.stringify(newMessages));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim() || isTyping) return;

    const userText = input.trim();
    setInput("");
    const userMessage = {
      role: "user",
      content: userText,
      timestamp: new Date().toISOString(),
      id: Date.now().toString()
    };
    
    setMessages((prev) => [...prev, userMessage]);
    setIsTyping(true);

    // Update userName context if user says "my name is"
    let updatedName = userName;
    if (!userName) {
      const match = userText.match(/my name is\s+([A-Za-z]{2,20})/i);
      if (match) updatedName = match[1];
    }

    const tab = getTabByKey(selectedTab);
    const lastMsgs = [
      ...(messages.length > 0 ? messages : [{ 
        role: "assistant", 
        content: tab?.intro || "", 
        timestamp: new Date().toISOString(),
        id: "initial"
      }]),
      userMessage,
    ].slice(-6);

    const systemPrompt = `
You are Eve, a warm, concise, and friendly AI assistant for the Herizon platform—a site for women and girls' health, wellness, and support.
You answer women's health, wellness, emotional support, personal development, periods, puberty, and related questions.
If the user asks about unrelated topics (like rocket science), politely decline and gently bring the conversation back to "${tab?.title || "General"}".
If the user asks about their name, or says "my name is...", you can recognize, use, or recall their name, but don't overuse it. It's okay to answer what's my name.
Your answers should be friendly, supportive, concise, and not repetitive. Do not repeat the user's name in every reply. Never refuse basic conversational questions (like "what's my name?")—answer them like a good human friend would, but do not indulge in off-topic conversations.
Do not answer personal, technical, or political questions unrelated to women health and welfare—politely steer back to women's health.
Always stay positive and non-judgmental.

Recent conversation:
${lastMsgs.map((m) => `${m.role === "user" ? "User" : "Eve"}: ${m.content}`).join("\n")}
Eve:`;

    try {
      const result = await model.generateContent(systemPrompt);
      let text = (result.response?.text() || "").trim();
      if (updatedName && text) {
        text = text.replace(new RegExp(`^(Hi,?\\s+)?(${updatedName}[,:\\s-]+)`, "i"), "");
      }
      
      const assistantMessage = {
        role: "assistant",
        content: text,
        timestamp: new Date().toISOString(),
        id: (Date.now() + 1).toString()
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      setUserName(updatedName);
    } catch (error) {
      console.error("API Error:", error);
      const errorMessage = {
        role: "assistant",
        content: "Sorry, I couldn't generate a response. Please check your connection and try again.",
        timestamp: new Date().toISOString(),
        id: (Date.now() + 1).toString()
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 50);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const clearChat = () => {
    if (window.confirm("Are you sure you want to clear the chat history?")) {
      setMessages([]);
      setSelectedTab(null);
      setUserName("");
      sessionStorage.removeItem("Herizon_messages");
      sessionStorage.removeItem("Herizon_selectedTab");
      sessionStorage.removeItem("Herizon_username");
    }
  };

  const exportChat = () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'Eve'}: ${msg.content}\n${new Date(msg.timestamp).toLocaleString()}`
    ).join('\n\n');
    
    const blob = new Blob([chatText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `herizon-chat-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const shareChat = async () => {
    const chatText = messages.map(msg => 
      `${msg.role === 'user' ? 'You' : 'Eve'}: ${msg.content}`
    ).join('\n');
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'My Herizon Chat',
          text: chatText
        });
      } catch (error) {
        console.log('Sharing cancelled');
      }
    } else {
      navigator.clipboard.writeText(chatText).then(() => {
        alert('Chat copied to clipboard!');
      });
    }
  };

  const speakMessage = (messageId, text) => {
    if ("speechSynthesis" in window) {
      // Stop any current speech
      window.speechSynthesis.cancel();
      
      setIsSpeaking(true);
      setCurrentSpeakingMessage(messageId);
      
      const utterance = new window.SpeechSynthesisUtterance(text);
      utterance.rate = 0.9;
      utterance.pitch = 1;
      utterance.volume = 0.8;
      
      utterance.onend = () => {
        setIsSpeaking(false);
        setCurrentSpeakingMessage(null);
      };
      
      utterance.onerror = () => {
        setIsSpeaking(false);
        setCurrentSpeakingMessage(null);
      };
      
      window.speechSynthesis.speak(utterance);
    }
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setCurrentSpeakingMessage(null);
    }
  };

  const toggleSpeechRecognition = () => {
    if (!speechRecognition) {
      alert("Speech recognition is not supported in your browser.");
      return;
    }

    if (isRecording) {
      speechRecognition.stop();
      setIsRecording(false);
    } else {
      speechRecognition.start();
      setIsRecording(true);
    }
  };

  const toggleSidebar = () => setSidebarVisible(!sidebarVisible);
  const toggleEmojiPicker = () => setShowEmojiPicker((prev) => !prev);
  const toggleDarkMode = () => setDarkMode(!darkMode);

  const addEmoji = (emoji) => {
    setInput((prev) => prev + emoji);
    setShowEmojiPicker(false);
    inputRef.current?.focus();
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const fileMessage = {
        role: "user",
        content: `Uploaded file: ${file.name}`,
        timestamp: new Date().toISOString(),
        id: Date.now().toString()
      };
      setMessages((prev) => [...prev, fileMessage]);
    }
  };

  const formatMessage = (text) => {
    return text.split("**").map((part, index) =>
      index % 2 === 1 ? (
        <strong key={index} className="text-pink-600 dark:text-pink-400">
          {part}
        </strong>
      ) : (
        part
      )
    );
  };

  const formatTime = (timestamp) => {
    return new Date(timestamp).toLocaleTimeString([], { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  // Close emoji picker when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (showEmojiPicker && !event.target.closest('.emoji-picker-container') && !event.target.closest('.emoji-toggle')) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showEmojiPicker]);

  // Apply dark mode to document
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  return (
    <div className={`min-h-screen ${darkMode ? 'dark' : ''} transition-colors duration-300`}>
      <div className="flex h-screen bg-gray-50 dark:bg-gray-900">
        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-80 transform transition-transform duration-300 ease-in-out ${
          sidebarVisible ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0 lg:static lg:inset-0`}>
          <SideBar
            sidebarVisible={sidebarVisible}
            setSidebarVisible={setSidebarVisible}
            activeLink={9}
          />
        </div>

        {/* Main Chat Area */}
        <div className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ${
          sidebarVisible && width > 1024 ? 'lg:ml-0' : 'ml-0'
        }`}>
          
          {/* Header */}
          <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4 flex-shrink-0">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                {width < 1024 && (
                  <button
                    onClick={toggleSidebar}
                    className="p-2 rounded-lg bg-pink-500 text-white hover:bg-pink-600 transition-colors"
                  >
                    <LayoutDashboard size={20} />
                  </button>
                )}
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg">
                    <Bot size={24} className="text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">
                      Herizon AI Assistant
                    </h1>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Your companion for health, wellness, and support
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Toggle dark mode"
                >
                  {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                </button>
                <button
                  onClick={exportChat}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Export chat"
                >
                  <Download size={20} />
                </button>
                <button
                  onClick={shareChat}
                  className="p-2 rounded-lg bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  aria-label="Share chat"
                >
                  <Share2 size={20} />
                </button>
                <button
                  onClick={clearChat}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  aria-label="Clear chat"
                >
                  <Trash2 size={20} />
                </button>
                <button
                  onClick={() => navigate("/voice-agent")}
                  className="px-4 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all flex items-center space-x-2"
                >
                  <Volume2 size={20} />
                  <span>Voice Agent</span>
                </button>
              </div>
            </div>
          </div>

          {/* Chat Content */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {!selectedTab ? (
              // Tab Selection Screen
              <div className="flex-1 flex items-center justify-center p-8 overflow-auto">
                <div className="text-center max-w-4xl w-full">
                  <div className="mb-12">
                    <div className="inline-flex items-center justify-center p-6 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl mb-6 shadow-2xl">
                      <Bot size={80} className="text-white" />
                    </div>
                    <h2 className="text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent mb-4">
                      Hello! I'm Eve 🌸
                    </h2>
                    <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                      Your AI companion for health, wellness, and emotional support. 
                      Choose a topic to start our conversation.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                    {TAB_CHOICES.map((tab) => (
                      <div
                        key={tab.key}
                        className={`group p-8 bg-gradient-to-br ${tab.bgColor} border-2 border-transparent hover:border-pink-300 dark:hover:border-pink-600 rounded-3xl cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl`}
                        onClick={() => handleTabSelect(tab.key)}
                      >
                        <div className="text-center">
                          <div className="inline-flex items-center justify-center p-4 bg-white dark:bg-gray-800 rounded-2xl mb-4 shadow-lg group-hover:shadow-xl transition-shadow">
                            {tab.icon}
                          </div>
                          <h3 className={`font-bold text-lg mb-2 bg-gradient-to-r ${tab.color} bg-clip-text text-transparent`}>
                            {tab.title}
                          </h3>
                          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                            {tab.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              // Chat Interface
              <>
                {/* Messages Area - Fixed scrolling container */}
                <div 
                  ref={messagesContainerRef}
                  className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 dark:bg-gray-900"
                  style={{ 
                    minHeight: 0, // Important for flexbox scrolling
                    WebkitOverflowScrolling: 'touch' // Smooth scrolling on iOS
                  }}
                >
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className={`max-w-3xl rounded-3xl p-6 shadow-lg ${
                          message.role === "user"
                            ? "bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-br-none"
                            : "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-none"
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          {message.role === "assistant" && (
                            <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              AI
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <div className="text-sm leading-relaxed break-words">
                              {formatMessage(message.content)}
                            </div>
                            <div className={`flex items-center justify-between mt-3 text-xs ${
                              message.role === "user" ? "text-pink-100" : "text-gray-500"
                            }`}>
                              <span>{formatTime(message.timestamp)}</span>
                              {message.role === "assistant" && (
                                <button
                                  onClick={() =>
                                    currentSpeakingMessage === message.id
                                      ? stopSpeaking()
                                      : speakMessage(message.id, message.content)
                                  }
                                  className={`flex items-center space-x-1 px-3 py-1 rounded-full transition-colors ${
                                    currentSpeakingMessage === message.id
                                      ? "bg-red-500 hover:bg-red-600 text-white"
                                      : "bg-pink-500 hover:bg-pink-600 text-white"
                                  }`}
                                >
                                  {currentSpeakingMessage === message.id ? 
                                    <Square size={14} /> : <Volume2 size={14} />
                                  }
                                  <span className="text-xs">
                                    {currentSpeakingMessage === message.id ? "Stop" : "Read"}
                                  </span>
                                </button>
                              )}
                            </div>
                          </div>
                          {message.role === "user" && (
                            <div className="flex-shrink-0 w-8 h-8 bg-pink-400 rounded-full flex items-center justify-center text-white text-sm font-bold">
                              You
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="bg-white dark:bg-gray-800 rounded-3xl rounded-bl-none p-6 shadow-lg border border-gray-200 dark:border-gray-700">
                        <div className="flex items-center space-x-3 text-gray-600 dark:text-gray-400">
                          <div className="w-8 h-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                            AI
                          </div>
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                          <span className="text-sm">Eve is thinking...</span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-6 flex-shrink-0">
                  <form onSubmit={handleSubmit} className="flex space-x-4">
                    <div className="flex-1 relative">
                      <input
                        type="text"
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyPress}
                        disabled={isTyping}
                        placeholder="Type your message... (Press Enter to send)"
                        className="w-full px-6 py-4 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-2xl focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 text-lg transition-all duration-200 disabled:opacity-50"
                      />
                      
                      {/* Emoji Picker */}
                      {showEmojiPicker && (
                        <div className="emoji-picker-container absolute bottom-full mb-2 left-0 right-0 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-600 rounded-2xl shadow-2xl p-4 z-10">
                          <div className="grid grid-cols-8 gap-2 max-h-48 overflow-y-auto">
                            {popularEmojis.map((emoji, index) => (
                              <button
                                key={index}
                                onClick={() => addEmoji(emoji)}
                                className="text-2xl hover:bg-pink-50 dark:hover:bg-gray-700 rounded-xl p-2 transition-colors duration-150"
                                type="button"
                              >
                                {emoji}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      {/* File Upload */}
                      <input
                        type="file"
                        id="file-upload"
                        className="hidden"
                        onChange={handleFileUpload}
                        accept="image/*, .pdf, .doc, .docx"
                        disabled={isTyping}
                      />
                      <label
                        htmlFor="file-upload"
                        className={`flex items-center justify-center w-14 h-14 rounded-2xl cursor-pointer transition-colors duration-200 ${
                          isTyping 
                            ? 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed' 
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title="Attach file"
                      >
                        <Paperclip size={24} className="text-gray-600 dark:text-gray-400" />
                      </label>

                      {/* Voice Input */}
                      <button
                        type="button"
                        onClick={toggleSpeechRecognition}
                        disabled={isTyping}
                        className={`flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-200 ${
                          isRecording
                            ? 'bg-red-500 hover:bg-red-600 text-white animate-pulse'
                            : `bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 ${
                                isTyping ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-200 dark:hover:bg-gray-600'
                              }`
                        }`}
                        title={isRecording ? "Stop recording" : "Start voice input"}
                      >
                        {isRecording ? <Square size={24} /> : <Mic size={24} />}
                      </button>

                      {/* Emoji Picker Toggle */}
                      <button
                        type="button"
                        onClick={toggleEmojiPicker}
                        disabled={isTyping}
                        className={`emoji-toggle flex items-center justify-center w-14 h-14 rounded-2xl transition-colors duration-200 ${
                          isTyping 
                            ? 'bg-gray-100 dark:bg-gray-700 opacity-50 cursor-not-allowed' 
                            : 'bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
                        }`}
                        title="Add emoji"
                      >
                        <Smile size={24} className="text-gray-600 dark:text-gray-400" />
                      </button>

                      {/* Send Button */}
                      <button
                        type="submit"
                        disabled={isTyping || !input.trim()}
                        className="flex items-center justify-center w-14 h-14 bg-gradient-to-r from-pink-500 to-purple-600 hover:from-pink-600 hover:to-purple-700 disabled:opacity-50 disabled:cursor-not-allowed rounded-2xl transition-all duration-200 shadow-lg hover:shadow-xl"
                        title="Send message"
                      >
                        <Send size={24} className="text-white" />
                      </button>
                    </div>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Chatbot;