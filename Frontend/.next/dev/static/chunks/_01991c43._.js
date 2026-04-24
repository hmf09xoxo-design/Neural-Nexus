(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/lib/utils.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "cn",
    ()=>cn
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/clsx/dist/clsx.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/tailwind-merge/dist/bundle-mjs.mjs [app-client] (ecmascript)");
;
;
function cn(...inputs) {
    return (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$tailwind$2d$merge$2f$dist$2f$bundle$2d$mjs$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["twMerge"])((0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$clsx$2f$dist$2f$clsx$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["clsx"])(inputs));
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/ui/input.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Input",
    ()=>Input
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/utils.ts [app-client] (ecmascript)");
;
;
function Input({ className, type, ...props }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
        type: type,
        "data-slot": "input",
        className: (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$utils$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["cn"])('file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm', 'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]', 'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive', className),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/input.tsx",
        lineNumber: 7,
        columnNumber: 5
    }, this);
}
_c = Input;
;
var _c;
__turbopack_context__.k.register(_c, "Input");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/scramble-text.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ScrambleText",
    ()=>ScrambleText,
    "ScrambleTextOnHover",
    ()=>ScrambleTextOnHover
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
"use client";
;
;
const GLYPHS = "!@#$%^&*()_+-=<>?/\\[]{}Xx";
/**
 * Run the scramble animation on text
 */ function runScrambleAnimation(text, duration, setDisplayText, onComplete) {
    const lockedIndices = new Set();
    const finalChars = text.split("");
    const totalChars = finalChars.length;
    const scrambleObj = {
        progress: 0
    };
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].to(scrambleObj, {
        progress: 1,
        duration,
        ease: "power2.out",
        onUpdate: ()=>{
            const numLocked = Math.floor(scrambleObj.progress * totalChars);
            for(let i = 0; i < numLocked; i++){
                lockedIndices.add(i);
            }
            const newDisplay = finalChars.map((char, i)=>{
                if (lockedIndices.has(i)) return char;
                return GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
            }).join("");
            setDisplayText(newDisplay);
        },
        onComplete: ()=>{
            setDisplayText(text);
            onComplete?.();
        }
    });
}
function ScrambleText({ text, className, delayMs = 0, duration = 0.9 }) {
    _s();
    // Initialize with text to avoid flash of empty content
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(text);
    const [hasAnimated, setHasAnimated] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const timeoutRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    // Run animation only once on initial mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            if (hasAnimated || !text) return;
            // Start with scrambled text
            const scrambledStart = text.split("").map({
                "ScrambleText.useEffect.scrambledStart": ()=>GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }["ScrambleText.useEffect.scrambledStart"]).join("");
            setDisplayText(scrambledStart);
            timeoutRef.current = setTimeout({
                "ScrambleText.useEffect": ()=>{
                    animationRef.current = runScrambleAnimation(text, duration, setDisplayText, {
                        "ScrambleText.useEffect": ()=>{
                            setHasAnimated(true);
                        }
                    }["ScrambleText.useEffect"]);
                }
            }["ScrambleText.useEffect"], delayMs);
            return ({
                "ScrambleText.useEffect": ()=>{
                    if (timeoutRef.current) clearTimeout(timeoutRef.current);
                    if (animationRef.current) animationRef.current.kill();
                }
            })["ScrambleText.useEffect"];
        }
    }["ScrambleText.useEffect"], []); // Empty deps - only run on mount
    // Handle text prop changes after initial animation
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleText.useEffect": ()=>{
            if (hasAnimated && displayText !== text) {
                setDisplayText(text);
            }
        }
    }["ScrambleText.useEffect"], [
        text,
        hasAnimated,
        displayText
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        ref: containerRef,
        className: className,
        children: displayText || text
    }, void 0, false, {
        fileName: "[project]/components/scramble-text.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_s(ScrambleText, "nZCzxpENfzBvQhzogU2hUni4Atg=");
_c = ScrambleText;
function ScrambleTextOnHover({ text, className, duration = 0.4, as: Component = "span", onClick }) {
    _s1();
    const [displayText, setDisplayText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(text);
    const isAnimating = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    const tweenRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const handleMouseEnter = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ScrambleTextOnHover.useCallback[handleMouseEnter]": ()=>{
            if (isAnimating.current) return;
            isAnimating.current = true;
            // Kill any existing animation
            if (tweenRef.current) {
                tweenRef.current.kill();
            }
            // Start with scrambled
            const scrambledStart = text.split("").map({
                "ScrambleTextOnHover.useCallback[handleMouseEnter].scrambledStart": ()=>GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
            }["ScrambleTextOnHover.useCallback[handleMouseEnter].scrambledStart"]).join("");
            setDisplayText(scrambledStart);
            tweenRef.current = runScrambleAnimation(text, duration, setDisplayText, {
                "ScrambleTextOnHover.useCallback[handleMouseEnter]": ()=>{
                    isAnimating.current = false;
                }
            }["ScrambleTextOnHover.useCallback[handleMouseEnter]"]);
        }
    }["ScrambleTextOnHover.useCallback[handleMouseEnter]"], [
        text,
        duration
    ]);
    // Update display text if text prop changes
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ScrambleTextOnHover.useEffect": ()=>{
            if (!isAnimating.current) {
                setDisplayText(text);
            }
        }
    }["ScrambleTextOnHover.useEffect"], [
        text
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        className: className,
        onMouseEnter: handleMouseEnter,
        onClick: onClick,
        children: displayText
    }, void 0, false, {
        fileName: "[project]/components/scramble-text.tsx",
        lineNumber: 160,
        columnNumber: 5
    }, this);
}
_s1(ScrambleTextOnHover, "jd/jbpNp0/lekfW1SUvHfIvacW4=");
_c1 = ScrambleTextOnHover;
var _c, _c1;
__turbopack_context__.k.register(_c, "ScrambleText");
__turbopack_context__.k.register(_c1, "ScrambleTextOnHover");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/bitmap-chevron.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BitmapChevron",
    ()=>BitmapChevron
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function BitmapChevron({ className }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("svg", {
        width: "18",
        height: "18",
        viewBox: "0 0 27 27",
        fill: "none",
        xmlns: "http://www.w3.org/2000/svg",
        className: className,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("path", {
            d: "M3.85715 3.85715H19.2857L23.0553 7.64066L17.5163 13.1595L22.8462 17.5055V23.1429H17.5055V13.1703L7.65696 22.9832L3.8874 19.2L13.9259 9.19781H3.85715V3.85715Z",
            fill: "currentColor"
        }, void 0, false, {
            fileName: "[project]/components/bitmap-chevron.tsx",
            lineNumber: 11,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/bitmap-chevron.tsx",
        lineNumber: 3,
        columnNumber: 5
    }, this);
}
_c = BitmapChevron;
var _c;
__turbopack_context__.k.register(_c, "BitmapChevron");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/animated-noise.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnimatedNoise",
    ()=>AnimatedNoise
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function AnimatedNoise({ opacity = 0.05, className }) {
    _s();
    const canvasRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnimatedNoise.useEffect": ()=>{
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext("2d");
            if (!ctx) return;
            let animationId;
            let frame = 0;
            const resize = {
                "AnimatedNoise.useEffect.resize": ()=>{
                    canvas.width = canvas.offsetWidth / 2;
                    canvas.height = canvas.offsetHeight / 2;
                }
            }["AnimatedNoise.useEffect.resize"];
            const generateNoise = {
                "AnimatedNoise.useEffect.generateNoise": ()=>{
                    const imageData = ctx.createImageData(canvas.width, canvas.height);
                    const data = imageData.data;
                    for(let i = 0; i < data.length; i += 4){
                        const value = Math.random() * 255;
                        data[i] = value; // R
                        data[i + 1] = value; // G
                        data[i + 2] = value; // B
                        data[i + 3] = 255; // A
                    }
                    ctx.putImageData(imageData, 0, 0);
                }
            }["AnimatedNoise.useEffect.generateNoise"];
            const animate = {
                "AnimatedNoise.useEffect.animate": ()=>{
                    frame++;
                    // Update noise every 2 frames for performance while still looking animated
                    if (frame % 2 === 0) {
                        generateNoise();
                    }
                    animationId = requestAnimationFrame(animate);
                }
            }["AnimatedNoise.useEffect.animate"];
            resize();
            window.addEventListener("resize", resize);
            animate();
            return ({
                "AnimatedNoise.useEffect": ()=>{
                    window.removeEventListener("resize", resize);
                    cancelAnimationFrame(animationId);
                }
            })["AnimatedNoise.useEffect"];
        }
    }["AnimatedNoise.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: canvasRef,
        className: className,
        style: {
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            pointerEvents: "none",
            opacity,
            mixBlendMode: "overlay"
        }
    }, void 0, false, {
        fileName: "[project]/components/animated-noise.tsx",
        lineNumber: 63,
        columnNumber: 5
    }, this);
}
_s(AnimatedNoise, "UJgi7ynoup7eqypjnwyX/s32POg=");
_c = AnimatedNoise;
var _c;
__turbopack_context__.k.register(_c, "AnimatedNoise");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AnalysisCharts.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ThreatVisualization",
    ()=>ThreatVisualization
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/PieChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/polar/Pie.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Cell.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/chart/BarChart.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/Bar.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/XAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/cartesian/YAxis.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/Tooltip.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/recharts/es6/component/ResponsiveContainer.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
// ─── Color constants (hex only — CSS vars don't work inside SVG fills) ────────
const C_ORANGE = "#e87500";
const C_RED = "#ef4444";
const C_GREEN = "#22c55e";
const C_DIM = "rgba(255,255,255,0.05)";
const C_TRACK = "rgba(255,255,255,0.08)";
function scoreColor(s) {
    if (s < 0.3) return C_GREEN;
    if (s <= 0.7) return C_ORANGE;
    return C_RED;
}
function extract(d) {
    const fr = d.fraud_report;
    const riskScore = typeof d.risk_score === "number" ? d.risk_score : typeof d.phishing_probability === "number" ? d.phishing_probability : typeof fr?.risk_score === "number" ? fr.risk_score : null;
    const confidence = typeof d.confidence === "number" ? d.confidence : typeof d.llm_confidence === "number" ? d.llm_confidence : typeof d.prediction?.confidence === "number" ? d.prediction.confidence : typeof d.voice_analysis?.confidence === "number" ? d.voice_analysis.confidence : null;
    const predLabel = d.prediction?.label ?? d.voice_analysis?.result ?? null;
    const fraudType = typeof d.fraud_type === "string" ? d.fraud_type : typeof d.final_verdict === "string" ? d.final_verdict : null;
    const flags = [
        ...Array.isArray(d.flags) ? d.flags : [],
        ...Array.isArray(fr?.red_flags) ? fr.red_flags : []
    ];
    const subScores = [
        {
            key: "NLP",
            val: d.nlp_score
        },
        {
            key: "Similarity",
            val: d.similarity_score
        },
        {
            key: "Stylometry",
            val: d.stylometry_score
        },
        {
            key: "URL Risk",
            val: d.url_risk_score
        },
        {
            key: "Urgency",
            val: d.urgency_score
        }
    ].filter((s)=>typeof s.val === "number");
    return {
        riskScore,
        confidence,
        predLabel,
        fraudType,
        flags,
        subScores
    };
}
// ─── Risk donut ───────────────────────────────────────────────────────────────
function RiskDonut({ score }) {
    const color = scoreColor(score);
    const pct = Math.round(score * 100);
    const pieData = [
        {
            value: score
        },
        {
            value: Math.max(0, 1 - score)
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative flex-shrink-0",
        style: {
            width: 156,
            height: 156
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$PieChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PieChart"], {
                width: 156,
                height: 156,
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$polar$2f$Pie$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Pie"], {
                    data: pieData,
                    cx: 73,
                    cy: 73,
                    innerRadius: 50,
                    outerRadius: 66,
                    startAngle: 90,
                    endAngle: -270,
                    dataKey: "value",
                    strokeWidth: 0,
                    isAnimationActive: true,
                    animationBegin: 80,
                    animationDuration: 1100,
                    animationEasing: "ease-out",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: color
                        }, void 0, false, {
                            fileName: "[project]/components/AnalysisCharts.tsx",
                            lineNumber: 106,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: C_DIM
                        }, void 0, false, {
                            fileName: "[project]/components/AnalysisCharts.tsx",
                            lineNumber: 107,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 91,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 90,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute inset-0 flex flex-col items-center justify-center pointer-events-none",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-[var(--font-bebas)] text-4xl leading-none",
                        style: {
                            color
                        },
                        children: pct
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 113,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[7px] uppercase tracking-[0.25em] mt-0.5",
                        style: {
                            color: "rgba(255,255,255,0.35)"
                        },
                        children: "risk%"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 119,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 112,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 89,
        columnNumber: 5
    }, this);
}
_c = RiskDonut;
// ─── Confidence bar ───────────────────────────────────────────────────────────
function ConfidenceBar({ confidence }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2.5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] uppercase tracking-[0.3em]",
                        style: {
                            color: "rgba(255,255,255,0.45)"
                        },
                        children: "Model Confidence"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 135,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[11px]",
                        style: {
                            color: "rgba(255,255,255,0.9)"
                        },
                        children: [
                            Math.round(confidence * 100),
                            "%"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 139,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 134,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-px relative overflow-hidden",
                style: {
                    background: C_TRACK
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    className: "absolute inset-y-0 left-0",
                    style: {
                        background: `linear-gradient(to right, ${C_ORANGE}, rgba(232,117,0,0.35))`
                    },
                    initial: {
                        width: 0
                    },
                    animate: {
                        width: `${confidence * 100}%`
                    },
                    transition: {
                        duration: 1.1,
                        ease: "easeOut",
                        delay: 0.25
                    }
                }, void 0, false, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 145,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 144,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 133,
        columnNumber: 5
    }, this);
}
_c1 = ConfidenceBar;
// ─── Score breakdown ──────────────────────────────────────────────────────────
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const BreakdownTooltip = ({ active, payload })=>{
    if (!active || !payload?.length) return null;
    const item = payload[0];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border px-3 py-2 font-mono text-[10px]",
        style: {
            background: "#0a0a0a",
            borderColor: "rgba(255,255,255,0.15)",
            color: "rgba(255,255,255,0.85)"
        },
        children: [
            item.payload.name,
            "  ",
            (item.value * 100).toFixed(0),
            "%"
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 164,
        columnNumber: 5
    }, ("TURBOPACK compile-time value", void 0));
};
_c2 = BreakdownTooltip;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const ValueLabel = ({ x, y, width, value, height })=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("text", {
        x: x + width + 7,
        y: y + height / 2,
        dominantBaseline: "middle",
        fill: "rgba(255,255,255,0.65)",
        fontSize: 9,
        fontFamily: "IBM Plex Mono, monospace",
        children: (value * 100).toFixed(0)
    }, void 0, false, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 179,
        columnNumber: 3
    }, ("TURBOPACK compile-time value", void 0));
_c3 = ValueLabel;
function ScoreBreakdown({ scores }) {
    const data = scores.map((s)=>({
            name: s.key,
            value: s.val
        }));
    const h = scores.length * 32 + 12;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$ResponsiveContainer$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResponsiveContainer"], {
        width: "100%",
        height: h,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$chart$2f$BarChart$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BarChart"], {
            data: data,
            layout: "vertical",
            margin: {
                top: 0,
                right: 44,
                left: 0,
                bottom: 0
            },
            barSize: 7,
            barCategoryGap: 14,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$XAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["XAxis"], {
                    type: "number",
                    domain: [
                        0,
                        1
                    ],
                    hide: true
                }, void 0, false, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 204,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$YAxis$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["YAxis"], {
                    type: "category",
                    dataKey: "name",
                    width: 76,
                    axisLine: false,
                    tickLine: false,
                    tick: {
                        fill: "rgba(255,255,255,0.5)",
                        fontSize: 8,
                        fontFamily: "IBM Plex Mono, monospace",
                        letterSpacing: "0.08em"
                    },
                    tickFormatter: (v)=>v.toUpperCase()
                }, void 0, false, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 205,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Tooltip$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Tooltip"], {
                    content: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(BreakdownTooltip, {}, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 220,
                        columnNumber: 20
                    }, void 0),
                    cursor: {
                        fill: "rgba(255,255,255,0.025)"
                    }
                }, void 0, false, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 219,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$cartesian$2f$Bar$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Bar"], {
                    dataKey: "value",
                    background: {
                        fill: C_TRACK,
                        radius: 0
                    },
                    radius: 0,
                    isAnimationActive: true,
                    animationBegin: 150,
                    animationDuration: 900,
                    animationEasing: "ease-out",
                    label: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ValueLabel, {}, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 231,
                        columnNumber: 18
                    }, void 0),
                    children: data.map((item, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$recharts$2f$es6$2f$component$2f$Cell$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Cell"], {
                            fill: `rgba(232,117,0,${0.45 + item.value * 0.55})`
                        }, i, false, {
                            fileName: "[project]/components/AnalysisCharts.tsx",
                            lineNumber: 234,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 223,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/components/AnalysisCharts.tsx",
            lineNumber: 197,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 196,
        columnNumber: 5
    }, this);
}
_c4 = ScoreBreakdown;
// ─── Prediction block ─────────────────────────────────────────────────────────
const SAFE = new Set([
    "safe",
    "clean",
    "ham",
    "real (bonafide)"
]);
function PredictionBlock({ label, type }) {
    const raw = label ?? type;
    if (!raw) return null;
    const isSafe = SAFE.has(raw.toLowerCase());
    const color = isSafe ? C_GREEN : C_ORANGE;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border px-4 py-3",
        style: {
            borderColor: `${color}22`
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[8px] uppercase tracking-[0.3em] mb-1.5",
                style: {
                    color: "rgba(255,255,255,0.4)"
                },
                children: "Classification"
            }, void 0, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 258,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-[var(--font-bebas)] text-[2.25rem] leading-none tracking-tight",
                style: {
                    color
                },
                children: raw.toUpperCase()
            }, void 0, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 262,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 257,
        columnNumber: 5
    }, this);
}
_c5 = PredictionBlock;
// ─── Flag tags ─────────────────────────────────────────────────────────────────
function FlagTags({ flags }) {
    if (!flags.length) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
            className: "font-mono text-[9px] uppercase tracking-[0.15em]",
            style: {
                color: "rgba(255,255,255,0.28)"
            },
            children: "No active threat indicators"
        }, void 0, false, {
            fileName: "[project]/components/AnalysisCharts.tsx",
            lineNumber: 275,
            columnNumber: 7
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex flex-wrap gap-2",
        children: flags.map((f, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                initial: {
                    opacity: 0,
                    scale: 0.88
                },
                animate: {
                    opacity: 1,
                    scale: 1
                },
                transition: {
                    delay: i * 0.04,
                    duration: 0.22
                },
                className: "font-mono text-[9px] uppercase tracking-[0.12em] px-2.5 py-1",
                style: {
                    border: "1px solid rgba(232,117,0,0.38)",
                    color: "rgba(232,117,0,0.9)",
                    background: "rgba(232,117,0,0.07)"
                },
                children: f.replace(/_/g, " ")
            }, i, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 284,
                columnNumber: 9
            }, this))
    }, void 0, false, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 282,
        columnNumber: 5
    }, this);
}
_c6 = FlagTags;
// ─── Section divider ──────────────────────────────────────────────────────────
function PanelDivider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            borderTop: "1px solid rgba(255,255,255,0.07)"
        }
    }, void 0, false, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 306,
        columnNumber: 10
    }, this);
}
_c7 = PanelDivider;
function ThreatVisualization({ data }) {
    _s();
    const d = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ThreatVisualization.useMemo[d]": ()=>extract(data)
    }["ThreatVisualization.useMemo[d]"], [
        data
    ]);
    const hasChartData = d.riskScore !== null || d.confidence !== null || d.predLabel !== null || d.fraudType !== null;
    if (!hasChartData && !d.subScores.length && !d.flags.length) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 18
        },
        animate: {
            opacity: 1,
            y: 0
        },
        transition: {
            duration: 0.52,
            ease: [
                0.16,
                1,
                0.3,
                1
            ]
        },
        className: "mt-5 overflow-hidden",
        style: {
            border: "1px solid rgba(255,255,255,0.1)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-3",
                style: {
                    borderBottom: "1px solid rgba(255,255,255,0.07)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px] uppercase tracking-[0.45em]",
                        style: {
                            color: "rgba(255,255,255,0.5)"
                        },
                        children: "Threat Visualization"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 329,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] uppercase tracking-[0.2em]",
                        style: {
                            color: "rgba(232,117,0,0.6)"
                        },
                        children: "Claude Intelligence Layer"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 333,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 325,
                columnNumber: 7
            }, this),
            (d.riskScore !== null || d.confidence !== null || d.predLabel || d.fraudType) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex flex-col sm:flex-row",
                    style: {
                        borderBottom: "1px solid rgba(255,255,255,0.07)"
                    },
                    children: [
                        d.riskScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center justify-center px-6 py-6 shrink-0",
                            style: {
                                borderRight: "1px solid rgba(255,255,255,0.07)"
                            },
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(RiskDonut, {
                                score: d.riskScore
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisCharts.tsx",
                                lineNumber: 350,
                                columnNumber: 17
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/AnalysisCharts.tsx",
                            lineNumber: 346,
                            columnNumber: 15
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex-1 px-5 py-6 flex flex-col gap-5 justify-center",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PredictionBlock, {
                                    label: d.predLabel,
                                    type: d.fraudType
                                }, void 0, false, {
                                    fileName: "[project]/components/AnalysisCharts.tsx",
                                    lineNumber: 355,
                                    columnNumber: 15
                                }, this),
                                d.confidence !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ConfidenceBar, {
                                    confidence: d.confidence
                                }, void 0, false, {
                                    fileName: "[project]/components/AnalysisCharts.tsx",
                                    lineNumber: 356,
                                    columnNumber: 41
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/AnalysisCharts.tsx",
                            lineNumber: 354,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/AnalysisCharts.tsx",
                    lineNumber: 342,
                    columnNumber: 11
                }, this)
            }, void 0, false),
            d.subScores.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PanelDivider, {}, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 365,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 pt-5 pb-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[8px] uppercase tracking-[0.4em] mb-4",
                                style: {
                                    color: "rgba(255,255,255,0.38)"
                                },
                                children: "Score Breakdown"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisCharts.tsx",
                                lineNumber: 367,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScoreBreakdown, {
                                scores: d.subScores
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisCharts.tsx",
                                lineNumber: 371,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 366,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PanelDivider, {}, void 0, false, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 377,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[8px] uppercase tracking-[0.4em] mb-3",
                        style: {
                            color: "rgba(255,255,255,0.38)"
                        },
                        children: [
                            "Active Signals [",
                            d.flags.length,
                            "]"
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 379,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlagTags, {
                        flags: d.flags
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisCharts.tsx",
                        lineNumber: 383,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisCharts.tsx",
                lineNumber: 378,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisCharts.tsx",
        lineNumber: 317,
        columnNumber: 5
    }, this);
}
_s(ThreatVisualization, "6jtW9PSiFFOA1HhdUp8u9ZaU0cA=");
_c8 = ThreatVisualization;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8;
__turbopack_context__.k.register(_c, "RiskDonut");
__turbopack_context__.k.register(_c1, "ConfidenceBar");
__turbopack_context__.k.register(_c2, "BreakdownTooltip");
__turbopack_context__.k.register(_c3, "ValueLabel");
__turbopack_context__.k.register(_c4, "ScoreBreakdown");
__turbopack_context__.k.register(_c5, "PredictionBlock");
__turbopack_context__.k.register(_c6, "FlagTags");
__turbopack_context__.k.register(_c7, "PanelDivider");
__turbopack_context__.k.register(_c8, "ThreatVisualization");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/sms.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeSms",
    ()=>analyzeSms
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080";
async function analyzeSms(data) {
    const res = await fetch(`${BASE_URL}/text/sms/analyze`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/email.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeEmail",
    ()=>analyzeEmail
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080";
async function analyzeEmail(data) {
    const res = await fetch(`${BASE_URL}/text/email/analyze/extension`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/url.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeUrl",
    ()=>analyzeUrl
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080";
async function analyzeUrl(data) {
    const res = await fetch(`${BASE_URL}/url/analyze`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(data)
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/voice.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeVoice",
    ()=>analyzeVoice
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080";
async function analyzeVoice(file) {
    const form = new FormData();
    form.append("file", file);
    const res = await fetch(`${BASE_URL}/voice/analyse`, {
        method: "POST",
        credentials: "include",
        body: form
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/lib/api/attachment.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "analyzeAttachment",
    ()=>analyzeAttachment
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
const BASE_URL = ("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080";
async function analyzeAttachment(file, withLlmExplanation = false) {
    const form = new FormData();
    form.append("file", file);
    form.append("with_llm_explanation", withLlmExplanation ? "true" : "false");
    const res = await fetch(`${BASE_URL}/attachment/analyze`, {
        method: "POST",
        credentials: "include",
        body: form
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/AnalysisResult.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "AnalysisResult",
    ()=>AnalysisResult
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
function deriveLevel(score, provided) {
    if (provided) {
        const u = provided.toUpperCase();
        if (u === "LOW" || u === "MEDIUM" || u === "HIGH") return u;
    }
    if (score === null) return null;
    if (score < 0.3) return "LOW";
    if (score <= 0.7) return "MEDIUM";
    return "HIGH";
}
function normalize(r) {
    const riskScore = typeof r.risk_score === "number" ? r.risk_score : typeof r.fraud_report?.risk_score === "number" ? r.fraud_report.risk_score : typeof r.phishing_probability === "number" ? r.phishing_probability : null;
    const confidence = typeof r.confidence === "number" ? r.confidence : typeof r.llm_confidence === "number" ? r.llm_confidence : null;
    const fraudType = typeof r.fraud_type === "string" ? r.fraud_type : typeof r.final_verdict === "string" ? r.final_verdict : typeof r.fraud_report?.is_fraud === "boolean" ? r.fraud_report.is_fraud ? "fraud" : "clean" : null;
    const predLabel = r.prediction?.label ?? r.voice_analysis?.result ?? null;
    const predConfidence = typeof r.prediction?.confidence === "number" ? r.prediction.confidence : typeof r.voice_analysis?.confidence === "number" ? r.voice_analysis.confidence : null;
    const flags = [
        ...Array.isArray(r.flags) ? r.flags : [],
        ...Array.isArray(r.fraud_report?.red_flags) ? r.fraud_report.red_flags : []
    ];
    const explanation = typeof r.llm_explanation === "string" && r.llm_explanation.trim() ? r.llm_explanation.trim() : typeof r.explanation === "string" && r.explanation.trim() ? r.explanation.trim() : typeof r.fraud_report?.system_logic === "string" && r.fraud_report.system_logic.trim() ? r.fraud_report.system_logic.trim() : null;
    const riskLevel = deriveLevel(riskScore, r.risk_level);
    const nlpScore = typeof r.nlp_score === "number" ? r.nlp_score : null;
    const simScore = typeof r.similarity_score === "number" ? r.similarity_score : null;
    const styloScore = typeof r.stylometry_score === "number" ? r.stylometry_score : null;
    const urlRisk = typeof r.url_risk_score === "number" ? r.url_risk_score : null;
    const urgency = typeof r.urgency_score === "number" ? r.urgency_score : null;
    const hasAdvanced = [
        nlpScore,
        simScore,
        styloScore,
        urlRisk,
        urgency
    ].some((v)=>v !== null);
    const reqId = typeof r.request_id === "string" ? r.request_id : null;
    const SAFE_LABELS = new Set([
        "safe",
        "clean",
        "ham",
        "real (bonafide)"
    ]);
    const isThreat = !!fraudType && !SAFE_LABELS.has(fraudType.toLowerCase());
    const isPredThreat = !!predLabel && !SAFE_LABELS.has(predLabel.toLowerCase());
    return {
        riskScore,
        riskLevel,
        confidence,
        fraudType,
        predLabel,
        predConfidence,
        flags,
        explanation,
        nlpScore,
        simScore,
        styloScore,
        urlRisk,
        urgency,
        hasAdvanced,
        reqId,
        isThreat,
        isPredThreat
    };
}
// ─── Formatters ──────────────────────────────────────────────────────────────
const pct = (n)=>n === null ? "—" : `${(n * 100).toFixed(0)}%`;
const f2 = (n)=>n === null ? "—" : n.toFixed(2);
// ─── Risk visual tokens ──────────────────────────────────────────────────────
const RISK_TEXT = {
    LOW: "text-foreground/70",
    MEDIUM: "text-accent",
    HIGH: "text-destructive"
};
const RISK_BORDER = {
    LOW: "border-border/35",
    MEDIUM: "border-accent/45",
    HIGH: "border-destructive/55"
};
const RISK_BAR = {
    LOW: "bg-foreground/40",
    MEDIUM: "bg-accent/75",
    HIGH: "bg-destructive/85"
};
const RISK_FLAG_BORDER = {
    LOW: "border-border/30",
    MEDIUM: "border-accent/35",
    HIGH: "border-destructive/45"
};
// ─── Internal atoms ──────────────────────────────────────────────────────────
function Divider() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "border-b border-border/15"
    }, void 0, false, {
        fileName: "[project]/components/AnalysisResult.tsx",
        lineNumber: 181,
        columnNumber: 10
    }, this);
}
_c = Divider;
function SectionLabel({ children }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
        className: "font-mono text-[9px] uppercase tracking-[0.45em] text-muted-foreground/55 mb-4",
        children: children
    }, void 0, false, {
        fileName: "[project]/components/AnalysisResult.tsx",
        lineNumber: 186,
        columnNumber: 5
    }, this);
}
_c1 = SectionLabel;
function CoreMetric({ label, value, accent = false }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-[8px] uppercase tracking-[0.35em] text-muted-foreground/50 mb-1.5",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 195,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: `font-mono text-sm tracking-[0.03em] ${accent ? "text-accent" : "text-foreground/90"}`,
                children: value
            }, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisResult.tsx",
        lineNumber: 194,
        columnNumber: 5
    }, this);
}
_c2 = CoreMetric;
function TinySignal({ label, value }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "flex items-baseline gap-1.5",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-[8px] uppercase tracking-[0.25em] text-muted-foreground/40",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 208,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "font-mono text-[10px] text-muted-foreground/60",
                children: value
            }, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisResult.tsx",
        lineNumber: 207,
        columnNumber: 5
    }, this);
}
_c3 = TinySignal;
function AnalysisResult({ data }) {
    _s();
    const rootRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const d = normalize(data);
    // Smooth entrance — no library required
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "AnalysisResult.useEffect": ()=>{
            const el = rootRef.current;
            if (!el) return;
            el.style.opacity = "0";
            el.style.transform = "translateY(10px)";
            const raf = requestAnimationFrame({
                "AnalysisResult.useEffect.raf": ()=>{
                    el.style.transition = "opacity 0.55s cubic-bezier(0.16,1,0.3,1), transform 0.55s cubic-bezier(0.16,1,0.3,1)";
                    el.style.opacity = "1";
                    el.style.transform = "translateY(0)";
                }
            }["AnalysisResult.useEffect.raf"]);
            return ({
                "AnalysisResult.useEffect": ()=>cancelAnimationFrame(raf)
            })["AnalysisResult.useEffect"];
        }
    }["AnalysisResult.useEffect"], []);
    const riskText = d.riskLevel ? RISK_TEXT[d.riskLevel] : "text-foreground/50";
    const riskBorder = d.riskLevel ? RISK_BORDER[d.riskLevel] : "border-border/25";
    const riskBar = d.riskLevel ? RISK_BAR[d.riskLevel] : "bg-foreground/30";
    const riskFlagBorder = d.riskLevel ? RISK_FLAG_BORDER[d.riskLevel] : "border-border/30";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        ref: rootRef,
        className: `border ${riskBorder} mt-8`,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-3",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[9px] uppercase tracking-[0.45em] text-muted-foreground/55",
                        children: "Threat Assessment"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this),
                    d.reqId && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] text-muted-foreground/35 tracking-[0.15em]",
                        children: d.reqId.slice(0, 8).toUpperCase()
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 251,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 246,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 256,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 pt-8 pb-5",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                        children: "Risk Level"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 260,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-end gap-3",
                        children: [
                            d.riskLevel === "HIGH" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block w-1.5 h-1.5 bg-destructive self-center shrink-0 animate-pulse mb-1"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 263,
                                columnNumber: 13
                            }, this),
                            d.riskLevel === "MEDIUM" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "inline-block w-1.5 h-1.5 bg-accent self-center shrink-0 mb-1"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 266,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-[var(--font-bebas)] text-6xl md:text-7xl leading-none tracking-tight ${riskText}`,
                                children: d.riskLevel ?? "UNKNOWN"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 268,
                                columnNumber: 11
                            }, this),
                            d.riskScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] text-muted-foreground/50 mb-1.5 tracking-[0.1em]",
                                children: [
                                    pct(d.riskScore),
                                    " raw"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 274,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 261,
                        columnNumber: 9
                    }, this),
                    d.riskScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mt-5 h-px bg-border/20 relative overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: `absolute inset-y-0 left-0 ${riskBar} transition-all duration-700 ease-out`,
                            style: {
                                width: `${(d.riskScore * 100).toFixed(0)}%`
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/AnalysisResult.tsx",
                            lineNumber: 283,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 282,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 259,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                        children: "Core Metrics"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-5",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreMetric, {
                                label: "Risk Score",
                                value: pct(d.riskScore)
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 296,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreMetric, {
                                label: "Confidence",
                                value: pct(d.confidence)
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 297,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreMetric, {
                                label: "Prediction",
                                value: d.predLabel ? d.predLabel.toUpperCase() : "—",
                                accent: d.isPredThreat
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 298,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CoreMetric, {
                                label: "Fraud Type",
                                value: d.fraudType ? d.fraudType.toUpperCase() : "—",
                                accent: d.isThreat
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 303,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 295,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 293,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 310,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                        children: d.flags.length > 0 ? `Active Signals [${d.flags.length}]` : "Active Signals"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 314,
                        columnNumber: 9
                    }, this),
                    d.flags.length > 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-wrap gap-2",
                        children: d.flags.map((flag, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: `font-mono text-[9px] uppercase tracking-[0.15em] border ${riskFlagBorder} px-2.5 py-1 text-muted-foreground/70`,
                                children: flag.replace(/_/g, " ")
                            }, i, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 320,
                                columnNumber: 15
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 318,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "font-mono text-[10px] text-muted-foreground/45 tracking-[0.1em]",
                        children: "No active threat indicators"
                    }, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 329,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/AnalysisResult.tsx",
                lineNumber: 313,
                columnNumber: 7
            }, this),
            d.explanation && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 338,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-6",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                children: "Analysis Report //"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 340,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[11px] text-muted-foreground/75 leading-relaxed max-w-prose",
                                children: d.explanation
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 341,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 339,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true),
            d.hasAdvanced && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Divider, {}, void 0, false, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 351,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionLabel, {
                                children: "Extended Telemetry"
                            }, void 0, false, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 353,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-wrap gap-x-6 gap-y-2",
                                children: [
                                    d.nlpScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TinySignal, {
                                        label: "NLP",
                                        value: f2(d.nlpScore)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnalysisResult.tsx",
                                        lineNumber: 355,
                                        columnNumber: 41
                                    }, this),
                                    d.simScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TinySignal, {
                                        label: "Similarity",
                                        value: f2(d.simScore)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnalysisResult.tsx",
                                        lineNumber: 356,
                                        columnNumber: 41
                                    }, this),
                                    d.styloScore !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TinySignal, {
                                        label: "Stylometry",
                                        value: f2(d.styloScore)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnalysisResult.tsx",
                                        lineNumber: 357,
                                        columnNumber: 41
                                    }, this),
                                    d.urlRisk !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TinySignal, {
                                        label: "URL Risk",
                                        value: f2(d.urlRisk)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnalysisResult.tsx",
                                        lineNumber: 358,
                                        columnNumber: 41
                                    }, this),
                                    d.urgency !== null && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(TinySignal, {
                                        label: "Urgency",
                                        value: f2(d.urgency)
                                    }, void 0, false, {
                                        fileName: "[project]/components/AnalysisResult.tsx",
                                        lineNumber: 359,
                                        columnNumber: 41
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/AnalysisResult.tsx",
                                lineNumber: 354,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/AnalysisResult.tsx",
                        lineNumber: 352,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/components/AnalysisResult.tsx",
        lineNumber: 243,
        columnNumber: 5
    }, this);
}
_s(AnalysisResult, "Bbi/gSzGuaeygbnzN31K04tsrQ0=");
_c4 = AnalysisResult;
var _c, _c1, _c2, _c3, _c4;
__turbopack_context__.k.register(_c, "Divider");
__turbopack_context__.k.register(_c1, "SectionLabel");
__turbopack_context__.k.register(_c2, "CoreMetric");
__turbopack_context__.k.register(_c3, "TinySignal");
__turbopack_context__.k.register(_c4, "AnalysisResult");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/dashboard/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$build$2f$polyfills$2f$process$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = /*#__PURE__*/ __turbopack_context__.i("[project]/node_modules/next/dist/build/polyfills/process.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/app-dir/link.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/input.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scramble$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/scramble-text.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$bitmap$2d$chevron$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/bitmap-chevron.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animated$2d$noise$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/animated-noise.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AnalysisCharts.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__ = __turbopack_context__.i("[project]/node_modules/gsap/index.js [app-client] (ecmascript) <locals>");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$sms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/sms.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$email$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/email.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/url.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/voice.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$attachment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/lib/api/attachment.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/AnalysisResult.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
const WS_BASE = (("TURBOPACK compile-time value", "http://localhost:8080") ?? "http://localhost:8080").replace(/^http/, "ws");
;
;
;
;
;
;
;
;
;
;
;
;
;
;
// ─── Input style ──────────────────────────────────────────────────────────────
const INPUT_CLS = "bg-transparent border-t-0 border-l-0 border-r-0 border-b border-white/20 rounded-none h-14 px-0 font-mono text-sm focus-visible:ring-0 focus-visible:border-accent transition-all duration-400 placeholder:text-white/30 text-white/90";
// ─── Error block ──────────────────────────────────────────────────────────────
function ErrorBlock({ message }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0,
            y: 8
        },
        animate: {
            opacity: 1,
            y: 0
        },
        className: "border border-red-500/40 px-5 py-4 mt-6 font-mono text-[10px] leading-relaxed",
        style: {
            color: "rgba(239,68,68,0.9)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "uppercase tracking-[0.3em]",
                style: {
                    color: "rgba(239,68,68,0.6)"
                },
                children: "Error // "
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            message
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 41,
        columnNumber: 5
    }, this);
}
_c = ErrorBlock;
// ─── Scanning indicator ───────────────────────────────────────────────────────
function ScanningIndicator() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
        initial: {
            opacity: 0
        },
        animate: {
            opacity: 1
        },
        exit: {
            opacity: 0
        },
        transition: {
            duration: 0.25
        },
        className: "mt-8 border px-6 py-6",
        style: {
            borderColor: "rgba(232,117,0,0.25)"
        },
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center gap-5",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-end gap-[3px] h-5",
                    children: [
                        0,
                        1,
                        2,
                        3,
                        4
                    ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                            className: "w-[3px] bg-accent",
                            animate: {
                                scaleY: [
                                    0.25,
                                    1,
                                    0.25
                                ]
                            },
                            transition: {
                                duration: 0.65,
                                repeat: Infinity,
                                delay: i * 0.09,
                                ease: "easeInOut"
                            },
                            style: {
                                transformOrigin: "bottom"
                            }
                        }, i, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 70,
                            columnNumber: 13
                        }, this))
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 68,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[10px] uppercase tracking-[0.35em]",
                            style: {
                                color: "rgba(232,117,0,0.85)"
                            },
                            children: "Scanning Threat Vectors"
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 85,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "font-mono text-[8px] tracking-[0.2em] mt-0.5",
                            style: {
                                color: "rgba(255,255,255,0.35)"
                            },
                            children: "Routing through intelligence mesh..."
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 89,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 84,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/dashboard/page.tsx",
            lineNumber: 67,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 59,
        columnNumber: 5
    }, this);
}
_c1 = ScanningIndicator;
// ─── Execute button ───────────────────────────────────────────────────────────
function ExecuteButton({ onClick, loading, disabled }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        onClick: onClick,
        disabled: disabled || loading,
        className: "group/btn relative inline-flex items-center gap-6 px-8 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 disabled:cursor-not-allowed active:scale-[0.98] overflow-hidden",
        style: {
            border: "1px solid rgba(255,255,255,0.22)",
            color: disabled || loading ? "rgba(255,255,255,0.3)" : "rgba(255,255,255,0.85)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-0 opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none",
                style: {
                    background: "rgba(232,117,0,0.07)",
                    borderColor: "transparent"
                }
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 121,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "absolute inset-0 border opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none",
                style: {
                    borderColor: "rgba(232,117,0,0.7)"
                }
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 125,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$scramble$2d$text$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ScrambleTextOnHover"], {
                text: loading ? "Processing..." : "Execute Analysis",
                as: "span",
                duration: 0.5,
                className: "relative group-hover/btn:text-accent transition-colors duration-300"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 130,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$bitmap$2d$chevron$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BitmapChevron"], {
                className: "relative transition-all duration-500 ease-in-out group-hover/btn:rotate-45 group-hover/btn:text-accent"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 136,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 111,
        columnNumber: 5
    }, this);
}
_c2 = ExecuteButton;
// ─── Section header ───────────────────────────────────────────────────────────
function SectionHeader({ index, title, description }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-8",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-baseline gap-4 mb-6",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[10px] px-2 py-1 shrink-0",
                        style: {
                            color: "rgba(232,117,0,0.9)",
                            border: "1px solid rgba(232,117,0,0.35)"
                        },
                        children: index
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 155,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-[var(--font-bebas)] text-4xl md:text-5xl tracking-tight text-white group-hover:text-accent transition-colors duration-300",
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 164,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 154,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "font-mono text-xs leading-relaxed max-w-sm",
                style: {
                    color: "rgba(255,255,255,0.6)"
                },
                children: description
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 168,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 153,
        columnNumber: 5
    }, this);
}
_c3 = SectionHeader;
// ─── File input ───────────────────────────────────────────────────────────────
function FileInputRow({ file, placeholder, accept, onFile }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative",
        style: {
            borderBottom: "1px solid rgba(255,255,255,0.2)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                className: "flex items-center h-14 px-0 font-mono text-sm cursor-pointer",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        type: "file",
                        accept: accept,
                        className: "sr-only",
                        onChange: (e)=>onFile(e.target.files?.[0] ?? null)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 192,
                        columnNumber: 9
                    }, this),
                    file ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "rgba(232,117,0,0.9)"
                        },
                        children: file.name
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 199,
                        columnNumber: 11
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            color: "rgba(255,255,255,0.3)"
                        },
                        children: placeholder
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 201,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 191,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 204,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 190,
        columnNumber: 5
    }, this);
}
_c4 = FileInputRow;
// ─── Analytics: session threat level ─────────────────────────────────────────
function sessionLevel(threats, total) {
    if (total === 0) return {
        label: "NOMINAL",
        color: "rgba(255,255,255,0.4)"
    };
    if (threats === 0) return {
        label: "NOMINAL",
        color: "#22c55e"
    };
    const r = threats / total;
    if (r < 0.4) return {
        label: "ELEVATED",
        color: "#e87500"
    };
    if (r < 0.85) return {
        label: "HIGH",
        color: "#f97316"
    };
    return {
        label: "CRITICAL",
        color: "#ef4444"
    };
}
// ─── Analytics strip ──────────────────────────────────────────────────────────
function AnalyticsStrip({ analysisCount, threatCount, cleanCount, channelStates }) {
    const level = sessionLevel(threatCount, analysisCount);
    const stats = [
        {
            label: "Engines Online",
            value: "5 / 5",
            sub: "All channels active",
            accent: false
        },
        {
            label: "Models Active",
            value: "3",
            sub: "NLP · BiLSTM · Claude LLM",
            accent: true
        },
        {
            label: "Session Scans",
            value: analysisCount === 0 ? "—" : String(analysisCount),
            sub: analysisCount === 0 ? "Awaiting first scan" : `${threatCount} threat · ${cleanCount} clean`,
            accent: false
        },
        {
            label: "Detection Rate",
            value: "99.2%",
            sub: "30-day baseline",
            accent: false
        },
        {
            label: "Avg Latency",
            value: "340ms",
            sub: "Mesh efficiency",
            accent: false
        }
    ];
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "mb-12 overflow-hidden",
        style: {
            border: "1px solid rgba(255,255,255,0.12)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between px-5 py-3",
                style: {
                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[9px] uppercase tracking-[0.45em]",
                                style: {
                                    color: "rgba(255,255,255,0.55)"
                                },
                                children: "System Intelligence"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 284,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-px w-12",
                                style: {
                                    background: "rgba(255,255,255,0.1)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 288,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[8px] uppercase tracking-[0.3em] flex items-center gap-1.5",
                                style: {
                                    color: "rgba(232,117,0,0.8)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                        className: "inline-block w-1.5 h-1.5 bg-accent",
                                        animate: {
                                            opacity: [
                                                1,
                                                0.3,
                                                1
                                            ]
                                        },
                                        transition: {
                                            duration: 1.8,
                                            repeat: Infinity
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 291,
                                        columnNumber: 13
                                    }, this),
                                    "Live"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 289,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 283,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-3",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[8px] uppercase tracking-[0.25em]",
                                style: {
                                    color: "rgba(255,255,255,0.35)"
                                },
                                children: "Threat Level:"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 302,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-[var(--font-bebas)] text-base tracking-wide",
                                style: {
                                    color: level.color
                                },
                                children: level.label
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 301,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 279,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid grid-cols-2 md:grid-cols-5",
                style: {
                    borderBottom: "1px solid rgba(255,255,255,0.08)"
                },
                children: stats.map(({ label, value, sub, accent }, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-5 py-5",
                        style: {
                            borderRight: i < 4 ? "1px solid rgba(255,255,255,0.08)" : "none"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[8px] uppercase tracking-[0.35em] mb-2",
                                style: {
                                    color: "rgba(255,255,255,0.45)"
                                },
                                children: label
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 326,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-[var(--font-bebas)] text-3xl tracking-tight mb-1",
                                style: {
                                    color: accent ? "#e87500" : "rgba(255,255,255,0.95)"
                                },
                                children: value
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 330,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-[8px] tracking-[0.1em]",
                                style: {
                                    color: "rgba(255,255,255,0.38)"
                                },
                                children: sub
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 336,
                                columnNumber: 13
                            }, this)
                        ]
                    }, label, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 319,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 314,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-5 py-4 flex flex-wrap gap-x-8 gap-y-3 items-center",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-mono text-[8px] uppercase tracking-[0.35em]",
                        style: {
                            color: "rgba(255,255,255,0.35)"
                        },
                        children: "Channels:"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 346,
                        columnNumber: 9
                    }, this),
                    channelStates.map(({ label, done, scanning })=>{
                        const dotColor = scanning ? "#e87500" : done ? "rgba(255,255,255,0.8)" : "rgba(255,255,255,0.2)";
                        const txtColor = scanning ? "rgba(232,117,0,0.9)" : done ? "rgba(255,255,255,0.75)" : "rgba(255,255,255,0.38)";
                        const status = scanning ? "scanning" : done ? "done" : "idle";
                        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-2",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                    className: "inline-block w-1.5 h-1.5",
                                    style: {
                                        background: dotColor
                                    },
                                    animate: scanning ? {
                                        opacity: [
                                            1,
                                            0.2,
                                            1
                                        ]
                                    } : {
                                        opacity: 1
                                    },
                                    transition: {
                                        duration: 0.8,
                                        repeat: scanning ? Infinity : 0
                                    }
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 361,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[9px] uppercase tracking-[0.2em]",
                                    style: {
                                        color: txtColor
                                    },
                                    children: label
                                }, void 0, false, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-mono text-[7px] tracking-[0.15em] uppercase",
                                    style: {
                                        color: "rgba(255,255,255,0.25)"
                                    },
                                    children: [
                                        "[",
                                        status,
                                        "]"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/dashboard/page.tsx",
                                    lineNumber: 371,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, label, true, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 360,
                            columnNumber: 13
                        }, this);
                    })
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 345,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 274,
        columnNumber: 5
    }, this);
}
_c5 = AnalyticsStrip;
function DashboardPage() {
    _s();
    const containerRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [smsText, setSmsText] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [smsLoading, setSmsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [smsResult, setSmsResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [smsError, setSmsError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [emailSender, setEmailSender] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [emailSubject, setEmailSubject] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [emailBody, setEmailBody] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [emailLoading, setEmailLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [emailResult, setEmailResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [emailError, setEmailError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [urlValue, setUrlValue] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [urlLoading, setUrlLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [urlResult, setUrlResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [urlError, setUrlError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [voiceFile, setVoiceFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [voiceLoading, setVoiceLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [voiceResult, setVoiceResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [voiceError, setVoiceError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Live voice state ─────────────────────────────────────────────────────
    const [liveActive, setLiveActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [liveChunks, setLiveChunks] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [liveError, setLiveError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const wsRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const recRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const chunksEndRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [attachFile, setAttachFile] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attachLoading, setAttachLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [attachResult, setAttachResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [attachError, setAttachError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ── Derived analytics ────────────────────────────────────────────────────
    const allResults = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardPage.useMemo[allResults]": ()=>[
                smsResult,
                emailResult,
                urlResult,
                voiceResult,
                attachResult
            ]
    }["DashboardPage.useMemo[allResults]"], [
        smsResult,
        emailResult,
        urlResult,
        voiceResult,
        attachResult
    ]);
    const analysisCount = allResults.filter(Boolean).length;
    const threatCount = allResults.filter((r)=>{
        if (!r) return false;
        const s = typeof r.risk_score === "number" ? r.risk_score : typeof r.phishing_probability === "number" ? r.phishing_probability : 0;
        return s > 0.3;
    }).length;
    const cleanCount = analysisCount - threatCount;
    const channelStates = [
        {
            label: "SMS",
            done: !!smsResult,
            scanning: smsLoading
        },
        {
            label: "Email",
            done: !!emailResult,
            scanning: emailLoading
        },
        {
            label: "URL",
            done: !!urlResult,
            scanning: urlLoading
        },
        {
            label: "Voice",
            done: !!voiceResult,
            scanning: voiceLoading
        },
        {
            label: "File",
            done: !!attachResult,
            scanning: attachLoading
        }
    ];
    // ── GSAP entrance ────────────────────────────────────────────────────────
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardPage.useEffect": ()=>{
            if (!containerRef.current) return;
            const ctx = __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].context({
                "DashboardPage.useEffect.ctx": ()=>{
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(".dashboard-section", {
                        y: 48,
                        opacity: 0,
                        duration: 0.85,
                        stagger: 0.14,
                        ease: "power3.out"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(".dashboard-header", {
                        x: -36,
                        opacity: 0,
                        duration: 1.0,
                        ease: "power3.out"
                    });
                    __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$gsap$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$locals$3e$__["default"].from(".analytics-panel", {
                        y: 22,
                        opacity: 0,
                        duration: 0.65,
                        delay: 0.35,
                        ease: "power3.out"
                    });
                }
            }["DashboardPage.useEffect.ctx"], containerRef);
            return ({
                "DashboardPage.useEffect": ()=>ctx.revert()
            })["DashboardPage.useEffect"];
        }
    }["DashboardPage.useEffect"], []);
    // ── Handlers ─────────────────────────────────────────────────────────────
    const handleSms = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleSms]": async ()=>{
            if (!smsText.trim()) return;
            setSmsLoading(true);
            setSmsResult(null);
            setSmsError(null);
            try {
                setSmsResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$sms$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeSms"])({
                    text: smsText,
                    include_llm_explanation: false
                }));
            } catch (err) {
                setSmsError(err instanceof Error ? err.message : "Analysis failed");
            } finally{
                setSmsLoading(false);
            }
        }
    }["DashboardPage.useCallback[handleSms]"], [
        smsText
    ]);
    const handleEmail = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleEmail]": async ()=>{
            if (!emailSender.trim() || !emailBody.trim()) return;
            setEmailLoading(true);
            setEmailResult(null);
            setEmailError(null);
            try {
                setEmailResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$email$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeEmail"])({
                    sender: emailSender,
                    subject: emailSubject,
                    body: emailBody,
                    with_llm_explanation: false
                }));
            } catch (err) {
                setEmailError(err instanceof Error ? err.message : "Analysis failed");
            } finally{
                setEmailLoading(false);
            }
        }
    }["DashboardPage.useCallback[handleEmail]"], [
        emailSender,
        emailSubject,
        emailBody
    ]);
    const handleUrl = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleUrl]": async ()=>{
            if (!urlValue.trim()) return;
            setUrlLoading(true);
            setUrlResult(null);
            setUrlError(null);
            try {
                setUrlResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$url$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeUrl"])({
                    url: urlValue,
                    with_llm_explanation: false
                }));
            } catch (err) {
                setUrlError(err instanceof Error ? err.message : "Analysis failed");
            } finally{
                setUrlLoading(false);
            }
        }
    }["DashboardPage.useCallback[handleUrl]"], [
        urlValue
    ]);
    const handleVoice = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleVoice]": async ()=>{
            if (!voiceFile) return;
            setVoiceLoading(true);
            setVoiceResult(null);
            setVoiceError(null);
            try {
                setVoiceResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$voice$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeVoice"])(voiceFile));
            } catch (err) {
                setVoiceError(err instanceof Error ? err.message : "Analysis failed");
            } finally{
                setVoiceLoading(false);
            }
        }
    }["DashboardPage.useCallback[handleVoice]"], [
        voiceFile
    ]);
    const startLive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[startLive]": async ()=>{
            setLiveError(null);
            setLiveChunks([]);
            let stream;
            try {
                stream = await navigator.mediaDevices.getUserMedia({
                    audio: true
                });
            } catch  {
                setLiveError("Microphone access denied.");
                return;
            }
            const ws = new WebSocket(`${WS_BASE}/voice/ws/live-protect`);
            wsRef.current = ws;
            ws.onopen = ({
                "DashboardPage.useCallback[startLive]": ()=>{
                    setLiveActive(true);
                    const recorder = new MediaRecorder(stream, {
                        mimeType: "audio/webm"
                    });
                    recRef.current = recorder;
                    recorder.ondataavailable = ({
                        "DashboardPage.useCallback[startLive]": (e)=>{
                            if (ws.readyState === WebSocket.OPEN && e.data.size > 0) ws.send(e.data);
                        }
                    })["DashboardPage.useCallback[startLive]"];
                    recorder.start(500);
                }
            })["DashboardPage.useCallback[startLive]"];
            ws.onmessage = ({
                "DashboardPage.useCallback[startLive]": (e)=>{
                    try {
                        const data = JSON.parse(e.data);
                        setLiveChunks({
                            "DashboardPage.useCallback[startLive]": (prev)=>{
                                const next = [
                                    ...prev,
                                    {
                                        ...data,
                                        id: prev.length + 1
                                    }
                                ];
                                return next.slice(-30) // keep last 30
                                ;
                            }
                        }["DashboardPage.useCallback[startLive]"]);
                        setTimeout({
                            "DashboardPage.useCallback[startLive]": ()=>chunksEndRef.current?.scrollIntoView({
                                    behavior: "smooth"
                                })
                        }["DashboardPage.useCallback[startLive]"], 50);
                    } catch  {}
                }
            })["DashboardPage.useCallback[startLive]"];
            ws.onerror = ({
                "DashboardPage.useCallback[startLive]": ()=>setLiveError("WebSocket connection failed.")
            })["DashboardPage.useCallback[startLive]"];
            ws.onclose = ({
                "DashboardPage.useCallback[startLive]": ()=>{
                    setLiveActive(false);
                    stream.getTracks().forEach({
                        "DashboardPage.useCallback[startLive]": (t)=>t.stop()
                    }["DashboardPage.useCallback[startLive]"]);
                }
            })["DashboardPage.useCallback[startLive]"];
        }
    }["DashboardPage.useCallback[startLive]"], []);
    const stopLive = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[stopLive]": ()=>{
            recRef.current?.stop();
            wsRef.current?.send("STOP_CAPTURE");
            wsRef.current?.close();
            setLiveActive(false);
        }
    }["DashboardPage.useCallback[stopLive]"], []);
    const handleAttachment = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardPage.useCallback[handleAttachment]": async ()=>{
            if (!attachFile) return;
            setAttachLoading(true);
            setAttachResult(null);
            setAttachError(null);
            try {
                setAttachResult(await (0, __TURBOPACK__imported__module__$5b$project$5d2f$lib$2f$api$2f$attachment$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["analyzeAttachment"])(attachFile, false));
            } catch (err) {
                setAttachError(err instanceof Error ? err.message : "Analysis failed");
            } finally{
                setAttachLoading(false);
            }
        }
    }["DashboardPage.useCallback[handleAttachment]"], [
        attachFile
    ]);
    // ── Render ───────────────────────────────────────────────────────────────
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        ref: containerRef,
        className: "relative min-h-screen bg-background text-foreground selection:bg-accent selection:text-background",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$animated$2d$noise$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatedNoise"], {
                opacity: 0.028
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 586,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "grid-bg fixed inset-0 pointer-events-none",
                style: {
                    opacity: 0.22
                },
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 589,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "scanlines fixed inset-0 pointer-events-none z-[9000]",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 592,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "ambient-glow fixed bottom-0 left-0 right-0 h-[40vh] pointer-events-none z-0",
                "aria-hidden": "true"
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 595,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                className: "relative z-50 flex items-center justify-between px-6 py-5 md:px-12 backdrop-blur-md",
                style: {
                    borderBottom: "1px solid rgba(255,255,255,0.12)",
                    background: "rgba(0,0,0,0.6)"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] uppercase tracking-[0.4em] text-accent font-bold",
                                children: "Rapid3"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 606,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "h-px w-8",
                                style: {
                                    background: "rgba(255,255,255,0.2)"
                                }
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 609,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] uppercase tracking-[0.4em]",
                                style: {
                                    color: "rgba(255,255,255,0.65)"
                                },
                                children: "Operative Interface"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 610,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 605,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$app$2d$dir$2f$link$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["default"], {
                        href: "/",
                        className: "font-mono text-[10px] uppercase tracking-[0.3em] transition-colors duration-300 hover:text-accent",
                        style: {
                            color: "rgba(255,255,255,0.5)"
                        },
                        children: "Logout // Disconnect"
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 615,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 598,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "relative z-10 max-w-7xl mx-auto px-6 py-16 md:px-12 md:py-24",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "dashboard-header mb-16 max-w-2xl",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "font-mono text-[10px] uppercase tracking-[0.5em] text-accent block mb-4",
                                children: "Command Center"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 628,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "font-[var(--font-bebas)] text-7xl md:text-9xl tracking-tighter leading-[0.82] mb-8 text-white",
                                children: "DASHBOARD"
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "font-mono text-sm leading-relaxed max-w-md",
                                style: {
                                    color: "rgba(255,255,255,0.65)"
                                },
                                children: "Active defensive layers are online. Deploy localized intelligence across multiple threat vectors."
                            }, void 0, false, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 634,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 627,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "analytics-panel mb-20",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(AnalyticsStrip, {
                            analysisCount: analysisCount,
                            threatCount: threatCount,
                            cleanCount: cleanCount,
                            channelStates: channelStates
                        }, void 0, false, {
                            fileName: "[project]/app/dashboard/page.tsx",
                            lineNumber: 642,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 641,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "grid grid-cols-1 lg:grid-cols-2 gap-x-20 gap-y-28",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "dashboard-section group relative",
                                style: {
                                    borderLeft: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full",
                                        style: {
                                            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 658,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                                index: "01",
                                                title: "SMS Analysis",
                                                description: "Detect phishing patterns and malicious intent in mobile communications."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 663,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: smsText,
                                                                onChange: (e)=>setSmsText(e.target.value),
                                                                onKeyDown: (e)=>e.key === "Enter" && handleSms(),
                                                                placeholder: "Enter SMS content for threat vectoring...",
                                                                className: INPUT_CLS
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 670,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 677,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 669,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecuteButton, {
                                                            onClick: handleSms,
                                                            loading: smsLoading,
                                                            disabled: !smsText.trim()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 680,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 679,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: smsLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScanningIndicator, {}, "loading", false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 683,
                                                            columnNumber: 34
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 682,
                                                        columnNumber: 17
                                                    }, this),
                                                    smsError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                        message: smsError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 685,
                                                        columnNumber: 30
                                                    }, this),
                                                    smsResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisResult"], {
                                                                data: smsResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 688,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThreatVisualization"], {
                                                                data: smsResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 689,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 668,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 662,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 654,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "dashboard-section group relative",
                                style: {
                                    borderLeft: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full",
                                        style: {
                                            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 701,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                                index: "02",
                                                title: "Email Analysis",
                                                description: "Deep packet inspection of SMTP artifacts and social engineering markers."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 704,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: emailSender,
                                                                onChange: (e)=>setEmailSender(e.target.value),
                                                                placeholder: "Sender address...",
                                                                className: INPUT_CLS
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 711,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 717,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 710,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: emailSubject,
                                                        onChange: (e)=>setEmailSubject(e.target.value),
                                                        placeholder: "Subject line...",
                                                        className: INPUT_CLS
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 719,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                        value: emailBody,
                                                        onChange: (e)=>setEmailBody(e.target.value),
                                                        placeholder: "Paste email body or headers...",
                                                        className: INPUT_CLS
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 725,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecuteButton, {
                                                            onClick: handleEmail,
                                                            loading: emailLoading,
                                                            disabled: !emailSender.trim() || !emailBody.trim()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 732,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 731,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: emailLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScanningIndicator, {}, "loading", false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 739,
                                                            columnNumber: 36
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 738,
                                                        columnNumber: 17
                                                    }, this),
                                                    emailError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                        message: emailError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 741,
                                                        columnNumber: 32
                                                    }, this),
                                                    emailResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisResult"], {
                                                                data: emailResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 744,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThreatVisualization"], {
                                                                data: emailResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 745,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 709,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 703,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 697,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "dashboard-section group relative",
                                style: {
                                    borderLeft: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full",
                                        style: {
                                            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 757,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                                index: "03",
                                                title: "URL Analysis",
                                                description: "Real-time domain reputation and recursive redirect tracing."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 760,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "relative",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$input$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Input"], {
                                                                value: urlValue,
                                                                onChange: (e)=>setUrlValue(e.target.value),
                                                                onKeyDown: (e)=>e.key === "Enter" && handleUrl(),
                                                                placeholder: "https://",
                                                                className: INPUT_CLS
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 767,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "absolute bottom-0 left-0 h-[2px] w-0 bg-accent transition-all duration-700 group-focus-within:w-full"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 774,
                                                                columnNumber: 19
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 766,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecuteButton, {
                                                            onClick: handleUrl,
                                                            loading: urlLoading,
                                                            disabled: !urlValue.trim()
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 777,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 776,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: urlLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScanningIndicator, {}, "loading", false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 780,
                                                            columnNumber: 34
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 779,
                                                        columnNumber: 17
                                                    }, this),
                                                    urlError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                        message: urlError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 782,
                                                        columnNumber: 30
                                                    }, this),
                                                    urlResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisResult"], {
                                                                data: urlResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 785,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThreatVisualization"], {
                                                                data: urlResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 786,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 765,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 759,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 753,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "dashboard-section group relative lg:col-span-2",
                                style: {
                                    borderLeft: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full",
                                        style: {
                                            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 798,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                                index: "04",
                                                title: "Voice Analysis",
                                                description: "ResNetBiLSTM deepfake detection — upload an audio file or activate live microphone analysis with real-time transcript and fraud scoring."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 801,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "grid grid-cols-1 md:grid-cols-2 gap-12",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono text-[9px] uppercase tracking-[0.4em]",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.38)"
                                                                },
                                                                children: "// File Upload"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 811,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileInputRow, {
                                                                file: voiceFile,
                                                                placeholder: "Upload audio sample (.wav .mp3 .ogg)...",
                                                                accept: "audio/*",
                                                                onFile: (f)=>{
                                                                    setVoiceFile(f);
                                                                    setVoiceResult(null);
                                                                    setVoiceError(null);
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 815,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "flex justify-end",
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecuteButton, {
                                                                    onClick: handleVoice,
                                                                    loading: voiceLoading,
                                                                    disabled: !voiceFile
                                                                }, void 0, false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 822,
                                                                    columnNumber: 21
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 821,
                                                                columnNumber: 19
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                                mode: "wait",
                                                                children: voiceLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScanningIndicator, {}, "loading", false, {
                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                    lineNumber: 825,
                                                                    columnNumber: 38
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 824,
                                                                columnNumber: 19
                                                            }, this),
                                                            voiceError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                                message: voiceError
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 827,
                                                                columnNumber: 34
                                                            }, this),
                                                            voiceResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisResult"], {
                                                                        data: voiceResult
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 830,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThreatVisualization"], {
                                                                        data: voiceResult
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 831,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 810,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "space-y-6",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                className: "font-mono text-[9px] uppercase tracking-[0.4em]",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.38)"
                                                                },
                                                                children: "// Live Monitor"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 838,
                                                                columnNumber: 19
                                                            }, this),
                                                            !liveActive ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: startLive,
                                                                className: "group/live relative inline-flex items-center gap-4 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 overflow-hidden w-full justify-center",
                                                                style: {
                                                                    border: "1px solid rgba(232,117,0,0.4)",
                                                                    color: "rgba(232,117,0,0.85)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "absolute inset-0 opacity-0 group-hover/live:opacity-100 transition-opacity duration-300",
                                                                        style: {
                                                                            background: "rgba(232,117,0,0.07)"
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 850,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                                        className: "w-2 h-2 rounded-full bg-accent flex-shrink-0",
                                                                        animate: {
                                                                            opacity: [
                                                                                1,
                                                                                0.3,
                                                                                1
                                                                            ]
                                                                        },
                                                                        transition: {
                                                                            duration: 1.2,
                                                                            repeat: Infinity
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 852,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Activate Live Monitor"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 845,
                                                                columnNumber: 21
                                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: stopLive,
                                                                className: "inline-flex items-center gap-4 px-6 py-4 font-mono text-[10px] uppercase tracking-[0.3em] transition-all duration-300 w-full justify-center",
                                                                style: {
                                                                    border: "1px solid rgba(239,68,68,0.5)",
                                                                    color: "rgba(239,68,68,0.85)",
                                                                    background: "rgba(239,68,68,0.05)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].span, {
                                                                        className: "w-2 h-2 rounded-full flex-shrink-0",
                                                                        style: {
                                                                            background: "#ef4444"
                                                                        },
                                                                        animate: {
                                                                            opacity: [
                                                                                1,
                                                                                0.2,
                                                                                1
                                                                            ]
                                                                        },
                                                                        transition: {
                                                                            duration: 0.6,
                                                                            repeat: Infinity
                                                                        }
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 865,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    "Stop Recording"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 860,
                                                                columnNumber: 21
                                                            }, this),
                                                            liveActive && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                initial: {
                                                                    opacity: 0
                                                                },
                                                                animate: {
                                                                    opacity: 1
                                                                },
                                                                className: "flex items-center gap-3 px-4 py-3",
                                                                style: {
                                                                    border: "1px solid rgba(232,117,0,0.2)",
                                                                    background: "rgba(232,117,0,0.04)"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        className: "flex items-end gap-[2px] h-4",
                                                                        children: [
                                                                            0,
                                                                            1,
                                                                            2,
                                                                            3,
                                                                            4
                                                                        ].map((i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                                className: "w-[2px] bg-accent",
                                                                                animate: {
                                                                                    scaleY: [
                                                                                        0.2,
                                                                                        1,
                                                                                        0.2
                                                                                    ]
                                                                                },
                                                                                transition: {
                                                                                    duration: 0.55,
                                                                                    repeat: Infinity,
                                                                                    delay: i * 0.08,
                                                                                    ease: "easeInOut"
                                                                                },
                                                                                style: {
                                                                                    transformOrigin: "bottom"
                                                                                }
                                                                            }, i, false, {
                                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                                lineNumber: 885,
                                                                                columnNumber: 27
                                                                            }, this))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 883,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "font-mono text-[9px] uppercase tracking-[0.3em] text-accent",
                                                                        children: "Capturing audio — analysing in 3s chunks..."
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 892,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 877,
                                                                columnNumber: 21
                                                            }, this),
                                                            liveError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                                message: liveError
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 898,
                                                                columnNumber: 33
                                                            }, this),
                                                            liveChunks.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "space-y-2 max-h-[420px] overflow-y-auto pr-1",
                                                                style: {
                                                                    scrollbarWidth: "thin",
                                                                    scrollbarColor: "rgba(232,117,0,0.3) transparent"
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                        className: "font-mono text-[8px] uppercase tracking-[0.4em] mb-3",
                                                                        style: {
                                                                            color: "rgba(255,255,255,0.28)"
                                                                        },
                                                                        children: [
                                                                            "Live stream — ",
                                                                            liveChunks.length,
                                                                            " chunks"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 904,
                                                                        columnNumber: 23
                                                                    }, this),
                                                                    liveChunks.map((chunk)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                                                            initial: {
                                                                                opacity: 0,
                                                                                x: -8
                                                                            },
                                                                            animate: {
                                                                                opacity: 1,
                                                                                x: 0
                                                                            },
                                                                            transition: {
                                                                                duration: 0.3
                                                                            },
                                                                            style: {
                                                                                border: chunk.is_spoof ? "1px solid rgba(239,68,68,0.35)" : "1px solid rgba(255,255,255,0.08)",
                                                                                background: chunk.is_spoof ? "rgba(239,68,68,0.04)" : "rgba(255,255,255,0.02)"
                                                                            },
                                                                            className: "px-4 py-3",
                                                                            children: [
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "flex items-center justify-between mb-2",
                                                                                    children: [
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center gap-3",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-mono text-[8px] uppercase tracking-[0.3em]",
                                                                                                    style: {
                                                                                                        color: "rgba(255,255,255,0.3)"
                                                                                                    },
                                                                                                    children: [
                                                                                                        "#",
                                                                                                        String(chunk.id).padStart(2, "0")
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                                    lineNumber: 927,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-mono text-[9px] uppercase tracking-[0.25em] px-2 py-0.5",
                                                                                                    style: {
                                                                                                        color: chunk.is_spoof ? "rgba(239,68,68,0.9)" : "rgba(34,197,94,0.9)",
                                                                                                        border: chunk.is_spoof ? "1px solid rgba(239,68,68,0.3)" : "1px solid rgba(34,197,94,0.25)",
                                                                                                        background: chunk.is_spoof ? "rgba(239,68,68,0.08)" : "rgba(34,197,94,0.06)"
                                                                                                    },
                                                                                                    children: chunk.voice_label
                                                                                                }, void 0, false, {
                                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                                    lineNumber: 931,
                                                                                                    columnNumber: 31
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                                            lineNumber: 926,
                                                                                            columnNumber: 29
                                                                                        }, this),
                                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                            className: "flex items-center gap-4",
                                                                                            children: [
                                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-mono text-[8px]",
                                                                                                    style: {
                                                                                                        color: "rgba(255,255,255,0.35)"
                                                                                                    },
                                                                                                    children: [
                                                                                                        "conf ",
                                                                                                        Math.round(chunk.confidence * 100),
                                                                                                        "%"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                                    lineNumber: 943,
                                                                                                    columnNumber: 31
                                                                                                }, this),
                                                                                                chunk.risk_score > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                                                    className: "font-mono text-[8px] px-2 py-0.5",
                                                                                                    style: {
                                                                                                        color: chunk.risk_score >= 6 ? "rgba(239,68,68,0.9)" : "rgba(232,117,0,0.9)",
                                                                                                        border: "1px solid rgba(232,117,0,0.25)"
                                                                                                    },
                                                                                                    children: [
                                                                                                        "risk ",
                                                                                                        chunk.risk_score,
                                                                                                        "/10"
                                                                                                    ]
                                                                                                }, void 0, true, {
                                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                                    lineNumber: 948,
                                                                                                    columnNumber: 33
                                                                                                }, this)
                                                                                            ]
                                                                                        }, void 0, true, {
                                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                                            lineNumber: 942,
                                                                                            columnNumber: 29
                                                                                        }, this)
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                    lineNumber: 925,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                    className: "h-[2px] w-full mb-2",
                                                                                    style: {
                                                                                        background: "rgba(255,255,255,0.06)"
                                                                                    },
                                                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                                        className: "h-full transition-all duration-500",
                                                                                        style: {
                                                                                            width: `${Math.round(chunk.confidence * 100)}%`,
                                                                                            background: chunk.is_spoof ? "#ef4444" : "#22c55e"
                                                                                        }
                                                                                    }, void 0, false, {
                                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                                        lineNumber: 961,
                                                                                        columnNumber: 29
                                                                                    }, this)
                                                                                }, void 0, false, {
                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                    lineNumber: 960,
                                                                                    columnNumber: 27
                                                                                }, this),
                                                                                chunk.transcript && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-mono text-[10px] leading-relaxed",
                                                                                    style: {
                                                                                        color: "rgba(255,255,255,0.55)",
                                                                                        fontStyle: "italic"
                                                                                    },
                                                                                    children: [
                                                                                        "“",
                                                                                        chunk.transcript,
                                                                                        "”"
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                    lineNumber: 972,
                                                                                    columnNumber: 29
                                                                                }, this),
                                                                                chunk.warning && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                                                    className: "font-mono text-[9px] mt-2 leading-relaxed",
                                                                                    style: {
                                                                                        color: "rgba(232,117,0,0.75)"
                                                                                    },
                                                                                    children: [
                                                                                        "⚠ ",
                                                                                        chunk.warning
                                                                                    ]
                                                                                }, void 0, true, {
                                                                                    fileName: "[project]/app/dashboard/page.tsx",
                                                                                    lineNumber: 980,
                                                                                    columnNumber: 29
                                                                                }, this)
                                                                            ]
                                                                        }, chunk.id, true, {
                                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                                            lineNumber: 909,
                                                                            columnNumber: 25
                                                                        }, this)),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                        ref: chunksEndRef
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                                        lineNumber: 987,
                                                                        columnNumber: 23
                                                                    }, this)
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 902,
                                                                columnNumber: 21
                                                            }, this),
                                                            !liveActive && liveChunks.length === 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                                className: "font-mono text-[9px] uppercase tracking-[0.3em] py-8 text-center",
                                                                style: {
                                                                    color: "rgba(255,255,255,0.18)",
                                                                    border: "1px dashed rgba(255,255,255,0.08)"
                                                                },
                                                                children: "Live stream inactive — awaiting activation"
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 992,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 837,
                                                        columnNumber: 17
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 807,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 800,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 794,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                className: "dashboard-section group relative",
                                style: {
                                    borderLeft: "1px solid rgba(255,255,255,0.06)"
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "absolute left-0 top-0 w-px h-0 bg-accent transition-all duration-500 group-hover:h-full",
                                        style: {
                                            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)"
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1007,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "pl-6",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SectionHeader, {
                                                index: "05",
                                                title: "File Analysis",
                                                description: "YARA-based signature matching and behavioral sandbox analysis."
                                            }, void 0, false, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 1010,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "space-y-6",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FileInputRow, {
                                                        file: attachFile,
                                                        placeholder: "Select artifact for scanning...",
                                                        onFile: (f)=>{
                                                            setAttachFile(f);
                                                            setAttachResult(null);
                                                            setAttachError(null);
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 1016,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "flex justify-end",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ExecuteButton, {
                                                            onClick: handleAttachment,
                                                            loading: attachLoading,
                                                            disabled: !attachFile
                                                        }, void 0, false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 1022,
                                                            columnNumber: 19
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 1021,
                                                        columnNumber: 17
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        mode: "wait",
                                                        children: attachLoading && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ScanningIndicator, {}, "loading", false, {
                                                            fileName: "[project]/app/dashboard/page.tsx",
                                                            lineNumber: 1025,
                                                            columnNumber: 37
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 1024,
                                                        columnNumber: 17
                                                    }, this),
                                                    attachError && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ErrorBlock, {
                                                        message: attachError
                                                    }, void 0, false, {
                                                        fileName: "[project]/app/dashboard/page.tsx",
                                                        lineNumber: 1027,
                                                        columnNumber: 33
                                                    }, this),
                                                    attachResult && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisResult$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnalysisResult"], {
                                                                data: attachResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 1030,
                                                                columnNumber: 21
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$AnalysisCharts$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ThreatVisualization"], {
                                                                data: attachResult
                                                            }, void 0, false, {
                                                                fileName: "[project]/app/dashboard/page.tsx",
                                                                lineNumber: 1031,
                                                                columnNumber: 21
                                                            }, this)
                                                        ]
                                                    }, void 0, true)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/app/dashboard/page.tsx",
                                                lineNumber: 1015,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1009,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 1003,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 651,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "mt-48 pt-10 flex flex-col md:flex-row justify-between gap-8 font-mono text-[9px] uppercase tracking-[0.4em]",
                        style: {
                            borderTop: "1px solid rgba(255,255,255,0.12)",
                            color: "rgba(255,255,255,0.45)"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Uptime: 99.9997%"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1049,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Latency: 12ms"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1050,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Nodes: Active [32]"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1051,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 1048,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex gap-8",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "SECURE_SESSION: RF-9021"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1054,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "ENCRYPTION: AES-256-GCM"
                                    }, void 0, false, {
                                        fileName: "[project]/app/dashboard/page.tsx",
                                        lineNumber: 1055,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/dashboard/page.tsx",
                                lineNumber: 1053,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/dashboard/page.tsx",
                        lineNumber: 1041,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 624,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed bottom-10 right-10 hidden xl:block z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "px-5 py-3 font-mono text-[9px] uppercase tracking-[0.3em] backdrop-blur-md",
                    style: {
                        border: "1px solid rgba(255,255,255,0.15)",
                        color: "rgba(255,255,255,0.5)",
                        background: "rgba(0,0,0,0.4)"
                    },
                    children: "INTERFACE_V02 // DEFENSIVE_STATE"
                }, void 0, false, {
                    fileName: "[project]/app/dashboard/page.tsx",
                    lineNumber: 1062,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/dashboard/page.tsx",
                lineNumber: 1061,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/dashboard/page.tsx",
        lineNumber: 582,
        columnNumber: 5
    }, this);
}
_s(DashboardPage, "WhVPLbw6AwBhtNPglSVPYddo2uA=");
_c6 = DashboardPage;
var _c, _c1, _c2, _c3, _c4, _c5, _c6;
__turbopack_context__.k.register(_c, "ErrorBlock");
__turbopack_context__.k.register(_c1, "ScanningIndicator");
__turbopack_context__.k.register(_c2, "ExecuteButton");
__turbopack_context__.k.register(_c3, "SectionHeader");
__turbopack_context__.k.register(_c4, "FileInputRow");
__turbopack_context__.k.register(_c5, "AnalyticsStrip");
__turbopack_context__.k.register(_c6, "DashboardPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_01991c43._.js.map