/* Motor central de regras — Sangue do Olimpo */
const OracleEngine = (() => {
  const SCALE = [
    { key: 'critical', min: 1, max: 5, title: 'Falha crítica' },
    { key: 'failure', min: 6, max: 25, title: 'Falha' },
    { key: 'partial', min: 26, max: 49, title: 'Êxito parcial' },
    { key: 'success', min: 50, max: 74, title: 'Êxito' },
    { key: 'super', min: 75, max: 94, title: 'Êxito superior' },
    { key: 'legend', min: 95, max: 100, title: 'Êxito extraordinário' }
  ];

  const NARRATIVES = {
    general: {
      critical: 'O destino se volta contra você. Um erro grave muda o rumo da ação.',
      failure: 'Seu intento não se concretiza. As circunstâncias não favoreceram sua tentativa.',
      partial: 'Você avança, mas o resultado vem acompanhado de um custo ou complicação.',
      success: 'Sua ação alcança o objetivo esperado.',
      super: 'Sua execução supera as expectativas e produz um resultado especialmente favorável.',
      legend: 'Um feito digno de lenda. Até os deuses parecem testemunhar sua conquista.'
    },
    combat: {
      critical: 'Sua guarda se abre. O adversário encontra uma oportunidade decisiva.',
      failure: 'Seu movimento não encontra brecha na defesa inimiga.',
      partial: 'O golpe encontra seu caminho, mas não sem risco, custo ou consequência.',
      success: 'Seu ataque ou manobra atinge o objetivo.',
      super: 'Um movimento preciso coloca o oponente em clara desvantagem.',
      legend: 'Um golpe memorável. A batalha poderá ser lembrada por este instante.'
    },
    blessing: {
      critical: 'A invocação falha de maneira severa. Nenhum sinal favorável responde ao chamado.',
      failure: 'A divindade permanece em silêncio. A bênção não é concedida.',
      partial: 'Uma centelha divina responde, mas a bênção vem limitada ou acompanhada de uma condição.',
      success: 'A divindade concede sua bênção. Seu favor se manifesta.',
      super: 'A bênção chega com força notável e supera o benefício esperado.',
      legend: 'Uma manifestação extraordinária. O poder divino toca o destino do personagem.'
    },
    skill: {
      critical: 'A execução sai gravemente errada e pode comprometer a tentativa.',
      failure: 'A técnica não funciona como pretendido.',
      partial: 'A habilidade funciona apenas em parte ou exige um sacrifício.',
      success: 'Você domina a execução e realiza a habilidade.',
      super: 'A habilidade é executada com excelência e efeito ampliado.',
      legend: 'Uma demonstração excepcional de domínio. Sua habilidade alcança um novo patamar.'
    },
    defense: {
      critical: 'Sua defesa falha no pior momento. Você fica exposto à consequência do ataque.',
      failure: 'Você não consegue evitar ou suportar completamente o impacto.',
      partial: 'Você reduz parte do impacto, mas ainda sofre uma consequência.',
      success: 'Você defende ou evita o ataque com sucesso.',
      super: 'Sua reação é exemplar. Você evita o perigo e conquista vantagem.',
      legend: 'Uma defesa lendária. Você transforma um perigo certo em uma oportunidade.'
    }
  };

  function classify(value) {
    return SCALE.find(item => value >= item.min && value <= item.max);
  }

  function roll({ type = 'general', bonus = 0, penalty = 0, random = Math.random } = {}) {
    const raw = Math.floor(random() * 100) + 1;
    const safeBonus = Number.isFinite(Number(bonus)) ? Number(bonus) : 0;
    const safePenalty = Number.isFinite(Number(penalty)) ? Number(penalty) : 0;
    const adjustment = safeBonus - safePenalty;
    const total = Math.max(1, Math.min(100, raw + adjustment));
    const outcome = classify(total);
    const validType = NARRATIVES[type] ? type : 'general';
    return {
      raw,
      bonus: safeBonus,
      penalty: safePenalty,
      adjustment,
      total,
      type: validType,
      key: outcome.key,
      title: outcome.title,
      description: NARRATIVES[validType][outcome.key]
    };
  }

  return { roll, classify, scale: SCALE.map(item => ({ ...item })) };
})();
