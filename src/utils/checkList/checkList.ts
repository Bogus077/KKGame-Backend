import { CheckList } from "../../models";
import { CreateCheckListType } from "../../schema/checklist";
import { createCheckListRules, validateData } from "../validationRules";

/**
 * Создание нового чеклиста
 */
export const createCheckList = async ({ title, time, UserId }: CreateCheckListType['request']) => {
  validateData({ title }, createCheckListRules);
  const createdCheckList = await CheckList.create({ title, time, UserId });

  return createdCheckList;
}