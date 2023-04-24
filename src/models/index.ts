'use strict';
import { User } from './User';
import { UserRefresh } from './UserRefresh';
import { SmsCode } from './SmsCode';
import { Team } from './Team';
import { Kid } from './Kid';

export {
  User,
  UserRefresh,
  SmsCode,
  Team,
  Kid,
};

User.hasMany(UserRefresh, {
  sourceKey: 'id',
  foreignKey: 'UserId',
  as: 'refresh' // this determines the name in `associations`!
});
UserRefresh.belongsTo(User);

User.hasMany(Team);
Team.belongsTo(User);

// Kids
User.hasMany(Kid);
Kid.belongsTo(User);

Team.hasMany(Kid);
Kid.belongsTo(Team);


// User.hasMany(UserRefresh);
// UserRefresh.belongsTo(User);
