import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';

const providers = [
  { id: "endesa", name: "Endesa", domain: "endesa.com" },
  { id: "iberdrola", name: "Iberdrola", domain: "iberdrola.es" },
  { id: "naturgy", name: "Naturgy", domain: "naturgy.es" },
  { id: "repsol", name: "Repsol", domain: "repsol.es" },
  { id: "totalenergies", name: "TotalEnergies", domain: "totalenergies.es" },
  { id: "plenitude", name: "Plenitude", domain: "eniplenitude.es" },
  { id: "audax", name: "Audax Renovables", domain: "audaxrenovables.com" },
  { id: "holaluz", name: "HolaLuz", domain: "holaluz.com" },
  { id: "gns-energy", name: "GNS Energy", domain: "gnsenergy.es" },
  { id: "fenie", name: "Fenie Energía", domain: "fenieenergia.es" },
  { id: "octopus", name: "Octopus Energy", domain: "octopusenergy.es" },
  { id: "lucera", name: "Lucera", domain: "lucera.es" },
  { id: "imagenerat", name: "Imagenerat", domain: "imagenerat.es" },
  { id: "energyav", name: "EnergyAV", domain: "energyav.es" },
  { id: "factorenergia", name: "Factor Energía", domain: "factorenergia.com" },
  { id: "gana-energia", name: "Gana Energía", domain: "ganaenergia.com" },
  { id: "mega-energia", name: "Mega Energía", domain: "megaenergia.es" },
  { id: "novaluz", name: "Novaluz Energía", domain: "novaluz.es" },
  { id: "net-energy", name: "Net Energy", domain: "net-energia.es" },
  { id: "kleen-energy", name: "Kleen Energy", domain: "kleenenergy.es" },
  { id: "unielectrica", name: "Unieléctrica", domain: "unielectrica.com" },
  { id: "iberelectrica", name: "Ibereléctrica Energía", domain: "iberelectrica.es" }
];

const logosDir = path.resolve('public/logos');

async function downloadLogo(provider) {
  if (provider.id === 'net-energy') {
    console.log(`✓ [${provider.name}] Using already created SVG.`);
    return;
  }

  const urls = [
    `https://unavatar.io/${provider.domain}?fallback=false`,
    `https://www.google.com/s2/favicons?domain=${provider.domain}&sz=128`,
    `https://logo.clearbit.com/${provider.domain}`
  ];

  let buffer = null;

  for (const url of urls) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (res.ok) {
        const arrayBuf = await res.arrayBuffer();
        const buf = Buffer.from(arrayBuf);
        if (buf.length > 200) {
          buffer = buf;
          break;
        }
      }
    } catch (e) {
      // try next
    }
  }

  if (buffer) {
    const outputPath = path.join(logosDir, `${provider.id}.webp`);
    try {
      await sharp(buffer)
        .resize(128, 128, { fit: 'contain', background: { r: 255, g: 255, b: 255, alpha: 0 } })
        .webp({ quality: 90 })
        .toFile(outputPath);
      console.log(`✓ [${provider.name}] Saved logo -> public/logos/${provider.id}.webp`);
    } catch (err) {
      console.error(`✗ [${provider.name}] Sharp error:`, err.message);
      // fallback save raw png
      await fs.writeFile(path.join(logosDir, `${provider.id}.png`), buffer);
    }
  } else {
    console.warn(`! [${provider.name}] Could not download logo.`);
  }
}

async function main() {
  await fs.mkdir(logosDir, { recursive: true });
  for (const provider of providers) {
    await downloadLogo(provider);
  }
}

main().catch(console.error);
