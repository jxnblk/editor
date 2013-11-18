// Bipkit

'use strict';

var app = angular.module('app', ['ngRoute', 'ui.codemirror', 'dropbox'])
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/', {templateUrl: 'views/index.html', controller: 'IndexCtrl'});
    $routeProvider.when('/new', {templateUrl: 'views/edit.html', controller: 'EditCtrl'});

    $routeProvider.when('/:file/edit', {templateUrl: 'views/edit.html', controller: 'EditCtrl'});
    $routeProvider.otherwise({redirectTo: '/'});
  }]);

app.value('DropboxClientId', 'xakpwv1cyrvir6r');
app.value('DropboxRedirectUri', 'http://localhost:4000/callback/callback.html');
