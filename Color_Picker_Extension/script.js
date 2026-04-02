
const PALETTE = [
    '#ef4444', '#f97316', '#eab308', '#22c55e',
    '#06b6d4', '#3b82f6', '#8b5cf6', '#ec4899',
    '#f43f5e', '#fb923c', '#facc15', '#4ade80',
    '#22d3ee', '#60a5fa', '#a78bfa', '#f472b6',
    '#0f172a', '#1e293b', '#64748b', '#94a3b8',
    '#cbd5e1', '#e2e8f0', '#f8fafc', '#ffffff',
];

let rgb = { r: 139, g: 92, b: 246 };
let fmt = 'hex';
let history = [];

const $ = id => document.getElementById(id);
const previewBox = $('previewBox');
const previewHex = $('previewHex');
const nativeColor = $('nativeColor');
const valueInput = $('colorValueInput');
const sliderR = $('sliderR');
const sliderG = $('sliderG');
const sliderB = $('sliderB');
const valR = $('valR');
const valG = $('valG');
const valB = $('valB');
const historyRow = $('historyRow');
const paletteGrid = $('paletteGrid');
const toast = $('toast');

/* ------- helpers ---- */
function toHex(r, g, b) {
    return '#' + [r, g, b].map(v => v.toString(16).padStart(2, '0')).join('');
}
function toRGB(r, g, b) { return `rgb(${r}, ${g}, ${b})`; }
function toHSL(r, g, b) {
    r /= 255; g /= 255; b /= 255;
    const max = Math.max(r, g, b), min = Math.min(r, g, b);
    let h, s, l = (max + min) / 2;
    if (max === min) { h = s = 0; } else {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
            case g: h = ((b - r) / d + 2) / 6; break;
            case b: h = ((r - g) / d + 4) / 6; break;
        }
    }
    return `hsl(${Math.round(h * 360)}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`;
}
function hexToRGB(hex) {
    const c = hex.replace('#', '');
    if (c.length !== 6) return null;
    const r = parseInt(c.slice(0, 2), 16), g = parseInt(c.slice(2, 4), 16), b = parseInt(c.slice(4, 6), 16);
    return (isNaN(r) || isNaN(g) || isNaN(b)) ? null : { r, g, b };
}
function getFormatValue() {
    const { r, g, b } = rgb;
    return fmt === 'hex' ? toHex(r, g, b) : fmt === 'rgb' ? toRGB(r, g, b) : toHSL(r, g, b);
}

/* ------- apply ------- */
function applyColor(r, g, b, addHist = false) {
    rgb = { r, g, b };
    const hex = toHex(r, g, b);
    previewBox.style.background = hex;
    previewHex.textContent = hex.toUpperCase();
    nativeColor.value = hex;
    sliderR.value = r; valR.textContent = r;
    sliderG.value = g; valG.textContent = g;
    sliderB.value = b; valB.textContent = b;
    valueInput.value = getFormatValue();

    document.querySelectorAll('.swatch').forEach(s =>
        s.classList.toggle('ring-2', s.dataset.color.toLowerCase() === hex.toLowerCase())
    );

    if (addHist) {
        history = [hex, ...history.filter(h => h !== hex)].slice(0, 7);
        renderHistory();
    }
}

/* ------- history ------- */
function renderHistory() {
    if (!history.length) {
        historyRow.innerHTML = '<span class="text-[12px] text-[#5e5c72] italic">No colors picked yet.</span>';
        return;
    }
    historyRow.innerHTML = '';
    history.forEach(hex => {
        const s = document.createElement('div');
        s.className = 'w-8 h-8 rounded-lg border border-white/[0.07] cursor-pointer hover:scale-110 transition-transform duration-150 flex-shrink-0';
        s.style.background = hex;
        s.title = hex.toUpperCase();
        s.addEventListener('click', () => { const c = hexToRGB(hex); if (c) applyColor(c.r, c.g, c.b); });
        historyRow.appendChild(s);
    });
}

/* ------- palette ------- */
PALETTE.forEach(color => {
    const s = document.createElement('div');
    s.className = 'swatch aspect-square w-full rounded-[8px] cursor-pointer hover:scale-110 transition-transform duration-150 ring-white/70';
    s.style.background = color;
    s.dataset.color = color;
    s.title = color.toUpperCase();
    s.addEventListener('click', () => { const c = hexToRGB(color); if (c) applyColor(c.r, c.g, c.b, true); });
    paletteGrid.appendChild(s);
});

/* ------- format tabs ------- */
document.querySelectorAll('.format-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        fmt = tab.dataset.format;
        document.querySelectorAll('.format-tab').forEach(t => {
            const active = t.dataset.format === fmt;
            t.className = t.className
                .replace(/bg-violet-500\/15|bg-\[#22222f\]/g, active ? 'bg-violet-500/15' : 'bg-[#22222f]')
                .replace(/border-violet-500\/50|border-white\/\[0\.07\]/g, active ? 'border-violet-500/50' : 'border-white/[0.07]')
                .replace(/text-violet-400|text-\[#9390a8\]/g, active ? 'text-violet-400' : 'text-[#9390a8]');
        });
        valueInput.value = getFormatValue();
    });
});

/* ------- sliders ------- */
[sliderR, sliderG, sliderB].forEach(sl => {
    sl.addEventListener('input', () => applyColor(+sliderR.value, +sliderG.value, +sliderB.value, true));
});

/* ------- native color input ------- */
nativeColor.addEventListener('input', () => {
    const c = hexToRGB(nativeColor.value);
    if (c) applyColor(c.r, c.g, c.b, true);
});

/* ------- text input ------- */
valueInput.addEventListener('change', () => {
    const val = valueInput.value.trim();
    const c = hexToRGB(val.startsWith('#') ? val : '#' + val);
    if (c) applyColor(c.r, c.g, c.b, true);
});

/* ---- --- toast ------- */
let toastTimer;
function showToast(msg) {
    toast.textContent = msg;
    toast.classList.remove('hidden');
    toast.classList.add('toast-enter');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
        toast.classList.add('hidden');
        toast.classList.remove('toast-enter');
    }, 2200);
}

/* ------- copy ------- */
$('copyBtn').addEventListener('click', () => {
    navigator.clipboard.writeText(valueInput.value)
        .then(() => showToast('✓ Copied: ' + valueInput.value))
        .catch(() => showToast('⚠ Could not copy'));
});

/* ------- eyedropper ------- */
$('pickBtn').addEventListener('click', async () => {
    if (!window.EyeDropper) {
        showToast('⚠ EyeDropper not supported');
        return;
    }

    const toggleElements = document.querySelectorAll('.toggle-pick');


    document.body.classList.add('compact-mode');
    toggleElements.forEach(el => el.classList.add('hidden'));

    try {
        const result = await new EyeDropper().open();
        const c = hexToRGB(result.sRGBHex);
        if (c) applyColor(c.r, c.g, c.b, true);
        showToast('✓ Color picked!');
    } catch (_) {
        // User cancelled
    } finally {
        // Exit Compact Mode
        document.body.classList.remove('compact-mode');
        toggleElements.forEach(el => el.classList.remove('hidden'));
    }
});

/* ---- Init ---- */
applyColor(139, 92, 246);