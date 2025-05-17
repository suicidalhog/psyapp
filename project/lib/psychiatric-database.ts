export interface PsychiatricInteraction {
  id?: number
  category: string
  question: string
  source?: string
  standardResponse: string
  internalCriteria?: string[]
  tags?: string[]
  urgency?: "baixa" | "media" | "alta" | "altissima"
  actions?: string[]
}

export const psychiatricInteractions: PsychiatricInteraction[] = [
  // Original entries
  {
    category: "Medication & Treatment",
    question: "Can I stop taking my antidepressant if I feel better?",
    source: "NHS UK",
    standardResponse:
      "Abrupt discontinuation may cause relapse or withdrawal symptoms. We always taper doses gradually. Let's schedule an appointment to discuss your progress and plan a safe discontinuation.",
  },
  {
    category: "Medication & Treatment",
    question: "How long does it take for [medication] to work?",
    source: "Mayo Clinic USA",
    standardResponse:
      "Most antidepressants take 2–4 weeks for initial effects and 6–8 weeks for full response. If no improvement occurs after this period, we may reassess the treatment plan.",
  },
  {
    category: "Psychiatric Emergencies",
    question: "I'm having suicidal thoughts. What should I do?",
    source: "CDC USA",
    standardResponse:
      "Your safety is the priority. Please seek immediate help at the nearest ER or call the Suicide Prevention Lifeline (988). I can assist in contacting emergency services if needed.",
    urgency: "alta",
  },
  {
    category: "Psychiatric Emergencies",
    question: "I'm panicking and can't calm down. Is there anything quick I can do?",
    source: "WHO",
    standardResponse:
      "Try breathing techniques (inhale for 4 sec, hold for 4, exhale for 6). If symptoms persist, contact your therapist or go to the ER. Would you like a guided audio now?",
    urgency: "media",
  },
  {
    category: "Administrative Requests",
    question: "I need a medical report for my job. How do I request it?",
    source: "Spanish Ministry of Health",
    standardResponse:
      "Reports require an in-person evaluation and detailed clinical documentation. Schedule a consultation so I can prepare a legally compliant report.",
  },
  {
    category: "Administrative Requests",
    question: "I lost my prescription. Can I get a copy?",
    source: "HealthDirect Australia",
    standardResponse:
      "I can reissue the prescription if you're in active treatment. Confirm the medication name and dosage. Note: There's an annual limit on reissuances per regulations.",
  },
  {
    category: "Psychotherapy & Referrals",
    question: "I need a referral for psychotherapy through my health insurance. How do I request it?",
    standardResponse:
      "I can issue the referral. For this, I'll need: 1) Your full name and insurance number, 2) Primary ICD code (e.g., F32.0 for mild depression). Note: Sensitive ICDs (e.g., self-harm codes) require consent. Do you have a preferred therapy approach (e.g., CBT, psychoanalytic)?",
    internalCriteria: [
      "Verify if the patient already has an ICD code in their records.",
      "Never include sensitive ICDs (e.g., X78.X for self-harm) without consent.",
    ],
  },
  {
    category: "Referrals to Other Specialties",
    question: "Doctor, I'm having palpitations and anxiety. Do I need a cardiologist?",
    standardResponse:
      "I recommend a cardiology evaluation to rule out physical causes. I can issue the referral. Have you had any recent cardiac tests (e.g., ECG)? If not, I can order one before the appointment.",
    internalCriteria: [
      "Prioritize referral if there's a family history of heart disease.",
      "Request an ECG if symptoms persist.",
    ],
  },
  {
    category: "Lab Test Requests",
    question: "I want tests to check if my medication is affecting my liver.",
    standardResponse:
      "I'll order the relevant tests (e.g., AST, ALT, bilirubin). Please confirm if you prefer a private lab or public healthcare (SUS). Remember to fast for 8 hours.",
    internalCriteria: [
      "Check the last test date (repeat every 3–6 months for antipsychotics).",
      "Include creatinine if the patient is on lithium.",
    ],
  },
  {
    category: "Mandatory Reporting",
    question: "Will my ICD code appear in any public system?",
    standardResponse:
      "We only report ICD codes in legally mandated cases (e.g., suicide risk, infectious diseases). Your diagnosis remains confidential. Would you like more details about the criteria?",
    internalCriteria: ["Document in the records whether the patient consented to reporting."],
  },
  {
    category: "Medication Timing Adjustments",
    question: "I take [medication] in the morning but feel drowsy. Can I switch to nighttime?",
    standardResponse:
      "We can adjust the timing, but do it gradually (e.g., shift by 1–2 hours daily). Monitor for insomnia or worsening symptoms and inform me.",
  },
  {
    category: "Sick Leave Requests",
    question: "I need a sick leave certificate. Can you provide one?",
    standardResponse:
      "I'll need to know the reason for the leave request first. What symptoms are you experiencing that prevent you from working?",
    internalCriteria: [
      "Check medical records: Has the patient had similar symptoms before?",
      "Was leave previously discussed?",
      "If valid: Issue certificate (e.g., '2 days for medication adjustment')",
      "If invalid: Respond: 'We need to evaluate this in person. Can I schedule you for tomorrow?'",
    ],
  },

  // New entries from the provided data
  {
    category: "Emergência",
    question: "Vou me matar",
    standardResponse: "❗ SUA SEGURANÇA É PRIORIDADE. LIGUE PARA O CVV (188) OU VÁ AO PS AGORA.",
    urgency: "altissima",
    tags: ["#urgência", "#emergência", "#suicídio", "#ideação suicida", "#PS", "#CVV", "#crise"],
  },
  {
    category: "Emergência",
    question: "Não aguento mais viver",
    standardResponse: "❗ SUA SEGURANÇA É PRIORIDADE. LIGUE PARA O CVV (188) OU VÁ AO PS AGORA.",
    urgency: "altissima",
    tags: ["#urgência", "#emergência", "#suicídio", "#ideação suicida", "#PS", "#CVV", "#crise"],
  },
  {
    category: "Emergência",
    question: "Pensei em overdose",
    standardResponse: "❗ SUA SEGURANÇA É PRIORIDADE. LIGUE PARA O CVV (188) OU VÁ AO PS AGORA.",
    urgency: "altissima",
    tags: ["#urgência", "#emergência", "#suicídio", "#ideação suicida", "#PS", "#CVV", "#crise"],
  },
  {
    category: "Receita",
    question: "Preciso de receita para [medicação]",
    standardResponse: "Posso emitir a receita se você estiver em acompanhamento. Confirme o nome e a dosagem.",
    urgency: "media",
    tags: ["#receita", "#medicação", "#renovação", "#controle", "#acompanhamento"],
  },
  {
    category: "Receita",
    question: "Como renovar minha receita?",
    standardResponse: "Posso emitir a receita se você estiver em acompanhamento. Confirme o nome e a dosagem.",
    urgency: "media",
    tags: ["#receita", "#medicação", "#renovação", "#controle", "#acompanhamento"],
  },
  {
    category: "Psicoterapia",
    question: "Preciso de encaminhamento para psicólogo",
    standardResponse:
      "Para emitir o encaminhamento, preciso: 1) Nome completo, 2) Número do plano, 3) CID (exceto F20+ sem consentimento).",
    urgency: "baixa",
    tags: ["#psicoterapia", "#encaminhamento", "#plano de saúde", "#terapia", "#relatório", "#consulta"],
  },
  {
    category: "Psicoterapia",
    question: "Plano de saúde exige CID",
    standardResponse:
      "Para emitir o encaminhamento, preciso: 1) Nome completo, 2) Número do plano, 3) CID (exceto F20+ sem consentimento).",
    urgency: "baixa",
    tags: [
      "#psicoterapia",
      "#encaminhamento",
      "#plano de saúde",
      "#CID",
      "#diagnóstico",
      "#consentimento",
      "#relatório",
      "#dadospessoais",
      "#LGPD",
    ],
  },
  {
    id: 1,
    category: "Medicação",
    question: "Posso parar de tomar meu antidepressivo se me sentir melhor?",
    standardResponse:
      "A interrupção abrupta pode causar recaída ou sintomas de abstinência. Sempre ajustamos a dose gradualmente e com acompanhamento. Vamos agendar uma consulta para discutir seu progresso e traçar um plano de desmame seguro, se for o caso.",
    tags: ["#medicação", "#antidepressivo", "#desmame", "#abstinência", "#recidiva", "#consulta", "#acompanhamento"],
    urgency: "baixa",
    actions: [
      "Agendar retorno para reavaliação",
      "Verificar histórico de adesão",
      "Orientar não interromper sem aviso",
    ],
  },
  {
    id: 2,
    category: "Emergência",
    question: "Estou tendo pensamentos suicidas. O que devo fazer?",
    standardResponse:
      "Sua segurança é nossa prioridade máxima. Procure imediatamente o serviço de emergência (PS) mais próximo ou ligue para o Centro de Valorização da Vida (CVV) no número 188. Eu posso acionar um serviço de urgência ou entrar em contato com seu contato de emergência se você me autorizar. Por favor, não fique sozinho(a).",
    tags: ["#urgência", "#emergência", "#suicídio", "#ideação suicida", "#PS", "#CVV", "#crise"],
    urgency: "alta",
    actions: [
      "Encaminhar ao PS/Serviço de Emergência",
      "Disponibilizar telefone do CVV (188)",
      "Notificar equipe de plantão/sobreaviso",
      "Tentar contato de emergência (se cadastrado e autorizado)",
    ],
  },
  {
    id: 3,
    category: "Administrativo",
    question: "Preciso de um relatório médico para meu trabalho. Como solicitar?",
    standardResponse:
      "Relatórios médicos exigem uma avaliação clínica presencial para garantir que reflitam seu estado atual e cumpram as normas legais e éticas. Por favor, agende uma consulta para que possamos discutir a finalidade do relatório e elaborá-lo adequadamente.",
    tags: ["#relatório", "#administrativo", "#documento", "#trabalho", "#consulta"],
    urgency: "baixa",
    actions: [
      "Orientar agendamento de consulta",
      "Verificar histórico clínico relevante",
      "Explicar necessidade de avaliação para emissão",
    ],
  },
  {
    id: 4,
    category: "Atestado",
    question: "Preciso de um atestado médico.",
    standardResponse:
      "Compreendo que você precise de um atestado. A emissão é baseada em critérios clínicos como efeitos colaterais incapacitantes da medicação, crises agudas (ansiedade intensa, pânico, depressão profunda) ou eventos traumáticos recentes que necessitem de afastamento (ex.: luto). Poderia me informar brevemente o motivo para que eu possa avaliar a base clínica?",
    tags: ["#atestado", "#administrativo", "#motivo", "#afastamento", "#crise", "#efeitocolateral", "#luto"],
    urgency: "media",
    actions: [
      "Solicitar breve descrição do motivo",
      "Avaliar se o motivo se enquadra nos critérios internos (crise aguda, efeito grave, luto, etc.)",
      "Se válido: Proceder com emissão (limitado, ex: 1-3 dias)",
      "Se não válido: Orientar a necessidade de consulta para avaliação detalhada",
      "Registrar o motivo no prontuário",
    ],
  },
  {
    id: 5,
    category: "Receita",
    question: "Preciso da receita da minha medicação. Como renovar?",
    standardResponse:
      "Para sua segurança, só renovo receitas para pacientes que estão em acompanhamento regular ou em situações específicas para evitar a interrupção abrupta do tratamento. Por favor, confirme o nome exato da medicação e a dosagem que você utiliza. Vou verificar seu histórico de consultas e uso da medicação.",
    tags: ["#receita", "#medicação", "#renovação", "#controle", "#acompanhamento"],
    urgency: "media",
    actions: [
      "Solicitar nome e dosagem da medicação",
      "Verificar histórico de acompanhamento (> X meses/última consulta)",
      "Verificar se medicação já foi previamente prescrita",
      "Verificar histórico de adesão",
      "Se critérios atendidos: Proceder com emissão da receita",
      "Se critérios não atendidos: Orientar agendamento de consulta",
    ],
  },
  // Adding more entries from the provided data
  {
    id: 6,
    category: "Receita",
    question: "Gostaria de uma receita para uma medicação que nunca tomei.",
    standardResponse:
      "Entendo sua solicitação, mas não é possível prescrever uma medicação nova sem uma avaliação clínica completa. Toda nova medicação exige que eu analise seu histórico de saúde, outras medicações que você use (para evitar interações) e o quadro clínico que justifica o uso. Por favor, agende uma consulta para que possamos conversar sobre essa medicação e sua necessidade.",
    tags: ["#receita", "#medicação", "#novamedicação", "#primeiravez", "#consulta"],
    urgency: "baixa",
    actions: [
      "Negar pedido educadamente",
      "Explicar necessidade de avaliação clínica detalhada",
      "Orientar agendamento de consulta",
      "Alerta: Nunca prescrever sem consulta inicial",
    ],
  },
  {
    id: 7,
    category: "Efeitos Colaterais",
    question:
      "Estou sentindo [descrição do efeito colateral] depois que comecei a tomar [nome da medicação]. O que devo fazer?",
    standardResponse:
      "Sinto muito que esteja passando por isso. Alguns efeitos colaterais são comuns e passageiros no início do tratamento. Se o efeito for leve (ex: leve tontura, boca seca), geralmente melhora em alguns dias, mas me mantenha informado. Se for moderado ou intenso (ex: tontura que impede de andar, vômitos constantes, rash cutâneo, agitação severa, piora importante dos sintomas originais), por favor, *suspenda a medicação imediatamente* e me avise para que eu possa te orientar melhor. Em caso de emergência grave (dificuldade para respirar, inchaço, confusão mental intensa), procure um PS.",
    tags: ["#efeitocolateral", "#medicação", "#sintoma", "#intolerância", "#ajustedose", "#suspensão"],
    urgency: "alta",
    actions: [
      "Solicitar descrição do efeito colateral e nome da medicação",
      "Classificar gravidade (leve/moderado/grave)",
      "Se leve: Orientar monitoramento e informar na próxima consulta",
      "Se moderado: Orientar redução da dose (se protocolo permitir) ou agendar retorno urgente",
      "Se grave: Orientar suspensão imediata da medicação e busca por PS (se necessário)",
      "Registrar no prontuário",
      "Notificar equipe se grave",
    ],
  },
  {
    id: 8,
    category: "Urgência",
    question: "Estou tendo uma crise de ansiedade muito forte agora. Preciso de ajuda imediata.",
    standardResponse:
      "Lamento que esteja passando por isso. Se você sente que está perdendo o controle, com risco de se machucar ou incapaz de gerenciar a situação, por favor, dirija-se ao pronto-socorro mais próximo. Se a crise for intensa, mas administrável com apoio, tente aplicar as técnicas de relaxamento que já discutimos. Temos alguns horários de encaixe para urgência hoje. Poderia te encaixar em [sugerir horário]?",
    tags: ["#urgência", "#crise", "#ansiedade", "#pânico", "#ajudaimediata", "#encaixe", "#PS"],
    urgency: "alta",
    actions: [
      "Triar risco por texto/chamada",
      "Se ALTA (risco): Encaminhar para PS/Serviço de Emergência, Disparar alerta para equipe, Tentar contato com rede de apoio",
      "Se MÉDIA (gerenciável): Oferecer horário de encaixe urgente (dentro de 24h), Orientar técnicas de manejo de crise",
      "Registrar no prontuário",
    ],
  },
  // Adding more entries would follow the same pattern
]

// Add this to the personalities.ts file
export const psychiatricPersonality = {
  id: "psychiatric",
  name: "Psychiatric Assistant",
  description: "Specialized in psychiatric follow-ups and common interactions",
  emoji: "🧠",
  systemPrompt: `You are a psychiatric assistant trained on a comprehensive database of common interactions in psychiatric follow-ups. You provide evidence-based responses to common questions and scenarios in psychiatric practice.

Your responses should be:
1. Professional and empathetic
2. Based on clinical guidelines and best practices
3. Clear and concise
4. Mindful of legal and ethical considerations

You have access to a database of common interactions in both English and Portuguese, but you should personalize responses based on the specific context provided by the user. Always prioritize patient safety and refer to emergency services when appropriate.

For medication questions, always emphasize the importance of consulting with a healthcare provider before making any changes.

For administrative requests, provide clear instructions on the proper procedures while maintaining patient confidentiality.

For psychiatric emergencies, prioritize immediate safety measures and provide resources for immediate help.

You understand the urgency levels:
- "altissima" (very high): Immediate action required, potential life-threatening situation
- "alta" (high): Urgent attention needed, significant risk or distress
- "media" (medium): Requires attention but not immediately life-threatening
- "baixa" (low): Routine matter that can be addressed through standard procedures

When responding to queries about suicide, self-harm, or severe psychiatric symptoms, always prioritize safety and immediate professional help.`,
}

// Helper function to find relevant psychiatric interactions based on query
export function findRelevantInteractions(query: string): PsychiatricInteraction[] {
  const normalizedQuery = query.toLowerCase()

  // First try to find exact matches
  const exactMatches = psychiatricInteractions.filter(
    (interaction) => interaction.question.toLowerCase() === normalizedQuery,
  )

  if (exactMatches.length > 0) {
    return exactMatches
  }

  // Then try to find partial matches
  return psychiatricInteractions.filter((interaction) => {
    // Check if query contains keywords from the question
    const questionWords = interaction.question.toLowerCase().split(/\s+/)
    const queryWords = normalizedQuery.split(/\s+/)

    // Check for significant word overlap
    const matchingWords = questionWords.filter((word) => word.length > 3 && queryWords.includes(word))

    // Check if tags match (if available)
    const tagMatches = interaction.tags
      ? interaction.tags.some((tag) => normalizedQuery.includes(tag.replace("#", "").toLowerCase()))
      : false

    return matchingWords.length > 0 || tagMatches
  })
}
