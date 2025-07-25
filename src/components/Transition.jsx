import ReactDOM from 'react-dom';
import { motion } from 'framer-motion';

const calculateRandomBlockDelay = (rowIndex, totalRows) => {
    const blockDelay = Math.random() * 0.5;
    const rowDelay = (totalRows - rowIndex - 1) * 0.05;
    return blockDelay + rowDelay;
};

const Transition = (Page) => {
    return () => (
        <div className="relative"> {/* Single parent wrapper */}
            <Page />

            {/* Transition IN overlay - rendered in portal */}
            {ReactDOM.createPortal(
                <div className="fixed top-0 left-0 w-screen h-screen flex flex-col pointer-events-none z-[9999] transition-in">
                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex-1 w-full flex row">
                            {Array.from({ length: 11 }).map((_, blockIndex) => (
                                <motion.div
                                    key={blockIndex}
                                    className="relative flex-1 bg-[#667067] -m-[0.25px] origin-top"
                                    initial={{ scaleY: 1 }}
                                    animate={{ scaleY: 0 }}
                                    exit={{ scaleY: 0 }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: calculateRandomBlockDelay(rowIndex, 10),
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>,
                document.body
            )}

            {/* Transition OUT overlay - rendered in portal */}
            {ReactDOM.createPortal(
                <div className="fixed top-0 left-0 w-screen h-screen flex flex-col pointer-events-none z-[9999] transition-out">
                    {Array.from({ length: 10 }).map((_, rowIndex) => (
                        <div key={rowIndex} className="flex-1 w-full flex row">
                            {Array.from({ length: 11 }).map((_, blockIndex) => (
                                <motion.div
                                    key={blockIndex}
                                    className="relative flex-1 bg-[#667067] -m-[0.25px] origin-bottom"
                                    initial={{ scaleY: 1 }}
                                    animate={{ scaleY: 0 }}
                                    exit={{ scaleY: 1 }}
                                    transition={{
                                        duration: 1,
                                        ease: [0.22, 1, 0.36, 1],
                                        delay: calculateRandomBlockDelay(rowIndex, 10),
                                    }}
                                />
                            ))}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};

export default Transition;
