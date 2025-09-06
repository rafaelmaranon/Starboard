import { 
  Users, 
  AlertTriangle, 
  Star, 
  TrendingUp, 
  Target, 
  BarChart3,
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  DollarSign,
  Zap,
  Shield,
  PieChart
} from "lucide-react";

interface ValidationData {
  userAnalysis: {
    targetUsers: string[];
    userPersonas: Array<{
      name: string;
      demographics: string;
      painPoints: string[];
      goals: string[];
    }>;
    userJourney: string[];
  };
  painPoints: {
    primaryProblems: Array<{
      problem: string;
      severity: "low" | "medium" | "high" | "critical";
      frequency: "rare" | "occasional" | "frequent" | "constant";
      currentSolutions: string[];
    }>;
    marketGap: string;
  };
  features: {
    coreFeatures: Array<{
      name: string;
      description: string;
      priority: "must-have" | "should-have" | "nice-to-have";
      complexity: "low" | "medium" | "high";
      userValue: string;
    }>;
    mvpFeatures: string[];
    futureFeatures: string[];
  };
  risks: {
    technicalRisks: Array<{
      risk: string;
      probability: "low" | "medium" | "high";
      impact: "low" | "medium" | "high";
      mitigation: string;
    }>;
    marketRisks: Array<{
      risk: string;
      probability: "low" | "medium" | "high";
      impact: "low" | "medium" | "high";
      mitigation: string;
    }>;
    businessRisks: Array<{
      risk: string;
      probability: "low" | "medium" | "high";
      impact: "low" | "medium" | "high";
      mitigation: string;
    }>;
  };
  metrics: {
    successMetrics: Array<{
      metric: string;
      target: string;
      timeframe: string;
      measurement: string;
    }>;
    kpis: string[];
    validationMetrics: string[];
  };
  marketAnalysis: {
    marketSize: {
      tam: string;
      sam: string;
      som: string;
    };
    competition: Array<{
      competitor: string;
      strengths: string[];
      weaknesses: string[];
      differentiation: string;
    }>;
    validationSteps: string[];
  };
  viabilityScore: number;
  recommendation: "proceed" | "proceed-with-caution" | "pivot-needed" | "stop";
  reasoning: string;
  nextSteps: Array<{
    step: string;
    priority: "high" | "medium" | "low";
    timeframe: string;
    resources: string;
  }>;
}

interface ValidationResultsProps {
  data: ValidationData;
}

export function ValidationResults({ data }: ValidationResultsProps) {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "low": return "text-green-600 bg-green-50";
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "high": return "text-orange-600 bg-orange-50";
      case "critical": return "text-red-600 bg-red-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "must-have":
      case "high": return "text-red-600 bg-red-50";
      case "should-have":
      case "medium": return "text-yellow-600 bg-yellow-50";
      case "nice-to-have":
      case "low": return "text-green-600 bg-green-50";
      default: return "text-gray-600 bg-gray-50";
    }
  };

  const getRecommendationIcon = () => {
    switch (data.recommendation) {
      case "proceed": return <CheckCircle className="w-6 h-6 text-green-500" />;
      case "proceed-with-caution": return <AlertCircle className="w-6 h-6 text-yellow-500" />;
      case "pivot-needed": return <AlertTriangle className="w-6 h-6 text-orange-500" />;
      case "stop": return <XCircle className="w-6 h-6 text-red-500" />;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 8) return "text-green-600";
    if (score >= 6) return "text-yellow-600";
    if (score >= 4) return "text-orange-600";
    return "text-red-600";
  };

  const getRiskLevel = (probability: string, impact: string) => {
    const probScore = probability === "high" ? 3 : probability === "medium" ? 2 : 1;
    const impactScore = impact === "high" ? 3 : impact === "medium" ? 2 : 1;
    const total = probScore * impactScore;
    
    if (total >= 6) return { level: "High", color: "text-red-600 bg-red-50" };
    if (total >= 4) return { level: "Medium", color: "text-yellow-600 bg-yellow-50" };
    return { level: "Low", color: "text-green-600 bg-green-50" };
  };

  return (
    <div className="space-y-8">
      {/* Overall Assessment */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">Overall Assessment</h2>
          <div className="flex items-center gap-4">
            {getRecommendationIcon()}
            <div className="text-right">
              <div className={`text-3xl font-bold ${getScoreColor(data.viabilityScore)}`}>
                {data.viabilityScore}/10
              </div>
              <div className="text-sm text-gray-500">Viability Score</div>
            </div>
          </div>
        </div>
        <div className="bg-gray-50 rounded-lg p-4">
          <p className="text-gray-700 leading-relaxed">{data.reasoning}</p>
        </div>
      </div>

      {/* User Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Users className="w-6 h-6 text-blue-500" />
          <h3 className="text-xl font-bold text-gray-900">User Analysis</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Target Users</h4>
            <div className="flex flex-wrap gap-2">
              {data.userAnalysis.targetUsers.map((user, index) => (
                <span key={index} className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm">
                  {user}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">User Personas</h4>
            <div className="grid gap-4 md:grid-cols-2">
              {data.userAnalysis.userPersonas.map((persona, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900">{persona.name}</h5>
                  <p className="text-sm text-gray-600 mb-2">{persona.demographics}</p>
                  <div className="space-y-2">
                    <div>
                      <span className="text-xs font-medium text-gray-500">Pain Points:</span>
                      <ul className="text-sm text-gray-700">
                        {persona.painPoints.map((pain, i) => (
                          <li key={i}>• {pain}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-gray-500">Goals:</span>
                      <ul className="text-sm text-gray-700">
                        {persona.goals.map((goal, i) => (
                          <li key={i}>• {goal}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Pain Points */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <AlertTriangle className="w-6 h-6 text-red-500" />
          <h3 className="text-xl font-bold text-gray-900">Pain Points Analysis</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Primary Problems</h4>
            <div className="space-y-3">
              {data.painPoints.primaryProblems.map((problem, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{problem.problem}</h5>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(problem.severity)}`}>
                        {problem.severity}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(problem.frequency)}`}>
                        {problem.frequency}
                      </span>
                    </div>
                  </div>
                  {problem.currentSolutions.length > 0 && (
                    <div>
                      <span className="text-xs font-medium text-gray-500">Current Solutions:</span>
                      <div className="flex flex-wrap gap-1 mt-1">
                        {problem.currentSolutions.map((solution, i) => (
                          <span key={i} className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                            {solution}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Market Gap</h4>
            <p className="text-blue-800">{data.painPoints.marketGap}</p>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Star className="w-6 h-6 text-yellow-500" />
          <h3 className="text-xl font-bold text-gray-900">Feature Analysis</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Core Features</h4>
            <div className="space-y-3">
              {data.features.coreFeatures.map((feature, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between mb-2">
                    <h5 className="font-medium text-gray-900">{feature.name}</h5>
                    <div className="flex gap-2">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(feature.priority)}`}>
                        {feature.priority}
                      </span>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getSeverityColor(feature.complexity)}`}>
                        {feature.complexity} complexity
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{feature.description}</p>
                  <p className="text-sm text-blue-600">
                    <span className="font-medium">Value:</span> {feature.userValue}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">MVP Features</h4>
              <ul className="space-y-2">
                {data.features.mvpFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Future Features</h4>
              <ul className="space-y-2">
                {data.features.futureFeatures.map((feature, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-700">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Risk Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-900">Risk Analysis</h3>
        </div>
        
        <div className="space-y-6">
          {[
            { title: "Technical Risks", risks: data.risks.technicalRisks, color: "blue" },
            { title: "Market Risks", risks: data.risks.marketRisks, color: "green" },
            { title: "Business Risks", risks: data.risks.businessRisks, color: "purple" }
          ].map((category, categoryIndex) => (
            <div key={categoryIndex}>
              <h4 className="font-semibold text-gray-900 mb-3">{category.title}</h4>
              <div className="space-y-3">
                {category.risks.map((risk, index) => {
                  const riskLevel = getRiskLevel(risk.probability, risk.impact);
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4">
                      <div className="flex items-start justify-between mb-2">
                        <h5 className="font-medium text-gray-900">{risk.risk}</h5>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${riskLevel.color}`}>
                          {riskLevel.level} Risk
                        </span>
                      </div>
                      <div className="grid gap-2 md:grid-cols-2 text-sm text-gray-600 mb-2">
                        <div>Probability: <span className="font-medium">{risk.probability}</span></div>
                        <div>Impact: <span className="font-medium">{risk.impact}</span></div>
                      </div>
                      <div className="bg-gray-50 rounded p-2">
                        <span className="text-xs font-medium text-gray-500">Mitigation:</span>
                        <p className="text-sm text-gray-700">{risk.mitigation}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Metrics & KPIs */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <BarChart3 className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-bold text-gray-900">Success Metrics</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Key Success Metrics</h4>
            <div className="space-y-3">
              {data.metrics.successMetrics.map((metric, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{metric.metric}</h5>
                  <div className="grid gap-2 md:grid-cols-3 text-sm text-gray-600">
                    <div>
                      <span className="font-medium">Target:</span> {metric.target}
                    </div>
                    <div>
                      <span className="font-medium">Timeframe:</span> {metric.timeframe}
                    </div>
                    <div>
                      <span className="font-medium">Measurement:</span> {metric.measurement}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Key Performance Indicators</h4>
              <ul className="space-y-2">
                {data.metrics.kpis.map((kpi, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <Target className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-700">{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-gray-900 mb-3">Validation Metrics</h4>
              <ul className="space-y-2">
                {data.metrics.validationMetrics.map((metric, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-blue-500" />
                    <span className="text-sm text-gray-700">{metric}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Market Analysis */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-6 h-6 text-indigo-500" />
          <h3 className="text-xl font-bold text-gray-900">Market Analysis</h3>
        </div>
        
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Market Size</h4>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="bg-blue-50 rounded-lg p-4">
                <div className="text-sm font-medium text-blue-600">TAM (Total Addressable Market)</div>
                <div className="text-lg font-bold text-blue-900">{data.marketAnalysis.marketSize.tam}</div>
              </div>
              <div className="bg-green-50 rounded-lg p-4">
                <div className="text-sm font-medium text-green-600">SAM (Serviceable Addressable Market)</div>
                <div className="text-lg font-bold text-green-900">{data.marketAnalysis.marketSize.sam}</div>
              </div>
              <div className="bg-purple-50 rounded-lg p-4">
                <div className="text-sm font-medium text-purple-600">SOM (Serviceable Obtainable Market)</div>
                <div className="text-lg font-bold text-purple-900">{data.marketAnalysis.marketSize.som}</div>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Competitive Analysis</h4>
            <div className="space-y-3">
              {data.marketAnalysis.competition.map((competitor, index) => (
                <div key={index} className="border border-gray-200 rounded-lg p-4">
                  <h5 className="font-medium text-gray-900 mb-2">{competitor.competitor}</h5>
                  <div className="grid gap-4 md:grid-cols-2 mb-2">
                    <div>
                      <span className="text-xs font-medium text-green-600">Strengths:</span>
                      <ul className="text-sm text-gray-700">
                        {competitor.strengths.map((strength, i) => (
                          <li key={i}>• {strength}</li>
                        ))}
                      </ul>
                    </div>
                    <div>
                      <span className="text-xs font-medium text-red-600">Weaknesses:</span>
                      <ul className="text-sm text-gray-700">
                        {competitor.weaknesses.map((weakness, i) => (
                          <li key={i}>• {weakness}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="bg-blue-50 rounded p-2">
                    <span className="text-xs font-medium text-blue-600">Our Differentiation:</span>
                    <p className="text-sm text-blue-800">{competitor.differentiation}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-semibold text-gray-900 mb-3">Validation Steps</h4>
            <div className="grid gap-2">
              {data.marketAnalysis.validationSteps.map((step, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center text-xs font-bold">
                    {index + 1}
                  </div>
                  <span className="text-sm text-gray-700">{step}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Next Steps */}
      <div className="bg-white rounded-2xl shadow-xl p-8 border border-gray-100">
        <div className="flex items-center gap-3 mb-6">
          <Zap className="w-6 h-6 text-purple-500" />
          <h3 className="text-xl font-bold text-gray-900">Recommended Next Steps</h3>
        </div>
        
        <div className="space-y-3">
          {data.nextSteps.map((step, index) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h5 className="font-medium text-gray-900">{step.step}</h5>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(step.priority)}`}>
                  {step.priority} priority
                </span>
              </div>
              <div className="grid gap-2 md:grid-cols-2 text-sm text-gray-600">
                <div>
                  <span className="font-medium">Timeframe:</span> {step.timeframe}
                </div>
                <div>
                  <span className="font-medium">Resources:</span> {step.resources}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
