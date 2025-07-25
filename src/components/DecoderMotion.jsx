import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const characters = "!<>-_\\/[]{}—=+*^?#________";
const originalText = "* Move Your Cursor — Feel the Flow *";

const getRandomChar = () =>
    characters[Math.floor(Math.random() * characters.length)];

const DecoderMotion = () => {
    const [text, setText] = useState("");
    const [revealIndex, setRevealIndex] = useState(0);

    useEffect(() => {
        let interval;
        let index = 0;

        const scramble = () => {
            const scrambled = originalText
                .split("")
                .map((char, i) =>
                    i < index ? originalText[i] : getRandomChar()
                )
                .join("");

            setText(scrambled);

            if (index < originalText.length) {
                index++;
            } else {
                clearInterval(interval);
                setTimeout(() => {
                    index = 0;
                    interval = setInterval(scramble, 50);
                }, 2500);
            }
        };

        interval = setInterval(scramble, 50);
        return () => clearInterval(interval);
    }, []);

    return (
        <motion.h1
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="font-final  absolute text-[0.7rem] max-w-[40rem]  md:text-sm left-[50%] -translate-x-1/2 -bottom-20 uppercase text-[#195E39]"
        >
            {text}
            <hr />
        </motion.h1>
    );
};

export default DecoderMotion;
