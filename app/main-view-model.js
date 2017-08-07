var fetchModule     = require("fetch");
var ObservableArray = require("data/observable-array").ObservableArray;

function createViewModel(people) {

    var viewModel = new ObservableArray(people);

    // CARGAR DATOS
    viewModel.load = function () {

        return fetchModule.fetch("https://jsonplaceholder.typicode.com/users")
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                //console.log("data:" + JSON.stringify(data));
                // Recorrer los datos
                data.forEach(function (person) {
                    //console.log("person.company.name:" + person.company.name);
                    viewModel.push({
                         fullName : person.name,
                         company : person.company.name
                    });
                });
                
            }, function (error) {
                console.log("Error: ", error);
            });

    };

    // LIMPIAR DATOS
    viewModel.empty = function () {
        while (viewModel.length) {
            viewModel.pop();
        }
    };


    return viewModel;
};

module.exports = createViewModel;