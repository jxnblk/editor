// Controllers

app.controller('GlobalCtrl', ['$scope', '$location', 'Dropbox', 'storage',
  function($scope, $location, Dropbox, storage){

  $scope.oauth = storage.get('oauth');
  $scope.hash = storage.get('hash');

  if($scope.oauth) {
    console.log('reauthenticating...');
    Dropbox.setCredentials($scope.oauth);
    $scope.connected = Dropbox.isAuthenticated();
  };

  

  $scope.connect = function(){
    Dropbox.authenticate();
    // need to do something on first sign in to get user & file data
  };

  $scope.clearHash = function(){
    storage.remove('hash');
  };


}]);

app.controller('IndexCtrl', ['$scope', 'Dropbox', 'storage', function($scope, Dropbox, storage){
  
  if($scope.connected){
    $scope.user = Dropbox.accountInfo();

    var params;
    // if($scope.hash) params = {'hash': $scope.hash};
    
    Dropbox.metadata('/', params).then(function(res){
      $scope.hash = res.hash;
      $scope.files = res.contents;
      storage.set('hash', $scope.hash);
    });
  };
  
}]);

app.controller('EditCtrl', ['$scope', '$location', '$routeParams', '$timeout', 'Dropbox', 'storage', function($scope, $location, $routeParams, $timeout, Dropbox, storage) {
  
  $scope.content = '';
  $scope.isLoading = true;
  
  // Get content from DB if opening a file
  if($routeParams.file){
    Dropbox.readFile($routeParams.file).then(function(res){
      console.log('file read');
      //console.log(res);
      $scope.content = res;
      $scope.filename = $routeParams.file;
      $scope.isLoading = false;
    });
  } else {
    $scope.isLoading = false;
  };
  

  // For switching modes
  $scope.isEditable = 'plaintext-only';
  $scope.setUneditable = function() { $scope.isEditable = false; };
  $scope.setEditable = function() { $scope.isEditable = 'plaintext-only'; }

  var save;
  $scope.$watch('content', function(x,y){
    if (!y) return false;
    console.log('content changed');
    $timeout.cancel(save);
    if($scope.isLoading == true) {
      console.log('still loading...');
      return false;
    };
    //$scope.lines = $scope.content.split("\n");
    // save = $timeout(function(){
      // Use this as an offline backup
      // console.log('storing file');
      // storage.set('file', $scope.content);

      //$scope.saveFile();
    // }, 800);
  });

  $scope.saveFile = function() {
    // Add .md for blank file extensions
    console.log('saving ' + $scope.filename);
    Dropbox.writeFile($scope.filename, $scope.content).then(function(res){
      console.log('file saved');
      //console.log(res);
    });
  };


  // Code mirror stuff
   $scope.editorOptions = {
    lineWrapping : true,
    lineNumbers: true,
    keyMap: 'vim',
    mode: 'markdown',
      // This doesn't seem to work...
      extraKeys: {"Enter": "newlineAndIndentContinueMarkdownList"},
    tabSize: 2
  };

}]);
