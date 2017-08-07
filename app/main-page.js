var frames              = require("ui/frame");
var Observable          = require("data/observable").Observable;
var observableModule    = require("data/observable")
var ObservableArray     = require("data/observable-array").ObservableArray;
var isAndroid           = require("platform");
var createViewModel     = require("./main-view-model");

// Array con los datos a mostrar en la lista
var peopleList = new createViewModel([]);

// Array para almacenar datos filtrados de la lista
var resultList = new ObservableArray([]);

var page;
//var searchBar;

//var pageData = new Observable({ peopleList: peopleList });
var pageData = new observableModule.fromObject({
    peopleList: peopleList
});
/*var pageData = new observableModule.fromObject({
    groceryList: new ObservableArray([
        { name: "eggs" },
        { name: "bread" },
        { name: "cereal" }
    ])
});*/

function pageLoaded(args)
{
    console.log("CARGA DE LA PAGINA");

    page                = args.object;
    let searchbar       = page.getViewById("searchBar");

    page.bindingContext = pageData;
    
    //console.log("searchBar:" + searchBar);

    //console.log("isAndroid:" + JSON.stringify(isAndroid.isAndroid));

    if (isAndroid.isAndroid) {
        setTimeout(function() {
            // Ocultar teclado
            searchbar.dismissSoftInput();

            // Quitar foco de la barra de busqueda
            searchbar.android.clearFocus();
        }, 200);
    };

    /*console.log("searchBar.android:" + searchBar.android);

    if (searchBar.ios) {
        searchBar.ios.endEditing(true);
    } else if (searchBar.android) {
        searchBar.android.clearFocus();
    }*/
    /*searchBar.dismissSoftInput();

        if (isAndroid) {
            searchBar.android.clearFocus();
        }*/
    
    //searchBar.android.clearFocus();
    
    // Limpiar lista
    peopleList.empty();

    // Cargar datos
    peopleList.load();

    //peopleList.load(); // fetch data from the backend

};

exports.pageLoaded = pageLoaded;

// EVENTO CARGAR DE LA BARRA
exports.searchBarLoaded = function(args)
{
    console.log("CARGA DE LA BARRA DE BUSQUEDA");
    //console.log("event.object.android: " + args.object.android);
    // Barra de busqueda
    let searchbar = args.object;

    if (isAndroid.isAndroid) {
        setTimeout(function() {
            // Ocultar teclado
            searchbar.dismissSoftInput();

            // Quitar foco de la barra de busqueda
            searchbar.android.clearFocus();
        }, 100);
    };

    searchbar.text = "";
};

// EVENTO DESCARGA DE LA BARRA
exports.searchBarUnloaded = function(args)
{
    console.log("DESCARGA DE LA BARRA DE BUSQUEDA");
};

// EVENTO ENVIAR DE LA BARRA
exports.onSubmit = function(args)
{
    console.log("EVENTO BUSCAR DE LA BARRA DE BUSQUEDA");
    // Barra de busqueda
    let searchbar   = args.object;
    //console.dir("searchbar: " + searchbar);
    
    // Texto de la barra d bsqueda
    let searchText  = searchbar.text;
    console.log("searchText: " + searchText);

    /*peopleList.filter(function (element, index, array) {
        // DOESN"T WORK PROPERLY
        console.log("element: ", JSON.stringify(element));
        console.log("index: ", index);
        console.log("array: ", JSON.stringify(array));
        //return element.fullName == searchText;
    });*/

    /*while(resultList.length > 0) {
        resultList.pop();
    }

    peopleList.forEach(function (element) {
        if (element.fullName === searchText) {
            console.log("element: ", JSON.stringify(element));
            //resultList.push(element);
        }
    });*/
    //console.log("peopleList:" + peopleList);

    // Mientras halla datos los limpiamos
    while(resultList.length > 0) {
        // Eliminar elemento del obj
        resultList.pop();
    }

    // Recorrer datos de la lista
    peopleList.forEach(function (element) {
        // Si existen coincidencias entre el texto de la barra y los datos de la lista
       if (element.fullName.toLowerCase().indexOf(searchText) >= 0) {
           //console.log("element: ", JSON.stringify(element));
           // Agregar elementos al obj
            resultList.push(element);
        }
    });

    // Setear los datos a la lista
    pageData.peopleList = resultList;
    //console.dump("resultList: ", JSON.stringify(resultList));
    
    // Esperar un segundo
    setTimeout(function() {
        // Ocultar teclado
        searchbar.dismissSoftInput();

        // Quitar foco de la barra de busqueda
        searchbar.android.clearFocus();
    }, 0);

};

// EVENTO LIMPIAR DE LA BARRA
exports.onClear = function(args)
{
    console.log("EVENTO LIMPIAR DE LA BARRA DE BUSQUEDA");
    
    // Barra de busqueda
    let searchbar   = args.object;
    //console.log("TXT: " + searchbar.text);
    // Limpiar barra de bsqueda
    searchbar.text  = "";
    searchbar.hint  = "Busca un artículo";
    //console.log("TXT 2: " + searchbar.text);

    //searchbar.removeEventListener("submit");
    //searchbar.resetNativeView();
    pageData.peopleList = peopleList;

    /*setTimeout(function() {
        // Ocultar teclado
        searchbar.dismissSoftInput();

        // Quitar foco de la barra de busqueda
        searchbar.android.clearFocus();
    }, 0);*/
    
};

/*
    Clear autofocus - inside expors.loaded()

    This is to prevent keyboard from opening on initial screen navigation.

  if (searchBar.ios) {
    searchBar.ios.endEditing(true);
  } else if (searchBar.android) {
      searchBar.android.clearFocus();
  }

*/