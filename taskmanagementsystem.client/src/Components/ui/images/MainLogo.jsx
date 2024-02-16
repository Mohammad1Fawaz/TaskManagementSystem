/* eslint-disable react/prop-types */
const MainLogo = ({ width }) => {

    return (
        <img src="/src/assets/TaskManagementLogo.png" alt="ToTask" className={`${width ?? 'w-32'} h-full object-contain`} />
    );
}
export default MainLogo;
