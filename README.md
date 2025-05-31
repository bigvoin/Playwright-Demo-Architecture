# 🧪 Simple Playwright Demo Architecture

This repository demonstrates a scalable Playwright automation testing framework built using modern best practices, including:

- Page Object Model (POM) design
- Modular test structure with fixtures and reusable components
- GitHub Actions CI workflow for running tests on AWS EC2
- Dockerized test execution using images hosted in AWS ECR

---

## 🗂 Folder Structure

- **`pageobjects/`**  
  Page Object Model (POM) classes that abstract interaction logic for various pages.

- **`ui-components/`**  
  Reusable UI element abstractions (e.g., buttons, inputs, dropdowns).

- **`dataproviders/`**  
  Static or dynamic data sources for parameterizing tests.

- **`fixtures/`**  
  Shared test setup logic, custom fixtures, and environment configurations.

- **`.github/workflows/`**  
  GitHub Action definitions — currently includes a workflow to spin up EC2 and run Playwright tests in a Docker container.

- **`Dockerfile`**  
  Defines the environment for Playwright test execution.

- **`playwright.config.ts`**  
  Global Playwright configuration file.

---

## 🚀 Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/bigvoin/Playwright-Demo-Architecture.git
cd Playwright-Demo-Architecture
```

🖥️ GUI Mode Playwright with start.sh and stop.sh
To enable headed (GUI) testing with Playwright (useful for debugging or visual validation), this project provides helper scripts:

🔹 start.sh
Starts a Docker container with access to your local display using X11 forwarding:
 ```bash
   ./start.sh
   ```
Purpose: Launches a Docker container with environment setup for running Playwright tests in headed mode.

Functionality:

Shares the host display via xhost.

Mounts SSH agent and display socket for container GUI.

Starts Docker with your ECR-hosted Playwright image.
2. Install dependencies
```bash
   npm install
   npx playwright install
   ```
3. Run the tests
 ```bash
    npx playwright --project=chromium
```

⚙️ GitHub Actions CI
Build action -> builds latest project changes into playwright container hosted in
aws repository.

This project features a production-ready CI setup using GitHub Actions and AWS EC2:

🔹 Key Features
EC2 Automation: Launches a new EC2 instance dynamically per run

Dockerized Tests: Pulls Playwright tests from AWS ECR

SSH-based Execution: Runs tests securely over SSH

Clean Up: EC2 is automatically terminated after execution

You can trigger the test pipeline via the "Run workflow" button in the GitHub Actions tab.

🔐 GitHub Secrets (Required)
To use the EC2-based CI workflow, configure the following GitHub Secrets:

| Secret Name                 | Purpose                            |
| --------------------------- | ---------------------------------- |
| `AWS_ACCESS_KEY_ID`         | IAM user access key                |
| `AWS_SECRET_ACCESS_KEY`     | IAM user secret key                |
| `NEW_EC2_AMI_ID`            | Custom Ubuntu-based AMI ID         |
| `NEW_EC2_SUBNET_ID`         | AWS Subnet ID                      |
| `NEW_EC2_SECURITY_GROUP_ID` | Security Group ID for the instance |
| `EC2_SSH_KEY_NAME`          | Name of the SSH key pair in AWS    |
| `EC2_SSH_PRIVATE_KEY`       | PEM-encoded private SSH key        |


👨‍💻 Development Notes
The EC2 instance is launched with a 30GB disk to avoid "no space left" errors during Docker pulls.

Docker image is pulled from:
762593867198.dkr.ecr.eu-north-1.amazonaws.com/demo.playwright:main

Custom AMIs should have Docker and AWS CLI pre-installed.

🤝 Contributing
Contributions are welcome!
Feel free to open issues, suggest improvements, or submit pull requests.

📜 License
This project is licensed under the MIT License.