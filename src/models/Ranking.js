import { query } from '../config/db.js';
export async function topHeroes(limit = 10) {
  return query(`SELECT * FROM rankings WHERE tipo_ranking='PvE' ORDER BY level DESC, kills DESC LIMIT ?`, [limit]);
}
export async function topGuilds(limit = 10) {
  return query(`SELECT DISTINCT guilda, MAX(level) AS topLevel FROM rankings WHERE guilda IS NOT NULL AND guilda<>'' GROUP BY guilda ORDER BY topLevel DESC LIMIT ?`, [limit]);
}