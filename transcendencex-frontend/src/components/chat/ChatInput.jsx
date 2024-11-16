import { Send, Paperclip, X } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function ChatInput({ onSubmit, isLoading }) {
    const [message, setMessage] = useState('');
    const [files, setFiles] = useState([]);
    const fileInputRef = useRef(null);
    const textareaRef = useRef(null);

    useEffect(() => {
        adjustTextareaHeight();
    }, [message]);

    const adjustTextareaHeight = () => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = 'auto';
            textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if ((!message.trim() && files.length === 0) || isLoading) return;
        onSubmit(message, files);
        setMessage('');
        setFiles([]);
        // Reset textarea height
        if (textareaRef.current) {
            textareaRef.current.style.height = '50px';
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            if (e.shiftKey) {
                // Allow the default behavior for Shift+Enter (new line)
                return;
            } else {
                // Prevent the default Enter behavior and submit
                e.preventDefault();
                handleSubmit(e);
            }
        }
    };

    const handleFileChange = (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFiles(prev => [...prev, ...selectedFiles]);
    };

    const removeFile = (index) => {
        setFiles(prev => prev.filter((_, i) => i !== index));
    };

    const handlePaste = (e) => {
        const items = e.clipboardData?.items;
        if (!items) return;

        const pastedFiles = Array.from(items)
            .filter(item => item.kind === 'file')
            .map(item => item.getAsFile())
            .filter(Boolean);

        if (pastedFiles.length > 0) {
            setFiles(prev => [...prev, ...pastedFiles]);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-2"
        >
            {/* File Preview */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="flex flex-wrap gap-2 p-2"
                    >
                        {files.map((file, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="group relative bg-black/[0.02] dark:bg-white/[0.02]
                                         border border-black/[0.05] dark:border-white/[0.05]
                                         rounded-lg p-2 pr-8 flex items-center space-x-2"
                            >
                                <Paperclip size={14} className="text-gray-500" />
                                <span className="text-sm truncate max-w-[200px]">
                                    {file.name}
                                </span>
                                <button
                                    onClick={() => removeFile(index)}
                                    className="absolute right-2 top-1/2 -translate-y-1/2
                                             p-1 rounded-md
                                             hover:bg-black/5 dark:hover:bg-white/5
                                             transition-colors duration-200"
                                >
                                    <X size={14} />
                                </button>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Input Form */}
            <motion.form
                onSubmit={handleSubmit}
                className="relative flex items-end gap-2"
            >
                <div className="flex-1 relative">
                    <div className="absolute left-3 top-4 z-10">
                        {/* File Upload Button */}
                        <motion.button
                            type="button"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => fileInputRef.current?.click()}
                            className="p-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5
                                     transition-colors duration-200 group"
                        >
                            <Paperclip
                                size={18}
                                className="text-gray-500 group-hover:text-gray-700
                                         dark:group-hover:text-gray-300 transition-colors"
                            />
                        </motion.button>
                    </div>

                    <textarea
                        ref={textareaRef}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        onKeyDown={handleKeyDown}
                        onPaste={handlePaste}
                        placeholder="Type a message..."
                        rows={1}
                        className="w-full pl-14 pr-4 py-3 rounded-xl
                                 bg-black/[0.02] dark:bg-white/[0.02]
                                 border border-black/[0.05] dark:border-white/[0.05]
                                 placeholder-gray-500 dark:placeholder-gray-400
                                 focus:border-black/20 dark:focus:border-white/20
                                 focus:bg-black/[0.03] dark:focus:bg-white/[0.03]
                                 hover:border-black/10 dark:hover:border-white/10
                                 transition-all duration-200
                                 resize-none min-h-[50px] max-h-[200px]
                                 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600
                                 scrollbar-track-transparent
                                 scrollbar-thumb-rounded-full
                                 [-ms-overflow-style:'none']
                                 [scrollbar-width:'thin']
                                 [&::-webkit-scrollbar]:w-2
                                 [&::-webkit-scrollbar-track]:bg-transparent
                                 [&::-webkit-scrollbar-thumb]:bg-gray-300
                                 dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                                 [&::-webkit-scrollbar-thumb]:rounded-full"
                        disabled={isLoading}
                    />

                    <input
                        ref={fileInputRef}
                        type="file"
                        onChange={handleFileChange}
                        multiple
                        className="hidden"
                        accept="image/*,.pdf,.doc,.docx,.txt"
                    />
                </div>

                {/* Send Button */}
                <motion.button
                    type="submit"
                    disabled={(!message.trim() && files.length === 0) || isLoading}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-3 rounded-xl flex-shrink-0
                             bg-black dark:bg-white
                             text-white dark:text-black
                             disabled:opacity-50 disabled:cursor-not-allowed
                             shadow-lg hover:shadow-xl
                             transition-all duration-200"
                >
                    <Send size={18} />
                </motion.button>
            </motion.form>

            {/* Optional: File upload hint */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-xs text-gray-500 dark:text-gray-400 px-4"
            >
            </motion.div>
        </motion.div>
    );
}