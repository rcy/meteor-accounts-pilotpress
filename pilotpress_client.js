console.log('thing');
Meteor.loginWithPilotPress = function (username, password, callback) {
  check(username, String);
  check(password, String);

  Accounts.callLoginMethod({
    methodArguments: [{username: username, password: password}],
    userCallback: callback});
};
