import { useEffect, useState } from 'react';
import styles from "../styles/palette.module.css"
function Palette() {
    const [burgerMenu, setBurgerMenu] = useState(false)
    const [colorType, setColorType] = useState("HEX")
    const [state, setState] = useState(false)
    const [colors, setColors] = useState(new Array(5).fill({ hex: "", hexVal: "Hex: ", rgb: "", rgbVal: "RGB: ", hsl: "", hslVal: "HSL: ", blocked: false }))


    const animToggle = () => {
        setState(true)
    }


    //array with colors
    let arrPal = new Array(5).fill("").map(e => e = geraCor())
    //
    function geraPal() {
        return arrPal = arrPal.map(e => e = geraCor())
    }
    function RGBToHSL(r, g, b) {
        // Make r, g, and b fractions of 1
        r /= 255;
        g /= 255;
        b /= 255;

        // Find greatest and smallest channel values To-Do
        /*
        let cmin = Math.min(r, g, b),
            cmax = Math.max(r, g, b),
            delta = cmax - cmin,
            h = 0,
            s = 0,
            l = 0;
        */
    }

    function hexToRgb(hex) {
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec((hex.split("").slice(1).join("")));
        return result ? [
            parseInt(result[1], 16),
            parseInt(result[2], 16),
            parseInt(result[3], 16)
        ] : null;
    }

    function geraPaleta(colors) {
        geraPal()
        return colors.map((color, i) => ({
            blocked: color.blocked,
            hex: color.blocked ? color.hex : arrPal[i],
            hexVal: color.blocked ? color.hex : "Hex: " + arrPal[i],
            hsl: color.blocked ? color.hsl : RGBToHSL(...hexToRgb(arrPal[i])),
            hslVal: color.blocked ? color.hsl : "HSL: " + RGBToHSL(...hexToRgb(arrPal[i])),
            rgb: color.blocked ? color.rgb : hexToRgb(arrPal[i]),
            rgbVal: color.blocked ? color.rgb : "RGB: " + hexToRgb(arrPal[i]),
        }))
    }

    function geraCor() {
        return new Array(3).fill("").reduce((acc, atual) => {
            return acc + Math.floor(Math.random() * 255).toString(16).padStart(2, "0")
        }, "#")
    }

    useEffect(() => {
        const handleUpdate = (ev) => {
            if (ev.key === " ") {
                fetchColors()
                animToggle()
            }
        }
        document.addEventListener("keypress", handleUpdate)

        return () => {
            document.removeEventListener("keypress", handleUpdate)
        }
    }, [colors])

    useEffect(() => {
        fetchColors()
    }, [])

    function fetchColors() {
        let pal = geraPaleta(colors)
        setColors(pal)
        console.log(colors)
    }

    function handleColorBlock(i) {
        //Inverte o estado de bloqueio da cor no indice i
        setColors((prevColors) => {
            return prevColors.map((color, idx) => idx === i ? { ...color, blocked: !color.blocked } : color)
        })
    }

    function showedColor(element) {
        return colorType === "HEX" ? element.hexVal : colorType === "HSL" ? element.hslVal : element.rgbVal
    }

    function menu() {
        setBurgerMenu(true)
    }

    return (
        <div className={styles.window}>
            <div onClick={() => menu()} className={styles.burgerIcon}>MENU</div>
            {burgerMenu && <div>
                <div className={styles.menu}>
                    <button onClick={() => setColorType("RGB")}>RGB</button>
                    <button onClick={() => setColorType("HSL")}>HSL</button>
                    <button onClick={() => setColorType("HEX")}>HEX</button>
                </div>
                <div onClick={() => setBurgerMenu(false)} className={styles.burgerScreen}></div>
            </div>}
            <div className={styles.cartoes}>
                <div onAnimationEnd={() => setState(false)} id={styles.one}
                    className={[!state ? styles.strip : styles.animation1, styles.hover1].join(" ")}>
                    <div id={styles.top}>
                        <p className={styles.colorCode}>{showedColor(colors[0])}</p>
                        <button><img alt="lockIcon" src={!colors[0].blocked ? "/unlocked.svg" : "/locked.svg"} /></button>
                    </div>
                    <div onClick={() => handleColorBlock(0)} className={styles.colored} style={{ backgroundColor: colors[0].hex }}></div>
                </div>

                <div id={styles.two} className={[!state ? styles.strip : styles.animation2, styles.hover2].join(" ")}>
                    <div id={styles.top}>
                        <p className={styles.colorCode}>{showedColor(colors[1])}</p>
                        <button><img alt="lockIcon" src={!colors[1].blocked ? "/unlocked.svg" : "/locked.svg"} /></button>
                    </div>
                    <div onClick={() => handleColorBlock(1)} className={styles.colored} style={{ backgroundColor: colors[1].hex }}></div>
                </div>
                <div id={styles.three} className={[!state ? styles.strip : styles.animation3, styles.hover3].join(" ")}>
                    <div id={styles.top}>
                        <p className={styles.colorCode}>{showedColor(colors[2])}</p>
                        <button><img alt="lockIcon" src={!colors[2].blocked ? "/unlocked.svg" : "/locked.svg"} /></button>
                    </div>
                    <div onClick={() => handleColorBlock(2)} className={styles.colored} style={{ backgroundColor: colors[2].hex }}></div>
                </div>
                <div id={styles.four} className={[!state ? styles.strip : styles.animation4, styles.hover4].join(" ")}>
                    <div id={styles.top}>
                        <p className={styles.colorCode}>{showedColor(colors[3])}</p>
                        <button><img alt="lockIcon" src={!colors[3].blocked ? "/unlocked.svg" : "/locked.svg"} /></button>
                    </div>
                    <div onClick={() => handleColorBlock(3)} className={styles.colored} style={{ backgroundColor: colors[3].hex }}></div>
                </div>
                <div id={styles.five} className={[!state ? styles.strip : styles.animation5, styles.hover5].join(" ")}>
                    <div id={styles.top}>
                        <p className={styles.colorCode}>{showedColor(colors[4])}</p>
                        <button><img alt="lockIcon" src={!colors[4].blocked ? "/unlocked.svg" : "/locked.svg"} /></button>
                    </div>
                    <div onClick={() => handleColorBlock(4)} className={styles.colored} style={{ backgroundColor: colors[4].hex }}></div>
                </div>
            </div>
        </div>
    );
}

export default Palette;