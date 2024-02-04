import Spinner from 'react-bootstrap/Spinner';
// eslint-disable-next-line react/prop-types
export default function PrimaryButton({ text, type, isLoading }) {
    return <button type={type} className="btn btn-primary w-100" disabled={isLoading}>
        {isLoading ? <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
        </Spinner> : text}
    </button>
}