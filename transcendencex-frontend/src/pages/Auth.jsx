import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../components/ui/ThemeToggle';
import { ChevronRight, Sparkles, X } from 'lucide-react';

const CustomAlert = ({ children, onClose }) => (
    <motion.div
        className="relative flex items-center gap-3 px-4 py-3 rounded-lg
                   bg-white dark:bg-black border border-gray-200 dark:border-gray-800
                   shadow-lg backdrop-blur-lg"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
    >
        <div className="flex-1 text-sm text-gray-600 dark:text-gray-400">{children}</div>
        <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-900
                     transition-colors duration-200"
        >
            <X className="w-4 h-4" />
        </button>
    </motion.div>
);

const GlowingBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -inset-[10px] opacity-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-96 h-96 bg-white dark:bg-black rounded-full
                              blur-3xl opacity-20 animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r
                          from-transparent via-gray-200 dark:via-gray-800
                          to-transparent opacity-25"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                          from-transparent via-gray-200 dark:via-gray-800
                          to-transparent opacity-25"></div>
        </div>
    );
};

const FloatingParticle = ({ delay = 0 }) => {
    const randomLeft = Math.random() * 100;
    const randomDuration = 4 + Math.random() * 4;

    return (
        <motion.div
            className="absolute w-1 h-1 bg-gray-400 rounded-full opacity-20"
            initial={{ y: -10, x: `${randomLeft}%` }}
            animate={{
                y: ['0%', '100%'],
                opacity: [0.2, 0.5, 0.2]
            }}
            transition={{
                duration: randomDuration,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
            }}
        />
    );
};

const ShimmerButton = ({ children, ...props }) => (
    <button
        {...props}
        className="relative w-full py-3 px-4 rounded-xl font-medium
                 bg-black dark:bg-white text-white dark:text-black
                 shadow-lg hover:shadow-xl group overflow-hidden
                 transform hover:-translate-y-0.5
                 transition-all duration-300"
    >
        <span className="relative z-10 flex items-center justify-center gap-2">
            {children}
            <ChevronRight className="w-4 h-4 transform group-hover:translate-x-1
                                 transition-transform duration-300" />
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-transparent
                     via-white/10 dark:via-black/10 to-transparent
                     translate-x-[-100%] animate-shimmer" />
    </button>
);

const GlowingInput = ({ label, ...props }) => (
    <div className="space-y-2">
        <label className="block text-sm font-medium">
            {label}
        </label>
        <div className="relative group">
            <input
                {...props}
                className="w-full px-4 py-3 rounded-xl bg-gray-50/50
                        dark:bg-gray-900/50 border border-gray-200/50
                        dark:border-gray-800/50 text-black dark:text-white
                        placeholder-gray-500 dark:placeholder-gray-400
                        focus:ring-2 focus:ring-black dark:focus:ring-white
                        focus:border-transparent group-hover:ring-1
                        transition-all duration-300"
            />
            <div className="absolute -inset-px rounded-xl opacity-0
                         group-hover:opacity-100 transition-opacity
                         duration-300 pointer-events-none">
                <div className="absolute inset-0 rounded-xl bg-black
                             dark:bg-white opacity-5"></div>
            </div>
        </div>
    </div>
);

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [showDemo, setShowDemo] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowDemo(true);
        setTimeout(() => setShowDemo(false), 3000);
    };

    const handleQuickAccess = () => {
        navigate('/chat');
    };

    return (
        <div className="relative min-h-screen flex flex-col bg-white dark:bg-black
                      text-black dark:text-white transition-colors duration-500">
            <GlowingBackground />
            {Array.from({ length: 20 }).map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.2} />
            ))}

            {/* Header */}
            <header className="relative z-10 p-6 flex justify-between items-center
                           backdrop-blur-sm bg-white/30 dark:bg-black/30
                           border-b border-gray-200/20 dark:border-gray-800/20">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="text-xl font-bold tracking-tight group"
                >
                    <span className="relative">
                        TranscendenceX
                        <span className="absolute -inset-1 rounded-lg bg-black dark:bg-white
                                     opacity-0 group-hover:opacity-10
                                     transition-opacity duration-300"></span>
                    </span>
                </motion.div>
                <ThemeToggle />
            </header>

            {/* Main Content */}
            <main className="relative z-10 flex-1 flex flex-col items-center justify-center p-6">
                {/* Hero Section */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12 text-center space-y-4"
                >
                    <h1 className="relative text-6xl font-bold tracking-tighter">
                        <span className="relative">
                            TranscendenceX
                            <span className="absolute -inset-6 rounded-2xl bg-black dark:bg-white
                                         opacity-5 blur-2xl"></span>
                        </span>
                    </h1>
                    <p className="text-xl text-gray-600 dark:text-gray-400">
                        Experience the next generation of AI
                    </p>
                </motion.div>

                {/* Auth Container */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="w-full max-w-md"
                >
                    {/* Auth Card */}
                    <div className="relative backdrop-blur-xl bg-white/80 dark:bg-black/80
                                rounded-2xl p-8 shadow-2xl ring-1 ring-gray-200/50
                                dark:ring-gray-800/50 hover:ring-2 transition-all duration-300">
                        <div className="absolute inset-0 -z-10 bg-gradient-to-b
                                    from-white/80 to-white/20 dark:from-black/80
                                    dark:to-black/20 rounded-2xl blur-xl"></div>

                        {/* Toggle Buttons */}
                        <div className="relative flex rounded-xl overflow-hidden mb-8 p-1
                                    bg-gray-100/50 dark:bg-gray-900/50 ring-1
                                    ring-gray-200 dark:ring-gray-800">
                            {['Login', 'Join Waitlist'].map((text, i) => (
                                <button
                                    key={text}
                                    onClick={() => setIsLogin(i === 0)}
                                    className={`flex-1 py-3 px-4 text-sm font-medium rounded-lg 
                                            transition-all duration-300 ${
                                        (i === 0 ? isLogin : !isLogin)
                                            ? 'bg-black dark:bg-white text-white dark:text-black shadow-lg'
                                            : 'text-gray-500 dark:text-gray-400 hover:text-black dark:hover:text-white'
                                    }`}
                                >
                                    {text}
                                </button>
                            ))}
                        </div>

                        {/* Form */}
                        <AnimatePresence mode="wait">
                            <motion.form
                                key={isLogin ? 'login' : 'waitlist'}
                                initial={{ opacity: 0, x: isLogin ? -20 : 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: isLogin ? 20 : -20 }}
                                onSubmit={handleSubmit}
                                className="space-y-6"
                            >
                                <GlowingInput
                                    label="Email Address"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    required
                                />

                                {isLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                    >
                                        <GlowingInput
                                            label="Password"
                                            type="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </motion.div>
                                )}

                                <ShimmerButton type="submit">
                                    {isLogin ? 'Sign In' : 'Join Waitlist'}
                                </ShimmerButton>
                            </motion.form>
                        </AnimatePresence>

                        {/* Quick Access Button */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5 }}
                            className="mt-8 text-center"
                        >
                            <button
                                onClick={handleQuickAccess}
                                className="group text-sm text-gray-500 dark:text-gray-400
                                       hover:text-black dark:hover:text-white
                                       transition-colors duration-300"
                            >
                                <span className="inline-flex items-center gap-2">
                                    <Sparkles className="w-4 h-4 transform group-hover:scale-110
                                                     transition-transform duration-300" />
                                    Quick Access to Chat (Demo)
                                </span>
                            </button>
                        </motion.div>
                    </div>
                </motion.div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 py-6 text-center text-sm text-gray-500 dark:text-gray-400">
                © 2024 TranscendenceX. All rights reserved.
            </footer>

            {/* Demo Alert */}
            <AnimatePresence>
                {showDemo && (
                    <motion.div className="fixed bottom-4 right-4 z-50">
                        <CustomAlert onClose={() => setShowDemo(false)}>
                            Demo Mode: No actual authentication is happening.
                        </CustomAlert>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Auth;

