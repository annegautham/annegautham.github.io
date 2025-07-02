function initInteractivePfp() {
  console.log("✅ switchPfp.js loaded");

  const profile = document.getElementById("profile");
  if (!profile) {
    console.warn("❌ Could not find profile element");
    return;
  }

  const images = JSON.parse(profile.dataset.images || "[]");
  if (!images.length) {
    console.warn("❌ No images found in dataset");
    return;
  }

  let index = 0;

  profile.addEventListener("click", () => {
    index = (index + 1) % images.length;
    profile.style.backgroundImage = `url(${images[index]})`;
    console.log("Switched to:", images[index]);
  });
}

initInteractivePfp();
