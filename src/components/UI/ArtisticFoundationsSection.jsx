import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const ArtCard = ({ title, image, description, intention, tags, onClick }) => (
    <motion.div
        whileHover={{ scale: 1.02 }}
        className="glass-card p-6 rounded-xl flex flex-col h-full cursor-pointer group"
        onClick={onClick}
    >
        <div className="mb-4 rounded-lg overflow-hidden relative">
            <img
                src={image}
                alt={title}
                className="w-full h-64 object-cover transform transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
                <span className="text-white opacity-0 group-hover:opacity-100 font-bold tracking-wider transition-opacity duration-300">
                    VIEW
                </span>
            </div>
        </div>

        <h4 className="font-bold text-lg font-merriweather mb-2">{title}</h4>

        <div className="space-y-4 flex-grow">
            <div>
                <h5 className="text-xs uppercase tracking-wider text-secondary font-bold mb-1">Description</h5>
                <p className="text-sm leading-relaxed opacity-80">{description}</p>
            </div>

            {/* <div>
                <h5 className="text-xs uppercase tracking-wider text-secondary font-bold mb-1">Learning Intention</h5>
                <p className="text-sm leading-relaxed opacity-80 italic">{intention}</p>
            </div> */}

            {tags && (
                <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-secondary/20">
                    {tags.map((tag, i) => (
                        <span key={i} className="px-2 py-1 bg-secondary/10 text-xs rounded text-primary/80 border border-secondary/20">
                            {tag}
                        </span>
                    ))}
                </div>
            )}
        </div>
    </motion.div>
);

const ArtModal = ({ piece, onClose }) => {
    if (!piece) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
                onClick={(e) => e.stopPropagation()}
            >
                <button
                    onClick={onClose}
                    className="absolute -top-12 right-0 text-white hover:text-secondary transition-colors"
                >
                    <X size={32} />
                </button>

                <img
                    src={piece.image}
                    alt={piece.title}
                    className="max-w-full max-h-[80vh] object-contain rounded-lg shadow-2xl mb-4"
                />

                <div className="bg-black/60 p-4 rounded-lg backdrop-blur-md text-center max-w-2xl">
                    <h3 className="text-xl font-merriweather text-white mb-2">{piece.title}</h3>
                    <p className="text-white/80 text-sm mb-4">{piece.description}</p>
                    {piece.tags && (
                        <div className="flex flex-wrap gap-2 justify-center">
                            {piece.tags.map((tag, i) => (
                                <span key={i} className="px-2 py-1 bg-white/10 text-xs rounded text-white/90 border border-white/20">
                                    {tag}
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            </motion.div>
        </motion.div>
    );
};

const ArtisticFoundationsSection = () => {
    const [selectedPiece, setSelectedPiece] = useState(null);

    const artPieces = [
        {
            title: "Tracer",
            image: "/assets/images/art/mac-sampson-tracer-posing-fixed22.jpg",
            description: "Character/material study featuring Tracer from Overwatch. This work was mainly focused on recreating various surface types - matte leather jacket, high-gloss chrome bracers, and emissive glow of the chronal accelerator. Created using Photoshop + Wacom tablet.",
            tags: ["Photoshop"]
        },
        {
            title: "Black Panther",
            image: "/assets/images/art/mac-sampson-black-panther1.jpg",
            description: "A digital painting focused on recreating one of the pieces from a favorite artist of mine. Created using Photoshop + Wacom tablet.",
            tags: ["Photoshop"]
        },
        {
            title: "Portrait",
            image: "/assets/images/art/mac-sampson-img-20160118-190026.jpg",
            description: "A portrait study in facial proportions and anatomical landmarks. Created using charcoal pencils.",
            tags: ["Charcoal", "Traditional"]
        },
    ];

    return (
        <section className="mb-16">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
            >
                <h2 className="font-bold text-2xl sm:text-3xl mb-8 font-merriweather text-primary border-b border-secondary/30 pb-4 inline-block">
                    Artistic Foundations
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {artPieces.map((piece, index) => (
                        <ArtCard
                            key={index}
                            {...piece}
                            onClick={() => setSelectedPiece(piece)}
                        />
                    ))}
                </div>
            </motion.div>

            <AnimatePresence>
                {selectedPiece && (
                    <ArtModal
                        piece={selectedPiece}
                        onClose={() => setSelectedPiece(null)}
                    />
                )}
            </AnimatePresence>
        </section>
    );
};

export default ArtisticFoundationsSection;
