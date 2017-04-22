var app = angular.module('inicio', ['angularUtils.directives.dirPagination']);

app.controller('autorController', function($scope, $http) {
	
	if(localStorage.getItem("dadosTemp")){
		console.log(localStorage.getItem("dadosTemp"));
		
		var author =  JSON.parse(localStorage.getItem("dadosTemp"));
		localStorage.removeItem("dadosTemp");
		$scope.author = author;
	};
	
	
	if(localStorage.getItem("dadosTempBook")){
		console.log(localStorage.getItem("dadosTempBook"));
		
		var books =  JSON.parse(localStorage.getItem("dadosTempBook"));
		localStorage.removeItem("dadosTempBook");
		$scope.books = books;
	}
	
	if(localStorage.getItem("dadoTempBook")){
		console.log(localStorage.getItem("dadoTempBook"));
		
		var authorId =  JSON.parse(localStorage.getItem("dadoTempBook"));
		localStorage.removeItem("dadoTempBook");
		$scope.authorId = authorId;
	}
	
    $http.get('http://libraryapp-alezio.rhcloud.com/api/authors').
        then(function(response) {
			localStorage.removeItem("dadosTemp");
			localStorage.removeItem("dadosTempBook");
			localStorage.removeItem("dadoTempBook");
			$scope.authors = response.data;
        });
		
	$scope.create = function create(author) {
		$http({
			url: 'http://libraryapp-alezio.rhcloud.com/api/authors',
			method: "POST",
			data: { 'firstName' : author.firstName, 'lastName' : author.lastName}
		}).then(function(response) {
			location.href = '../inicio.html';
		});
	};
	
	$scope.remove = function(id) {
		$http.delete('http://libraryapp-alezio.rhcloud.com/api/authors/' + id).then(
			function(response){
				location.reload();
			}, 
			function(response){
			 
			}
		);
	};
	
	$scope.prepareUpdate = function(id) {
		$http.get('http://libraryapp-alezio.rhcloud.com/api/authors/' + id).
		 then(function(response) {
			 
			var dadosTmp = JSON.stringify(response.data);

			localStorage.setItem("dadosTemp", dadosTmp);
			localStorage.removeItem("dadosTempBook");
			localStorage.removeItem("dadoTempBook");
			location.href = 'pages/editarAutor.html';
		 });
	};
	
	$scope.update = function update(author) {
		$http({
			url: 'http://libraryapp-alezio.rhcloud.com/api/authors/' + author.id,
			method: "PUT",
			data: { 'firstName' : author.firstName, 'lastName' : author.lastName}
		}).then(function(response) {
			location.href = '../inicio.html';
		});
	};
	
	
	$scope.listarLivros = function(id) {
		$http.get('http://libraryapp-alezio.rhcloud.com/api/authors/'+id+'/books').
		 then(function(response) {
			 
			var dadosTmp = JSON.stringify(response.data);

			localStorage.setItem("dadosTempBook", dadosTmp);
			location.href = 'pages/gerenciarBook.html';
		 });
	};
	
	$scope.createLivro = function createLivro(id) {
		 
		 var dadoTmp = id;
		 localStorage.setItem("dadoTempBook", dadoTmp);
		 location.href = 'pages/novoLivro.html';
			
	};
	
	
	$scope.salvarLivro = function update(book) {
		$http({
			url: 'http://libraryapp-alezio.rhcloud.com/api/authors/'+authorId+'/books',
			method: "POST",
			data: { 'title' : book.title}
		}).then(function(response) {
			location.href = '../inicio.html';
		});
	};
	
	$scope.removeBook = function(book) {
		$http.delete('http://libraryapp-alezio.rhcloud.com/api/authors/'+book.authorId+'/books/' + book.id).then(
			function(response){
				location.href = '../inicio.html';
			}, 
			function(response){
			 
			}
		);
	};
	
	$scope.ordenar = function(keyname){
        $scope.sortKey = keyname;
        $scope.reverse = !$scope.reverse;
    };
	
	
	
	
});