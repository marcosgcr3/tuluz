import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const publicDir = path.resolve('public');

async function optimizeImages() {
  console.log('Optimizing images in public directory...');

  // 1. icono.png -> icono.webp (small size, high quality) & compressed icono.png
  if (fs.existsSync(path.join(publicDir, 'icono.png'))) {
    const iconBuf = fs.readFileSync(path.join(publicDir, 'icono.png'));
    
    // WebP 128x128 for crisp display on retina up to 64x64
    await sharp(iconBuf)
      .resize(128, 128, { fit: 'inside' })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(publicDir, 'icono.webp'));
      
    // Overwrite icono.png with highly optimized 128x128 png for fallbacks
    await sharp(iconBuf)
      .resize(128, 128, { fit: 'inside' })
      .png({ compressionLevel: 9, effort: 10, palette: true })
      .toFile(path.join(publicDir, 'icono-opt.png'));

    fs.copyFileSync(path.join(publicDir, 'icono-opt.png'), path.join(publicDir, 'icono.png'));
    fs.unlinkSync(path.join(publicDir, 'icono-opt.png'));
    console.log('icono.webp & icono.png generated');
  }

  // 2. logo.png -> logo.webp & compressed logo.png
  if (fs.existsSync(path.join(publicDir, 'logo.png'))) {
    const logoBuf = fs.readFileSync(path.join(publicDir, 'logo.png'));
    
    await sharp(logoBuf)
      .resize(500, null, { withoutEnlargement: true })
      .webp({ quality: 85, effort: 6 })
      .toFile(path.join(publicDir, 'logo.webp'));

    await sharp(logoBuf)
      .resize(500, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 10, palette: true })
      .toFile(path.join(publicDir, 'logo-opt.png'));

    fs.copyFileSync(path.join(publicDir, 'logo-opt.png'), path.join(publicDir, 'logo.png'));
    fs.unlinkSync(path.join(publicDir, 'logo-opt.png'));
    console.log('logo.webp & logo.png generated');
  }

  // 3. concepto-tuluz.png -> concepto-tuluz.webp & compressed concepto-tuluz.png
  if (fs.existsSync(path.join(publicDir, 'concepto-tuluz.png'))) {
    const conceptoBuf = fs.readFileSync(path.join(publicDir, 'concepto-tuluz.png'));
    
    await sharp(conceptoBuf)
      .resize(1200, null, { withoutEnlargement: true })
      .webp({ quality: 80, effort: 6 })
      .toFile(path.join(publicDir, 'concepto-tuluz.webp'));

    await sharp(conceptoBuf)
      .resize(1200, null, { withoutEnlargement: true })
      .png({ compressionLevel: 9, effort: 9, palette: true })
      .toFile(path.join(publicDir, 'concepto-opt.png'));

    fs.copyFileSync(path.join(publicDir, 'concepto-opt.png'), path.join(publicDir, 'concepto-tuluz.png'));
    fs.unlinkSync(path.join(publicDir, 'concepto-opt.png'));
    console.log('concepto-tuluz.webp & concepto-tuluz.png generated');
  }

  // 4. favicon.png
  if (fs.existsSync(path.join(publicDir, 'favicon.png'))) {
    const favBuf = fs.readFileSync(path.join(publicDir, 'favicon.png'));
    await sharp(favBuf)
      .resize(64, 64, { fit: 'inside' })
      .png({ compressionLevel: 9, palette: true })
      .toFile(path.join(publicDir, 'favicon-opt.png'));
    fs.copyFileSync(path.join(publicDir, 'favicon-opt.png'), path.join(publicDir, 'favicon.png'));
    fs.unlinkSync(path.join(publicDir, 'favicon-opt.png'));
    console.log('favicon.png optimized');
  }

  console.log('Image optimization finished successfully!');
}

optimizeImages().catch(console.error);
