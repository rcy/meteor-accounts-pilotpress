Package.describe({
  summary: "Office Autopilot PilotPress Logins"
});

Package.on_use(function (api, where) {
  api.use(['accounts-base'], ['client', 'server']);
  api.use(['http'], ['server']);

  api.add_files('pilotpress_server.js', 'server');
  api.add_files('pilotpress_client.js', 'client');
});

// Package.on_test(function (api, where) {
//   api.use(['tinytest', 'test-helpers'], ['client', 'server']);
//   // api.add_files([''], ['client', 'server']);
//   // api.export([''], ['client', 'server']);
// });
