var columnDefs = [
    {
        field: "subject",
        checkboxSelection: true,
        width: 240,
        cellStyle: {'font-weight': 'bold'},
        // cellRenderer: function (params) {
        //     let icon = `<span><img src="https://www.gstatic.com/images/icons/material/system/1x/star_border_black_20dp.png" style="padding-right: 40px;"/></span>`
        //     return icon + params.value;
        // }
    },
    {field: "description", width: 1092, cellStyle: {'font-weight': 'bold'}},
];
const selectedCell = {
    rowIndex: null,
    column: null,
};
var rowData = [
    {subject: 'xxxx', description: 'xxxxxxxxxxxx'},
    {subject: 'yyyy', description: 'yyyyyyyyyyyy'},
    {subject: 'wwww', description: 'wwwwwwwwwwww'},
    {subject: 'zzzz', description: 'zzzzzzzzzzzz'}
];

var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowHeight: 40,
    onCellMouseOver: function (params) {
        console.log('Selected Row: ' + params.node.id);
    },
    defaultColDef: {
        sortable: true,
        resizable: true,
    },
    onGridReady: function (params) {
        params.columnApi.autoSizeColumns();
    }
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);


});