/* eslint-disable react/prop-types */
const MainLogo = ({ width }) => {

    return (
        <img src="/src/assets/TaskManagementLogo.png" alt="ToTask" className={`${width ?? 'w-45'} h-100 img-fluid`} />
    );
}
export default MainLogo;
