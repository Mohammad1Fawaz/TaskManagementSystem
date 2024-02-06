import Spinner from 'react-bootstrap/Spinner';
// eslint-disable-next-line react/prop-types
export default function PrimaryButton({ text, type, isLoading, width }) {
    return <button type={type} className={`${width ?? 'w-100'} btn btn-primary`} disabled={isLoading}>
        {isLoading ? <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
        </Spinner> : text}
    </button>
}