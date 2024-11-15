import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Plus, LogOut, X, Trash2, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

export default function Sidebar({ isOpen, setIsOpen, onNewChat, activeChat, onSelectChat, chats = [], onDeleteChat }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        navigate('/');
    };

    const handleNewChat = () => {
        const newChat = {
            id: Date.now(),
            title: "New Chat",
            preview: "Hello! How can I help you today?"
        };
        onNewChat(newChat);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.3 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black dark:bg-white z-40 lg:hidden"
                        onClick={() => setIsOpen(false)}
                    />

                    <motion.aside
                        initial={{ x: -300 }}
                        animate={{ x: 0 }}
                        exit={{ x: -300 }}
                        className="fixed inset-y-0 left-0 w-72 z-50
                               backdrop-blur-xl bg-white/80 dark:bg-black/80
                               border-r border-black/[0.12] dark:border-white/10
                               shadow-[1px_0_0_0_rgba(0,0,0,0.05)]
                               dark:shadow-[1px_0_0_0_rgba(255,255,255,0.05)]
                               flex flex-col"
                    >
                        {/* Header with Welcome and Close Button */}
                        <div className="p-4 border-b border-black/[0.12] dark:border-white/10">
                            <div className="flex items-center justify-between mb-3">
                                <motion.div
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="flex items-center space-x-3"
                                >
                                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br 
                                                from-black/5 to-black/10 dark:from-white/5 dark:to-white/10 
                                                flex items-center justify-center">
                                        <User size={16} className="opacity-70" />
                                    </div>
                                    <span className="font-medium">Hello user</span>
                                </motion.div>
                                <motion.button
                                    onClick={() => setIsOpen(false)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 rounded-lg
                                           hover:bg-black/5 dark:hover:bg-white/5
                                           transition-colors duration-200"
                                >
                                    <X size={18} />
                                </motion.button>
                            </div>

                            {/* New Chat Button */}
                            <motion.button
                                onClick={handleNewChat}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-2.5 px-4 rounded-lg
                                         bg-gradient-to-br from-black to-gray-800
                                         dark:from-white dark:to-gray-200
                                         text-white dark:text-black font-medium
                                         flex items-center justify-center space-x-2.5
                                         shadow-lg hover:shadow-xl
                                         transition-all duration-200"
                            >
                                <Plus size={18} />
                                <span>New Chat</span>
                            </motion.button>
                        </div>

                        {/* Chat List */}
                        <div className="flex-1 overflow-y-auto min-h-0 p-3 space-y-1">
                            <AnimatePresence mode="popLayout">
                                {chats.length > 0 ? (
                                    chats.map((chat) => (
                                        <motion.button
                                            key={chat.id}
                                            layout
                                            initial={{ opacity: 0, y: -10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, x: -50 }}
                                            onClick={() => onSelectChat(chat)}
                                            className={`w-full p-3 rounded-lg flex items-start
                                                     group relative
                                                     hover:bg-black/5 dark:hover:bg-white/5
                                                     border border-transparent
                                                     hover:border-black/[0.12] dark:hover:border-white/10
                                                     transition-all duration-200
                                                     ${activeChat?.id === chat.id ?
                                                'bg-black/5 dark:bg-white/5 border-black/[0.12] dark:border-white/10' :
                                                ''}`}
                                        >
                                            <MessageSquare size={16}
                                                           className="mr-3 mt-0.5 flex-shrink-0 opacity-70
                                                                  group-hover:opacity-100" />
                                            <div className="flex-1 text-left min-w-0">
                                                <h4 className="font-medium truncate text-sm">
                                                    {chat.title}
                                                </h4>
                                                <p className="text-xs text-gray-500 dark:text-gray-400
                                                          mt-0.5 truncate">
                                                    {chat.preview}
                                                </p>
                                            </div>

                                            <motion.button
                                                initial={{ opacity: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    onDeleteChat(chat.id);
                                                }}
                                                className="absolute right-2 top-1/2 -translate-y-1/2
                                                         opacity-0 group-hover:opacity-100
                                                         p-1.5 rounded-lg
                                                         hover:bg-black/10 dark:hover:bg-white/10
                                                         transition-all duration-200"
                                            >
                                                <Trash2 size={14} className="text-red-500 dark:text-red-400" />
                                            </motion.button>
                                        </motion.button>
                                    ))
                                ) : (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="flex flex-col items-center justify-center
                                                 text-center px-4 py-10 space-y-4"
                                    >
                                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br
                                                    from-black/5 to-black/10 dark:from-white/5 dark:to-white/10
                                                    border border-black/5 dark:border-white/5
                                                    flex items-center justify-center"
                                        >
                                            <MessageSquare size={24} className="opacity-50" />
                                        </div>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            No chat history yet
                                        </p>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Footer */}
                        <div className="p-3 border-t border-black/[0.12] dark:border-white/10">
                            <motion.button
                                onClick={handleLogout}
                                whileHover={{ scale: 1.02, x: 4 }}
                                className="w-full p-3 rounded-lg flex items-center justify-center
                                         text-red-600 dark:text-red-400
                                         hover:bg-red-50 dark:hover:bg-red-900/10
                                         transition-colors duration-200
                                         space-x-2"
                            >
                                <LogOut size={18} />
                                <span>Sign Out</span>
                            </motion.button>
                        </div>
                    </motion.aside>
                </>
            )}
        </AnimatePresence>
    );
}