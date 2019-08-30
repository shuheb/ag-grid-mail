var columnDefs = [
    {
        field: "from",
        checkboxSelection: true,
        width: 240,
        cellStyle: {'font-weight': 'bold'},
        // cellRenderer: function (params) {
        //     let icon = `<span><img src="https://www.gstatic.com/images/icons/material/system/1x/star_border_black_20dp.png" style="padding-right: 40px;"/></span>`
        //     return icon + params.value;
        // }
    },
    {field: "subject", width: 1092, cellRenderer: 'hoverCellRenderer', cellStyle: {'font-weight': 'bold'}},
];

var rowData = [
    {from: 'xxxx', subject: 'xxxxxxxxxxxx', emailData: 'kjkljmkofo jgoidjf goidfjgiodfjgoi', read: false},
    {from: 'yyyy', subject: 'yyyyyyyyyyyy', emailData: 'knsfkjdsnfkanjd', read: false},
    {from: 'wwww', subject: 'wwwwwwwwwwww', emailData: 'vfjkndlvjksfbdiln lsdknfsdfoiudshufidsnfklj sdnklsdb fisdkflsd', read: false},
    {from: 'zzzz', subject: 'zzzzzzzzzzzz', emailData: 'rewoiurheoiuthrouit hoiutrehg ieufhiouewghroiqwu das', read: true}
];
var gridOptions = {
    columnDefs: columnDefs,
    rowData: rowData,
    rowHeight: 40,
    defaultColDef: {
        sortable: true,
        resizable: true,
    },
    rowSelection: 'single',
    components: {
        hoverCellRenderer: HoverCellRenderer,
    },
    onCellMouseOver: onCellMouseOver,
    onCellMouseOut: onCellMouseOut,
    onRowSelected: onRowSelected,
};

function onCellMouseOver(event) {
    //find which cell you are hoverin in, show button
    let renderer = event.api.getCellRendererInstances({
        rowNodes: [event.node],
        columns: ['from', 'subject'],
    })[0];

    renderer.showButton();
}

function onCellMouseOut(event) {
    //find which cell you are hoverin out, hide button
    let renderer = event.api.getCellRendererInstances({
        rowNodes: [event.node],
        columns: ['from', 'subject'],
    })[0];

    renderer.hideButton();
}

function onRowSelected(event) {
    let from = event.data.from;
    let subject = event.data.subject;
    let emailData = event.data.emailData;
    event.data.read = true;
    document.getElementById('emailFrom').innerText = 'From: '+from;
    document.getElementById('emailSubject').innerText = 'RE: '+subject;
    document.getElementById('emailData').innerText = emailData;
}

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
