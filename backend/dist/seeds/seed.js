"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("../generated/prisma");
const prisma = new prisma_1.PrismaClient();
// Import existing data
const quizzesData = [
    {
        id: 'general-knowledge',
        title: 'General Knowledge',
        description: 'Test your knowledge across various topics including geography, history, and more.',
        category: 'General',
        difficulty: 'easy',
        questionCount: 10,
    },
    {
        id: 'science',
        title: 'Science Quiz',
        description: 'Explore questions about physics, chemistry, biology, and the natural world.',
        category: 'Science',
        difficulty: 'medium',
        questionCount: 10,
    },
    {
        id: 'programming',
        title: 'Programming Fundamentals',
        description: 'Test your programming knowledge with questions about languages and concepts.',
        category: 'Technology',
        difficulty: 'medium',
        questionCount: 10,
    },
];
const questionsData = [
    // General Knowledge Questions
    {
        quizId: 'general-knowledge',
        questionText: 'What is the capital of France?',
        optionA: 'London',
        optionB: 'Berlin',
        optionC: 'Paris',
        optionD: 'Madrid',
        correctOption: 'c',
        orderIndex: 1,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'Which planet is known as the Red Planet?',
        optionA: 'Venus',
        optionB: 'Mars',
        optionC: 'Jupiter',
        optionD: 'Saturn',
        correctOption: 'b',
        orderIndex: 2,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'What is 2 + 2?',
        optionA: '3',
        optionB: '4',
        optionC: '5',
        optionD: '6',
        correctOption: 'b',
        orderIndex: 3,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'Who wrote "Romeo and Juliet"?',
        optionA: 'Charles Dickens',
        optionB: 'William Shakespeare',
        optionC: 'Jane Austen',
        optionD: 'Mark Twain',
        correctOption: 'b',
        orderIndex: 4,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'What is the largest ocean on Earth?',
        optionA: 'Atlantic Ocean',
        optionB: 'Indian Ocean',
        optionC: 'Arctic Ocean',
        optionD: 'Pacific Ocean',
        correctOption: 'd',
        orderIndex: 5,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'What year did World War II end?',
        optionA: '1943',
        optionB: '1944',
        optionC: '1945',
        optionD: '1946',
        correctOption: 'c',
        orderIndex: 6,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'What is the smallest prime number?',
        optionA: '0',
        optionB: '1',
        optionC: '2',
        optionD: '3',
        correctOption: 'c',
        orderIndex: 7,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'Which element has the chemical symbol "O"?',
        optionA: 'Gold',
        optionB: 'Oxygen',
        optionC: 'Silver',
        optionD: 'Osmium',
        correctOption: 'b',
        orderIndex: 8,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'How many continents are there?',
        optionA: '5',
        optionB: '6',
        optionC: '7',
        optionD: '8',
        correctOption: 'c',
        orderIndex: 9,
    },
    {
        quizId: 'general-knowledge',
        questionText: 'In which year did the Titanic sink?',
        optionA: '1910',
        optionB: '1912',
        optionC: '1914',
        optionD: '1916',
        correctOption: 'b',
        orderIndex: 10,
    },
    // Science Questions
    {
        quizId: 'science',
        questionText: 'What is the chemical formula for water?',
        optionA: 'H2O',
        optionB: 'CO2',
        optionC: 'O2',
        optionD: 'H2O2',
        correctOption: 'a',
        orderIndex: 1,
    },
    {
        quizId: 'science',
        questionText: 'What is the speed of light in vacuum?',
        optionA: '300,000 km/s',
        optionB: '150,000 km/s',
        optionC: '450,000 km/s',
        optionD: '600,000 km/s',
        correctOption: 'a',
        orderIndex: 2,
    },
    {
        quizId: 'science',
        questionText: 'What force keeps planets in orbit around the sun?',
        optionA: 'Magnetic force',
        optionB: 'Gravitational force',
        optionC: 'Nuclear force',
        optionD: 'Electrical force',
        correctOption: 'b',
        orderIndex: 3,
    },
    {
        quizId: 'science',
        questionText: 'What is the powerhouse of the cell?',
        optionA: 'Nucleus',
        optionB: 'Ribosome',
        optionC: 'Mitochondria',
        optionD: 'Chloroplast',
        correctOption: 'c',
        orderIndex: 4,
    },
    {
        quizId: 'science',
        questionText: 'What is the atomic number of Carbon?',
        optionA: '4',
        optionB: '6',
        optionC: '8',
        optionD: '12',
        correctOption: 'b',
        orderIndex: 5,
    },
    {
        quizId: 'science',
        questionText: 'What type of animal is a dolphin?',
        optionA: 'Fish',
        optionB: 'Amphibian',
        optionC: 'Reptile',
        optionD: 'Mammal',
        correctOption: 'd',
        orderIndex: 6,
    },
    {
        quizId: 'science',
        questionText: 'What is the hardest natural substance on Earth?',
        optionA: 'Gold',
        optionB: 'Iron',
        optionC: 'Diamond',
        optionD: 'Quartz',
        correctOption: 'c',
        orderIndex: 7,
    },
    {
        quizId: 'science',
        questionText: 'What gas do plants absorb from the atmosphere?',
        optionA: 'Oxygen',
        optionB: 'Nitrogen',
        optionC: 'Carbon Dioxide',
        optionD: 'Hydrogen',
        correctOption: 'c',
        orderIndex: 8,
    },
    {
        quizId: 'science',
        questionText: 'What is the study of earthquakes called?',
        optionA: 'Meteorology',
        optionB: 'Seismology',
        optionC: 'Geology',
        optionD: 'Volcanology',
        correctOption: 'b',
        orderIndex: 9,
    },
    {
        quizId: 'science',
        questionText: 'How many bones are in the adult human body?',
        optionA: '186',
        optionB: '206',
        optionC: '226',
        optionD: '246',
        correctOption: 'b',
        orderIndex: 10,
    },
    // Programming Questions
    {
        quizId: 'programming',
        questionText: 'What does HTML stand for?',
        optionA: 'Hyper Text Markup Language',
        optionB: 'High Tech Modern Language',
        optionC: 'Home Tool Markup Language',
        optionD: 'Hyperlinks and Text Markup Language',
        correctOption: 'a',
        orderIndex: 1,
    },
    {
        quizId: 'programming',
        questionText: 'Which programming language is known for its use in web development?',
        optionA: 'Python',
        optionB: 'JavaScript',
        optionC: 'C++',
        optionD: 'Java',
        correctOption: 'b',
        orderIndex: 2,
    },
    {
        quizId: 'programming',
        questionText: 'What does CSS stand for?',
        optionA: 'Computer Style Sheets',
        optionB: 'Creative Style Sheets',
        optionC: 'Cascading Style Sheets',
        optionD: 'Colorful Style Sheets',
        correctOption: 'c',
        orderIndex: 3,
    },
    {
        quizId: 'programming',
        questionText: 'What is a variable in programming?',
        optionA: 'A fixed value',
        optionB: 'A container for storing data',
        optionC: 'A type of loop',
        optionD: 'A function',
        correctOption: 'b',
        orderIndex: 4,
    },
    {
        quizId: 'programming',
        questionText: 'Which symbol is used for comments in JavaScript?',
        optionA: '/* */',
        optionB: '# ',
        optionC: '<!-- -->',
        optionD: '// ',
        correctOption: 'd',
        orderIndex: 5,
    },
    {
        quizId: 'programming',
        questionText: 'What does API stand for?',
        optionA: 'Application Programming Interface',
        optionB: 'Advanced Programming Interface',
        optionC: 'Application Process Integration',
        optionD: 'Automated Programming Interface',
        correctOption: 'a',
        orderIndex: 6,
    },
    {
        quizId: 'programming',
        questionText: 'Which data structure uses LIFO (Last In First Out)?',
        optionA: 'Queue',
        optionB: 'Stack',
        optionC: 'Array',
        optionD: 'Linked List',
        correctOption: 'b',
        orderIndex: 7,
    },
    {
        quizId: 'programming',
        questionText: 'What is the purpose of a loop in programming?',
        optionA: 'To declare variables',
        optionB: 'To repeat code multiple times',
        optionC: 'To create functions',
        optionD: 'To handle errors',
        correctOption: 'b',
        orderIndex: 8,
    },
    {
        quizId: 'programming',
        questionText: 'What does SQL stand for?',
        optionA: 'Structured Query Language',
        optionB: 'Simple Query Language',
        optionC: 'Standard Query Language',
        optionD: 'System Query Language',
        correctOption: 'a',
        orderIndex: 9,
    },
    {
        quizId: 'programming',
        questionText: 'Which of these is NOT a programming paradigm?',
        optionA: 'Object-Oriented',
        optionB: 'Functional',
        optionC: 'Procedural',
        optionD: 'Circular',
        correctOption: 'd',
        orderIndex: 10,
    },
];
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log('🌱 Starting database seed...');
        try {
            console.log('🗑️  Clearing existing data...');
            yield prisma.question.deleteMany({});
            yield prisma.quiz.deleteMany({});
            console.log('📚 Seeding quizzes...');
            for (const quiz of quizzesData) {
                yield prisma.quiz.create({
                    data: quiz,
                });
            }
            console.log('❓ Seeding questions...');
            yield prisma.question.createMany({
                data: questionsData,
            });
            console.log('✅ Database seeded successfully!');
            console.log(`   - ${quizzesData.length} quizzes created`);
            console.log(`   - ${questionsData.length} questions created`);
        }
        catch (error) {
            console.error('❌ Error seeding database:', error);
            throw error;
        }
    });
}
main()
    .catch((e) => {
    console.error(e);
    process.exit(1);
})
    .finally(() => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma.$disconnect();
}));
