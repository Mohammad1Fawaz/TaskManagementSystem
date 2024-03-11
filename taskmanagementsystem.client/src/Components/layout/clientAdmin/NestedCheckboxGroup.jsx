// NestedCheckboxGroup.js
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import Checkbox from '@mui/material/Checkbox';

const NestedCheckboxGroup = ({ parent, children, actionButton, handleDeleteRole }) => {
    const [parentChecked, setParentChecked] = useState(true);
    const [checked, setChecked] = useState({});

    useEffect(() => {
        const initializeCheckBoxes = async () => {
            const initialCheckedState = await children.reduce((acc, child) => {
                acc[child.id] = true;
                return acc;
            }, {});
            setChecked(initialCheckedState);
        }
        initializeCheckBoxes();
    }, [children]);

    const handleParentChange = (event) => {
        const newParentChecked = event.target.checked;
        setParentChecked(newParentChecked);
        setChecked(prev => {
            const newState = { ...prev };
            for (const id in newState) {
                newState[id] = newParentChecked;
            }
            return newState;
        });
    };

    const handleChildChange = (id) => (event) => {
        const newChecked = { ...checked };
        newChecked[id] = event.target.checked;
        setChecked(newChecked);
    };

    return (
        <div className="px-3">
            <div className="flex justify-between align-items-center">
                <FormControlLabel
                    label={parent}
                    control={
                        <Checkbox
                            checked={parentChecked}
                            onChange={handleParentChange}

                            sx={{
                                color: "var(--text-primary-color)",
                                '&.Mui-checked': {
                                    color: "var(--text-primary-color)",
                                },
                            }}
                        />
                    }
                    sx={{
                        color: "var(--button-primary-color)",
                    }}
                />
                {actionButton}
            </div>
            <Box sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2, ml: 1 }}>
                <div className="row">
                    {children.map((child) => (
                        <div key={child.id} className="col-6 pr-1">
                            <FormControlLabel
                                key={child.id}
                                label={child.claimValue}
                                control={
                                    <Checkbox
                                        checked={!!checked[child.id]}
                                        onChange={handleChildChange(child.id)}
                                        sx={{
                                            color: "var(--text-primary-color)",
                                            '&.Mui-checked': {
                                                color: "var(--button-primary-color)",
                                            },
                                        }}
                                    />

                                }
                                sx={{
                                    color: "var(--text-primary-color)",
                                }}
                            />
                        </div>
                    ))}
                </div>               
            </Box>
        </div>
    );
}

export default NestedCheckboxGroup;