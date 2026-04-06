const form = document.getElementById('image-form');
const submitBtn = form.querySelector('button[type="submit"]');
const overlay = document.getElementById('loading-overlay');
const img = document.getElementById('output-image');
const placeholder = document.getElementById('placeholder');
const container = document.getElementById('preview-container');
const downloadBtn = document.getElementById('download-btn');
const apiKeyInput = document.getElementById('api-key-input');
const apiKeyBtn = document.getElementById('api-key-btn');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');
let freeImageGeneratedCount = parseInt(localStorage.getItem('free_gen_count') || '0', 10);

const previousImages = [];

let generatedImageUrl = null;
let customApiKey = localStorage.getItem('clipdrop_api_key') || "";

if (customApiKey) {
    apiKeyInput.value = "********";
}

apiKeyBtn.addEventListener('click', () => {
    const val = apiKeyInput.value.trim();
    if (val && val !== "********") {
        customApiKey = val;
        localStorage.setItem('clipdrop_api_key', val);
        alert("API Key saved successfully!");
        apiKeyInput.value = "********";
    } else if (!val) {
        alert("Please enter a valid key.");
    }
});

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const prompt = document.getElementById("prompt-input").value.trim();
    const activeKey = customApiKey || "93ea5fc3968eb6c73181c6145bea530aeb2c6cbcb8fc393e7027861e35e9c28d064d41e19692a15156d366ec1fa2df9c";

    if (!customApiKey && freeImageGeneratedCount >= 2) {
        alert("Free tier limit (2) reached. Add your own key below to continue.");
        return;
    }

    if (!activeKey) {
        alert("No API key found. Please configure it below.");
        return;
    }

    // Disable button and show loading state
    submitBtn.disabled = true;
    const originalBtnText = submitBtn.textContent;
    submitBtn.textContent = "Generating...";
    submitBtn.classList.add('opacity-50', 'cursor-not-allowed');

    overlay.classList.remove('hidden');
    overlay.classList.add('flex');
    placeholder.classList.add('hidden');
    img.classList.add('hidden');

    const formData = new FormData();
    formData.append("prompt", prompt);
    try {
        const response = await fetch("https://clipdrop-api.co/text-to-image/v1", {
            method: "POST",
            headers: {
                "x-api-key": activeKey
            },
            body: formData
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.error || "API request failed");
        }

        const blob = await response.blob();
        if (generatedImageUrl) URL.revokeObjectURL(generatedImageUrl);
        generatedImageUrl = URL.createObjectURL(blob);
        previousImages.push(generatedImageUrl);

        img.onload = () => {
            overlay.classList.remove('flex');
            overlay.classList.add('hidden');
            img.classList.remove('hidden');
            container.classList.remove('border-indigo-500/30');

            if (!customApiKey) {
                freeImageGeneratedCount++;
                localStorage.setItem('free_gen_count', freeImageGeneratedCount);
            }

            // Sync the History UI
            renderHistory();

            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        };

        img.onerror = () => {
            overlay.classList.add('hidden');
            alert("Failed to load the generated image.");
            submitBtn.disabled = false;
            submitBtn.textContent = originalBtnText;
            submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
        };

        img.src = generatedImageUrl;

    } catch (error) {
        console.error("Error generating image:", error);
        overlay.classList.add('hidden');
        alert(`Error: ${error.message}. Check your API key or limit.`);

        // Re-enable button on error
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
        submitBtn.classList.remove('opacity-50', 'cursor-not-allowed');
    }
});

downloadBtn.addEventListener('click', () => {
    if (!generatedImageUrl) {
        alert("Please generate an image first!");
        return;
    }
    const a = document.createElement("a");
    a.href = generatedImageUrl;
    a.download = "imagine-ai-generation.png";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
});

const renderHistory = () => {
    if (previousImages.length > 0) {
        historySection.classList.remove('hidden');
        historyList.innerHTML = "";

        previousImages.forEach((image, index) => {
            const div = document.createElement("div");
            div.className = "relative group rounded-xl overflow-hidden bg-white/5 border border-white/10 hover:border-indigo-500/50 transition-all duration-300 shadow-xl";

            const img = document.createElement("img");
            img.src = image;
            img.alt = `Generated Image ${index + 1}`;
            img.className = "w-full h-full object-cover transition-transform duration-500 group-hover:scale-110";

            const btn = document.createElement("button");
            btn.className = "absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-white p-2.5 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-indigo-600";
            btn.title = "Download Image";
            btn.innerHTML = `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3V15"></path><path d="M7 10L12 15L17 10"></path><path d="M5 21H19"></path></svg>`;

            btn.onclick = () => {
                const a = document.createElement("a");
                a.href = image;
                a.download = `imagine-ai-${index + 1}.png`;
                a.click();
            };

            div.appendChild(img);
            div.appendChild(btn);
            historyList.appendChild(div);
        });
    }
};

renderHistory();