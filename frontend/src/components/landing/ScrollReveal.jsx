import { motion } from 'framer-motion';

const motionTags = {
    div: motion.div,
    aside: motion.aside,
    article: motion.article,
    section: motion.section,
};

const hiddenByDirection = (direction, distance) => {
    switch (direction) {
        case 'down':
            return { opacity: 0, y: -distance };
        case 'left':
            return { opacity: 0, x: -distance };
        case 'right':
            return { opacity: 0, x: distance };
        case 'up':
        default:
            return { opacity: 0, y: distance };
    }
};

const ScrollReveal = ({
    children,
    className = '',
    delay = 0,
    duration = 0.65,
    distance = 56,
    direction = 'up',
    amount = 0.2,
    once = false,
    as = 'div',
    ...rest
}) => {
    const Component = motionTags[as] ?? motion.div;

    return (
        <Component
            className={className}
            initial={hiddenByDirection(direction, distance)}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, amount }}
            transition={{
                duration,
                delay: delay / 1000,
                ease: [0.22, 1, 0.36, 1],
            }}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default ScrollReveal;
