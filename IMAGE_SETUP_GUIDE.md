# Image Setup Guide for Why Chiranjiv Cards

This guide will help you download and set up the realistic images for the cards.

## 📁 Required Images

You need to download **4 images total** and place them in the `/public/images/` directory:

### 1. DNA Sequencing Image
**Filename:** `dna-sequencing.png`
**What to look for:** DNA helix, genetic testing kit, test tubes with DNA, or DNA emerging from a box

**Recommended Sources:**
- **Unsplash**: Search "DNA test kit" or "genetic testing"
  - https://unsplash.com/s/photos/dna-test-kit
  - https://unsplash.com/s/photos/dna-helix
  
- **Pexels**: Search "DNA laboratory" or "genetic testing"
  - https://www.pexels.com/search/dna/
  
- **Vecteezy** (PNG with transparent background):
  - https://www.vecteezy.com/free-png/dna-helix
  - Look for 3D realistic DNA helix images

**Image Tips:**
- Choose images with transparent backgrounds (PNG format)
- Look for blue/purple colored DNA for better brand match
- Ideal dimensions: 800x800px or larger
- Make sure it's high resolution for retina displays

---

### 2-4. Supplement Bottle Images
**Filenames:** 
- `supplement-bottle-1.png` (Main bottle)
- `supplement-bottle-2.png` (Second bottle)
- `supplement-bottle-3.png` (Third bottle)

**What to look for:** Clear, realistic supplement/vitamin bottles with visible pills/capsules inside

**Recommended Sources:**
- **Unsplash**: Search "supplement bottles" or "vitamins"
  - https://unsplash.com/s/photos/supplement-bottles
  - https://unsplash.com/s/photos/vitamin-bottles
  
- **Pexels**: Search "supplements" or "vitamin container"
  - https://www.pexels.com/search/supplement%20bottles/
  - https://www.pexels.com/search/vitamins/

- **Freepik** (may require attribution or premium):
  - https://www.freepik.com/search?format=search&query=supplement+bottles

**Image Tips:**
- PNG format with transparent or white background works best
- Choose bottles with different colors (e.g., amber, white, dark)
- Bottles should be upright/standing
- Ideal dimensions: 400x800px or similar portrait aspect ratio
- High resolution for clarity

---

## 📂 Installation Steps

### Step 1: Create the images folder
```bash
mkdir -p public/images
```

### Step 2: Download your chosen images
Download the 4 images from the sources above.

### Step 3: Rename and place the images
Place them in the `public/images/` folder with these exact names:
- `dna-sequencing.png`
- `supplement-bottle-1.png`
- `supplement-bottle-2.png`
- `supplement-bottle-3.png`

### Step 4: Verify the setup
Your folder structure should look like:
```
chiranjiv/
├── public/
│   └── images/
│       ├── dna-sequencing.png
│       ├── supplement-bottle-1.png
│       ├── supplement-bottle-2.png
│       └── supplement-bottle-3.png
└── src/
    └── components/
        └── why-chiranjiv.tsx
```

---

## 🎨 Image Optimization Tips

1. **Compress your images** before using them:
   - Use TinyPNG (https://tinypng.com/) to reduce file size
   - Aim for under 200KB per image

2. **Transparent backgrounds work best** for the overlaid aesthetic

3. **Test different images** to see which looks most premium with your UI

4. **Adjust opacity/size** in the code if needed:
   - DNA image: Located at line ~86-91 in `why-chiranjiv.tsx`
   - Supplement images: Located at line ~113-138 in `why-chiranjiv.tsx`

---

## 🔧 Customization

If you want to adjust the images after placing them, you can modify these properties in the code:

### DNA Image Adjustments:
```tsx
className="absolute bottom-0 right-0 w-3/4 h-2/3 object-contain opacity-35 group-hover:opacity-50 transition-all duration-700"
```
- `w-3/4`: Width (try w-1/2, w-full, etc.)
- `h-2/3`: Height
- `opacity-35`: Base opacity (0-100)
- `opacity-50`: Hover opacity

### Supplement Bottle Adjustments:
```tsx
// Bottle 1
className="... w-32 h-auto opacity-28 group-hover:opacity-48"

// Bottle 2
className="... w-28 h-auto opacity-25 group-hover:opacity-45"

// Bottle 3
className="... w-24 h-auto opacity-23 group-hover:opacity-43"
```

---

## ✅ Testing

After adding the images:
1. Start your development server: `npm run dev`
2. Navigate to the "Why Chiranjiv" section
3. You should see:
   - DNA image in the bottom-right of the large "Complete Genome Sequencing" card
   - 3 supplement bottles arranged on the right side of the "Personalized Supplements" card

---

## 🆘 Troubleshooting

**Images not showing?**
- Check the file paths are exactly as specified
- Ensure images are in `public/images/` not `src/images/`
- Check browser console for 404 errors
- Try hard refresh (Ctrl+Shift+R or Cmd+Shift+R)

**Images look blurry?**
- Use higher resolution images (at least 800px wide)
- Ensure images are PNG format, not JPG

**Images too bright/dark?**
- Adjust the `opacity-XX` values in the className
- Try images with transparent backgrounds

---

## 📝 License Note

Make sure any images you download are:
- Free for commercial use
- Don't require attribution (or add attribution if needed)
- Check the license on Unsplash, Pexels, etc.

Most images on Unsplash and Pexels are free for commercial use without attribution, but always verify!

