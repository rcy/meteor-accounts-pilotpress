Accounts.registerLoginHandler(function (options) {
  console.log('oap login handler', options);
  if (!options.password || !options.username)
    return undefined;

  check(options, {username: String, password: String});

  var settings = Accounts.loginServiceConfiguration.findOne({service: 'pilotpress'});

  if (! settings ||
      ! Match.test(settings, Match.ObjectIncluding({ site: String,
                                                     appId: String,
                                                     secret: String })))
    throw new Meteor.Error(500, 'Bad or missing OAP PilotPress configuration');

  console.log('settings', settings);

  var result = HTTP.post('https://www1.moon-ray.com/api.php/json/pilotpress/authenticate_user',
                         { params: { app_id: settings.appId,
                                     api_key: settings.secret,
                                     data: JSON.stringify( { username: options.username,
                                                             password: options.password,
                                                             site: settings.site })
                                   }});

  console.log('result', result);

  var content = JSON.parse(result.content);
  if (Meteor._get(content, 'type') === 'error')
    throw new Meteor.Error(403, Meteor._get(content, 'message'));

  if (!content.pilotpress || !content.pilotpress.username === 'username')
    throw new Meteor.Error(400, 'could not find pilotpress username');

  var serviceData = _.extend({id: content.pilotpress.contact_id}, content.pilotpress);

  // skip fields because OAP users control the keys, and could contain illegal mongo chars '.' and '$'
  delete serviceData.fields; // = JSON.stringify(content.pilotpress.fields);

  return Accounts.updateOrCreateUserFromExternalService('pilotpress', serviceData, { profile: {} });
});
