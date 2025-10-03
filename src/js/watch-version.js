const versionEl = document.querySelector("#app-version");

try {
    const response = await fetch('../version.json');

    if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
    }

    const data = await response.json();
    versionEl.append(data.version);

} catch (error) {
    console.error("Не вдалося завантажити версію:", error);
    versionEl.append("Error loading version");
}