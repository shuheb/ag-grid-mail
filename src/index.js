import { Grid } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-material.css';
import '../styles.css';
import CustomCellRenderer from './customCellRenderer';
// import data from '../data.json';

const fetchData = async () => {
    const response = await fetch('https://dev.to/feed/ag-grid');
    const text = await response.text();
    const data = await new window.DOMParser().parseFromString(text, 'text/xml');
    const items = [];

    data.querySelectorAll('item').forEach((el, index) => {
        items.push({
            id:index,
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
};

const columnDefs = [
    {
        headerName:'Fretewtrewtertom',
        colId: 'creator',
        field: 'creator',
        maxWidth:250,
        checkboxSelection: true
    },
    {
        headerName:'Subject',
        colId: 'title',
        field: 'title',
        cellRenderer: CustomCellRenderer
    },
    // { colId: 'pubDate', field: 'pubDate' },
    // { colId: 'link', field: 'link' },
    // { colId: 'guid', field: 'guid' },
    // { colId: 'description', field: 'description' },
    // { colId: 'category', field: 'category' }
];

const rowData = [];
const defaultColDef = {
    flex: 1,
}

function onGridReady() {
    fetchData();
}

const gridOptions = {
    rowData,
    columnDefs,
    defaultColDef,
    rowHeight: 50,
    getRowId: params => {
        return params.data.id;
    },
    onRowClicked: params => {
        params.node.setData({ ...params.data, read: !params.data.read })
    },
    getRowStyle: ({ data }) => {
        return data.read ?
            { fontWeight: 'normal', backgroundColor: 'rgba(242, 245, 245, 0.8)' } :
            { fontWeight: 'bold', backgroundColor: 'rgb(255, 255, 255)' }
    },
    onGridReady: onGridReady
};

const eGridDiv = document.getElementById('myGrid');

new Grid(eGridDiv, gridOptions);
