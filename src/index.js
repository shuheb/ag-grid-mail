import { Grid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '../styles.css';
import CustomCellRenderer from './customCellRenderer';
import CustomHeader from './customHeaderComponent';
import 'ag-grid-enterprise';
const MDCDialog = mdc.dialog.MDCDialog;
const MDCTextField = mdc.textField.MDCTextField;
const MDCRipple = mdc.ripple.MDCRipple;

const dialog = new MDCDialog(document.querySelector('.mdc-dialog'));

const fetchData = async () => {
    try {
        const response = await fetch('https://dev.to/feed/ag-grid');
        // const response = await fetch('https://blog.ag-grid.com/rss/');
        const text = await response.text();
        const data = await new window.DOMParser().parseFromString(text, 'text/xml');
        const items = [];

        data.querySelectorAll('item').forEach((el, index) => {
            items.push({
                id: index,
                title: el.querySelector('title').textContent,
                creator: el.querySelector('creator').textContent,
                pubDate: new Date(el.querySelector('pubDate').textContent),
                link: el.querySelector('link').textContent,
                guid: el.querySelector('guid').textContent,
                description: el.querySelector('description').textContent,
                category: el.querySelector('category').textContent,
                read: false
            });
        });

        gridOptions.api.setRowData(items);
    } catch (e) {
        const response = await fetch('/data.json');
        const data = await response.json();

        data.forEach((item, index) => {
            item.id = index;
            item.pubDate = new Date(item.pubDate)
        });
        gridOptions.api.setRowData(data);
    }
};

const columnDefs = [
    {
        headerName: 'Inbox',
        colId: 'creator',
        field: 'creator',
        maxWidth: 250,
        enableRowGroup: true,
        headerComponent: CustomHeader,
        headerCheckboxSelection: true,
        checkboxSelection: true
    },
    {
        headerName: '',
        colId: 'title',
        field: 'title',
        headerComponentParams: {
            template: `
            <div class="header-buttons">
            <div>
              <label class="mdc-text-field mdc-text-field--outlined mdc-text-field--with-leading-icon">
                <span class="mdc-notched-outline">
                  <span class="mdc-notched-outline__leading"></span>
                  <span class="mdc-notched-outline__notch">
                    <span class="mdc-floating-label" id="my-label-id">Search in emails</span>
                  </span>
                  <span class="mdc-notched-outline__trailing"></span>
                </span>
                <i class="material-icons mdc-text-field__icon mdc-text-field__icon--leading">search</i>
                <input class="mdc-text-field__input" type="text" aria-labelledby="my-label-id">
              </label>
            </div>
            <div>
              <button data-action="creator" class="mdc-button mdc-button--raised mdc-button--leading">
                <span class="mdc-button__ripple"></span>
                <i class="material-icons mdc-button__icon" aria-hidden="true">group</i>
                <span class="mdc-button__label">Group By Sender</span>
              </button>
              <button data-action="category" class="mdc-button mdc-button--raised mdc-button--leading">
                <span class="mdc-button__ripple"></span>
                <i class="material-icons mdc-button__icon" aria-hidden="true">label</i>
                <span class="mdc-button__label">Group By Category</span>
              </button>
            </div>
          </div>`
        },
        minWidth: 100,
        cellRendererSelector: params => {
            return params.node.group ? undefined : { component: CustomCellRenderer }
        },
    },
    { colId: 'description', field: 'description', hide: true, },
    { colId: 'category', field: 'category', hide: true }
];

const rowData = [];

const defaultColDef = {
    flex: 1,
    suppressMenu: true,
    suppressMovable: true,
}

const onGridReady = () => {
    fetchData();

    const textField = new MDCTextField(document.querySelector('.mdc-text-field'));

    const groupSenderButton = new MDCRipple(document.querySelector('.mdc-button[data-action="creator"]'));

    const groupTagButton = new MDCRipple(document.querySelector('.mdc-button[data-action="category"]'));
    textField.listen('keyup', (ev) => {
        gridOptions.api.setQuickFilter(textField.value);
    });

    const onGroupButtonClicked = event => {
        const action = event.currentTarget.dataset.action;
        const buttonLabel = event.currentTarget.querySelector('.mdc-button__label');
        const rowGroup = gridOptions.columnApi.getColumnState().find(col => (col.colId === action)).rowGroup;
        if (rowGroup) {
            buttonLabel.innerText = `Group by ${action === 'creator' ? 'sender' : 'category'}`;
        } else {
            buttonLabel.innerText = `Ungroup by ${action === 'creator' ? 'sender' : 'category'}`;
        }
        gridOptions.columnApi.applyColumnState({ state: [{ colId: action, rowGroup: !rowGroup }], defaultState: { rowGroup: false } })
    };

    groupSenderButton.listen('click', onGroupButtonClicked);
    groupTagButton.listen('click', onGroupButtonClicked);
};

function updateEmailView(data) {
    const mailContainer = document.getElementById('myMail');
    const subjectRef = mailContainer.querySelector('h1');
    const fromRef = mailContainer.querySelector('h3');
    const descriptionRef = mailContainer.querySelector('p');

    subjectRef.innerText = data.title;
    fromRef.innerText = data.creator;
    descriptionRef.innerHTML = data.description;
    dialog.open();
};

const onRowClicked = ({ event, data, node }) => {
    const tagName = event.target.tagName.toLowerCase();
    if (tagName === 'span') {
        event.preventDefault();
        event.stopPropagation();
        return;
    };

    if (!data.read) {
        data.read = !data.read;
        node.setData(data);
        updateEmailView(data);
    }
}

const getRowStyle = ({ data, node }) => {
    if (!node.group) {
        return data.read ?
            { fontWeight: 'normal', backgroundColor: 'rgba(242, 245, 245, 0.8)' } :
            { fontWeight: 'bold', backgroundColor: 'rgb(255, 255, 255)' }
    }
};

const getRowId = ({ data }) => (data.id);

const onCellMouseOut = params => {
    const instances = params.api.getCellRendererInstances({ rowNodes: [params.node], columns: [params.column] })
    if (instances.length > 0) {
        const instance = instances[0];
        instance.hideRenderer();
    }
};

const onCellMouseOver = params => {
    const instances = params.api.getCellRendererInstances({ rowNodes: [params.node], columns: [params.column] })
    if (instances.length > 0) {
        const instance = instances[0];
        instance.showRenderer();
    }
}

const gridOptions = {
    rowData,
    columnDefs,
    defaultColDef,
    rowSelection: 'multiple',
    groupDisplayType: 'groupRows',
    pagination: true,
    paginationPageSize: 10,
    suppressDragLeaveHidesColumns: true,
    onCellMouseOver,
    onCellMouseOut,
    getRowStyle,
    getRowId,
    onGridReady,
    onRowClicked
};

const eGridDiv = document.getElementById('myGrid');
new Grid(eGridDiv, gridOptions);
