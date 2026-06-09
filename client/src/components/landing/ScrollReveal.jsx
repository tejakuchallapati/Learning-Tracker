import { motion, useReducedMotion } from 'framer-motion';

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
    viewportMargin = '0px 0px 8% 0px',
    as = 'div',
    ...rest
}) => {
    const reduceMotion = useReducedMotion();
    const Component = motionTags[as] ?? motion.div;

    if (reduceMotion) {
        const Tag = as;
        return (
            <Tag className={className} {...rest}>
                {children}
            </Tag>
        );
    }

    return (
        <Component
            className={className}
            initial={hiddenByDirection(direction, distance)}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once, amount, margin: viewportMargin }}
            transition={{
                duration,
                delay: delay / 1000,
                ease: [0.16, 1, 0.3, 1],
            }}
            style={{ willChange: 'transform, opacity' }}
            {...rest}
        >
            {children}
        </Component>
    );
};

export default ScrollReveal;
