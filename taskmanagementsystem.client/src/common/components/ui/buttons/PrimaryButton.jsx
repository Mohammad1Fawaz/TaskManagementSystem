import Spinner from 'react-bootstrap/Spinner';
import Button from "react-bootstrap/Button";
// eslint-disable-next-line react/prop-types
export default function PrimaryButton({ text, type, isLoading, width, onClick }) {
    return <Button type={type} className={`${width ?? 'w-full'} btn btn-primary`} disabled={isLoading} onClick={onClick}>
        {isLoading ? <Spinner animation="border" role="status" size="sm">
            <span className="visually-hidden">Loading...</span>
        </Spinner> : text}
    </Button>
}