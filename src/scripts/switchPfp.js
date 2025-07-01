export default function initInteractivePfp() {
  const profile = document.getElementById("profile");
  if (!profile) return;

  const images = JSON.parse(profile.dataset.images);
  let index = 0;

  profile.addEventListener("click", () => {
    index = (index + 1) % images.length;
    profile.style.backgroundImage = `url(${images[index]})`;
  });
}
