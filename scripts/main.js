var columnDefs = [
    {
        field: "from",
        checkboxSelection: true,
        width: 400,
        // cellRenderer: function (params) {
        //     let icon = `<span><img src="https://www.gstatic.com/images/icons/material/system/1x/star_border_black_20dp.png" style="padding-right: 20px; position: relative; top: 5px""/></span>`
        //     return icon + params.value;
        // }
    },
    {field: "subject", width: 1092, cellRenderer: 'hoverCellRenderer',},
    {field: "emailData", hide: true},


];

var gridOptions = {
    columnDefs: columnDefs,
    rowHeight: 40,
    defaultColDef: {
        sortable: true,
        resizable: true
    },
    rowSelection: 'multiple',
    suppressRowClickSelection: true,
    deltaRowDataMode: true,
    pagination: true,
    paginationAutoPageSize: true,
    getRowNodeId: function (data) {
        return data.id;
    },
    components: {
        hoverCellRenderer: HoverCellRenderer,
    },
    rowClassRules: {
        'email-read': function (params) {
            return params.data.read;
        },
        'row-selected': function (params) {
            return params.node.selected;
        }
    },
    onCellMouseOver: onCellMouseOver,
    onCellMouseOut: onCellMouseOut,
    onRowClicked: onRowClicked,
    onFirstDataRendered: () => gridOptions.api.sizeColumnsToFit()
};

function processData(data) {
    gridOptions.api.setRowData(data);
}

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

function onRowClicked(event) {

    if (event.event.target.tagName === "IMG") {
        event.event.stopPropagation();
        return
    }


    console.log('Row Clicked', event);
    let from = event.data.from;
    let subject = event.data.subject;
    let emailData = event.data.emailData;

    let newData = {
        ...event.data,
        read: true
    };

    event.node.setData(newData);
    document.getElementById('emailFrom').innerText = 'From: ' + from;
    document.getElementById('emailSubject').innerText = 'RE: ' + subject;
    document.getElementById('emailData').innerText = emailData;
}

function onSelectAll(event) {
    if (event.checked) {
        gridOptions.api.selectAll();
        document.getElementById('selection').style.display = 'block';
        document.getElementById('selection').innerText = 'All ' + gridOptions.api.getSelectedNodes().length + ' conversations on this page are selected';
        document.getElementById('myBulkOperations').style.display = 'block';
    } else {
        gridOptions.api.deselectAll();
        document.getElementById('selection').style.display = 'none';
        document.getElementById('myBulkOperations').style.display = 'none';
    }
    // url('https://www.gstatic.com/images/icons/material/system/1x/check_box_black_20dp.png')
    // url('https://www.gstatic.com/images/icons/material/system/1x/check_box_outline_blank_black_20dp.png')
}

function onClickDeleteAll() {
    console.log('*** Delete All ***');

    let selectedRowNodes = gridOptions.api.getSelectedNodes();

    gridOptions.api.updateRowData({remove: selectedRowNodes});

}

function onClickArchiveAll() {
    console.log('*** Archive All ***');
}

function onClickMarkAll() {
    console.log('*** Mark All ***');
}

function onClickSnoozeAll() {
    console.log('*** Snooze All ***');
}


function onFilterTextBoxChanged() {
    gridOptions.api.setQuickFilter(document.getElementById('filter-text-box').value);
}

function HoverCellRenderer() {
}

HoverCellRenderer.prototype.init = function (params) {

    this.params = params;

    this.eGui = document.createElement('div');
    this.eGui.innerHTML = `
<div style="display: flex; flex-direction: row">
     <div style="overflow: hidden;"><span style="text-overflow: ellipsis; display: inline-block; overflow: hidden; font-family: Roboto,RobotoDraft,Helvetica,Arial,sans-serif ;font-size: .875rem; letter-spacing: .2px">${params.value} - <span style="font-weight: normal; color: #5f6368;">${params.node.data.emailData}</span></span></div>
     <div class = "btns" style="width: 100%; text-align: right; display: none;">
<!--        <span style="display: none; float:right;">-->
        <span class="btn-archive row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/archive_black_20dp.png"></span>
        <span class="btn-delete row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/delete_black_20dp.png"></span>
        <span class="btn-mark row-icon-hover" style="margin:0 10px;" ><img src="https://www.gstatic.com/images/icons/material/system/1x/drafts_black_20dp.png"></span>
        <span class="btn-snooze row-icon-hover" style="margin:0 10px;"><img src="https://www.gstatic.com/images/icons/material/system/1x/watch_later_black_20dp.png"></span></span>
     </div>
</div>`;
    this.eArchiveButton = this.eGui.querySelector('.btn-archive');
    this.eDeleteButton = this.eGui.querySelector('.btn-delete');
    this.eMarkButton = this.eGui.querySelector('.btn-mark');
    this.eSnoozeButton = this.eGui.querySelector('.btn-snooze');

    this.eArchiveButton.addEventListener('click', function (event) {
        console.log('*** Archive Button clicked ***');
    });

    this.eDeleteButton.addEventListener('click', function (event) {
        console.log('*** Delete Button clicked ***', params.node);

        console.log('params', params);

        // let newData = [];
        // params.api.forEachNode (node=>{
        //     if (node === params.node) return;
        //     newData.push(node.data)
        // })

        params.api.updateRowData({remove: [params.node]});


    });

    this.eMarkButton.addEventListener('click',  (event) => {
        console.log('*** Mark Button clicked ***');
        // console.log('params', params);

        // console.log('Old Read: ',params.data.read)

        console.log(this.params.data.read, 'this.params.data.read');

        let newData = {
            ...this.params.data,
            read: !this.params.data.read
        };

        console.log('New Data: ',newData)
        this.params.node.setData(newData);
        this.params.api.refreshCells({nodes: [params.node], force: true})
    });

    this.eSnoozeButton.addEventListener('click', function (event) {
        console.log('*** Snooze Button clicked ***');
    });
};

HoverCellRenderer.prototype.getGui = function () {
    return this.eGui;
};

HoverCellRenderer.prototype.showButton = function () {
    this.spanEl = this.eGui.querySelector('.btns');
    this.spanEl.style.display = 'inline-block';
};

HoverCellRenderer.prototype.hideButton = function () {
    this.spanEl.style.display = 'none';
};

HoverCellRenderer.prototype.refresh = function (params) {
    this.params = params;
};

// setup the grid after the page has finished loading
document.addEventListener('DOMContentLoaded', function () {
    var gridDiv = document.querySelector('#myGrid');
    new agGrid.Grid(gridDiv, gridOptions);

    fetch('data.json').then(result => result.json().then(data => processData(data.map((item, i) => ({id: i, ...item})))));
});
