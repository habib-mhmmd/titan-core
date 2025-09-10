// import { Zap, Shield, Heart, Coffee, Smile, Type, TabletSmartphone, CodeXml } from 'lucide-astro';
// Define the LucideIcon type based on the structure of Lucide icons
// type LucideIcon = typeof Zap;
import GDicon from '../assets/icons/graphic.svg';
import AnimationIcon from '../assets/icons/animation.svg';
import UiDesignIcon from '../assets/icons/web-design.svg';

export interface Feature {
    icon: any;
    title: string;
    description: string;
    
}

export interface FeatureList {
    id: string;
    features: Feature[];
}

// Example feature lists
export const featureLists: Record<string, FeatureList> = {

    secondary: {
        id: 'secondary',
        features: [
            {
                icon: GDicon,
                title: 'Graphic Design',
                description: 'My strongest skills are crafting impactful designs and detailed image manipulations that define my creative identity.'
            },
            {
                icon: UiDesignIcon,
                title: 'UI/UX Design',
                description: 'I design user-friendly interfaces, balancing aesthetics and usability to create digital experiences that feel engaging and intuitive.'
            },
            {
                icon: AnimationIcon,
                title: 'Animation & Video',
                description: 'I have basic skills in motion and editing that bring energy to visuals, making designs more dynamic and expressive.'
            }
        ]
    }
};


    // main: {
    //     id: 'main',
    //     features: [
    //         {
    //             icon: Zap,
    //             title: 'Lightning Fast Performance',
    //             description: 'Optimized for speed and performance'
    //         },
    //         {
    //             icon: Shield,
    //             title: 'SEO Optimized Structure',
    //             description: 'Built with SEO best practices in mind'
    //         },
    //         {
    //             icon: TabletSmartphone,
    //             title: 'Responsive by Default',
    //             description: 'Mobile-friendly out of the box'
    //         },
    //         {
    //             icon: Smile,
    //             title: 'Easy Customization',
    //             description: 'Customize the theme to your liking'
    //         },
    //         {
    //             icon: Type,
    //             title: 'TypeScript Support',
    //             description: 'Built with TypeScript in mind'
    //         },
    //         {
    //             icon: CodeXml,
    //             title: 'Minimal Dependencies',
    //             description: 'Keep your project lightweight'
    //         }
    //     ]
    // },
