/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('casos').del()

  await knex('casos').insert([
    {id: 1, titulo: 'Furto', descricao: 'Bolsa foi furtada em Beira Mar na terça feira de manhã', status: 'aberto', agenteId: 1},
    {id: 2, titulo: 'Homicídio', descricao: 'Briga de bar resulta em homicídio e suspeito é encontrado em hotel ao lado de estabelecimento', status: 'solucionado', agenteId: 2},
    {id: 3, titulo: 'Assalto', descricao: 'Posto de gasolina é assaltado à mão armada, motoristo é fragrado e encontrado em banco', status: 'solucionado', agenteId: 3},
    {id: 4, titulo: 'Assalto', descricao: 'Posto de gasolina é assaltado à mão armada, assaltante ainda não localizado', status: 'aberto', agenteId: 3}
  ]);
};
