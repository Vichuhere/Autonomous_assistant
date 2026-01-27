import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Sparkles, ArrowRight, BrainCircuit } from 'lucide-react'
import ResearchForm from './components/ResearchForm'
import ResearchReport from './components/ResearchReport'
import axios from 'axios'

function App() {
    const [loading, setLoading] = useState(false)
    const [report, setReport] = useState(null)
    const [error, setError] = useState(null)

    const handleResearch = async (topic) => {
        setLoading(true)
        setError(null)
        setReport(null)

        try {
            // Assuming backend is on port 8000
            const response = await axios.post('http://localhost:8000/api/research', { topic })
            setReport(response.data)
        } catch (err) {
            setError(err.response?.data?.detail || "Failed to conduct research. Ensure backend is running.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen w-full relative overflow-x-hidden selection:bg-primary/30">

            {/* Background Gradients */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-accent/10 rounded-full blur-[120px] mix-blend-screen" />
            </div>

            <div className="relative z-10 max-w-5xl mx-auto px-6 py-20 flex flex-col items-center min-h-screen">

                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-16 space-y-4"
                >
                    <div className="flex items-center justify-center gap-3 mb-4">
                        <div className="p-3 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-lg shadow-inner">
                            <BrainCircuit className="w-8 h-8 text-accent" />
                        </div>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold tracking-tight">
                        Autonomous <span className="text-gradient">Research</span>
                    </h1>
                    <p className="text-secondary text-lg max-w-2xl mx-auto leading-relaxed">
                        Deep-dive intelligence powered by advanced AI and real-time web agents.
                        Enter a topic to generate a comprehensive structured brief.
                    </p>
                </motion.div>

                {/* Input Section */}
                <div className="w-full max-w-2xl mb-12 relative z-20">
                    <ResearchForm onResearch={handleResearch} isLoading={loading} />
                </div>

                {/* Error Message */}
                <AnimatePresence>
                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-200 mb-8"
                        >
                            {error}
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Results Section */}
                <div className="w-full">
                    <AnimatePresence mode="wait">
                        {report && (
                            <ResearchReport data={report} />
                        )}
                    </AnimatePresence>
                </div>

            </div>
        </div>
    )
}

export default App
