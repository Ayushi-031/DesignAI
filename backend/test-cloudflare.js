import "dotenv/config";
import fs from "fs";

const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
const apiToken = process.env.CLOUDFLARE_API_TOKEN;
const imageUrl = "https://res.cloudinary.com/uveev792/image/upload/v1790689447/designAI/rooms/gmomvdm0vnwdjxtwmgdk.jpg";
console.log("Account ID present:", !!accountId);
console.log("API Token present:", !!apiToken);

try {
  // Download original room image
  const imageResponse = await fetch(imageUrl);

  if (!imageResponse.ok) {
    throw new Error(
      `Failed to download image: ${imageResponse.status}`
    );
  }

  const imageBuffer = await imageResponse.arrayBuffer();

  // Create form data
  const form = new FormData();

  form.append(
    "prompt",
    `
Redesign this exact room as a modern luxury interior.

Keep the room architecture, walls, windows, doors,
camera angle and overall layout unchanged.

Use:
- warm beige colors
- sage green furniture
- wooden elements
- warm ambient lighting
- elegant minimal decor

Make it photorealistic.

The result should look like the SAME ROOM redesigned,
not a completely different room.
`
  );

  form.append(
    "input_image_0",
    new Blob([imageBuffer], {
      type:
        imageResponse.headers.get("content-type") ||
        "image/jpeg"
    }),
    "room.jpg"
  );

  form.append("width", "1024");
  form.append("height", "768");

  console.log(
    "Sending image to Cloudflare FLUX.2 Klein..."
  );

  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${accountId}/ai/run/@cf/black-forest-labs/flux-2-klein-4b`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiToken}`
      },
      body: form
    }
  );

  console.log("Status:", response.status);
  console.log(
    "Content-Type:",
    response.headers.get("content-type")
  );

  if (!response.ok) {
    console.log("Cloudflare error:");
    console.log(await response.text());
    process.exit(1);
  }

  // IMPORTANT:
  // Cloudflare returned JSON, so don't save response.arrayBuffer()
  // directly as PNG.
  const result = await response.json();

  console.log("Cloudflare response received.");

  console.log(
    "Response keys:",
    Object.keys(result)
  );

  // Check where the image data is stored
  let imageData = null;

  if (result.result) {
    console.log(
      "Result keys:",
      Object.keys(result.result)
    );

    imageData =
      result.result.image ||
      result.result.image_b64 ||
      result.result.output ||
      result.result.data;
  }

  if (!imageData) {
    console.log(
      "Could not find image data in response."
    );

    console.log(
      JSON.stringify(result, null, 2).substring(0, 5000)
    );

    process.exit(1);
  }

  // Convert base64 → actual image
  const outputBuffer = Buffer.from(
    imageData,
    "base64"
  );

  fs.writeFileSync(
    "cloudflare-output.png",
    outputBuffer
  );

  console.log(
    "SUCCESS! Actual image saved as:"
  );

  console.log(
    "backend/cloudflare-output.png"
  );

} catch (error) {
  console.error(
    "Test failed:",
    error
  );
}