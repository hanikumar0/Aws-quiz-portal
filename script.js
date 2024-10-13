const questions = [
    {
        question: "What does EC2 stand for?",
        answers: {
            a: "Elastic Compute Cloud",
            b: "Elastic Container Service",
            c: "Elastic Cache",
            d: "Elastic Cloud Storage"
        },
        correct: "a"
    },
    {
        question: "Which AWS service is used for object storage?",
        answers: {
            a: "S3",
            b: "EBS",
            c: "RDS",
            d: "EC2"
        },
        correct: "a"
    },
    {
        question: "What is the default limit of EC2 instances per region?",
        answers: {
            a: "20",
            b: "5",
            c: "10",
            d: "15"
        },
        correct: "b"
    },
    {
        question: "Which AWS service is used for monitoring resources?",
        answers: {
            a: "CloudTrail",
            b: "CloudWatch",
            c: "AWS Config",
            d: "AWS Inspector"
        },
        correct: "b"
    },
    {
        question: "What is the AWS service that provides a virtual network?",
        answers: {
            a: "AWS Lambda",
            b: "Amazon VPC",
            c: "AWS Direct Connect",
            d: "AWS AppSync"
        },
        correct: "b"
    },
    {
        question: "Which service allows you to run code without provisioning servers?",
        answers: {
            a: "EC2",
            b: "AWS Lambda",
            c: "AWS Elastic Beanstalk",
            d: "AWS ECS"
        },
        correct: "b"
    },
    {
        question: "What does RDS stand for in AWS?",
        answers: {
            a: "Remote Database Service",
            b: "Relational Database Service",
            c: "Redundant Database Service",
            d: "Rapid Data Service"
        },
        correct: "b"
    },
    {
        question: "Which AWS service is used for serverless application deployment?",
        answers: {
            a: "AWS CodeDeploy",
            b: "AWS Elastic Beanstalk",
            c: "AWS CloudFormation",
            d: "AWS Lambda"
        },
        correct: "d"
    },
    {
        question: "Which AWS service provides a content delivery network?",
        answers: {
            a: "CloudFront",
            b: "S3",
            c: "Route 53",
            d: "CloudWatch"
        },
        correct: "a"
    },
    {
        question: "What is the maximum size of an S3 object?",
        answers: {
            a: "5 TB",
            b: "2 TB",
            c: "1 TB",
            d: "10 TB"
        },
        correct: "a"
    },
    {
        question: "Which AWS service is used to manage user identities and permissions?",
        answers: {
            a: "AWS IAM",
            b: "AWS Cognito",
            c: "AWS Directory Service",
            d: "AWS Shield"
        },
        correct: "a"
    },
    {
        question: "What is the AWS service for managing containerized applications?",
        answers: {
            a: "AWS Fargate",
            b: "Amazon ECS",
            c: "Amazon EKS",
            d: "All of the above"
        },
        correct: "d"
    },
    {
        question: "Which service provides a fully managed NoSQL database?",
        answers: {
            a: "Amazon RDS",
            b: "Amazon DynamoDB",
            c: "Amazon Aurora",
            d: "Amazon Redshift"
        },
        correct: "b"
    },
    {
        question: "What does AWS CloudFormation do?",
        answers: {
            a: "It manages AWS resources using a visual interface.",
            b: "It allows you to automate the creation of AWS resources.",
            c: "It provides security for AWS resources.",
            d: "It monitors the performance of AWS resources."
        },
        correct: "b"
    },
    {
        question: "Which AWS service is used for big data analytics?",
        answers: {
            a: "Amazon Redshift",
            b: "Amazon RDS",
            c: "Amazon S3",
            d: "Amazon Aurora"
        },
        correct: "a"
    },
    {
        question: "What is AWS Lambda used for?",
        answers: {
            a: "Running virtual machines",
            b: "Storing data",
            c: "Running code in response to events",
            d: "Managing databases"
        },
        correct: "c"
    },
    {
        question: "Which service is best for creating a highly available database?",
        answers: {
            a: "Amazon RDS Multi-AZ",
            b: "Amazon S3",
            c: "AWS Glacier",
            d: "Amazon DynamoDB"
        },
        correct: "a"
    },
    {
        question: "What is the purpose of AWS CloudTrail?",
        answers: {
            a: "To monitor application performance",
            b: "To log API calls for AWS account activity",
            c: "To manage serverless applications",
            d: "To automate resource provisioning"
        },
        correct: "b"
    },
    {
        question: "Which AWS service can automatically scale resources based on demand?",
        answers: {
            a: "Amazon EC2 Auto Scaling",
            b: "AWS Lambda",
            c: "Amazon RDS",
            d: "Amazon CloudFront"
        },
        correct: "a"
    },
    {
        question: "What is the primary purpose of Amazon Route 53?",
        answers: {
            a: "DNS management",
            b: "Monitoring services",
            c: "Content delivery",
            d: "Database management"
        },
        correct: "a"
    },
    {
        question: "Which AWS service is used for managing DNS records?",
        answers: {
            a: "AWS Config",
            b: "AWS Shield",
            c: "Amazon Route 53",
            d: "Amazon VPC"
        },
        correct: "c"
    }
];

let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 30;
let timer;

const questionContainer = document.getElementById('question-container');
const answerButtons = document.getElementById('answer-buttons');
const nextButton = document.getElementById('next-button');
const timeDisplay = document.getElementById('time-display');

// Start the quiz
function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    timeLeft = 30;
    timer = setInterval(updateTimer, 1000);
    showQuestion(questions[currentQuestionIndex]);
}

// Show question
function showQuestion(question) {
    questionContainer.innerHTML = ''; // Clear previous question
    timeDisplay.innerText = timeLeft;
    const questionElement = document.createElement('div');
    questionElement.innerText = question.question;
    questionContainer.appendChild(questionElement);

    // Clear answer buttons before displaying new ones
    answerButtons.innerHTML = ''; 

    Object.keys(question.answers).forEach(answer => {
        const button = document.createElement('button');
        button.innerText = question.answers[answer];
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(answer));
        answerButtons.appendChild(button);
    });
}

// Handle answer selection
function selectAnswer(answer) {
    if (answer === questions[currentQuestionIndex].correct) {
        score++;
    }
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        showQuestion(questions[currentQuestionIndex]);
    } else {
        clearInterval(timer);
        localStorage.setItem('quizScore', score);
        location.href = 'result.html';
    }
}

// Update timer
function updateTimer() {
    timeLeft--;
    timeDisplay.innerText = timeLeft;
    if (timeLeft <= 0) {
        clearInterval(timer);
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion(questions[currentQuestionIndex]);
        } else {
            localStorage.setItem('quizScore', score);
            location.href = 'result.html';
        }
    }
}

// Start the quiz on page load
startQuiz();
