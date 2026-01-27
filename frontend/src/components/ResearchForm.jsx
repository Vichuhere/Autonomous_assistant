import { useState } from 'react'
import { motion } from 'framer-motion'
import { Search, Loader2, ArrowRight } from 'lucide-react'

const ResearchForm = ({ onResearch, isLoading }) => {
    const [topic, setTopic] = useState('')

    const handleSubmit = (e) => {
        e.preventDefault()
        if (!topic.trim()) return
        onResearch(topic)
    }

    return (
        <motion.form
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            onSubmit={handleSubmit}
            className="relative group"
        >
            <div className="absolute -inset-1 bg-gradient-to-r from-primary to-accent rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />

            <div className="relative flex items-center bg-surface border border-white/10 rounded-2xl p-2 shadow-2xl">
                <div className="pl-4 text-secondary">
                    <Search className="w-6 h-6" />
                </div>

                <input
                    type="text"
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    disabled={isLoading}
                    placeholder="What would you like to research today?"
                    className="w-full bg-transparent border-none text-xl p-4 text-text placeholder:text-zinc-600 focus:outline-none disabled:opacity-50"
                />

                <button
                    type="submit"
                    disabled={isLoading || !topic}
                    className={`
                p-4 rounded-xl flex items-center justify-center transition-all duration-300
                ${isLoading || !topic ? 'bg-zinc-800 text-zinc-600 cursor-not-allowed' : 'bg-primary text-white hover:bg-primary/90 shadow-lg shadow-primary/25'}
            `}
                >
                    {isLoading ? (
                        <Loader2 className="w-6 h-6 animate-spin" />
                    ) : (
                        <ArrowRight className="w-6 h-6" />
                    )}
                </button>
            </div>

        </motion.form>
    )
}

export default ResearchForm
