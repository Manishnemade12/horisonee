"use client"

import { useState, useEffect } from "react"

function HerizonLoader() {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isComplete, setIsComplete] = useState(false)
  const [showSparkles, setShowSparkles] = useState(false)
  const [particles, setParticles] = useState([])

  const positiveMessages = [
    "✨ Embracing your cosmic rhythm",
    "🌌 Your cycle is celestial power",
    "💫 Celebrating divine femininity",
    "🪐 Syncing with universal energy",
    "🌙 Every cycle tells a cosmic story",
    "⚡ You're stardust and magic",
    "🔮 Honoring your spiritual energy",
    "🌟 Blooming with cosmic confidence",
  ]

  const floatingEmojis = ["🌌", "✨", "🪐", "🌙", "⚡", "🔮", "🌟", "💫", "🎆", "🌠"]

  // Particle system for advanced animation
  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 30 }).map((_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 4 + 2,
        speedX: (Math.random() - 0.5) * 2,
        speedY: (Math.random() - 0.5) * 2,
        opacity: Math.random() * 0.6 + 0.2,
        color: Math.random() > 0.5 ? "#8b5cf6" : "#a855f7",
      }))
      setParticles(newParticles)
    }

    generateParticles()
  }, [])

  // Animate particles
  useEffect(() => {
    if (!isComplete) return

    const interval = setInterval(() => {
      setParticles(prev => prev.map(particle => ({
        ...particle,
        x: (particle.x + particle.speedX) % 100,
        y: (particle.y + particle.speedY) % 100,
      })))
    }, 100)

    return () => clearInterval(interval)
  }, [isComplete])

  useEffect(() => {
    const totalMessages = positiveMessages.length
    const totalDuration = 5000 // 5 seconds total
    const messageInterval = totalDuration / totalMessages
    const progressIncrement = 100 / totalMessages

    let messageIndex = 0
    let currentProgress = 0

    // Update progress smoothly
    const progressInterval = setInterval(() => {
      currentProgress += progressIncrement / 10
      setProgress(Math.min(currentProgress, 100))
    }, messageInterval / 10)

    // Update messages
    const messageTimer = setInterval(() => {
      messageIndex++
      if (messageIndex < totalMessages) {
        setCurrentMessage(messageIndex)
      } else {
        clearInterval(messageTimer)
        clearInterval(progressInterval)
        setProgress(100)
        setIsComplete(true)
        setShowSparkles(true)
        
        // Generate nebula particles on completion
        setTimeout(() => {
          const nebulaParticles = Array.from({ length: 50 }).map((_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            size: Math.random() * 6 + 2,
            speedX: (Math.random() - 0.5) * 1.5,
            speedY: (Math.random() - 0.5) * 1.5,
            opacity: Math.random() * 0.8 + 0.2,
            color: ["#8b5cf6", "#a855f7", "#c084fc", "#d946ef"][Math.floor(Math.random() * 4)],
          }))
          setParticles(nebulaParticles)
        }, 500)
      }
    }, messageInterval)

    return () => {
      clearInterval(messageTimer)
      clearInterval(progressInterval)
    }
  }, [positiveMessages.length])

  return (
    <>
      {/* Inline Styles */}
      <style>
        {`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }
        
        html, body {
          height: 100%;
          width: 100%;
          overflow-x: hidden;
        }
        
        body {
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', sans-serif;
        }

        @keyframes float {
          0%, 100% { 
            transform: translateY(0px) rotate(0deg) scale(1);
          }
          33% { 
            transform: translateY(-20px) rotate(120deg) scale(1.1);
          }
          66% { 
            transform: translateY(10px) rotate(240deg) scale(0.9);
          }
        }
        
        @keyframes spin-slow {
          from { 
            transform: rotate(0deg); 
          }
          to { 
            transform: rotate(360deg); 
          }
        }
        
        @keyframes spin-reverse {
          from { 
            transform: rotate(360deg); 
          }
          to { 
            transform: rotate(0deg); 
          }
        }
        
        @keyframes fade-in {
          0% { 
            opacity: 0; 
            transform: translateY(20px) scale(0.9);
          }
          100% { 
            opacity: 1; 
            transform: translateY(0) scale(1);
          }
        }
        
        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(139, 92, 246, 0.4);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 50px rgba(139, 92, 246, 0.8), 0 0 80px rgba(168, 85, 247, 0.4);
          }
        }
        
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        
        @keyframes sparkle {
          0% {
            transform: scale(0) rotate(0deg);
            opacity: 1;
          }
          50% {
            transform: scale(1.5) rotate(180deg);
            opacity: 0.8;
          }
          100% {
            transform: scale(0) rotate(360deg);
            opacity: 0;
          }
        }

        @keyframes glow {
          0%, 100% {
            filter: drop-shadow(0 0 10px rgba(139, 92, 246, 0.6));
          }
          50% {
            filter: drop-shadow(0 0 20px rgba(168, 85, 247, 0.8)) drop-shadow(0 0 30px rgba(192, 132, 252, 0.4));
          }
        }

        @keyframes nebula {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
            opacity: 0.7;
          }
          25% {
            transform: translateY(-15px) rotate(90deg);
            opacity: 1;
          }
          50% {
            transform: translateY(0) rotate(180deg);
            opacity: 0.7;
          }
          75% {
            transform: translateY(15px) rotate(270deg);
            opacity: 0.4;
          }
        }

        .animate-float {
          animation: float 8s ease-in-out infinite;
        }
        
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        
        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        
        .animate-pulse {
          animation: pulse 2.5s infinite;
        }
        
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
        
        .animate-sparkle {
          animation: sparkle 2s ease-out forwards;
        }

        .animate-glow {
          animation: glow 3s ease-in-out infinite;
        }

        .animate-nebula {
          animation: nebula 6s ease-in-out infinite;
        }
        `}
      </style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(135deg, #0f0f0f 0%, #1a1a1a 25%, #2d1b69 50%, #1a1a1a 75%, #0f0f0f 100%)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          zIndex: 9999,
        }}
      >
        {/* Animated Nebula Background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "radial-gradient(circle at 20% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(168, 85, 247, 0.1) 0%, transparent 50%), radial-gradient(circle at 40% 40%, rgba(192, 132, 252, 0.05) 0%, transparent 50%)",
          }}
        />

        {/* Floating Particles */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
          }}
        >
          {particles.map(particle => (
            <div
              key={particle.id}
              style={{
                position: "absolute",
                left: `${particle.x}%`,
                top: `${particle.y}%`,
                width: `${particle.size}px`,
                height: `${particle.size}px`,
                background: particle.color,
                borderRadius: "50%",
                opacity: particle.opacity,
                filter: "blur(1px)",
                transition: "all 0.1s ease-out",
              }}
            />
          ))}
        </div>

        {/* Floating Background Elements */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            overflow: "hidden",
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 12 }).map((_, index) => (
            <div
              key={index}
              className="animate-float"
              style={{
                position: "absolute",
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                fontSize: "clamp(24px, 5vw, 32px)",
                opacity: 0.3,
                color: ["#8b5cf6", "#a855f7", "#c084fc", "#d946ef"][index % 4],
                animationDelay: `${index * 0.7}s`,
                animationDuration: `${12 + Math.random() * 8}s`,
                filter: "drop-shadow(0 0 10px currentColor)",
              }}
            >
              {floatingEmojis[index % floatingEmojis.length]}
            </div>
          ))}
        </div>

        {/* Sparkle Effect on Completion */}
        {showSparkles && (
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              pointerEvents: "none",
            }}
          >
            {Array.from({ length: 25 }).map((_, index) => (
              <div
                key={index}
                className="animate-sparkle"
                style={{
                  position: "absolute",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  width: "8px",
                  height: "8px",
                  background: "linear-gradient(45deg, #8b5cf6, #a855f7)",
                  borderRadius: "50%",
                  animationDelay: `${index * 0.08}s`,
                  filter: "blur(0.5px)",
                }}
              />
            ))}
          </div>
        )}

        <div
          style={{
            textAlign: "center",
            zIndex: 10,
            padding: "clamp(16px, 4vw, 32px)",
            maxWidth: "min(800px, 90vw)",
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "100vh",
          }}
        >
          {/* Logo Section */}
          <div style={{ marginBottom: "clamp(32px, 6vh, 48px)" }}>
            <h1
              className="animate-glow"
              style={{
                fontSize: "clamp(52px, 13vw, 104px)",
                fontWeight: "900",
                background: "linear-gradient(135deg, #8b5cf6 0%, #a855f7 25%, #c084fc 50%, #d946ef 75%, #8b5cf6 100%)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
                marginBottom: "16px",
                lineHeight: 1.1,
                letterSpacing: "0.05em",
                textShadow: "0 0 30px rgba(139, 92, 246, 0.5)",
              }}
            >
              HERIZON
            </h1>
            <p
              style={{
                color: "#c084fc",
                fontSize: "clamp(16px, 3vw, 20px)",
                fontWeight: "500",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
                opacity: 0.8,
              }}
            >
              Cosmic Cycle Harmony
            </p>
          </div>

          {/* Advanced Animated Orb */}
          <div style={{ marginBottom: "clamp(32px, 6vh, 48px)", position: "relative" }}>
            <div
              style={{
                width: "clamp(120px, 25vw, 200px)",
                height: "clamp(120px, 25vw, 200px)",
                margin: "0 auto",
                position: "relative",
                filter: "drop-shadow(0 0 40px rgba(139, 92, 246, 0.3))",
              }}
            >
              {/* Outer cosmic ring */}
              <div
                className="animate-spin-slow"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  border: "3px solid transparent",
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc, #d946ef) border-box",
                  WebkitMask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  WebkitMaskComposite: "xor",
                  mask: "linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0)",
                  maskComposite: "exclude",
                  borderRadius: "50%",
                  filter: "blur(0.5px)",
                }}
              />

              {/* Middle ring */}
              <div
                className="animate-spin-reverse"
                style={{
                  position: "absolute",
                  top: "15px",
                  left: "15px",
                  right: "15px",
                  bottom: "15px",
                  border: "2px solid rgba(139, 92, 246, 0.6)",
                  borderRadius: "50%",
                  filter: "blur(1px)",
                }}
              />

              {/* Pulsing Quantum Core */}
              <div
                className="animate-pulse"
                style={{
                  position: "absolute",
                  top: "clamp(20px, 5vw, 32px)",
                  left: "clamp(20px, 5vw, 32px)",
                  right: "clamp(20px, 5vw, 32px)",
                  bottom: "clamp(20px, 5vw, 32px)",
                  background: "radial-gradient(circle, #8b5cf6 0%, #a855f7 30%, transparent 70%)",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: "0 0 40px rgba(139, 92, 246, 0.6), inset 0 0 20px rgba(255, 255, 255, 0.1)",
                  border: "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <div
                  className="animate-nebula"
                  style={{
                    color: "white",
                    fontSize: "clamp(28px, 7vw, 48px)",
                    filter: "drop-shadow(0 0 10px rgba(255, 255, 255, 0.5))",
                  }}
                >
                  🌙
                </div>
              </div>

              {/* Orbital particles */}
              {[0, 90, 180, 270].map((rotation, index) => (
                <div
                  key={index}
                  className="animate-spin-slow"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    animationDelay: `${index * 0.5}s`,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      top: "10%",
                      left: "50%",
                      transform: `translateX(-50%) rotate(${rotation}deg)`,
                      width: "4px",
                      height: "4px",
                      background: "#c084fc",
                      borderRadius: "50%",
                      filter: "blur(0.5px)",
                    }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Messages */}
          <div
            style={{
              marginBottom: "clamp(32px, 6vh, 48px)",
              height: "clamp(48px, 8vh, 64px)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "100%",
            }}
          >
            <p
              className="animate-fade-in"
              key={currentMessage}
              style={{
                fontSize: "clamp(16px, 3.5vw, 20px)",
                fontWeight: "500",
                color: "#e5e7eb",
                padding: "0 16px",
                textAlign: "center",
                maxWidth: "100%",
                textShadow: "0 0 10px rgba(139, 92, 246, 0.5)",
                background: "linear-gradient(135deg, #e5e7eb, #c084fc)",
                backgroundClip: "text",
                WebkitBackgroundClip: "text",
                color: "transparent",
              }}
            >
              {positiveMessages[currentMessage]}
            </p>
          </div>

          {/* Quantum Progress Bar */}
          <div
            style={{
              width: "100%",
              maxWidth: "clamp(320px, 85vw, 520px)",
              margin: "0 auto 24px auto",
            }}
          >
            <div
              style={{
                width: "100%",
                height: "clamp(14px, 3.5vw, 18px)",
                backgroundColor: "rgba(31, 31, 31, 0.8)",
                borderRadius: "50px",
                overflow: "hidden",
                boxShadow: "inset 0 2px 8px rgba(0, 0, 0, 0.5), 0 0 20px rgba(139, 92, 246, 0.3)",
                position: "relative",
                border: "1px solid rgba(139, 92, 246, 0.3)",
              }}
            >
              <div
                style={{
                  height: "100%",
                  width: `${progress}%`,
                  background: "linear-gradient(90deg, #8b5cf6, #a855f7, #c084fc, #d946ef, #8b5cf6)",
                  backgroundSize: "200% 100%",
                  borderRadius: "50px",
                  position: "relative",
                  overflow: "hidden",
                  transition: "width 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                  boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                }}
              >
                <div
                  className="animate-shimmer"
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.6), transparent)",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <p
              style={{
                fontSize: "clamp(12px, 2.5vw, 14px)",
                color: isComplete ? "#10b981" : "#a855f7",
                marginTop: "12px",
                fontWeight: "600",
                textShadow: "0 0 10px rgba(139, 92, 246, 0.3)",
                letterSpacing: "0.05em",
              }}
            >
              {isComplete ? "🚀 QUANTUM SYNC ACHIEVED!" : `QUANTUM ENTANGLEMENT: ${Math.round(progress)}%`}
            </p>
          </div>

          {/* Completion Message */}
          {isComplete && (
            <div
              className="animate-fade-in"
              style={{
                marginTop: "clamp(16px, 4vh, 32px)",
                textAlign: "center",
              }}
            >
              <p
                style={{
                  fontSize: "clamp(18px, 4vw, 22px)",
                  fontWeight: "700",
                  background: "linear-gradient(135deg, #8b5cf6, #a855f7, #c084fc)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  marginBottom: "16px",
                  textShadow: "0 0 20px rgba(139, 92, 246, 0.5)",
                  letterSpacing: "0.05em",
                }}
              >
                🌌 WELCOME TO THE COSMOS 🌌
              </p>
              <p
                style={{
                  fontSize: "clamp(14px, 3vw, 16px)",
                  color: "#c084fc",
                  opacity: 0.9,
                }}
              >
                Entering Herizon Quantum Space...
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default HerizonLoader