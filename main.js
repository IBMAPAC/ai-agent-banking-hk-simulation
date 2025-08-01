// --- STATE MANAGEMENT ---
let stepIndex = 0;
let currentScenarioSteps = [];
let isWaitingForHuman = false;

// --- DEMO CONFIGURATION ---
// CUSTOMIZED FOR HANG SENG BANK CIO MEETING
const config = {
    title: "Agentic Banking Simulation for Hong Kong's Future",
    subtitle: "Select a scenario to explore how agentic AI can address key strategic priorities for a leading Hong Kong bank.",
    // Define the 6 industry-specific agents
    agents: [
        { id: 'agent1', key: 'gba-strategy', name: '🌏 GBA Strategy Agent', desc: 'Analyzes cross-border market data to identify growth opportunities and risks within the Greater Bay Area.' },
        { id: 'agent2', key: 'fraud-detection', name: '🛡️ Advanced Fraud Agent', desc: 'Detects complex fraud patterns, including trade-based money laundering and real-time payment fraud.' },
        { id: 'agent3', key: 'wealth-advisor', name: '📈 AI Wealth Advisor', desc: 'Provides hyper-personalized investment advice and automates portfolio management for wealth clients.' },
        { id: 'agent4', key: 'hkma-compliance', name: '⚖️ HKMA Compliance Agent', desc: 'Ensures all actions and data handling adhere to HKMA regulations and cross-border policies.' },
        { id: 'agent5', key: 'sme-service', name: '💼 SME Service Agent', desc: 'Automates SME client services, from digital onboarding to trade finance application processing.' },
        { id: 'agent6', key: 'resilience-ops', name: '⚙️ Resilience Ops Agent', desc: 'Monitors infrastructure health, predicts operational issues, and automates incident response to ensure uptime.' }
    ],
    // Define the scenarios for this industry
    scenarios: {
        gbaWealthOpportunity: {
            name: "🚀 Proactive GBA Wealth Opportunity",
            steps: [
                { text: "‼️ OPPORTUNITY: GBA Strategy Agent detects a significant liquidity event for a high-net-worth client in Shenzhen.", bubble: ["gba-strategy", "GBA client liquidity event!"], agent: "gba-strategy", type: 'event', handoffTo: "wealth-advisor",
                  explanation: "<h3>Proactive, Cross-Border Insight</h3><p>The agent autonomously synthesizes public news, market data, and internal information to identify a time-sensitive business opportunity across the border.</p><ul><li><b>vs. Manual:</b> A relationship manager might hear about this days later. The agent detects it in real-time.</li><li><b>vs. Basic Alert:</b> A simple alert flags an event; the agent understands the *context*—this is a key client with a specific need.</li></ul>",
                  challenge: "<h3>Data Foundation for Proactive AI</h3><p>How can the agent access and process the vast, real-time, and varied data (market data, news, transactions) needed to even detect this opportunity? This requires a data foundation built for AI.</p><p><strong>Potential Solutions:</strong></p><ul><li>Leverage <strong>DataStax</strong> to build a highly scalable, real-time data foundation.</li><li>DataStax excels at ingesting and unifying structured and unstructured data (like news articles) to create the 360-degree client view needed for the agent to connect an external event to a specific client.</li><li>Its enterprise-grade security and governance are crucial for managing sensitive client data across the GBA's multiple jurisdictions.</li></ul>"
                },
                { text: "📈 AI Wealth Advisor drafts a personalized, cross-border investment proposal (e.g., Wealth Management Connect).", bubble: ["wealth-advisor", "Drafting personalized proposal."], agent: "wealth-advisor", handoffTo: "hkma-compliance",
                  explanation: "<h3>Hyper-Personalization at Scale</h3><p>The agent analyzes the client's entire history, risk profile, and the new liquidity event to craft a bespoke investment strategy that aligns with their goals.</p><ul><li><b>vs. Manual:</b> This automates the complex, time-consuming work of a portfolio analyst.</li></ul>",
                  challenge: "<h3>Governing AI Recommendations</h3><p>The investment proposal is an AI-generated recommendation with significant financial implications. How do you ensure it's suitable, fair, and not biased? How do you prove this to regulators?</p><p><strong>Potential Solutions:</strong></p><ul><li>Use <strong>watsonx.governance</strong> to monitor the entire lifecycle of the AI model that generated the proposal. It tracks model fairness, explains the recommendation, and provides a full audit trail for HKMA review.</li></ul>"
                },
                { text: "⚖️ HKMA Compliance Agent verifies the proposal against the latest cross-border investment regulations.", bubble: ["hkma-compliance", "Proposal is compliant."], agent: "hkma-compliance", handoffTo: "wealth-advisor",
                  explanation: "<h3>Automated Governance</h3><p>A compliance guardrail is built directly into the workflow. The agent acts as an automated checkpoint, ensuring speed doesn't come at the cost of compliance.</p><ul><li><b>vs. Manual:</b> This replaces a multi-day compliance review process with a real-time, automated check.</li></ul>",
                  challenge: "<h3>Keeping Pace with Regulation</h3><p>Regulations like the Wealth Management Connect scheme evolve. An agent's knowledge must be current. A decision based on outdated rules creates significant risk.</p><p><strong>Potential Solutions:</strong></p><ul><li>Implement a Retrieval-Augmented Generation (RAG) pattern where the Compliance Agent's knowledge base is directly linked to a curated document store of HKMA circulars and regulations within <strong>watsonx.data</strong>. The agent always has the latest information.</li></ul>"
                },
                { type: 'human_approval', text: 'The AI Wealth Advisor has drafted a compliant, personalized investment plan for the GBA client. Please approve to send to the Relationship Manager.', options: [{text: '✅ Approve & Send', branch: 'approvePlan'}, {text: '❌ Decline', branch: 'declinePlan'}],
                  explanation: "<h3>Human-in-the-Loop Oversight</h3><p>For critical, high-value decisions, the agentic system presents its findings and recommendations to a human expert for final validation, ensuring accountability and trust.</p><ul><li><b>vs. RPA/Automation:</b> A simple bot cannot handle this level of dynamic interaction and judgment-based workflow.</li></ul>",
                  challenge: "<h3>Explainability for Trust</h3><p>To approve this, the human manager needs to understand *why* the AI recommended this specific mix of assets. A 'black box' recommendation would be impossible to approve with confidence.</p><p><strong>Potential Solutions:</strong></p><ul><li>Use <strong>watsonx Orchestrate</strong> to manage the human-in-the-loop workflow, delivering the recommendation and the supporting evidence to the right person.</li><li>The audit trail from <strong>watsonx.governance</strong> provides the crucial 'chain-of-thought' reasoning behind the AI's proposal, building the trust needed for approval.</li></ul>"
                }
            ]
        },
        smeTradeFinance: {
            name: "SME Trade Finance Automation",
            steps: [
                { text: "‼️ INCOMING: An SME client submits a trade finance application via the portal with supporting documents.", bubble: ["sme-service", "New trade finance application."], agent: "sme-service", type: 'event', handoffTo: "fraud-detection",
                  explanation: "<h3>Intelligent Document Processing</h3><p>The agent ingests and understands unstructured documents (PDFs, images), extracting key data points like entities, values, and dates automatically.</p><ul><li><b>vs. Manual:</b> This eliminates days of manual data entry and validation for the operations team.</li></ul>",
                  challenge: "<h3>Handling Unstructured \"Paper\"</h3><p>Trade finance is notoriously paper-intensive. The entire process fails if the system can't accurately ingest and understand a wide variety of unstructured documents (invoices, bills of lading, etc.) in real-time.</p><p><strong>Potential Solutions:</strong></p><ul><li>Use an intelligent data store for this process.</li><li><strong>DataStax</strong> is designed to manage unstructured data at scale. It can automate the ingestion and processing of the diverse document types involved in trade finance applications, making them immediately available for AI-powered data extraction and analysis by the agent.</li></ul>"
                },
                { text: "🛡️ Fraud Detection Agent analyzes the transaction for trade-based money laundering (TBML) indicators.", bubble: ["fraud-detection", "Screening for TBML risk..."], agent: "fraud-detection", handoffTo: "sme-service",
                  explanation: "<h3>Advanced Risk Analysis</h3><p>The agent goes beyond simple watchlist checks. It analyzes the transaction's structure, counterparties, and goods against complex TBML typologies.</p><ul><li><b>vs. Rule-Based System:</b> Traditional systems can be evaded. The agent looks for subtle, suspicious *patterns* in the data.</li></ul>",
                  challenge: "<h3>Data Silos & Integration</h3><p>To detect sophisticated fraud, the agent needs to access data from multiple systems: core banking, trade platforms, and third-party intelligence. Integrating these is a major infrastructure challenge.</p><p><strong>Potential Solutions:</strong></p><ul><li>Use <strong>webMethods Integration</strong> capabilities to create robust APIs that provide the agent with unified, real-time access to these disparate data sources.</li><li>The agent queries this unified view through <strong>watsonx.data</strong>, simplifying the process and ensuring governance.</li></ul>"
                },
                { text: "AUTOMATED ACTION: Finding no major red flags, the SME Service Agent approves the financing and proactively offers FX hedging.", agent: 'sme-service', bubble: ["sme-service", "Financing approved. Offering FX."], type: 'optimized',
                  explanation: "<h3>Proactive, Value-Add Service</h3><p>The system doesn't just approve the loan; it anticipates the client's next need (managing currency risk) and automatically makes a relevant cross-sell offer.</p><ul><li><b>vs. Manual:</b> This transforms a simple transaction into a consultative, revenue-generating interaction.</li></ul>",
                  challenge: "<h3>Agentic Reasoning & Action</h3><p>This is where agentic AI shines. The agent isn't just following a script; it is reasoning about the client's situation and taking an independent, value-driven action. How do you grant an AI agent the authority to take such actions?</p><p><strong>Potential Solutions:</strong></p><ul><li>This introduces the core concept of <strong>Agentic AI</strong>. You start by defining clear goals and boundaries in <strong>watsonx Orchestrate</strong>. The agent is given the objective ('process trade finance and maximize client value') and the tools (APIs for approval, FX offers), and it sequences the actions to achieve the goal.</li></ul>"
                }
            ]
        },
        aiopsResilience: {
            name: "Cross-Border Service Resilience (AIOps)",
            steps: [
                 { text: "‼️ ALERT: Resilience Ops Agent detects high API error rates for GBA customers using the mobile app.", bubble: ["resilience-ops", "High API errors for GBA users!"], agent: "resilience-ops", type: 'event',
                  explanation: "<h3>Automated Anomaly Detection</h3><p>The agent doesn't wait for systems to fail or customers to complain. It detects a leading indicator of a problem—API errors—before it causes a full-blown outage.</p><ul><li><b>vs. Traditional Monitoring:</b> Traditional tools send thousands of alerts. The AIOps agent pinpoints the specific 'signal in the noise'.</li></ul>",
                  challenge: "<h3>Infrastructure Complexity</h3><p>Your applications run on a complex hybrid cloud of mainframes, private cloud, and public cloud services. How can an agent have a complete, real-time view to perform root cause analysis accurately?</p><p><strong>Potential Solutions:</strong></p><ul><li>Deploy <strong>Instana</strong> to provide full-stack observability across your entire hybrid environment. Instana automatically maps all dependencies, giving the agent the topological context it needs to understand the problem.</li></ul>"
                },
                { text: "ROOT CAUSE ANALYSIS: The agent correlates the errors to a specific misconfigured microservice in the latest code deployment.", bubble: ["resilience-ops", "Root cause: faulty microservice."], agent: "resilience-ops",
                  explanation: "<h3>Automated Root Cause Analysis</h3><p>The agent moves from *what* is happening to *why* it's happening in seconds. It connects the application-level symptom to its root cause in the underlying infrastructure.</p><ul><li><b>vs. War Room:</b> This automates the work of a multi-hour 'war room' meeting involving developers, SREs, and operations staff.</li></ul>",
                  challenge: "<h3>Self-Managing Infrastructure</h3><p>Identifying the cause is one thing; fixing it is another. How can you empower the system to take corrective action safely without direct human intervention for every incident?</p><p><strong>Potential Solutions:</strong></p><ul><li>This is the core of <strong>self-managing infrastructure</strong>. The Resilience Agent uses <strong>Instana's</strong> precise root cause data to trigger an automated remediation workflow in a tool like <strong>Ansible</strong> or <strong>watsonx Orchestrate</strong>.</li></ul>"
                },
                { text: "AUTOMATED REMEDIATION: The agent triggers a playbook to automatically roll back the faulty deployment. Service is restored.", agent: 'resilience-ops', bubble: ["resilience-ops", "Rolling back deployment. Service restored."], type: 'optimized',
                  explanation: "<h3>Autonomous Remediation</h3><p>The system automatically executes the correct, pre-approved solution. This reduces Mean Time to Resolution (MTTR) from hours to minutes, directly improving customer experience and resilience.</p><ul><li><b>vs. Manual:</b> This avoids the delays and potential human error involved in a manual code rollback.</li></ul>",
                  challenge: "<h3>Cost & Performance Management</h3><p>Running these resilient, AI-powered systems can be expensive. How do you ensure the infrastructure is continuously optimized for both performance and cost, so that your operational efficiency gains aren't lost to high cloud bills?</p><p><strong>Potential Solutions:</strong></p><ul><li>Integrate <strong>Turbonomic</strong> to provide AI-powered resource management. It ensures applications get the resources they need to perform, while continuously optimizing the underlying infrastructure for cost. This makes the entire self-managing system financially sustainable.</li></ul>"
                }
            ]
        }
    },
    // Define the branches for this industry
    branches: {
        approvePlan: [
          { text: "HUMAN INPUT: ✅ Proposal approved. The AI Wealth Advisor is now preparing the client presentation for the RM.", bubble: ["wealth-advisor", "Preparing client documents."], agent: "wealth-advisor", type: 'optimized',
            explanation: "<h3>Automated Execution</h3><p>Upon receiving human approval, the agentic system seamlessly transitions to the next logical task—automating the tedious work of preparing the client-facing materials.</p>",
            challenge: "<h3>Workflow Orchestration</h3><p>Executing this requires the agent to reliably interact with multiple systems: generating documents, updating the CRM, and scheduling the meeting. This requires robust orchestration.</p><p><strong>Potential Solutions:</strong></p><ul><li>Use <strong>watsonx Orchestrate</strong> to manage this multi-step, multi-system workflow, ensuring each step is completed reliably after the human approval is logged.</li></ul>"
          }
        ],
        declinePlan: [
          { text: "HUMAN INPUT: ❌ Proposal declined. The system logs the feedback for the Model Tuner agent to learn from.", bubble: ["resilience-ops", "Logging feedback for model tuning."], agent: "resilience-ops",
            explanation: "<h3>Learning from Feedback</h3><p>The system treats human rejection not as a failure, but as a valuable data point. It automatically captures this feedback to improve its future recommendations.</p>",
            challenge: "<h3>Continuous Improvement Loop</h3><p>How do you ensure this feedback is actually used to make the AI model better? This requires a formal MLOps process for continuous learning and adaptation.</p><p><strong>Potential Solutions:</strong></p><ul><li>The feedback captured by <strong>watsonx Orchestrate</strong> is fed back into <strong>watsonx.governance</strong>. This triggers a process where the model is retrained on the new data, evaluated in a sandbox, and redeployed only after showing improved performance.</li></ul>"
          }
        ]
    }
};

// --- (The rest of the JS framework remains the same) ---

// --- CANVAS & DRAWING FUNCTIONS ---
let dashOffset = 0;
let animationFrameId = null;

function clearCanvas() {
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = null;
  }
  const canvas = document.getElementById('arrowCanvas');
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawArrow(fromId, toId, offset) {
  const canvas = document.getElementById('arrowCanvas');
  const container = document.querySelector('.dashboard-container'); 
  canvas.width = container.offsetWidth;
  canvas.height = container.offsetHeight;
  const ctx = canvas.getContext('2d');

  const fromEl = document.getElementById(fromId);
  const toEl = document.getElementById(toId);
  
  if (!fromEl || !toEl) return;

  const containerPadding = parseFloat(window.getComputedStyle(container).paddingLeft);

  const startX = fromEl.offsetLeft + fromEl.offsetWidth / 2 - containerPadding;
  const startY = fromEl.offsetTop + fromEl.offsetHeight / 2 - containerPadding;
  const endX = toEl.offsetLeft + toEl.offsetWidth / 2 - containerPadding;
  const endY = toEl.offsetTop + toEl.offsetHeight / 2 - containerPadding;

  ctx.setLineDash([10, 5]);
  ctx.lineDashOffset = -offset;
  ctx.strokeStyle = '#0f62fe';
  ctx.lineWidth = 1;

  ctx.beginPath();
  ctx.moveTo(startX, startY);
  ctx.lineTo(endX, endY);
  ctx.stroke();

  ctx.setLineDash([]);
  const angle = Math.atan2(endY - startY, endX - startX);
  ctx.beginPath();
  ctx.moveTo(endX, endY);
  ctx.lineTo(endX - 10 * Math.cos(angle - Math.PI / 6), endY - 10 * Math.sin(angle - Math.PI / 6));
  ctx.lineTo(endX - 10 * Math.cos(angle + Math.PI / 6), endY - 10 * Math.sin(angle + Math.PI / 6));
  ctx.closePath();
  ctx.fillStyle = '#0f62fe';
  ctx.fill();
}

function startArrowAnimation(fromId, toId) {
  dashOffset = 0;
  const animate = () => {
    dashOffset += 0.5;
    clearCanvas();
    drawArrow(fromId, toId, dashOffset);
    animationFrameId = requestAnimationFrame(animate);
  };
  animate();
}

function showBubble(agent, msg) {
  const icons = { 'gba-strategy': '🌏', 'fraud-detection': '🛡️', 'wealth-advisor': '📈', 'hkma-compliance': '⚖️', 'sme-service': '💼', 'resilience-ops': '⚙️' };
  const bubble = document.getElementById("bubble-" + agent);
  if (!bubble) return;
  bubble.textContent = '';
  bubble.className = 'bubble typing';
  setTimeout(() => {
    bubble.textContent = icons[agent] + ' ' + msg;
    bubble.className = 'bubble show';
    setTimeout(() => { bubble.className = 'bubble shrink-out'; }, 2500);
  }, 800);
}

// --- UI & STATE MANAGEMENT FUNCTIONS ---
function updateExplanation(htmlContent) {
    const explanationContainer = document.getElementById('explanation-text');
    explanationContainer.innerHTML = htmlContent;
}

function updateChallenges(htmlContent) {
    const challengesContainer = document.getElementById('challenges-text');
    challengesContainer.innerHTML = htmlContent;
}

function handleHumanChoice(branchName) {
  const humanInputContainer = document.getElementById('humanInputContainer');
  humanInputContainer.innerHTML = '';
  isWaitingForHuman = false;
  document.getElementById('nextStepBtn').disabled = false;
  
  const nextSteps = config.branches[branchName];
  currentScenarioSteps.splice(stepIndex, 1, ...nextSteps);
  nextStep();
}

function askForHumanInput(step) {
  isWaitingForHuman = true;
  document.getElementById('nextStepBtn').disabled = true;

  updateExplanation(step.explanation);
  updateChallenges(step.challenge);

  const humanInputContainer = document.getElementById('humanInputContainer');
  humanInputContainer.innerHTML = `<p>${step.text}</p>`;
  
  step.options.forEach(option => {
    const btn = document.createElement('button');
    btn.textContent = option.text;
    btn.onclick = () => handleHumanChoice(option.branch);
    humanInputContainer.appendChild(btn);
  });
}

function executeStep(step) {
  clearCanvas();
  const log = document.getElementById("scenarioLog");

  if (step.type === 'human_approval') {
    askForHumanInput(step);
    return;
  }
  
  updateExplanation(step.explanation || '<p>The agents are processing the next action...</p>');
  updateChallenges(step.challenge || '<p>No specific challenges highlighted for this step.</p>');


  const logEntry = document.createElement('div');
  logEntry.textContent = step.text;
  if (step.type === 'event') { logEntry.className = 'log-event'; }
  else if (step.type === 'learning') { logEntry.className = 'log-learning'; }
  else if (step.type === 'optimized') { logEntry.className = 'log-optimized'; }
  log.appendChild(logEntry);

  if (step.bubble) showBubble(step.bubble[0], step.bubble[1]);
  if (step.handoffTo) startArrowAnimation(step.agent, step.handoffTo);

  const agents = Array.isArray(step.agent) ? step.agent : [step.agent];
  agents.forEach(agentName => {
    if (agentName) {
      const cardEl = document.getElementById(agentName);
      if (cardEl) {
        const statusEl = cardEl.querySelector(".status");
        
        cardEl.classList.add("active");
        statusEl.textContent = "Active";
        statusEl.className = "status active";

        setTimeout(() => {
          cardEl.classList.remove("active");
          statusEl.textContent = "Idle";
          statusEl.className = "status idle";
        }, 2500);
      }
    }
  });
}

function nextStep() {
  if (isWaitingForHuman) return;

  if (stepIndex < currentScenarioSteps.length) {
    executeStep(currentScenarioSteps[stepIndex]);
    stepIndex++;
  } else {
    clearCanvas(); // Add this line to stop the animation
    document.getElementById('nextStepBtn').disabled = true;
    const log = document.getElementById("scenarioLog");
    const endMessage = document.createElement('p');
    endMessage.className = 'log-end';
    endMessage.innerHTML = '🏁 End of Scenario 🏁';
    if (!log.querySelector('.log-end')) {
        log.appendChild(endMessage);
    }
    updateExplanation('<h3>Scenario Complete</h3><p>The agentic system has successfully achieved its goal. It can now be tasked with a new objective or continue monitoring for new events.</p>');
    updateChallenges('<h3>Post-Scenario Review</h3><p>After a scenario, the full trace of agent actions, decisions, and tool usage would be reviewed to ensure performance, manage costs, and identify areas for improvement.</p>');
  }
}

function runScenario(type, btnElement) {
  document.querySelectorAll('.scenario-btn').forEach(btn => btn.classList.remove('btn-active'));
  if (btnElement) btnElement.classList.add('btn-active');

  stepIndex = 0;
  isWaitingForHuman = false;
  currentScenarioSteps = config.scenarios[type].steps;

  document.getElementById('humanInputContainer').innerHTML = '';
  document.getElementById('nextStepBtn').disabled = false;
  const log = document.getElementById("scenarioLog");
  log.innerHTML = "";
  clearCanvas();
  updateExplanation('<p>Select a scenario and click "Next Step" to begin. This panel will update to explain the value of each agent action.</p>');
  updateChallenges('<p>This panel will highlight the operational challenges and risks associated with each agent action.</p>');
  document.querySelectorAll(".status").forEach(s => { s.textContent = "Idle"; s.className = "status idle"; });
  document.querySelectorAll('.agent-card').forEach(c => c.classList.remove('active'));

  const scenarioName = config.scenarios[type].name;
  log.innerHTML = `<p>[ Scenario loaded: <b>${scenarioName}</b>. Click 'Next Step' to begin. ]</p>`;
}

function setupScenarioButtons() {
    const buttonContainer = document.querySelector('.header-container div');
    if (!buttonContainer) return;
    buttonContainer.innerHTML = '';

    Object.keys(config.scenarios).forEach(key => {
        const scenario = config.scenarios[key];
        const btn = document.createElement('button');
        btn.className = 'scenario-btn';
        btn.innerHTML = scenario.name;
        btn.onclick = () => runScenario(key, btn);
        buttonContainer.appendChild(btn);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    // Load config into HTML
    document.title = config.title;
    document.querySelector('.header-container h1').textContent = config.title;
    document.querySelector('.header-container p').textContent = config.subtitle;

    config.agents.forEach(agent => {
        const h3 = document.getElementById(`${agent.id}-h3`);
        const desc = document.getElementById(`${agent.id}-desc`);
        const card = document.getElementById(agent.id);
        const bubble = document.getElementById(`bubble-${agent.id}`);

        if(h3 && desc && card && bubble) {
            h3.innerHTML = agent.name;
            desc.textContent = agent.desc;
            // IMPORTANT: Update the card and bubble IDs to the agent's functional key
            card.id = agent.key;
            bubble.id = `bubble-${agent.key}`;
        }
    });

    setupScenarioButtons();
    
    // Set a default scenario to run
    const firstScenarioKey = Object.keys(config.scenarios)[0];
    const firstButton = document.querySelector('.scenario-btn');
    if (firstScenarioKey && firstButton) {
        runScenario(firstScenarioKey, firstButton);
    }
});
