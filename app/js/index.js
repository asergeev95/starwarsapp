(function(){

	var app = angular.module('starWarsApp', ['ngDialog']);

	app.factory('httpq', function($http, $q){
	return{
			get: function(){
				var deffered = $q.defer();
				$http.get.apply(null, arguments)
					.then(deffered.resolve)
					.catch(deffered.resolve);
					return deffered.promise;
			}
		}
	});

	 app.config(['ngDialogProvider', function (ngDialogProvider) {
            ngDialogProvider.setDefaults({
                className: 'ngdialog-theme-default',
                plain: false,
                showClose: true,
                closeByDocument: true,
                closeByEscape: true,
                appendTo: false,
                preCloseCallback: function () {
                    console.log('default pre-close callback');
                }
            });
        }]);

	app.controller('StarCtrl', function(httpq, ngDialog, $scope,  $rootScope){

		

		var data = this;
		this.isAll = 'true';
		this.showFullInfo = 'false';
		data.people = [];

			var url = "http://swapi.co/api/people/?page=";
			
			for(var i=1;i<10;i++){
			
			httpq.get(url+i)
				.then(function(receivedData){
					for(var j=0; j<receivedData.data.results.length; j++)
						data.people.push(receivedData.data.results[j]);
				this.isAll = 'false';	
				})
				.catch(function(){
					alert('error');
				})
				.finally(function(){
				});
			}
		
		this.setGender = function(setGender){

			console.log("setGender, ", setGender);
				this.selectedGender = setGender;
				this.isAll = 'false';
			
		};

		this.selectPerson = function(personLink){

		 	console.log(personLink);

		 	httpq.get(personLink)
		 		.then(function(result){
		 			console.log(result.data);
		 			data.item = result.data;
		 		})
		 		.catch(function(){
		 			alert('error');
		 		})
		 		.finally(function(){
		 			var keys = ['name', 'height', 'hair_color', 'eye_color', 'birth_year', ];
		 			var str='';
		 			for(var k=0; k<5; k++)
		 				str+='<p>'+keys[k]+':'+' '+ data.item[keys[k]]; 
		 			
		 			ngDialog.open({
                    template: str,
                    className: 'ngdialog-theme-plain',
                    height: 250,
                    plain: true
                });

		 		});
		};


		this.showPeople = function(gender){
			return (this.isAll === 'true' || gender === this.selectedGender);
		};


		
         $rootScope.theme = 'ngdialog-theme-default';

            $scope.openTemplate = function () {
                $scope.value = true;

                ngDialog.open({
                    template: 'externalTemplate.html',
                    className: 'ngdialog-theme-plain',
                    scope: $scope
                });
            };

            /*$scope.openWithJSSpecificHeight = function () {
                ngDialog.open({
                    template: '<p>Name:' + data.item.name +'</p> <p>Gender:' + data.item.gender +'</p>',
                    className: 'ngdialog-theme-plain',
                    height: 400,
                    plain: true
                });
            };  */


	});

})();