import { ColDef, Grid, GridOptions } from 'ag-grid-community';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import CustomCellRenderer from './customCellRenderer';

interface Car {
    make: string;
    model: string;
    price: number;
};

const columnDefs: ColDef[] = [
    { field: "make", cellRenderer: CustomCellRenderer },
    { field: "model" },
    { field: "price" }
];

const rowData: Car[] = [
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 }
];

const gridOptions: GridOptions<Car> = {
    rowData,
    columnDefs
};

const eGridDiv = document.getElementById('myGrid');

new Grid(eGridDiv, gridOptions);
