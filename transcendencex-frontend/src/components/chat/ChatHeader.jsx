// ChatHeader.jsx
import { Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import ThemeToggle from '../ui/ThemeToggle';

export default function ChatHeader({ onMenuToggle, isSidebarOpen }) {
    return (
        <header className="sticky top-0 z-40 border-b border-white/10 
                          backdrop-blur-lg bg-white/70 dark:bg-black/70">
            <div className="flex items-center justify-between h-16 px-4">
                <div className="flex items-center space-x-4">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onMenuToggle}
                        className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5
                                 transition-colors duration-200"
                    >
                        {isSidebarOpen ? <X size={20} /> : <Menu size={20} />}
                    </motion.button>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="text-xl font-bold tracking-tight"
                    >
                        TranscendenceX
                    </motion.h1>
                </div>
                <ThemeToggle />
            </div>
        </header>
    );
}