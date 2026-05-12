export const courses = [
    {
        id: 'fullstack-dev',
        title: 'Full Stack Development',
        description: 'Complete path from Front-end to Back-end using modern stacks.',
        icon: '🚀',
        category: 'Development',
        tools: ['React', 'Node.js', 'MongoDB', 'Express', 'Tailwind CSS', 'Git'],
        subTracks: [
            { id: 'frontend', title: 'Front End', icon: '🎨', description: 'User interfaces and client-side logic.', tools: ['HTML/CSS', 'JavaScript', 'React', 'Tailwind'] },
            { id: 'backend', title: 'Back End', icon: '⚙️', description: 'Server-side logic and database management.', tools: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL'] }
        ],
        topChannels: [
            { name: 'FireShip (English)', url: 'https://youtube.com/@fireship' },
            { name: 'CodeWithHarry (Hindi)', url: 'https://youtube.com/@CodeWithHarry' },
            { name: 'Web Dev Simplified (English)', url: 'https://youtube.com/@webdevsimplified' },
            { name: 'Apna College (Hindi)', url: 'https://youtube.com/@ApnaCollegeOfficial' },
            { name: 'FreeCodeCamp (English)', url: 'https://youtube.com/@freecodecamp' }
        ],
        roadmap: [
            { 
                step: 'HTML & CSS Mastery', 
                subTrackId: 'frontend',
                tools: ['Semantic HTML', 'CSS Grid/Flexbox', 'Responsive Design'],
                topics: [
                    { 
                        title: 'The Modern Web', 
                        detail: 'Understanding browser internals, HTTP/S, and the DOM.',
                        deepContent: {
                            description: 'The foundation of the web relies on the Request-Response cycle between a Client (Browser) and a Server. Understanding the Critical Rendering Path is key to performance.',
                            table: {
                                headers: ['Layer', 'Technology', 'Role'],
                                rows: [
                                    ['Structure', 'HTML5', 'Semantic content'],
                                    ['Style', 'CSS3', 'Visual layout'],
                                    ['Behavior', 'JavaScript', 'Logic & interactivity']
                                ]
                            },
                            code: `<!-- Modern Boilerplate -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Dev App</title>
</head>
<body>
    <header>Nav</header>
    <main>Content</main>
</body>
</html>`
                        }
                    },
                    { 
                        title: 'CSS Grid & Flexbox', 
                        detail: 'Deep dive into 1D and 2D layout systems.',
                        deepContent: {
                            description: 'Flexbox is designed for one-dimensional layouts (rows or columns), while CSS Grid is designed for two-dimensional layouts. Both utilize the Box Model but differ in how they manage whitespace and alignment across varying screen resolutions.',
                            table: {
                                headers: ['Feature', 'Flexbox', 'CSS Grid'],
                                rows: [
                                    ['Dimensions', '1D (Row OR Column)', '2D (Row AND Column)'],
                                    ['Alignment', 'Content-first', 'Layout-first'],
                                    ['Best For', 'Component UI', 'Page Structure']
                                ]
                            },
                            code: `/* Center anything with Flex */
.parent {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}

/* Golden Ratio Grid */
.grid-container {
  display: grid;
  grid-template-columns: 1.618fr 1fr;
  gap: 2rem;
  padding: 2rem;
}`
                        }
                    }
                ]
            },
            { 
                step: 'JavaScript Deep Dive', 
                subTrackId: 'frontend',
                tools: ['ES6+', 'Promises', 'Closes', 'Event Loop'],
                topics: [
                    { 
                        title: 'Async/Await & Promises', 
                        detail: 'Managing asynchronous code without callback hell.',
                        deepContent: {
                            description: 'JavaScript is single-threaded but handles async tasks via the Event Loop and Web APIs. Promises provide a cleaner way to handle future values.',
                            code: `const getData = async () => {
  try {
    const res = await fetch('https://api.dev.com/user');
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Link Failure", err);
  }
};`
                        }
                    }
                ]
            },
            { 
                step: 'Server-Side with Node.js', 
                subTrackId: 'backend',
                tools: ['Node.js', 'npm', 'Events', 'Streams'],
                topics: [
                    { 
                        title: 'Node.js Core Internals', 
                        detail: 'Understanding the V8 engine and the event-driven architecture.',
                        deepContent: {
                            description: 'Node.js leverages the Libuv library to handle asynchronous I/O operations through a thread pool, while the V8 engine executes JavaScript on a single main thread. This separation allows Node.js to handle thousands of concurrent connections with minimal overhead.',
                            table: {
                                headers: ['Component', 'Technology', 'Responsibility'],
                                rows: [
                                    ['Execution Engine', 'V8 (Google)', 'Compiles JS to Machine Code'],
                                    ['Event Loop', 'Libuv (C)', 'Handles Async I/O & Networking'],
                                    ['Thread Pool', 'Worker Threads', 'CPU Intensive Tasks (Crypto/FS)']
                                ]
                            },
                            code: `const http = require('http');

// Basic Event-Driven Server
const server = http.createServer((req, res) => {
  console.log('Request Received at:', new Date().toISOString());
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Node.js Reactive Edge');
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});`
                        }
                    }
                ]
            },
            { 
                step: 'RESTful API with Express', 
                subTrackId: 'backend',
                tools: ['Express', 'Middleware', 'Routing', 'JWT'],
                topics: [
                    { 
                        title: 'API Architecture', 
                        detail: 'Building scalable APIs using Express.js middleware.',
                        deepContent: {
                            description: 'Express is a minimal and flexible Node.js web application framework that provides a robust set of features for web and mobile applications.',
                            code: `const express = require('express');
const app = express();
app.use(express.json());

app.get('/api/v1/users', (req, res) => {
    res.json({ status: 'success' });
});`
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'ai-development',
        title: 'AI & Data Science',
        description: 'Master Machine Learning, Deep Learning, and AI integration.',
        icon: '🤖',
        category: 'AI',
        tools: ['Python', 'PyTorch', 'TensorFlow', 'OpenAI API', 'Pandas', 'NumPy'],
        subTracks: [
            { id: 'data-eng', title: 'Data Analytics', icon: '📊', description: 'Data processing and visualization.', tools: ['Python', 'Pandas', 'Matplotlib', 'SQL'] },
            { id: 'ml-ops', title: 'Machine Learning', icon: '🧠', description: 'Deep learning and model deployment.', tools: ['PyTorch', 'Scikit-Learn', 'TensorFlow'] }
        ],
        topChannels: [
            { name: 'Sentdex (English)', url: 'https://youtube.com/@sentdex' },
            { name: 'CodeBasics (Hindi)', url: 'https://youtube.com/@codebasics' },
            { name: 'Krish Naik (Hindi/English)', url: 'https://youtube.com/@krishnaik06' },
            { name: '3Blue1Brown (Visuals)', url: 'https://youtube.com/@3blue1brown' },
            { name: 'DeepLearning.AI (Academic)', url: 'https://youtube.com/@deeplearningai' }
        ],
        roadmap: [
            { 
                step: 'Python for AI', 
                subTrackId: 'data-eng',
                tools: ['Data Structures', 'Functions', 'List Comprehension'],
                topics: [
                    { 
                        title: 'Foundational Data Handling', 
                        detail: 'Efficient data manipulation using NumPy and Pandas.',
                        deepContent: {
                            description: 'In AI, data is represented as tensors. NumPy is the library of choice for numerical operations, providing N-dimensional arrays for heavy math.',
                            table: {
                                headers: ['Library', 'Primary Object', 'Typical Task'],
                                rows: [
                                    ['NumPy', 'ndarray', 'Linear Algebra & Tensors'],
                                    ['Pandas', 'DataFrame', 'Cleaning & Feature Eng.'],
                                    ['Matplotlib', 'Figure', 'Data Visualization']
                                ]
                            },
                            code: `import numpy as np

# Create a 3x3 matrix of zeros
matrix = np.zeros((3, 3))
print("Tensor Shape:", matrix.shape)

# Dot product example
result = np.dot(matrix, matrix.T)
`
                        }
                    }
                ]
            },
            {
                step: 'Advanced Model Deployment',
                subTrackId: 'ml-ops',
                tools: ['Docker', 'FastAPI', 'Kubernetes'],
                topics: [
                    {
                        title: 'Serving ML Models',
                        detail: 'Scaling models to production using modern APIs.',
                        deepContent: {
                            description: 'MLOps focuses on the reliability and efficiency of machine learning models in production environments.',
                            code: `from fastapi import FastAPI
app = FastAPI()

@app.post("/predict")
def predict(data: dict):
    return {"prediction": "A+"}`
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'frontend-pro',
        title: 'Frontend Mastery',
        description: 'Build stunning, high-performance user interfaces.',
        icon: '🎨',
        category: 'Frontend',
        tools: ['Next.js', 'TypeScript', 'Framer Motion', 'Sass', 'Webpack'],
        topChannels: [
            { name: 'Josh Comeau (Pro CSS)', url: 'https://www.joshwcomeau.com/' },
            { name: 'Sheryians Coding (Hindi)', url: 'https://youtube.com/@SheryiansCodingSchool' },
            { name: 'Jack Herrington (Typescript)', url: 'https://youtube.com/@jherr' },
            { name: 'Thapa Technical (Hindi)', url: 'https://youtube.com/@ThapaTechnical' },
            { name: 'DesignCourse (UI/UX)', url: 'https://youtube.com/@designcourse' }
        ],
        roadmap: [
            { 
                step: 'React Ecosystem', 
                tools: ['Hooks', 'Context API', 'State Management'],
                topics: [
                    { 
                        title: 'Modern State Management', 
                        detail: 'Managing data flow across complex component trees.',
                        deepContent: {
                            description: 'Modern React focuses on functional components and hooks. Context API is built-in for global state, while Redux remains the industry standard for large apps.',
                            code: `import { createContext, useContext } from 'react';

const ThemeContext = createContext('dark');

export const App = () => (
  <ThemeContext.Provider value="light">
    <Navigation />
  </ThemeContext.Provider>
);`
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'cyberflow',
        title: 'Cybersecurity Mastery',
        description: 'Protect systems, networks, and data from digital attacks.',
        icon: '🛡️',
        category: 'Security',
        tools: ['Kali Linux', 'Wireshark', 'Metasploit', 'Burp Suite', 'Python', 'Nmap'],
        topChannels: [
            { name: 'NetworkChuck (English)', url: 'https://youtube.com/@networkchuck' },
            { name: 'Technical Sagar (Hindi)', url: 'https://youtube.com/@TechnicalSagar' },
            { name: 'David Bombal (Networking)', url: 'https://youtube.com/@davidbombal' },
            { name: 'Cyber Mentors (English)', url: 'https://youtube.com/@thecybermentor' },
            { name: 'Computer Phile (Academic)', url: 'https://youtube.com/@computerphile' }
        ],
        roadmap: [
            { 
                step: 'Network Vulnerabilities', 
                tools: ['Nmap', 'Scanning', 'Sniffing'],
                topics: [
                    { 
                        title: 'Packet Analysis', 
                        detail: 'Understanding network traffic patterns with Wireshark.',
                        deepContent: {
                            description: 'To secure a network, you must first understand its traffic. Wireshark allows you to see what is happening on your network at a microscopic level.',
                            table: {
                                headers: ['Packet Part', 'Info Contained', 'Security Focus'],
                                rows: [
                                    ['Eth Header', 'MAC addresses', 'Spoofing detection'],
                                    ['IP Header', 'Source/Dest IP', 'Filtering rules'],
                                    ['Payload', 'Actual Data', 'Leakage detection']
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'cloud-arch',
        title: 'Cloud Architecture',
        description: 'Design and manage scalable cloud infrastructures.',
        icon: '☁️',
        category: 'Infrastructure',
        tools: ['AWS', 'Azure', 'Docker', 'Kubernetes', 'Terraform'],
        topChannels: [
            { name: 'AWS Cloud (English)', url: 'https://youtube.com/@amazonwebservices' },
            { name: 'Be A Better Dev (English)', url: 'https://youtube.com/@beabetterdev' },
            { name: 'TechWorld with Nana (English)', url: 'https://youtube.com/@techworldwithnana' },
            { name: 'Soumya Singh (Hindi)', url: 'https://youtube.com/@SoumyaSingh' },
            { name: 'Cloud Coach (English)', url: 'https://youtube.com/@cloudcoach' }
        ],
        roadmap: [
            { 
                step: 'Infrastructure as Code', 
                tools: ['Terraform', 'Ansible', 'HCL'],
                topics: [
                    { 
                        title: 'Defining IaC', 
                        detail: 'Managing infrastructure using configuration files.',
                        deepContent: {
                            description: 'Infrastructure as Code (IaC) allows you to define and provision data center infrastructure using machine-readable definition files.',
                            code: `resource "aws_instance" "app_server" {
  ami           = "ami-08d70e59c07c61a3a"
  instance_type = "t2.micro"

  tags = {
    Name = "DevServer"
  }
}`
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'mobile-mastery',
        title: 'Mobile App Dev (React Native)',
        description: 'Build native iOS and Android apps using JavaScript.',
        icon: '📱',
        category: 'Development',
        tools: ['React Native', 'Expo', 'Redux', 'Native Components'],
        topChannels: [
            { name: 'William Candillon (English)', url: 'https://youtube.com/@wcandill' },
            { name: 'CodeStepByStep (Hindi)', url: 'https://youtube.com/@CodeStepByStep' },
            { name: 'Native Rocket (English)', url: 'https://youtube.com/@nativerocket' },
            { name: 'Thapa Technical (Hindi)', url: 'https://youtube.com/@ThapaTechnical' },
            { name: 'Charlie Gerard (English)', url: 'https://youtube.com/@charliegerard' }
        ],
        roadmap: [
            { 
                step: 'Native Device Access', 
                tools: ['Camera API', 'GPS', 'Push Notifications'],
                topics: [
                    { 
                        title: 'Push Notifications', 
                        detail: 'Engaging users with real-time remote communication.',
                        deepContent: {
                            description: 'React Native uses native modules or Expo services to handle delivery of messages to devices even when the app is in background.',
                            table: {
                                headers: ['Platform', 'Service Name', 'SDK'],
                                rows: [
                                    ['iOS', 'APNs', 'Native Modules'],
                                    ['Android', 'FCM', 'Firebase SDK'],
                                    ['Cross-Platform', 'Expo Notifications', 'Expo SDK']
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'devops-pro',
        title: 'DevOps Engineering',
        description: 'Bridge the gap between development and operations.',
        icon: '♾️',
        category: 'Infrastructure',
        tools: ['Docker', 'Kubernetes', 'Jenkins', 'Terraform', 'Linux'],
        topChannels: [
            { name: 'TechWorld with Nana (English)', url: 'https://youtube.com/@techworldwithnana' },
            { name: 'DevOps Directive (English)', url: 'https://youtube.com/@devopsdirective' },
            { name: 'KodeKloud (Academic)', url: 'https://youtube.com/@kodekloud' }
        ],
        roadmap: [
            { 
                step: 'Containerization', 
                tools: ['Docker', 'Images', 'Volumes'],
                topics: [
                    { 
                        title: 'Docker Architecture', 
                        detail: 'Building and shipping applications using containers.',
                        deepContent: {
                            description: 'Docker uses OS-level virtualization to deliver software in packages called containers.',
                            code: `FROM node:18
WORKDIR /app
COPY . .
RUN npm install
CMD ["npm", "start"]`
                        }
                    }
                ]
            }
        ]
    },
    {
        id: 'uiux-design',
        title: 'UI/UX Design Strategy',
        description: 'Create intuitive and visually stunning user experiences.',
        icon: '🎨',
        category: 'Design',
        tools: ['Figma', 'Adobe XD', 'Prototyping', 'Design Systems'],
        topChannels: [
            { name: 'Flux Academy (English)', url: 'https://youtube.com/@fluxacademy' },
            { name: 'DesignCourse (Visuals)', url: 'https://youtube.com/@designcourse' },
            { name: 'Mizko (Product Design)', url: 'https://youtube.com/@mizko' }
        ],
        roadmap: [
            { 
                step: 'Design Principles', 
                tools: ['Typography', 'Color Theory', 'Layout'],
                topics: [
                    { 
                        title: 'Visual Hierarchy', 
                        detail: 'Guiding the users eye through effective design patterns.',
                        deepContent: {
                            description: 'Visual hierarchy is the arrangement of elements in a way that implies importance.',
                            table: {
                                headers: ['Principle', 'Technique', 'Goal'],
                                rows: [
                                    ['Contrast', 'Size/Color', 'Emphasis'],
                                    ['Proximity', 'Grouping', 'Relationship'],
                                    ['Alignment', 'Grid usage', 'Structure']
                                ]
                            }
                        }
                    }
                ]
            }
        ]
    }
];
