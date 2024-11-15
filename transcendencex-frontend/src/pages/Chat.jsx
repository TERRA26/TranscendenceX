import { useState, useRef, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ArrowUpCircle, File, FileText, Image as ImageIcon } from 'lucide-react';
import ChatMessage from '../components/chat/ChatMessage';
import ChatInput from '../components/chat/ChatInput';
import ChatHeader from '../components/chat/ChatHeader';
import ChatLoading from '../components/chat/ChatLoading';
import Sidebar from '../components/chat/Sidebar';

const GlowingBackground = () => {
    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
            <div className="absolute -inset-[10px] opacity-50">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
                              w-96 h-96 bg-white dark:bg-black rounded-full
                              blur-3xl opacity-20 animate-pulse"></div>
            </div>
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r
                          from-transparent via-black/20 dark:via-white/10 to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r
                          from-transparent via-black/20 dark:via-white/10 to-transparent"></div>
        </div>
    );
};

const FloatingParticle = ({ delay = 0 }) => {
    return (
        <motion.div
            className="absolute w-1 h-1 bg-black/40 dark:bg-white/40 rounded-full select-none pointer-events-none"
            initial={{ y: -10, opacity: 0 }}
            animate={{
                y: ['0vh', '100vh'],
                opacity: [0, 1, 0]
            }}
            transition={{
                duration: 8 + Math.random() * 4,
                delay: delay,
                repeat: Infinity,
                ease: "linear"
            }}
            style={{
                left: `${Math.random() * 100}%`,
            }}
        />
    );
};

const FileAttachment = ({ file }) => (
    <div className="flex items-center space-x-2 p-2 rounded-lg bg-black/[0.02] dark:bg-white/[0.02]
                    border border-black/[0.05] dark:border-white/[0.05] group
                    hover:bg-black/[0.04] dark:hover:bg-white/[0.04]
                    transition-all duration-200">
        <div className="w-10 h-10 rounded-lg bg-black/5 dark:bg-white/5
                     flex items-center justify-center">
            <FileIcon file={file} />
        </div>
        <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{file.name}</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(file.size)}
            </p>
        </div>
    </div>
);

const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
};

const FileIcon = ({ file }) => {
    const type = file.type.split('/')[0];
    switch(type) {
        case 'image':
            return <ImageIcon className="w-5 h-5 text-blue-500" />;
        case 'application':
            return <FileText className="w-5 h-5 text-orange-500" />;
        default:
            return <File className="w-5 h-5 text-gray-500" />;
    }
};

const EmptyState = ({ suggestions, onSendMessage }) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center justify-center py-8 space-y-8"
    >
        <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-4xl sm:text-5xl font-bold tracking-tight bg-gradient-to-br from-black to-gray-600
                      dark:from-white dark:to-gray-400 bg-clip-text text-transparent text-center px-4"
        >
            Hello user, How can I help you today?
        </motion.h1>

        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="w-full max-w-2xl flex items-center justify-center text-sm
                     text-gray-500 dark:text-gray-400 px-4"
        >
            Start a conversation or try a suggestion below
        </motion.div>

        <div className="w-full max-w-2xl space-y-2 px-4">
            {suggestions.map((suggestion, index) => (
                <motion.button
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{
                        opacity: 1,
                        x: 0,
                        transition: { delay: 0.6 + index * 0.1 }
                    }}
                    whileHover={{ scale: 1.01, x: 4 }}
                    onClick={() => onSendMessage(suggestion)}
                    className="w-full p-4 rounded-xl text-left flex items-center
                             bg-black/[0.02] dark:bg-white/[0.02]
                             hover:bg-black/[0.04] dark:hover:bg-white/[0.04]
                             border border-black/[0.05] dark:border-white/[0.05]
                             backdrop-blur-sm group
                             transition-all duration-300"
                >
                    <span className="flex-1">{suggestion}</span>
                    <ArrowUpCircle className="w-5 h-5 opacity-0 group-hover:opacity-100
                                          transition-all duration-300" />
                </motion.button>
            ))}
        </div>
    </motion.div>
);

// Updated ChatMessage component with file support
const MessageContent = ({ message, role, files }) => {
    const isUser = role === 'user';

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className={`flex items-start space-x-3 ${isUser ? 'justify-end' : ''}`}
        >
            <div className={`flex-1 max-w-[80%] space-y-2 ${isUser ? 'ml-auto' : ''}`}>
                {/* Message bubble */}
                {message && (
                    <motion.div
                        layout
                        className={`relative group p-4 rounded-2xl ${
                            isUser
                                ? 'bg-black dark:bg-white text-white dark:text-black'
                                : 'bg-black/[0.02] dark:bg-white/[0.02]'
                        }`}
                    >
                        <p className="text-sm leading-relaxed">{message}</p>
                    </motion.div>
                )}

                {/* File attachments */}
                {files && files.length > 0 && (
                    <div className="space-y-2">
                        {files.map((file, index) => (
                            <FileAttachment key={index} file={file} />
                        ))}
                    </div>
                )}
            </div>
        </motion.div>
    );
};

export default function Chat() {
    const [messages, setMessages] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [chats, setChats] = useState([]);
    const [activeChat, setActiveChat] = useState(null);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSendMessage = async (message, files = []) => {
        const userMessage = {
            id: Date.now(),
            message,
            files,
            role: 'user'
        };

        setMessages(prev => [...prev, userMessage]);

        // Update chat preview if we're in an active chat
        if (activeChat) {
            const previewText = message || (files.length > 0 ? `Sent ${files.length} file${files.length > 1 ? 's' : ''}` : '');
            setChats(prevChats =>
                prevChats.map(chat =>
                    chat.id === activeChat.id
                        ? {
                            ...chat,
                            preview: previewText.slice(0, 60) + (previewText.length > 60 ? '...' : '')
                        }
                        : chat
                )
            );
        }

        await simulateResponse(message);
    };

    const simulateResponse = async (userMessage) => {
        setIsLoading(true);
        await new Promise(resolve => setTimeout(resolve, 1500));

        const aiResponse = {
            id: Date.now(),
            message: userMessage
                ? `This is a simulated response to: "${userMessage}"`
                : "I received your files. How can I help you with them?",
            role: 'assistant'
        };

        setMessages(prev => [...prev, aiResponse]);
        setIsLoading(false);
    };

    const suggestions = [
        "Help me design something",
        "Conversation starters placeholder",
        "What's the best way to handle form validation?"
    ];

    const welcomeMessage = "Hello! How can I help you today?";

    const handleNewChat = () => {
        const chat = {
            id: Date.now(),
            title: "New Chat",
            preview: welcomeMessage
        };
        setChats(prev => [chat, ...prev]);
        setActiveChat(chat);
        setMessages([{
            id: Date.now(),
            message: welcomeMessage,
            role: 'assistant'
        }]);
        setIsSidebarOpen(false);
    };

    const handleSelectChat = (chat) => {
        setActiveChat(chat);
        setMessages([{
            id: Date.now(),
            message: chat.preview,
            role: 'assistant'
        }]);
        setIsSidebarOpen(false);
    };

    const handleDeleteChat = (chatId) => {
        setChats(prev => prev.filter(chat => chat.id !== chatId));
        if (activeChat?.id === chatId) {
            setActiveChat(null);
            setMessages([]);
        }
    };

    return (
        <div className="h-screen w-screen fixed inset-0 flex bg-white dark:bg-black
                     text-black dark:text-white antialiased overflow-hidden">
            <GlowingBackground />
            {Array.from({ length: 15 }).map((_, i) => (
                <FloatingParticle key={i} delay={i * 0.3} />
            ))}

            <Sidebar
                isOpen={isSidebarOpen}
                setIsOpen={setIsSidebarOpen}
                onNewChat={handleNewChat}
                activeChat={activeChat}
                onSelectChat={handleSelectChat}
                chats={chats}
                onDeleteChat={handleDeleteChat}
            />

            <div className="flex-1 flex flex-col min-w-0 relative isolate">
                <ChatHeader
                    onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
                    isSidebarOpen={isSidebarOpen}
                    title={activeChat?.title || "New Chat"}
                />

                <main className="flex-1 relative">
                    <div className="absolute inset-0 overflow-y-auto overflow-x-hidden">
                        <div className="max-w-3xl mx-auto px-4 py-6">
                            {messages.length === 0 ? (
                                <EmptyState suggestions={suggestions} onSendMessage={handleSendMessage} />
                            ) : (
                                <div className="space-y-6">
                                    <AnimatePresence initial={false} mode="popLayout">
                                        {messages.map((msg) => (
                                            <MessageContent
                                                key={msg.id}
                                                message={msg.message}
                                                role={msg.role}
                                                files={msg.files}
                                            />
                                        ))}
                                    </AnimatePresence>

                                    {isLoading && <ChatLoading />}
                                </div>
                            )}
                            <div ref={messagesEndRef} className="h-32" />
                        </div>
                    </div>
                </main>

                <div className="fixed bottom-0 left-0 right-0 bg-gradient-to-t
                             from-white dark:from-black to-transparent h-32
                             pointer-events-none" />

                <div className="border-t border-black/[0.05] dark:border-white/[0.05]
                             backdrop-blur-xl bg-white/70 dark:bg-black/70 relative">
                    <div className="max-w-3xl mx-auto p-4 relative">
                        <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
                    </div>
                </div>
            </div>
        </div>
    );
}