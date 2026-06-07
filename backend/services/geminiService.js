const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY
);

const analyzeResume = async (
  companyName,
  jobRole,
  resumeText,
  jobDescription
) => {

  const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash",
  });

  const prompt = `
You are an expert ATS Resume Analyzer and Career Coach.

The candidate wants to apply for:

Company:
${companyName}

Target Job Role:
${jobRole}

Your task is to evaluate whether this candidate is a good fit for THIS SPECIFIC ROLE and THIS COMPANY.

Consider:

1. Resume content
2. Job description
3. Required skills
4. Overall suitability for the role

Return ONLY in the following format:

🎯 ATS Score:

⭐ Overall Fit:
(Excellent Fit / Good Fit / Moderate Fit / Weak Fit)

✅ Why this candidate matches this role:

💪 Strengths:

⚠️ Missing Skills:

🚀 Resume Improvements:

👨‍💼 3 HR Questions:

💻 5 Technical Questions:

========================

Resume:

${resumeText}

========================

Job Description:

${jobDescription}
`;

  const result = await model.generateContent(prompt);

  const response = await result.response;

  return response.text();
};

module.exports = analyzeResume;