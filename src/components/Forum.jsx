import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
    LayoutDashboard,
    HeartPulse,
    Home,
    GraduationCap,
    ShoppingBag,
    ActivitySquare,
    ClipboardList,
    Stethoscope,
    Bot,
    ChevronRight,
    Calendar,
    Heart,
    Moon,
    Sun,
    Users,
    MessageSquare,
    Search,
    Filter,
    TrendingUp,
    HeartHandshake,
    Gamepad2,
    Handshake,
    Bookmark,
    Bell,
    CheckCircle,
    AlertCircle,
    User,
    XCircle,
    ChevronDown,
    AppWindowMac,
    Plus,
    Flame,
    Star,
    Trophy,
    Flower,
    Dumbbell,
    Brain,
    Baby,
    BookOpen,
    Shield,
    Mail,
    Lock,
    HelpCircle,
    Share2,
    MessageCircleMore,
    ThumbsUp,
    ThumbsDown,
    Reply,
    Flag,
    Edit,
    Trash2,
    Image as ImageIcon,
    Link as LinkIcon,
    Smile,
    PlusCircle,
    Tag,
    Eye,
    X
} from "lucide-react";
import CommunityChat from "./CommunityChat";
import SideBar from "./SideBar";
import useScreenSize from "../hooks/useScreenSize";

// Add post tags for categorization
const postTags = [
    "PCOS",
    "Menstruation",
    "Hormones",
    "Wellness",
    "Diet",
    "Exercise",
    "Mental Health",
    "Support",
    "Q&A",
    "Experience",
    "Tips",
    "Research",
];

// Add reaction types with emojis and labels
const reactionTypes = [
    { emoji: "👍", label: "Helpful", count: 0 },
    { emoji: "❤️", label: "Support", count: 0 },
    { emoji: "🤗", label: "Hug", count: 0 },
    { emoji: "💡", label: "Insightful", count: 0 },
    { emoji: "🙏", label: "Thanks", count: 0 },
];

// Update CreatePost component to receive forumCategories as a prop
const CreatePost = ({ isOpen, onClose, onSubmit, forumCategories, darkMode }) => {
    const [formData, setFormData] = useState({
        title: "",
        content: "",
        category: "",
        tags: [],
        visibility: "public",
        image: null,
    });
    const [error, setError] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleTagToggle = (tag) => {
        setFormData((prev) => ({
            ...prev,
            tags: prev.tags.includes(tag)
                ? prev.tags.filter((t) => t !== tag)
                : [...prev.tags, tag],
        }));
    };

    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setFormData((prev) => ({
                    ...prev,
                    image: reader.result,
                }));
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setIsSubmitting(true);

        try {
            if (
                !formData.title.trim() ||
                !formData.content.trim() ||
                !formData.category
            ) {
                throw new Error("Please fill in all required fields");
            }

            await onSubmit(formData);
            // Reset form after successful submission
            setFormData({
                title: "",
                content: "",
                category: "",
                tags: [],
                visibility: "public",
                image: null,
            });
            setImagePreview(null);
            onClose();
        } catch (err) {
            setError(err.message);
        } finally {
            setIsSubmitting(false);
        }
    };

    // Reset form when modal closes
    useEffect(() => {
        if (!isOpen) {
            setFormData({
                title: "",
                content: "",
                category: "",
                tags: [],
                visibility: "public",
                image: null,
            });
            setImagePreview(null);
            setError("");
        }
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
            onClick={(e) => {
                if (e.target === e.currentTarget) {
                    onClose();
                }
            }}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                className={`rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto shadow-xl ${
                    darkMode 
                        ? "bg-gray-800 text-white" 
                        : "bg-white text-gray-800"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-2xl font-semibold">
                            Create New Post
                        </h3>
                        <button
                            type="button"
                            onClick={onClose}
                            className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                            <X className="h-6 w-6" />
                        </button>
                    </div>

                    {error && (
                        <div className={`mb-4 p-3 rounded-xl border ${
                            darkMode 
                                ? "bg-red-900/50 text-red-200 border-red-800" 
                                : "bg-red-50 text-red-600 border-red-100"
                        }`}>
                            {error}
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            placeholder="Enter post title..."
                            value={formData.title}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                                darkMode 
                                    ? "bg-gray-700 border-gray-600 text-white" 
                                    : "bg-white border-gray-300 text-gray-700"
                            }`}
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleChange}
                            className={`w-full p-3 border rounded-xl focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                                darkMode 
                                    ? "bg-gray-700 border-gray-600 text-white" 
                                    : "bg-white border-gray-300 text-gray-700"
                            }`}
                            required
                        >
                            <option value="" className={darkMode ? "text-gray-400 bg-gray-700" : "text-gray-400"}>
                                Select Category
                            </option>
                            {forumCategories.map((category) => (
                                <option
                                    key={category.id}
                                    value={category.name}
                                    className={darkMode ? "text-white bg-gray-700" : "text-gray-700"}
                                >
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {postTags.map((tag) => (
                                <button
                                    type="button"
                                    key={tag}
                                    onClick={() => handleTagToggle(tag)}
                                    className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                                        formData.tags.includes(tag)
                                            ? "bg-pink-500 text-white hover:bg-pink-600"
                                            : darkMode 
                                                ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                    }`}
                                >
                                    #{tag}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="flex space-x-3">
                        <button
                            type="button"
                            onClick={() => document.getElementById("image-upload").click()}
                            className={`flex items-center space-x-2 px-4 py-2 rounded-xl transition-all duration-200 ${
                                darkMode 
                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                        >
                            <ImageIcon className="h-5 w-5" />
                            <span>Add Image</span>
                        </button>
                        <input
                            id="image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                        />
                        
                        <div className="flex-1">
                            <label className="block text-sm font-medium mb-2">
                                Visibility
                            </label>
                            <select
                                name="visibility"
                                value={formData.visibility}
                                onChange={handleChange}
                                className={`w-full px-4 py-2 rounded-xl border focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 ${
                                    darkMode 
                                        ? "bg-gray-700 border-gray-600 text-white" 
                                        : "bg-gray-100 border-gray-300 text-gray-700"
                                }`}
                            >
                                <option value="public" className={darkMode ? "text-white bg-gray-700" : "text-gray-700 bg-white"}>
                                    Public
                                </option>
                                <option value="private" className={darkMode ? "text-white bg-gray-700" : "text-gray-700 bg-white"}>
                                    Private
                                </option>
                                <option value="anonymous" className={darkMode ? "text-white bg-gray-700" : "text-gray-700 bg-white"}>
                                    Anonymous
                                </option>
                            </select>
                        </div>
                    </div>

                    {imagePreview && (
                        <div className="relative w-full h-48">
                            <img
                                src={imagePreview}
                                alt="Preview"
                                className="w-full h-full object-cover rounded-xl"
                            />
                            <button
                                type="button"
                                onClick={() => {
                                    setImagePreview(null);
                                    setFormData((prev) => ({ ...prev, image: null }));
                                }}
                                className={`absolute top-2 right-2 p-1.5 rounded-full transition-all duration-200 shadow-lg ${
                                    darkMode 
                                        ? "bg-gray-700/80 hover:bg-gray-600 text-gray-300" 
                                        : "bg-white/80 hover:bg-white text-gray-600"
                                }`}
                            >
                                <X className="h-4 w-4" />
                            </button>
                        </div>
                    )}

                    <div>
                        <label className="block text-sm font-medium mb-2">
                            Content *
                        </label>
                        <textarea
                            name="content"
                            placeholder="Write your post content..."
                            value={formData.content}
                            onChange={handleChange}
                            className={`w-full p-4 min-h-[200px] border rounded-xl placeholder-gray-400 focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-all duration-200 resize-none ${
                                darkMode 
                                    ? "bg-gray-700 border-gray-600 text-white" 
                                    : "bg-white border-gray-300 text-gray-700"
                            }`}
                            required
                        />
                    </div>

                    <div className="flex justify-end space-x-3 mt-6 pt-4 border-t border-gray-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className={`px-6 py-2.5 rounded-xl font-medium transition-all duration-200 ${
                                darkMode 
                                    ? "bg-gray-700 hover:bg-gray-600 text-gray-300" 
                                    : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                            }`}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-pink-500 to-pink-600 text-white font-medium shadow-sm hover:shadow-md hover:scale-[1.02] transition-all duration-200 disabled:opacity-50 flex items-center space-x-2"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                                    <span>Posting...</span>
                                </>
                            ) : (
                                <>
                                    <PlusCircle className="h-5 w-5" />
                                    <span>Create Post</span>
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </motion.div>
    );
};

export function Forum() {
    const navigate = useNavigate();
    const [darkMode, setDarkMode] = useState(
        () => localStorage.getItem("darkMode") === "true"
    );
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [activeTab, setActiveTab] = useState("forums");
    const [searchTerm, setSearchTerm] = useState("");
    const [notifications, setNotifications] = useState([
        { id: 1, text: "New reply on your post", read: false },
        { id: 2, text: "3 new messages in Women's Health", read: false },
    ]);
    const [showProfileMenu, setShowProfileMenu] = useState(false);
    const [showNotifications, setShowNotifications] = useState(false);
    const [sortBy, setSortBy] = useState("newest");
    const [filterBy, setFilterBy] = useState("all");
    const [solvedPosts, setSolvedPosts] = useState([1]);
    const [bookmarks, setBookmarks] = useState([]);
    const [showFilters, setShowFilters] = useState(false);
    const [showNewPostModal, setShowNewPostModal] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const postsPerPage = 5;
    const [selectedTags, setSelectedTags] = useState([]);
    const [postReactions, setPostReactions] = useState({});
    const [selectedCommunity, setSelectedCommunity] = useState(null);
    const [showCommunityChat, setShowCommunityChat] = useState(false);

    // Fixed: Added state for recentPosts
    const [recentPosts, setRecentPosts] = useState([
        {
            id: 1,
            title: "My PCOS Journey",
            content: "Sharing my experience with PCOS diagnosis and management...",
            author: "Ariza Khan",
            likes: 45,
            comments: 12,
            category: "Women's Health",
            timestamp: "2024-03-10T14:30:00Z",
            tags: ["PCOS", "Experience"],
            views: 234,
        },
        {
            id: 2,
            title: "Best Foods for Hormonal Balance",
            content: "Here are my top 10 nutrition tips for hormonal health...",
            author: "Riya Patel",
            likes: 38,
            comments: 9,
            category: "Fitness & Nutrition",
            timestamp: "2024-03-09T09:15:00Z",
            tags: ["Diet", "Hormones"],
            views: 189,
        },
        {
            id: 3,
            title: "Coping with Endometriosis",
            content: "Looking for support and sharing my pain management strategies...",
            author: "Ishita Roy",
            likes: 52,
            comments: 17,
            category: "Reproductive Health",
            timestamp: "2024-03-08T16:45:00Z",
            tags: ["Support", "Experience"],
            views: 312,
        },
    ]);

    const { width } = useScreenSize();

    // Toggle dark mode function
    const toggleDarkMode = () => {
        const newDarkMode = !darkMode;
        setDarkMode(newDarkMode);
        localStorage.setItem("darkMode", newDarkMode.toString());
        
        // Apply dark mode to root element
        if (newDarkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    // Initialize dark mode on component mount
    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const handleSearch = (e) => {
        setSearchTerm(e.target.value);
        setCurrentPage(1); // Reset to first page when searching
    };

    // Fixed: Properly implemented handleLike function
    const handleLike = (postId) => {
        setRecentPosts((posts) =>
            posts.map((post) =>
                post.id === postId ? { ...post, likes: post.likes + 1 } : post
            )
        );
    };

    const handleBookmark = (postId) => {
        setBookmarks((prev) =>
            prev.includes(postId)
                ? prev.filter((id) => id !== postId)
                : [...prev, postId]
        );
    };

    const markNotificationRead = (id) => {
        setNotifications((notifications) =>
            notifications.map((n) => (n.id === id ? { ...n, read: true } : n))
        );
        setShowNotifications(false);
    };

    const toggleSolved = (postId) => {
        setSolvedPosts((prev) =>
            prev.includes(postId)
                ? prev.filter((id) => id !== postId)
                : [...prev, postId]
        );
    };

    const handleCreatePost = async (postData) => {
        const newPostData = {
            id: Date.now(), // Use timestamp for unique ID
            title: postData.title,
            content: postData.content,
            author: "You",
            likes: 0,
            comments: 0,
            category: postData.category,
            timestamp: new Date().toISOString(),
            tags: postData.tags,
            image: postData.image,
            visibility: postData.visibility,
            reactions: {},
            views: 0,
        };

        setRecentPosts((prev) => [newPostData, ...prev]);
        setShowNewPostModal(false);
    };

    const handleReaction = (postId, reactionType) => {
        setPostReactions((prev) => {
            const postReactions = prev[postId] || {};
            const currentCount = postReactions[reactionType] || 0;
            return {
                ...prev,
                [postId]: {
                    ...postReactions,
                    [reactionType]: currentCount + 1,
                },
            };
        });
    };

    const handleDeletePost = (postId) => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            setRecentPosts((prev) => prev.filter((post) => post.id !== postId));
        }
    };

    const forumCategories = [
        {
            id: 1,
            name: "Women's Health",
            icon: <Flower className="h-6 w-6" />,
            color: darkMode ? "bg-pink-900/20" : "bg-pink-100",
            members: 1200,
            posts: 5600,
        },
        {
            id: 2,
            name: "Fitness & Nutrition",
            icon: <Dumbbell className="h-6 w-6" />,
            color: darkMode ? "bg-green-900/20" : "bg-green-100",
            members: 980,
            posts: 4200,
        },
        {
            id: 3,
            name: "Mental Wellness",
            icon: <Brain className="h-6 w-6" />,
            color: darkMode ? "bg-blue-900/20" : "bg-blue-100",
            members: 850,
            posts: 3800,
        },
        {
            id: 4,
            name: "Reproductive Health",
            icon: <Baby className="h-6 w-6" />,
            color: darkMode ? "bg-purple-900/20" : "bg-purple-100",
            members: 720,
            posts: 3100,
        },
        {
            id: 5,
            name: "Sexual Health",
            icon: <Shield className="h-6 w-6" />,
            color: darkMode ? "bg-red-900/20" : "bg-red-100",
            members: 650,
            posts: 2800,
        },
        {
            id: 6,
            name: "Menopause Support",
            icon: <BookOpen className="h-6 w-6" />,
            color: darkMode ? "bg-orange-900/20" : "bg-orange-100",
            members: 590,
            posts: 2400,
        },
    ];

    const trendingTopics = [
        { title: "Menstrual Cup Usage", icon: <Flame className="h-5 w-5" />, posts: 234 },
        { title: "Hormone Balancing Foods", icon: <Star className="h-5 w-5" />, posts: 189 },
        { title: "Endometriosis Awareness", icon: <Trophy className="h-5 w-5" />, posts: 156 },
        { title: "Fertility Tracking Apps", icon: <TrendingUp className="h-5 w-5" />, posts: 142 },
        { title: "Menopause Symptoms", icon: <HelpCircle className="h-5 w-5" />, posts: 128 },
    ];

    const filteredForums = forumCategories.filter((forum) => {
        if (filterBy === "large") return forum.members > 1000;
        if (filterBy === "active") return forum.posts > 5000;
        return true;
    });

    const filteredPosts = [...recentPosts]
        .filter((post) => {
            const matchesSearch =
                post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
                post.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (post.tags && post.tags.some(tag => 
                    tag.toLowerCase().includes(searchTerm.toLowerCase())
                ));
            const matchesCategory =
                selectedCategory === "all" || post.category === selectedCategory;
            return matchesSearch && matchesCategory;
        })
        .sort((a, b) => {
            if (sortBy === "likes") return b.likes - a.likes;
            if (sortBy === "comments") return b.comments - a.comments;
            if (sortBy === "views") return (b.views || 0) - (a.views || 0);
            return new Date(b.timestamp) - new Date(a.timestamp);
        });

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);
    const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
    };

    const ProfileMenu = () => (
        <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={`absolute right-0 mt-2 w-64 rounded-xl shadow-lg py-2 border z-50 ${
                darkMode 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-200 text-gray-700"
            }`}
        >
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
                <User className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">Profile</span>
            </button>
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
                <Bookmark className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">Bookmarks</span>
            </button>
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
                <CheckCircle className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">My Solutions</span>
            </button>
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
                <Mail className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">Messages</span>
            </button>
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"
            }`}>
                <Lock className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">Privacy Settings</span>
            </button>
            <div className={`border-t my-1 ${darkMode ? "border-gray-700" : "border-gray-200"}`}></div>
            <button className={`flex items-center w-full px-4 py-3 transition-all duration-200 ${
                darkMode ? "hover:bg-red-900/20 text-red-400" : "hover:bg-red-50 text-red-600"
            }`}>
                <XCircle className="mr-3 h-5 w-5" /> 
                <span className="text-sm font-medium">Logout</span>
            </button>
        </motion.div>
    );

    const renderPost = (post) => (
        <motion.div
            key={post.id}
            variants={cardVariants}
            className={`p-6 rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 relative group ${
                darkMode 
                    ? "bg-gray-800 border-gray-700 text-white" 
                    : "bg-white border-gray-100 text-gray-800"
            }`}
        >
            <div className="absolute top-4 right-4 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <button
                    onClick={() => toggleSolved(post.id)}
                    className={`p-2 rounded-full shadow-sm hover:shadow-md transition-all ${
                        darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                    title={solvedPosts.includes(post.id) ? "Mark as unsolved" : "Mark as solved"}
                >
                    {solvedPosts.includes(post.id) ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                        <AlertCircle className="h-4 w-4 text-yellow-500" />
                    )}
                </button>
                <button
                    onClick={() => handleBookmark(post.id)}
                    className={`p-2 rounded-full shadow-sm hover:shadow-md transition-all ${
                        darkMode ? "bg-gray-700" : "bg-white"
                    }`}
                    title="Bookmark post"
                >
                    <Bookmark
                        className={`h-4 w-4 ${bookmarks.includes(post.id)
                            ? "text-pink-500 fill-current"
                            : darkMode ? "text-gray-400" : "text-gray-400"
                            }`}
                    />
                </button>
                {post.author === "You" && (
                    <>
                        <button
                            onClick={() => {/* Implement edit */}}
                            className={`p-2 rounded-full shadow-sm hover:shadow-md transition-all ${
                                darkMode ? "bg-gray-700" : "bg-white"
                            }`}
                            title="Edit post"
                        >
                            <Edit className="h-4 w-4 text-blue-500" />
                        </button>
                        <button
                            onClick={() => handleDeletePost(post.id)}
                            className={`p-2 rounded-full shadow-sm hover:shadow-md transition-all ${
                                darkMode ? "bg-gray-700" : "bg-white"
                            }`}
                            title="Delete post"
                        >
                            <Trash2 className="h-4 w-4 text-red-500" />
                        </button>
                    </>
                )}
            </div>

            <div className={`flex items-center text-sm mb-3 ${
                darkMode ? "text-gray-400" : "text-gray-500"
            }`}>
                <img
                    src="/images/women.jpeg"
                    alt={post.author}
                    className="w-8 h-8 rounded-full mr-3 object-cover"
                />
                <span className={`font-medium ${darkMode ? "text-gray-300" : "text-gray-700"}`}>{post.author}</span>
                <span className="mx-2">•</span>
                <span>{new Date(post.timestamp).toLocaleDateString()}</span>
                <span className="mx-2">•</span>
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                    darkMode ? "bg-pink-900/20 text-pink-300" : "bg-pink-100 text-pink-700"
                }`}>
                    {post.category}
                </span>
                {post.visibility === "anonymous" && (
                    <span className={`ml-2 text-xs px-2 py-1 rounded-full ${
                        darkMode ? "text-gray-400 bg-gray-700" : "text-gray-400 bg-gray-100"
                    }`}>
                        Anonymous
                    </span>
                )}
            </div>

            <h3 className={`text-xl font-semibold mb-3 hover:text-pink-600 transition-colors cursor-pointer ${
                darkMode ? "text-white" : "text-gray-800"
            }`}>
                {post.title}
            </h3>
            <p className={`mb-4 leading-relaxed ${
                darkMode ? "text-gray-300" : "text-gray-600"
            }`}>{post.content}</p>

            {post.image && (
                <div className="mb-4 rounded-lg overflow-hidden">
                    <img
                        src={post.image}
                        alt="Post attachment"
                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                    />
                </div>
            )}

            {post.tags && post.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className={`px-3 py-1 rounded-full text-xs font-medium hover:bg-gray-200 transition-colors ${
                                darkMode 
                                    ? "bg-gray-700 text-gray-300 hover:bg-gray-600" 
                                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                            }`}
                        >
                            #{tag}
                        </span>
                    ))}
                </div>
            )}

            <div className={`flex justify-between items-center pt-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-100"
            }`}>
                <div className="flex items-center space-x-4">
                    <button
                        onClick={() => handleLike(post.id)}
                        className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                            darkMode 
                                ? "bg-pink-900/20 text-pink-300 hover:bg-pink-900/30" 
                                : "bg-pink-50 text-pink-700 hover:bg-pink-100"
                        }`}
                    >
                        <Heart
                            className={`h-5 w-5 ${post.likes > 0 ? "text-pink-500 fill-current" : ""}`}
                        />
                        <span className="font-medium">{post.likes}</span>
                    </button>
                    <button className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        darkMode 
                            ? "bg-blue-900/20 text-blue-300 hover:bg-blue-900/30" 
                            : "bg-blue-50 text-blue-700 hover:bg-blue-100"
                    }`}>
                        <MessageSquare className="h-5 w-5" />
                        <span className="font-medium">{post.comments}</span>
                    </button>
                    <div className={`flex items-center space-x-2 text-sm ${
                        darkMode ? "text-gray-400" : "text-gray-500"
                    }`}>
                        <Eye className="h-4 w-4" />
                        <span>{post.views || 0} views</span>
                    </div>
                </div>
                <div className="flex items-center space-x-2">
                    <button className={`p-2 rounded-lg transition-colors ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                    }`}>
                        <Share2 className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                    </button>
                    <button className={`p-2 rounded-lg transition-colors ${
                        darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                    }`}>
                        <Flag className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                    </button>
                </div>
            </div>

            <div className={`mt-4 flex items-center space-x-2 pt-4 border-t ${
                darkMode ? "border-gray-700" : "border-gray-100"
            }`}>
                {reactionTypes.map((reaction) => (
                    <button
                        key={reaction.emoji}
                        onClick={() => handleReaction(post.id, reaction.emoji)}
                        className={`flex items-center space-x-1 px-3 py-1.5 rounded-full transition-colors ${
                            darkMode ? "bg-gray-700 hover:bg-gray-600" : "bg-gray-50 hover:bg-gray-100"
                        }`}
                        title={reaction.label}
                    >
                        <span className="text-lg">{reaction.emoji}</span>
                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                            {postReactions[post.id]?.[reaction.emoji] || 0}
                        </span>
                    </button>
                ))}
            </div>
        </motion.div>
    );

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (showProfileMenu && !event.target.closest('.profile-menu-trigger')) {
                setShowProfileMenu(false);
            }
            if (showNotifications && !event.target.closest('.notifications-trigger')) {
                setShowNotifications(false);
            }
            if (showFilters && !event.target.closest('.filters-trigger')) {
                setShowFilters(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [showProfileMenu, showNotifications, showFilters]);

    return (
        <div className={`flex min-h-screen ${darkMode ? "bg-gray-900" : "bg-gray-50"}`}>
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={14}
                darkMode={darkMode}
                toggleDarkMode={toggleDarkMode}
            />
            
            {/* Fixed: Improved sidebar toggle button positioning */}
            {width > 816 && (
                <button
                    onClick={toggleSidebar}
                    className={`fixed top-1/2 transform -translate-y-1/2 z-40 p-2 bg-pink-500 text-white rounded-r-lg transition-all duration-300 ease-in-out hover:bg-pink-600 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50 ${
                        sidebarVisible ? 'left-64' : 'left-0'
                    }`}
                    aria-label={sidebarVisible ? "Hide sidebar" : "Show sidebar"}
                >
                    <ChevronRight
                        size={16}
                        className={`transition-transform duration-300 ${sidebarVisible ? "rotate-180" : "rotate-0"}`}
                    />
                </button>
            )}
            
            {/* Fixed: Main content layout */}
            <main
                className={`flex-1 transition-all duration-300 ease-in-out ${
                    sidebarVisible ? 'lg:ml-64' : 'ml-0'
                } w-full`}
            >
                <div className="p-6 max-w-7xl mx-auto space-y-8">
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => navigate(-1)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors border shadow-sm ${
                                    darkMode 
                                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                            >
                                <ChevronRight className="rotate-180 h-4 w-4" />
                                <span className="font-medium">Back</span>
                            </button>
                            <div>
                                <h1 className={`text-3xl font-bold ${darkMode ? "text-white" : "text-gray-900"}`}>
                                    Community Forums
                                </h1>
                                <p className={`mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                                    Connect, share, and learn with our community
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 flex-wrap">
                            {/* Dark Mode Toggle Button */}
                            <button
                                onClick={toggleDarkMode}
                                className={`p-2 rounded-lg border shadow-sm transition-colors ${
                                    darkMode 
                                        ? "bg-gray-800 border-gray-700 text-yellow-400 hover:bg-gray-700" 
                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                }`}
                                title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
                            >
                                {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
                            </button>

                            <button
                                onClick={() => navigate("/")}
                                className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors shadow-sm"
                            >
                                <Home className="h-4 w-4" />
                                <span className="font-medium">Home</span>
                            </button>
                            
                            <button
                                onClick={() => setShowNewPostModal(true)}
                                className="flex items-center gap-2 px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors shadow-sm"
                            >
                                <Plus className="h-4 w-4" />
                                <span className="font-medium">New Post</span>
                            </button>
                            
                            <button
                                onClick={() => navigate('/forums/globalchat')}
                                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors shadow-sm font-medium"
                            >
                                Global Chat
                            </button>

                            {/* Notifications */}
                            <div className="relative notifications-trigger">
                                <button
                                    onClick={() => setShowNotifications(!showNotifications)}
                                    className={`p-2 rounded-lg border shadow-sm relative transition-colors ${
                                        darkMode 
                                            ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                            : "bg-white border-gray-200 text-gray-600 hover:bg-gray-50"
                                    }`}
                                >
                                    <Bell className="h-5 w-5" />
                                    {notifications.some((n) => !n.read) && (
                                        <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full ring-2 ring-white" />
                                    )}
                                </button>
                                
                                <AnimatePresence>
                                    {showNotifications && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                            animate={{ opacity: 1, y: 0, scale: 1 }}
                                            exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                            className={`absolute right-0 mt-2 w-80 rounded-xl shadow-lg border z-50 ${
                                                darkMode 
                                                    ? "bg-gray-800 border-gray-700" 
                                                    : "bg-white border-gray-200"
                                            }`}
                                        >
                                            <div className={`p-4 border-b ${
                                                darkMode ? "border-gray-700" : "border-gray-200"
                                            }`}>
                                                <h3 className={`font-semibold ${
                                                    darkMode ? "text-white" : "text-gray-900"
                                                }`}>Notifications</h3>
                                            </div>
                                            <div className="max-h-96 overflow-y-auto">
                                                {notifications.length === 0 ? (
                                                    <div className="p-4 text-center text-gray-500">
                                                        No new notifications
                                                    </div>
                                                ) : (
                                                    notifications.map((notification) => (
                                                        <div
                                                            key={notification.id}
                                                            className={`p-4 border-b last:border-b-0 ${
                                                                !notification.read 
                                                                    ? darkMode 
                                                                        ? 'bg-blue-900/20' 
                                                                        : 'bg-blue-50' 
                                                                    : darkMode 
                                                                        ? 'hover:bg-gray-700' 
                                                                        : 'hover:bg-gray-50'
                                                            }`}
                                                        >
                                                            <div className="flex justify-between items-start">
                                                                <p className={`text-sm ${
                                                                    darkMode ? "text-gray-300" : "text-gray-700"
                                                                }`}>{notification.text}</p>
                                                                {!notification.read && (
                                                                    <button
                                                                        onClick={() => markNotificationRead(notification.id)}
                                                                        className="ml-2 px-2 py-1 text-xs bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
                                                                    >
                                                                        Mark read
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </div>
                                                    ))
                                                )}
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>

                            {/* Profile Menu */}
                            <div className="relative profile-menu-trigger">
                                <button
                                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                                    className={`flex items-center gap-2 p-1 rounded-lg border shadow-sm transition-colors ${
                                        darkMode 
                                            ? "bg-gray-800 border-gray-700 hover:bg-gray-700" 
                                            : "bg-white border-gray-200 hover:bg-gray-50"
                                    }`}
                                >
                                    <img
                                        src="/images/women.jpeg"
                                        alt="Profile"
                                        className="h-8 w-8 rounded-full object-cover"
                                    />
                                    <ChevronDown className={`h-4 w-4 ${darkMode ? "text-gray-400" : "text-gray-600"}`} />
                                </button>
                                <AnimatePresence>
                                    {showProfileMenu && <ProfileMenu />}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Filters and Search Section */}
                    <div className="flex flex-col lg:flex-row gap-4 justify-between items-start lg:items-center">
                        <div className="flex flex-wrap items-center gap-3">
                            <button
                                onClick={() => setActiveTab("forums")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    activeTab === "forums" 
                                        ? "bg-pink-500 text-white shadow-sm" 
                                        : darkMode 
                                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700" 
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                Forums
                            </button>

                            <button
                                onClick={() => setActiveTab("posts")}
                                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                    activeTab === "posts" 
                                        ? "bg-pink-500 text-white shadow-sm" 
                                        : darkMode 
                                            ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700" 
                                            : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                }`}
                            >
                                Recent Posts
                            </button>

                            {/* Filters Dropdown */}
                            <div className="relative filters-trigger">
                                <button
                                    onClick={() => setShowFilters(!showFilters)}
                                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border shadow-sm transition-colors ${
                                        darkMode 
                                            ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                            : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                    }`}
                                >
                                    <Filter className="h-4 w-4" />
                                    <span>Filters</span>
                                    <ChevronDown className="h-4 w-4" />
                                </button>
                                
                                {showFilters && (
                                    <div className={`absolute top-full left-0 mt-2 w-64 rounded-xl shadow-lg border z-40 p-4 space-y-3 ${
                                        darkMode 
                                            ? "bg-gray-800 border-gray-700" 
                                            : "bg-white border-gray-200"
                                    }`}>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${
                                                darkMode ? "text-gray-300" : "text-gray-700"
                                            }`}>
                                                Sort By
                                            </label>
                                            <select
                                                value={sortBy}
                                                onChange={(e) => setSortBy(e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                                    darkMode 
                                                        ? "bg-gray-700 border-gray-600 text-white" 
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                <option value="newest">Newest First</option>
                                                <option value="likes">Most Likes</option>
                                                <option value="comments">Most Comments</option>
                                                <option value="views">Most Views</option>
                                            </select>
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${
                                                darkMode ? "text-gray-300" : "text-gray-700"
                                            }`}>
                                                Filter By
                                            </label>
                                            <select
                                                value={filterBy}
                                                onChange={(e) => setFilterBy(e.target.value)}
                                                className={`w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                                    darkMode 
                                                        ? "bg-gray-700 border-gray-600 text-white" 
                                                        : "border-gray-300"
                                                }`}
                                            >
                                                <option value="all">All Forums</option>
                                                <option value="large">Large Communities</option>
                                                <option value="active">Active Communities</option>
                                            </select>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Category Filter */}
                            <select
                                value={selectedCategory}
                                onChange={(e) => {
                                    setSelectedCategory(e.target.value);
                                    setCurrentPage(1);
                                }}
                                className={`px-4 py-2 rounded-lg border shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent ${
                                    darkMode 
                                        ? "bg-gray-800 border-gray-700 text-gray-300" 
                                        : "bg-white border-gray-200 text-gray-700"
                                }`}
                            >
                                <option value="all">All Categories</option>
                                {forumCategories.map((category) => (
                                    <option key={category.id} value={category.name}>
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Search */}
                        <div className="relative w-full lg:w-80">
                            <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${
                                darkMode ? "text-gray-400" : "text-gray-400"
                            }`} />
                            <input
                                type="text"
                                placeholder="Search forums, posts, or topics..."
                                value={searchTerm}
                                onChange={handleSearch}
                                className={`w-full pl-10 pr-4 py-2 border rounded-lg shadow-sm focus:ring-2 focus:ring-pink-500 focus:border-transparent transition-colors ${
                                    darkMode 
                                        ? "bg-gray-800 border-gray-700 text-white placeholder-gray-400" 
                                        : "bg-white border-gray-200 text-gray-700 placeholder-gray-400"
                                }`}
                            />
                        </div>
                    </div>

                    {/* Main Content */}
                    {activeTab === "forums" && (
                        <motion.div
                            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.1
                                    }
                                }
                            }}
                        >
                            {filteredForums.map((forum) => (
                                <motion.div
                                    key={forum.id}
                                    variants={cardVariants}
                                    className={`rounded-xl shadow-sm border hover:shadow-md transition-all duration-300 overflow-hidden ${
                                        darkMode 
                                            ? "bg-gray-800 border-gray-700" 
                                            : "bg-white border-gray-200"
                                    }`}
                                >
                                    <div className="p-6">
                                        <div className="flex items-center mb-4">
                                            <div className={`p-3 ${forum.color} rounded-lg`}>
                                                {forum.icon}
                                            </div>
                                            <div className="ml-4">
                                                <h3 className={`text-lg font-semibold ${
                                                    darkMode ? "text-white" : "text-gray-900"
                                                }`}>{forum.name}</h3>
                                                <div className={`flex items-center gap-4 mt-1 text-sm ${
                                                    darkMode ? "text-gray-400" : "text-gray-500"
                                                }`}>
                                                    <span className="flex items-center gap-1">
                                                        <Users className="h-4 w-4" />
                                                        {forum.members.toLocaleString()} members
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageSquare className="h-4 w-4" />
                                                        {forum.posts.toLocaleString()} posts
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => {
                                                setSelectedCommunity(forum);
                                                setShowCommunityChat(true);
                                            }}
                                            className="w-full mt-4 bg-pink-500 text-white py-2.5 rounded-lg hover:bg-pink-600 transition-colors font-medium"
                                        >
                                            Join Community
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    )}

                    {activeTab === "posts" && (
                        <motion.div
                            className="space-y-6"
                            initial="hidden"
                            animate="visible"
                            variants={{
                                visible: {
                                    transition: {
                                        staggerChildren: 0.05
                                    }
                                }
                            }}
                        >
                            {currentPosts.length === 0 ? (
                                <div className={`text-center py-12 rounded-xl shadow-sm border ${
                                    darkMode 
                                        ? "bg-gray-800 border-gray-700" 
                                        : "bg-white border-gray-200"
                                }`}>
                                    <MessageSquare className={`h-12 w-12 mx-auto mb-4 ${
                                        darkMode ? "text-gray-600" : "text-gray-400"
                                    }`} />
                                    <h3 className={`text-lg font-semibold mb-2 ${
                                        darkMode ? "text-white" : "text-gray-900"
                                    }`}>No posts found</h3>
                                    <p className={`mb-4 ${
                                        darkMode ? "text-gray-400" : "text-gray-500"
                                    }`}>Try adjusting your search or filters</p>
                                    <button
                                        onClick={() => {
                                            setSearchTerm("");
                                            setSelectedCategory("all");
                                            setCurrentPage(1);
                                        }}
                                        className="px-4 py-2 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition-colors"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <>
                                    {currentPosts.map((post) => renderPost(post))}
                                    
                                    {/* Pagination */}
                                    {totalPages > 1 && (
                                        <div className="flex justify-center items-center gap-2 pt-6">
                                            <button
                                                onClick={() => paginate(Math.max(1, currentPage - 1))}
                                                disabled={currentPage === 1}
                                                className={`px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    darkMode 
                                                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                Previous
                                            </button>
                                            
                                            {Array.from({ length: totalPages }, (_, index) => (
                                                <button
                                                    key={index + 1}
                                                    onClick={() => paginate(index + 1)}
                                                    className={`px-3 py-2 rounded-lg font-medium transition-colors ${
                                                        currentPage === index + 1
                                                            ? "bg-pink-500 text-white"
                                                            : darkMode 
                                                                ? "bg-gray-800 text-gray-300 hover:bg-gray-700 border border-gray-700" 
                                                                : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-200"
                                                    }`}
                                                >
                                                    {index + 1}
                                                </button>
                                            ))}
                                            
                                            <button
                                                onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
                                                disabled={currentPage === totalPages}
                                                className={`px-3 py-2 rounded-lg border transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
                                                    darkMode 
                                                        ? "bg-gray-800 border-gray-700 text-gray-300 hover:bg-gray-700" 
                                                        : "bg-white border-gray-200 text-gray-700 hover:bg-gray-50"
                                                }`}
                                            >
                                                Next
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}
                        </motion.div>
                    )}

                    {/* Trending Topics Sidebar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className={`rounded-xl shadow-sm border p-6 ${
                            darkMode 
                                ? "bg-gray-800 border-gray-700" 
                                : "bg-white border-gray-200"
                        }`}
                    >
                        <h3 className={`text-xl font-semibold mb-4 ${
                            darkMode ? "text-white" : "text-gray-900"
                        }`}>
                            Trending Topics
                        </h3>
                        <div className="space-y-3">
                            {trendingTopics.map((topic, index) => (
                                <div
                                    key={index}
                                    className={`flex items-center justify-between p-3 rounded-lg transition-colors cursor-pointer group ${
                                        darkMode 
                                            ? "hover:bg-gray-700" 
                                            : "hover:bg-gray-50"
                                    }`}
                                >
                                    <div className="flex items-center gap-3">
                                        <div className={`p-2 rounded-lg group-hover:bg-gray-200 transition-colors ${
                                            darkMode 
                                                ? "bg-gray-700 group-hover:bg-gray-600" 
                                                : "bg-gray-100"
                                        }`}>
                                            {topic.icon}
                                        </div>
                                        <span className={`font-medium group-hover:text-gray-900 ${
                                            darkMode 
                                                ? "text-gray-300 group-hover:text-white" 
                                                : "text-gray-700"
                                        }`}>
                                            {topic.title}
                                        </span>
                                    </div>
                                    <span className={`text-sm px-2 py-1 rounded-full ${
                                        darkMode 
                                            ? "text-gray-400 bg-gray-700" 
                                            : "text-gray-500 bg-gray-100"
                                    }`}>
                                        {topic.posts} posts
                                    </span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </main>

            {/* Modals */}
            <AnimatePresence>
                {showNewPostModal && (
                    <CreatePost
                        isOpen={showNewPostModal}
                        onClose={() => setShowNewPostModal(false)}
                        onSubmit={handleCreatePost}
                        forumCategories={forumCategories}
                        darkMode={darkMode}
                    />
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showCommunityChat && selectedCommunity && (
                    <CommunityChat
                        isOpen={showCommunityChat}
                        onClose={() => setShowCommunityChat(false)}
                        community={selectedCommunity}
                        currentUser="You"
                        darkMode={darkMode}
                    />
                )}
            </AnimatePresence>
        </div>
    );
}

export default Forum;