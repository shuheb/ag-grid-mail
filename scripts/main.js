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
    {field: "description", width: 1092, cellRenderer: 'hoverCellRenderer', cellStyle: {'font-weight': 'bold'}},
];
const selectedCell = {
    rowIndex: null,
    column: null,
};
var rowData = [
    {subject: 'xxxx', description: 'xxxxxxxxxxxx', data: 'kjkljmkofo jgoidjf goidfjgiodfjgoi', read: true},
    {subject: 'yyyy', description: 'yyyyyyyyyyyy'},
    {subject: 'wwww', description: 'wwwwwwwwwwww'},
    {subject: 'zzzz', description: 'zzzzzzzzzzzz'}
];
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowHeight: 40,
    defaultColDef: {
        sortable: true,
        resizable: true,
    },
    components: {
        hoverCellRenderer: HoverCellRenderer,
    },
    onCellMouseOver: function (params) {
        //find which cell you are hoverin in, show button
        let renderer = params.api.getCellRendererInstances({
            rowNodes: [params.node],
            columns: ['subject', 'description'],
        })[0];

        renderer.showButton();
    },
    onCellMouseOut: function (params) {
        //find which cell you are hoverin out, hide button
        let renderer = params.api.getCellRendererInstances({
            rowNodes: [params.node],
            columns: ['subject', 'description'],
        })[0];

        renderer.hideButton();
    },
};

function HoverCellRenderer() {
}

HoverCellRenderer.prototype.init = function (params) {

    this.eGui = document.createElement('div');
    this.eGui.innerHTML =
        ` ${params.value} <span class = "btn-simple" style="display: none; float:right;">
        <span class="row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/archive_black_20dp.png"></span>
        <span class="row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/delete_black_20dp.png"></span>
        <span class="row-icon-hover" style="margin:0 10px;" ><img src="https://www.gstatic.com/images/icons/material/system/1x/drafts_black_20dp.png"></span>
        <span class="row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/watch_later_black_20dp.png"></span>`;
    this.eButton = this.eGui.querySelector('.btn-simple');

    this.eventListener = function () {
        console.log('*** Insert button logic ***');
    };
    this.eButton.addEventListener('click', this.eventListener);
};

HoverCellRenderer.prototype.getGui = function () {
    return this.eGui;
};

HoverCellRenderer.prototype.showButton = function () {
    this.spanEl = this.eGui.querySelector('span');
    this.spanEl.style.display = 'inline-block';
};

HoverCellRenderer.prototype.hideButton = function () {
    this.spanEl.style.display = 'none';
};


// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);


});
