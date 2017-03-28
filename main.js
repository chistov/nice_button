var app = angular.module("demo", []);

app.run(function($rootScope) {
  angular.element(document).on("click", function(e) {
    console.log('sddd');
    $rootScope.$broadcast("documentClicked", angular.element(e.target));
  });
});

app.controller('dropdownCtrl', function($rootScope, $scope){
  $scope.colours = [{
    name: "block"
  }, {
    name: "syncookie"
  }, {
    name: "white"
  }];
  $scope.colour = $scope.colours[1];
});

app.directive("dropdown", function($rootScope) {
  return {
    restrict: "E",
    templateUrl: "templates/dropdown.html",
    scope: {
      placeholder: "@",
      list: "=",
      selected: "=",
      property: "@"
    },
    controller: 'dropdownCtrl',
    link: function(scope,element, attrs, ctrl ) {
      scope.listVisible = false;
      scope.isPlaceholder = true;

      scope.select = function(item) {
        console.log('select', item);
        console.log('scope', scope);
        console.log('list', scope.list);
        scope.isPlaceholder = false;
        scope.selected = item;
        scope.colour = item;
      };

      scope.isSelected = function(item) {
        return item[scope.property] === scope.selected[scope.property];
      };

      scope.show = function() {
        scope.listVisible = true;
      };

      $rootScope.$on("documentClicked", function(inner, target) {
        console.log('dClicked', inner);
        console.log('target', target);
        console.log($(target[0]).is(".dropdown-display.clicked") || $(target[0]).parents(".dropdown-display.clicked").length > 0);
        if (!$(target[0]).is(".dropdown-display.clicked") && !$(target[0]).parents(".dropdown-display.clicked").length > 0)
          scope.$apply(function() {
            scope.listVisible = false;
          });
      });

      scope.$watch("selected", function(value) {
        console.log('selected', value);
        scope.isPlaceholder = scope.selected[scope.property] === undefined;
        scope.display = scope.selected[scope.property];
      });
    }
  }
});
