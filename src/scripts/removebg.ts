const removebgConfig = {
    apiKey: import.meta.env.VITE_REMOVE_BG_API_KEY
}

// console.log("Key:", removebgConfig.apiKey)

async function removeBg(imageURL) {
  const formData = new FormData();
  formData.append("size", "auto");
  formData.append("image_url", imageURL);

  const response = await fetch("https://api.remove.bg/v1.0/removebg", {
    method: "POST",
    headers: { "X-Api-Key": removebgConfig.apiKey },
    body: formData,
  });

  if (response.ok) {
    return await response.arrayBuffer();
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export { removeBg }
