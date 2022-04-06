export function renderRecording(blob, list) {
  const blobUrl = URL.createObjectURL(blob);
  const li = document.createElement("li");
  const audio = document.createElement("audio");
  const anchor = document.createElement("a");
  anchor.setAttribute("href", blobUrl);
  const now = new Date();
  anchor.setAttribute(
    "download",
    `recording-${now.getFullYear()}-${(now.getMonth() + 1)
      .toString()
      .padStart(2, "0")}-${now.getDay().toString().padStart(2, "0")}--${now
      .getHours()
      .toString()
      .padStart(2, "0")}-${now.getMinutes().toString().padStart(2, "0")}-${now
      .getSeconds()
      .toString()
      .padStart(2, "0")}.webm`
  );
  anchor.innerText = "Download";
  audio.setAttribute("src", blobUrl);
  audio.setAttribute("controls", "controls");
  li.appendChild(audio);
  li.appendChild(anchor);
  list.appendChild(li);
}
