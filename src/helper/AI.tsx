import env from "@/env";

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
} from "@google/generative-ai"
  
const genAI = new GoogleGenerativeAI(env.ai.apiKey);
  
const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
});
  
const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "application/json",
};
  
export const chatSession = model.startChat({
    generationConfig,
      history: [
        {
          role: "user",
          parts: [
            {text: "{\n   \"time\": 1550476186479,\n   \"blocks\": [\n      {\n         \"id\": \"oUq2g_tl8y\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Editor.js\",\n            \"level\": 2\n         }\n      },\n      {\n         \"id\": \"zbGZFPM-iI\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Hey. Meet the new Editor. On this page you can see it in action — try to edit this text. Source code of the page contains the example of connection and configuration.\"\n         }\n      },\n      {\n         \"id\": \"qYIGsjS5rt\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"Key features\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"XV87kJS_H1\",\n         \"type\": \"list\",\n         \"data\": {\n            \"style\": \"unordered\",\n            \"items\": [\n               \"It is a block-styled editor\",\n               \"It returns clean data output in JSON\",\n               \"Designed to be extendable and pluggable with a simple API\"\n            ]\n         }\n      },\n      {\n         \"id\": \"AOulAjL8XM\",\n         \"type\": \"header\",\n         \"data\": {\n            \"text\": \"What does it mean «block-styled editor»\",\n            \"level\": 3\n         }\n      },\n      {\n         \"id\": \"cyZjplMOZ0\",\n         \"type\": \"paragraph\",\n         \"data\": {\n            \"text\": \"Workspace in classic editors is made of a single contenteditable element, used to create different HTML markups. Editor.js <mark class=\\\"cdx-marker\\\">workspace consists of separate Blocks: paragraphs, headings, images, lists, quotes, etc</mark>. Each of them is an independent contenteditable element (or more complex structure) provided by Plugin and united by Editor's Core.\"\n         }\n      }\n   ],\n   \"version\": \"2.8.1\"\n}\n"},
          ],
        },
        {
          role: "model",
          parts: [
            {text: "```json\n{\n  \"time\": 1678872828264,\n  \"blocks\": [\n    {\n      \"id\": \"t9qV5lY7d8\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Machine Learning Project Idea: 🧠\",\n        \"level\": 1\n      }\n    },\n    {\n      \"id\": \"hWj324tM66\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"This is a template for brainstorming and documenting your next Machine Learning project idea. Fill in the sections below to flesh out your concept.\"\n      }\n    },\n    {\n      \"id\": \"z16t8X0z9W\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Project Title:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"hZc38F4r2y\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Enter a catchy and descriptive title for your project here.\"\n      }\n    },\n    {\n      \"id\": \"n3G21wR317\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Problem Statement:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"25K335y250\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Clearly state the problem your project aims to solve. What real-world challenge will it address?\"\n      }\n    },\n    {\n      \"id\": \"y4W1749075\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Data:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"e8Y8301742\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"What kind of data will you use? (e.g., images, text, tabular data, sensor readings)\",\n          \"Where will you get the data from? (e.g., public datasets, APIs, your own collection)\",\n          \"How much data do you need? Is it available in sufficient quantity?\"\n        ]\n      }\n    },\n    {\n      \"id\": \"x5Q2247674\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Approach:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"b9I6847056\",\n      \"type\": \"list\",\n      \"data\": {\n        \"style\": \"unordered\",\n        \"items\": [\n          \"What Machine Learning techniques are relevant to this problem? (e.g., supervised learning, unsupervised learning, reinforcement learning)\",\n          \"What specific algorithms will you explore? (e.g., linear regression, decision trees, neural networks)\",\n          \"How will you evaluate the performance of your model? (e.g., accuracy, precision, recall, F1-score)\"\n        ]\n      }\n    },\n    {\n      \"id\": \"r6V6592587\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Tools and Libraries:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"i3Y9160133\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"List the programming languages, libraries, and frameworks you plan to use. (e.g., Python, TensorFlow, scikit-learn, PyTorch, etc.)\"\n      }\n    },\n    {\n      \"id\": \"a8F2424928\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Potential Applications:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"k3R6217630\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Describe how this project could be used in real-world scenarios. What are the potential benefits?\"\n      }\n    },\n    {\n      \"id\": \"s7Q6789902\",\n      \"type\": \"header\",\n      \"data\": {\n        \"text\": \"Challenges and Considerations:\",\n        \"level\": 2\n      }\n    },\n    {\n      \"id\": \"c9M4100384\",\n      \"type\": \"paragraph\",\n      \"data\": {\n        \"text\": \"Identify any potential difficulties or ethical concerns associated with this project. How will you address them?\"\n      }\n    }\n  ],\n  \"version\": \"2.8.1\"\n}\n```\n\n**Explanation of Sections:**\n\n* **Project Title:** A concise and catchy name for your ML project.\n* **Problem Statement:** A clear description of the issue your project aims to resolve.\n* **Data:** Details about the data required for your project, including its type, source, and availability.\n* **Approach:** The Machine Learning techniques and algorithms you plan to use, along with your evaluation metrics.\n* **Tools and Libraries:** The programming languages, libraries, and frameworks you'll utilize.\n* **Potential Applications:** Real-world scenarios where your project can be implemented and its potential benefits.\n* **Challenges and Considerations:** Potential difficulties and ethical aspects that need attention.\n\n**How to Use the Template:**\n\n1. **Copy and Paste:** Start by copying the JSON template above.\n2. **Edit:** Replace the placeholder text in each section with your own project information.\n3. **Experiment:** Feel free to add more sections or blocks as needed.\n4. **Save:** Save your edited JSON file for future reference.\n\nThis template is a starting point, and you can customize it based on your specific project needs. \n"},
          ],
        },
    ],
});
  
// const result = await chatSession.sendMessage("INSERT_INPUT_HERE");
// console.log(result.response.text());