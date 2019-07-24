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
Scope.prototype.digest = function () {
    var hasChanged = false;
    do {
        hasChanged = false;
        for (var watcher of this.watchers) {
            if (watcher.valueFn(this) !== watcher.lastValue) {
                hasChanged = true;
                watcher.listenerFn(watcher.valueFn(this), watcher.lastValue);
            }
            watcher.lastValue = watcher.valueFn(this);
        }
    } while (hasChanged);
}

monScope.digest();
monScope.monModel = "titre changed";
monScope.digest();

// Etape 4 : apply()
Scope.prototype.apply = function (expressionFn) {
    try {
        expressionFn();
    } catch (error) {
        console.log(error);
    } finally {
        this.digest();
    }
}
// Etape 5 : directives
var directives = {};
var directive = function (name, directiveFn) {
    if (directiveFn) {
        directives[name] = directiveFn;
    }
    return directives[name];
}


// Etape 6 : compile
var compile = function (element, scope) {
    console.log(element);
    for (child of element.children) {
        compile(child, scope);
    }
    for (attribute of element.attributes) {
        directiveFn = directive(attribute.name);
        if (directiveFn) {
            directiveFn(element, scope);
        }
    }
}

// Etape 7 : ng-bind : bind value to element
directive("ng-bind", function (element, scope) {
    scope.watch(
        () => scope[element.attributes['ng-bind'].value],
        function (newValue) {
            element.innerHTML = newValue;
        })
});


compile(document.body, monScope);

monScope.monModel = "titre updated";
monScope.digest();

// Etape 8 : ng-model