/**
 * PDF to JSON Converter Script
 * 
 * This script attempts to extract MCQ questions from a PDF file
 * and convert them to JSON format.
 * 
 * Usage: node scripts/pdf-to-json.js
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { createRequire } from 'module';

// Get __dirname equivalent in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Try to import pdf-parse using createRequire
const require = createRequire(import.meta.url);
let pdfParse;
try {
  pdfParse = require('pdf-parse');
} catch (error) {
  console.error('pdf-parse module not found. Please install it:');
  console.error('npm install pdf-parse');
  process.exit(1);
}

const DEFAULT_PDF = path.join(__dirname, '..', "GE MCQ's pdf.pdf");
const OUTPUT_PATH = path.join(__dirname, '..', 'public', 'questions.json');

function resolvePdfPath() {
  const argPath = process.argv[2];

  if (!argPath) {
    return DEFAULT_PDF;
  }

  return path.isAbsolute(argPath)
    ? argPath
    : path.join(__dirname, '..', argPath);
}

const PDF_PATH = resolvePdfPath();

if (!fs.existsSync(PDF_PATH)) {
  console.error(`PDF file not found at: ${PDF_PATH}`);
  console.error('Provide a valid path, e.g. npm run convert-pdf -- path/to/file.pdf');
  process.exit(1);
}

/**
 * Parse PDF and extract questions
 */
async function convertPdfToJson() {
  try {
    console.log(`Reading PDF file from: ${PDF_PATH}`);
    const dataBuffer = fs.readFileSync(PDF_PATH);

    console.log('Parsing PDF content...');
    const data = await pdfParse(dataBuffer);

    console.log('Extracted text length:', data.text.length);
    console.log('\n--- First 500 characters ---');
    console.log(data.text.substring(0, 500));
    console.log('\n--- End of preview ---\n');

    // Save raw text for manual processing
    const rawTextPath = path.join(__dirname, '..', 'pdf-raw-text.txt');
    fs.writeFileSync(rawTextPath, data.text);
    console.log(`Raw text saved to: ${rawTextPath}`);

    console.log('\n⚠️  MANUAL CONVERSION REQUIRED ⚠️');
    console.log('Due to complex PDF formatting, automatic extraction may not work perfectly.');
    console.log('Please follow these steps:');
    console.log('1. Review the raw text in pdf-raw-text.txt');
    console.log('2. Manually format questions into the JSON structure');
    console.log('3. Save the result as public/questions.json');
    console.log('\nSee public/questions.json for the required format.');

    // Attempt basic parsing (this is a simple example and may need adjustment)
    const questions = attemptAutoParse(data.text);

    if (questions.length > 0) {
      console.log(`\nFound ${questions.length} potential questions.`);
      console.log('Saving to:', OUTPUT_PATH);

      // Ensure public directory exists
      const publicDir = path.join(__dirname, '..', 'public');
      if (!fs.existsSync(publicDir)) {
        fs.mkdirSync(publicDir, { recursive: true });
      }

      fs.writeFileSync(OUTPUT_PATH, JSON.stringify(questions, null, 2));
      console.log('✓ Conversion complete!');
    } else {
      console.log('\nAutomatic parsing failed. Please convert manually.');
    }
  } catch (error) {
    console.error('Error converting PDF:', error);
    console.log('\n📝 Please convert the PDF manually using the template in public/questions.json');
  }
}

/**
 * Attempt to automatically parse questions from text
 * This is a basic implementation and may need customization based on PDF format
 */
function attemptAutoParse(text) {
  const questions = [];
  
  const lines = text.split('\n').map(line => line.trim()).filter(line => line);
  
  let currentQuestion = null;
  let questionId = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    
    // Detect question (starts with number followed by dot)
    if (/^\d+[\.\)]\s+/.test(line)) {
      if (currentQuestion && currentQuestion.options.length === 4) {
        questions.push(currentQuestion);
      }
      
      currentQuestion = {
        id: questionId++,
        question: line.replace(/^\d+[\.\)]\s+/, ''),
        options: [],
        answerIndex: 0 // Default
      };
    }
    // Detect options (starts with a), b), c), or d))
    else if (currentQuestion && /^[a-d][\)\]]/i.test(line)) {
      const option = line.replace(/^[a-d][\)\]]\s*/i, '');
      currentQuestion.options.push(option);
    }
    // Detect answer (contains ✅ Answer: or Answer:)
    else if (currentQuestion && /✅?\s*Answer:\s*[a-d]/i.test(line)) {
      const answerMatch = line.match(/Answer:\s*([a-d])/i);
      if (answerMatch) {
        const answerLetter = answerMatch[1].toLowerCase();
        const answerMap = { 'a': 0, 'b': 1, 'c': 2, 'd': 3 };
        currentQuestion.answerIndex = answerMap[answerLetter];
      }
    }
    // Handle wrapped lines (append to question or last option)
    else if (currentQuestion) {
      if (currentQuestion.options.length === 0) {
        currentQuestion.question = `${currentQuestion.question} ${line}`.trim();
      } else {
        const lastIndex = currentQuestion.options.length - 1;
        currentQuestion.options[lastIndex] = `${currentQuestion.options[lastIndex]} ${line}`.trim();
      }
    }
  }
  
  // Add last question
  if (currentQuestion && currentQuestion.options.length === 4) {
    questions.push(currentQuestion);
  }
  
  return questions;
}

// Run the conversion
convertPdfToJson();
