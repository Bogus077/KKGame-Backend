import { Kid } from "../../models";
import { CreateKidType, DeleteKidType, EditKidType, GetKidType } from "../../schema/kid";
import { deleteKidRules, editKidRules, getKidRules, kidRules, validateData } from "../validationRules";

/**
 * Добавление участника
 */
export const createKid = async ({ name, surname, TeamId }: CreateKidType['request'], UserId: number) => {
  validateData({ name, surname, UserId }, kidRules);
  const createdKid = await Kid.create({ name, surname, TeamId, UserId })
  if (!createdKid) throw { errorMessage: `Ошибка добавления участника` };

  return createdKid;
}

/**
 * Получение данных участника
 */
export const getKid = async ({ id }: GetKidType['request'], UserId: number) => {
  validateData({ id, UserId }, getKidRules);
  const kid = await Kid.findOne({ where: { id, UserId } })
  if (!kid) throw { errorMessage: `Ученик не найден` };

  return kid;
}

/**
 * Изменение данных участника
 */
export const editKid = async ({ name, surname, TeamId, id }: EditKidType['request'], UserId: number) => {
  validateData({ name, surname, id }, editKidRules);
  const kid = await Kid.findOne({ where: { id, UserId } })
  if (!kid) throw { errorMessage: `Ученик не найден` };
  await kid.update({ name, surname, TeamId });

  return kid;
}

/**
 * Удаление данных участника
 */
export const deleteKid = async ({ id }: DeleteKidType['request'], UserId: number) => {
  validateData({ id }, deleteKidRules);
  const kid = await Kid.findOne({ where: { id, UserId } })
  if (!kid) throw { errorMessage: `Ученик не найден` };
  await kid.destroy();
}