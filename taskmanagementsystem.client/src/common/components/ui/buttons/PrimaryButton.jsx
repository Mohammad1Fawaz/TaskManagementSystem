import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";
import PropTypes from 'prop-types';

const PrimaryButton = ({
    text,
    type = 'button',
    isLoading = false,
    className = '',
    onClick = null,
    icon = null,
    iconPosition = 'left'
}) => {
    return (
        <Button type={type} className={`${className} btn btn-primary`} disabled={isLoading} onClick={onClick}>
            {isLoading ? (
                <Spinner animation="border" role="status" size="sm">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            ) : (
                <>
                    {icon && iconPosition === 'left' && <i className={`fas fa-${icon} me-2`}></i>}
                    {text}
                    {icon && iconPosition === 'right' && <i className={`fas fa-${icon} ms-2`}></i>}
                </>
            )}
        </Button>
    );
};

PrimaryButton.propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.string,
    isLoading: PropTypes.bool,
    className: PropTypes.string,
    onClick: PropTypes.func,
    icon: PropTypes.string,
    iconPosition: PropTypes.oneOf(['left', 'right'])
};

export default PrimaryButton;
