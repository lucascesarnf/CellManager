angular.module('app.services', [])

.factory('Persistencia', [function(){
getItem = function(chave){
var item = localStorage.getItem(chave);
     if(item){
     return angular.fromJson(item);
     }else{
     return [];
     }
}
setItem = function(chave,item){
 localStorage.setItem(chave,item);
}
return{
  all : function(chave){
       return getItem(chave);
  },
  salvar: function(chave, item){
       return setItem(chave,angular.toJson(item));
  }
}
    /*
    //***Membros********
	var chaveMembro = 'Membros';
    getMembros = function(){
        var membros = window.localStorage[chaveMembro];
        if(membros){
          return angular.fromJson(membros);
        }else{
          return [];
        }
    }
    salvarMembros = function(membros){
    window.localStorage[chaveMembro]= angular.toJson(membros);
    }
    //********Reuniões*********
    var chaveReunioes = 'Reunioes';
    getReunioes = function(){
        var reunioes = window.localStorage[chaveReunioes];
        if(reunioes){
          return angular.fromJson(reunioes);
        }else{
          return [];
        }
    }
    salvarReunioes = function(reunioes){
    window.localStorage[chaveReunioes] = angular.toJson(reunioes);
    }

    //***********Escopo global***************
    return{
    	allMembros:function(){
    		return getMembros();
    	},
    	salvarMembros:function(membros){
    		return salvarMembros(membros);
    	},
        allReunioes:function(){
            return getReunioes();
        },
        salvarReunioes:function(reunioes){
            return salvarReunioes(reunioes);
        }

    }*/
}])

.service('BlankService', [function(){

}]);