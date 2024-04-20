import React from 'react';
import useAuthorization from '../../../hooks/useAuthorizaion';

const AuthorizeElement = ({ requiredClaims, children }) => {
    const { isAuthorized, isLoading } = useAuthorization(requiredClaims);

    if (isLoading) {
        return null;
    }

    return isAuthorized ? <>{children}</> : null;
};

export default AuthorizeElement;
