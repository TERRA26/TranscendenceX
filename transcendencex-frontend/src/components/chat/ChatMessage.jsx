// ChatMessage.jsx
import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';

export default function ChatMessage({ message, role }) {
    const isUser = role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}
        >
            {!isUser && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br
                             from-black/5 to-black/10 dark:from-white/5 dark:to-white/10
                             border border-black/5 dark:border-white/5
                             flex items-center justify-center shadow-inner"
                >
                    <Bot className="w-4 h-4" />
                </motion.div>
            )}

            <div className={`flex-1 max-w-[70%] ${isUser ? 'ml-auto' : ''}`}>
                <motion.div
                    layout
                    className={`relative group ${
                        isUser
                            ? 'bg-gradient-to-br from-black to-gray-800 dark:from-white dark:to-gray-200'
                            : 'bg-gradient-to-br from-black/5 to-black/10 dark:from-white/5 dark:to-white/10'
                    } p-[1px] rounded-2xl overflow-hidden`}
                >
                    {/* Message content with inner shadow */}
                    <div className={`p-3 rounded-2xl ${
                        isUser
                            ? 'text-white dark:text-black'
                            : 'bg-white/50 dark:bg-black/50 shadow-inner'
                    }`}>
                        <p className="text-sm leading-relaxed">{message}</p>
                    </div>
                </motion.div>
            </div>

            {isUser && (
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="flex-shrink-0 w-8 h-8 rounded-xl bg-gradient-to-br
                             from-black to-gray-800 dark:from-white dark:to-gray-200
                             flex items-center justify-center"
                >
                    <User className="w-4 h-4 text-white dark:text-black" />
                </motion.div>
            )}
        </motion.div>
    );
}