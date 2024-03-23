import { toast } from 'react-toastify';

const HelpersService = {
	notify: (message, type) => {
		let toastStyle = { backgroundColor: 'var(--main-background-primary-color)' };

		switch (type) {
			case 'success':
				toast.success(message, { style: toastStyle });
				break;
			case 'error':
				toast.error(message, { style: toastStyle }); 
				break;
			case 'warning':
				toast.warning(message, { style: toastStyle });
				break;
			default:
				toast(message, { style: toastStyle });
		}
	}
}

export default HelpersService;
