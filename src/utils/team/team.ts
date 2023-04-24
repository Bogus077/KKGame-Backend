import { CreateTeamType } from "../../schema/team";
import { Team } from "../../models";

/**
 * Создание команды
 */
export const createTeam = async ({ name }: CreateTeamType['request'], UserId: number) => {
  const team = await Team.create({ name, UserId })
  if (!team) throw { errorMessage: `Пользователь не найден` };

  const teams = await Team.findAll({ where: { UserId } });
  return teams;
}