import { motion } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { FileText, Link as LinkIcon, ExternalLink } from 'lucide-react'

const ResearchReport = ({ data }) => {
    const { report, sources } = data

    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, type: "spring", damping: 20 }}
            className="space-y-8"
        >
            {/* Main Report Card */}
            <div className="glass-panel rounded-3xl p-8 md:p-12">
                <div className="flex items-center gap-3 mb-8 pb-6 border-b border-white/5">
                    <FileText className="w-6 h-6 text-accent" />
                    <h2 className="text-2xl font-semibold">Research Brief</h2>
                </div>

                <article className="prose prose-invert prose-lg max-w-none 
                prose-headings:text-zinc-100 prose-headings:font-bold
                prose-p:text-zinc-300 prose-p:leading-relaxed
                prose-a:text-primary prose-a:no-underline hover:prose-a:underline
                prose-strong:text-white
                prose-ul:text-zinc-300
                prose-li:marker:text-zinc-500">
                    <ReactMarkdown>{report}</ReactMarkdown>
                </article>
            </div>

            {/* Sources Card */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {sources?.map((source, index) => (
                    <motion.a
                        href={source.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="group glass-panel rounded-2xl p-6 hover:bg-white/5 transition-all cursor-pointer border border-white/5 hover:border-primary/30"
                    >
                        <div className="flex items-start justify-between mb-3">
                            <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/20 transition-colors">
                                <LinkIcon className="w-4 h-4 text-zinc-400 group-hover:text-primary" />
                            </div>
                            <ExternalLink className="w-4 h-4 text-zinc-600 group-hover:text-zinc-400" />
                        </div>
                        <h3 className="font-medium text-zinc-200 line-clamp-1 mb-2 group-hover:text-primary transition-colors">
                            {source.title}
                        </h3>
                        <p className="text-sm text-zinc-500 line-clamp-2">
                            {source.body}
                        </p>
                    </motion.a>
                ))}
            </div>

        </motion.div>
    )
}

export default ResearchReport
