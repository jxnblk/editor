// Services

// Local Storage Factory
app.factory('storage', function(){            
  return {
    set: function(key, obj){
      var string = JSON.stringify(obj)
      localStorage.setItem(key, string);
    },
    get: function(key){
      var data = localStorage.getItem(key);
      if(data) var obj = JSON.parse(data);
      return obj;
    },
    remove: function(key){
      localStorage.removeItem(key);
    },
    clearAll: function(){
      localStorage.clear();
    }
  }     
});

// Dropbox Manifest File Factory

// app.factory('manifest', function(Dropbox){
//   return {
//     set: function(data){
//       console.log('building manifest.json...');
//       var string = JSON.stringify(data);
//       Dropbox.writeFile('manifest.json', string).then(function(res){
//         console.log('manifest written');
//       });
//     },

//     get: function($scope){
//       console.log('getting manifest...');
//       Dropbox.readFile('manifest.json',{}).then(function(res){
//         console.log('reading manifest...');
//         console.log(res.contents);
//         if(res) $scope.manifest = res;
//         // return res;
//       });
//     },

//   };
// });
