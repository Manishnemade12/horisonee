"use-client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCart,
    ChevronRight,
    ShoppingBag,
    Search,
    Heart,
    Star,
    X,
    Plus,
    Minus,
    Trash2,
    Send,
    Package,
    ExternalLink,
    Menu
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import useScreenSize from "../hooks/useScreenSize";
import SideBar from "./SideBar";
import axios from "axios";

function inferCategory(title) {
    if (!title) return "Other";
    
    const lowered = title.toLowerCase();
    if (lowered.includes("pad")) return "Pads";
    if (lowered.includes("tampon")) return "Tampons";
    if (lowered.includes("cup") || lowered.includes("menstrual cup")) return "Menstrual Cups";
    if (lowered.includes("pain") || lowered.includes("relief") || lowered.includes("cramp")) return "Pain Relief";
    if (lowered.includes("wellness") || lowered.includes("hygiene") || lowered.includes("care")) return "Wellness";
    if (lowered.includes("accessory") || lowered.includes("pouch") || lowered.includes("bag")) return "Accessories";
    if (lowered.includes("panty")) return "Panties";
    if (lowered.includes("kit")) return "Kits";
    return "Other";
}

function normalizeProducts(rawProducts) {
    if (!rawProducts || !Array.isArray(rawProducts)) return [];
    
    return rawProducts.map((item) => ({
        id: item.product_id || Math.random().toString(36).substr(2, 9),
        name: item.title || "Unnamed Product",
        brand: item.source || "Unknown Brand",
        price: item.extracted_price || Math.floor(Math.random() * 1000) + 100,
        rating: item.rating || (Math.random() * 2 + 3).toFixed(1),
        image: item.thumbnail || "/api/placeholder/150/150",
        link: item.product_link || "#",
        category: inferCategory(item.title),
        featured: Math.random() < 0.3,
    }));
}

const categories = [
    "All", "Pads", "Tampons", "Menstrual Cups", "Pain Relief", "Wellness", "Accessories", "Panties", "Kits"
];

export function Ecom() {
    const navigate = useNavigate();
    const [selectedCategory, setSelectedCategory] = useState("All");
    const [cartItems, setCartItems] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [sortBy, setSortBy] = useState("featured");
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [email, setEmail] = useState("");
    const [sidebarVisible, setSidebarVisible] = useState(true);
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const { width } = useScreenSize();

    // Auto-close sidebar on mobile, auto-open on desktop
    useEffect(() => {
        if (width <= 816) {
            setSidebarVisible(false);
        } else {
            setSidebarVisible(true);
        }
    }, [width]);

    useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
}, []);

    // Add keyboard support for closing sidebar
    useEffect(() => {
        const handleEscapeKey = (e) => {
            if (e.key === 'Escape' && sidebarVisible && width <= 816) {
                closeSidebar();
            }
        };

        document.addEventListener('keydown', handleEscapeKey);
        return () => document.removeEventListener('keydown', handleEscapeKey);
    }, [sidebarVisible, width]);

    useEffect(() => {
        const fetchPeriodProducts = async () => {
            try {
                setLoading(true);
                setError("");
                const res = await axios.get(
                    `https://Herizon-backend.onrender.com/api/products`,
                    {
                        params: { q: "menstrual products pads tampons cups" },
                        timeout: 15000
                    }
                );
                
                if (res.data && Array.isArray(res.data.products)) {
                    const normalized = normalizeProducts(res.data.products);
                    if (normalized.length === 0) {
                        throw new Error("No products received from API");
                    }
                    setProducts(normalized);
                } else {
                    throw new Error("Invalid response format from server");
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setError("Showing demo products. Real products will load when API is available.");
                setProducts([
                    {
                        id: "1",
                        name: "Organic Cotton Pads - Regular Flow",
                        brand: "EcoFem",
                        price: 299,
                        rating: 4.5,
                        image: "https://images.unsplash.com/photo-1601648764658-89e7a36a872d?w=150&h=150&fit=crop",
                        link: "#",
                        category: "Pads",
                        featured: true
                    },
                    {
                        id: "2",
                        name: "Silicone Menstrual Cup - Size A",
                        brand: "FlowCare",
                        price: 599,
                        rating: 4.8,
                        image: "https://images.unsplash.com/photo-1558618666-fcd25856cd63?w=150&h=150&fit=crop",
                        link: "#",
                        category: "Menstrual Cups",
                        featured: true
                    },
                    {
                        id: "3",
                        name: "Herbal Pain Relief Capsules",
                        brand: "NatureSooth",
                        price: 199,
                        rating: 4.2,
                        image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=150&h=150&fit=crop",
                        link: "#",
                        category: "Pain Relief",
                        featured: false
                    },
                    {
                        id: "4",
                        name: "Comfort Tampons - Regular",
                        brand: "SoftCare",
                        price: 249,
                        rating: 4.3,
                        image: "https://images.unsplash.com/photo-1584302179602-e4819bb92daa?w=150&h=150&fit=crop",
                        link: "#",
                        category: "Tampons",
                        featured: true
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchPeriodProducts();
    }, []);

    // Filter and sort products
    const filteredProducts = products
        .filter((product) => {
            const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
            const matchesSearch = searchQuery === "" || 
                product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                product.brand.toLowerCase().includes(searchQuery.toLowerCase());
            return matchesCategory && matchesSearch;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case "priceLowToHigh": return a.price - b.price;
                case "priceHighToLow": return b.price - a.price;
                case "rating": return b.rating - a.rating;
                default: return a.featured === b.featured ? 0 : a.featured ? -1 : 1;
            }
        });

    // Get product counts for each category
    const getCategoryCount = (category) => {
        if (category === "All") return products.length;
        return products.filter(product => product.category === category).length;
    };

    // Sidebar functions
    const toggleSidebar = () => {
        setSidebarVisible(!sidebarVisible);
    };

    const openSidebar = () => {
        setSidebarVisible(true);
    };

    const closeSidebar = () => {
        setSidebarVisible(false);
    };

    // Cart functions
    const addToCart = (product) => {
        setCartItems(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
    };

    const updateCartItemQuantity = (id, quantity) => {
        if (quantity === 0) {
            removeCartItem(id);
            return;
        }
        setCartItems(prev =>
            prev.map(item =>
                item.id === id ? { ...item, quantity } : item
            )
        );
    };

    const removeCartItem = (id) => {
        setCartItems(prev => prev.filter(item => item.id !== id));
    };

    const toggleFavorite = (productId) => {
        setFavorites(prev => 
            prev.includes(productId) 
                ? prev.filter(id => id !== productId)
                : [...prev, productId]
        );
    };

    const handleSubscribe = (e) => {
        e.preventDefault();
        alert(`Thank you for subscribing with ${email}!`);
        setEmail("");
    };

   const handleRazorpayPayment = () => {
    if (cartItems.length === 0) {
        alert("Your cart is empty!");
        return;
    }

    const options = {
        key: "rzp_test_RhxfSN9DTOUc1e", // ⭐ your Razorpay test key
        amount: total * 100,       // convert ₹ to paise
        currency: "INR",
        name: "Herizon Shop",
        description: "Checkout Payment",

        handler: function (response) {
            alert("Payment Successful! 🎉");
            console.log("Payment ID:", response.razorpay_payment_id);
            console.log("Order ID:", response.razorpay_order_id);
            console.log("Signature:", response.razorpay_signature);

            setCartItems([]);  // empty cart
            setIsCartOpen(false);
        },

        theme: {
            color: "#EC4899",
        },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
};


    const sendMailWithCartItems = async () => {
        if (cartItems.length === 0) {
            alert("Your cart is empty!");
            return;
        }

        const formspreeEndpoint = "https://formspree.io/f/mjkooylp";
        const emailBody = {
            subject: "Herizon Order - New Order Request",
            message: `
Order Details:
${cartItems.map(item => 
    `${item.name} (Qty: ${item.quantity}) - ₹${(item.price * item.quantity).toFixed(2)}`
).join('\n')}

Total: ₹${total.toFixed(2)}
            `.trim()
        };

        try {
            const response = await fetch(formspreeEndpoint, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(emailBody),
            });

            if (response.ok) {
                alert("Order details sent successfully! We'll contact you soon.");
                setIsCartOpen(false);
                setCartItems([]);
            } else {
                throw new Error("Failed to send order");
            }
        } catch (error) {
            console.error("Error sending email:", error);
            alert("Failed to send order details. Please try again.");
        }
    };

    const total = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Open cart
    const openCart = () => {
        setIsCartOpen(true);
    };

    // Close cart
    const closeCart = () => {
        setIsCartOpen(false);
    };

    // Loading skeleton component
    const ProductSkeleton = () => (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 animate-pulse">
            <div className="p-6 flex justify-center bg-gray-200 dark:bg-gray-700">
                <div className="w-32 h-32 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
            </div>
            <div className="p-6 space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                <div className="h-3 bg-gray-300 dark:bg-gray-600 rounded w-2/3"></div>
                <div className="h-6 bg-gray-300 dark:bg-gray-600 rounded w-1/2"></div>
                <div className="h-10 bg-gray-300 dark:bg-gray-600 rounded"></div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar - Fixed positioning */}
            <SideBar
                sidebarVisible={sidebarVisible}
                setSidebarVisible={setSidebarVisible}
                activeLink={4}
                onClose={closeSidebar}
            />
            
            {/* Main Content Area */}
            <div className={`transition-all duration-300 ease-in-out min-h-screen ${
                sidebarVisible && width > 816 ? "lg:ml-80" : "ml-0"
            }`}>
                {/* Top toggle button - only show on larger screens */}
                {width > 816 && (
                    <button
                        onClick={toggleSidebar}
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
                    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-8">
                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                {width <= 816 && (
                                    <button
                                        onClick={toggleSidebar}
                                        className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg shadow-lg hover:shadow-xl transition-all"
                                    >
                                        <Menu size={20} />
                                    </button>
                                )}
                                <div>
                                    <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                        Herizon Shop
                                    </h1>
                                    <p className="text-gray-600 dark:text-gray-400 mt-2 text-lg">
                                        Quality menstrual care products delivered to you
                                    </p>
                                </div>
                            </div>
                            
                            <button 
                                onClick={openCart}
                                className="relative p-3 bg-white dark:bg-gray-800 rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all"
                            >
                                <ShoppingCart className="h-5 w-5 text-pink-500" />
                                {cartItems.length > 0 && (
                                    <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                                        {cartItems.length}
                                    </span>
                                )}
                            </button>
                        </div>

                        {/* Search and Filters */}
                        <motion.div
                            initial={{ y: 20, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-4 md:p-6 border border-gray-200 dark:border-gray-700"
                        >
                            <div className="flex flex-col lg:flex-row gap-4 items-center">
                                {/* Search */}
                                <div className="relative flex-1 w-full">
                                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                                    <input
                                        type="text"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        placeholder="Search products..."
                                        className="w-full pl-12 pr-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
                                    />
                                </div>

                                {/* Sort */}
                                <div className="flex gap-3 w-full lg:w-auto">
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="flex-1 lg:flex-none px-4 py-3 bg-gray-50 dark:bg-gray-700 rounded-xl border border-gray-200 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-pink-300 text-gray-900 dark:text-white"
                                    >
                                        <option value="featured">Featured</option>
                                        <option value="priceLowToHigh">Price: Low to High</option>
                                        <option value="priceHighToLow">Price: High to Low</option>
                                        <option value="rating">Top Rated</option>
                                    </select>
                                </div>
                            </div>

                            {/* Categories */}
                            <div className="mt-4 flex flex-wrap gap-2 justify-center">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`px-3 py-2 rounded-full border transition-all duration-200 text-sm font-medium whitespace-nowrap ${
                                            selectedCategory === category
                                                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white border-transparent shadow-lg"
                                                : "bg-white text-gray-700 border-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-600 hover:bg-pink-50 dark:hover:bg-gray-600"
                                        }`}
                                    >
                                        {category}
                                        <span className="ml-1 text-xs opacity-80">
                                            ({getCategoryCount(category)})
                                        </span>
                                    </button>
                                ))}
                            </div>
                        </motion.div>

                        {/* Info Message */}
                        {error && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 text-center"
                            >
                                <p className="text-blue-800 dark:text-blue-200 text-sm">{error}</p>
                            </motion.div>
                        )}

                        {/* Products Section */}
                        <section className="space-y-6">
                            <div className="flex items-center justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
                                        {selectedCategory === "All" ? "All Products" : selectedCategory}
                                    </h2>
                                    <p className="text-gray-600 dark:text-gray-400 mt-1">
                                        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
                                    </p>
                                </div>
                            </div>

                            {loading ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                                    {[...Array(8)].map((_, i) => (
                                        <ProductSkeleton key={i} />
                                    ))}
                                </div>
                            ) : filteredProducts.length === 0 ? (
                                <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700">
                                    <Package className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-600 dark:text-gray-400 mb-2">
                                        No products found
                                    </h3>
                                    <p className="text-gray-500 dark:text-gray-500 mb-4">
                                        Try adjusting your search or filters
                                    </p>
                                    <button
                                        onClick={() => {
                                            setSearchQuery("");
                                            setSelectedCategory("All");
                                        }}
                                        className="px-6 py-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                                    >
                                        Clear Filters
                                    </button>
                                </div>
                            ) : (
                                <motion.div
                                    layout
                                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                                >
                                    {filteredProducts.map((product) => (
                                        <motion.div
                                            key={product.id}
                                            layout
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            whileHover={{ y: -4 }}
                                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-200 dark:border-gray-700 group hover:shadow-xl transition-all duration-300"
                                        >
                                            {/* Product Image */}
                                            <div className="relative p-6 flex justify-center bg-gray-50 dark:bg-gray-700">
                                                <img
                                                    src={product.image}
                                                    alt={product.name}
                                                    className="w-32 h-32 object-contain group-hover:scale-105 transition-transform duration-300 rounded-lg"
                                                    onError={(e) => {
                                                        e.target.src = "https://via.placeholder.com/150/FF69B4/FFFFFF?text=Product";
                                                    }}
                                                />
                                                <button
                                                    onClick={() => toggleFavorite(product.id)}
                                                    className="absolute top-4 right-4 p-2 bg-white dark:bg-gray-600 rounded-full shadow-lg hover:scale-110 transition-all"
                                                >
                                                    <Heart 
                                                        className={`h-5 w-5 ${
                                                            favorites.includes(product.id) 
                                                                ? "fill-pink-500 text-pink-500" 
                                                                : "text-gray-400 hover:text-pink-500"
                                                        }`}
                                                    />
                                                </button>
                                            </div>

                                            {/* Product Info */}
                                            <div className="p-4 space-y-3">
                                                <div>
                                                    <h3 className="font-semibold text-gray-800 dark:text-gray-200 line-clamp-2 text-sm leading-tight">
                                                        {product.name}
                                                    </h3>
                                                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                                                        {product.brand}
                                                    </p>
                                                </div>

                                                {/* Rating */}
                                                <div className="flex items-center gap-1">
                                                    <div className="flex">
                                                        {[1,2,3,4,5].map((star) => (
                                                            <Star
                                                                key={star}
                                                                className={`h-3 w-3 ${
                                                                    star <= Math.floor(product.rating)
                                                                        ? "fill-yellow-400 text-yellow-400"
                                                                        : "text-gray-300"
                                                                }`}
                                                            />
                                                        ))}
                                                    </div>
                                                    <span className="text-xs text-gray-500 ml-1">
                                                        ({product.rating})
                                                    </span>
                                                </div>

                                                {/* Price and Actions */}
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-bold bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent">
                                                        ₹{product.price}
                                                    </span>
                                                    <div className="flex gap-2">
                                                        <button
                                                            onClick={() => addToCart(product)}
                                                            className="p-2 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                                                        >
                                                            <Plus className="h-4 w-4" />
                                                        </button>
                                                        <a
                                                            href={product.link}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="p-2 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                                                        >
                                                            <ExternalLink className="h-4 w-4" />
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            )}
                        </section>

                        {/* Newsletter */}
                        <motion.section
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl shadow-xl overflow-hidden"
                        >
                            <div className="p-8 text-center text-white">
                                <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
                                <p className="text-pink-100 mb-6 max-w-2xl mx-auto">
                                    Get exclusive offers and period care tips delivered to your inbox.
                                </p>
                                <form
                                    onSubmit={handleSubscribe}
                                    className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto"
                                >
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter your email"
                                        className="flex-1 px-4 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/20 text-white placeholder-pink-200 focus:outline-none focus:ring-2 focus:ring-white"
                                        required
                                    />
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        type="submit"
                                        className="px-6 py-3 bg-white text-pink-600 rounded-lg font-semibold flex items-center justify-center gap-2 hover:bg-gray-100 transition-colors"
                                    >
                                        Subscribe <Send className="h-4 w-4" />
                                    </motion.button>
                                </form>
                            </div>
                        </motion.section>
                    </div>
                </main>
            </div>

            {/* Cart Sidebar */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black bg-opacity-50 z-40"
                            onClick={closeCart}
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-800 shadow-2xl z-50 flex flex-col"
                        >
                            {/* Header */}
                            <div className="flex items-center justify-between p-6 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-2xl font-bold flex items-center gap-3 dark:text-white">
                                    <ShoppingCart className="h-6 w-6" />
                                    Your Cart
                                    {cartItems.length > 0 && (
                                        <span className="bg-pink-500 text-white text-sm rounded-full h-6 w-6 flex items-center justify-center">
                                            {cartItems.length}
                                        </span>
                                    )}
                                </h2>
                                <button
                                    onClick={closeCart}
                                    className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                                >
                                    <X className="h-6 w-6" />
                                </button>
                            </div>

                            {/* Cart Content */}
                            <div className="flex-1 overflow-y-auto p-6">
                                {cartItems.length === 0 ? (
                                    <div className="flex flex-col items-center justify-center h-full gap-4 text-center">
                                        <div className="p-4 rounded-full bg-pink-100 dark:bg-pink-900/30">
                                            <ShoppingBag className="h-12 w-12 text-pink-500" />
                                        </div>
                                        <p className="text-gray-500 dark:text-gray-400 text-lg">
                                            Your cart is empty
                                        </p>
                                        <button
                                            onClick={closeCart}
                                            className="px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg hover:shadow-lg transition-all"
                                        >
                                            Continue Shopping
                                        </button>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <AnimatePresence>
                                            {cartItems.map((item) => (
                                                <motion.div
                                                    key={item.id}
                                                    initial={{ opacity: 0, scale: 0.9 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0.9 }}
                                                    className="flex items-center gap-4 p-4 rounded-xl bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600"
                                                >
                                                    <img
                                                        src={item.image}
                                                        alt={item.name}
                                                        className="w-12 h-12 object-contain rounded-lg bg-white p-1"
                                                    />
                                                    <div className="flex-1 min-w-0">
                                                        <h4 className="font-semibold text-gray-800 dark:text-gray-200 truncate text-sm">
                                                            {item.name}
                                                        </h4>
                                                        <p className="text-sm text-gray-600 dark:text-gray-400">
                                                            ₹{item.price} × {item.quantity}
                                                        </p>
                                                    </div>
                                                    <div className="flex items-center gap-2">
                                                        <button
                                                            onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                                                            className="p-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </button>
                                                        <span className="w-8 text-center font-medium text-gray-800 dark:text-gray-200 text-sm">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                                                            className="p-1 rounded-lg bg-white dark:bg-gray-600 border border-gray-300 dark:border-gray-500 hover:bg-gray-100 dark:hover:bg-gray-500"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </button>
                                                    </div>
                                                    <button
                                                        onClick={() => removeCartItem(item.id)}
                                                        className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </motion.div>
                                            ))}
                                        </AnimatePresence>
                                    </div>
                                )}
                            </div>

                           {/* Cart Footer */}
{cartItems.length > 0 && (
    <div className="border-t border-gray-200 dark:border-gray-700 p-6 space-y-4">
        <div className="flex items-center justify-between text-lg font-semibold">
            <span className="text-gray-800 dark:text-gray-200">Total:</span>
            <span className="bg-gradient-to-r from-pink-500 to-purple-600 bg-clip-text text-transparent text-xl">
                ₹{total.toFixed(2)}
            </span>
        </div>

        <div className="space-y-3">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleRazorpayPayment}   // ⭐ UPDATED
                className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-600 text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
                Checkout (₹{total.toFixed(2)})
            </motion.button>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={sendMailWithCartItems}
                className="w-full px-6 py-3 bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 border border-gray-300 dark:border-gray-600 rounded-lg font-semibold hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
            >
                Send Order Inquiry
            </motion.button>
        </div>
    </div>
)}

                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}