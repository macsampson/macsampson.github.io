import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ArtCard = ({ title, image, description, tags, onClick }) => (
    <div
        className="bg-white border border-secondary/20 hover:border-secondary/50 rounded-lg overflow-hidden cursor-pointer transition-colors group"
        onClick={onClick}
    >
        <div className="overflow-hidden">
            <img
                src={image}
                alt={title}
                className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
            />
        </div>

        <div className="p-4">
            <h4 className="font-semibold text-sm font-merriweather text-primary mb-2">{title}</h4>
            <p className="text-xs leading-relaxed text-primary/65 mb-3 line-clamp-2">{description}</p>
            {tags && (
                <div className="flex flex-wrap gap-1.5">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-1.5 py-0.5 bg-secondary/10 text-xs rounded text-secondary">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </div>
);

const ArtModal = ({ piece, onClose }) => {
    if (!piece) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.15 }}
                className="relative max-w-4xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-10 right-0 text-white/70 hover:text-white transition-colors"
                >
                    <X size={28} />
                </button>

                <img
                    src={piece.image}
                    alt={piece.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mb-4"
                />

                <div className="text-center max-w-xl">
                    <h3 className="text-lg font-merriweather text-white mb-1">{piece.title}</h3>
                    <p className="text-white/70 text-sm">{piece.description}</p>
                </div>
            </motion.div>
        </motion.div>
    );
};

const ArtisticFoundationsSection = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);

    const artPieces = [
        {
            title: "Recall",
            image: "/assets/images/art/mac-sampson-tracer-posing-fixed22.jpg",
            description: "Character/material study featuring Tracer from Overwatch. Focused on recreating various surface types — matte leather, high-gloss chrome, and emissive glow.",
            tags: ["Photoshop"]
        },
        {
            title: "Warrior Queen",
            image: "/assets/images/art/mac-sampson-black-panther1.jpg",
            description: "A digital painting focused on recreating one of the pieces from a favorite artist of mine.",
            tags: ["Photoshop"]
        },
        {
            title: "Lumos",
            image: "/assets/images/art/mac-sampson-img-20160118-190026.jpg",
            description: "A portrait study in facial proportions and anatomical landmarks.",
            tags: ["Charcoal", "Traditional"]
        },
    ];

    return (
        <motion.section
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="mb-20"
        >
            <h2 className="font-bold text-xl font-merriweather text-primary mb-8 pb-3 border-b border-secondary/20">
                Artistic Foundations
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {artPieces.map((piece, index) => (
                    <ArtCard
                        key={index}
                        {...piece}
                        onClick={() => setSelectedPiece(piece)}
                    />
                ))}
            </div>

            <AnimatePresence>
                {selectedPiece && (
                    <ArtModal
                        piece={selectedPiece}
                        onClose={() => setSelectedPiece(null)}
                    />
                )}
            </AnimatePresence>
        </motion.section>
    );
};

export default ArtisticFoundationsSection;
