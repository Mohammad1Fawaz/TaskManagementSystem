import { toast } from 'react-toastify';

const HelpersService = {

	notify : (message, type) => {
		switch (type) {
			case 'success':
				toast.success(message);
				break;
			case 'error':
				toast.error(message);
				break;
			case 'warning':
				toast.warning(message);
				break;
			default:
				toast(message);
		}
	}
}

export default HelpersService;