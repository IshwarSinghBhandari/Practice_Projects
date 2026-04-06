const form = document.getElementById('image-form');
const overlay = document.getElementById('loading-overlay');
const img = document.getElementById('output-image');
const placeholder = document.getElementById('placeholder');
const container = document.getElementById('preview-container');
const downloadBtn = document.getElementById('download-btn');
const apiKeyInput = document.getElementById('api-key-input');
const apiKeyBtn = document.getElementById('api-key-btn');
let freeImageGeneratedCount = parseInt(localStorage.getItem('free_gen_count') || '0', 10);

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
    console.log(prompt);
    const activeKey = customApiKey || "93ea5fc3968eb6c73181c6145bea530aeb2c6cbcb8fc393e7027861e35e9c28d064d41e19692a15156d366ec1fa2df9c";

    if (!customApiKey && freeImageGeneratedCount >= 2) {
        alert("Free tier limit (2) reached. Add your own key below to continue.");
        return;
    }

    if (!activeKey) {
        alert("No API key found. Please configure it below.");
        return;
    }

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

        img.onload = () => {
            overlay.classList.add('hidden');
            img.classList.remove('hidden');
            container.classList.remove('border-indigo-500/30');

            if (!customApiKey) {
                freeImageGeneratedCount++;
                localStorage.setItem('free_gen_count', freeImageGeneratedCount);
            }
        };

        img.src = generatedImageUrl;

    } catch (error) {
        console.error("Error generating image:", error);
        overlay.classList.add('hidden');
        alert(`Error: ${error.message}. Check your API key or limit.`);
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
