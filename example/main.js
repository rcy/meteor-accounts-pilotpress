if (Meteor.isServer) {
  // first, remove configuration entry in case service is already configured
  Accounts.loginServiceConfiguration.remove({
    service: "pilotpress"
  });
  Accounts.loginServiceConfiguration.insert({
    service: "pilotpress",
    site: Meteor.settings.site,
    appId: Meteor.settings.appId,
    secret: Meteor.settings.secret
  });
}
