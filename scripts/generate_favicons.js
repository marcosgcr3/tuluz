import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

async function generateFavicons() {
  const sourceImage = 'public/icono.png';
  console.log('Reading source icon:', sourceImage);

  const sizes = [
    { size: 16, name: 'favicon-16x16.png' },
    { size: 32, name: 'favicon-32x32.png' },
    { size: 48, name: 'favicon-48x48.png' },
    { size: 48, name: 'favicon.png' },
    { size: 96, name: 'favicon-96x96.png' },
    { size: 180, name: 'apple-touch-icon.png' },
    { size: 192, name: 'favicon-192x192.png' },
    { size: 512, name: 'favicon-512x512.png' }
  ];

  for (const item of sizes) {
    const outPath = path.join('public', item.name);
    await sharp(sourceImage)
      .resize(item.size, item.size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
      .png()
      .toFile(outPath);
    console.log(`Generated: ${item.name} (${item.size}x${item.size})`);
  }

  // Create favicon.ico from 48x48 png
  const icoPath = path.join('public', 'favicon.ico');
  const buffer48 = await sharp(sourceImage)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer();
  
  // Write favicon.ico directly
  fs.writeFileSync(icoPath, buffer48);
  console.log('Generated: favicon.ico');

  // Create site.webmanifest
  const manifest = {
    name: "tuLuz - Asesoramiento Energético",
    short_name: "tuLuz",
    description: "Asesoramiento Energético Gratuito en Luz, Gas y Autoconsumo Solar para Hogares, Empresas y Comunidades en toda España.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#4CAF4F",
    icons: [
      {
        src: "/favicon-192x192.png",
        sizes: "192x192",
        type: "image/png"
      },
      {
        src: "/favicon-512x512.png",
        sizes: "512x512",
        type: "image/png"
      }
    ]
  };

  fs.writeFileSync('public/site.webmanifest', JSON.stringify(manifest, null, 2));
  console.log('Generated: public/site.webmanifest');
}

generateFavicons().catch(err => {
  console.error('Error generating favicons:', err);
  process.exit(1);
});
