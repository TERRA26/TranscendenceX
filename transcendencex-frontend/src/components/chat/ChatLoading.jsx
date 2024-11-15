// ChatLoading.jsx
import { motion } from 'framer-motion';
import { Bot } from 'lucide-react';

export default function ChatLoading() {
    return (
        <div className="flex items-start space-x-3">
            <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="flex-shrink-0 w-8 h-8 rounded-lg bg-black/5 dark:bg-white/5
                          flex items-center justify-center"
            >
                <Bot className="w-5 h-5" />
            </motion.div>
            <div className="flex-1 max-w-[80%] space-y-1">
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-4 rounded-xl bg-black/5 dark:bg-white/5 backdrop-blur-sm"
                >
                    <div className="flex items-center space-x-2">
                        {[0, 1, 2].map((i) => (
                            <motion.div
                                key={i}
                                className="w-2 h-2 rounded-full bg-black dark:bg-white"
                                animate={{
                                    y: [0, -5, 0],
                                    opacity: [0.2, 1, 0.2],
                                }}
                                transition={{
                                    duration: 0.6,
                                    repeat: Infinity,
                                    delay: i * 0.2,
                                }}
                            />
                        ))}
                    </div>
                </motion.div>
            </div>
        </div>
    );
}