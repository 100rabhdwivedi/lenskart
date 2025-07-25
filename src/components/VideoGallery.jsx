import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { GoArrowLeft } from "react-icons/go";
import Nav from "./Nav";
import Transition from "./Transition";
const VideoGallery = () => {
    const videos = [
        { id: "1-0", videoId: "1.mp4", videoName: "Concert Vibes", previewImg: "/galleryimages/1.jpg" },
        { id: "1-1", videoId: "2.mp4", videoName: "Urban Style, Bold Frames", previewImg: "/galleryimages/2.jpg" },
        { id: "1-2", videoId: "3.mp4", videoName: "Retro Magic – Potter Frames", previewImg: "/galleryimages/3.jpg" },
        { id: "1-3", videoId: "4.mp4", videoName: "Smart Bluetooth Glasses", previewImg: "/galleryimages/4.jpg" },
        { id: "2-0", videoId: "11.mp4", videoName: "The Coder Look", previewImg: "/galleryimages/5.jpg" },
        { id: "2-1", videoId: "6.mp4", videoName: "Desi Diva in Shades", previewImg: "/galleryimages/6.jpg" },
        { id: "2-2", videoId: "7.mp4", videoName: "Superman Inspired", previewImg: "/galleryimages/7.jpg" },
        { id: "3-0", videoId: "8.mp4", videoName: "Little Legends", previewImg: "/galleryimages/8.jpg" },
        { id: "3-1", videoId: "9.mp4", videoName: "Rakhi Gift", previewImg: "/galleryimages/9.jpg" },
        { id: "3-2", videoId: "10.mp4", videoName: "Wizard Vibes", previewImg: "/galleryimages/10.jpg" },
        { id: "3-3", videoId: "5.mp4", videoName: "Price Drop, Style Rise!", previewImg: "/galleryimages/11.jpg" }
    ];

    const galleryRef = useRef(null);
    const containerRef = useRef(null);
    const [items, setItems] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const generateItems = () => {
            const rows = [
                { id: 1, count: 4 },
                { id: 2, count: 3 },
                { id: 3, count: 4 },
            ];
            const newItems = rows.map((row) =>
                Array.from({ length: row.count }, (_, index) => {
                    const itemId = `${row.id}-${index}`;
                    const video = videos.find((v) => v.id === itemId);
                    return video ? { id: itemId, rowId: row.id, video } : null;
                }).filter(Boolean)
            );
            setItems(newItems);
        };

        const preloadMedia = () => {
            const imagePromises = videos.map((video) => {
                return new Promise((resolve) => {
                    const img = new Image();
                    img.src = video.previewImg;
                    img.onload = resolve;
                    img.onerror = resolve;
                });
            });

            const videoPromises = videos.map((video) => {
                return new Promise((resolve) => {
                    const videoEl = document.createElement("video");
                    videoEl.src = `/videos/${video.videoId}`;
                    videoEl.preload = "auto";
                    videoEl.oncanplaythrough = resolve;
                    videoEl.onerror = resolve;
                });
            });

            Promise.all([...imagePromises, ...videoPromises]).then(() => {
                generateItems();
                setIsLoaded(true);
            });
        };

        preloadMedia();

        const handleMouseMove = (e) => {
            const { clientX, clientY, currentTarget } = e;
            const { width, height, left, top } = currentTarget.getBoundingClientRect();
            const centerX = left + width / 2;
            const centerY = top + height / 2;
            const deltaX = (centerX - clientX);
            const deltaY = (centerY - clientY);

            if (galleryRef.current) {
                galleryRef.current.style.transform = `translate(calc(-50% + ${deltaX}px), calc(-50% + ${deltaY}px))`;
            }
        };

        const containerEl = containerRef.current;
        if (containerEl) {
            containerEl.addEventListener("mousemove", handleMouseMove);
        }

        return () => {
            if (containerEl) {
                containerEl.removeEventListener("mousemove", handleMouseMove);
            }
        };
    }, []);

    return (
        <>
            <Nav />
            <div
                className="w-full h-screen relative overflow-hidden text-[#111] bg-[#e5e5dd] container"
                ref={containerRef}
            >
                <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                    <motion.h1
                        className="font-final text-[clamp(0.6rem,2vw,0.9rem)] bg-black/50 backdrop-blur-md font-semibold pointer-events-none z-20 text-[#A97CD7] uppercase tracking-widest p-2 rounded-xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.5)]"
                        animate={{ opacity: [0.5, 1, 0.5] }}
                        transition={{ duration: 3, repeat: Infinity }}
                    >
                        🖱️ Move cursor around
                    </motion.h1>

                    <div className="mt-2 flex flex-col items-center gap-2 z-20 pointer-events-none">
                        <div className="flex gap-4 text-xl text-[#58A0A0]">
                            <motion.span
                                className="rotate-135"
                                animate={{ x: [-5, 0, -5] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <GoArrowLeft />
                            </motion.span>
                            <motion.span
                                className="-rotate-45"
                                animate={{ x: [5, 0, 5] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <GoArrowLeft />
                            </motion.span>
                        </div>

                        <div className="flex gap-6 text-xl text-[#c7b7b7]">
                            <motion.span
                                className="-rotate-45"
                                animate={{ y: [-5, 0, -5] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <GoArrowLeft />
                            </motion.span>
                            <motion.span
                                className="rotate-135"
                                animate={{ y: [5, 0, 5] }}
                                transition={{ duration: 1.2, repeat: Infinity, ease: "easeInOut" }}
                            >
                                <GoArrowLeft />
                            </motion.span>
                        </div>
                    </div>
                </div>

                {!isLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center text-lg text-[#444] font-semibold z-30">
                        Loading gallery...
                    </div>
                )}

                {isLoaded && (
                    <div
                        className="absolute top-1/2 left-1/2 transition-transform duration-[2000ms] ease-[cubic-bezier(0.075,0.82,0.165,1)] flex flex-col justify-center gap-36 md:gap-0 md:justify-around"
                        style={{ width: "200vw", height: "200vh", transform: "translate(-50%, -50%)" }}
                        ref={galleryRef}
                    >
                        {items.map((row, rowIndex) => (
                            <div
                                key={`row-${rowIndex}`}
                                className={`w-full flex ${rowIndex === 1 ? "justify-around" : "justify-between"}`}
                            >
                                {row.map((item) => (
                                    <div
                                        key={item.id}
                                        className="relative w-[200px] h-[200px] md:w-[400px] md:h-[250px] overflow-hidden group"
                                    >
                                        <div className="absolute inset-0 z-10">
                                            <img
                                                src={item.video.previewImg}
                                                alt={item.video.videoName || "Video preview"}
                                                className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-0"
                                            />
                                        </div>

                                        <p className="absolute z-20 top-1/2 left-1/2 text-center font-final text-white text-sm bg-black/50 px-3 py-1 rounded-md backdrop-blur-sm opacity-0 pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition duration-200 group-hover:opacity-100">
                                            {item.video.videoName}
                                        </p>

                                        <div className="absolute inset-0 scale-200 transition-all duration-300">
                                            <video
                                                src={`/videos/${item.video.videoId}`}
                                                autoPlay
                                                loop
                                                muted
                                                playsInline
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
};

export default Transition(VideoGallery);
