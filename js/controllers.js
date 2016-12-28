angular.module('app.controllers', [])
  
.controller('membrosCtrl', ['$scope', '$stateParams','$ionicPopup','$state', 'Persistencia', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$stateParams,$ionicPopup,$timeout,Persistencia) {
  
  $scope.data = {
    showDelete: false
  };
  $scope.statusMembro = [];
  $scope.statusMembro["Visitante"] = "img/Visitante2.png";
  $scope.statusMembro["Novato"] = "img/Novato2.png";
  $scope.statusMembro["Veterano"] = "img/Veterano2.png";
  $scope.statusMembro["Colíder"] = "img/Colider2.png";
  $scope.items = Persistencia.all('Membros');
    //***********ADD*************
    $scope.add = function() {
   $scope.data = {}
   var myPopup = $ionicPopup.show({
      template:'<label class="item item-input"><span class="input-label">Nome</span><input type="text" ng-model="data.name"></label><label class="item item-input"><span class="input-label">Telefone</span><input type="tel" ng-model="data.tel"></label><label class="item item-input"><span class="input-label">Nascimento</span><input type="date" ng-model="data.datanasc"></label><label class="item item-input"><span class="input-label">Email</span><input type="email" ng-model="data.email"></label><label class="item item-input"><span class="input-label">Endereço</span><input type="text" ng-model="data.end"></label><label class="item item-input item-select"><div class="input-label">Status</div><select name="status" ng-model="data.status"><option selected>Visitante</option><option>Novato</option><option>Veterano</option><option>Colíder</option></select></label>', 
      title: '<h3>Novo Membro</h3>',
      subTitle: '<h5>Entre com os dados:<h5>',
      scope: $scope,
      buttons: [{
         text: 'Cancel'
      }, {
         text: '<b>Save</b>',
         type: 'button-calm',
         onTap: function(e) {
            if (!$scope.data.name) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
            } else {
               return $scope.data;
            }
         }
      }, ]
   });
   myPopup.then(function(res) {
      if (res) {  
        if(res.status==null){
          res.status = "Visitante";
        }
        if(res.datanasc==null){
          res.datanasc = new Date();
        }
        $scope.items.push({name:res.name, tel:res.tel, datanasc:res.datanasc,email:res.email, end: res.end, status: res.status});
        Persistencia.salvar('Membros',$scope.items);        
        $scope.items = Persistencia.all('Membros');
      } 
   });
};

    //************FIM ADD***********  

    //**************EDIT*************
  $scope.edit = function(item) {
   $scope.data = item
   var myPopup = $ionicPopup.show({
      template: '<label class="item item-input"><span class="input-label">Nome</span><input type="text" ng-model="data.name"></label><label class="item item-input"><span class="input-label">Telefone</span><input type="tel" ng-model="data.tel"></label><label class="item item-input"><span class="input-label">Nascimento</span><input type="date" ng-model="data.datanasc"></label><label class="item item-input"><span class="input-label">Email</span><input type="email" ng-model="data.email"></label><label class="item item-input"><span class="input-label">Endereço</span><input type="text" ng-model="data.end"></label><label class="item item-input item-select"><div class="input-label">Status</div><select name="status" ng-model="data.status"><option selected>Visitante</option><option>Novato</option><option>Veterano</option><option>Colíder</option></select></label>', 
      title: '<h3>Editar Membro</h3>',
      subTitle: '<h5>Entre com os dados:</h5>',
      scope: $scope,
      buttons: [{
         text: 'Cancel'
      }, {
         text: '<b>Save</b>',
         type: 'button-calm',
         onTap: function(e) {
            if (!$scope.data.name) {
               //don't allow the user to close unless he enters wifi password
               e.preventDefault();
            } else {
               return $scope.data;
            }
         }
      }, ]
   });
   myPopup.then(function(res) {
      if (res) {
        //$scope.items.push({name:res.name, tel:res.tel});
        for(var i=0; i<$scope.items.length; i++){
            if(item.name === $scope.items[i].name){
                item.name = res.name;
                item.tel = res.tel;
                item.datanasc = res.datanasc;
                item.email = res.email;
                item.end = res.end;
                item.status= res.status;
                break;
            }
        }
        Persistencia.salvar('Membros',$scope.items);        
        $scope.items = Persistencia.all('Membros');
      } 
   });
}; 

//************FIM EDIT***********


//*************SHOW MEMB*********************
$scope.showMembro =function(item){
  //*********DATA***************
  var date = new Date(item.datanasc);
 $scope.FromDate = ('0' + date.getDate()).slice(-2)+ '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();

  //****************************
     var alertPopup = $ionicPopup.alert({
       title: '<h3>Membro</h3>',
       cssClass:'popup',
       template: '<strong>Nome: </strong>'+item.name +'<hr>'+ '<strong>Telefone: </strong>'+ item.tel+'<hr>'+ '<strong>Data de nascimento: </strong>'+ $scope.FromDate  +'<hr>'+'<strong>Email: </strong>'+item.email +'<hr>'+'<strong>Endereço: </strong>'+item.end +'<hr>'+'<strong>Status: </strong>'+item.status 
     });
     alertPopup.then(function(res) {
      // console.log('Thank you for not eating my delicious ice cream cone');
     }); 

}
//*************FIM SHOW MEMB****************** 
  $scope.onItemDelete = function(item) {
     $ionicPopup.confirm({
              title: '<h3>Deletar Membro</h3>',
              subTitle: '<h5>Você realmente quer deletar:</h5>',
              content: '<strong>Nome: </strong>'+item.name
            }).then(function(res) {
              if(res) {
                $scope.items.splice($scope.items.indexOf(item), 1);
                Persistencia.salvar('Membros',$scope.items);
              } 
            });
  };  
}])   
.controller('infoCtrl', ['$scope', '$stateParams','$ionicPopup','$state','Persistencia','$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope,$stateParams,$ionicPopup,$timeout,Persistencia,$window) {
   $scope.items = Persistencia.all('Membros');
   $scope.reunioes = Persistencia.all('Reunioes');
   $scope.calculaFreq = function() {
    if($scope.reunioes.length>0){
    var t = $scope.reunioes.length;
    var freq = 0;
   for(var i =0;i< $scope.reunioes.length;i++){
    freq = freq + $scope.reunioes[i].numPresentes;
   }
   freq = (freq / t);
   return freq;
   }
   else{
    return 0;
   }
   }
   $scope.calculaVisitante = function(){
    var cont = 0;
    for(var i =0;i< $scope.items.length;i++){
    if($scope.items[i].status == 'Visitante'){
      cont ++;
    }
   }
   return cont;
   }
}])

.controller('reuniEsCtrl', ['$scope', '$stateParams','$ionicPopup','$state','Persistencia','$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$stateParams,$ionicPopup,$timeout,Persistencia,$window) {  
  $scope.data = {
    showDelete: false
  };
  $scope.items = Persistencia.all('Membros');
  $scope.reunioes = Persistencia.all('Reunioes');
  $scope.mempres = Persistencia.all('Membros');
  $scope.pushNotificationChange = function() {
    console.log('Push Notification Change', $scope.pushNotification.checked);
  };  
  $scope.pushNotification = { checked: true };


    $scope.add = function() {
   $scope.items = Persistencia.all('Membros');
   $scope.data = {}
   var myPopup = $ionicPopup.show({
      template:'<ion-checkbox ng-repeat="item in items" ng-model="item.checked" ng-checked="item.checked" ng-change="pushNotificationChange()">{{ item.name }}</ion-checkbox>', 
      title: '<h3>Nova Reunião</h3>',
      subTitle: '<h5>Marque os presentes:<h5>',
      scope: $scope,
      buttons: [{
         text: 'Cancel'
      }, {
         text: '<b>Save</b>',
         type: 'button-calm',
         onTap: function(e) {
            if (true) {
                return $scope.data;
               //don't allow the user to close unless he enters wifi password
               //e.preventDefault();
            }
         }
      }, ]
   });
   myPopup.then(function(res) {
      if (res) { 
            $scope.presentes = [];
            for(var i=0; i<$scope.items.length; i++){
            if($scope.items[i].checked){
             $scope.presentes.push({name:$scope.items[i].name});
            }
          }
          if($scope.presentes.length>0){
            /*DATA*/
         var date = new Date();
         $scope.FromDate = ('0' + date.getDate()).slice(-2)+ '/' + ('0' + (date.getMonth() + 1)).slice(-2) + '/' + date.getFullYear();
         var mes = ('0' + (date.getMonth() + 1)).slice(-2);
         switch(mes) {
    case '01':
        mes = "Janeiro";
        break;
    case '02':
        mes= "Fevereiro";
        break;
    case '03':
        mes = "Março";
        break;
    case '04':
        mes = "Abril";
        break;
    case '05':
        mes = "Maio";
        break;
    case '06':
        mes = "Junho";
        break;
    case '07':
        mes = "Julho";
        break;
    case '08':
        mes = "Agosto";
        break;
    case '09':
        mes = "Setembro";
        break;
    case '10':
        mes = "Outubro";
        break;
    case '11':
        mes = "Novembro";
        break;
    case '12':
        mes = "Dezembro";
        break;
}
         /*FIM DATA*/
         $scope.reunioes.push({ mes:mes,date: $scope.FromDate, membrosPresentes:$scope.presentes, numPresentes: $scope.presentes.length});         
         Persistencia.salvar('Reunioes',$scope.reunioes);
          }
      } 
   });
};
//****FIM ADD****************************
$scope.showReuniao =function(item){
  $scope.mempres = item.membrosPresentes;
     var alertPopup = $ionicPopup.alert({
       title: '<h3>Reunião</h3>',
       cssClass:'popup',
       scope:$scope,
       template:'<strong>Data: </strong>'+item.date +'<br>'+'<strong>Presentes: </strong>'+item.numPresentes+'<br>'+'<ion-item ng-repeat="item in mempres track by $index">{{ item.name }}<d ion-show></ion-item>'
     });
     alertPopup.then(function(res) {
    });
};
 $scope.onItemDeleteR = function(item) {
     $ionicPopup.confirm({
              title: '<h3>Deletar Reunião</h3>',
              subTitle: '<h5>Você realmente quer deletar:</h5>',
              content: '<strong>Mês: </strong>'+item.mes+'<br>'+'<strong>Data: </strong>'+item.date +'<br>'+'<strong>Presentes: </strong>'+item.numPresentes
            }).then(function(res) {
              if(res) {
                $scope.reunioes.splice($scope.reunioes.indexOf(item), 1);
                Persistencia.salvar('Reunioes',$scope.reunioes);
              } 
            });
  };

}])

.controller('AniversariantesCtrl', ['$scope', '$stateParams','$ionicPopup','$state','Persistencia','$window', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function($scope,$stateParams,$ionicPopup,$timeout,Persistencia,$window) {  
  $scope.data = {
    showDelete: false
  };
  $scope.items = Persistencia.all('Membros');  
  $scope.aniversariantes = [];
  var date = new Date();
  $scope.DateMes = ('0' + (date.getMonth() + 1)).slice(-2);
  $scope.DateDia = ('0' + date.getDate()).slice(-2);
  $scope.mes = ('0' + (date.getMonth() + 1)).slice(-2);
         switch($scope.mes) {
    case '01':
        $scope.mes = "Janeiro";
        break;
    case '02':
        $scope.mes= "Fevereiro";
        break;
    case '03':
        $scope.mes = "Março";
        break;
    case '04':
        $scope.mes = "Abril";
        break;
    case '05':
        $scope.mes = "Maio";
        break;
    case '06':
        $scope.mes = "Junho";
        break;
    case '07':
        $scope.mes = "Julho";
        break;
    case '08':
        $scope.mes = "Agosto";
        break;
    case '09':
        $scope.mes = "Setembro";
        break;
    case '10':
        $scope.mes = "Outubro";
        break;
    case '11':
        $scope.mes = "Novembro";
        break;
    case '12':
        $scope.mes = "Dezembro";
        break;
  }
  $scope.atualiza=function(){    
  $scope.items = Persistencia.all('Membros');  
  $scope.aniversariantes = [];
  for(var i = 0; i<$scope.items.length;i++){
   var currentTime = new Date($scope.items[i].datanasc);
   var month = ('0' + (currentTime.getMonth() + 1)).slice(-2);
   if(month==$scope.DateMes){   
   var day = currentTime.getDate();
   var date = 'Dia '+ day;
   $scope.aniversariantes.push({name:$scope.items[i].name,date:date});
   }
  }
  return $scope.aniversariantes;
  };

}])
   
.controller('menuCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {
  


}])
   
.controller('loginCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
   
.controller('signupCtrl', ['$scope', '$stateParams', // The following is the constructor function for this page's controller. See https://docs.angularjs.org/guide/controller
// You can include any angular dependencies as parameters for this function
// TIP: Access Route Parameters for your page via $stateParams.parameterName
function ($scope, $stateParams) {


}])
 