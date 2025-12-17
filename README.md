# Naveen Kumar - Portfolio 🚀

A premium, visually stunning portfolio website built with React and Chakra UI. Features smooth animations, gradients, and a fully dynamic content management system.

![Tech Stack](https://img.shields.io/badge/React-18-blue)
![Chakra UI](https://img.shields.io/badge/Chakra_UI-2.8-teal)
![Vite](https://img.shields.io/badge/Vite-5.0-purple)

## ✨ Features

- 🎨 **Premium Design** - Gradient backgrounds, smooth animations, modern UI
- 📱 **Fully Responsive** - Looks perfect on all devices
- 🎬 **Video Support** - Add video evidence for projects and experience
- ⚡ **Fast & Optimized** - Built with Vite for blazing-fast performance
- 🎯 **Easy to Update** - Dynamic content management through data files
- 🚀 **Deploy Ready** - GitHub Pages deployment with one command

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to GitHub Pages
npm run deploy
```

👉 **For detailed instructions, see [QUICKSTART.md](QUICKSTART.md)**

## 📝 Customize Your Portfolio

All content is in `src/data/` folder:
- `profile.js` - Personal information & social links
- `skills.js` - Technical skills by category
- `experience.js` - Work experience with video support
- `projects.js` - Projects with demos & videos
- `education.js` - Educational background

**Just edit these files** - no need to touch any component code!

## 🎥 Adding Videos & Images

Simply add YouTube embed URLs or image URLs to your data files:

```javascript
videoUrl: "https://www.youtube.com/embed/VIDEO_ID",
thumbnailUrl: "https://your-image-url.com/image.jpg"
```

## 🌐 Deployment

### Automatic (GitHub Actions) ✅ Recommended

1. Push to GitHub
2. Enable GitHub Pages (Settings → Pages → Source: GitHub Actions)
3. Done! Auto-deploys on every push

### Manual

```bash
npm run deploy
```

📖 **Detailed deployment guide:** [DEPLOYMENT.md](DEPLOYMENT.md)

## 🛠️ Tech Stack

- **Framework:** React 18
- **UI Library:** Chakra UI 2.8
- **Animations:** Framer Motion
- **Build Tool:** Vite 5
- **Icons:** React Icons
- **Deployment:** GitHub Pages

## 📂 Project Structure

```
portfolio/
├── src/
│   ├── components/      # React components (Navbar, Hero, Skills, etc.)
│   ├── data/           # Content management (edit these files!)
│   ├── theme.js        # Chakra UI theme customization
│   └── App.jsx         # Main app
├── .github/workflows/  # GitHub Actions for auto-deployment
└── public/             # Static assets
```

## 🎨 Customization

- **Colors:** Edit `src/theme.js`
- **Animations:** Modify component files
- **Content:** Update `src/data/` files
- **Sections:** Add/remove components in `src/App.jsx`

## 📊 Sections Included

✅ Hero with animated gradients
✅ About with key stats
✅ Skills organized by category
✅ Experience with detailed achievements
✅ Projects with video support
✅ Education timeline
✅ Contact information
✅ Footer with social links

## 📱 Screenshots

Your portfolio includes:
- Smooth scroll animations
- Hover effects on all interactive elements
- Responsive navigation
- Premium gradient backgrounds
- Video embeds for project showcases

## 🐛 Troubleshooting

See [QUICKSTART.md](QUICKSTART.md#-troubleshooting) for common issues and solutions.

## 📧 Contact

Built for **Naveen Kumar**
- Email: naveendev250@gmail.com
- GitHub: [iNew-b-yte](https://github.com/iNew-b-yte)
- LinkedIn: [naveen-kumar-3a0b57130](https://linkedin.com/in/naveen-kumar-3a0b57130)

## 📄 License

MIT - Feel free to use this template for your own portfolio!

---

⭐ If you found this helpful, consider giving it a star!

