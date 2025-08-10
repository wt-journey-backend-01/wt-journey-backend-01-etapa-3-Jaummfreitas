/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex('agentes').del()

  await knex('agentes').insert([
    {id: 1, nome: 'Robson Madeira', dataDeIncorporacao: '2022-08-10', cargo: 'Diretor'},
    {id: 2, nome: 'Beatriz Nascimento', dataDeIncorporacao: '2015-04-04', cargo: 'Comandante'},
    {id: 3, nome: 'Thalles da Silva', dataDeIncorporacao: '2024-12-01', cargo: 'Investigador'},
  ]);
};
