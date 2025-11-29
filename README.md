# MCQ Exam Application

A complete, production-ready React + TypeScript MCQ exam application built with Vite, featuring 213 questions with navigation, skip functionality, and real-time progress tracking.

## 🚀 Features

- **213 MCQ Questions** with single-choice answers
- **Question Navigator** - Visual grid showing status of all questions
- **Skip Functionality** - Skip questions and return to them later
- **Real-time Progress Tracking** - See correct/wrong/skipped counts
- **Keyboard Navigation** - Use arrow keys, number keys, and Enter
- **Responsive Design** - Mobile-first, works on all devices
- **Accessibility** - ARIA labels, focus states, keyboard navigation
- **Educational Modal** - Intro screen before exam starts
- **Final Score Screen** - Detailed results with percentage
- **TypeScript** - Fully typed with strict mode enabled

## 📋 Prerequisites

- Node.js (v16 or higher)
- npm or yarn

## 🛠️ Installation

1. **Clone or download this repository**

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Convert PDF to JSON** (See section below)

## 📄 Converting PDF to JSON

### Option 1: Automatic Conversion (Recommended to try first)

1. Install pdf-parse dependency:
   ```bash
   npm install pdf-parse
   ```

2. Run the conversion script:
   ```bash
   npm run convert-pdf
   ```

3. The script will:
   - Extract text from `GE_MCQ_UNIT_1,2.pdf`
   - Save raw text to `pdf-raw-text.txt` for review
   - Attempt to parse questions automatically
   - Save results to `public/questions.json`

4. **Important**: Review the output and manually correct any parsing errors.

### Option 2: Manual Conversion (If automatic fails)

1. Open the PDF file `GE_MCQ_UNIT_1,2.pdf`

2. Create/edit `public/questions.json` with this structure:

```json
[
  {
    "id": 1,
    "question": "What is the capital of France?",
    "options": [
      "London",
      "Paris",
      "Berlin",
      "Madrid"
    ],
    "answerIndex": 1
  },
  {
    "id": 2,
    "question": "Which programming language is known for web development?",
    "options": [
      "Python",
      "JavaScript",
      "C++",
      "Java"
    ],
    "answerIndex": 1
  }
]
```

**Important Notes:**
- `id`: Unique identifier (1, 2, 3, ...)
- `question`: The question text
- `options`: Array of exactly 4 options
- `answerIndex`: Zero-based index (0 = first option, 1 = second, etc.)

3. Continue for all 213 questions

## 🏃 Running the Application

### Development Mode

```bash
npm run dev
```

Opens at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` folder.

### Preview Production Build

```bash
npm run preview
```

## 🌐 Deploying to Netlify

### Method 1: Drag and Drop (Easiest)

1. Build the project:
   ```bash
   npm run build
   ```

2. Go to [Netlify](https://app.netlify.com/)

3. Drag and drop the `dist` folder to Netlify's deploy zone

4. Your site is live! 🎉

### Method 2: Git Integration (Recommended for continuous deployment)

1. Push your code to GitHub/GitLab/Bitbucket

2. Go to [Netlify](https://app.netlify.com/) and click "New site from Git"

3. Connect your repository

4. Configure build settings:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Node version**: 18 (or your version)

5. Click "Deploy site"

6. Netlify will automatically rebuild on every push!

### Method 3: Netlify CLI

1. Install Netlify CLI:
   ```bash
   npm install -g netlify-cli
   ```

2. Build the project:
   ```bash
   npm run build
   ```

3. Deploy:
   ```bash
   netlify deploy --prod --dir=dist
   ```

### Environment Variables

This project doesn't require environment variables. If you add any in the future:

1. In Netlify dashboard, go to Site settings > Environment variables
2. Add your variables
3. Redeploy the site

## 📁 Project Structure

```
yash_web/
├── public/
│   └── questions.json          # Question data (213 questions)
├── scripts/
│   └── pdf-to-json.js          # PDF conversion script
├── src/
│   ├── components/
│   │   ├── ConfirmQuit.tsx     # Quit confirmation modal
│   │   ├── ModalIntro.tsx      # Introduction modal
│   │   ├── ProgressBar.tsx     # Progress statistics
│   │   ├── QuestionCard.tsx    # Question display
│   │   ├── Result.tsx          # Final score screen
│   │   └── StatusTracker.tsx   # Question navigation grid
│   ├── App.css                 # Global styles
│   ├── App.tsx                 # Main application
│   ├── main.tsx                # Entry point
│   ├── types.ts                # TypeScript interfaces
│   └── vite-env.d.ts           # Vite types
├── index.html                  # HTML template
├── package.json                # Dependencies
├── tsconfig.json               # TypeScript config
├── vite.config.ts              # Vite config
├── GE_MCQ_UNIT_1,2.pdf         # Source PDF
└── README.md                   # This file
```

## 🎮 How to Use the App

1. **Start**: Click "Continue" on the intro modal
2. **Answer**: Select an option and click "Submit Answer"
3. **Feedback**: See if you're correct (green) or wrong (red)
4. **Navigate**: 
   - Click "Next" to move forward
   - Click "Skip" to skip a question
   - Click any number in the status grid to jump to that question
5. **Track Progress**: Monitor your stats in the progress bar
6. **Quit**: Click "Quit" button to end exam early
7. **Results**: View final score and restart if desired

## ⌨️ Keyboard Shortcuts

- **1-4**: Select option 1-4
- **Arrow Up/Down**: Navigate options
- **Enter**: Submit answer
- **Tab**: Navigate between elements

## 🎨 Customization

### Change Colors

Edit `src/App.css`:
- Primary gradient: `.btn-primary` and `body` background
- Correct color: `#28a745`
- Wrong color: `#dc3545`
- Skip color: `#ffc107`

### Change Number of Questions

Update `public/questions.json` with your desired number of questions. The app automatically adapts.

### Modify Question Format

Edit `src/types.ts` to add new fields to the `Question` interface.

## 🧪 Testing

The code is structured for easy testing:
- Components are pure and receive props
- State management is centralized in `App.tsx`
- TypeScript ensures type safety

To add tests, install a testing library:
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

## 🐛 Troubleshooting

### Questions not loading
- Ensure `public/questions.json` exists
- Check browser console for errors
- Verify JSON is valid (use JSONLint.com)

### Build fails
- Delete `node_modules` and `package-lock.json`
- Run `npm install` again
- Ensure Node.js version is 16+

### Netlify deploy fails
- Check build logs in Netlify dashboard
- Ensure `dist` folder is set as publish directory
- Verify build command is `npm run build`

## 📝 License

This project is for educational purposes.

## 🤝 Contributing

Feel free to fork, modify, and use this project for your educational needs!

## 📧 Support

If you encounter issues:
1. Check the troubleshooting section
2. Review browser console for errors
3. Ensure all dependencies are installed
4. Verify `questions.json` format is correct

---

**Built with ❤️ using React, TypeScript, and Vite**
