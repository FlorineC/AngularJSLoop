// Etape 1 : le scope
function Scope() {
    this.watchers = [];
}

Scope.prototype.watch = function (valueFn, listenerFn) {
    var watcher = {
        valueFn, // quelle donnée on observe
        listenerFn, // quel comportement on a lors du changement de la donnée
        lastValue: undefined // la dernière valeur observée pour vérifier le changement
    }
    this.watchers.push(watcher);
}

var monScope = new Scope();
monScope.monModel = "titre information";

// Etape 2 : scope.watch
monScope.watch(
    (scope) => scope.monModel.titre,
    function (newValue, oldValue) {
        console.log("Le titre est passé de " + oldValue + " à " + newValue);
    }
);
// Etape 3 : la boucle digest

// Etape 4 : apply()

// Etape 5 : directives

// Etape 6 : compile

// Etape 7 : ng-bind : bind value to element

// Etape 8 : ng-model