import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function App() {
  const [currentBackground, setCurrentBackground] = useState(0);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  // Countdown timer calculation
  useEffect(() => {
    const calculateTimeLeft = () => {
      const weddingDate = new Date('January 19, 2026 00:00:00').getTime();
      const now = new Date().getTime();
      const difference = weddingDate - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(timer);
  }, []);

  const backgrounds = [
    "/couple2.jpg",
    'https://images.unsplash.com/photo-1465495976277-4387d4b0e4a6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80'
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBackground((prev) => (prev + 1) % backgrounds.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const floatingHearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 5,
    size: Math.random() * 20 + 10
  }));

  return (
    <div className="h-screen w-screen bg-gradient-to-br from-pink-50 to-rose-50 overflow-y-auto scroll-smooth">
      {/* Floating Background Hearts */}
      <div className="fixed inset-0 pointer-events-none z-0">
        {floatingHearts.map((heart) => (
          <motion.div
            key={heart.id}
            className="absolute text-pink-300"
            style={{
              left: `${heart.left}%`,
              top: '-50px',
              fontSize: `${heart.size}px`
            }}
            animate={{
              y: [0, window.innerHeight + 100],
              opacity: [0, 1, 0],
              rotate: [0, 180]
            }}
            transition={{
              duration: 8 + Math.random() * 5,
              delay: heart.delay,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            ❤️
          </motion.div>
        ))}
      </div>

      {/* Navigation Bar */}
      <motion.nav 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="fixed top-0 w-full bg-white/90 backdrop-blur-lg z-50 shadow-lg border-b border-pink-200"
      >
        <div className="max-w-6xl mx-auto px-4 py-4">
          {/* <div className="flex justify-center space-x-8 md:space-x-16">
            {['HOME', 'GALLERY'].map((item, index) => (
              <motion.button
                key={item}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 + 0.5 }}
                whileHover={{ 
                  scale: 1.1, 
                  color: "#db2777",
                  y: -2
                }}
                whileTap={{ scale: 0.95 }}
                className="text-gray-700 font-semibold tracking-widest transition-all duration-300 relative group"
              >
                {item}
                <motion.div 
                  className="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"
                  layoutId="navUnderline"
                />
              </motion.button>
            ))}
          </div> */}
        </div>
      </motion.nav>

      {/* Hero Section with Sliding Background */}
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentBackground}
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url(${window.innerWidth < 768 ? '/couple3.jpg' : backgrounds[currentBackground]})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center center',
              backgroundAttachment: 'fixed'
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5 }}
          />
        </AnimatePresence>
        
        {/* Enhanced Gradient Overlay for better mobile visibility */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/30 to-black/50 md:from-black/40 md:via-black/20 md:to-black/40"></div>
        
        {/* Animated Particles - Reduced for mobile */}
        <div className="absolute inset-0">
          {Array.from({ length: window.innerWidth < 768 ? 10 : 20 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/30 rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, -30, 0],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 3 + Math.random() * 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>

        <div className="relative z-10 text-center text-white px-4 w-full max-w-6xl mx-auto">
          {/* Join Us Statement - Adjusted for mobile */}
          <motion.div
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.1 }}
            className="mb-8 md:mb-12 lg:mb-16"
          >
            <h2 className="text-xl md:text-3xl lg:text-4xl xl:text-5xl font-light tracking-wider md:tracking-widest text-pink-100 drop-shadow-lg italic px-4">
              Join us for the Wedding Of
            </h2>
          </motion.div>

          {/* Enhanced Date with Mobile Responsiveness */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="mb-8 md:mb-12"
          >
            <motion.p
              className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white tracking-tight drop-shadow-2xl px-2"
              animate={{ 
                textShadow: [
                  "0 0 15px rgba(255,255,255,0.8)",
                  "0 0 25px rgba(255,182,193,0.9)",
                  "0 0 15px rgba(255,255,255,0.8)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              19.01.2026
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="text-lg md:text-xl lg:text-2xl text-pink-200 font-light mt-2 md:mt-4 tracking-wide"
            >
              Monday
            </motion.p>
          </motion.div>

          {/* Names with Enhanced Mobile Responsiveness */}
          <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-4 lg:space-x-8 mb-6 md:mb-8 px-2">
            <motion.div
              initial={{ opacity: 0, x: -100, rotate: -10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.4, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
                Abhijith 
              </h1>
              <motion.div
                className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-pink-500/20 to-blue-500/20 rounded-full blur-lg md:blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
              />
            </motion.div>
            
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.8, type: "spring" }}
              whileHover={{ scale: 1.2, rotate: 180 }}
              className="text-2xl md:text-4xl lg:text-5xl text-pink-200 bg-pink-500/20 rounded-full p-2 md:p-4 backdrop-blur-sm"
            >
              &
            </motion.span>
            
            <motion.div
              initial={{ opacity: 0, x: 100, rotate: 10 }}
              animate={{ opacity: 1, x: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.6, type: "spring", stiffness: 50 }}
              whileHover={{ scale: 1.05, y: -5 }}
              className="relative"
            >
              <h1 className="text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-serif font-bold bg-gradient-to-r from-white to-pink-100 bg-clip-text text-transparent drop-shadow-2xl">
                Poornima
              </h1>
              <motion.div
                className="absolute -inset-2 md:-inset-4 bg-gradient-to-r from-blue-500/20 to-pink-500/20 rounded-full blur-lg md:blur-xl"
                animate={{ opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              />
            </motion.div>
          </div>

          {/* Animated Subtitle - Mobile Adjusted */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2 }}
            className="text-lg md:text-xl lg:text-2xl text-pink-100 font-light mb-6 md:mb-8 italic px-4"
          >
            Together forever, starting January 19th, 2026
          </motion.p>

          {/* Floating Hearts Container - Mobile Adjusted */}
          <motion.div
            className="flex justify-center space-x-3 md:space-x-4 mb-8 md:mb-12"
            animate={{ 
              y: [0, -8, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            {["💖", "✨", "🌸", "💫"].map((emoji, index) => (
              <motion.span
                key={emoji}
                className="text-xl md:text-2xl lg:text-3xl"
                animate={{ 
                  rotate: [0, index % 2 === 0 ? 10 : -10, 0],
                  scale: [1, 1.1, 1]
                }}
                transition={{ 
                  duration: 2,
                  delay: index * 0.2,
                  repeat: Infinity
                }}
              >
                {emoji}
              </motion.span>
            ))}
          </motion.div>

          {/* Scroll Indicator - Mobile Adjusted */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2 }}
            className="absolute bottom--16 md:bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-white text-xs md:text-sm flex flex-col items-center"
            >
              <span>Scroll Down</span>
              <motion.div
                animate={{ y: [0, 4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity }}
                className="mt-1 md:mt-2"
              >
                ↓
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Mobile-specific background optimization */}
        <style jsx>{`
          @media (max-width: 768px) {
            .absolute.inset-0 {
              background-attachment: scroll !important;
            }
          }
        `}</style>
      </section>

      {/* Countdown Section */}
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-emerald-50 via-teal-50 to-green-50 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-200 to-teal-200"></div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-4xl text-center border-4 border-emerald-200 relative z-10"
        >
          {/* Days More Text */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="mb-8"
          >
            <motion.h2
              className="text-4xl md:text-6xl font-bold text-emerald-700 mb-2"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {timeLeft.days}
            </motion.h2>
            <p className="text-xl md:text-2xl text-emerald-600 font-semibold">Days more</p>
          </motion.div>

          {/* Countdown Labels */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-4 gap-4 mb-8"
          >
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, index) => (
              <motion.div
                key={label}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 0.6 + index * 0.1 }}
                className="text-emerald-700 font-semibold text-sm md:text-lg"
              >
                {label}
              </motion.div>
            ))}
          </motion.div>

          {/* Countdown Timer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
            className="bg-gradient-to-br from-emerald-100 to-teal-100 rounded-2xl p-6 md:p-8 shadow-inner border border-emerald-200 mb-8"
          >
            <motion.div
              className="text-3xl md:text-5xl font-mono font-bold text-emerald-800 grid grid-cols-4 gap-4"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            >
              <motion.span
                key={`days-${timeLeft.days}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="block"
              >
                {timeLeft.days.toString().padStart(2, '0')}
              </motion.span>
              <motion.span
                key={`hours-${timeLeft.hours}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="block"
              >
                {timeLeft.hours.toString().padStart(2, '0')}
              </motion.span>
              <motion.span
                key={`minutes-${timeLeft.minutes}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="block"
              >
                {timeLeft.minutes.toString().padStart(2, '0')}
              </motion.span>
              <motion.span
                key={`seconds-${timeLeft.seconds}`}
                initial={{ scale: 1.2 }}
                animate={{ scale: 1 }}
                className="block"
              >
                {timeLeft.seconds.toString().padStart(2, '0')}
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Invitation Text */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-white/80 rounded-xl p-6 border border-emerald-200"
          >
            <p className="text-lg md:text-xl text-gray-700 leading-relaxed">
              Cordially invite your esteemed presence with family on the auspicious occasion of the wedding of our son
            </p>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center space-x-4 mt-8 text-3xl text-emerald-400"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>✨</span>
            <span>💫</span>
            <span>🌸</span>
            <span>💫</span>
            <span>✨</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Groom Section */}
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-4xl text-center border-4 border-blue-200 relative z-10"
        >
          {/* Groom Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-blue-300 shadow-2xl overflow-hidden bg-white flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: 2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/groom.jpg"
                alt="Groom"
                className="w-2/3 object-cover "
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Groom Name - Large and Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-wide font-sans">
              Abhijith S Kumar
            </h2>
          </motion.div>

          {/* The Groom Title */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl md:text-2xl font-serif text-blue-600 font-semibold tracking-wider">
              The Groom
            </h3>
          </motion.div>

          {/* Family Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-2xl p-8 shadow-inner border border-blue-200"
          >
            <div className="text-left space-y-4">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-start space-x-3"
              >
                <span className="text-blue-600 font-semibold min-w-20">S/o</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Santhosh Kumar N R & Usha Kumary R
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start space-x-3"
              >
                <span className="text-blue-600 font-semibold min-w-20">Address</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Mini Bhavan, Velumthara,<br />
                  Charipparambu (PO),<br />
                  Kadakkal, Kollam
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center space-x-4 mt-8 text-2xl text-blue-400"
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>✨</span>
            <span>💫</span>
            <span>👑</span>
            <span>💫</span>
            <span>✨</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Bride Section */}
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-rose-50 via-pink-50 to-red-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, x: 100 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/95 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-4xl text-center border-4 border-rose-200 relative z-10"
        >
          {/* Bride Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <motion.div
              className="w-48 h-48 md:w-64 md:h-64 mx-auto rounded-full border-4 border-rose-300 shadow-2xl overflow-hidden bg-white flex items-center justify-center"
              whileHover={{ scale: 1.05, rotate: -2 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <motion.img
                src="/bride.jpg"
                alt="Bride"
                className="w-2/3  object-cover"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          </motion.div>

          {/* Bride Name - Large and Centered */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 tracking-wide font-sans">
              Poornima K L
            </h2>
          </motion.div>

          {/* The Bride Title */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mb-8"
          >
            <h3 className="text-xl md:text-2xl font-serif text-rose-600 font-semibold tracking-wider">
              The Bride
            </h3>
          </motion.div>

          {/* Family Details */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="bg-gradient-to-br from-rose-50 to-pink-50 rounded-2xl p-8 shadow-inner border border-rose-200"
          >
            <div className="text-left space-y-4">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.0 }}
                className="flex items-start space-x-3"
              >
                <span className="text-rose-600 font-semibold min-w-20">D/o</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  R Kumar & Lathika B
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
                className="flex items-start space-x-3"
              >
                <span className="text-rose-600 font-semibold min-w-20">Address</span>
                <p className="text-gray-700 text-lg leading-relaxed">
                  Vaikundam, Kuthirapalam,<br />
                  Kadakkal, Kollam
                </p>
              </motion.div>
            </div>
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            className="flex justify-center space-x-4 mt-8 text-2xl text-rose-400"
            animate={{ 
              rotate: [0, -5, 5, 0],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          >
            <span>✨</span>
            <span>💫</span>
            <span>👑</span>
            <span>💫</span>
            <span>✨</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Wedding Details Section with Location Links */}
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-50 via-violet-50 to-indigo-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-10 w-full max-w-2xl text-center border-4 border-purple-200 relative z-10"
        >
          {/* Animated Wedding Emoji */}
          <motion.div
            animate={{ 
              y: [0, -10, 0],
              rotate: [0, 5, 0],
              scale: [1, 1.05, 1]
            }}
            transition={{ 
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
            className="text-5xl md:text-6xl mb-6"
          >
            💒
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-2xl md:text-3xl font-serif text-purple-700 font-bold mb-8"
          >
            Wedding Celebration
          </motion.h2>

          <div className="space-y-6">
            {/* Date & Time Card */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              whileHover={{ 
                scale: 1.02,
                y: -3,
              }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 shadow-inner border border-purple-200"
            >
              <motion.div
                className="text-2xl md:text-3xl mb-2"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                📅
              </motion.div>
              <p className="text-gray-700 font-semibold">Date & Time</p>
              <p className="text-purple-600 font-bold text-lg md:text-xl mt-2">January 19th, 2026</p>
              <p className="text-gray-600 text-sm md:text-base">Monday</p>
            </motion.div>

            {/* Wedding Venue Card with Location Link */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              whileHover={{ 
                scale: 1.02,
                y: -3,
              }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 shadow-inner border border-purple-200"
            >
              <motion.div
                className="text-2xl md:text-3xl mb-2"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                🏛️
              </motion.div>
              <p className="text-gray-700 font-semibold">Wedding Venue</p>
              <p className="text-purple-600 font-bold text-lg md:text-xl mt-2">Athisayamangalam Devi Temple</p>
              <p className="text-gray-600 text-sm md:text-base mb-3">Thudayannoor, Kadakkal, Kollam</p>
              
              {/* Location Link */}
              <motion.a
                href="https://maps.app.goo.gl/mDVtRoizohN25b6n9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                <span>📍</span>
                View on Google Maps
              </motion.a>
            </motion.div>

            {/* Reception Venue Card with Location Link */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
              whileHover={{ 
                scale: 1.02,
                y: -3,
              }}
              className="bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl p-6 shadow-inner border border-purple-200"
            >
              <motion.div
                className="text-2xl md:text-3xl mb-2"
                whileHover={{ scale: 1.2, rotate: 10 }}
              >
                🎵
              </motion.div>
              <p className="text-gray-700 font-semibold">Reception</p>
              <p className="text-purple-600 font-bold text-lg md:text-xl mt-2">Monday 4:00 PM - 9:00 PM</p>
              <p className="text-gray-600 text-sm md:text-base mb-3">Makkattu Auditorium Mannoor</p>
              
              {/* Location Link */}
              <motion.a
                href="https://maps.app.goo.gl/ecnA7jBJjSyiFDnz9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
              >
                <span>📍</span>
                View Reception Location
              </motion.a>
            </motion.div>
          </div>

          {/* Quick Directions Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-8 bg-purple-50 rounded-xl p-6 border border-purple-200"
          >
            <h4 className="text-lg font-semibold text-purple-700 mb-3 flex items-center justify-center gap-2">
              <span>🗺️</span>
              Quick Directions
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <motion.a
                href="https://maps.app.goo.gl/mDVtRoizohN25b6n9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all"
              >
                <span className="text-purple-600">🏛️</span>
                <div>
                  <p className="font-medium text-gray-800">Wedding Venue</p>
                  <p className="text-gray-600 text-xs">Athisayamangalam Temple</p>
                </div>
              </motion.a>
              <motion.a
                href="https://maps.app.goo.gl/ecnA7jBJjSyiFDnz9"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02 }}
                className="flex items-center gap-2 p-3 bg-white rounded-lg border border-purple-200 hover:border-purple-400 transition-all"
              >
                <span className="text-purple-600">🎵</span>
                <div>
                  <p className="font-medium text-gray-800">Reception</p>
                  <p className="text-gray-600 text-xs">Makkattu Auditorium, Mannoor</p>
                </div>
              </motion.a>
            </div>
          </motion.div>
        </motion.div>
      </section>

      {/* Final Love Section */}
      <section className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-red-50 via-pink-50 to-rose-50 relative overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="bg-white/90 backdrop-blur-lg shadow-2xl rounded-3xl p-8 md:p-12 w-full max-w-2xl text-center border-4 border-red-200 relative z-10"
        >
          <motion.div
            animate={{ 
              scale: [1, 1.1, 1],
            }}
            transition={{ 
              duration: 4,
              repeat: Infinity,
            }}
            className="flex justify-center space-x-4 md:space-x-6 text-4xl md:text-6xl mb-8"
          >
            <span>🤵‍♂️</span>
            <span className="text-2xl md:text-4xl text-red-400">💞</span>
            <span>👰‍♀️</span>
          </motion.div>
          
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-2xl md:text-4xl font-serif text-red-600 font-bold mb-6"
          >
            Together Forever
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="bg-gradient-to-br from-red-100 to-pink-100 rounded-2xl p-6 md:p-8 shadow-inner mb-8 border border-red-200"
          >
            <p className="text-gray-700 text-lg md:text-xl leading-relaxed italic">
              "In your light, I learn how to love. In your beauty, how to make poems. 
              You dance inside my chest, where no one sees you, but sometimes I do, 
              and that sight becomes this art."
            </p>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-gray-600 mt-6 text-base md:text-lg font-medium"
          >
            We can't wait to celebrate this special day with you!
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="mt-8 pt-6 border-t border-red-200"
          >
            <p className="text-gray-500 text-sm">
              With love, Abhijith & Poornima
            </p>
          </motion.div>
        </motion.div>
      </section>

      {/* Instagram Profile Link - Bottom Center */}
{/* Instagram Profile Link - Bottom Center */}
<motion.footer
  initial={{ opacity: 0, y: 20 }}
  whileInView={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8, delay: 0.2 }}
  className="w-full py-4 bg-gradient-to-b from-transparent to-pink-50/30 backdrop-blur-sm"
>
  <div className="max-w-6xl mx-auto px-4 text-center">
    <motion.a
      href="https://www.instagram.com/im_absk?igsh=YTJjMGxveXp5MHZ3"
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      className="inline-flex items-center gap-2 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-4 py-2 rounded-full shadow-md transition-all duration-300 group"
    >
      <motion.div
        animate={{ 
          scale: [1, 1.05, 1],
          rotate: [0, 3, -3, 0]
        }}
        transition={{ 
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        {/* Instagram SVG Icon */}
        <svg 
          className="w-4 h-4 fill-current"
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      </motion.div>
      <span className="font-medium text-sm tracking-wide group-hover:tracking-wider transition-all duration-300">
        @im_absk
      </span>
    </motion.a>
    
    {/* Small decorative text */}
    <motion.p
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="text-gray-500 text-xs mt-2 font-light"
    >
      Follow for more on Instagram
    </motion.p>
  </div>
</motion.footer>
    </div>
  );
}