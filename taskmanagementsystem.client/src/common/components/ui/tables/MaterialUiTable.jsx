import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { CircularProgress } from '@mui/material/index';

export default function MaterialUiTable({ columns, rows, isLoadingForData, dateTimeColumnIndices }) {

    const getRowClassName = (params) => {
        return params.indexRelativeToCurrentPage % 2 === 0 ? 'odd-row' : 'even-row';
    };

    const headerClassName = 'header-class';
    const CustomNoRowsOverlay = () => (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            {isLoadingForData ?
                (<>
                    <div className="flex justify-center align-center">
                        <CircularProgress />
                    </div>

                </>) : (
                    <div className="h-[50px]">
                        <h2>No Data Available</h2>
                        <p>Please add some data to see results.</p>
                    </div>
                )
            }
        </div>
    );

    const renderCell = (params, columnIndex) => {
        if (dateTimeColumnIndices.includes(columnIndex) && params.field in params.row) {
            return new Date(params.value).toLocaleString('en-US', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        } else if (Array.isArray(params.value)) {
            return (
                <div className="flex flex-wrap">
                    {params.value.map((item, index) => (
                        <React.Fragment key={index}>
                            <p>
                                {item}
                                {index !== params.value.length - 1 && <span className='text-[var(--button-primary-color)] px-1'>|</span>}
                            </p>
                        </React.Fragment>
                    ))}
                </div>
            );
        }

        return params.value;
    };

    return (
        <div className="table-scrollbar w-full overflow-x-auto">
            <DataGrid
                rows={rows ?? rows.map((user) => ({ ...user, id: user.id }))}
                columns={columns.map((column, index) => ({
                    ...column,
                    renderCell: column.renderCell ? (params) => column.renderCell(params) : (params) => renderCell(params, index),
                }))}
                initialState={{
                    pagination: {
                        paginationModel: { page: 0, pageSize: 5 },
                    },
                }}
                autoHeight
                pageSizeOptions={[5, 10]}
                editMode="row"
                getRowClassName={getRowClassName}
                headerClassName={headerClassName}
                disableColumnMenu
                disableColumnSelector
                localeText={{
                    noRowsLabel: <CustomNoRowsOverlay />
                }}
            />
        </div>
    );
}
