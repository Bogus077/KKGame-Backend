'use strict';
import { User } from './User';
import { UserRefresh } from './UserRefresh';
import { CheckList } from './CheckList';
import { CheckListItem } from './CheckListItem';


export {
  User,
  UserRefresh,
  CheckList,
  CheckListItem,
};

User.hasMany(UserRefresh, {
  sourceKey: 'id',
  foreignKey: 'UserId',
  as: 'refresh' // this determines the name in `associations`!
});
UserRefresh.belongsTo(User);

User.hasMany(CheckList, {
  sourceKey: 'id',
  foreignKey: 'UserId',
  as: 'checkLists' // this determines the name in `associations`!
});
CheckList.belongsTo(User);

CheckList.hasMany(CheckListItem, {
  sourceKey: 'id',
  foreignKey: 'CheckListId',
  as: 'tasks' // this determines the name in `associations`!
});
CheckListItem.belongsTo(CheckList);

// User.hasMany(Team);
// Team.belongsTo(User);

// // Kids
// User.hasMany(Kid);
// Kid.belongsTo(User);

// Team.hasMany(Kid);
// Kid.belongsTo(Team);


// User.hasMany(UserRefresh);
// UserRefresh.belongsTo(User);
