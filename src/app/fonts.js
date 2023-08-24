//Using Google Fonts
import {Noto_Sans_KR, Playfair_Display, Diphylleia} from 'next/font/google';
export const noto_sans = Noto_Sans_KR({
    subsets: ['latin'],
    weight: '400',
    display: 'swap',
})
export const playfair_display = Playfair_Display({
    subsets:["latin"],
    weight: '500',
    display: 'swap'
})
export const diphylleia = Diphylleia({
    subsets:['latin'],
    weight:'400',
    display:'swap'
})