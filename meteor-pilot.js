if (Meteor.isServer) {
  var site = "scratch.ryanyeske.com";

  Accounts.registerLoginHandler(function (options) {
    if (!options.password || !options.username)
      return undefined;

    check(options, {username: String, password: String});

    //curl -d'app_id=2_6929_bowybBZbs&api_key=VbMVzLJXxcSo8B8&data={"username":"rcy","site":"scratch.ryanyeske.com","password":"hello"}' https://www1.moon-ray.com/api.php/json/pilotpress/authenticate_user

    var result = HTTP.post('https://www1.moon-ray.com/api.php/json/pilotpress/authenticate_user',
                           { headers: { "Accept": "application/json" },
                             params: { app_id: '2_6929_bowybBZbs',
                                       api_key: 'VbMVzLJXxcSo8B8',
                                       data: JSON.stringify( { username: options.username,
                                                               password: options.password,
                                                               site: site })
                                     }});

    var content = JSON.parse(result.content);
    if (Meteor._get(content, 'type') === 'error')
      throw new Meteor.Error(403, Meteor._get(content, 'message'));

    if (!content.pilotpress || !content.pilotpress.username === 'username')
      throw new Meteor.Error(400, 'could not find pilotpress username');

    throw new Meteor.Error(501, 'almost there...');

    return { id: 'abc' };
  });
}

if (Meteor.isClient) {
  Meteor.loginWithPilotPress = function (username, password, callback) {
    Accounts.callLoginMethod({
      methodArguments: [{username: username, password: password}],
      userCallback: callback});
  };
}
